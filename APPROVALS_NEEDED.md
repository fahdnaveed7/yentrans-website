# Approvals needed before this site can go public

Every item here is currently **blocked in the build**. Nothing on this list can
appear on a public page until the corresponding flag in
`src/_data/approvals.json` is set to `true`, and `tools/check-site.mjs` fails the
build if a blocked claim ever renders.

How to release a claim:

1. Attach the evidence in `brand-reference/source/corporate-facts/Claim_Evidence_Tracker.csv`.
2. Record the entity/jurisdiction, the exact approved wording and the reviewer's name.
3. Flip the flag in `src/_data/approvals.json`.
4. Run `npm run build && npm run check`.

---

## 1. Blocking — the live site currently publishes these, and they are unevidenced

The existing site at `yentransmaritime.com` and the current GitHub Pages preview
show all three of the following on **every page**. The brand package marks none
of them as approved, so this build removes them. This is the most urgent item on
the list: it is a live exposure, not a future one.

| Claim | Flag | Status in brand package | Evidence needed |
|---|---|---|---|
| "Registered NVOCC" wording + FMC seal graphic | `credentials.fmcNvocc` | WEB-08 **PENDING — not documented in the brand workspace** | FMC NVOCC registration record, tariff publication, bond, entity name match |
| "Multimodal Transport Operator" wording + MTO badge | `credentials.mto` | WEB-11 **UNKNOWN** | Current MTO licence |
| "Member, Millennium Logistics Network" + MLN logo | `credentials.millenniumNetwork` | TP-02 / WEB-12 **PROHIBITED without written permission** | Proof of membership **and** written logo permission from the network |
| SCAC code `YENT` | `credentials.scacCode` | WEB-09 PENDING | NMFTA SCAC record |
| FMC Organization No. 035760 | `credentials.fmcOrgNumber` | WEB-10 PENDING | FMC record |

**Decision needed:** confirm whether to also remove these three badges from the
*current* live WordPress site while evidence is gathered. That site is outside
this repository and has not been touched.

## 2. Company facts

| Claim | Flag | Status | Note |
|---|---|---|---|
| "Established 2009" / "since 2009" | `corporate.established2009` | YML-001 PENDING | Removed from the hero eyebrow and the About introduction. Returns automatically when approved. Certificate of incorporation needed. |
| Legal entity "Yentrans Maritime Logistics Pvt. Ltd." | `corporate.legalEntityName` | WEB-01 PENDING | Footer shows the trading name only. |
| Employee count, fleet, TEU, ports served | `metrics.*` | NUM-01…04 UNKNOWN | The About proof block renders nothing while these are false. |
| Leadership names, bios, portraits | `thirdParty.leadershipBios` | PPL-01 UNKNOWN | No team section was built. |
| Client names, logos, testimonials | `thirdParty.clientLogos` | TP-01 PROHIBITED | None used anywhere. |

## 3. Offices

The working branch directory lists seven locations with operating status, legal
entity, address and services all marked "To confirm".

- **Kochi** renders full contact details. These were **not invented**: they are
  taken from the company's own live website (`yentransmaritime.com/contact/`,
  captured 2026-11-04) and the provenance is recorded in
  `src/_data/offices.json`. They still need formal sign-off.
- **Chennai, Visakhapatnam, Dubai, Muscat, Salalah** render coverage text and
  route enquiries to the published desk. No address, phone or mailbox is shown.
- **Houston** is omitted from the site entirely. Brand Standards forbid the
  "India / Oman / UAE / United States" short form until its operating status is
  confirmed, and describing it vaguely would be worse than leaving it out.

**Needed per location:** operating status, legal entity, full address, phone,
department email, and the services actually offered there.

## 4. Brand assets

| Item | Decision needed |
|---|---|
| **Logo with ® symbol** | `BRAND_MANIFEST.json` sets `approved_for_public_website: false` and `commit_to_public_assets: false` for `YML_Registered_Logo_PROVISIONAL.png`, because ® use is not legally cleared (YML-009). `README_HANDOFF.md` conversely says to copy it into public assets as a placeholder. **These two documents conflict.** This build follows the manifest — the existing logo artwork stays in the header, and the provisional file is committed to `brand-reference/` only. Confirm which is correct. |
| Vector master, reverse, monochrome, stacked, compact mark, favicon set | All MISSING. Needed from the original designer. The footer currently uses the sail mark plus the company name set as text, because no reverse lockup exists for a dark background. |
| Open Graph image (1200×630) | MISSING. Social shares will have no preview image. |
| **Typography** | Brand Standards propose Manrope / Inter / IBM Plex Mono. The site uses Source Serif 4 / Source Sans 3, which carries its established editorial character. Switching would be a visible redesign, and the brand fonts are PROPOSED, not approved. **Brand owner decision.** Swapping is a one-file change in `src/assets/css/brand-tokens.css`. |
| **Palette** | Brand tokens are imported and the existing palette is mapped onto them, so approval is a one-file change. Cyan and Wave Blue are approximations sampled from a raster logo and should be confirmed against the vector master. |

