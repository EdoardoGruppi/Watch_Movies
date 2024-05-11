"""
This module defines the App class, which serves as the core logic for a movie streaming 
application built with Flet.

It interacts with helper functions (`find_offers` and `find_titles`) to retrieve movie 
data and streaming offers, and utilizes constants (`ORDERED_SERVICES` and `GENRE_MAPPING`) 
to manage service names and genre translations.
"""

import webbrowser
from constants import ORDERED_SERVICES, GENRE_MAPPING
from helpers import find_offers, find_titles
import flet as ft


class App:
    """
    This class defines the main application logic for a movie related app.
    """

    def __init__(self):
        """
        Initializes the application with empty movie data, search bar elements,
        and page references.
        """
        self.movies = []
        self.search_bar = {}
        self.page = None
        self.offers = None
        self.border_radius = 15
        self.black = "#000000"
        self.dark_grey = "#050505"
        self.red = "#E50914"
        self.white = "#FFFFFF"
        self.light_grey = "#9F9F9F"

    def movie_click(self, e):
        """
        Handles clicks on movie cards.

        Args:
            e (ft.Event): The click event object.

        This function retrieves streaming offers for the movie that was clicked on.
        It extracts the movie ID from the event object and uses the `find_offers`
        function (assumed to be imported from a separate module) to retrieve offers.
        It then calls the `create_offers_page` function to display the offers.
        """
        self.offers = find_offers(e.control.key)
        self.create_offers_page()

    def btn_click(self, _):
        """
        Handles clicks on the search button.

        Args:
            _: A dummy argument (not used).

        This function retrieves movies based on user-provided search criteria.
        It gets the values from the movie title, country code, and language code
        input fields in the search bar. It then calls the `find_titles` function
        (assumed to be imported from a separate module) to search for movies
        matching the criteria. Finally, it updates the `movies` list with the
        search results and calls the `create_movie_cards` function to display them.
        """
        self.movies = find_titles(
            self.search_bar["movie_input"].value,
            self.search_bar["country"].value,
            self.search_bar["language"].value,
        )
        self.create_movie_cards()

    def main(self, page: ft.Page):
        """
        The main entry point for the application.

        Args:
        page (ft.Page): The Flet page object where the app will be displayed.

        This function sets up the initial layout of the application window.
        It defines the window size, title, and scroll mode. Finally, it calls the
        `create_search_bar` function to build and display the search bar.
        """
        self.page = page
        self.page.window_width = 1450
        self.page.window_height = 800
        self.page.window_resizable = False
        self.page.window_frameless = True
        self.page.bgcolor = self.black
        self.page.scroll = ft.ScrollMode.AUTO
        self.create_app_bar()
        self.create_search_bar()

    def create_app_bar(self):
        self.page.add(
            ft.Row(
                [
                    ft.WindowDragArea(
                        ft.Container(
                            ft.Image(
                                src="logo.png", fit=ft.ImageFit.CONTAIN, height=30
                            ),
                            padding=8,
                            alignment=ft.alignment.center_left,
                        ),
                        maximizable=False,
                        expand=True,
                    ),
                    ft.IconButton(
                        ft.icons.CLOSE, on_click=lambda _: self.page.window_close()
                    ),
                ]
            )
        )

    def create_search_bar(self):
        """
        Constructs the search bar with movie title, country code, and language code
        input fields, and a search button.

        This function creates individual Flet controls for the movie title, country
        code, and language code input fields with labels using `ft.TextField`.
        It creates a search button using `ft.FloatingActionButton` with a search icon
        and assigns the `btn_click` function as the click handler. Finally, it
        organizes these elements in a row using `ft.Row` and adds them to a container
        using `ft.Container` with padding and background color. The container
        is then added to the Flet page using `self.page.add`.
        """
        self.search_bar["movie_input"] = ft.TextField(
            label="Movie Title",
            value=(
                self.search_bar["movie_input"].value
                if "movie_input" in self.search_bar
                else None
            ),
            width=350,
            border_radius=0,
            color=self.white,
            bgcolor=self.black,
            border_color=self.white,
        )
        self.search_bar["country"] = ft.TextField(
            label="Country Code",
            value=(
                self.search_bar["country"].value
                if "country" in self.search_bar
                else "US"
            ),
            width=200,
            border_radius=0,
            color=self.white,
            bgcolor=self.black,
            border_color=self.white,
        )
        self.search_bar["language"] = ft.TextField(
            label="Language Code",
            value=(
                self.search_bar["language"].value
                if "language" in self.search_bar
                else "en"
            ),
            width=200,
            border_radius=0,
            color=self.white,
            bgcolor=self.black,
            border_color=self.white,
        )
        self.search_bar["icon"] = ft.IconButton(
            icon=ft.icons.SEARCH,
            icon_color=self.white,
            on_click=self.btn_click,
            bgcolor=self.black,
            style=ft.ButtonStyle(
                side={
                    ft.MaterialState.DEFAULT: ft.BorderSide(1, self.white),
                },
                shape={
                    ft.MaterialState.DEFAULT: ft.RoundedRectangleBorder(radius=0),
                },
                padding=15.5,
            ),
        )
        search_bar = ft.Container(
            content=ft.Row(
                self.search_bar.values(), alignment=ft.MainAxisAlignment.CENTER
            ),
            padding=ft.padding.only(bottom=80, top=20),
            bgcolor=self.black,
            border_radius=self.border_radius,
        )
        self.page.add(search_bar)

    def create_movie_cards(self):
        """
        This function generates movie cards for the search results and displays them on the page.

        It creates a vertical column layout to hold the movie cards and iterates through each movie
        in the `self.movies` list. For each movie, it creates a card containing two sections: a
        movie poster image and a details container.

        The movie poster image section uses a responsive row to adjust the layout for different
        screen sizes and includes properties like source URL, height, fit mode, and border radius.

        The details container uses a column layout to stack details vertically and includes:
        - Movie title with font size and weight adjustments
        - Movie description in markdown format
        - Release date and runtime in minutes using markdown
        - Genres displayed with human-readable names using a genre mapping dictionary
        - A watch button with a play icon, movie ID as key, click handler assigned to the
            `movie_click` function, color, and padding

        After building the card for each movie, it's added to the main column. Finally, it clears
        any previous controls on the page except one (presumably the search bar), adds the cards
        column to the page, and updates the page to reflect the changes.
        """

        cards = ft.Column(
            [self._create_card(movie) for movie in self.movies],
        )
        self.clear_page_controls(keep=2)
        self.page.add(cards)
        self.page.update()

    def _create_card(self, movie):
        """
        This function creates a card containing details for a single movie.

        Args:
            movie (dict): A dictionary containing movie information (title, poster URL, etc.).

        Returns:
            ft.Control: The Flet control representing the movie card.
        """
        image = ft.Image(
            col=3,
            src=movie.poster,
            height=420,
            fit=ft.ImageFit.FIT_HEIGHT,
            repeat=ft.ImageRepeat.NO_REPEAT,
            border_radius=ft.border_radius.all(10),
        )
        column = ft.Column(
            [
                ft.Container(
                    ft.Text(
                        movie.title,
                        size=40,
                        weight=ft.FontWeight.W_900,
                        color=self.white,
                    ),
                    padding=ft.padding.only(bottom=10, top=10),
                ),
                ft.Text(
                    "Description: ",
                    size=15,
                    weight=ft.FontWeight.BOLD,
                    color=self.white,
                    spans=[
                        ft.TextSpan(
                            movie.short_description,
                            ft.TextStyle(
                                size=14,
                                color=self.light_grey,
                                weight=ft.FontWeight.W_100,
                            ),
                        )
                    ],
                ),
                ft.Text(
                    "Release Date: ",
                    size=15,
                    weight=ft.FontWeight.BOLD,
                    color=self.white,
                    spans=[
                        ft.TextSpan(
                            movie.release_date,
                            ft.TextStyle(
                                size=14,
                                color=self.light_grey,
                                weight=ft.FontWeight.W_100,
                            ),
                        )
                    ],
                ),
                ft.Text(
                    "Length: ",
                    size=15,
                    weight=ft.FontWeight.BOLD,
                    color=self.white,
                    spans=[
                        ft.TextSpan(
                            movie.runtime_minutes,
                            ft.TextStyle(
                                size=14,
                                color=self.light_grey,
                                weight=ft.FontWeight.W_100,
                            ),
                        )
                    ],
                ),
                ft.Text(
                    "Genres: ",
                    size=15,
                    weight=ft.FontWeight.BOLD,
                    color=self.white,
                    spans=[
                        ft.TextSpan(
                            ", ".join(GENRE_MAPPING.get(g, g) for g in movie.genres),
                            ft.TextStyle(
                                size=14,
                                color=self.light_grey,
                                weight=ft.FontWeight.W_100,
                            ),
                        )
                    ],
                ),
                ft.Container(
                    ft.IconButton(
                        key=movie.entry_id,
                        icon=ft.icons.LIVE_TV,
                        icon_color=self.white,
                        on_click=self.movie_click,
                        bgcolor=self.dark_grey,
                        style=ft.ButtonStyle(
                            side={
                                ft.MaterialState.DEFAULT: ft.BorderSide(1, self.white),
                            },
                            shape={
                                ft.MaterialState.DEFAULT: ft.RoundedRectangleBorder(
                                    radius=0
                                ),
                            },
                            padding=15.5,
                        ),
                    ),
                    padding=ft.padding.only(top=100, left=970),
                ),
            ],
            alignment=ft.alignment.center,
        )
        inner_components = [
            image,
            ft.Container(
                col=9,
                content=column,
                padding=15,
            ),
        ]
        return ft.Card(
            ft.ResponsiveRow(inner_components),
            color=self.dark_grey,
            shape=ft.RoundedRectangleBorder(radius=0),
        )

    def create_offers_page(self):
        """
        This function constructs and displays a page with detailed streaming offers for a chosen
        movie. It starts by clearing all controls from the page to ensure a clean layout for the
        offer details. Then, it builds an information card using a vertical column layout. This
        card will contain:
            - A back button allowing users to return to the main search page. This button uses an
                icon and assigns the `recreate_main_page` function as the click handler.
            - A data table to display streaming offers organized by country and service. The table
                includes styling options for text, borders, and sorting. It defines columns for
                country and additional columns for each service name retrieved from
                `ORDERED_SERVICES`.

        The function iterates through each country with offers in the `self.offers` dictionary:
            - For each country, it creates a data row in the table.
            - Within the data row, it adds a data cell with the country name.
            - It loops through each service name in `ORDERED_SERVICES` to check if an offer exists
                for this country and service in the `self.offers` dictionary.
                - If an offer exists a data cell is created containing a floating action button.
                    This button displays the service icon and price (if available) or a placeholder
                    if the price is missing. Clicking the button triggers the `open_website`
                    function to open the streaming service's website in the user's web browser.
                - If no offer exists a data cell is created displaying a hyphen (-) to indicate no
                    offer is available.

        Finally, the information card containing the data table with offer details is added to the
        page, and the page is updated to reflect the changes.
        """
        self.clear_page_controls(keep=1)
        info_card = ft.Column(
            controls=[
                ft.IconButton(
                    icon=ft.icons.ARROW_BACK, on_click=self.recreate_main_page
                ),
                ft.DataTable(
                    heading_text_style=ft.TextStyle(
                        weight=ft.FontWeight.W_900, color=self.white
                    ),
                    data_text_style=ft.TextStyle(
                        weight=ft.FontWeight.W_400, color=self.white
                    ),
                    vertical_lines=ft.BorderSide(width=1.5),
                    divider_thickness=1.3,
                    border=ft.Border(
                        top=ft.BorderSide(width=2),
                        bottom=ft.BorderSide(width=2),
                        left=ft.BorderSide(width=2),
                        right=ft.BorderSide(width=2),
                    ),
                    sort_ascending=True,
                    sort_column_index=0,
                    columns=[
                        ft.DataColumn(ft.Text("Country")),
                    ]
                    + [ft.DataColumn(ft.Text(service)) for service in ORDERED_SERVICES],
                    rows=[
                        ft.DataRow(
                            cells=[ft.DataCell(ft.Text(country))]
                            + [
                                ft.DataCell(
                                    ft.FloatingActionButton(
                                        key=self.offers[country][service]["url"],
                                        content=ft.Row(
                                            [
                                                ft.Icon(ft.icons.WEB),
                                                ft.Text("Visit"),
                                            ],
                                            alignment="center",
                                            spacing=15,
                                        ),
                                        on_click=self.open_website,
                                        bgcolor=ft.colors.AMBER_300,
                                        shape=ft.RoundedRectangleBorder(radius=5),
                                        width=120,
                                        mini=True,
                                    )
                                    if self.offers[country][service]
                                    and self.offers[country][service]["price"] is None
                                    else (
                                        ft.FloatingActionButton(
                                            key=self.offers[country][service]["url"],
                                            content=ft.Row(
                                                [
                                                    ft.Icon(ft.icons.PRICE_CHANGE),
                                                    ft.Text(
                                                        self.offers[country][service][
                                                            "price"
                                                        ]
                                                    ),
                                                ],
                                                alignment="center",
                                                spacing=10,
                                            ),
                                            on_click=self.open_website,
                                            bgcolor=ft.colors.CYAN_400,
                                            shape=ft.RoundedRectangleBorder(radius=5),
                                            width=max(
                                                120,
                                                len(
                                                    self.offers[country][service][
                                                        "price"
                                                    ]
                                                )
                                                * 15,
                                            ),
                                            mini=True,
                                        )
                                        if self.offers[country][service]
                                        else ft.Text("-")
                                    )
                                )
                                for service in ORDERED_SERVICES
                            ],
                        )
                        for country in sorted(self.offers.keys())
                    ],
                ),
            ]
        )
        self.page.add(info_card)
        self.page.update()

    def recreate_main_page(self, _):
        """
        This function clears the current page and rebuilds the main search interface.

        It's likely used when the user navigates back from the offer details page to the
        movie search page.

        - Clears any existing controls on the page using `clear_page_controls()`.
        - Calls functions to potentially rebuild search bar elements and movie card displays.
        - Updates the page to reflect the changes.
        """
        self.clear_page_controls(0)
        self.create_app_bar()
        self.create_search_bar()
        self.create_movie_cards()

    def clear_page_controls(self, keep=0):
        """
        This function removes all controls from the current page except for a specified
        number (optional).

        Args:
            keep (int, optional): The number of controls to retain on the page. Defaults to
                0 (remove all).
        """
        while len(self.page.controls) > keep:
            self.page.controls.pop()

    def open_website(self, e):
        """
        This function handles clicks on the floating action buttons within the offer details table.

        Args:
            e (ft.Event): The click event object.

        - Extracts the URL stored as the button's key (`e.control.key`).
        - Opens the URL in the user's default web browser using a platform-specific library
            (likely imported from a separate module).
        """
        webbrowser.open(e.control.key)


app = App()
ft.app(app.main)
