import type { CollectionConfig } from "payload";

export const SourcingRegions: CollectionConfig = {
  slug: "sourcing-regions",
  labels: {
    singular: "Sourcing Region",
    plural: "Sourcing Regions",
  },
  admin: {
    useAsTitle: "regionName",
    defaultColumns: ["regionName", "speciesSourced", "partnerName", "order", "isBase"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "regionName",
      type: "text",
      required: true,
      label: "Region Name (e.g. [PLACEHOLDER] North Atlantic)",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
    },
    {
      name: "isBase",
      type: "checkbox",
      defaultValue: false,
      label: "Is Origin Seafoods Central Base (Samut Sakhon)?",
    },
    {
      name: "xPercent",
      type: "number",
      required: true,
      label: "Map X Position (%)",
    },
    {
      name: "yPercent",
      type: "number",
      required: true,
      label: "Map Y Position (%)",
    },
    {
      name: "speciesSourced",
      type: "text",
      required: true,
      label: "Species Sourced (e.g. Atlantic Salmon)",
    },
    {
      name: "partnerName",
      type: "text",
      required: true,
      label: "Partner / Fishery Name",
    },
    {
      name: "trustMarker",
      type: "text",
      required: true,
      label: "Trust Marker (e.g. MSC Certified, -25°C Cold Chain)",
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 1,
      label: "Reveal Order Index",
    },
  ],
};
