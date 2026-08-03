import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Origin Seafoods Co., Ltd.",
    short_name: "Origin Seafoods",
    description: "International Seafood Importer & Exporter",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a4d8c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
