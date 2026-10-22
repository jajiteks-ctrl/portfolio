
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Open and close the mobile menu
menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the menu after clicking a navigation link
navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Highlight the current section in the navbar
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: "-25% 0px -65% 0px"
});

sections.forEach(section => observer.observe(section));




/* ==========================
   HERO TYPING ANIMATION
========================== */

const typingElement = document.getElementById("typing-text");

if (typingElement) {
    const skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Python",
        "Django"
    ];

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        typingElement.textContent = "Python";
    } else {
        let skillIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeSkill() {
            const currentSkill = skills[skillIndex];

            // Display the current part of the word
            typingElement.textContent = currentSkill.substring(
                0,
                charIndex
            );

            let delay = isDeleting ? 55 : 110;

            if (!isDeleting && charIndex < currentSkill.length) {
                // Type the next character
                charIndex++;
            } else if (!isDeleting) {
                // Pause when the complete word is visible
                isDeleting = true;
                delay = 1000;
            } else if (charIndex > 0) {
                // Delete one character
                charIndex--;
            } else {
                // Move to the next skill
                isDeleting = false;
                skillIndex = (skillIndex + 1) % skills.length;
                delay = 300;
            }

            setTimeout(typeSkill, delay);
        }

        typeSkill();
    }
}


const aboutElements = document.querySelectorAll(
    ".about-section .reveal"
);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
    aboutElements.forEach((element) => {
        element.classList.add("visible");
    });
} else {
    const aboutObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    aboutElements.forEach((element) => {
        aboutObserver.observe(element);
    });
}


/* Reveal elements as they enter the viewport */
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});

/* Animate the experience and education timeline rails */
const timelineObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

document.querySelectorAll(".timeline").forEach(timeline => {
    timelineObserver.observe(timeline);
});

/* Update the footer year, if the element exists */
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}