/**
 * Careers application intake — Cloudflare Pages Function.
 *
 * POST /api/apply   multipart/form-data
 *
 * Returns { ok: true } ONLY after the CV is in R2 and the metadata row is
 * committed to D1. Every other path returns ok:false with a reason. The build
 * brief is explicit that a success message must never appear unless the server
 * actually accepted and stored the application, and the front end is written to
 * trust this response and nothing else.
 *
 * Bindings required (see DEPLOYMENT_CHECKLIST.md):
 *   DB                 D1 database
 *   CV_BUCKET          R2 bucket, private — no public access, no listing
 *   TURNSTILE_SECRET   secret, set with `wrangler pages secret put`
 *   APPLICATIONS_ENABLED  "true" to accept submissions; anything else refuses
 *
 * Deliberately absent: any GET route that reads applications back. Retrieval is
 * a separate, authenticated surface (Cloudflare Access) — the brief rules out an
 * open /admin endpoint, and an unauthenticated read here would be exactly that.
 */

const MAX_BYTES = 5 * 1024 * 1024;          // 5 MB, per the content pack
const RATE_LIMIT = 5;                        // submissions per window
const RATE_WINDOW_MIN = 60;
const MAX_FIELD = 4000;

const FIELDS = {
  fullName:    { required: true,  max: 120 },
  email:       { required: true,  max: 200 },
  phone:       { required: true,  max: 40  },
  location:    { required: true,  max: 120 },
  roleId:      { required: true,  max: 80  },
  experience:  { required: true,  max: 40  },
  linkedin:    { required: false, max: 300 },
  note:        { required: false, max: MAX_FIELD },
};

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

/** Hash the client IP rather than storing it. Enough to rate limit, not a record of who applied. */
async function hashIp(ip, salt) {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

/**
 * Trust the bytes, not the filename or the browser's content-type. Both are
 * attacker-controlled; a .pdf extension on a script is the oldest trick here.
 */
function sniff(bytes) {
  const startsWith = (sig) => sig.every((b, i) => bytes[i] === b);
  // %PDF-
  if (startsWith([0x25, 0x50, 0x44, 0x46, 0x2d])) return "pdf";
  // DOCX is a zip; require the PK header AND evidence of a word/ entry, so a
  // plain zip renamed to .docx is rejected.
  if (startsWith([0x50, 0x4b, 0x03, 0x04])) {
    const hay = new TextDecoder("latin1").decode(bytes.subarray(0, Math.min(bytes.length, 8192)));
    const tail = new TextDecoder("latin1").decode(bytes.subarray(Math.max(0, bytes.length - 8192)));
    if (hay.includes("word/") || tail.includes("word/document.xml")) return "docx";
  }
  return null;
}

async function verifyTurnstile(token, secret, ip) {
  if (!token) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body,
  });
  if (!res.ok) return false;
  const out = await res.json();
  return out.success === true;
}

export async function onRequestPost({ request, env }) {
  // 0. Kill switch. Nothing is accepted until an operator turns it on.
  if (env.APPLICATIONS_ENABLED !== "true") {
    return json(503, { ok: false, reason: "disabled",
      message: "Applications are not being accepted through this site yet." });
  }
  if (!env.DB || !env.CV_BUCKET || !env.TURNSTILE_SECRET) {
    return json(500, { ok: false, reason: "misconfigured",
      message: "The application service is not configured correctly." });
  }

  const ip = request.headers.get("CF-Connecting-IP") || "";
  const ipHash = await hashIp(ip, env.TURNSTILE_SECRET);

  // 1. Rate limit before doing any real work.
  const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
  const recent = await env.DB
    .prepare("SELECT COUNT(*) AS n FROM applications WHERE ip_hash = ? AND created_at > ?")
    .bind(ipHash, since).first();
  if (recent && recent.n >= RATE_LIMIT) {
    return json(429, { ok: false, reason: "rate_limited",
      message: "Too many applications from this connection. Please try again later." });
  }

  let form;
  try { form = await request.formData(); }
  catch { return json(400, { ok: false, reason: "bad_request", message: "Could not read the submitted form." }); }

  // 2. Spam check.
  if (!(await verifyTurnstile(form.get("cf-turnstile-response"), env.TURNSTILE_SECRET, ip))) {
    return json(400, { ok: false, reason: "challenge_failed",
      message: "The anti-spam check did not pass. Please reload the page and try again." });
  }

  // 3. Fields.
  const data = {};
  for (const [name, rule] of Object.entries(FIELDS)) {
    const v = (form.get(name) || "").toString().trim();
    if (rule.required && !v) {
      return json(400, { ok: false, reason: "missing_field", field: name,
        message: `Please complete every required field.` });
    }
    if (v.length > rule.max) {
      return json(400, { ok: false, reason: "field_too_long", field: name,
        message: "One of the fields is longer than allowed." });
    }
    data[name] = v;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(data.email)) {
    return json(400, { ok: false, reason: "bad_email", field: "email",
      message: "Please check the email address." });
  }
  if (form.get("consent") !== "yes") {
    return json(400, { ok: false, reason: "no_consent",
      message: "We need your acknowledgement of the applicant privacy notice." });
  }

  // 4. Resume.
  const file = form.get("resume");
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return json(400, { ok: false, reason: "no_file", message: "Please attach your CV." });
  }
  if (file.size > MAX_BYTES) {
    return json(413, { ok: false, reason: "file_too_large",
      message: "That file is over 5 MB. Please attach a smaller PDF or DOCX." });
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniff(bytes);
  if (!kind) {
    return json(415, { ok: false, reason: "bad_file_type",
      message: "Please attach a PDF or DOCX. Other formats are not accepted." });
  }

  // 5. Store. Random key, so an object cannot be guessed from a name or a date.
  const id = crypto.randomUUID();
  const key = `applications/${id}.${kind}`;
  try {
    await env.CV_BUCKET.put(key, bytes, {
      httpMetadata: { contentType: kind === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
      customMetadata: { applicationId: id, originalName: String(file.name || "").slice(0, 120) },
    });
  } catch {
    return json(502, { ok: false, reason: "storage_failed",
      message: "We could not store your application. Nothing was saved — please try again." });
  }

  try {
    await env.DB.prepare(
      `INSERT INTO applications
         (id, role_id, full_name, email, phone, location, experience, linkedin, note,
          cv_key, cv_type, cv_bytes, ip_hash, user_agent, created_at, status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'new')`
    ).bind(
      id, data.roleId, data.fullName, data.email, data.phone, data.location,
      data.experience, data.linkedin || null, data.note || null,
      key, kind, file.size, ipHash,
      (request.headers.get("user-agent") || "").slice(0, 300),
      new Date().toISOString()
    ).run();
  } catch {
    // Never leave a CV in storage with no record of it — that is personal data
    // nobody is tracking and nobody can honour a deletion request against.
    try { await env.CV_BUCKET.delete(key); } catch { /* best effort */ }
    return json(502, { ok: false, reason: "record_failed",
      message: "We could not record your application. Nothing was saved — please try again." });
  }

  return json(200, { ok: true, reference: id.slice(0, 8).toUpperCase() });
}

/** Anything other than POST. No GET: this endpoint never reads applications back. */
export async function onRequest({ request }) {
  if (request.method === "POST") return;
  return json(405, { ok: false, reason: "method_not_allowed" });
}
