from dataclasses import dataclass
from datetime import date

import flask
from flask import Flask, send_from_directory, request

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


def calculateAge(birthDate):
    today = date.today()
    age = today.year - birthDate.year - ((today.month, today.day) < (birthDate.month, birthDate.day))

    return age

@app.route("/static/icons/new/<path:filename>")
def newicons(filename):
    return send_from_directory(app.static_folder, f"icons/new/{filename}")

@app.route("/static/scripts/<path:filename>")
def scripts(filename):
    return send_from_directory(app.static_folder, f"scripts/{filename}")

@app.route("/static/styles/<path:filename>")
def styles(filename):
    return send_from_directory(app.static_folder, f"styles/{filename}")

@app.route('/')
def index():
    share_socials = [
        ShareSocial("facebook", f"https://www.facebook.com/sharer/sharer.php?u={request.url}"),
        ShareSocial("twitter", f"https://twitter.com/intent/tweet?url={request.url}&text="),
        ShareSocial("linkedin", f"https://www.linkedin.com/shareArticle?mini=true&url={request.url}"),
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
        Repo("This very website", "This portfolio website, made with Bootstrap 5 and Less", "Portfolio"),
    ]

    contacts = [
        Contact("mailto:contact.me@terenz.dev", "Email", icon="envelope", social="google"),
        Contact("https://www.linkedin.com/in/andrea-terenz/", "Linkedin"),
        Contact("https://www.github.com/AndreaTerenz", "Github"),
        Contact("https://www.twitter.com/AtTerenziani", "Twitter", icon="twitter-x"),
    ]

    age = calculateAge(date(1999, 10, 30))

    return flask.render_template("index.html",
                                 age=age,
                                 share_socials=share_socials,
                                 about_logos=about_logos,
                                 repos=repos,
                                 contacts=contacts)


if __name__ == '__main__':
    app.run()