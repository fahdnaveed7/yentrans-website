# Yentrans Maritime Logistics — Brand Guidelines for Web

**Package version:** 2026-11-04 · extracted from *Global Brand Standards & Asset Guide v1.1 (Working Master, October 2026)* and the supporting brand workspace.
**Status of the system as a whole:** WORKING DRAFT. Nothing in the source material has been formally approved by corporate management. Every value below carries one of these labels:

| Label | Meaning |
|---|---|
| **SOURCE** | Comes from Yentrans-supplied artwork (the logo file) |
| **PROPOSED** | Recommended in Brand Standards v1.1; awaiting management approval |
| **APPROX.** | Sampled from a raster logo; must be confirmed against a vector master |
| **UNKNOWN** | Not established anywhere in the brand workspace |

This document standardises what already exists. It does not add a new design direction.

---

## 1. Name

| Use | Form | Status |
|---|---|---|
| Full corporate brand name | **Yentrans Maritime Logistics** | SOURCE (appears in logo lockup) |
| Registered legal name | Yentrans Maritime Logistics Pvt. Ltd. | User-stated in the website brief; not documented in the brand workspace — confirm against company registration before using in the footer/legal pages |
| Short form in running text | **Yentrans** | PROPOSED (used throughout the standards) |
| Monogram / logo abbreviation | **YML** | SOURCE (logo wordmark) |
| Location labels | `Yentrans / Cochin`, `Yentrans / Dubai`, etc. — secondary typography only | PROPOSED |

Rules:
- One brand. Never create “Yentrans Oman”, “Yentrans Houston” or any other branch logo or sub-brand.
- “YML” is a logo element; in body copy write “Yentrans”, not “YML”.
- Spell the city as **Cochin** for the corporate office label (the standards use Cochin; “Kochi” appears only in an editorial example). **Vizag** is the label; *Visakhapatnam* may follow in brackets on first mention.

## 2. Brand story and positioning

Positioning (PROPOSED): Yentrans is one international maritime logistics group with regional capabilities — not a directory of independent branch brands.

Brand promise (PROPOSED): *Connecting businesses and markets through dependable maritime freight forwarding and specialized cargo expertise.*

Company description (PROPOSED — use only after the operating and legal status of each region is confirmed, see `CONTENT_FACTS_TO_VERIFY.md`):
> Yentrans Maritime Logistics is an international logistics group delivering maritime freight forwarding and specialized cargo solutions through its network across India, Oman, the UAE and North America.

Current public-facing bio (user-provided, existing): *A global logistics company providing maritime, freight forwarding, and specialized cargo solutions across India, the Middle East, and beyond.*

Heritage: “Established 2009” is management-provided and **PENDING** (claim YML-001). Do not print it until evidenced.

## 3. Taglines

**No tagline is approved.** Candidates found in the workspace:

| Line | Where it appears | Status |
|---|---|---|
| Connecting Trade. Moving the World. | Brand Standards §01 | PROPOSED campaign line — “confirm internally before treating as an official slogan” |
| One Brand. Global Perspective. | Company Profile, Standards cover | PROPOSED positioning line, internal |
| Global trade, intelligently explained. | Standards §05 | Internal creative idea for social content — not a public tagline |
| Trade Without Borders. | Mood board image only | Concept placeholder — **do not use** (not discussed or proposed anywhere in text) |

Recommendation for the developer: build the hero so the line is a single content field; ship with the brand-promise sentence until management picks a tagline.

## 4. Tone of voice

Personality: confident, precise, composed, internationally minded, technically competent, human, reliable. Restrained rather than promotional.

| Do | Avoid |
|---|---|
| Clear, factual, assured language | “No. 1”, “leading”, “unmatched”, “the best” without evidence |
| Plain English and concrete shipping terminology | Empty inspirational statements |
| Explain how trade and cargo work | Fabricated vessels, projects, client endorsements |
| Present the group as one organisation | Different identities or tones per office |
| Distinguish general industry information from Yentrans capabilities | Implying every office offers every service |

