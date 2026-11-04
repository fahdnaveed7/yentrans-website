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

Management supplied the company's own **"OUR REACH" locations sheet** on
2026-11-04, listing eight locations with full addresses, named branch contacts,
phone numbers and email addresses. That sheet is the source for everything in
`src/_data/offices.json`; nothing here was invented, and each record carries its
provenance.

**Seven publish in full:** Ernakulam (corporate HO), Cochin (island office),
Chennai, Visakhapatnam, Dubai, Muscat and Salalah. Dubai also shows its trade
name number. These still need formal sign-off against YML-002…007, but they are
the company's own published details, so republishing them asserts nothing new.

### 3a. Houston is held — decision needed

Houston renders as **presence only**: the card names the location and its
coverage, with no address or phone. It is not omitted, because the company does
have a North America contact point and the sheet lists one.

It is held for two specific reasons, not general caution:

1. The supplied address — `1201 Fannin St., Suite 262, PMB #6295` — is a **PMB,
   a private mailbox in a mail-forwarding suite**, not a staffed office.
   Presenting a mailbox as a "Branch Office" on a public website is a
   misrepresentation risk, independent of the brand package.
2. The number given is a **+1 631 (New York) mobile**, not a Houston line.

Brand Standards separately forbid the "India / Oman / UAE / United States" short
form until operating status is confirmed (YML-008). The full supplied details are
preserved in `_heldAddress` / `_heldContact` so nothing is lost.

**To publish it:** confirm the active US entity and its legal right to trade,
decide the accurate wording (a "North America contact" and a "Branch Office" are
different claims), then set `approved: true` and promote `_heldAddress` back to
`address`.

### 3b. The live WordPress site shows a different, stale address

`yentransmaritime.com/contact/` currently publishes **"Old Rubber Board Building,
Indira Gandhi Road, Willingdon Island, Cochin 682003"** as the single office. The
locations sheet contradicts it on two counts: the head office is **YML Building,
Panampilly Nagar 682036**, and Willingdon Island is a **separate island office in
a different building** (Island Shipping Agencies Building).

The new site uses the locations sheet and treats the old address as stale.
**Confirm which is current** — if the old one is still valid for anything, say
what; if not, the live WordPress site is publishing a wrong address today and
should be corrected regardless of this project.

### 3c. Named staff and direct mobiles — sign-off needed

Six of the seven published offices list a **named branch manager with a personal
mobile number and a personal email address** (`niyas@`, `faizal@`, `yogaraj@`,
`omar@`, `lakshmi@`, `shameer@`). Only Ernakulam has a landline, and only
Visakhapatnam uses a role address (`opsvtz@`).

The brand package is explicit: *"Do not publish personal mobile numbers of staff
as office contact numbers without explicit sign-off."* These are currently shown,
on the basis that the OUR REACH sheet is the company's own distributed
collateral and direct branch contacts are normal in freight forwarding.

**This is a reversible one-line decision.** Set
`approvals.staffContactDetails.value` to `false` in `src/_data/approvals.json`
and every card falls back to address plus branch email, with no name and no
mobile. Worth a deliberate choice rather than a default: a website is more
exposed to scraping than a PDF sent to customers, and these are individuals'
numbers.

**Needed per location:** operating status, legal entity, confirmation that each
address is current, and whether each named contact consents to publication.

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
