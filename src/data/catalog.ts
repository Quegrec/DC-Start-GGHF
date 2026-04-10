import { fetchDataset } from "./api-client";

export interface CatalogOptions {
  platforms: string[];
  genres: string[];
}

export async function getCatalogOptions(): Promise<CatalogOptions> {
  return fetchDataset<CatalogOptions>("catalog-options");
}
