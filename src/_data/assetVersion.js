import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

/**
 * Short content hash of the CSS and JS bundles, appended to their URLs as ?v=.
 *
 * Without this, a returning visitor keeps whatever stylesheet their browser
 * cached from the last deploy. A markup change then lands against old CSS and
 * the page renders broken — which is exactly what happened repeatedly while
 * building this. The hash changes only when the file changes, so caching stays
 * aggressive and correctness no longer depends on the visitor's cache state.
 */
function hash(path) {
  try {
    return createHash("sha1").update(readFileSync(path)).digest("hex").slice(0, 8);
  } catch {
    return "dev";
  }
}

export default {
  css: hash("src/assets/css/style.css"),
  js: hash("src/assets/js/main.js"),
};
