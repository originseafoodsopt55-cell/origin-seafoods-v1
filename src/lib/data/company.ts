import { assets } from "@/lib/assets";
import type { Company, Country, Feature } from "@/types";

export const company: Company = {
  name: "ORIGIN SEAFOODS CO., LTD.",
  hero: {
    title: "ORIGIN SEAFOODS CO., LTD.",
    description: "บริษัทนำเข้าและส่งออกอาหารทะเลแช่แข็งทั่วโลก",
    subtitle: "INTERNATIONAL SEAFOODS",
    accent: "IMPORTER-EXPORTER",
    primaryButton: {
      label: "ดูสินค้า",
      href: "#products",
      ariaLabel: "View Origin Seafoods product categories"
    },
    secondaryButton: {
      label: "ติดต่อเรา",
      href: "#contact",
      ariaLabel: "Contact Origin Seafoods"
    }
  },
  heroSubtitle: "International Seafood Importer & Exporter",
  description:
    "ผู้นำเข้าและจัดจำหน่ายอาหารทะเลแช่แข็ง จากแหล่งผลิตชั้นนำทั่วโลก คัดสรรสินค้าคุณภาพ ได้มาตรฐานสากล เพื่อส่งมอบความสดใหม่และความพึงพอใจสูงสุดให้กับลูกค้า",
  assets: {
    factory: assets.company.factory,
    warehouse: assets.company.warehouse
  }
};

export const features: Feature[] = [
  { title: "จัดหาสินค้า", subtitle: "จากทั่วโลก", icon: "truck" },
  { title: "ควบคุมอุณหภูมิ", subtitle: "ได้มาตรฐาน", icon: "snowflake" },
  { title: "คัดสรรคุณภาพ", subtitle: "เกรดพรีเมียม", icon: "shieldcheck" },
  { title: "บริการลูกค้า", subtitle: "แบบมืออาชีพ", icon: "usersround" }
];

export const countries: Country[] = [
  { name: "PERU", flag: "PE", x: 28, y: 58 },
  { name: "INDIA", flag: "IN", x: 66, y: 52 },
  { name: "CHINA", flag: "CN", x: 76, y: 38 },
  { name: "VIETNAM", flag: "VN", x: 78, y: 52 },
  { name: "INDONESIA", flag: "ID", x: 79, y: 66 },
  { name: "ARGENTINA", flag: "AR", x: 34, y: 73 },
  { name: "CHILE", flag: "CL", x: 30, y: 75 }
];
