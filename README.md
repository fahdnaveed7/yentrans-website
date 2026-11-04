# Yentrans Maritime Logistics — corporate website

Static site built with [Eleventy](https://www.11ty.dev/). Output is plain HTML,
CSS and a little progressive-enhancement JavaScript — no client framework.

## Quick start

```bash
npm install
npm start        # http://localhost:8080
```

```bash
npm run build          # root paths, for Cloudflare Pages
npm run build:ghpages  # /yentrans-website/ prefix, for GitHub Pages
npm run check          # pre-launch gate — run before every push
```

## Layout

```
src/
  _data/           site settings, navigation, approvals, industries, services, offices
  _includes/       layouts and partials
  content/         articles and jobs, one file each
  assets/          css, js, images, video
  static/          files served from the site root
  *.njk            page templates
tools/
  check-site.mjs   pre-launch checks
brand-reference/   brand package (source/ is gitignored and never committed)
project-brief/     build brief and content pack
```

## The approvals gate

`src/_data/approvals.json` decides what the site is allowed to claim. Each flag
names its claim ID from `brand-reference/CONTENT_FACTS_TO_VERIFY.md`. **Every
flag currently ships `false`**, because no company claim has been approved.

This is enforced, not advisory. `npm run check` fails the build if a gated claim
renders. The FMC and MTO badges, the Millennium Logistics Network logo, the
founding year, the metrics block and the legal entity name are all absent for
this reason, and reappear on their own when a flag is flipped.

See `APPROVALS_NEEDED.md` for what is outstanding and who needs to sign it off.

## Editorial state

Articles and jobs carry a `status`. Drafts build a reviewable page with a visible
banner and `noindex`, but never appear in a public listing or the sitemap. The
careers page reports no open vacancies because there genuinely are none.

See `CONTENT_EDITING.md` to publish something.

## Forms

Neither form has a backend yet, and neither pretends otherwise.

The quote form composes the enquiry into the visitor's own mail client and says
so before they start. The careers application is `APPLICATIONS_DISABLED` — no
apply button is shown, because a form that cannot store a submission should not
look like one that can.

See `DEPLOYMENT_CHECKLIST.md` for what provisioning each requires.

## Deployment

Nothing here is deployed. `main` is untouched, no DNS or mail record has been
modified, and the existing WordPress site is untouched. `site.isPreview` is
`true`, so the whole site is `noindex` and `robots.txt` disallows crawling.

Read `DEPLOYMENT_CHECKLIST.md` before changing any of that.
