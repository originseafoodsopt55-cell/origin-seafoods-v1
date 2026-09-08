import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      {
        source: '/products/shellfish/whelk',
        destination: '/products/shellfish/topshell',
        permanent: true,
      },
      {
        source: '/products/shellfish/whelk/:path*',
        destination: '/products/shellfish/topshell/:path*',
        permanent: true,
      },
      {
        source: '/products/fish/dolly-fish',
        destination: '/products/fish/salmon-skin',
        permanent: true,
      },
      {
        source: '/products/fish/dolly-fish/:path*',
        destination: '/products/fish/salmon-skin',
        permanent: true,
      },
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

export default withAnalyzer(withPayload(nextConfig));

