/**
 * Yentrans Maritime Logistics — Eleventy build.
 *
 * Outputs plain static HTML, so hosting is unchanged: GitHub Pages serves it
 * from a workflow artifact, Cloudflare Pages serves _site/ at the domain root.
 *
 * PATH_PREFIX exists because GitHub Pages serves this repo under
 * /yentrans-website/ while Cloudflare Pages serves it at the root. Every
 * internal href and asset src MUST go through `url` (and assets through
 * `assetUrl | url`) or it will 404 on the Pages preview.
 *   npm run build          -> root paths           (Cloudflare Pages, production)
 *   npm run build:ghpages  -> /yentrans-website/   (GitHub Pages preview)
 */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addWatchTarget("src/assets/");

  // ---- Filters ----------------------------------------------------------
  // Asset paths are kept as a separate hook from `url` so a future CDN or
  // fingerprinting step has one place to change.
  eleventyConfig.addFilter("assetUrl", (p) => p);

  eleventyConfig.addFilter("date", (value, opts = {}) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC", ...opts,
    });
  });

  eleventyConfig.addFilter("isoDate", (v) => {
    if (!v) return "";
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString();
  });

  eleventyConfig.addFilter("readingTime", (text) => {
    const words = String(text || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // Nunjucks has no rejectattr (it is a Jinja/Liquid filter), so provide the
  // subset the templates use: reject items whose attribute equals a value.
  eleventyConfig.addFilter("rejectattr", (arr, attr, op, val) => {
    const read = (item) => attr.split(".").reduce((o, k) => (o == null ? o : o[k]), item);
    if (op === undefined) return (arr || []).filter((i) => !read(i));
    if (op !== "equalto" && op !== "eq" && op !== "==")
      throw new Error(`rejectattr: unsupported operator "${op}" (only equalto)`);
    return (arr || []).filter((i) => read(i) !== val);
  });

  // JSON-LD must be escaped so a "</script>" inside any string cannot break out.
  eleventyConfig.addFilter("jsonld", (obj) =>
    JSON.stringify(obj, (k, v) => (v === null || v === undefined ? undefined : v))
      .replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026"));

  // ---- Shortcodes -------------------------------------------------------
  // Footer copyright year, so the build never ships a stale hardcoded year.
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  // ---- Collections ------------------------------------------------------
  // Draft gating lives here: nothing reaches a public listing unless its
  // status says so. Drafts still build a page (so reviewers can read them)
  // but those pages carry noindex and a visible DRAFT banner.
  const byDateDesc = (a, b) =>
    String(b.data.datePublished || "").localeCompare(String(a.data.datePublished || ""));

  eleventyConfig.addCollection("articlesAll", (c) =>
    c.getFilteredByGlob("src/content/articles/*.md").sort(byDateDesc));

  eleventyConfig.addCollection("articlesPublished", (c) =>
    c.getFilteredByGlob("src/content/articles/*.md")
      .filter((p) => p.data.status === "published").sort(byDateDesc));

  eleventyConfig.addCollection("jobsAll", (c) =>
    c.getFilteredByGlob("src/content/jobs/*.md"));

  eleventyConfig.addCollection("jobsOpen", (c) =>
    c.getFilteredByGlob("src/content/jobs/*.md").filter((p) => p.data.status === "open"));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
