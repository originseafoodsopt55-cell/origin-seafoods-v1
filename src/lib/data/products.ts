
import type { ProductSeries, ProductGroup, ProductVariant } from "@/types";

// ==========================================================================
// Level 2: Product Series / Product Line
// ==========================================================================
export const productSeries: ProductSeries[] = [
  // Crabs
  {
    id: "series-blue-swimming-crab",
    slug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า",
    english: "Blue Swimming Crab",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    description: "ปูม้าแช่แข็งคุณภาพส่งออก คัดไซส์พิเศษ เนื้อแน่นหวานฉ่ำ"
  },
  {
    id: "series-three-spot-swimming-crab",
    slug: "three-spot-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูจุด / ปูดาว",
    english: "Three Spot Swimming Crab",
    image: {
      src: "/images/products/three-spot-swimming-crab.jpg",
      alt: "Three spot swimming crab frozen seafood product",
      title: "Three Spot Swimming Crab"
    },
    description: "ปูจุดธรรมชาติ เนื้อแน่นสดใหม่ เหมาะสำหรับปรุงเมนูหลากหลาย"
  },
  // Squid
  {
    id: "series-squid-neck",
    slug: "squid-neck",
    categorySlug: "squid",
    thai: "คอหมึก",
    english: "Squid Neck",
    image: {
      src: "/images/products/squid-neck.jpg",
      alt: "Squid neck frozen seafood product",
      title: "Squid Neck"
    },
    description: "คอหมึกเปรูแช่แข็ง ชิ้นใหญ่ ขาวสะอาด เนื้อหนานุ่มเด้ง"
  },
  {
    id: "series-black-squid",
    slug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำ",
    english: "Black Squid",
    image: {
      src: "/images/products/black-squid.jpg",
      alt: "Black squid frozen seafood product",
      title: "Black Squid"
    },
    description: "หมึกสด ตัวแน่น เสียบไม้ย่างหรือยัดไส้รสชาติดี"
  },
  {
    id: "series-pakistani-squid",
    slug: "pakistani-squid",
    categorySlug: "squid",
    thai: "หมึกปากี",
    english: "Pakistani Squid",
    image: {
      src: "/images/products/pakistani-squid.jpg",
      alt: "Pakistani squid frozen seafood product",
      title: "Pakistani Squid"
    },
    description: "หมึกปากีนำเข้าคุณภาพเยี่ยม แข็งแรงและสดใหม่"
  },
  {
    id: "series-argentine-squid",
    slug: "argentine-squid",
    categorySlug: "squid",
    thai: "หมึกอาร์เจน",
    english: "Argentine Squid",
    image: {
      src: "/images/products/argentine-squid.jpg",
      alt: "Argentine squid frozen seafood product",
      title: "Argentine Squid"
    },
    description: "หมึกอาร์เจนตินานำเข้า หนังไม่ลอก ตัวสวยตรงไซส์"
  },
  {
    id: "series-squid-head",
    slug: "squid-head",
    categorySlug: "squid",
    thai: "หัวหมึก",
    english: "Squid Head",
    image: {
      src: "/images/products/squid-head.jpg",
      alt: "Squid head frozen seafood product",
      title: "Squid Head"
    },
    description: "หัวหมึกเบบี้และหัวหมึกเปรูแช่แข็ง ปั่นเด้งกรอบอร่อย"
  },
  {
    id: "series-squid-tail",
    slug: "squid-tail",
    categorySlug: "squid",
    thai: "หางหมึก",
    english: "Squid Tail",
    image: {
      src: "/images/products/squid-tail.jpg",
      alt: "Squid tail frozen seafood product",
      title: "Squid Tail"
    },
    description: "หางหมึกจีนและเปรูแช่แข็ง หางใหญ่ สวยงาม ไม่หัก"
  },
  // Jellyfish
  {
    id: "series-jellyfish",
    slug: "jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุน",
    english: "Jellyfish",
    image: {
      src: "/images/products/jellyfish.webp",
      alt: "Frozen jellyfish seafood product",
      title: "Jellyfish"
    },
    description: "แมงกะพรุนเกรดพรีเมียมคัดสรรพิเศษเพื่อความเด้งกรอบ"
  },
  // Shellfish
  {
    id: "series-razor-clam",
    slug: "razor-clam",
    categorySlug: "shellfish",
    thai: "หอยหลอด",
    english: "Razor Clam",
    image: {
      src: "/images/products/razor-clam.jpg",
      alt: "Razor clam frozen seafood product",
      title: "Razor Clam"
    },
    description: "หอยหลอดแช่แข็งคุณภาพดี ขนาดจัมโบ้ อวบอ้วนสดใหม่"
  },
  {
    id: "series-whelk",
    slug: "whelk",
    categorySlug: "shellfish",
    thai: "หอยหวาน",
    english: "Whelk",
    image: {
      src: "/images/products/whelk.jpg",
      alt: "Whelk frozen seafood product",
      title: "Whelk"
    },
    description: "หอยหวานและหอยหวานตูดแหลม เนื้อเด้งหวานเป็นธรรมชาติ"
  },
  {
    id: "series-japanese-scallop",
    slug: "japanese-scallop",
    categorySlug: "shellfish",
    thai: "หอยเชลล์ญี่ปุ่น",
    english: "Japanese Scallop",
    image: {
      src: "/images/products/japanese-scallop.jpg",
      alt: "Japanese scallop frozen seafood product",
      title: "Japanese Scallop"
    },
    description: "หอยเชลล์ญี่ปุ่นฝาเดียว ตัวใหญ่ สวย สะอาด เต็มฝา"
  },
  {
    id: "series-blood-cockle",
    slug: "blood-cockle",
    categorySlug: "shellfish",
    thai: "หอยแครง",
    english: "Blood Cockle",
    image: {
      src: "/images/products/blood-cockle.jpg",
      alt: "Blood cockle frozen seafood product",
      title: "Blood Cockle"
    },
    description: "หอยแครงฟรีส เนื้อเต็มสวย ไม่ติดฝา เลือดฉ่ำสดสะอาด"
  },
  {
    id: "series-mussel",
    slug: "mussel",
    categorySlug: "shellfish",
    thai: "หอยแมลงภู่",
    english: "Mussel",
    image: {
      src: "/images/products/mussel.jpg",
      alt: "Mussel frozen seafood product",
      title: "Mussel"
    },
    description: "หอยแมลงภู่ชิลีและเนื้อหอยแมลงภู่เกรดส่งออก สดใหม่พร้อมปรุง"
  },
  // Fish
  {
    id: "series-dolly-fish",
    slug: "dolly-fish",
    categorySlug: "fish",
    thai: "ปลาดอลลี่",
    english: "Dolly Fish",
    image: {
      src: "/images/products/frozen-fish.webp",
      alt: "Frozen fish seafood product",
      title: "Frozen Fish"
    },
    description: "ปลาดอลลี่หั่นชิ้นติดท้องแช่แข็ง เนื้อนุ่มสะอาดได้มาตรฐาน"
  },
  // Silkworm
  {
    id: "series-silkworm",
    slug: "silkworm",
    categorySlug: "silkworm",
    thai: "หนอนไหม",
    english: "Silkworm",
    image: {
      src: "/images/products/processed-seafood.webp",
      alt: "Processed frozen seafood product",
      title: "Processed Seafood"
    },
    description: "หนอนไหมเกรดคัดสรรพิเศษ อวบอ้วนสะอาด ปลอดภัย"
  }
];

