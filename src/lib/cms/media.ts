import { cmsConfig } from "./config";

export function resolveMediaUrl(src: string): string {
  if (!src) return "";
  
  // If it's already an absolute path (with schema), return as-is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  
  // If mediaHost is configured, prefix the relative URL path
  if (cmsConfig.mediaHost) {
    return `${cmsConfig.mediaHost}${src}`;
  }
  
  return src;
}
