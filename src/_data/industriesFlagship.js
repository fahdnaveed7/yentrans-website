/**
 * Only flagship industries get their own page. The other 14 appear on the
 * /industries/ index as anchored cards.
 *
 * This filter lives in JS rather than a pagination `before:` string in YAML
 * frontmatter — YAML cannot carry a function, so that silently paginated all
 * 18 and produced 14 pages with an empty <h1> and no body.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const industries = JSON.parse(
  readFileSync(fileURLToPath(new URL("./industries.json", import.meta.url)), "utf8"),
);

export default industries.items.filter((i) => i.flagship);
