/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import configPromise from "../src/payload.config";
import { mockSourcingRegions } from "../src/lib/data/sourcing";

async function seed() {
  console.log("Initializing Payload to seed Sourcing Regions...");
  const payload = await getPayload({ config: configPromise });

  const existing = await payload.find({
    collection: "sourcing-regions",
    limit: 100,
  });

  console.log(`Found ${existing.totalDocs} existing sourcing regions.`);

  for (const item of mockSourcingRegions) {
    const found = existing.docs.find((d: any) => d.slug === item.slug);
    if (!found) {
      console.log(`Creating Sourcing Region: ${item.regionName}...`);
      await payload.create({
        collection: "sourcing-regions",
        data: {
          regionName: item.regionName,
          slug: item.slug,
          isBase: item.isBase ?? false,
          xPercent: item.xPercent,
          yPercent: item.yPercent,
          speciesSourced: item.speciesSourced,
          partnerName: item.partnerName,
          trustMarker: item.trustMarker,
          order: item.order,
        },
      });
    } else {
      console.log(`Sourcing Region ${item.regionName} already exists.`);
    }
  }

  console.log("Seeding Sourcing Regions complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding sourcing regions:", err);
  process.exit(1);
});
