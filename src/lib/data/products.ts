
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
      src: "/images/products/blue-swimming-crab.png",
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
      src: "/images/products/three-spot-swimming-crab.png",
      alt: "Three spot swimming crab frozen seafood product",
      title: "Three Spot Swimming Crab"
    },
    description: "ปูจุดธรรมชาติ เนื้อแน่นสดใหม่ เหมาะสำหรับปรุงเมนูหลากหลาย"
  },
  // Squid
  {
    id: "series-pakistani-squid",
    slug: "pakistani-squid",
    categorySlug: "squid",
    thai: "หมึกกล้วย",
    english: "Pakistani Squid",
    image: {
      src: "/images/products/pakistani-squid.png",
      alt: "Pakistani squid frozen seafood product",
      title: "Pakistani Squid"
    },
    description: "หมึกกล้วยนำเข้าคุณภาพเยี่ยม แข็งแรงและสดใหม่"
  },
  {
    id: "series-argentine-squid",
    slug: "argentine-squid",
    categorySlug: "squid",
    thai: "หมึกอาร์เจน",
    english: "Argentine Squid",
    image: {
      src: "/images/products/argentine-squid.png",
      alt: "Argentine squid frozen seafood product",
      title: "Argentine Squid"
    },
    description: "หมึกอาร์เจนตินานำเข้า หนังไม่ลอก ตัวสวยตรงไซส์"
  },
  {
    id: "series-black-squid",
    slug: "black-squid",
    categorySlug: "squid",
    thai: "หมึกดำ",
    english: "Black Squid",
    image: {
      src: "/images/products/black-squid.png",
      alt: "Black squid frozen seafood product",
      title: "Black Squid"
    },
    description: "หมึกสด ตัวแน่น เสียบไม้ย่างหรือยัดไส้รสชาติดี"
  },
  {
    id: "series-squid-head",
    slug: "squid-head",
    categorySlug: "squid",
    thai: "หัวหมึก",
    english: "Squid Head",
    image: {
      src: "/images/products/squid-head.png",
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
      src: "/images/products/squid-tail.png",
      alt: "Squid tail frozen seafood product",
      title: "Squid Tail"
    },
    description: "หางหมึกจีนและเปรูแช่แข็ง หางใหญ่ สวยงาม ไม่หัก"
  },
  {
    id: "series-squid-neck",
    slug: "squid-neck",
    categorySlug: "squid",
    thai: "คอหมึก",
    english: "Squid Neck",
    image: {
      src: "/images/products/squid-neck.png",
      alt: "Squid neck frozen seafood product",
      title: "Squid Neck"
    },
    description: "คอหมึกเปรูแช่แข็ง ชิ้นใหญ่ ขาวสะอาด เนื้อหนานุ่มเด้ง"
  },
  {
    id: "series-cuttlefish",
    slug: "cuttlefish",
    categorySlug: "squid",
    thai: "หมึกกระดอง",
    english: "Cuttlefish",
    image: {
      src: "/images/products/cuttlefish.png",
      alt: "Cuttlefish frozen seafood product",
      title: "Cuttlefish"
    },
    description: "หมึกกระดองแช่แข็งเกรดพรีเมียม สดสะอาด เนื้อหนานุ่มเด้ง คัดไซส์สม่ำเสมอ"
  },
  {
    id: "series-squid-roe",
    slug: "squid-roe",
    categorySlug: "squid",
    thai: "ไข่หมึก",
    english: "Squid Roe",
    image: {
      src: "/images/products/squid-roe.png",
      alt: "Squid roe frozen seafood product",
      title: "Squid Roe"
    },
    description: "ไข่หมึกคัดพิเศษ สดใหม่ เนื้อแน่นมันอร่อย ปลอดภัย"
  },
  {
    id: "series-squid-rings",
    slug: "squid-rings",
    categorySlug: "squid",
    thai: "หมึกวง",
    english: "Squid Rings",
    image: {
      src: "/images/products/squid-rings.png",
      alt: "Squid rings frozen seafood product",
      title: "Squid Rings"
    },
    description: "หมึกวงตัดหั่นสม่ำเสมอ สดสะอาด เหมาะสำหรับทอดและผัด"
  },
  // Jellyfish
  {
    id: "series-angel-wing-jellyfish",
    slug: "angel-wing-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนปีกนางฟ้า",
    english: "Angel Wing Jellyfish",
    image: {
      src: "/images/products/angel-wing-jellyfish.png",
      alt: "Angel wing jellyfish frozen seafood product",
      title: "Angel Wing Jellyfish"
    },
    description: "แมงกะพรุนปีกนางฟ้านำเข้าเกรดพรีเมียม สดสะอาด กรอบเด้ง"
  },
  {
    id: "series-quartered-jellyfish",
    slug: "quartered-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนผ่าสี่",
    english: "Quartered Jellyfish",
    image: {
      src: "/images/products/quartered-jellyfish.png",
      alt: "Quartered jellyfish frozen seafood product",
      title: "Quartered Jellyfish"
    },
    description: "แมงกะพรุนผ่าสี่เกรดคุณภาพ คัดไซส์สม่ำเสมอ เนื้อกรอบอร่อย"
  },
  {
    id: "series-tiger-stripe-jellyfish",
    slug: "tiger-stripe-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนลายเสือ",
    english: "Tiger Stripe Jellyfish",
    image: {
      src: "/images/products/tiger-stripe-jellyfish.png",
      alt: "Tiger stripe jellyfish frozen seafood product",
      title: "Tiger Stripe Jellyfish"
    },
    description: "แมงกะพรุนลายเสือสดสะอาด นำเข้าตรงจากแหล่งผลิตชั้นดี"
  },
  {
    id: "series-cannonball-jellyfish",
    slug: "cannonball-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนหัวกระสุน",
    english: "Cannonball Jellyfish",
    image: {
      src: "/images/products/cannonball-jellyfish.png",
      alt: "Cannonball jellyfish frozen seafood product",
      title: "Cannonball Jellyfish"
    },
    description: "แมงกะพรุนหัวกระสุนเนื้อแน่นหนา กรุบกรอบพิเศษ"
  },
  // Shellfish
  {
    id: "series-blood-cockle",
    slug: "blood-cockle",
    categorySlug: "shellfish",
    thai: "หอยแครง",
    english: "Blood Cockle",
    image: {
      src: "/images/products/blood-cockle.png",
      alt: "Blood cockle frozen seafood product",
      title: "Blood Cockle"
    },
    description: "หอยแครงฟรีส เนื้อเต็มสวย ไม่ติดฝา เลือดฉ่ำสดสะอาด"
  },
  {
    id: "series-topshell",
    slug: "topshell",
    categorySlug: "shellfish",
    thai: "หอยหวาน",
    english: "Top Shell",
    image: {
      src: "/images/products/whelk.png",
      alt: "Top Shell frozen seafood product",
      title: "Top Shell"
    },
    description: "หอยหวานและหอยหวานตูดแหลม เนื้อเด้งหวานเป็นธรรมชาติ"
  },
  {
    id: "series-japanese-scallop",
    slug: "japanese-scallop",
    categorySlug: "shellfish",
    thai: "หอยเชลล์",
    english: "Japanese Scallop",
    image: {
      src: "/images/products/japanese-scallop.png",
      alt: "Japanese scallop frozen seafood product",
      title: "Japanese Scallop"
    },
    description: "หอยเชลล์ญี่ปุ่นฝาเดียว ตัวใหญ่ สวย สะอาด เต็มฝา"
  },
  {
    id: "series-razor-clam",
    slug: "razor-clam",
    categorySlug: "shellfish",
    thai: "หอยหลอด",
    english: "Razor Clam",
    image: {
      src: "/images/products/razor-clam.png",
      alt: "Razor clam frozen seafood product",
      title: "Razor Clam"
    },
    description: "หอยหลอดแช่แข็งคุณภาพดี ขนาดจัมโบ้ อวบอ้วนสดใหม่"
  },
  // Fish
  {
    id: "series-salmon-skin",
    slug: "salmon-skin",
    categorySlug: "fish",
    thai: "หนังปลาแซลมอน",
    english: "Salmon Skin",
    image: {
      src: "/images/products/salmon-skin.png",
      alt: "Salmon skin frozen seafood product",
      title: "Salmon Skin"
    },
    description: "หนังปลาแซลมอนแช่แข็งคุณภาพเยี่ยม สดใหม่ กรอบอร่อย"
  },
  // Silkworm
  {
    id: "series-silkworm",
    slug: "silkworm",
    categorySlug: "silkworm",
    thai: "หนอนไหม",
    english: "Frozen Silkworm Chrysalis",
    image: {
      src: "/images/products/silkworm.png",
      alt: "Frozen silkworm chrysalis seafood product",
      title: "Frozen Silkworm Chrysalis"
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
      src: "/images/products/blue-swimming-crab-ibnr.png",
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
      src: "/images/products/three-spot-swimming-crab-ibnr.png",
      alt: "Three spot swimming crab frozen seafood product",
      title: "Three Spot Swimming Crab"
    },
    description: "ปูจุดธรรมชาติ เนื้อแน่นสดใหม่ เหมาะสำหรับปรุงเมนูหลากหลาย"
  },
  // Squid -> Pakistani Squid
  {
    id: "group-pakistani-squid",
    slug: "pakistani-squid",
    seriesSlug: "pakistani-squid",
    categorySlug: "squid",
    thai: "หมึกกล้วย",
    english: "Pakistani Squid",
    image: {
      src: "/images/products/pakistani-squid-white-box.png",
      alt: "Pakistani squid frozen seafood product",
      title: "Pakistani Squid"
    },
    description: "หมึกกล้วยนำเข้าบรรจุกล่องขาวเกรดดี ตัวสวยสม่ำเสมอ"
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
      src: "/images/products/argentine-squid-argentine.png",
      alt: "Argentine squid frozen seafood product",
      title: "Argentine Squid"
    },
    description: "หมึกนำเข้าจากอาร์เจนตินา สดใหม่ เนื้อหวานเด้งธรรมชาติ"
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
      src: "/images/products/black-squid-xing-bang.png",
      alt: "Black squid frozen seafood product",
      title: "Black Squid"
    },
    description: "หมึกดำแช่แข็ง ตัวสดเด้ง สีสวยตรงตามธรรมชาติ"
  },
  // Squid -> Squid Head
  {
    id: "group-squid-head",
    slug: "squid-head",
    seriesSlug: "squid-head",
    categorySlug: "squid",
    thai: "หัวหมึก",
    english: "Squid Head",
    image: {
      src: "/images/products/squid-head-squid-head.png",
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
    thai: "หางหมึก",
    english: "Squid Tail",
    image: {
      src: "/images/products/squid-tail-squid-tail.png",
      alt: "Squid tail frozen seafood product",
      title: "Squid Tail"
    },
    description: "หางหมึกจีนและหางหมึกเปรูแช่แข็ง หางใหญ่ ขาว สะอาด ไม่หัก"
  },
  // Squid -> Squid Neck
  {
    id: "group-squid-neck",
    slug: "squid-neck",
    seriesSlug: "squid-neck",
    categorySlug: "squid",
    thai: "คอหมึก",
    english: "Squid Neck",
    image: {
      src: "/images/products/squid-neck-er.png",
      alt: "Squid neck frozen seafood product",
      title: "Squid Neck"
    },
    description: "คอหมึกเปรูแช่แข็ง สด สะอาด เด้งดึ๋งได้รูป"
  },
  // Squid -> Cuttlefish
  {
    id: "group-cuttlefish",
    slug: "cuttlefish",
    seriesSlug: "cuttlefish",
    categorySlug: "squid",
    thai: "หมึกกระดอง",
    english: "Cuttlefish",
    image: {
      src: "/images/products/cuttlefish.png",
      alt: "Cuttlefish frozen seafood product",
      title: "Cuttlefish"
    },
    description: "หมึกกระดองแช่แข็งเกรดพรีเมียม สดสะอาด เนื้อหนานุ่มเด้ง คัดไซส์สม่ำเสมอ"
  },
  // Squid -> Squid Roe
  {
    id: "group-squid-roe",
    slug: "squid-roe",
    seriesSlug: "squid-roe",
    categorySlug: "squid",
    thai: "ไข่หมึก",
    english: "Squid Roe",
    image: {
      src: "/images/products/squid-roe.png",
      alt: "Squid roe frozen seafood product",
      title: "Squid Roe"
    },
    description: "ไข่หมึกคัดพิเศษ สดใหม่ เนื้อแน่นมันอร่อย ปลอดภัย"
  },
  // Squid -> Squid Rings
  {
    id: "group-squid-rings",
    slug: "squid-rings",
    seriesSlug: "squid-rings",
    categorySlug: "squid",
    thai: "หมึกวง",
    english: "Squid Rings",
    image: {
      src: "/images/products/squid-rings.png",
      alt: "Squid rings frozen seafood product",
      title: "Squid Rings"
    },
    description: "หมึกวงตัดหั่นสม่ำเสมอ สดสะอาด เหมาะสำหรับทอดและผัด"
  },
  // Jellyfish -> Angel Wing Jellyfish
  {
    id: "group-angel-wing-jellyfish",
    slug: "angel-wing-jellyfish",
    seriesSlug: "angel-wing-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนปีกนางฟ้า",
    english: "Angel Wing Jellyfish",
    image: {
      src: "/images/products/angel-wing-jellyfish.png",
      alt: "Angel wing jellyfish frozen seafood product",
      title: "Angel Wing Jellyfish"
    },
    description: "แมงกะพรุนปีกนางฟ้านำเข้าเกรดพรีเมียม สดสะอาด กรอบเด้ง"
  },
  // Jellyfish -> Quartered Jellyfish
  {
    id: "group-quartered-jellyfish",
    slug: "quartered-jellyfish",
    seriesSlug: "quartered-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนผ่าสี่",
    english: "Quartered Jellyfish",
    image: {
      src: "/images/products/quartered-jellyfish.png",
      alt: "Quartered jellyfish frozen seafood product",
      title: "Quartered Jellyfish"
    },
    description: "แมงกะพรุนผ่าสี่เกรดคุณภาพ คัดไซส์สม่ำเสมอ เนื้อกรอบอร่อย"
  },
  // Jellyfish -> Tiger Stripe Jellyfish
  {
    id: "group-tiger-stripe-jellyfish",
    slug: "tiger-stripe-jellyfish",
    seriesSlug: "tiger-stripe-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนลายเสือ",
    english: "Tiger Stripe Jellyfish",
    image: {
      src: "/images/products/tiger-stripe-jellyfish.png",
      alt: "Tiger stripe jellyfish frozen seafood product",
      title: "Tiger Stripe Jellyfish"
    },
    description: "แมงกะพรุนลายเสือสดสะอาด นำเข้าตรงจากแหล่งผลิตชั้นดี"
  },
  // Jellyfish -> Cannonball Jellyfish
  {
    id: "group-cannonball-jellyfish",
    slug: "cannonball-jellyfish",
    seriesSlug: "cannonball-jellyfish",
    categorySlug: "jellyfish",
    thai: "แมงกะพรุนหัวกระสุน",
    english: "Cannonball Jellyfish",
    image: {
      src: "/images/products/cannonball-jellyfish.png",
      alt: "Cannonball jellyfish frozen seafood product",
      title: "Cannonball Jellyfish"
    },
    description: "แมงกะพรุนหัวกระสุนเนื้อแน่นหนา กรุบกรอบพิเศษ"
  },
  // Shellfish -> Blood Cockle
  {
    id: "group-blood-cockle",
    slug: "blood-cockle",
    seriesSlug: "blood-cockle",
    categorySlug: "shellfish",
    thai: "หอยแครง",
    english: "Blood Cockle",
    image: {
      src: "/images/products/blood-cockle-blood-cockle.png",
      alt: "Blood cockle frozen seafood product",
      title: "Blood Cockle"
    },
    description: "หอยแครงแช่แข็งเนื้อแน่น แฝงความสดหวานฉ่ำเป็นธรรมชาติ"
  },
  // Shellfish -> Top Shell
  {
    id: "group-topshell",
    slug: "topshell",
    seriesSlug: "topshell",
    categorySlug: "shellfish",
    thai: "หอยหวาน",
    english: "Top Shell",
    image: {
      src: "/images/products/whelk-whelk.png",
      alt: "Top Shell frozen seafood product",
      title: "Top Shell"
    },
    description: "หอยหวานและหอยหวานตูดแหลม เนื้อเด้งหวานเป็นธรรมชาติ"
  },
  // Shellfish -> Japanese Scallop
  {
    id: "group-japanese-scallop-half-shell",
    slug: "japanese-scallop-half-shell",
    seriesSlug: "japanese-scallop",
    categorySlug: "shellfish",
    thai: "หอยเชลล์",
    english: "Japanese Scallop",
    image: {
      src: "/images/products/japanese-scallop-half-shell.png",
      alt: "Japanese scallop half shell frozen seafood product",
      title: "Japanese Scallop Half Shell"
    },
    description: "หอยเชลล์ฝาเดียวคุณภาพเยี่ยม ขนาดสม่ำเสมอเต็มฝา"
  },
  // Shellfish -> Razor Clam
  {
    id: "group-razor-clam",
    slug: "razor-clam",
    seriesSlug: "razor-clam",
    categorySlug: "shellfish",
    thai: "หอยหลอด",
    english: "Razor Clam",
    image: {
      src: "/images/products/razor-clam-razor-clam.png",
      alt: "Razor clam frozen seafood product",
      title: "Razor Clam"
    },
    description: "หอยหลอดขนาดใหญ่พิเศษ เนื้ออวบอ้วนสดใหม่ไม่มีกลิ่นคาว"
  },
  // Fish -> Salmon Skin
  {
    id: "group-salmon-skin",
    slug: "salmon-skin",
    seriesSlug: "salmon-skin",
    categorySlug: "fish",
    thai: "หนังปลาแซลมอน",
    english: "Salmon Skin",
    image: {
      src: "/images/products/salmon-skin.png",
      alt: "Salmon skin frozen seafood product",
      title: "Salmon Skin"
    },
    description: "หนังปลาแซลมอนแช่แข็งคัดคุณภาพ สดสะอาด เหมาะสำหรับประกอบอาหารและแปรรูป"
  },
  // Silkworm -> Silkworm
  {
    id: "group-silkworm",
    slug: "silkworm",
    seriesSlug: "silkworm",
    categorySlug: "silkworm",
    thai: "หนอนไหม",
    english: "Frozen Silkworm Chrysalis",
    image: {
      src: "/images/products/silkworm.png",
      alt: "Frozen silkworm chrysalis seafood product",
      title: "Frozen Silkworm Chrysalis"
    },
    description: "หนอนไหมเกรดดีที่สุด ตัวเหลืองอวบอ้วนสะอาด ไม่หักไม่แตก"
  }
];

// ==========================================================================
// Level 4: Product Variants (SKU / Size Level)
// ==========================================================================
const productVariantEntries: ProductVariant[] = [];

export const productVariants: ProductVariant[] = productVariantEntries.map((variant) => ({
  ...variant,
  productLineSlug: variant.productLineSlug ?? variant.groupSlug,
  package: variant.package ?? variant.packing,
  images: variant.images ?? variant.gallery ?? [variant.image]
}));
