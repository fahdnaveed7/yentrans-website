/**
 * Pre-launch checks over the built _site.
 *
 * Fails on anything that would embarrass us publicly: broken internal links,
 * missing assets, placeholder text, a draft leaking into a public listing or
 * the sitemap, or an unapproved claim appearing in the output.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve("_site");
const approvals = JSON.parse(readFileSync("src/_data/approvals.json", "utf8"));
const fails = [], warn = [];

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};
const files = walk(ROOT);
const html = files.filter((f) => f.endsWith(".html"));
const rel = (f) => f.slice(ROOT.length) || "/";

// 1. placeholders
const PLACEHOLDERS = [/\[ADDRESS\]/i, /\[PHONE\]/i, /\[EMAIL\]/i, /\[APPROVED [A-Z ]+\]/,
  /\[TO VERIFY\]/i, /\[TO APPROVE\]/i, /\{\{\s*[A-Z_]+\s*\}\}/, /lorem ipsum/i,
  /Add a couple of lines/i, /PENDING_VERIFICATION/];
for (const f of html) {
  const t = readFileSync(f, "utf8");
  for (const re of PLACEHOLDERS) if (re.test(t)) fails.push(`${rel(f)}: placeholder ${re}`);
}

// 2. unapproved claims must not render
const CLAIMS = [
  [approvals.credentials.fmcNvocc,          /Registered NVOCC|FMC[- ]registered/i],
  [approvals.credentials.mto,               /Multimodal Transport Operator/i],
  [approvals.credentials.millenniumNetwork, /Millennium Logistics Network/i],
  [approvals.credentials.fmcOrgNumber,      /035760/],
  [approvals.corporate.established2009,     /since 2009|Established 2009|Founded in 2009/i],
  // Defence page claims. The named navies matter most: a port-visit support
  // relationship may be non-public for the customer, and TP-01 requires written
  // permission that nobody has produced.
  [approvals.defence.namedNavyClients,      /\b(Algeria|Bangladesh|Egypt|Thailand|Indonesia)\b/],
  [approvals.defence.additionalOffices,     /\b(Colombo|Malaysia|Lebanon)\b/],
  [approvals.defence.trackRecordSuperlative,/most extensive track record/i],
];
for (const f of html) {
  const t = readFileSync(f, "utf8");
  for (const [flag, re] of CLAIMS) {
    if (!flag.value && re.test(t)) fails.push(`${rel(f)}: unapproved claim ${flag.claim} rendered`);
  }
}

// 3. internal links and assets resolve
const PREFIX = process.env.PATH_PREFIX || "/";
const strip = (u) => (PREFIX !== "/" && u.startsWith(PREFIX) ? "/" + u.slice(PREFIX.length) : u);
for (const f of html) {
  const t = readFileSync(f, "utf8");
  for (const m of t.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(raw)) continue;
    const u = strip(raw.split("#")[0].split("?")[0]);
    if (!u) continue;
    if (!existsSync(join(ROOT, u)) && !existsSync(join(ROOT, u, "index.html"))) {
      fails.push(`${rel(f)}: dead link or missing asset -> ${raw}`);
    }
  }
}

// 4. drafts contained
const sitemap = existsSync(join(ROOT, "sitemap.xml")) ? readFileSync(join(ROOT, "sitemap.xml"), "utf8") : "";
for (const f of html) {
  const t = readFileSync(f, "utf8");
  if (!/class="draft-banner"/.test(t)) continue;
  if (!/noindex/.test(t)) fails.push(`${rel(f)}: draft missing noindex`);
  const url = rel(f).replace(/index\.html$/, "");
  if (sitemap.includes(`<loc>${approvals ? "" : ""}`) && sitemap.includes(url + "</loc>"))
    fails.push(`${rel(f)}: draft present in sitemap`);
}

// 5. accessibility basics
for (const f of html) {
  const t = readFileSync(f, "utf8");
  if (/http-equiv="refresh"/.test(t)) continue;         // redirect stubs are exempt
  const h1 = (t.match(/<h1[\s>]/g) || []).length;
  if (h1 === 0) warn.push(`${rel(f)}: no <h1>`);
  if (h1 > 1) fails.push(`${rel(f)}: ${h1} <h1> elements`);
  if (/<h1>\s*<\/h1>/.test(t)) fails.push(`${rel(f)}: empty <h1>`);
  for (const img of t.match(/<img [^>]*>/g) || [])
    if (!/alt=/.test(img)) fails.push(`${rel(f)}: <img> without alt — ${img.slice(0, 60)}`);
  if (!/skip-link/.test(t)) warn.push(`${rel(f)}: no skip link`);
}

// 6. never a stored-submission confirmation without a live endpoint.
// The build brief is explicit: "Never show 'Application submitted' unless the
// server has actually accepted and stored it." Both form families are checked,
// each against its own endpoint flag, and the patterns cover the wording in the
// content pack plus the obvious paraphrases someone might reach for later.
const SUBMIT_CONFIRMATIONS = [
  { flag: "quoteEndpointEnabled", label: "quote",
    res: [/your enquiry has been received/i, /your enquiry was received/i,
          /thank you[^.]{0,40}\benquiry\b[^.]{0,40}\breceived\b/i,
          /enquiry (?:has been )?(?:successfully )?(?:sent|submitted)/i] },
  { flag: "applicationEndpointEnabled", label: "application",
    res: [/your application has been received/i, /application (?:has been )?(?:successfully )?(?:submitted|received)/i,
          /thank you[^.]{0,40}\bapplication\b[^.]{0,40}\breceived\b/i,
          /we(?:'ve| have) received your (?:application|resume|cv)/i] },
];
for (const { flag, label, res } of SUBMIT_CONFIRMATIONS) {
  const enabled = approvals.forms?.[flag]?.value;
  if (enabled) continue;
  for (const f of html) {
    const t = readFileSync(f, "utf8");
    for (const re of res) {
      if (re.test(t)) {
        fails.push(`${rel(f)}: renders a ${label} success confirmation while approvals.forms.${flag} is false — no server has accepted anything`);
        break;
      }
    }
  }
}

console.log(`checked ${html.length} pages, ${files.length} files`);
if (warn.length) { console.log(`\n${warn.length} warning(s):`); warn.forEach((w) => console.log("  ·", w)); }
if (fails.length) {
  console.log(`\n${fails.length} FAILURE(S):`);
  fails.forEach((x) => console.log("  ✗", x));
  process.exit(1);
}
console.log("\n✓ no placeholders · no unapproved claims · no dead links · drafts contained · a11y basics pass");
