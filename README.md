# Yentrans Maritime Logistics — Website

Corporate website for Yentrans Maritime Logistics (YML), a registered NVOCC and
Multimodal Transport Operator moving cargo from India and the Middle East to major
ports worldwide.

## Stack

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no dependencies.
The repository is the deployable artifact, which keeps the site fast, keeps hosting
free, and means anyone can edit a page without installing a toolchain.

## Structure

```
index.html              Home
services.html           Services in detail
network.html            Global network, routing and bills of lading
about.html              Company, mission, vision, registrations
contact.html            Offices and enquiry routes
assets/css/style.css    Design system. All brand tokens live in :root
assets/js/main.js       Mobile nav and scroll reveal
assets/img/             Logo, accreditation marks, photography
assets/video/           Hero and cold chain footage
```

## Brand

Typography is Source Serif 4 for headings and Source Sans 3 for body text.

Colours are sampled from the registered logo artwork, not approximated:

| Token | Hex | Use |
|---|---|---|
| `--blue` | `#38AAE1` | Primary. Buttons, accents, rules |
| `--blue-deep` | `#1B7FB0` | Hover states, eyebrow text |
| `--blue-ink` | `#0E4A68` | Dark blue grounds |
| `--blue-light` | `#A2D9F7` | Light accents, tick marks |
| `--ink` | `#1D1D1B` | Body text, dark sections |

White carries the page. Blue is used sparingly so that it still reads as emphasis.

The logo in `assets/img/logo.png` is the genuine artwork with the "PVT LTD" strapline
cropped off. The icons are generated from the sail-and-wave device alone, with no
wordmark, so they stay legible at favicon size.

## Local preview

No build required. Any static server works:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which publishes to GitHub
Pages. To use a custom domain, add a `CNAME` file containing the domain and point
the DNS A records at GitHub Pages.

## Editing content

All copy is written directly into the HTML. Placeholders in square brackets,
for example `[ADDRESS]` and `[PHONE]`, mark details that still need confirming
before the site goes live. Search the repo for `[` to find them all.
