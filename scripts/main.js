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

function cloneTemplate(t) {
    let templ = undefined

    if (typeof (t) === "string")
        templ = document.querySelector(`#${t}`)
    else if (typeof (t) === "object")
        templ = t
    else
        return templ

    return templ.content.firstElementChild.cloneNode(true)
}

function repeatInterval(callback, delay, interval, repeats, callback_end) {
    setTimeout(() => {
        let i = 0
        let intervID = setInterval(() => {
            callback(i)

            i += 1
            if (i >= repeats) {
                clearInterval(intervID)
                if (callback_end)
                    callback_end()
            }
        }, interval)
    }, delay)
}

function init_repos() {
    let indicatorsTemplate = document.querySelector("#carousel-indicators-template").content
    let indicatorsParent = document.querySelector("#carousel-indicators-parent")
    let reposParent = document.querySelector("#repo-car-inner")
    let reposTemplate = document.querySelector("#repo-template")

    repos.forEach((r, i) => {
        let indicatorClone = indicatorsTemplate.cloneNode(true)
        let btn = indicatorClone.querySelector("button")

        btn.setAttribute("data-bs-slide-to", i)
        btn.setAttribute("aria-label", `Slide ${i}`)

        indicatorsParent.appendChild(btn)

        let repoCard = cloneTemplate(reposTemplate)
        repoCard.setAttribute("data-repo", `${Repo.username}/${r.gh_name}`)
        repoCard.setAttribute("data-display-name", `${r.display_name}`)
        repoCard.setAttribute("data-description", `${r.description}`)

        if (i === 0) {
            btn.classList.add("active")
            repoCard.classList.add("active")
        }

        reposParent.appendChild(repoCard)
    })
}

function init_autohide() {
    let el_autohide = document.querySelector('.autohide-nav');
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
}

document.addEventListener("DOMContentLoaded", () => {
    init_repos()
    init_autohide()

    //Dinamically set the age
    let age_anchor = document.getElementById("age")
    age_anchor.innerText = getAge(1999, 10, 30);

    let diocan_elems = document.querySelectorAll("._paragraph_");
    let classes = ["py-3", "px-0", "px-sm-3", "mx-auto", "mx-md-5"]

    diocan_elems.forEach((elem) => {
        classes.forEach(c => elem.classList.add(c))
    })

    let nameHeader = document.querySelector("#nameHeader")
    let fake_cli_prompt = "#> "
    nameHeader.textContent = fake_cli_prompt
    let name = "echo $NAME"
    repeatInterval((i) => {
            nameHeader.textContent += name[0]
            name = name.slice(1)
        },
        1000, 120, name.length,
        () => {
            setTimeout(() => nameHeader.textContent = `${fake_cli_prompt}Andrea Terenziani`.toUpperCase(), 1000)
        })
});