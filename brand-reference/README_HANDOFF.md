# README — Yentrans brand handoff for the website repository

## What this is
A standardised extract of the existing Yentrans brand (Brand Standards v1.1, working draft) for the website rebuild. It introduces no new design or strategy. **Nothing in it is formally approved yet** — read the status labels.

## Folder structure
```
brand-reference/
├── README_HANDOFF.md              ← start here
├── BRAND_GUIDELINES.md            ← rules: name, tone, colour, type, logo, imagery, contrast
├── BRAND_MANIFEST.json            ← machine-readable asset + token inventory
├── CONTENT_FACTS_TO_VERIFY.md     ← every claim the site might make, with status
├── LICENSES_AND_USAGE.md          ← what may legally go on the public site
├── tokens/
│   └── brand-tokens.css           ← CSS custom properties (PROPOSED values)
├── logos/
│   ├── README.md                  ← lists missing logo variants
│   └── YML_Registered_Logo_PROVISIONAL.png
├── visuals/
│   ├── README.md
│   └── Moodboard_v1_REFERENCE.png ← reference only
├── icons/README.md                ← none exist
├── social/README.md               ← handles unknown, no OG image
└── source/                        ← PRIVATE — do not commit
    ├── brand-standards/Brand_Standards_v1_1_REFERENCE.pdf
    └── corporate-facts/
        ├── Claim_Evidence_Tracker.csv
        └── Verified_Branch_Directory_WORKING.csv
```

## Instructions for Claude Code in the website repo
1. Read `BRAND_GUIDELINES.md` and `BRAND_MANIFEST.json` before implementing anything visual.
2. Import `tokens/brand-tokens.css` (or map the same values into `tailwind.config` `theme.extend.colors` / `fontFamily`). Reference semantic tokens (`--yml-link`, `--yml-text`) in components, not raw hex, so palette approval later is a one-file change.
3. Never write a company fact into copy unless `CONTENT_FACTS_TO_VERIFY.md` marks it APPROVED. Use clearly marked placeholders (e.g. `{{OFFICE_ADDRESS_DUBAI}}`) instead.
4. Do not generate or substitute logos, photographs or icons with AI imagery.

## Logo placement
- **Navigation:** `logos/YML_Registered_Logo_PROVISIONAL.png`, full-colour, on a white header. Render it from the artwork bounding box (x 15–1061, y 86–415 of the 1065 × 530 file) or CSS `object-fit`/`object-position` so the built-in white margins don’t make it look small. Minimum 160 px wide. Provide `alt="Yentrans Maritime Logistics"`.
- **Footer:** same file on a white panel. A navy footer cannot carry this PNG — no reverse lockup exists. Until one is supplied, use a light footer or the text name set in Manrope.
- **Favicon:** none exists. Leave the framework default out and ship a neutral placeholder only after brand sign-off, or wait for the compact mark.
- **Before launch:** swap in the vector master and resolve the ® (see Known conflicts #1).

## Where the official colours live
`tokens/brand-tokens.css` and the `colors` array in `BRAND_MANIFEST.json`; rationale and contrast table in `BRAND_GUIDELINES.md` §5.

## Typography fallback advice
Manrope (headings 600/700), Inter (body 400/500), IBM Plex Mono (labels 500) — all SIL OFL, free to self-host. In Next.js use `next/font/google` (self-hosts at build time); otherwise `@fontsource/manrope`, `@fontsource/inter`, `@fontsource/ibm-plex-mono`. Use `font-display: swap`. Load only the weights listed. Fallbacks are in the CSS stacks.

## What to commit
| Path | Commit? | Copy to `public/assets/`? |
|---|---|---|
| `*.md`, `BRAND_MANIFEST.json`, `tokens/` | Yes | No (tokens imported into styles) |
| `logos/YML_Registered_Logo_PROVISIONAL.png` | Yes, as a placeholder | Yes, renamed e.g. `logo-yml.png`, marked TODO-replace |
| `visuals/Moodboard_v1_REFERENCE.png` | Optional, private repo only | **No** |
| `source/` | **No** — add `brand-reference/source/` to `.gitignore` | **No** |

## Files you must download manually
These exist in the Claude Project but only their extracted text is reachable from this environment, so the original binaries are not in the ZIP. Download from the Project (claude.ai → Project “YENTRANS | Global Brand Director” → Files) if you want them alongside:
- `01_Brand_Foundation/Brand_Standards_v1_1_EDITABLE.docx`
- `02_Corporate_Facts/Corporate_Company_Profile_WORKING.docx`
- `02_Corporate_Facts/Approved_Facts_and_Certifications_REGISTER.docx`
- `03_Content_System/Creative_Templates_and_Design_Direction.docx`

Must be obtained from Yentrans management / the original logo designer (they are not in the project at all):
- `YML Logo.pdf` and any vector master (AI/SVG/EPS)
- Reverse, monochrome, stacked, compact-mark and favicon variants
- Any real photography, office details, social handles

## Known conflicts
1. **® on the logo.** The only logo file includes a ® added during drafting. Trademark registration is unevidenced (YML-009). A public website is viewable everywhere; showing ® for an unregistered mark can be unlawful in some jurisdictions. Get the non-® original, or legal sign-off, before launch.
2. **Cyan for links.** Standards §03 lists cyan for links, but cyan on white is 2.67:1 (fails WCAG). Package rule: Teal for links on light backgrounds, cyan only on navy or as non-text decoration.
3. **Logo lettering vs palette.** The YML letters sample as neutral near-black (≈ #1E1E1E), not Navy #0D283B or Ink #18252D. Leave the logo as-is.
4. **Colour names.** Mood board says “Sea Teal”/“Deep Maritime”; standards say “Harbor Teal”/“Deep Maritime Navy”. Standards win.
5. **Tagline.** Mood board shows “Trade Without Borders.”, which no document proposes. Not to be used. No tagline is approved.
6. **Houston.** Listed in the network, but its operating status is unverified; standards forbid the “India • Oman • UAE • United States” short form until confirmed.
7. **Version label.** The PDF footer reads “WORKING DRAFT v1.0” while the cover says v1.1. Treat as v1.1.
8. **Font rendering in the PDF.** The reference PDF renders in Noto Serif/Carlito (export substitution), not Manrope/Inter.
