
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const year = document.getElementById("year");

// Mobile navigation menu
if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu after clicking a link
    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });
}

// Automatically update copyright year
if (year) {
    year.textContent = new Date().getFullYear();
}

// SCROLL REVEAL ANIMATION — IMPORTANT FIX
document.documentElement.classList.add("js-reveal");
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px 40px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    // Fallback for older browsers
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}

// Cursor glow effect
const cursorLight = document.querySelector(".cursor-light");

if (cursorLight && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", function (event) {
        cursorLight.style.left = event.clientX + "px";
        cursorLight.style.top = event.clientY + "px";
        cursorLight.style.opacity = "1";
    });

    document.addEventListener("mouseleave", function () {
        cursorLight.style.opacity = "0";
    });
}

// Hero portrait movement
const hero = document.querySelector(".hero");
const portrait = document.querySelector(".hero-portrait");

if (hero && portrait && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mousemove", function (event) {
        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (event.clientY - rect.top - rect.height / 2) / rect.height;

        portrait.style.translate =
            `${x * 12}px ${y * 12}px`;
    });

    hero.addEventListener("mouseleave", function () {
        portrait.style.translate = "0px 0px";
    });
}
