import type { IContentProvider } from "./interfaces/IContentProvider";
import { CMSContentProvider } from "./cms/CMSContentProvider";
import { MockContentProvider } from "./mock/MockContentProvider";
import { cmsConfig } from "../cms/config";

export function getContentProvider(): IContentProvider {
  if (cmsConfig.provider === "cms") {
    return new CMSContentProvider();
  }
  return new MockContentProvider();
}