// ==========================================================================
// Level 3: Brand / Product Group
// ==========================================================================
export const productGroups: ProductGroup[] = [
  // Crabs -> Blue Swimming Crab
  {
    id: "group-blue-swimming-crab",
    slug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า",
    english: "Blue Swimming Crab",
    image: {
      src: "/images/products/blue-swimming-crab-ibnr.jpg",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    description: "ปูม้าแช่แข็งคุณภาพส่งออก คัดไซส์พิเศษ เนื้อแน่นหวานฉ่ำ"
  },
  // Crabs -> Three Spot Swimming Crab
  {
    id: "group-three-spot-swimming-crab",
    slug: "three-spot-swimming-crab",
    seriesSlug: "three-spot-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูจุด / ปูดาว",
    english: "Three Spot Swimming Crab",
    image: {
      src: "/images/products/three-spot-swimming-crab-ibnr.jpg",
      alt: "Three spot swimming crab frozen seafood product",
      title: "Three Spot Swimming Crab"
    },
    description: "ปูจุดธรรมชาติ เนื้อแน่นสดใหม่ เหมาะสำหรับปรุงเมนูหลากหลาย"
  },
  // Squid -> Squid Neck
  {
    id: "group-squid-neck",
    slug: "squid-neck",
    seriesSlug: "squid-neck",
    categorySlug: "squid",
    thai: "คอหมึกเปรู",
    english: "Peru Squid Neck",
    image: {
      src: "/images/products/squid-neck-er.jpg",
      alt: "Squid neck frozen seafood product",
      title: "Squid Neck"
    },
    description: "คอหมึกเปรูแช่แข็ง สด สะอาด เด้งดึ๋งได้รูป"
  },
  // Squid -> Black Squid
  {
    id: "group-black-squid",
    slug: "black-squid",
    seriesSlug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำ",
    english: "Black Squid",
    image: {
      src: "/images/products/black-squid-xing-bang.jpg",
      alt: "Black squid frozen seafood product",
      title: "Black Squid"
    },
    description: "หมึกดำแช่แข็ง ตัวสดเด้ง สีสวยตรงตามธรรมชาติ"
  },
  // Squid -> Pakistani Squid
  {
    id: "group-pakistani-squid",
    slug: "pakistani-squid",
    seriesSlug: "pakistani-squid",
    categorySlug: "squid",
    thai: "หมึกปากี",
    english: "Pakistani Squid",
    image: {
      src: "/images/products/pakistani-squid-white-box.jpg",
      alt: "Pakistani squid frozen seafood product",
      title: "Pakistani Squid"
    },
    description: "หมึกปากีนำเข้าบรรจุกล่องขาวเกรดดี ตัวสวยสม่ำเสมอ"
  },
  // Squid -> Argentine Squid
  {
    id: "group-argentine-squid",
    slug: "argentine-squid",
    seriesSlug: "argentine-squid",
    categorySlug: "squid",
    thai: "หมึกอาร์เจน",
    english: "Argentine Squid",
    image: {
      src: "/images/products/argentine-squid-argentine.jpg",
      alt: "Argentine squid frozen seafood product",
      title: "Argentine Squid"
    },
    description: "หมึกนำเข้าจากอาร์เจนตินา สดใหม่ เนื้อหวานเด้งธรรมชาติ"
  },
  // Squid -> Squid Head
  {
    id: "group-squid-head",
    slug: "squid-head",
    seriesSlug: "squid-head",
    categorySlug: "squid",
    thai: "หัวหมึกนำเข้า",
    english: "Imported Squid Head",
    image: {
      src: "/images/products/squid-head-squid-head.jpg",
      alt: "Squid head frozen seafood product",
      title: "Squid Head"
    },
    description: "หัวหมึกเบบี้และหัวหมึกเปรูแช่แข็งเกรดพรีเมียม สด กรอบอร่อย"
  },
  // Squid -> Squid Tail
  {
    id: "group-squid-tail",
    slug: "squid-tail",
    seriesSlug: "squid-tail",
    categorySlug: "squid",
    thai: "หางหมึกนำเข้า",
    english: "Imported Squid Tail",
    image: {
      src: "/images/products/squid-tail-squid-tail.jpg",
      alt: "Squid tail frozen seafood product",
      title: "Squid Tail"
    },
    description: "หางหมึกจีนและหางหมึกเปรูแช่แข็ง หางใหญ่ ขาว สะอาด ไม่หัก"
  },
  // Jellyfish -> Jellyfish
  {
    id: "group-jellyfish",
    slug: "jellyfish",
    seriesSlug: "jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนแปรรูป",
    english: "Processed Jellyfish",
    image: {
      src: "/images/products/jellyfish-original.jpg",
      alt: "Jellyfish original frozen seafood product",
      title: "Jellyfish Original"
    },
    description: "แมงกะพรุนแปรรูปคุณภาพสูง ส่งตรงจากไต้หวันและเวียดนาม เด้งกรอบสะอาด"
  },
  // Shellfish -> Razor Clam
  {
    id: "group-razor-clam",
    slug: "razor-clam",
    seriesSlug: "razor-clam",
    categorySlug: "shellfish",
    thai: "หอยหลอดจัมโบ้",
    english: "Jumbo Razor Clam",
    image: {
      src: "/images/products/razor-clam-razor-clam.jpg",
      alt: "Razor clam frozen seafood product",
      title: "Razor Clam"
    },
    description: "หอยหลอดขนาดใหญ่พิเศษ เนื้ออวบอ้วนสดใหม่ไม่มีกลิ่นคาว"
  },
  // Shellfish -> Whelk
  {
    id: "group-whelk-normal",
    slug: "whelk",
    seriesSlug: "whelk",
    categorySlug: "shellfish",
    thai: "หอยหวานเกรดเอ",
    english: "Premium Whelk",
    image: {
      src: "/images/products/whelk-whelk.jpg",
      alt: "Whelk frozen seafood product",
      title: "Whelk"
    },
    description: "หอยหวานสดใหม่แช่แข็งอย่างรวดเร็ว เนื้อแน่นกรอบเด้ง"
  },
  {
    id: "group-whelk-pointed",
    slug: "pointed-whelk",
    seriesSlug: "whelk",
    categorySlug: "shellfish",
    thai: "หอยหวาน ตูดแหลม",
    english: "Pointed Whelk",
    image: {
      src: "/images/products/whelk-pointed-whelk.jpg",
      alt: "Pointed whelk frozen seafood product",
      title: "Pointed Whelk"
    },
    description: "หอยหวานตูดแหลมธรรมชาติ สด อวบ เนื้อเต็มสวย"
  },
  // Shellfish -> Japanese Scallop
  {
    id: "group-japanese-scallop-half-shell",
    slug: "japanese-scallop-half-shell",
    seriesSlug: "japanese-scallop",
    categorySlug: "shellfish",
    thai: "หอยเชลล์ญี่ปุ่น ฝาเดียว",
    english: "Japanese Scallop Half Shell",
    image: {
      src: "/images/products/japanese-scallop-half-shell.jpg",
      alt: "Japanese scallop half shell frozen seafood product",
      title: "Japanese Scallop Half Shell"
    },
    description: "หอยเชลล์ฝาเดียวคุณภาพเยี่ยม ขนาดสม่ำเสมอเต็มฝา"
  },
  // Shellfish -> Blood Cockle
  {
    id: "group-blood-cockle",
    slug: "blood-cockle",
    seriesSlug: "blood-cockle",
    categorySlug: "shellfish",
    thai: "หอยแครงแช่แข็ง",
    english: "Frozen Blood Cockle",
    image: {
      src: "/images/products/blood-cockle-blood-cockle.jpg",
      alt: "Blood cockle frozen seafood product",
      title: "Blood Cockle"
    },
    description: "หอยแครงแช่แข็งเนื้อแน่น แฝงความสดหวานฉ่ำเป็นธรรมชาติ"
  },
  // Shellfish -> Mussel
  {
    id: "group-chilean-mussel",
    slug: "chilean-mussel",
    seriesSlug: "mussel",
    categorySlug: "shellfish",
    thai: "หอยแมลงภู่ชิลี",
    english: "Chilean Mussel",
    image: {
      src: "/images/products/mussel-chilean-mussel.jpg",
      alt: "Chilean mussel frozen seafood product",
      title: "Chilean Mussel"
    },
    description: "หอยแมลงภู่ชิลีนำเข้า เนื้อแน่น ตัวใหญ่ บรรจุอย่างดีควบคุมความสะอาด"
  },
  {
    id: "group-mussel-meat",
    slug: "mussel-meat",
    seriesSlug: "mussel",
    categorySlug: "shellfish",
    thai: "เนื้อหอยแมลงภู่",
    english: "Mussel Meat",
    image: {
      src: "/images/products/mussel-mussel-meat.jpg",
      alt: "Mussel meat frozen seafood product",
      title: "Mussel Meat"
    },
    description: "เนื้อหอยแมลงภู่เด้งๆ พร้อมปรุงทานสะดวกและอร่อย"
  },
  // Fish -> Dolly Fish
  {
    id: "group-dolly-fish",
    slug: "dolly-fish",
    seriesSlug: "dolly-fish",
    categorySlug: "fish",
    thai: "ปลาดอลลี่ติดท้อง",
    english: "Dolly Fish Belly Cut",
    image: {
      src: "/images/products/dolly-fish-dolly-fish.jpg",
      alt: "Dolly fish frozen seafood product",
      title: "Dolly Fish"
    },
    description: "ปลาดอลลี่หั่นชิ้นคัดคุณภาพ เนื้อนุ่มสะอาด เหมาะสำหรับประกอบอาหารทันที"
  },
  // Silkworm -> Silkworm
  {
    id: "group-silkworm",
    slug: "silkworm",
    seriesSlug: "silkworm",
    categorySlug: "silkworm",
    thai: "หนอนไหมเกรดพรีเมียม",
    english: "Premium Silkworm",
    image: {
      src: "/images/products/silkworm-silkworm.jpg",
      alt: "Silkworm frozen seafood product",
      title: "Silkworm"
    },
    description: "หนอนไหมเกรดดีที่สุด ตัวเหลืองอวบอ้วนสะอาด ไม่หักไม่แตก"
  }
];

// ==========================================================================
// Level 4: Product Variants (SKU / Size Level)
// ==========================================================================
const productVariantEntries: ProductVariant[] = [
  // Crabs -> Blue Swimming Crab -> IBNR
  {
    id: "var-bsc-ibnr-60-80-m",
    slug: "60-80-m",
    groupSlug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า IBNR 60-80 M",
    english: "Blue Swimming Crab IBNR 60-80 Male",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "60-80 M",
    brand: "IBNR",
    packing: "ลังละ 10 kg.",
    description: "ปูม้าตัวผู้คุณภาพเยี่ยม แบรนด์ IBNR ไซส์ 60-80 เนื้อแน่น สดหวาน"
  },
  {
    id: "var-bsc-ibnr-60-80-f",
    slug: "60-80-f",
    groupSlug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า IBNR 60-80 F",
    english: "Blue Swimming Crab IBNR 60-80 Female",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "60-80 F",
    brand: "IBNR",
    packing: "ลังละ 10 kg.",
    description: "ปูม้าตัวเมียคัดเกรด มีไข่แน่น แบรนด์ IBNR ไซส์ 60-80 สดใหม่ไม่มีกลิ่นคาว"
  },
  {
    id: "var-bsc-ibnr-200up-m",
    slug: "200up-m",
    groupSlug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า IBNR 200UP M",
    english: "Blue Swimming Crab IBNR 200UP Male",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "200UP M",
    brand: "IBNR",
    packing: "ลังละ 10 kg.",
    description: "ปูม้าตัวผู้ขนาดใหญ่พิเศษ น้ำหนักตั้งแต่ 200 กรัมขึ้นไป แบรนด์ IBNR เนื้อเต็มแน่นกระดอง"
  },
  {
    id: "var-bsc-ibnr-300up-m",
    slug: "300up-m",
    groupSlug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า IBNR 300UP M",
    english: "Blue Swimming Crab IBNR 300UP Male",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "300UP M",
    brand: "IBNR",
    packing: "ลังละ 10 kg.",
    description: "ปูม้าตัวผู้ขนาดจัมโบ้ คัดพิเศษ 300 กรัมขึ้นไป แบรนด์ IBNR เหมาะสำหรับมื้ออาหารสุดพิเศษ"
  },
  // Crabs -> Blue Swimming Crab -> White Box
  {
    id: "var-bsc-white-200up-f",
    slug: "200up-f",
    groupSlug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า กล่องขาว 200UP F",
    english: "Blue Swimming Crab White Box 200UP Female",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "200UP F",
    brand: "กล่องขาว",
    packing: "ลังละ 10 kg.",
    description: "ปูม้าตัวเมีย บรรจุกล่องขาวควบคุมสุขอนามัย ขนาดใหญ่ 200UP ไข่แน่นมันอร่อย"
  },
  {
    id: "var-bsc-white-200up-m",
    slug: "200up-m-white",
    groupSlug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า กล่องขาว 200UP M",
    english: "Blue Swimming Crab White Box 200UP Male",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "200UP M",
    brand: "กล่องขาว",
    packing: "ลังละ 10 kg.",
    description: "ปูม้าตัวผู้ บรรจุกล่องขาว ขนาดใหญ่ 200UP เนื้อเด้งแน่น สดส่งตรงจากแพ"
  },
  {
    id: "var-bsc-white-300up-m",
    slug: "300up-m-white",
    groupSlug: "blue-swimming-crab",
    seriesSlug: "blue-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูม้า กล่องขาว 300UP M",
    english: "Blue Swimming Crab White Box 300UP Male",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "300UP M",
    brand: "กล่องขาว",
    packing: "ลังละ 10 kg.",
    description: "ปูม้าตัวผู้ขนาดจัมโบ้ บรรจุกล่องขาว ขนาดใหญ่ 300UP เนื้อเต็มแน่นคุ้มค่า"
  },
  // Crabs -> Three Spot Swimming Crab -> IBNR
  {
    id: "var-tssc-ibnr-40-60-m",
    slug: "40-60-m",
    groupSlug: "three-spot-swimming-crab",
    seriesSlug: "three-spot-swimming-crab",
    categorySlug: "crabs",
    thai: "ปูจุด IBNR 40-60 M",
    english: "Three Spot Swimming Crab IBNR 40-60 Male",
    image: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    size: "40-60 M",
    brand: "IBNR",
    packing: "ลังละ 10 kg.",
    description: "ปูจุดธรรมชาติคัดเกรด แบรนด์ IBNR ไซส์ 40-60 ตัวผู้ เนื้อหวานนุ่มอร่อย"
  },

  // Squid -> Squid Neck -> ER
  {
    id: "var-squid-neck-er-100-500",
    slug: "100-500",
    groupSlug: "squid-neck",
    seriesSlug: "squid-neck",
    categorySlug: "squid",
    thai: "คอหมึกเปรู ER 100/500",
    english: "Peru Squid Neck ER 100-500",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "100/500",
    brand: "ER",
    packing: "กระสอบละ 20 kg.",
    description: "คอหมึกเปรูแช่แข็ง แบรนด์ ER ไซส์ 100/500 ขาว สวย เทสปั่นเด้งดีมาก"
  },
  {
    id: "var-squid-neck-er-500up",
    slug: "500up",
    groupSlug: "squid-neck",
    seriesSlug: "squid-neck",
    categorySlug: "squid",
    thai: "คอหมึกเปรู ER 500UP",
    english: "Peru Squid Neck ER 500UP",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "500UP",
    brand: "ER",
    packing: "กระสอบละ 20 kg.",
    description: "คอหมึกเปรูแช่แข็ง แบรนด์ ER ไซส์ใหญ่จัมโบ้ 500UP เนื้อหนาน้ำหนักดีเยี่ยม"
  },
  // Squid -> Squid Neck -> Peru Frost
  {
    id: "var-squid-neck-perufrost-500up",
    slug: "500up-pf",
    groupSlug: "squid-neck",
    seriesSlug: "squid-neck",
    categorySlug: "squid",
    thai: "คอหมึกเปรู PERU FROST 500UP",
    english: "Peru Squid Neck PERU FROST 500UP",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "500UP",
    brand: "PERU FROST",
    packing: "กระสอบละ 20 kg.",
    description: "คอหมึกเปรูนำเข้าแช่แข็ง แบรนด์ PERU FROST ไซส์ใหญ่ 500UP หนา สวย และตรงไซส์ได้มาตรฐาน"
  },
  // Squid -> Black Squid -> Xing Bang
  {
    id: "var-squid-black-xb-50-100",
    slug: "50-100",
    groupSlug: "black-squid",
    seriesSlug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำ XING BANG 50/100",
    english: "Black Squid XING BANG 50-100",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "50/100",
    brand: "XING BANG",
    packing: "กล่องละ 20 Kg.",
    description: "หมึกดำแช่แข็ง แบรนด์ XING BANG ตัวแน่นสวยสด เหมาะสำหรับเสียบไม้ย่างหรือยัดไส้กำไรดี",
    features: ["ประมาณ 14-16 ตัว/โล"]
  },
  {
    id: "var-squid-black-xb-100-300",
    slug: "100-300",
    groupSlug: "black-squid",
    seriesSlug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำ XING BANG 100/300",
    english: "Black Squid XING BANG 100-300",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "100/300",
    brand: "XING BANG",
    packing: "กล่องละ 10 Kg.",
    description: "หมึกดำแช่แข็ง แบรนด์ XING BANG สดสะอาด เด้งตัวตึงพรีเมียม",
    features: ["ประมาณ 3-6 ตัว/kg."]
  },
  {
    id: "var-squid-black-xb-300-500",
    slug: "300-500",
    groupSlug: "black-squid",
    seriesSlug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำ XING BANG 300/500",
    english: "Black Squid XING BANG 300-500",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "300/500",
    brand: "XING BANG",
    packing: "กล่องละ 10 Kg.",
    description: "หมึกดำแช่แข็ง แบรนด์ XING BANG ชิ้นใหญ่พิเศษ เนื้อสดกรอบเด้ง",
    features: ["ประมาณ 4-5 ตัว/โล"]
  },
  // Squid -> Black Squid -> Vietnam
  {
    id: "var-squid-black-vn-80-150",
    slug: "80-150",
    groupSlug: "black-squid",
    seriesSlug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำเวียดนาม 80/150",
    english: "Vietnam Black Squid 80-150",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "80/150",
    brand: "เวียดนาม",
    country: "Vietnam",
    packing: "กล่องละ 10 Kg.",
    description: "หมึกดำเกรดส่งตรงจากเวียดนาม สด สะอาด ตัวเหนียวหนุบย่างอร่อยมาก",
    features: ["ประมาณ 8-12 ตัว/kg."]
  },
  {
    id: "var-squid-black-vn-150-200",
    slug: "150-200",
    groupSlug: "black-squid",
    seriesSlug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำเวียดนาม 150/200",
    english: "Vietnam Black Squid 150-200",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "150/200",
    brand: "เวียดนาม",
    country: "Vietnam",
    packing: "กล่องละ 10 Kg.",
    description: "หมึกดำตัวโต เนื้อสดสะอาด เด้งพรีเมียม เหมาะสำหรับจัดเลี้ยงร้านบุฟเฟต์และขายส่ง",
    features: ["ประมาณ 5-6 ตัว/kg."]
  },
  // Squid -> Pakistani Squid -> White Box
  {
    id: "var-squid-paki-80up",
    slug: "80up",
    groupSlug: "pakistani-squid",
    seriesSlug: "pakistani-squid",
    categorySlug: "squid",
    thai: "หมึกปากี กล่องขาว 80UP",
    english: "Pakistani Squid White Box 80UP",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "80UP",
    brand: "กล่องขาว",
    packing: "ลังละ 20 Kg.",
    description: "หมึกปากีนำเข้าบรรจุกล่องขาว เกรดพรีเมียม สดตรงไซส์ บล็อคละ 5 kg. (1 ลังมี 4 บล็อค)"
  },
  // Squid -> Argentine Squid -> Argentine
  {
    id: "var-squid-argen-s-200-300",
    slug: "s-200-300",
    groupSlug: "argentine-squid",
    seriesSlug: "argentine-squid",
    categorySlug: "squid",
    thai: "หมึกอาร์เจน S 200/300",
    english: "Argentine Squid S 200-300",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "200/300",
    brand: "ARDAPEZ",
    country: "Argentina",
    description: "หมึกอาร์เจนตินาแท้ ตัวสวย หนังไม่ลอก สดเป็นธรรมชาติ เทสปั่นแล้วเด้งกรอบมาก"
  },
  {
    id: "var-squid-argen-ss-100-200",
    slug: "ss-100-200",
    groupSlug: "argentine-squid",
    seriesSlug: "argentine-squid",
    categorySlug: "squid",
    thai: "หมึกอาร์เจน SS 100/200 (ARDAPEZ)",
    english: "Argentine Squid SS 100-200 (ARDAPEZ)",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "100/200",
    brand: "ARDAPEZ",
    country: "Argentina",
    description: "หมึกอาร์เจนตินานำเข้า แบรนด์ ARDAPEZ ขนาดสม่ำเสมอ หนังเหนียวสดสะอาด"
  },
  // Squid -> Squid Head -> Squid Head
  {
    id: "var-squid-head-baby-800up",
    slug: "baby-800up",
    groupSlug: "squid-head",
    seriesSlug: "squid-head",
    categorySlug: "squid",
    thai: "หัวหมึกเบบี้ 800UP",
    english: "Baby Squid Head 800UP",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "800UP",
    packing: "กระสอบละ 20 kg.",
    description: "หัวหมึกขนาดจัมโบ้ คัดพิเศษ เสียบไม้ย่างได้อร่อยกรุบกรอบปั่นเด้งๆ",
    features: ["ประมาณ 1-2 หัว/kg."]
  },
  {
    id: "var-squid-head-peru-150-200",
    slug: "peru-150-200",
    groupSlug: "squid-head",
    seriesSlug: "squid-head",
    categorySlug: "squid",
    thai: "หัวหมึกเปรู 150/200",
    english: "Peru Squid Head 150-200",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "150/200",
    country: "Peru",
    packing: "กระสอบละ 20 kg. (10kg.*2 blocks)",
    description: "หัวหมึกเปรูนำเข้า สวย สด สะอาด เหมาะสำหรับการแปรรูปและทำอาหารขายส่ง"
  },
  // Squid -> Squid Tail -> Squid Tail
  {
    id: "var-squid-tail-cn-blue",
    slug: "chinese-blue-15cm",
    groupSlug: "squid-tail",
    seriesSlug: "squid-tail",
    categorySlug: "squid",
    thai: "หางหมึกจีน (กระสอบตารางฟ้า)",
    english: "Chinese Squid Tail (Blue Bag)",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "15CM+++",
    country: "China",
    packing: "กระสอบละ 15 kg.",
    description: "หางหมึกจีนแช่แข็ง บรรจุกระสอบตารางสีฟ้า หางใหญ่สวยสมบูรณ์ไม่หักง่าย"
  },
  {
    id: "var-squid-tail-cn-red",
    slug: "chinese-red-15cm",
    groupSlug: "squid-tail",
    seriesSlug: "squid-tail",
    categorySlug: "squid",
    thai: "หางหมึกจีน (กระสอบตารางแดง)",
    english: "Chinese Squid Tail (Red Bag)",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "15CM++",
    country: "China",
    packing: "กระสอบละ 12.5 kg.",
    description: "หางหมึกจีนนำเข้าบรรจุกระสอบตารางสีแดง สวยสะอาด ตรงสเปกควบคุมคุณภาพ"
  },
  {
    id: "var-squid-tail-peru-white",
    slug: "peru-white-18cm",
    groupSlug: "squid-tail",
    seriesSlug: "squid-tail",
    categorySlug: "squid",
    thai: "หางหมึกเปรู (กระสอบขาว)",
    english: "Peru Squid Tail (White Bag)",
    image: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    size: "18CM+++",
    country: "Peru",
    packing: "กระสอบละ 20 kg. (10 kg.* 2 Blocks)",
    description: "หางหมึกเปรูแช่แข็งคุณภาพนำเข้า หางใหญ่ เนื้อขาวใส สะอาดเป็นธรรมชาติ"
  },

  // Jellyfish -> Jellyfish -> Jellyfish
  {
    id: "var-jf-wing",
    slug: "fairy-wing",
    groupSlug: "jellyfish",
    seriesSlug: "jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุน ปีกนางฟ้า",
    english: "Fairy Wing Jellyfish",
    image: {
      src: "/images/products/jellyfish.webp",
      alt: "Frozen jellyfish seafood product",
      title: "Jellyfish"
    },
    country: "Taiwan",
    packing: "ถังละ 13 Kg.+++",
    description: "แมงกะพรุนปีกนางฟ้านำเข้าเกรดพรีเมียมจากไต้หวัน กรอบและเด้งตัวได้ยาวนาน"
  },
  {
    id: "var-jf-tiger-vn",
    slug: "tiger-stripe",
    groupSlug: "jellyfish",
    seriesSlug: "jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนลายเสือ เวียดนาม",
    english: "Tiger Stripe Jellyfish Vietnam",
    image: {
      src: "/images/products/jellyfish.webp",
      alt: "Frozen jellyfish seafood product",
      title: "Jellyfish"
    },
    country: "Vietnam",
    packing: "ถังละ 5 Kg.",
    description: "แมงกะพรุนลายเสือ นำเข้าตรงจากเวียดนาม ปลอดภัยได้มาตรฐานอาหารแปรรูป"
  },
  {
    id: "var-jf-bullet-white",
    slug: "bullet-head-white",
    groupSlug: "jellyfish",
    seriesSlug: "jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนหัวกระสุน ถังขาว",
    english: "Bullet Head Jellyfish White Barrel",
    image: {
      src: "/images/products/jellyfish.webp",
      alt: "Frozen jellyfish seafood product",
      title: "Jellyfish"
    },
    country: "Vietnam",
    packing: "ลังละ 15-16 Kg.+++",
    description: "แมงกะพรุนหัวกระสุนนำเข้า ถังขาวสะอาด หนาและกรุบกรอบพิเศษประมาณ 25 ซม. /Kg."
  },
  {
    id: "var-jf-bullet-grey",
    slug: "bullet-head-grey",
    groupSlug: "jellyfish",
    seriesSlug: "jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนหัวกระสุน ถังเทา ฝาฟ้า",
    english: "Bullet Head Jellyfish Grey Barrel",
    image: {
      src: "/images/products/jellyfish.webp",
      alt: "Frozen jellyfish seafood product",
      title: "Jellyfish"
    },
    country: "Vietnam",
    packing: "ลังละ 15-16 Kg.+++",
    description: "แมงกะพรุนหัวกระสุนเกรดคัดสรร ถังเทาฝาฟ้า เนื้อหนาแน่น สวยไม่ยุ่ย 35-40 ซม. /Kg."
  },
  {
    id: "var-jf-thai",
    slug: "thai-stock",
    groupSlug: "jellyfish",
    seriesSlug: "jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนไทย (สตอค)",
    english: "Thai Jellyfish (Stock)",
    image: {
      src: "/images/products/jellyfish.webp",
      alt: "Frozen jellyfish seafood product",
      title: "Jellyfish"
    },
    country: "Thailand",
    packing: "น้ำหนัก 17+-",
    description: "แมงกะพรุนแปรรูปสดใหม่ คัดเกรดพรีเมียมเพื่อความสะอาดและกรอบอร่อย"
  },

  // Shellfish -> Razor Clam -> Razor Clam
  {
    id: "var-shell-razor-8-10",
    slug: "8-10",
    groupSlug: "razor-clam",
    seriesSlug: "razor-clam",
    categorySlug: "shellfish",
    thai: "หอยหลอด 8/10",
    english: "Razor Clam 8-10",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "8/10",
    brand: "IBNR",
    packing: "ลังละ 10 kg.",
    description: "หอยหลอดคัดไซส์ใหญ่ แบรนด์ IBNR อวบอ้วนสะอาด สดใหม่ไร้สารตกค้าง"
  },
  // Shellfish -> Whelk -> Whelk
  {
    id: "var-shell-whelk-10-20",
    slug: "10-20",
    groupSlug: "whelk",
    seriesSlug: "whelk",
    categorySlug: "shellfish",
    thai: "หอยหวาน 10/20",
    english: "Whelk 10-20",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "10/20",
    packing: "ลังละ 12 kg.",
    description: "หอยหวานแช่แข็งอย่างรวดเร็ว ขนาด 10/20 เนื้อหวานกรุบเด้งดึ๋งเป็นธรรมชาติ"
  },
  // Shellfish -> Whelk -> Pointed Whelk
  {
    id: "var-shell-whelk-sharp-30-50",
    slug: "30-50",
    groupSlug: "pointed-whelk",
    seriesSlug: "whelk",
    categorySlug: "shellfish",
    thai: "หอยหวาน ตูดแหลม 30/50",
    english: "Pointed Whelk 30-50",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "30/50",
    packing: "ลังละ 12 kg. (2kg.*6)",
    description: "หอยหวานตูดแหลม สดจากแหล่งน้ำลึกคัดพิเศษ อวบอ้วนและรสชาติดีเยี่ยม"
  },
  {
    id: "var-shell-whelk-sharp-50-80",
    slug: "50-80",
    groupSlug: "pointed-whelk",
    seriesSlug: "whelk",
    categorySlug: "shellfish",
    thai: "หอยหวาน ตูดแหลม 50/80",
    english: "Pointed Whelk 50-80",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "50/80",
    packing: "ลังละ 12 kg. (2kg.*6)",
    description: "หอยหวานตูดแหลมธรรมชาติ สดใหม่ คัดกรองสิ่งสกปรกและแช่เยือกแข็งคงคุณค่าครบถ้วน"
  },
  // Shellfish -> Japanese Scallop -> Japanese Scallop Half Shell
  {
    id: "var-shell-scallop-5-6",
    slug: "5-6cm",
    groupSlug: "japanese-scallop-half-shell",
    seriesSlug: "japanese-scallop",
    categorySlug: "shellfish",
    thai: "หอยเชลล์ญี่ปุ่นฝาเดียว 5-6 cm.",
    english: "Japanese Scallop Half Shell 5-6cm",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "5-6 cm",
    packing: "กล่องละ 10 Kg. NW.50%",
    description: "หอยเชลล์ฝาเดียวญี่ปุ่น นำเข้าเกรดคุณภาพ คัดไซส์สม่ำเสมอสวยงาม",
    features: ["34-39 ชิ้น/ถุง"]
  },
  {
    id: "var-shell-scallop-6-7",
    slug: "6-7cm",
    groupSlug: "japanese-scallop-half-shell",
    seriesSlug: "japanese-scallop",
    categorySlug: "shellfish",
    thai: "หอยเชลล์ญี่ปุ่นฝาเดียว 6-7 cm.",
    english: "Japanese Scallop Half Shell 6-7cm",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "6-7 cm",
    packing: "กล่องละ 10 Kg. NW.50%",
    description: "หอยเชลล์ฝาเดียวแช่แข็ง คงความสดสะอาด รสชาติหวานฉ่ำแบบธรรมชาติ",
    features: ["19-21 ชิ้น/ถุง"]
  },
  {
    id: "var-shell-scallop-7-8",
    slug: "7-8cm",
    groupSlug: "japanese-scallop-half-shell",
    seriesSlug: "japanese-scallop",
    categorySlug: "shellfish",
    thai: "หอยเชลล์ญี่ปุ่นฝาเดียว 7-8 cm.",
    english: "Japanese Scallop Half Shell 7-8cm",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "7-8 cm",
    packing: "กล่องละ 10 Kg. NW.50%",
    description: "หอยเชลล์ฝาเดียวไซส์ใหญ่พิเศษ สดและสะอาด รสสัมผัสเต็มคำ",
    features: ["16-21 ชิ้น/ถุง"]
  },
  // Shellfish -> Blood Cockle -> Blood Cockle
  {
    id: "var-shell-cockle-15-30",
    slug: "15-30",
    groupSlug: "blood-cockle",
    seriesSlug: "blood-cockle",
    categorySlug: "shellfish",
    thai: "หอยแครงฟรีส 15/30",
    english: "Blood Cockle 15-30",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "15/30",
    packing: "ลังละ 10 kg. (2 kg.*5 ถุง)",
    description: "หอยแครงแกะแช่แข็งอย่างรวดเร็ว เนื้อเต็มสวยสมบูรณ์ เลือดสดฉ่ำเหมือนเพิ่งแกะใหม่",
    features: ["16-22 ตัว/โล"]
  },
  {
    id: "var-shell-cockle-u15",
    slug: "u15",
    groupSlug: "blood-cockle",
    seriesSlug: "blood-cockle",
    categorySlug: "shellfish",
    thai: "หอยแครง U15",
    english: "Blood Cockle U15",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "U15",
    packing: "ลังละ 10 kg.",
    description: "หอยแครงแกะแช่แข็งไซส์ยักษ์ U15 ตัวใหญ่เนื้อหวานฟูและสะอาดปลอดภัย"
  },
  // Shellfish -> Mussel -> Chilean Mussel
  {
    id: "var-shell-mussel-chile-blue",
    slug: "blue-box",
    groupSlug: "chilean-mussel",
    seriesSlug: "mussel",
    categorySlug: "shellfish",
    thai: "หอยแมลงภู่ชิลี L (กล่องน้ำเงิน)",
    english: "Chilean Mussel L (Blue Box)",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "L",
    country: "Chile",
    packing: "ลังละ 10 kg. (1 kg.*10 ถุง) NW.50%",
    description: "หอยแมลงภู่ชิลีตัวโต คัดเกรด L บรรจุกล่องน้ำเงิน สดสะอาดมีระเบียบประมาณ 14-16 ตัว/ถุง"
  },
  {
    id: "var-shell-mussel-chile-green",
    slug: "green-box",
    groupSlug: "chilean-mussel",
    seriesSlug: "mussel",
    categorySlug: "shellfish",
    thai: "หอยแมลงภู่ชิลี L (กล่องเขียว)",
    english: "Chilean Mussel L (Green Box)",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    size: "L",
    country: "Chile",
    packing: "ลังละ 10 kg. (1 kg.*10 ถุง) NW.40%",
    description: "หอยแมลงภู่ชิลีนำเข้า คัดเกรด L บรรจุกล่องเขียว สดเด้งตรงไซส์ประมาณ 25-28 ตัว/ถุง"
  },
  // Shellfish -> Mussel -> Mussel Meat
  {
    id: "var-shell-mussel-meat",
    slug: "meat",
    groupSlug: "mussel-meat",
    seriesSlug: "mussel",
    categorySlug: "shellfish",
    thai: "เนื้อหอยแมลงภู่เด้ง",
    english: "Mussel Meat",
    image: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    packing: "กล่องละ 10 kg. (ถุงละ 1 kg.*10 ถุง) NW.40%",
    description: "เนื้อหอยแมลงภู่ล้วน แกะเปลือกแช่แข็งตัวเด้งพร้อมนำไปต้มผัดแกงทอดทันที 50 ชิ้น++ / ถุง"
  },

  // Fish -> Dolly Fish -> Dolly Fish
  {
    id: "var-fish-dolly-belly-cut",
    slug: "belly-cut",
    groupSlug: "dolly-fish",
    seriesSlug: "dolly-fish",
    categorySlug: "fish",
    thai: "ดอลลี่หั่นชิ้นติดท้อง",
    english: "Dolly Fish Belly Cut",
    image: {
      src: "/images/products/frozen-fish.webp",
      alt: "Frozen fish seafood product",
      title: "Frozen Fish"
    },
    packing: "ลังละ 10 kg.",
    description: "เนื้อปลาดอลลี่แล่ติดส่วนท้องแช่แข็ง เนื้อขาวนุ่มอร่อย สะอาดถูกหลักอนามัยสากล"
  },

  // Silkworm -> Silkworm -> Silkworm
  {
    id: "var-silkworm-10kg",
    slug: "10kg",
    groupSlug: "silkworm",
    seriesSlug: "silkworm",
    categorySlug: "silkworm",
    thai: "หนอนไหม 10 Kg (AAAAA)",
    english: "Silkworm 10 Kg (AAAAA)",
    image: {
      src: "/images/products/processed-seafood.webp",
      alt: "Processed frozen seafood product",
      title: "Processed Seafood"
    },
    size: "AAAAA",
    packing: "ลังละ 10 kg.",
    description: "หนอนไหมเกรด 5A คัดพิเศษอวบแน่น ตัวสีเหลืองสวย เหมาะสำหรับคั่ว ทอด ปรุงรสตามต้องการ"
  }
];

export const productVariants: ProductVariant[] = productVariantEntries.map((variant) => ({
  ...variant,
  productLineSlug: variant.productLineSlug ?? variant.groupSlug,
  package: variant.package ?? variant.packing,
  images: variant.images ?? variant.gallery ?? [variant.image]
}));
