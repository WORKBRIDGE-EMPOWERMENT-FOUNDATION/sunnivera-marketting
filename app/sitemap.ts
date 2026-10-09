import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "/about",
    "/opportunities",
    "/talent",
    "/sunivera-os",
    "/insights",
    "/privacy",
  ].map((p) => ({ url: absoluteUrl(p || "/") }));
  const posts = (await getPosts()).map((p) => ({
    url: absoluteUrl(`/insights/${p.slug}`),
    lastModified: new Date(p.date),
  }));
  return [...pages, ...posts];
}
