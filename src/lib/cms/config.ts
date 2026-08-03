export const cmsConfig = {
  provider: process.env.NEXT_PUBLIC_CMS_PROVIDER || "mock", // "mock" | "cms"
  endpoint: process.env.NEXT_PUBLIC_CMS_ENDPOINT || "",
  mediaHost: process.env.NEXT_PUBLIC_CMS_MEDIA_HOST || "",
};
