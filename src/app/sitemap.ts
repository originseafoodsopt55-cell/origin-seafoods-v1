import type { MetadataRoute } from "next";

const baseUrl = "https://originseafoods.co.th";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "#about", "#products", "#brands", "#gallery", "#contact"].map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date("2026-06-18"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8
  }));
}
