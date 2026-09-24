# Yentrans Maritime Logistics — Website

Corporate website for Yentrans Maritime Logistics Pvt Ltd (YML), an FMC-registered
NVOCC and MTO specialising in temperature-controlled ocean freight out of India and
the Middle East.

## Stack

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no dependencies.
The repository is the deployable artifact, which keeps the site fast, keeps hosting
free, and means anyone can edit a page without installing a toolchain.

## Structure

```
index.html              Home
services.html           Services in detail
temperature-control.html  The reefer / cold chain specialism
about.html              Company, mission, vision, credentials
contact.html            Offices and enquiry routes
assets/css/style.css    Design system. All brand tokens live in :root
assets/js/main.js       Mobile nav and scroll reveal
assets/img/             Logo, accreditation marks, photography
assets/video/           Hero and cold chain footage
```

## Brand

Colours are sampled from the registered logo artwork, not approximated:

| Token | Hex | Use |
|---|---|---|
| `--blue` | `#38AAE1` | Primary. Buttons, accents, rules |
| `--blue-deep` | `#1B7FB0` | Hover states, eyebrow text |
| `--blue-ink` | `#0E4A68` | Dark blue grounds |
| `--blue-light` | `#A2D9F7` | Light accents, tick marks |
| `--ink` | `#1D1D1B` | Body text, dark sections |

White carries the page. Blue is used sparingly so that it still reads as emphasis.

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
