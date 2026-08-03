import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

export default withAnalyzer(nextConfig);
