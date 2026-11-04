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

The application UI is intentionally not built as a decorative form. No endpoint
exists, `forms.applicationEndpointEnabled` is `false`, and the job page states
plainly that applications cannot be accepted. **Nothing ever reports a
submission that was not stored.**

To enable it, all of the following are required:

| Requirement | Why |
|---|---|
| Cloudflare Pages Functions endpoint | Server-side validation and storage |
| Cloudflare Turnstile keys | Spam mitigation before accepting uploads |
| R2 bucket, private | Resume storage with random object keys, no public read, no directory listing |
| D1 database | Application metadata, separate from the files |
| Secrets set in the Pages dashboard | Never committed to this repository |
| Approved applicant privacy notice | Legal prerequisite to collecting candidate data |
| Retention and deletion workflow | Who can read a resume, for how long, and how it is deleted |
| Access control on any staff view | Cloudflare Access or equivalent. **No open `/admin` route.** |

Server-side validation must check file signature as well as extension, cap size
(5 MB suggested), generate random private object keys, and rate-limit by IP.

Until every row above is satisfied, leave the flag `false`.

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