## 5. Photography and media

`LICENSES_AND_USAGE.md`: *"No approved or licensed images exist in the workspace."*
Any image needs a recorded source, licence type, licence ID and date, and must
not imply Yentrans facilities, vessels, staff or shipments.

The site currently serves two videos and five photographs inherited from the
previous build:

```
assets/video/hero-port.mp4, coldchain.mp4
assets/img/reefer-trucks.jpg, tile-cold-store.jpg, tile-perishables.jpg,
          tile-pharma.jpg, tile-reefer-containers.jpg
```

**Needed:** the licence record for each, or replacement with approved imagery.
Flag `media.photographyLicensed` tracks this. They are still in use because
removing them would strip the site's visual identity; this is the one item on
this list that is *not* gated in the build, and it needs a decision.

## 6. Editorial

- **Six article drafts** are written and readable for review at
  `/insights/<slug>/`. None is listed or indexed. Each needs factual review and
  an approved author before publication:
  - `/insights/reefer-logistics-exporter-checklist/`
  - `/insights/fcl-vs-lcl-shipping-guide/`
  - `/insights/house-bill-vs-master-bill-of-lading/`
  - `/insights/india-middle-east-inland-logistics/`
  - `/insights/project-cargo-before-rate/`
  - `/insights/people-behind-freight-movement/`
- **Author identity.** No byline is set on any article. The content pack forbids
  crediting a made-up employee, and no approved author exists. Decide whether to
  use a named individual or an authorised "Yentrans Editorial Team" byline.
- **Seafood.** An earlier instruction was to drop seafood from the site. The
  content pack reinstates **Seafood & Fisheries as a flagship industry** with a
  full detail page. The pack is the newer and more specific instruction, so this
  build follows it. **Confirm this reversal is intended.**
- **Bill of lading wording.** An earlier instruction was to state that Yentrans
  offers "both HBL and MBL". The build brief explicitly corrects this to:
  Yentrans may issue House Bills where properly authorised, and coordinates
  carrier-issued Master Bills. The build follows the brief, which is the more
  legally careful statement. **Confirm.**

## 7. HR

- **HR Executive vacancy** is `status: draft`. It is not listed on `/careers/`,
  carries noindex, emits no JobPosting schema and offers no apply route.
- Salary ₹20,000/month is held as internal metadata with `showSalary: false` and
  is not rendered.
- Employment type "Full-time, on-site" is labelled "(proposed)" pending approval.
- **Needed:** HR sign-off on status, responsibilities, whether to publish salary,
  the hiring inbox address, and the applicant privacy notice.

## 8. Legal

- `/privacy/` and `/applicant-privacy/` are **drafts pending qualified legal
  review**, each carrying a visible notice to that effect.
- Neither claims GDPR, DPDP or any other compliance certification.
- Controlling legal entity, registered address, retention periods and data
  subject rights are all unresolved placeholders described in prose rather than
  bracket tokens.
- **No applications can be accepted until the applicant privacy notice is
  approved and the secure intake is live.**

## 9. Forms and backend

| Item | Flag | State |
|---|---|---|
| Quote enquiry endpoint | `forms.quoteEndpointEnabled` | Disabled. Form composes an email in the visitor's own client and says so. |
| Careers application intake | `forms.applicationEndpointEnabled` | `APPLICATIONS_DISABLED`. See `DEPLOYMENT_CHECKLIST.md` for what provisioning requires. |

## 10. Deployment

- Nothing has been deployed. `main` is untouched; all work is on
  `feature/corporate-site-expansion`.
- No DNS, registrar, nameserver, Google Workspace or MX/SPF/DKIM/DMARC record
  has been read or modified.
- The existing WordPress site is untouched.
- `site.isPreview` is `true`, so every page carries `noindex` and `robots.txt`
  disallows all crawling. This must be set to `false` only at approved cutover.