Hard rule: no numbers (TEU, fleet, volumes, years, staff counts), customer names, carrier partnerships, certifications or rankings on the site unless the claim is APPROVED in the facts register.

## 5. Colour

### 5.1 Palette

| Token | Name | HEX | RGB | Role | Status |
|---|---|---|---|---|---|
| `--yml-navy` | Deep Maritime Navy | `#0D283B` | 13, 40, 59 | Headlines, navigation, dark sections | PROPOSED |
| `--yml-cyan` | YML Ocean Cyan | `#31A9DE` | 49, 169, 222 | Primary accent, rules, highlights | APPROX. from logo |
| `--yml-wave` | YML Wave Blue | `#97D9F3` | 151, 217, 243 | Soft accents, diagrams | APPROX. from logo |
| `--yml-teal` | Harbor Teal | `#167B94` | 22, 123, 148 | Data markers, links on light backgrounds (see §5.3) | PROPOSED |
| `--yml-mist` | Coastal Mist | `#F3F7F8` | 243, 247, 248 | Canvas / neutral surfaces | PROPOSED |
| `--yml-ink` | Ink Charcoal | `#18252D` | 24, 37, 45 | Body text | PROPOSED |
| `--yml-steel` | Steel Gray | `#6F8190` | 111, 129, 144 | Metadata, dividers | PROPOSED |
| `--yml-white` | White | `#FFFFFF` | 255, 255, 255 | Whitespace, logo staging | Standard |

Primary = Navy, Cyan. Secondary = Wave Blue, Teal. Neutrals = Mist, Ink, Steel, White.

Verification done for this package: sampling the supplied logo raster gives cyan ≈ `#30A8E0` and wave blue ≈ `#90D8F0`–`#98D8F0`, consistent with the documented approximations. The **YML lettering samples at ≈ `#1E1E1E`–`#202020` (neutral near-black), not Navy or Ink.** Do not recolour the logo to match the palette.

Naming conflict: the mood-board image labels `#167B94` as “Sea Teal” and Navy as “Deep Maritime”; the standards say “Harbor Teal” and “Deep Maritime Navy”. Use the standards names.

### 5.2 Proportion

Approximately 60% white/mist, 25% navy/ink, 10% cyan, 5% wave blue/teal. Never use all bright blues at equal weight.

### 5.3 Accessibility — WCAG 2.x contrast (computed for this package)

| Foreground on background | Ratio | Normal text (4.5:1) | Large text / UI (3:1) |
|---|---|---|---|
| Ink on White | 15.66 | Pass | Pass |
| Ink on Mist | 14.52 | Pass | Pass |
| Navy on White | 15.18 | Pass | Pass |
| White on Navy | 15.18 | Pass | Pass |
| Wave Blue on Navy | 9.78 | Pass | Pass |
| Cyan on Navy | 5.68 | Pass | Pass |
| Navy on Cyan | 5.68 | Pass | Pass |
| Teal on White | 4.89 | Pass | Pass |
| Teal on Mist | 4.53 | Pass (marginal) | Pass |
| Steel on White | 4.02 | **Fail** | Pass |
| Steel on Mist | 3.73 | **Fail** | Pass |
| Cyan on White | 2.67 | **Fail** | **Fail** |
| White on Cyan | 2.67 | **Fail** | **Fail** |

Consequences for the website (these resolve a conflict in the standards, which list cyan for “links”):
- **Never set cyan text on white or mist.** On light backgrounds use Teal (or Navy) for links and accent text; cyan is for rules, icons and fills only.
- **Never set white text on a cyan button.** Use Navy text on cyan, or a Navy button with white text.
- Steel Gray is for ≥ 18.66 px bold / 24 px regular text, borders and icons — not small body copy.
- Cyan is fine as text or links on Navy.

## 6. Typography

