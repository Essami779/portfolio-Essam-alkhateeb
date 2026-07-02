/* ======================================== toggle style switcher ============================================= */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/* ======================================== theme colors ================================================== */
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(colors) {
    alternateStyles.forEach((style) => {
        if (colors === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

/* ======================================== theme Light and dark mode ================================================== */
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
});

window.addEventListener("load", () => {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.add("fa-sun");
    } else {
        dayNight.querySelector("i").classList.add("fa-moon");
    }
});

/* ======================================== theme Light and dark mode ================================================== */
const arEn = document.querySelector(".ar-en");
if (arEn) {
    const arEnIcon = arEn.querySelector("i");
    if (arEnIcon) {
        arEn.addEventListener("click", () => {
            arEnIcon.classList.toggle("fa-e");
            arEnIcon.classList.toggle("fa-a");
            document.body.classList.toggle("switch");
        });
    }
}

window.addEventListener("load", () => {
    const arEn = document.querySelector(".ar-en");
    if (arEn) {
        const arEnIcon = arEn.querySelector("i");
        if (arEnIcon) {
            if (document.body.classList.contains("switch")) {
                arEnIcon.classList.add("fa-e");
            } else {
                arEnIcon.classList.add("fa-a");
            }
        }
    }
});