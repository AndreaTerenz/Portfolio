document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a.contact-button').forEach((el) => {
        el.classList.add(..."btn btn-lg btn-block btn-social text-left fw-bold".split(" "))

        let social = el.getAttribute('data-social');

        if (!social) {
            let link = el.getAttribute("href")
            let regex_var = new RegExp(/(\.[^\.]{0,2})(\.[^\.]{0,2})(\.*$)|(\.[^\.]*)(\.*$)/);
            social = link.replace(regex_var, '').split('.').pop()
        }

        el.classList.add(`btn-${social}`)

        let text = el.textContent
        let icon = el.getAttribute('data-icon')

        if (!icon)
            icon = social

        if (!text)
            text = social.capitalize()

        el.innerHTML = `<span class="fa fa-${icon}"></span>${text}`
    })
})