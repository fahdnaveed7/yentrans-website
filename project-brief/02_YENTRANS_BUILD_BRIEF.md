# Yentrans Maritime Logistics — Complete Website Build Brief

**Version:** 1.0 | **Date:** November 2026 | **Status:** Build specification; all content subject to corporate approval.

## 0. Mission

Extend the **existing** Yentrans corporate website into a cohesive, premium but credible international freight-forwarding site with a full Industries experience, Careers, an HR Executive job detail, an application workflow, Insights & News, a Knowledge Hub, stronger company/services/network pages, and functioning lead generation. **Preserve the existing UI/UX direction**; do not redesign from scratch.

Existing public preview: https://fahdnaveed7.github.io/yentrans-website/
Existing repository: https://github.com/fahdnaveed7/yentrans-website (verify actual local Git remote before touching anything).
Current production domain: `yentransmaritime.com` — currently connected to an existing WordPress site. **DO NOT modify its DNS, Cloudflare registrar settings, MX/SPF/DKIM/DMARC, or current website deployment.** The new website will only be connected to the real domain after explicit approval.

Companion files:
- `01_BRAND_PACKAGE_REQUEST.md` — how to retrieve the real brand assets from the separate project.
- `03_WEBSITE_CONTENT_PACK.md` — editable page copy, industries, job, articles, metadata and forms.
- `04_CLAUDE_CODE_START_PROMPT.md` — instructions to paste into Claude Code.

## 1. Work process — mandatory

1. Read the current repository and summarize its framework/build tooling/routes/dependencies, existing layout components, design tokens, navigation, and current deploy target. Do not infer a framework or replace it gratuitously.
2. Inspect `brand-reference/BRAND_GUIDELINES.md`, `brand-reference/BRAND_MANIFEST.json` and approved assets if they exist. **These supersede generic stylistic assumptions.** If missing, retain existing site styles and use placeholders rather than inventing a new visual identity.
3. Create a **new feature branch** (`feature/corporate-site-expansion`) and/or backup before edits. Do not force-push or overwrite `main`. Commit in logical stages; do not touch live DNS/deployment.
4. Draft a short implementation plan, route map, data schema, and dependencies. Identify unanswered content/legal facts before implementation; implement safe placeholders and review statuses.
5. Extend existing reusable header/footer/page templates; build sections with components, responsive behavior, meaningful headings, accessibility, SEO, and good performance.
6. Integrate all approved copy in `03_WEBSITE_CONTENT_PACK.md`; for unsupported claims use `PENDING_VERIFICATION` flags and never render unapproved public claims as established fact.
7. Run tests, lint/build, internal link checks, responsive/mobile review, keyboard navigation and form-security tests. Provide a preview URL or documented preview deployment.
8. Deliver a changed-files summary, a checklist of credentials/configuration required, and a precise deployment procedure. **Stop before production DNS or domain changes.**

## 2. Brand strategy and voice

**Primary positioning:** Integrated international logistics partner with operational depth, India–Middle East strength, and recognized reefer experience. The site should convey that Yentrans coordinates real cargo and paperwork, not just provides abstract shipping promises.

**Preserve the established voice:** The current headline “Freight is a people business with steel around it.” is distinctive and can remain as a brand line. Copy should be measured, specific and operationally informed. Avoid stock phrases such as “world's best,” “seamless solutions,” “market leader,” or unverified guaranteed performance.

**Brand palette/typography:** Derived from the actual brand package and existing UI. Do not assume colors or fonts. Favor original Yentrans imagery over generic stock. Appropriate approved maritime imagery may supplement it.

**Audience:** Indian exporters/importers, Gulf shippers and consignees, international procurement/logistics managers, carrier and logistics partners, job candidates, and prospective employees.

**Conversion goals:** Request a freight quote; contact a branch; view services/industry capabilities; apply to open positions; read useful trade resources and articles.

## 3. Global navigation and information architecture

Top-level desktop/mobile nav:
- Home `/`
- About `/about` or retain existing `/about.html`
- Services `/services`
- Industries `/industries`
- Global Network `/network`
- Insights & News `/insights`
- Careers `/careers`
- Contact `/contact`
- Prominent CTA **Request a Rate** `/request-a-quote` or existing contact CTA as working fallback.

