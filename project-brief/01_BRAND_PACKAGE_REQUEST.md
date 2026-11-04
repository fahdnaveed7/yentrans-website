# Brand-package handoff prompt — Yentrans Maritime Logistics

Copy the text below into the separate project where the Yentrans brand assets already live.

---

I am rebuilding the corporate website of **Yentrans Maritime Logistics Pvt. Ltd.** in an existing local Claude Code project. Please prepare a **production-ready brand handoff package**, based strictly on the brand assets and decisions already available in THIS project. Do not invent logos, color values, fonts, taglines, credentials, or photography. If a source asset is unavailable, list it as missing.

## Deliverables

1. `BRAND_GUIDELINES.md` — official brand name and approved abbreviations; brand story, tone of voice, preferred tagline(s); primary/secondary palette with exact HEX/RGB; typography families, weights and licensed availability; logo variants; spacing, safe area, minimum size; examples of correct/incorrect logo use; photography and iconography principles; light/dark logo placement; accessibility contrast notes.
2. `BRAND_MANIFEST.json` — a machine-readable manifest with each asset's relative path, description, format, preferred usage, dimensions (if known), and whether it is approved for public website use.
3. `/logos/` — original vector (SVG/PDF where available), transparent PNG alternatives, horizontal/stacked/monochrome logos, and favicon/app icons. Keep native source files unchanged.
4. `/visuals/` — approved photos, illustrations, pattern assets, maps, actual facilities/trucks/team imagery, or existing exports. Do not silently replace corporate images with AI imagery.
5. `/icons/` — approved icons and icon-system notes if they exist.
6. `/social/` — official social profile handles, approved OG/social preview graphics if available.
7. `CONTENT_FACTS_TO_VERIFY.md` — structured list of factual claims, registrations, employee/fleet/TEU numbers, branch addresses, phone numbers, membership logos, client logos, and legal statements. Include source and approval status for each; write UNKNOWN for anything not established.
8. `LICENSES_AND_USAGE.md` — whether each font, image, icon and partner logo can legally be deployed on the public website. Do not redistribute assets without rights.
9. `README_HANDOFF.md` — how to use this package in a website repository, exact preferred logo variant in navigation/footer, where to find the official colors, typography fallback advice, and any known conflicts.

## Packaging rules

- Export a downloadable ZIP named `YENTRANS_BRAND_PACKAGE.zip` **if this project can access the original binary files**. It must contain the real originals, not merely textual descriptions or low-resolution screenshots.
- If the environment cannot package the originals, provide the requested documents and an exact inventory with paths/links; tell me which files I must download manually. Do not claim a ZIP exists unless it was actually created.
- Avoid hidden credentials, API keys, customer data, internal financial documents, employment records or proprietary shipment information.
- Clearly distinguish approved assets from drafts. Do not mix unapproved concepts into the final design system without labeling them.
- Do not make a new design or new brand strategy; **extract and standardize the existing brand** for the website developer.

After delivery, summarize: authoritative logo, primary/secondary colors, approved typefaces, usable photography, missing items, and the exact handoff folder structure.

---

## What I will do with the package

On my Mac, I will put the contents into the existing website repository under `brand-reference/` and tell Claude Code to read `BRAND_GUIDELINES.md` and `BRAND_MANIFEST.json` before implementing. Publicly usable optimized files can later be copied to the site's `public/assets/` or existing asset directory. Private/source files should not be committed by default.
