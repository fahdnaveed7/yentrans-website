/**
 * Yentrans Maritime Logistics — Eleventy build.
 *
 * Outputs plain static HTML, so hosting is unchanged: GitHub Pages serves it
 * from a workflow artifact and Cloudflare Pages serves it from _site/.
 *
 * PATH_PREFIX exists because GitHub Pages serves this repo under
 * /yentrans-website/ while Cloudflare Pages serves it at the domain root.
 * Every internal href and asset src goes through the `url` filter, so the
 * same source builds correctly for both targets.
 *   npm run build           -> root paths      (Cloudflare Pages, production)
 *   npm run build:ghpages   -> /yentrans-website/ (GitHub Pages preview)
 */
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ "static/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "static/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "static/site.webmanifest": "site.webmanifest" });

  eleventyConfig.addWatchTarget("assets/");

  // --- Collections -------------------------------------------------------
  // Draft gating is centralised here. An item is public only when its status
  // says so; nothing reaches a public listing by default.
  eleventyConfig.addCollection("publishedArticles", (c) =>
    c.getFilteredByGlob("src/content/articles/*.md")
      .filter((p) => p.data.status === "published")
      .sort((a, b) => new Date(b.data.publishedAt ?? 0) - new Date(a.data.publishedAt ?? 0)));

  eleventyConfig.addCollection("allArticles", (c) =>
    c.getFilteredByGlob("src/content/articles/*.md")
      .sort((a, b) => (a.data.title > b.data.title ? 1 : -1)));

  eleventyConfig.addCollection("openJobs", (c) =>
    c.getFilteredByGlob("src/content/jobs/*.md").filter((p) => p.data.status === "open"));

  eleventyConfig.addCollection("allJobs", (c) =>
    c.getFilteredByGlob("src/content/jobs/*.md"));

  // --- Filters -----------------------------------------------------------
  eleventyConfig.addFilter("readingTime", (text) => {
    const words = String(text ?? "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  eleventyConfig.addFilter("isoDate", (d) => (d ? new Date(d).toISOString().slice(0, 10) : ""));

  eleventyConfig.addFilter("longDate", (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "");

  // Offices whose address has been approved for public display.
  eleventyConfig.addFilter("approved", (arr) => (arr ?? []).filter((o) => o.approved));

  eleventyConfig.addFilter("where", (arr, key, value) =>
    (arr ?? []).filter((item) => item[key] === value));

  eleventyConfig.addFilter("limit", (arr, n) => (arr ?? []).slice(0, n));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
