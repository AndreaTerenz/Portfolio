String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function copyURLToClipboard() {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText("www.terenz.dev");
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

                let trigger = document.getElementById('share_dropdown')
                bootstrap.Dropdown.getOrCreateInstance(trigger).hide()
            }
            last_scroll_top = scroll_top;
        });
    }
}

function fake_name_cli() {
    let fake_cli_prompt = "#> "
    let fake_cmd = "print(name)"
    let name = "'Andrea Terenziani'".toUpperCase()

    let nameHeader = document.querySelector("#nameHeader")
    let target = `${fake_cli_prompt}${name}`

    // cheap trick I know
    nameHeader.textContent = fake_cli_prompt + "".padEnd(name.length, `\xa0`)

    repeatInterval((i) => {
            let s = nameHeader.textContent
            let idx = i + fake_cli_prompt.length

            s = s.replaceAt(idx, fake_cmd[0])

            nameHeader.textContent = s
            fake_cmd = fake_cmd.slice(1)
        },
        1000, 140, fake_cmd.length,
        () => {
            setTimeout(() => nameHeader.textContent = target, 1000)
        })
}

document.addEventListener("DOMContentLoaded", () => {
    init_autohide()

    fake_name_cli()
});