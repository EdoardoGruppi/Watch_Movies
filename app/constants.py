"""
This module provides constants used for movie information processing.

Constants:
  - ALL_COUNTRIES (set of str): Contains the 2-letter ISO codes for all countries.
  - GENRE_MAPPING (dict of str: str): Maps short genre codes (like "act") to full genre 
    names (like "Action").
  - INCLUDED_SERVICES (set of str): Set of streaming service names to be included in processing.
  - ORDERED_SERVICES (list of str): Ordered list of streaming services for display purposes.
  - DUPLICATED_SERVICE (set of str): Set containing a service name that might appear as a duplicate.
"""

import pycountry

ALL_COUNTRIES = {country.alpha_2 for country in pycountry.countries}
"""
This set contains the 2-letter ISO codes (e.g., 'US', 'IT') for all countries retrieved 
from the `pycountry` library. This can be used to filter or validate movie data based 
on country of origin.
"""

GENRE_MAPPING = {
    "act": "Action",
    "adv": "Adventure",
    "ani": "Animation",
    "bio": "Biography",
    "cmy": "Comedy",
    "crm": "Crime",
    "doc": "Documentary",
    "drm": "Drama",
    "eur": "European",
    "fam": "Family",
    "fnt": "Fantasy",
    "hst": "History",
    "hrr": "Horror",
    "mus": "Music",
    "mys": "Mystery",
    "rma": "Romance",
    "scf": "Science Fiction",
    "spo": "Sports",
    "trl": "Thriller",
    "war": "War",
    "wes": "Western",
    "noi": "Film Noir",
    "sho": "Short",
}
"""
This dictionary maps short genre codes (like "act" for action) to their full names (like "Action").
This can be useful for standardizing genre information in movie data.
"""

INCLUDED_SERVICES = {
    "Amazon Video",
    "Netflix",
    "Apple TV",
    "Google Play Movies",
    "Disney Plus",
    "Movistar Plus",
    "Rakuten TV",
    "Microsoft Store",
}
"""
This set contains the names of streaming services that should be considered during processing.
This can be used to filter or focus on specific services when searching for movie offers.
"""

ORDERED_SERVICES = [
    "Amazon Video",
    "Netflix",
    "Apple TV",
    "Disney Plus",
    "Microsoft Store",
    "Rakuten TV",
    "Google Play Movies",
    "Movistar Plus",
]
"""
This list contains the names of streaming services in the desired order for display purposes.
This can be used to present services in a specific sequence when showing movie information.
"""

DUPLICATED_SERVICE = {"Amazon Prime Video"}
"""
This set contains a service name that might be considered a duplicate of another service
in the `INCLUDED_SERVICES` set. This can be helpful for identifying and potentially merging 
duplicate entries for the same streaming service with slightly different names.
"""