Other routes:
- `/services/[slug]` optional detailed service pages if architecture supports content reuse; start with 5 flagship service pages.
- `/industries/[slug]` for flagship industries; all 18 categories must appear on industries index.
- `/insights/[slug]` for each complete article.
- `/careers/[slug]` for approved jobs only; draft jobs must never be presented as available vacancies before approval.
- `/careers/apply/[job-id]` or clearly accessible apply form.
- `/resources` (FAQ and practical shipping explanations).
- `/privacy` and `/applicant-privacy` — draft informational copy requiring legal review.
- `/404` with working navigation.

Keep prior URLs and add redirects/aliases as needed so bookmarks and search results do not break. Support repository-base-path preview on GitHub Pages (`/yentrans-website/`) and absolute-root deployments on Cloudflare Pages, without hardcoded broken asset paths.

## 4. Detailed page specifications

### Home
Hero using actual Yentrans approved assets; company headline + one sentence explaining integrated services/region; CTA Request a Rate, secondary Explore Services. Below: trust/credentials (verify), service grid, 4 business differentiators, network map/presence, flagship industries, operational explanation, latest 3 articles, open roles only if approved, final quote CTA. No invented metrics. Clearly labeled draft placeholders for proof points that need approval.

### About
Founding story (2009, Kochi), operational philosophy, company and people, services evolution, branch footprint India/UAE/Oman, timeline only with verifiable milestones, infrastructure numbers only after approval, real team/office imagery where available. Distinguish direct operations from global partner coverage.

### Services
Overview + detail cards: FCL Ocean Freight; LCL Consolidation; Reefer/Temperature-Controlled Logistics; Customs Clearance & Documentation; Inland Transportation & Door Delivery; Project/OOG Logistics (capability language, verify services); Warehouse & Insurance Coordination (where actually offered). For each: buyer pain point, what Yentrans coordinates, cargo/route considerations, CTA.

Avoid statement “Yentrans issues Master Bills of Lading.” More accurate: Yentrans can issue HBLs where licensed/authorized and **coordinates carrier-issued MBLs** when required. Confirm NVOCC and other credentials before publishing exact registrations.

### Industries
Dedicated grouped index with **18** sectors and concise useful descriptions, filtering by group, keyword search optional, industry CTA. Group:
- Perishables & Healthcare: Seafood & Fisheries; Agriculture & Fresh Produce; Food & Beverage; Pharmaceuticals & Healthcare.
- Manufacturing & Industrial: Automotive & Auto Components; Industrial Machinery & Equipment; Chemicals & Petrochemicals; Electronics & Technology; Textiles & Apparel; Metals, Minerals & Steel; Plastics, Polymers & Packaging; Paper, Pulp & Forest Products.
- Infrastructure & Energy: Project Cargo & Heavy Engineering; Construction & Infrastructure; Renewable Energy & Power; Oil, Gas & Energy Equipment.
- Consumer & General Trade: Retail & Consumer Goods; General Cargo & Multisector Trade.

Feature detailed sector pages for Seafood, Pharmaceuticals, Automotive and Project Cargo, with language distinguishing established expertise from potential/subject-to-confirmation capabilities. Never imply pharmaceutical GDP certification, dangerous-goods handling, exclusive carrier contracts or heavy-lift assets without documentary evidence.

### Global Network
Show Kochi as head office and India as home market; Dubai/UAE and Oman operations. Branch map/list only for approved office addresses. Explain origin coordination, port clearance, inland movement and destination partner handovers; no implied physical offices in countries where the company uses agents. “Worldwide” means service reach, not office ownership. Include click-to-contact branch cards only with verified details.

### Infrastructure & Capabilities
Optional page/section: trucks/trailers, gensets, reefer movements, customs/documentation teams, freight systems and port network. Publish exact fleet/TEU/employee numbers only after an authorized Yentrans owner signs off on definitions, period and current validity. Distinguish owned from contracted assets.

