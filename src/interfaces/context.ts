import React from "react";
import { MediaEntry, Offer } from "./justwatch";
import { UseQueryResult } from "@tanstack/react-query";

export interface BaseContextType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  movies: MediaEntry[] | undefined;
  fetchMovies: () => Promise<void>;
  queryMovies: Omit<UseQueryResult, "data">;
  selected: number | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
  offers: Record<string, Offer[]> | never[];
  fetchOffers: () => Promise<void>;
  queryOffers: Omit<UseQueryResult, "data">;
}

export interface Children {
  children: React.ReactNode;
}
