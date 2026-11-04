import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

/**
 * Yentrans Maritime Logistics — Eleventy build.
 *
 * Output is plain static HTML, so hosting is unchanged: GitHub Pages serves it
 * from a repo sub-path (/yentrans-website/) and Cloudflare Pages serves it from
 * the root. PATH_PREFIX reconciles the two — every internal href and asset src
 * in a template MUST go through the `url` filter or it will break on Pages.
 */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addWatchTarget("src/assets/css/");

  // ---- Filters --------------------------------------------------------
  eleventyConfig.addFilter("date", (value, opts = {}) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC", ...opts,
    });
  });
  eleventyConfig.addFilter("isoDate", (v) => (v ? new Date(v).toISOString() : ""));
  eleventyConfig.addFilter("readingTime", (text) => {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });
  eleventyConfig.addFilter("where", (arr, key, val) =>
    (arr || []).filter((i) => (i.data ? i.data[key] : i[key]) === val));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("jsonld", (obj) =>
    JSON.stringify(obj).replace(/</g, "\\u003c"));

  eleventyConfig.addShortcode("year", () => String(new Date().getUTCFullYear()));

  /**
   * Content-hashed asset URLs.
   *
   * Pages and Cloudflare both serve /assets/* with long cache lifetimes, so a
   * returning visitor keeps the previous stylesheet or script after a deploy.
   * That is not hypothetical: a stale main.js silently disabled the quote
   * form's submit handler during development, and the form fell back to a
   * native GET. Appending a hash of the file contents makes every change a new
   * URL, so an updated asset is always fetched.
   */
  const assetHashes = new Map();
  eleventyConfig.addFilter("assetUrl", function (p) {
    const url = this.ctx ? p : p;
    if (!assetHashes.has(p)) {
      try {
        const buf = readFileSync(new URL("./src" + p, import.meta.url));
        assetHashes.set(p, createHash("sha256").update(buf).digest("hex").slice(0, 8));
      } catch { assetHashes.set(p, ""); }
    }
    const h = assetHashes.get(p);
    return h ? `${p}?v=${h}` : p;
  });

  // ---- Collections ----------------------------------------------------
  // Only `published` articles and `open` jobs ever reach a public listing.
  // Drafts still build a page so reviewers can read them, but those pages
  // carry noindex and a visible DRAFT banner (see the layouts).
  eleventyConfig.addCollection("articlesAll", (c) =>
    c.getFilteredByGlob("src/content/articles/*.md")
      .sort((a, b) => (b.data.datePublished || "").localeCompare(a.data.datePublished || "")));
  eleventyConfig.addCollection("articlesPublished", (c) =>
    c.getFilteredByGlob("src/content/articles/*.md")
      .filter((p) => p.data.status === "published")
      .sort((a, b) => (b.data.datePublished || "").localeCompare(a.data.datePublished || "")));
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
