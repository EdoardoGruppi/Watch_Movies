"""
This module provides functionalities for searching movie information.

Includes functions:
  - find_titles(movie_title: str, country: str, language: str):
      Searches for movie titles based on given parameters.
  - find_offers(movie_id: str):
      Searches for streaming offers for a movie.
  - complete_dict(dictionary: dict) -> dict:
      Processes a dictionary to remove duplicates and include all services.
"""

from collections import defaultdict
from simplejustwatchapi import search, offers_for_countries

from constants import ALL_COUNTRIES, INCLUDED_SERVICES, DUPLICATED_SERVICE


def find_titles(movie_title: str, country: str, language: str):
    """
    This function searches for titles of movies based on given parameters.

    Args:
        movie_title: Partial or full title of the movie to search for.
        country: Country of origin of the movie (if known).
        language: Language of the movie (if known).

    Returns:
        A list of movie titles that match the search criteria.
    """
    country = country[:2].upper()
    language = language[:2].lower()
    return search(movie_title, country=country, language=language, best_only=False)


def find_offers(movie_id: str):
    """
    This function searches for streaming offers for a given movie.

    Args:
        movie_id: Unique identifier of the movie to search offers for.

    Returns:
        A dictionary containing streaming service names as keys and their corresponding prices
        (or subscription plans) as values. If no offers are found, an empty dictionary is returned.

    Raises:
        ValueError: If the movie_id is invalid.
    """
    offers = offers_for_countries(movie_id, ALL_COUNTRIES, best_only=False)
    final_dict = {}
    for k, v in offers.items():
        if not v:
            continue
        services = defaultdict(lambda: {"url": None, "price": None})
        for offer in v:
            services[offer.package.name]["url"] = offer.url
            if services[offer.package.name]["price"] is None:
                services[offer.package.name]["price"] = offer.price_string
        final_dict[k] = services
    return complete_dict(final_dict)


def complete_dict(dictionary: dict) -> dict:
    """
    This function processes a dictionary to remove duplicate information
    and include all streaming services for each movie and region.

    Args:
        dictionary: A dictionary containing movie information.

    Returns:
        A processed dictionary.
    """
    all_services = set.union(set(INCLUDED_SERVICES.keys()), DUPLICATED_SERVICE)
    for k, v in dictionary.items():
        dictionary[k] = {key: v[key] if key in v else None for key in all_services}
        dictionary[k]["Amazon Video"] = (
            dictionary[k]["Amazon Video"] or dictionary[k]["Amazon Prime Video"]
        )
        del dictionary[k]["Amazon Prime Video"]
        dictionary[k] = {INCLUDED_SERVICES[k]: v for k, v in dictionary[k].items()}
    return dictionary
