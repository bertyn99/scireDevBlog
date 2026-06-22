export const useLoadMeta = (options: {
  title: string;
  description: string;
  image: string;
  url: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}) => {
  const site = useSiteConfig();
  return {
    title: `${options.title} | ${site.name}`,
    ogTitle: `${options.title} | ${site.name}`,
    description: options.description,
    ogDescription: options.description,
    ogImage: options.image,
    ogUrl: options.url,
    twitterCard: "summary_large_image",
    articleAuthor: options.author,
    articlePublishedTime: options.datePublished,
    articleModifiedTime: options.dateModified,
  };
};
