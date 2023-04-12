import { serverQueryContent } from "#content/server";
export default cachedEventHandler(
  async (e) => {
    const [posts] = await Promise.all([serverQueryContent(e).find()]);
    const newUrl = [...posts].map((p) => {
      return {
        loc: p._path,
        lastmod: p.modifiedAt,
      };
    });
    return newUrl;
  },
  {
    name: "sitemap-dynamic-urls",
    maxAge: 60 * 10, // cache URLs for 10 minutes
  }
);
