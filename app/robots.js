// Update SITE to the real domain at launch (keep in sync with metadataBase in layout.js).
// Crawling is allowed; the site is kept out of the index by the `robots` meta tag
// in layout.js (index:false) until launch. That combination is intentional: an
// allowed crawl lets bots actually see the noindex, which is how you reliably
// stay unindexed. At launch, remove the meta noindex and this stays as-is.
const SITE = "https://traveling-nurse.jmguanso1.workers.dev";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
