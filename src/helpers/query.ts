import {
  _DETAILS_URL,
  _GRAPHQL_COUNTRY_OFFERS_ENTRY,
  _GRAPHQL_DETAILS_FRAGMENT,
  _GRAPHQL_DETAILS_QUERY,
  _GRAPHQL_OFFER_FRAGMENT,
  _GRAPHQL_OFFERS_BY_COUNTRY_QUERY,
  _GRAPHQL_SEARCH_QUERY,
  _IMAGES_URL,
} from "@constants/justwatch";
import {
  Interactions,
  MediaEntry,
  Offer,
  OfferPackage,
  Scoring,
  StreamingCharts,
} from "@interfaces/justwatch";

function assertCountryCodeIsValid(code: string): void {
  if (code.length !== 2) throw new Error(`Invalid country code: ${code}`);
}

export function prepareSearchRequest(
  title: string,
  country: string,
  language: string,
  count: number,
  bestOnly: boolean
): Record<string, any> {
  assertCountryCodeIsValid(country);
  return {
    operationName: "GetSearchTitles",
    variables: {
      first: count,
      searchTitlesFilter: { searchQuery: title },
      language,
      country: country.toUpperCase(),
      formatPoster: "JPG",
      formatOfferIcon: "PNG",
      profile: "S718",
      backdropProfile: "S1920",
      filter: { bestOnly },
    },
    query:
      _GRAPHQL_SEARCH_QUERY +
      _GRAPHQL_DETAILS_FRAGMENT +
      _GRAPHQL_OFFER_FRAGMENT,
  };
}

export function parseSearchResponse(json: any): MediaEntry[] {
  return json.data.popularTitles.edges.map((edge: any) =>
    parseEntry(edge.node)
  );
}

export function prepareDetailsRequest(
  nodeId: string,
  country: string,
  language: string,
  bestOnly: boolean
): Record<string, any> {
  assertCountryCodeIsValid(country);
  return {
    operationName: "GetTitleNode",
    variables: {
      nodeId,
      language,
      country: country.toUpperCase(),
      formatPoster: "JPG",
      formatOfferIcon: "PNG",
      profile: "S718",
      backdropProfile: "S1920",
      filter: { bestOnly },
    },
    query:
      _GRAPHQL_DETAILS_QUERY +
      _GRAPHQL_DETAILS_FRAGMENT +
      _GRAPHQL_OFFER_FRAGMENT,
  };
}

export function parseDetailsResponse(json: any): MediaEntry | null {
  return json.errors ? null : parseEntry(json.data.node);
}

export function prepareOffersForCountriesRequest(
  nodeId: string,
  countries: Set<string>,
  language: string,
  bestOnly: boolean
): Record<string, any> {
  if (countries.size === 0) throw new Error("No countries specified");
  countries.forEach(assertCountryCodeIsValid);
  return {
    operationName: "GetTitleOffers",
    variables: {
      nodeId,
      language,
      formatPoster: "JPG",
      formatOfferIcon: "PNG",
      profile: "S718",
      backdropProfile: "S1920",
      filter: { bestOnly },
    },
    query: prepareOffersForCountriesEntry(countries),
  };
}

export function parseOffersForCountriesResponse(
  json: any,
  countries: Set<string>
): Record<string, Offer[]> {
  const offersNode = json.data.node;
  const result: Record<string, Offer[]> = {};
  countries.forEach((country) => {
    result[country] = (offersNode[country.toUpperCase()] || []).map(parseOffer);
  });
  return result;
}

function prepareOffersForCountriesEntry(countries: Set<string>): string {
  const offerRequests = Array.from(countries).map((code) =>
    _GRAPHQL_COUNTRY_OFFERS_ENTRY.replace(/{country_code}/g, code.toUpperCase())
  );
  return (
    _GRAPHQL_OFFERS_BY_COUNTRY_QUERY.replace(
      /{country_entries}/g,
      offerRequests.join("\n")
    ) + _GRAPHQL_OFFER_FRAGMENT
  );
}

function parseEntry(json: any): MediaEntry {
  const content = json.content;
  return {
    id: json.id,
    objectId: json.objectId,
    objectType: json.objectType,
    title: content.title,
    url: _DETAILS_URL + content.fullPath,
    releaseYear: content.originalReleaseYear,
    releaseDate: content.originalReleaseDate,
    runtimeMinutes: content.runtime,
    shortDescription: content.shortDescription,
    genres: (content.genres || []).map((g: any) => g.shortName),
    imdbId: content.externalIds?.imdbId ?? null,
    tmdbId: content.externalIds?.tmdbId ?? null,
    poster: content.posterUrl ? _IMAGES_URL + content.posterUrl : null,
    backdrops: (content.backdrops || []).map(
      (b: any) => _IMAGES_URL + b.backdropUrl
    ),
    ageCertification: content.ageCertification,
    scoring: parseScores(content.scoring),
    interactions: parseInteractions(content.interactions),
    streamingCharts: parseStreamingCharts(json),
    offers: (json.offers || []).map(parseOffer),
  };
}

function parseScores(json: any): Scoring | null {
  if (!json) return null;
  return {
    imdbScore: json.imdbScore,
    imdbVotes: json.imdbVotes ? parseInt(json.imdbVotes, 10) : null,
    tmdbPopularity: json.tmdbPopularity,
    tmdbScore: json.tmdbScore,
    tomatoMeter: json.tomatoMeter ? parseInt(json.tomatoMeter, 10) : null,
    certifiedFresh: json.certifiedFresh,
    jwRating: json.jwRating,
  };
}

function parseInteractions(json: any): Interactions | null {
  if (!json) return null;
  return {
    likes: json.likelistAdditions,
    dislikes: json.dislikelistAdditions,
  };
}

function parseStreamingCharts(json: any): StreamingCharts | null {
  const info = json.streamingCharts?.edges?.[0]?.streamingChartInfo;
  if (!info) return null;
  return {
    rank: info.rank,
    trend: info.trend,
    trendDifference: info.trendDifference,
    topRank: info.topRank,
    daysInTop3: info.daysInTop3,
    daysInTop10: info.daysInTop10,
    daysInTop100: info.daysInTop100,
    daysInTop1000: info.daysInTop1000,
    updated: info.updatedAt,
  };
}

function parseOffer(json: any): Offer {
  return {
    id: json.id,
    monetizationType: json.monetizationType,
    presentationType: json.presentationType,
    priceString: json.retailPrice,
    priceValue: json.retailPriceValue,
    priceCurrency: json.currency,
    lastChangeRetailPriceValue: json.lastChangeRetailPriceValue,
    type: json.type,
    package: parsePackage(json.package),
    url: json.standardWebURL,
    elementCount: json.elementCount,
    availableTo: json.availableTo,
    deeplinkRoku: json.deeplinkRoku,
    subtitleLanguages: json.subtitleLanguages,
    videoTechnology: json.videoTechnology,
    audioTechnology: json.audioTechnology,
    audioLanguages: json.audioLanguages,
  };
}

function parsePackage(json: any): OfferPackage {
  return {
    id: json.id,
    packageId: json.packageId,
    name: json.clearName,
    technicalName: json.technicalName,
    icon: _IMAGES_URL + json.icon,
  };
}
