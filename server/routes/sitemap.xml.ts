import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";
export default defineEventHandler(async (event: any) => {
  // Fetch all documents
  const docs = await serverQueryContent(event, "blog")
    .where({
      createdAt: { $lte: new Date().toISOString().split("T")[0] },
    })
    .sort({ createdAt: 1 })

    .find();
  const sitemap = new SitemapStream({
    hostname: "https://www.sciredev.com",
  });

  sitemap.write({
    url: "/",
    changefreq: "daily",
    priority: 1,
  });
  for (const doc of docs) {
    sitemap.write({
      url: doc._path,

      lastmod: doc.modifiedAt,
      changefreq: "daily",
      img: [
        {
          url: doc.image,
          caption: doc.description,
          title: doc.title,
        },
      ],
    });
  }
  sitemap.end();
  return streamToPromise(sitemap);
});
