import { GRAPHQL_API_URL } from "@constants/justwatch";
import { MediaEntry, Offer } from "@interfaces/justwatch";
import {
  parseDetailsResponse,
  parseOffersForCountriesResponse,
  parseSearchResponse,
  prepareDetailsRequest,
  prepareOffersForCountriesRequest,
  prepareSearchRequest,
} from "./query";

export async function search(
  title: string,
  country: string = "US",
  language: string = "en",
  count: number = 4,
  bestOnly: boolean = true
): Promise<MediaEntry[]> {
  const request = prepareSearchRequest(
    title,
    country,
    language,
    count,
    bestOnly
  );
  const response = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return parseSearchResponse(data);
}

export async function details(
  nodeId: string,
  country: string = "US",
  language: string = "en",
  bestOnly: boolean = true
): Promise<MediaEntry | null> {
  const request = prepareDetailsRequest(nodeId, country, language, bestOnly);
  const response = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return parseDetailsResponse(data);
}

export async function offersForCountries(
  nodeId: string,
  countries: Set<string>,
  language: string = "en",
  bestOnly: boolean = true
): Promise<Record<string, Offer[]>> {
  if (countries.size === 0) {
    return {};
  }
  const request = prepareOffersForCountriesRequest(
    nodeId,
    countries,
    language,
    bestOnly
  );
  const response = await fetch(GRAPHQL_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return parseOffersForCountriesResponse(data, countries);
}
