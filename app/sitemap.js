// Update SITE to the real domain at launch (keep in sync with metadataBase in layout.js).
const SITE = "https://traveling-nurse.jmguanso1.workers.dev";

export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/guides", priority: 0.9, changeFrequency: "monthly" },
    { path: "/market", priority: 0.9, changeFrequency: "daily" },
    { path: "/resources", priority: 0.8, changeFrequency: "weekly" },
    { path: "/community/social-community", priority: 0.7, changeFrequency: "weekly" },
    { path: "/community/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/partners", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
