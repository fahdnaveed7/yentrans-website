# Deployment checklist

**Nothing in this repository has been deployed.** `main` is untouched. All work
is on `feature/corporate-site-expansion`. No DNS, registrar, nameserver, Google
Workspace or mail record has been read or modified, and the existing WordPress
site at `yentransmaritime.com` is untouched.

## Build

```bash
npm ci
npm run build          # root paths      → _site/   (Cloudflare Pages)
npm run build:ghpages  # /yentrans-website/ prefix → _site/   (GitHub Pages)
npm run check          # pre-launch gate
```

Both builds are verified to produce no dead links and no root-absolute asset
leaks. Every internal URL goes through the `url` filter; a template that hard-
codes `/something/` will break the prefixed build, and the checker catches it.

## Preview

GitHub Pages serves this repo at `https://fahdnaveed7.github.io/yentrans-website/`.
The existing workflow uploads the repo root verbatim, which no longer works now
that there is a build step. `.github/workflows/deploy.yml` has been updated to
run the prefixed build and upload `_site`. It still triggers only on `main`, so
pushing this feature branch deploys nothing.

While `site.isPreview` is `true`, every page carries `noindex` and `robots.txt`
disallows all crawling. That is correct for a preview and **must** be flipped at
cutover.

## Cloudflare Pages (recommended production target)

Not yet created. When the company is ready:

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select `fahdnaveed7/yentrans-website`.
3. Build command `npm run build`, output directory `_site`, Node 20 or later.
4. Production branch: `main` (only after this branch is merged and approved).
5. Deploy. Test the `*.pages.dev` URL thoroughly before any domain is attached.

Attaching the custom domain is a **separate, separately authorised step** and is
out of scope for this work.

### What a domain cutover would involve — not to be done without sign-off

- Set `site.isPreview` to `false` so pages become indexable and `robots.txt`
  allows crawling.
- Attach `yentransmaritime.com` and `www` as Pages custom domains.
- Attaching a Pages custom domain changes only the A/CNAME record for that
  hostname. **MX records are a different record type and are not touched**, so
  mail delivery is unaffected by the website switch.
- Keep every Google Workspace MX, SPF, DKIM and DMARC record exactly as it is.
- Verify HTTPS, then confirm the old WordPress site can still be restored.

## Careers application intake — currently APPLICATIONS_DISABLED

The backend is **written and in the repo**; it is not provisioned. Nothing can be
submitted until the five steps below are done and the kill switch is flipped.

| Piece | Where | State |
|---|---|---|
| Intake endpoint | `functions/api/apply.js` | written |
| Database schema | `infra/schema.sql` | written |
| Bindings config | `infra/wrangler.toml` | written, placeholder IDs |
| Application form | `/careers/apply/` | renders, submit disabled |
| Client handling | `src/assets/js/main.js` | written |

### 1. Create the resources

```bash
wrangler d1 create yentrans-applications
wrangler r2 bucket create yentrans-applications-cv
```

Copy the returned D1 `database_id` into `wrangler.toml`, then move that file to
the repository root (it lives in `infra/` precisely so a half-finished config
cannot be picked up by a build).

### 2. Apply the schema

```bash
wrangler d1 execute yentrans-applications --remote --file=infra/schema.sql
```

### 3. Turnstile

Create a widget in the Cloudflare dashboard for the site's hostname. Then:

```bash
wrangler pages secret put TURNSTILE_SECRET --project-name yentrans-website
```

Put the **site key** (not the secret) into `src/_data/site.json` under
`forms.turnstileSiteKey`, and add the Turnstile script to the apply page. The
secret key must never appear in the repository.

### 4. Lock the bucket down

The R2 bucket must have **no public access and no custom domain**. Verify in the
dashboard. The only read path is a short-lived signed URL issued behind
Cloudflare Access. A CV is personal data; a public bucket here is a breach, not
a misconfiguration.

### 5. Test end to end, then switch on

With `APPLICATIONS_ENABLED = "false"` still set, confirm the endpoint refuses
with 503. Then set it to `"true"`, submit a real test application and verify:

- a row exists in D1 (`wrangler d1 execute yentrans-applications --remote --command "SELECT id, role_id, email, cv_key FROM applications"`)
- the object exists in R2 at that `cv_key`
- the object is **not** reachable over the public internet
- the browser showed the success message only after both of the above
- a second submission with a `.pdf` extension on a non-PDF file is rejected
- six submissions in an hour from one address trip the rate limit

Only then change `status: draft` to `status: open` on the live roles.

### What is deliberately not built

- **No read endpoint.** `functions/api/apply.js` has no GET. Retrieval is a
  separate surface behind Cloudflare Access; the brief rules out an open
  `/admin`, and an unauthenticated read here would be exactly that.
- **No malware scanning.** The brief asks it to be considered. It is not in
  place, so treat every CV as untrusted: open in a sandboxed viewer, not on a
  machine with access to company systems.
- **No automated retention purge.** `applications.purge_after` exists and the
  schema is indexed for it, but the scheduled Worker that deletes expired rows
  and their R2 objects is not written. Until it is, retention is manual, and the
  applicant privacy notice must not promise an automatic deletion window the
  system does not enforce.

## Quote enquiry form

Works today without a backend: it composes the enquiry into the visitor's own
mail client, and the page says so before they fill anything in. The confirmation
message states the mail is ready to send, not that it was submitted.

To move it server-side, add a Pages Function, set `forms.quoteEndpointEnabled`
to `true` and put the endpoint URL in the form's `data-endpoint`. The handler
already shows a success message **only** on an `ok` response and reports a
failure otherwise.

## Pre-launch gate

`npm run check` must pass. It fails on:

- placeholder text of any kind
- a claim rendering while its approval flag is false
- dead internal links or missing assets
- a draft page missing noindex, or appearing in the sitemap
- a page with no `<h1>`, multiple `<h1>`s, an empty `<h1>`, or an `<img>` with no `alt`
- a stored-submission confirmation rendering with no endpoint configured

Run it against both builds:

```bash
npm run build         && npm run check
npm run build:ghpages && PATH_PREFIX=/yentrans-website/ npm run check
```

## Definition of done for launch

- [ ] Section 1 of `APPROVALS_NEEDED.md` resolved — the three unevidenced credentials
- [ ] Office details verified, or locations left as presence-only
- [ ] Photography licensed or replaced
- [ ] Articles reviewed, authors approved, status flipped
- [ ] HR sign-off on the vacancy
- [ ] Privacy notices legally reviewed
- [ ] Application intake live and tested, or explicitly left disabled
- [ ] `site.isPreview` set to `false`
- [ ] `npm run check` passes on both builds
- [ ] Domain cutover separately authorised
