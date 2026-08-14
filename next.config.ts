import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: '/products/:category/:series/:productLine/:variant',
        destination: '/products/:category/:productLine/:variant',
        permanent: true,
      },
      {
        source: '/products/:category/:series/:productLine',
        destination: '/products/:category/:productLine',
        permanent: true,
      },
      {
        source: '/products/shellfish/mussel',
        destination: '/products/shellfish',
        permanent: true,
      },
    ];
  }
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

export default withAnalyzer(nextConfig);
