# Watch Movies

This project implements a movie realted application built using the Flet framework.

## Features

- Search for movies based on title, country, and language criteria.
- View movie details including poster, title, description, release date, runtime, and genres.
- Explore streaming offers for each movie across various services and countries (configurable).
- Click on an offer to open the streaming service's website in the user's browser (if price is available).

## Getting Started

### Prerequisites:

- Python 3.6 or later
- Flet library (pip install flet)

- Installation using micromamba in a debian based docker container:
micromamba create -f environment.yml
sudo apt-get update
sudo apt install libgtk-3-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev
sudo apt install libmpv-dev mpv


### Running the Application:

- Ensure you have the required libraries installed.
- Open the main script (e.g., main.py) containing the ft.app(target=App()) line.
- Run the script using python main.py. This will launch the Flet app in your web browser.

### Code Structure

The code is organized into modules:

- app.py: Contains the core application logic defined in the App class.
- constants.py: Stores constants like service names (ORDERED_SERVICES) and genre mappings (GENRE_MAPPING).
- helpers.py: Provides helper functions for movie search (find_titles) and retrieving streaming offers (find_offers).

## Dependencies

Flet (https://github.com/flet-dev/flet): A Python framework for building user interfaces for web, desktop, and mobile.

## Next Steps

- Add app buttons
- Improve UI
- Allow pressing the Enter button to start searching movies
- Add countries flags

## Contributing

Feel free to fork the repository and submit pull requests with improvements or new features!

<!-- TODO
README.md
Github Actions
Sponsor Button
Download Count
Reddit comments
 -->
