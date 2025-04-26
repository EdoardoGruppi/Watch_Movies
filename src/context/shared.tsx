import { COUNTRY_LANGUAGE_MAP } from "@constants/countries";
import { BaseContextType, Children } from "@interfaces/context";
import { useGetMovies, useGetOffers } from "@hooks/api";
import { createContext, useEffect, useState } from "react";

export const BaseContext = createContext({} as BaseContextType);

export default function BaseProvider({ children }: Children) {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const { movies, fetchMovies, queryMovies } = useGetMovies(
    title,
    country,
    language
  );
  const [selected, setSelected] = useState<number>();
  const { offers, fetchOffers, queryOffers } = useGetOffers(selected, language);

  useEffect(() => {
    if (language === "" || language === undefined) {
      setLanguage(COUNTRY_LANGUAGE_MAP[country]);
    }
  }, [country]);

  return (
    <BaseContext.Provider
      value={{
        title,
        setTitle,
        country,
        setCountry,
        language,
        setLanguage,
        movies,
        fetchMovies,
        queryMovies,
        selected,
        setSelected,
        offers,
        fetchOffers,
        queryOffers,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
}
