import type { ImageAsset } from "@/types";

export const assets = {
  hero: {
    background: {
      src: "/images/hero/background.webp",
      alt: "Origin Seafoods seafood import and export hero banner",
      title: "Origin Seafoods international seafood importer exporter banner"
    },
    overlay: {
      src: "/images/hero/overlay.png",
      alt: "Transparent hero overlay",
      title: "Hero overlay"
    },
    products: {
      blueSwimmingCrab: {
        src: "/images/hero/blue-swimming-crab.png",
        alt: "Blue swimming crab",
        title: "Blue Swimming Crab"
      },
      threeSpotSwimmingCrab: {
        src: "/images/hero/three-spot-swimming-crab.png",
        alt: "Three spot swimming crab",
        title: "Three Spot Swimming Crab"
      },
      squid: {
        src: "/images/hero/squid.png",
        alt: "Squid",
        title: "Squid"
      },
      jellyfish: {
        src: "/images/hero/jellyfish.png",
        alt: "Jellyfish",
        title: "Jellyfish"
      },
      seaSnail: {
        src: "/images/hero/sea-snail.png",
        alt: "Sea snail",
        title: "Sea Snail"
      },
      bloodCockle: {
        src: "/images/hero/blood-cockle.png",
        alt: "Blood cockle",
        title: "Blood Cockle"
      },
      halfShellScallop: {
        src: "/images/hero/half-shell-scallop.png",
        alt: "Half shell scallop",
        title: "Half Shell Scallop"
      }
    }
  },
  logos: {
    originLogo: {
      src: "/images/company/origin-logo.png",
      alt: "Origin logo",
      title: "Origin Seafoods logo"
    },
    originLogoSvg: {
      src: "/images/logos/origin-logo.svg",
      alt: "Origin logo",
      title: "Origin Seafoods logo"
    },
    originLogoWhite: {
      src: "/images/logos/origin-logo-white.svg",
      alt: "Origin white logo",
      title: "Origin Seafoods white logo"
    },
    originSymbol: {
      src: "/images/logos/origin-symbol.svg",
      alt: "Origin symbol",
      title: "Origin brand symbol"
    }
  },
  products: {
    crab: {
      src: "/images/products/blue-swimming-crab.webp",
      alt: "Blue swimming crab frozen seafood product",
      title: "Blue Swimming Crab"
    },
    squid: {
      src: "/images/products/frozen-squid.webp",
      alt: "Frozen squid seafood product",
      title: "Frozen Squid"
    },
    jellyfish: {
      src: "/images/products/jellyfish.webp",
      alt: "Frozen jellyfish seafood product",
      title: "Jellyfish"
    },
    shellfish: {
      src: "/images/products/shellfish.webp",
      alt: "Shellfish frozen seafood product",
      title: "Shellfish"
    },
    fish: {
      src: "/images/products/frozen-fish.webp",
      alt: "Frozen fish seafood product",
      title: "Frozen Fish"
    },
    processedSeafood: {
      src: "/images/products/processed-seafood.webp",
      alt: "Processed frozen seafood product",
      title: "Processed Seafood"
    }
  },
  brands: {
    altamar: {
      src: "/images/brands/altamar.svg",
      alt: "ALTAMAR Foods Peru logo",
      title: "ALTAMAR Foods Peru"
    },
    deepblue: {
      src: "/images/brands/deepblue.svg",
      alt: "DEEP BLUE Seafoods logo",
      title: "DEEP BLUE Seafoods"
    },
    aquafrost: {
      src: "/images/brands/aquafrost.svg",
      alt: "AQUAFROST logo",
      title: "AQUAFROST"
    },
    interatlantic: {
      src: "/images/brands/interatlantic.svg",
      alt: "INTERATLANTIC logo",
      title: "INTERATLANTIC"
    },
    santa: {
      src: "/images/brands/santa.svg",
      alt: "SANTA Seafood logo",
      title: "SANTA Seafood"
    },
    costa: {
      src: "/images/brands/costa.svg",
      alt: "COSTA Seafood logo",
      title: "COSTA Seafood"
    }
  },
  company: {
    logo: {
      src: "/images/company/origin-logo.png",
      alt: "Origin Seafoods Logo",
      title: "Origin Seafoods Logo"
    },
    factory: {
      src: "/images/company/factory.webp",
      alt: "Origin Seafoods factory exterior",
      title: "Origin Seafoods factory"
    },
    warehouse: {
      src: "/images/company/warehouse.png",
      alt: "Origin Seafoods Co., Ltd. headquarters and warehouse",
      title: "Origin Seafoods headquarters and warehouse"
    }
  },
  gallery: {
    containerLogistics: {
      src: "/images/gallery/container/container-logistics.webp",
      alt: "Container logistics for frozen seafood imports",
      title: "Container Logistics"
    },
    coldStorageWarehouse: {
      src: "/images/gallery/warehouse/cold-storage-warehouse.webp",
      alt: "Cold storage warehouse for frozen seafood",
      title: "Cold Storage Warehouse"
    },
    frozenSeafoodPackaging: {
      src: "/images/gallery/packing/frozen-seafood-packaging.webp",
      alt: "Frozen seafood packaging",
      title: "Frozen Seafood Packaging"
    },
    staffOperations: {
      src: "/images/gallery/staff/staff-operations.webp",
      alt: "Staff operations for seafood handling",
      title: "Staff Operations"
    },
    warehouseInventory: {
      src: "/images/gallery/warehouse/warehouse-inventory.webp",
      alt: "Warehouse inventory of frozen seafood cartons",
      title: "Warehouse Inventory"
    },
    seafoodProducts: {
      src: "/images/gallery/products/seafood-products.webp",
      alt: "Frozen seafood products",
      title: "Seafood Products"
    }
  },
  icons: {
    lineQr: {
      src: "/images/icons/line-oa-qr.png",
      alt: "Origin Seafoods Line OA QR code",
      title: "Line OA QR"
    },
    facebookQr: {
      src: "/images/icons/facebook-qr.png",
      alt: "Origin Seafoods Facebook QR code",
      title: "Facebook QR"
    }
  }
} satisfies Record<string, unknown>;

export type AssetCollection = typeof assets;

export function imageAsset(asset: ImageAsset): ImageAsset {
  return asset;
}
