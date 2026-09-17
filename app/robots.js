// Keep SITE in sync with metadataBase in layout.js.
// Public pages are intentionally crawlable and listed in sitemap.js.
const SITE = "https://travelnurseguide.com";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
