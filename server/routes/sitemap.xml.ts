import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";
export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find();
  const sitemap = new SitemapStream({
    hostname: "https://sciredev.com",
  });

  sitemap.write({
    url: "/",
    changefreq: "weekly",
    priority: 1,
  });
  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: "weekly",
      priority: 0.7,
      img: [
        {
          url: doc.img,
          caption: "An image",
          title: doc.title,
        },
      ],
    });
  }
  sitemap.end();
  return streamToPromise(sitemap);
});
