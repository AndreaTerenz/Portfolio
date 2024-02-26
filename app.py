from dataclasses import dataclass
from datetime import date
import requests
import flask
from flask import Flask, request
from sassutils.wsgi import SassMiddleware

import atexit
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
app.wsgi_app = SassMiddleware(app.wsgi_app, {
    __name__: {
        "sass_path": 'static/styles/scss',
        "css_path": 'static/styles/css/compiled-scss',
        "strip_extension": True
    }
})

def get_request(url):
    r = requests.get(url)

    return r.json()

GH_LANG_COLORS = get_request("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json")
GH_LANG_COLORS = { lang : GH_LANG_COLORS[lang]["color"] for lang in GH_LANG_COLORS }

@dataclass
class Repo:
    gh_name : str
    display_name : str = ""
    description : str = ""
    data : dict = None

    def __post_init__(self):
        self.reload()

    def reload(self):
        self.data = get_request(f"https://api.github.com/repos/AndreaTerenz/{self.gh_name}")

        if self.description != "":
            self.data["description"] = self.description

        self.data["name"] = self.display_name if self.display_name != "" else self.gh_name

        lang = self.data.get("language", "")
        self.data["lang_color"] = GH_LANG_COLORS[lang] if lang else ""

print("Loading repos data...", end="")
repos = [
    Repo("Nameless", display_name="Nameless",
         description="FPS prototype game made with Godot"),
    Repo("Advent-of-Code-2020", display_name="AoC 2020",
         description="Some of my solutions for the 2020 Advent of Code challenges"),
    Repo("p5-pong", display_name="p5 Pong",
         description="Pong clone made with p5.js and Node.js"),
    Repo("GodotMaze", display_name="GodotMaze",
         description="A demonstration of some maze generation algorithms made with Godot"),
    Repo("Portfolio", display_name="This very website",
         description="This portfolio website, made with Bootstrap 5 and Less"),
]
print("done")

@dataclass
class ShareSocial:
    name: str
    link: str

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

@app.route('/')
def index():
    share_socials = [
        ShareSocial("copy", f"navigator.clipboard.writeText('{request.url}')"),
        ShareSocial("facebook", f"https://www.facebook.com/sharer/sharer.php?u={request.url}"),
        ShareSocial("linkedin", f"https://www.linkedin.com/shareArticle?mini=true&url={request.url}"),
        ShareSocial("twitter", f"https://twitter.com/intent/tweet?url={request.url}&text="),
    ]

    about_logos = [
        "6/6a/Godot_icon.svg",
        "9/99/Unofficial_JavaScript_logo_2.svg",
        "thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
        "1/18/ISO_C%2B%2B_Logo.svg",
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

def reload_repos():
    print("Reloading repos...", end="")
    for r in repos:
        r.reload()
    print("done")

REPO_RELOAD_TIMEOUT = 15
scheduler = BackgroundScheduler()
scheduler.add_job(func=reload_repos,
                  trigger="interval",
                  seconds=REPO_RELOAD_TIMEOUT*60)
scheduler.start()

atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
    app.run()