### Careers
Distinct career landing page with hiring philosophy, culture, learning and growth, the roles people work in, filters by location/department, job cards (`Open`, `Closed` or `Draft` but only `Open` visible publicly), individual job descriptions, and application flow. General interest profile submission only if secure intake system is deployed. No fictional testimonials, fake HR benefits or invented work policies.

### Jobs
First content entry: **HR Executive — Kochi**, details in content pack. `status: draft` by default, not publicly advertised until authorized. Proposed salary ₹20,000/month is **internal editorial metadata**, not public copy until management approves; proposed on-site full-time, 0–2 years. No fixed email address unless company confirms hiring inbox.

### Insights & News
Corporate editorial hub with categories: Industry Insights, Trade & Regulatory Updates, The Yentrans Journal, Knowledge Hub. Cards, tags, search/filter, article detail pages with author/source/dates, reading time, SEO metadata, related articles, no dates on speculative announcements. All articles seed as **draft** until factual/editorial review and are clearly distinguished from current regulatory guidance. Include 6 substantive initial article drafts from content pack. Company news entries only if verifiable actual events are provided; no invented announcements.

### Resources / Knowledge Hub
Plain-English explanations of FCL/LCL, reefer terms, Incoterms, HBL/MBL, shipments documents, project cargo basics; downloadable templates only after approved/legal review. Avoid presenting customs rules without country/date.

### Contact / Request a Rate
Keep current CTA and add a useful quote form: name, work email, company, phone optional, origin, destination, commodity, FCL/LCL/project/reefer, container/equipment type, estimated volume/weight, ready date, handling notes, privacy consent. Avoid requiring excessive details for a first inquiry. Verified branch contacts only. No placeholder address/phone/email on live pages.

## 5. Data-driven content architecture

Use the existing stack if it supports it; otherwise static Markdown/JSON/MDX content and lightweight build are acceptable. Candidate schema:

- `jobs`: id, slug, title, department, location, employmentType, experience, salaryVisibility, salary, summary, responsibilities, requirements, benefits, status(draft/open/closed), publishedAt, applicationDeadline optional, applicationRoute, seo.
- `articles`: slug, title, category, excerpt, content, tags, author, publishedAt, updatedAt, status(draft/published), coverImage, sources, seo.
- `industries`: slug, group, title, shortDescription, longDescription, suitability/limitations, image, proofStatus, CTA.
- `offices`: country, city, legalEntity, address, email, phone, openingHours optional, approved boolean.
- `siteSettings`: verified brand claims and metrics, approvals, social links.

Data must be independent of the UI so a future content manager can edit jobs and blogs without modifying component logic. Add documentation with examples for creating, editing, closing and publishing jobs/articles.

## 6. Functional careers application workflow — build securely

We want working applications, not a decorative form.

**Preferred production architecture:** Cloudflare Pages frontend, with supported server-side endpoint (Pages Functions or compatible Worker), Cloudflare Turnstile (spam mitigation), private object storage for CV uploads (e.g. R2) and restricted application metadata store (e.g. D1). Use current supported APIs and set all secrets via deployment configuration, never repo. Use verified email notification delivery only with approved service and credentials. Optional staff dashboard protected by Cloudflare Access or equivalent authenticated role-based access; don't implement an open `/admin` endpoint.

**Intake fields:** role/job ID, full name, email, phone, location, LinkedIn optional, resume PDF/DOCX, years of experience, short note, privacy acknowledgment. Server-side validate file signature, type and max size; random private object keys; block public downloads and directory listings; enforce rate limiting; consider malware scanning before staff opens uploads; ensure retention/deletion workflow and access audit. No discriminatory screening fields, public applicant lists or auto-rejection AI.

**If backend account access or security prerequisites aren't available:** implement polished validated UI but place it in explicit `APPLICATIONS_DISABLED` mode with a clear truthful message, and produce a deployment checklist. **Never show “Application submitted” unless the server has actually accepted and stored it.** Never store resumes in git, front-end state, webhooks exposed publicly, or unsecured Google Sheets. No real applicant data during preview until secure storage and privacy text are approved.

**Admin UX target:** view job applicants by role, status (new/review/interview/closed), private resume link with signed short-lived URL, internal notes, CSV export only to authorized users, manual deletion and retention window. This is Phase 2 if protected backend infrastructure cannot be provisioned during the build.

