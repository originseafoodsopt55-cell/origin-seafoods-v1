import { cmsConfig } from "./config";

export class CMSClient {
  private endpoint: string;

  constructor() {
    this.endpoint = cmsConfig.endpoint;
  }

  /**
   * Generic GET fetch operation to fetch data from CMS endpoints.
   * Will be implemented with node-fetch / axios in future sprints.
   */
  async get<T>(path: string): Promise<T> {
    const baseUrl = this.endpoint.endsWith("/") ? this.endpoint.slice(0, -1) : this.endpoint;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const url = `${baseUrl}${cleanPath}`;
    
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      throw new Error(`CMSClient failed to fetch from ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export const cmsClient = new CMSClient();
