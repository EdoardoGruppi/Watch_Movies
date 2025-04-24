export const GRAPHQL_API_URL = "https://apis.justwatch.com/graphql";
export const _DETAILS_URL = "https://justwatch.com";
export const _IMAGES_URL = "https://images.justwatch.com";

export const _GRAPHQL_DETAILS_QUERY = `
query GetTitleNode(
  $nodeId: ID!,
  $language: Language!,
  $country: Country!,
  $formatPoster: ImageFormat,
  $formatOfferIcon: ImageFormat,
  $profile: PosterProfile,
  $backdropProfile: BackdropProfile,
  $filter: OfferFilter!,
) {
  node(id: $nodeId) {
    ...TitleDetails
    __typename
  }
  __typename
}
`;

export const _GRAPHQL_SEARCH_QUERY = `
query GetSearchTitles(
  $searchTitlesFilter: TitleFilter!,
  $country: Country!,
  $language: Language!,
  $first: Int!,
  $formatPoster: ImageFormat,
  $formatOfferIcon: ImageFormat,
  $profile: PosterProfile,
  $backdropProfile: BackdropProfile,
  $filter: OfferFilter!,
) {
  popularTitles(
    country: $country
    filter: $searchTitlesFilter
    first: $first
    sortBy: POPULAR
    sortRandomSeed: 0
  ) {
    edges {
      node {
        ...TitleDetails
        __typename
      }
      __typename
    }
    __typename
  }
}
`;

export const _GRAPHQL_OFFERS_BY_COUNTRY_QUERY = `
query GetTitleOffers(
  $nodeId: ID!,
  $language: Language!,
  $formatOfferIcon: ImageFormat,
  $filter: OfferFilter!,
) {
  node(id: $nodeId) {
    ... on MovieOrShow {
      {country_entries}
      __typename
    }
    __typename
  }
  __typename
}
`;

export const _GRAPHQL_DETAILS_FRAGMENT = `
fragment TitleDetails on MovieOrShow {
  id
  objectId
  objectType
  content(country: $country, language: $language) {
    title
    fullPath
    originalReleaseYear
    originalReleaseDate
    runtime
    shortDescription
    genres {
      shortName
      __typename
    }
    externalIds {
      imdbId
      tmdbId
      __typename
    }
    posterUrl(profile: $profile, format: $formatPoster)
    backdrops(profile: $backdropProfile, format: $formatPoster) {
      backdropUrl
      __typename
    }
    ageCertification
    scoring {
      imdbScore
      imdbVotes
      tmdbPopularity
      tmdbScore
      tomatoMeter
      certifiedFresh
      jwRating
      __typename
    }
    interactions {
      likelistAdditions
      dislikelistAdditions
      __typename
    }
    __typename
  }
  streamingCharts(country: $country) {
    edges {
      streamingChartInfo {
        rank
        trend
        trendDifference
        daysInTop3
        daysInTop10
        daysInTop100
        daysInTop1000
        topRank
        updatedAt
        __typename
      }
      __typename
    }
    __typename
  }
  offers(country: $country, platform: WEB, filter: $filter) {
    ...TitleOffer
  }
  __typename
}
`;

export const _GRAPHQL_OFFER_FRAGMENT = `
fragment TitleOffer on Offer {
  id
  monetizationType
  presentationType
  retailPrice(language: $language)
  retailPriceValue
  currency
  lastChangeRetailPriceValue
  type
  package {
    id
    packageId
    clearName
    technicalName
    icon(profile: S100, format: $formatOfferIcon)
    __typename
  }
  standardWebURL
  elementCount
  availableTo
  deeplinkRoku: deeplinkURL(platform: ROKU_OS)
  subtitleLanguages
  videoTechnology
  audioTechnology
  audioLanguages
  __typename
}
`;

export const _GRAPHQL_COUNTRY_OFFERS_ENTRY = `
      {country_code}: offers(country: {country_code}, platform: WEB, filter: $filter) {
        ...TitleOffer
        __typename
      }
`;
