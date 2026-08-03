import { cmsConfig } from "./config";

export function resolveMediaUrl(src: string): string {
  if (!src) return "";
  
  // Temporary workaround for Vercel preview: bypass /api/media/file/ serverless route
  // and request static files directly from Vercel CDN (/media/<filename>)
  let normalizedSrc = src;
  if (normalizedSrc.includes("/api/media/file/")) {
    normalizedSrc = normalizedSrc.replace("/api/media/file/", "/media/");
  }

  // If it's already an absolute path (with schema), return as-is
  if (normalizedSrc.startsWith("http://") || normalizedSrc.startsWith("https://")) {
    return normalizedSrc;
  }
  
  // If mediaHost is configured, prefix the relative URL path
  if (cmsConfig.mediaHost) {
    return `${cmsConfig.mediaHost}${normalizedSrc}`;
  }
  
  return normalizedSrc;
}
