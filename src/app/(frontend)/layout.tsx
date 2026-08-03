import type { Metadata } from "next";
import { assets } from "@/lib/assets";
import { FloatingContact } from "@/components/layout/FloatingContact";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://originseafoods.co.th"),
  title: {
    default: "Origin Seafoods Co., Ltd. | International Seafood Importer & Exporter",
    template: "%s | Origin Seafoods"
  },
  description:
    "Origin Seafoods Co., Ltd. imports and distributes premium frozen seafood from leading global sources for restaurants, hotels, wholesalers, food manufacturers, and international buyers.",
  keywords: [
    "Origin Seafoods",
    "seafood importer Thailand",
    "frozen seafood",
    "blue swimming crab",
    "squid",
    "jellyfish",
    "shellfish",
    "international seafood exporter"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Origin Seafoods Co., Ltd.",
    description: "International Seafood Importer & Exporter",
    url: "https://originseafoods.co.th",
    siteName: "Origin Seafoods",
    images: [
      {
        url: assets.hero.background.src,
        width: 851,
        height: 315,
        alt: "Origin Seafoods international seafood importer exporter banner"
      }
    ],
    locale: "th_TH",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Seafoods Co., Ltd.",
    description: "International Seafood Importer & Exporter",
    images: [assets.hero.background.src]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ORIGIN SEAFOODS CO., LTD.",
    "url": "https://originseafoods.co.th",
    "logo": "https://originseafoods.co.th/images/company/origin-logo.png",
    "email": "info@originseafoods.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "48/191 หมู่ที่ 4 ตำบลนาดี",
      "addressRegion": "สมุทรสาคร",
      "postalCode": "74000",
      "addressCountry": "TH"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Origin Seafoods",
    "url": "https://originseafoods.co.th"
  };

  return (
    <html lang="th">
      <body>
        <a href="#main-content" className="skip-link">
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
