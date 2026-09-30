import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://suniveralogisticsltd.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "/about",
    "/opportunities",
    "/talent",
    "/sunivera-os",
    "/insights",
    "/privacy",
    
  ].map((p) => ({ url: base + p, lastModified: new Date() }));
  const posts = (await getPosts()).map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...pages, ...posts];
}
