import { queryCollection } from "@nuxt/content/server";

export default defineSitemapEventHandler(async (event) => {
  const orgs = await queryCollection(event, "organizations")
    .where("isActive", "=", true)
    .select("slug", "lastUpdate", "sitemap")
    .all();

  return orgs.map((org) => ({
    loc: `/organizations/${org.slug}`,
    lastmod: org.sitemap?.lastmod ?? org.lastUpdate,
    changefreq: org.sitemap?.changefreq ?? "monthly",
    priority: (org.sitemap?.priority ?? 0.7) as 0.7,
  }));
});
