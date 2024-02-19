from dataclasses import dataclass

import flask
from flask import Flask

app = Flask(__name__)

@dataclass
class ShareSocial:
    name: str
    link: str

@dataclass
class Repo:
    display_name : str
    description : str
    gh_name : str

@dataclass
class Contact:
    link: str
    name: str
    icon: str = ""
    social: str = ""
    brand: bool = True

@app.route('/')
def index():
    share_socials = [
        ShareSocial("facebook", "https://www.facebook.com/sharer/sharer.php?u=http://terenz.dev/"),
        ShareSocial("twitter", "https://twitter.com/intent/tweet?url=http://terenz.dev/&text="),
        ShareSocial("linkedin", "https://www.linkedin.com/shareArticle?mini=true&url=http://terenz.dev/"),
    ]

    about_logos = [
        "6/6a/Godot_icon.svg",
        "9/99/Unofficial_JavaScript_logo_2.svg",
        "thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
        "1/18/ISO_C%2B%2B_Logo.svg",
    ]

    repos = [
        Repo("Nameless", "FPS prototype game made with Godot", "Nameless"),
        Repo("AoC 2020", "Some of my solutions for the 2020 Advent of Code challenges", "Advent-of-Code-2020"),
        Repo("p5 Pong", "Pong clone made with p5.js and Node.js", "p5-pong"),
        Repo("GodotMaze", "A demonstration of some maze generation algorithms made with Godot", "GodotMaze"),
        Repo("This very website", "This portfolio website, made with Bootstrap 5 and Less", "AndreaTerenz.github.io"),
    ]

    contacts = [
        Contact("mailto:contact.me@terenz.dev", "Email", icon="envelope", brand=False, social="google"),
        Contact("https://www.linkedin.com/in/andrea-terenz/", "Linkedin"),
        Contact("https://www.github.com/AndreaTerenz", "Github"),
        Contact("https://www.twitter.com/AtTerenziani", "Twitter", icon="x-twitter"),
    ]

    return flask.render_template("better-index.html",
                                 share_socials=share_socials,
                                 about_logos=about_logos,
                                 repos=repos,
                                 contacts=contacts)


if __name__ == '__main__':
    app.run()