## 7. Insights / editorial system

Article writing and publishing must work through repo-backed Markdown/frontmatter or the existing content architecture. Include author/date/category/source, drafts and scheduled or manual publication support where practical; no fake publication dates, made-up policy announcements or client case studies. Optional password-protected editorial interface is a future enhancement unless authentication exists.

## 8. Nonfunctional requirements

- Responsive desktop/tablet/mobile; readable, coherent typography; no horizontal overflow.
- Keyboard accessible menus, forms and dialogs; sensible focus states, skip link, alt text, semantic headings; WCAG 2.2 AA target.
- SEO: distinct page titles/descriptions, Open Graph/Twitter preview, canonical URLs appropriate for preview vs production, sitemap, robots, JSON-LD Organization/Article/JobPosting only for factual published content. **No JobPosting schema for draft jobs.** Preview/staging should be `noindex`.
- Performance: optimized AVIF/WebP or appropriately sized approved images, lazy-load lower images, responsive sizes, font loading strategy, minimal JS and accessible reduced-motion behavior.
- Clear 404 states, no broken links, working mobile nav, no console errors; error messages on failed form submissions.
- Security: credentials via env/secrets, no API keys in git, no unpublished assets/data included in public build. Use strict form validation and anti-spam controls before accepting real resumes.
- Legal: website privacy and applicant privacy content as **DRAFT pending qualified legal review**; don't pretend to have a formal GDPR/India DPDP compliance certification.

## 9. Deployment and ownership

**Do not launch to `yentransmaritime.com` automatically.** Use the existing GitHub Pages preview or a Cloudflare preview `.pages.dev` deployment on a non-production branch. The GitHub Pages preview may need a repository base path; the Cloudflare Pages build uses root paths. Resolve both in code.

After the company approves the site, connect the Git repository to the Yentrans-owned Cloudflare Pages project and configure production branch/build output. Keep current Google Workspace MX/SPF/DMARC/DKIM and non-website records unchanged. Attach root and `www` as Pages custom domains only at approved cutover, test HTTPS, preserve rollback. See Cloudflare documentation for actual steps at implementation time.

**Approved migration success:** content approved; company contacts verified; application intake working and tested or explicitly disabled; article publishing works; mobile/accessibility/performance tested; Cloudflare Pages preview approved; domain change separately authorized; no lost Google Workspace mail.

## 10. Acceptance criteria / definition of done

- Existing visual system recognizably preserved and brand package followed.
- Home, About, Services, Industries (18), Network, Careers, approved job pages, Insights, at least 6 full article drafts, Resources, Contact, and Quote Request working.
- Careers job listing/filter/search and draft/open/closed logic working. HR Executive job exists as **draft** until approved.
- Blog/article metadata, categories and related content working; drafts not indexed/published accidentally.
- Contact/quote form cannot silently fail; application form safe or explicitly disabled with documented blocker.
- No invented office contact details, credentials, certification, metrics, client logos, job openings, employment benefits or press announcements.
- Existing URLs accounted for; no broken assets on GitHub Pages base path or Cloudflare root path.
- `npm`/framework build, lint, tests and manual mobile checks pass where applicable.
- Delivery includes README, `CONTENT_EDITING.md`, `DEPLOYMENT_CHECKLIST.md`, `APPROVALS_NEEDED.md`, git branch/commit summary, preview link.
- **No production DNS modification, no registrar transfer modification, no email/DNS changes, no public launch without explicit approval.**

## 11. Approvals needed before launch

1. Brand owner approval: final logo, palette, type, photography, captions and social handles.
2. Company verification: complete legal name, licenses/NVOCC/MTO memberships, direct branches vs partners, numbers, client permissions and actual services.
3. HR approval: job status, responsibilities, salary disclosure, how to apply, recruitment/privacy policy.
4. Marketing/editorial approval: blog articles, bylines, update dates, any external sources, photographs and case studies.
5. IT approval: DNS deployment window, Cloudflare Pages production routing, contact form mail delivery, resume storage/access, SSL, rollback and Google Workspace continuity.

