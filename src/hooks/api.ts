import { COUNTRIES } from "@constants/countries";
import { offersForCountries, search } from "@helpers/justwatch";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { milliseconds } from "date-fns";

export function useGetMovies(title: string, country: string, language: string) {
  const client = useQueryClient();
  const key = [title, country, language];
  const { data, ...query } = useQuery({
    queryKey: key,
    queryFn: async () => await search(title, country, language, 20, false),
    placeholderData: keepPreviousData,
    enabled: false,
    staleTime: milliseconds({ hours: 1 }),
    gcTime: milliseconds({ seconds: 1 }),
  });

  async function fetch() {
    if (title === "" || country === "" || language === "") return;
    const res = client.getQueryData(key);
    if (res === undefined) query.refetch();
  }

  return { movies: data ?? [], fetchMovies: fetch, queryMovies: query };
}

export function useGetOffers(selected: number | undefined, language: string) {
  const client = useQueryClient();
  const key = [selected, language];
  const { data, ...query } = useQuery({
    queryKey: key,
    queryFn: async () =>
      await offersForCountries(
        String(selected),
        new Set(Object.keys(COUNTRIES)),
        language,
        false
      ),
    placeholderData: keepPreviousData,
    enabled: selected !== undefined,
    staleTime: milliseconds({ hours: 1 }),
    gcTime: milliseconds({ seconds: 1 }),
  });

  async function fetch() {
    const res = client.getQueryData(key);
    if (res === undefined) query.refetch();
  }

  return { offers: data ?? [], fetchOffers: fetch, queryOffers: query };
}
