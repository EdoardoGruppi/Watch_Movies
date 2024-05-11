"""
Module for defining re-usable components.
"""

import flet as ft

from style import COLORS


def composite_text(primary: str, info: str):
    """
    Create a composite text with primary and additional information.

    Args:
        primary (str): The primary text to display.
        info (str): Additional information to display.

    Returns:
        ft.Text: A composite text object with specified styling.
    """
    return ft.Text(
        primary,
        size=15,
        weight=ft.FontWeight.BOLD,
        color=COLORS["white"],
        spans=[
            ft.TextSpan(
                info,
                ft.TextStyle(
                    size=14,
                    color=COLORS["light_grey"],
                    weight=ft.FontWeight.W_100,
                ),
            )
        ],
    )


def text_field(label: str, val: str | None, width: int = 200):
    """
    Create a styled text field.

    Args:
        label (str): The label of the text field.
        val (str | None): The initial value of the text field.
        width (int): The width of the text field (default is 200).

    Returns:
        ft.TextField: A styled text field object.
    """
    return ft.TextField(
        label=label,
        value=val,
        width=width,
        border_radius=0,
        color=COLORS["white"],
        bgcolor=COLORS["black"],
        border_color=COLORS["white"],
    )
