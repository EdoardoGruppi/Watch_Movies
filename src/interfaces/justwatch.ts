export interface OfferPackage {
  id: string;
  packageId: number;
  name: string;
  technicalName: string;
  icon: string;
}

export interface Offer {
  id: string;
  monetizationType: string;
  presentationType: string;
  priceString: string | null;
  priceValue: number | null;
  priceCurrency: string;
  lastChangeRetailPriceValue: number | null;
  type: string;
  package: OfferPackage;
  url: string;
  elementCount: number | null;
  availableTo: string | null;
  deeplinkRoku: string | null;
  subtitleLanguages: string[];
  videoTechnology: string[];
  audioTechnology: string[];
  audioLanguages: string[];
}

export interface Scoring {
  imdbScore: number | null;
  imdbVotes: number | null;
  tmdbPopularity: number | null;
  tmdbScore: number | null;
  tomatoMeter: number | null;
  certifiedFresh: boolean | null;
  jwRating: number | null;
}

export interface Interactions {
  likes: number | null;
  dislikes: number | null;
}

export interface StreamingCharts {
  rank: number;
  trend: string;
  trendDifference: number;
  topRank: number;
  daysInTop3: number;
  daysInTop10: number;
  daysInTop100: number;
  daysInTop1000: number;
  updated: string;
}

export interface MediaEntry {
  id: number;
  // entryId: string;
  objectId: number;
  objectType: string;
  title: string;
  url: string;
  releaseYear: number;
  releaseDate: string;
  runtimeMinutes: number;
  shortDescription: string;
  genres: string[];
  imdbId: string | null;
  tmdbId: string | null;
  poster: string | null;
  backdrops: string[];
  ageCertification: string | null;
  scoring: Scoring | null;
  interactions: Interactions | null;
  streamingCharts: StreamingCharts | null;
  offers: Offer[];
}
