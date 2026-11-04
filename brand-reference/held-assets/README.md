# Held assets — not published

These three credential marks are referenced by `src/_includes/partials/footer.njk`
but are **deliberately outside the published asset path**, so they cannot reach a
public build even by accident.

| File | Claim | Gate | Blocker |
|---|---|---|---|
| `fmc-seal.svg` | FMC-registered foreign NVOCC | `approvals.credentials.fmcNvocc` | WEB-08 — no FMC record in the brand workspace |
| `mto-badge.svg` | Multimodal Transport Operator (the artwork also asserts "DG Shipping, Government of India") | `approvals.credentials.mto` | WEB-11 — no current MTO licence supplied |
| `mln-logo.png` | Member, Millennium Logistics Network | `approvals.credentials.millenniumNetwork` | TP-02 — third-party trademark; needs membership proof **and** written logo permission |

All three were displayed on every page of the previous site. `CONTENT_FACTS_TO_VERIFY.md`
marks the first two PENDING with no evidence attached and the third PROHIBITED without
written permission, so they now render only when their flag is set.

**To restore one:** attach evidence in `Claim_Evidence_Tracker.csv`, set the flag in
`src/_data/approvals.json` to `true`, and move that file back to `src/assets/img/`.
Moving the file without setting the flag does nothing; setting the flag without moving
the file produces a broken image.
