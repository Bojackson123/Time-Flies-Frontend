import "@worktopio/sitemap";
import { absoluteUrl } from "lib/utils";
import { MetadataRoute } from "next";
import pages from "public/pages.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return pages.map((page: Page) => ({
    url: `${absoluteUrl("")}${page.href}`,
    lastModified: new Date(),
  }));
}

//"prebuild": "npx @worktopio/sitemap"