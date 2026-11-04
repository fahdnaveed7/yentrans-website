# Editing content

Content lives in data files, separate from templates. You do not need to touch
component code to publish an article, open a vacancy or correct an office.

```
src/content/articles/*.md     one file per article
src/content/jobs/*.md         one file per vacancy
src/_data/industries.json     the 18 sectors
src/_data/industryDetails.json  flagship detail copy
src/_data/services.json       the 7 services
src/_data/offices.json        locations and contact details
src/_data/approvals.json      what the site is allowed to claim
src/_data/nav.json            navigation
src/_data/site.json           site-wide settings
```

Run locally:

```bash
npm install
npm start
```

Before pushing anything:

```bash
npm run build && npm run check
```

---

## Publishing an article

1. Open the file in `src/content/articles/`.
2. Set `author` to an approved name. **Do not invent a byline.**
3. Set `datePublished` to today, `YYYY-MM-DD`.
4. Change `status: draft` to `status: published`.
5. Build and check.

It now appears on `/insights/`, in the homepage's latest-three, in the sitemap,
loses its draft banner and noindex, and emits Article schema.

To unpublish, set `status: draft` again. The page stays reachable for reviewers
but leaves every public listing.

### Adding a new article

Copy any existing file in that folder, rename it — the filename becomes the URL
(`my-article.md` → `/insights/my-article/`) — and replace the front matter and
body. New articles must start as `status: draft`.

Categories in use: `Industry Insights`, `Trade & Regulatory Updates`,
`The Yentrans Journal`, `Knowledge Hub`.

## Opening a vacancy

1. Open the file in `src/content/jobs/`.
2. Confirm the secure application channel is live. If it is not, leave
   `applicationEndpointEnabled: false` — the page will say applications are not
   open rather than offer a button that cannot work.
3. Set `publishedAt` to today.
4. Set `showSalary: true` only if management approved publishing the figure.
5. Set `employmentTypeApproved: true` to drop the "(proposed)" label.
6. Change `status: draft` to `status: open`.

It now appears on `/careers/`, enters the sitemap, drops the draft banner and
emits JobPosting schema.

**Closing a role:** set `status: closed`. It leaves the listing immediately.
Keep the file — do not delete it — so the URL does not 404 for anyone holding
the link.

## Correcting an office

Edit `src/_data/offices.json`. Contact details render only when `approved: true`
or `selfPublished: true`. A location with neither shows its `coverage` text and
routes enquiries to the main desk.

When you receive verified details for a branch: fill `address`, `phone`,
`phoneDial` and `email`, then set `approved: true`.

**Never put a placeholder string in these fields.** Leave them `null`. The
template omits what is missing; the checker fails the build on bracket
placeholders.

## Releasing a claim

See `APPROVALS_NEEDED.md`. In short: attach evidence to the claim tracker, then
flip the flag in `src/_data/approvals.json`. Gated content reappears by itself —
the FMC and MTO badges, the founding year, the metrics block, the legal entity
name in the footer.

`npm run check` fails the build if a claim renders while its flag is false, so a
claim cannot reach production by accident.

## Rolling back

Every change is a commit. To undo the most recent one:

```bash
git revert HEAD
```

To see what a page looked like before, check out the earlier commit and run
`npm start`.
