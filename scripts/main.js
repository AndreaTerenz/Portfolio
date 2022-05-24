class Repo {
    static username = "AndreaTerenz"

    constructor(display_name, description, gh_name) {
        this.display_name = display_name
        this.gh_name = gh_name
        this.description = description
        this.link = `https://github.com/${Repo.username}/${this.gh_name}`
    }
}

const repos = [
    new Repo("Nameless", "FPS prototype game made with Godot", "Nameless"),
    new Repo("AoC 2020", "Some of my solutions for the 2020 Advent of Code challenges", "Advent-of-Code-2020"),
    new Repo("p5 Pong", "Pong clone made with p5.js and Node.js", "p5-pong"),
    new Repo("GodotMaze", "A demonstration of some maze generation algorithms made with Godot", "GodotMaze"),
    new Repo("This very website", "This portfolio website, made with Bootstrap 5 and Less", "AndreaTerenz.github.io"),
]

function getAge(yy, mm, dd) {
    let today = new Date();
    let birthDate = new Date(yy, mm - 1, dd);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.addEventListener("DOMContentLoaded", () => {
    let el_autohide = document.querySelector('.autohide-nav');
    let indicatorsTemplate = document.querySelector("#carousel-indicators-template").content
    let indicatorsParent = document.querySelector("#carousel-indicators-parent")
    let reposTemplate = document.querySelector("#repo-template").content.firstElementChild
    let reposParent = document.querySelector("#repo-car-inner")

    repos.forEach((r, i) => {
        let indicatorClone = indicatorsTemplate.cloneNode(true)
        let btn = indicatorClone.querySelector("button")

        btn.setAttribute("data-bs-slide-to", i)
        btn.setAttribute("aria-label", `Slide ${i}`)

        indicatorsParent.appendChild(btn)

        let repoCard = reposTemplate.cloneNode(true)
        repoCard.setAttribute("data-repo", `${Repo.username}/${r.gh_name}`)
        repoCard.setAttribute("data-display-name", `${r.display_name}`)
        repoCard.setAttribute("data-description", `${r.description}`)

        if (i === 0) {
            btn.classList.add("active")
            repoCard.classList.add("active")
        }

        reposParent.appendChild(repoCard)
    })

    if (el_autohide) {
        let last_scroll_top = 0;
        document.addEventListener('scroll', () => {
            let scroll_top = window.scrollY;
            if (scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            } else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            last_scroll_top = scroll_top;
        });
    }

    //Dinamically set the age
    let age_anchor = document.getElementById("age")
    age_anchor.innerText = getAge(1999, 10, 30);

    let diocan_elems = document.querySelectorAll("._paragraph_");
    let classes = ["py-3", "px-0", "px-sm-3", "mx-auto", "mx-md-5"]

    diocan_elems.forEach((elem) => {
        classes.forEach(c => elem.classList.add(c))
    })
});