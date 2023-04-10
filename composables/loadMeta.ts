const defaultMetaData: MetaData = {
  type: "website",
  title: "ScireDev - your website to learn the web and mobile developpement",
  description:
    "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
  robots: "index, follow, max-image-preview:large",
  ogType: "website",
  ogLocale: "en-US",
  ogLocaleAlternate: "en-AU",
  ogUrl: "https://www.sciredev.com/",
  ogSite_name: "Scire Dev",
  ogTitle: "ScireDev - your website to learn the web and mobile developpement",
  ogDescription:
    "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
  ogImage: "https://www.sciredev.com/img/scire_logo_primary.png",

  twitterCard: "summary_large_image",

  twitterUrl: "https://www.sciredev.com/",

  twitterTitle:
    "ScireDev - your website to learn the web and mobile developpement",

  twitterDescription:
    "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",

  twitterImage: "https://www.sciredev.com/img/scire_logo_primary.png",
};
type MetaKey =
  | "type"
  | "title"
  | "description"
  | "robots"
  | "author"
  | "articleDatePublished"
  | "ogType"
  | "ogLocale"
  | "ogLocaleAlternate"
  | "ogUrl"
  | "ogSite_name"
  | "ogTitle"
  | "ogDescription"
  | "ogImage"
  | "twitterCard"
  | "twitterUrl"
  | "twitterTitle"
  | "twitterDescription"
  | "twitterImage";
type Meta = { [key: string]: string | undefined };
interface MetaData extends Meta {
  type: string;
  title: string;
  description: string;
  robots: string;
  author?: string;
  articleDatePublished?: string;
  articleDateModified?: string;
  ogType: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  ogUrl: string;
  ogSite_name: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

type MetaOption = {
  title: string;
  description: string;
  image: string;
  url: string;
  author?: string;
  articleDatePublished?: string;
  articleDateModified?: string;
};
export const useLoadMeta = (metaOption: MetaOption) => {
  const metaData: MetaData = {
    type: "",
    title: "",
    description: "",
    robots: "",

    ogType: "",
    ogLocale: "",
    ogLocaleAlternate: "",
    ogUrl: "",
    ogSite_name: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterCard: "",
    twitterUrl: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    author: "",
    articleDatePublished: "",
  };
  for (const [k, v] of Object.entries(defaultMetaData)) {
    if (k.toLowerCase().includes("title"))
      metaData[k] = "Sciredev | " + metaOption.title;
    if (k.toLowerCase().includes("description"))
      metaData[k] = metaOption.description;
    if (k.toLowerCase().includes("image")) metaData[k] = metaOption.image;
    if (k.toLowerCase().includes("url")) metaData[k] = metaOption.url;

    if (
      !k.toLowerCase().includes("title") &&
      !k.toLowerCase().includes("description") &&
      !k.toLowerCase().includes("image") &&
      !k.toLowerCase().includes("url")
    )
      metaData[k] = v;
  }
  return metaData;
};