| Role | Family | Weights | Status | Licence |
|---|---|---|---|---|
| Headlines | **Manrope** | 600 SemiBold, 700 Bold | PROPOSED | SIL Open Font License 1.1 |
| Body / UI | **Inter** | 400 Regular, 500 Medium | PROPOSED | SIL Open Font License 1.1 |
| Micro-labels (region, dates, series IDs) | **IBM Plex Mono** | 500 Medium | PROPOSED | SIL Open Font License 1.1 |
| Fallback | Arial / Aptos | — | PROPOSED | System fonts |

- No font files are in the workspace. All three families are free open-source fonts; fetch from Google Fonts or self-host from the official repositories (see `LICENSES_AND_USAGE.md`). Self-hosting (e.g. `@fontsource`, `next/font`) is preferred for privacy and performance.
- The logo’s own lettering is **not** set in any of these fonts; do not try to re-type the logo.
- Management has not confirmed whether Yentrans already uses corporate typefaces (Standards §08, decision 2). If they nominate others, swap the stack.
- Web fallback stacks:
  - Headings: `"Manrope", "Inter", Arial, "Helvetica Neue", sans-serif`
  - Body: `"Inter", Arial, "Helvetica Neue", sans-serif`
  - Mono: `"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace`
- Execution: large, composed headlines; avoid over-tracking. Micro-labels in uppercase mono, small size, Steel or Teal on light, Wave Blue on dark. Example series label format: `YENTRANS / FIELD NOTES / 01`.
- Note: the PDF reference itself renders in Noto Serif / Carlito because the fonts were substituted at export. Ignore the PDF’s rendered typefaces.

## 7. Logo

### 7.1 What exists

| Variant | File | Status |
|---|---|---|
| Full-colour horizontal lockup **with ®**, on white | `logos/YML_Registered_Logo_PROVISIONAL.png` (1065 × 530 px, RGB, opaque white background, no alpha) | **PROVISIONAL** — raster draft; ® added typographically by the previous drafting process, not by Yentrans’ designer |
| Original lockup without ® (`YML Logo.pdf`) | — | **MISSING** from this project (named as the source in Standards §02) |
| Vector master (AI/SVG/EPS/PDF) | — | **MISSING** |
| Reverse (for dark backgrounds) | — | **MISSING** — do not invert the PNG |
| Monochrome | — | **MISSING** |
| Stacked lockup | — | **MISSING** |
| Symbol-only / compact mark | — | **MISSING** |
| Favicon, apple-touch-icon, PWA icons, social avatar | — | **MISSING** |

Lockup anatomy: blue wave/hull motif at left (cyan + wave blue), “YML” wordmark in near-black at right with a light-blue wave passing through it, “YENTRANS MARITIME LOGISTICS” in cyan capitals underneath; ® at upper-right of “YML”. Visible artwork occupies roughly x 15–1061, y 86–415 of the PNG; the file has ~86 px of white above and ~115 px below the artwork.

### 7.2 The ® question — resolve before launch

The ® symbol asserts a registered trademark. The workspace states registration is **user-stated only**; registration number, exact mark, owner, classes and jurisdictions have not been evidenced (claim YML-009). A public website is visible in every jurisdiction, including the US. Misuse of ® for an unregistered mark can be unlawful in some jurisdictions (including India and the US).

Website rule until counsel signs off: treat the ® lockup as a **placeholder**. Preferred path is to obtain the original `YML Logo.pdf`/vector master without ® and use that; add ® only after legal approval.

### 7.3 Rules (from Standards §02)

- Place on white or very light neutral (White, Mist) only.
- Preserve proportions and colours; never redraw, stretch, recolour, outline, add shadow or effects.
- No logo on photography unless on a clear, protected light panel.
- Dark backgrounds need an approved reverse lockup — none exists yet. In a dark footer, place the logo on a white panel or use the text name until a reverse is supplied.
- ® sits upper-right of YML only; never on branch labels, never repeated next to every mention of the name.
- Location labels are separate secondary type, never part of the lockup.

### 7.4 Clear space and minimum size

