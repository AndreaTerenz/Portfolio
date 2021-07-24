class Repo {
    static base_gh_url = "https://github.com/AndreaTerenz/"

    constructor(name, description, gh_name) {
        this.name = name
        this.description = description
        this.link = Repo.base_gh_url + gh_name
    }
}

const indicatorsTemplate = document.getElementById("carousel-indicators-template")
const indicatorsParent = document.getElementById("carousel-indicators-parent")
const reposTemplate = document.getElementById("repo-template")
const reposParent = document.getElementById("repo-car-inner")
const repos = [
    new Repo("Up The Drain", "FPS prototype game made with Unity", "Up-the-Drain"),
    new Repo("AoC 2020", "Some of my solutions for the 2020 Advent of Code challenges", "Advent-of-Code-2020"),
    new Repo("p5 Pong", "Pong clone made with p5.js and Node.js", "p5-pong"),
    new Repo("GodotMaze", "A demonstration of some maze algorithms made with Godot", "GodotMaze"),
    new Repo("This website", "My personal website made with Bootstrap 5", "AndreaTerenz.github.io"),
]


repos.forEach((r, i) => {
    let indicatorClone = indicatorsTemplate.content.cloneNode(true)
    let btn = indicatorClone.querySelector("button")

    btn.setAttribute("data-bs-slide-to", i)
    btn.setAttribute("aria-label", `Slide ${i}`)

    indicatorsParent.appendChild(btn)

    let repoClone = reposTemplate.content.firstElementChild.cloneNode(true)
    let h = repoClone.querySelector("h1.repo-name")
    let d = repoClone.querySelector("p.repo-descr")
    let l = repoClone.querySelector("a.repo-link")

    console.log(r.name)
    console.log(repoClone)

    h.innerText = r.name
    d.innerText = r.description
    l.setAttribute("href", r.link)

    if (i === 0) {
        btn.classList.add("active")
        repoClone.classList.add("active")
    }

    reposParent.appendChild(repoClone)
})