# Claude Code starting prompt — Paste into the EXISTING Yentrans website project

You are working in my **existing Yentrans Maritime Logistics website repository**, not a new project. Our site preview is https://fahdnaveed7.github.io/yentrans-website/. I already have a UI/UX direction and a separate brand-assets project.

Your assignment is to build the **complete expanded Yentrans corporate website** by carefully extending this repository. Read the files I placed in `project-brief/`:

1. `02_YENTRANS_BUILD_BRIEF.md` — the full functional and technical specification.
2. `03_WEBSITE_CONTENT_PACK.md` — the actual copy for all pages, 18 industry sectors, the Careers section, draft HR Executive job description, and 6 complete article drafts.
3. `brand-reference/BRAND_GUIDELINES.md` and `brand-reference/BRAND_MANIFEST.json` (if supplied), with the actual logo/photo assets in `brand-reference/`.

**Start with inspection, not coding.** Identify the current framework, routes, deploy settings and design components; explain what you intend to reuse. Treat the approved brand package as authoritative for logos, colors and fonts; preserve existing design identity if the brand package isn't available. Do not invent brand details.

Build the expanded navigation and routes: Home, About, Services, Industries, Global Network, Insights & News, Careers, Contact, Request a Rate, Resources, article detail, individual job detail, and the necessary privacy/application pages. Include **18 industry categories**; present four flagship industries more deeply. Build searchable/filterable job listings with draft/open/closed logic; create HR Executive in **draft status**. Build the Insights library with article categories, detail pages and the **six full article drafts**, unpublished until editorial approval. Build a functional quote enquiry UX. Plan/implement a secure careers application backend on Cloudflare when credentials and controls are available; otherwise leave it explicitly disabled, never fake a successful application, and document what is needed.

**Safety and scope:** Do not alter any Cloudflare DNS records, domain registration, nameservers, Google Workspace settings, existing live WordPress website or production deployment. Do not publish job vacancies, articles, salaries, office addresses, certifications or fleet/TEU numbers until approved. Do not commit credentials, applicant resumes or confidential brand sources into Git.

Use a feature branch rather than overwriting main. Preserve the GitHub Pages `/yentrans-website/` preview behavior and prepare Cloudflare Pages compatibility. Build and test locally, including mobile, accessibility, internal links and basic SEO. Provide a preview and a clear implementation/approval checklist. Pause and ask me only for blocking facts or permissions; use visibly labeled internal draft data otherwise.

**Your first response should be:**
A. Existing codebase assessment and file/route inventory.
B. What is already working and what should be preserved.
C. Proposed page map and component architecture.
D. Proposed implementation stages and unresolved company facts.
E. Confirmation that live DNS/production won't be touched.

Then execute the build in manageable stages and show me the results.