Neither is defined numerically in the source. Interim values for the web, derived from the artwork (mark them for designer confirmation):
- **Clear space:** at least the cap height of the “YML” letters on all sides (≈ 0.12 × artwork height). Never let other elements enter the artwork’s bounding box.
- **Minimum size:** ≥ 160 px wide on screen for the full lockup, so the “YENTRANS MARITIME LOGISTICS” line stays legible. Below that, a compact mark is needed — which does not exist yet.
- Because the PNG carries large white margins, crop or position using the artwork bounds, not the file edges, or ask the designer for a tightly cropped export.

### 7.5 Correct / incorrect use

Correct:
- Full-colour lockup on a white header bar.
- Full-colour lockup on a Coastal Mist footer panel with clear space respected.

Incorrect:
- Inverting the PNG for a dark navy header.
- Recolouring the YML letters navy to “match” the palette.
- Adding drop shadows, glows or outlines.
- Using the opaque-white PNG on a mist or navy background (creates a visible white box) instead of an approved transparent/reverse file.
- Creating “Yentrans Dubai” or similar branch logos.
- Upscaling the 1065 px raster for retina hero use — it will soften; wait for vector.

## 8. Light / dark placement summary

| Surface | Logo | Status |
|---|---|---|
| White header / nav | Full-colour lockup | Available (provisional PNG) |
| Mist footer | Full-colour lockup on white panel, or transparent version | Transparent version **MISSING** |
| Navy header / footer | Reverse lockup | **MISSING** — use white panel or text fallback |
| Browser tab | Favicon | **MISSING** |

## 9. Photography and imagery

From Standards §04 and the creative direction:
- **Preferred:** licensed editorial port photography; real, verified Yentrans images when available; accurate maps; custom vector trade diagrams; restrained technical illustration.
- **Current inventory: zero approved photographs** of Yentrans facilities, staff, trucks, offices or cargo. The teams have said they cannot supply routine branch photography.
- Stock/licensed images must be logged as illustrative and must never imply they show Yentrans-owned facilities, vessels or shipments.
- No AI-generated photorealistic port operations, staff or facilities. No neon globes, stock handshakes, fake dashboards or fabricated statistics.
- Maps: geographically accurate; any route lines labelled illustrative unless the lane is a confirmed service.
- Never upload or display client paperwork (BLs, invoices) without redaction and permission.

Practical implication: a typographic, diagram-led site with maps and licensed editorial photography is consistent with the brand; a site built around “our facilities” imagery is not possible yet.

## 10. Iconography

No icon set exists in the workspace. The standards describe the visual language as line drawings and schematic diagrams with cyan/steel annotation. If the developer needs icons, choose one open-licence line-icon family (single stroke weight), colour them Navy/Teal on light and Wave Blue on dark, and flag the choice for brand approval. Do not mix icon families.

## 11. Layout and motion cues

- Editorial grid, generous negative space, one clear headline per section, short annotations, minimal decoration.
- Thin cyan horizontal rules are a recurring device (mood board, standards).
- Motion: subtle line tracing, grid reveals, gentle pans, deliberate type transitions. Avoid glitch effects, hyperactive animation, fake AI footage. Respect `prefers-reduced-motion`.

## 12. Network and location presentation

Internal directory (all PENDING verification): Cochin (corporate office), Chennai, Vizag — India; Muscat, Salalah — Oman; Dubai — UAE; Houston, Texas — United States.

- Do not publish addresses, phone numbers, services per office or “active branch” status until approved (see facts file).
- Standards §06: the external short form “India • Oman • UAE • United States” is allowed only after the Houston presence’s operating status is verified. If it is not an active operating office, describe it separately and accurately.
- Do not assume every office offers identical services.

## 13. Source documents

- `source/brand-standards/Brand_Standards_v1_1_REFERENCE.pdf` — the reference PDF (10 pages).
- Editable `Brand_Standards_v1_1_EDITABLE.docx`, `Corporate_Company_Profile_WORKING.docx`, `Approved_Facts_and_Certifications_REGISTER.docx`, `Creative_Templates_and_Design_Direction.docx` — exist in the Claude Project as extracted text only; the original .docx binaries are not reachable from this environment. See `README_HANDOFF.md`.
