```javascript
/* =========================================================
   NIKO JULIANDARUS — PORTFOLIO
   JAVASCRIPT
========================================================= */


/* =========================================================
   01. PAGE LOADER
========================================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hide");

    }, 500);

});


/* =========================================================
   02. NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}, { passive: true });


/* =========================================================
   03. MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("open");

    });


    // Tutup menu setelah memilih halaman

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

        });

    });

}


/* =========================================================
   04. SCROLL REVEAL
========================================================= */

const sections = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


sections.forEach(section => {

    revealObserver.observe(section);

});


/* =========================================================
   05. SKILL ANIMATION
========================================================= */

const skillsSection = document.querySelector(".skills");

if (skillsSection) {

    const skillObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    skillsSection.classList.add("visible");

                    skillObserver.unobserve(skillsSection);

                }

            });

        },

        {
            threshold: 0.3
        }

    );

    skillObserver.observe(skillsSection);

}


/* =========================================================
   06. GALLERY LIGHTBOX
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");


galleryItems.forEach(image => {

    image.addEventListener("click", function () {

        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    });

});


function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


/* =========================================================
   07. ESCAPE KEY FOR LIGHTBOX
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================================================
   08. SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetID =
            this.getAttribute("href");

        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetID);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


/* =========================================================
   09. HERO PARALLAX
========================================================= */

/*
   Efek sangat ringan.
   Tidak dijalankan di HP agar performa tetap bagus.
*/

const heroBackground =
    document.querySelector(".hero-background");

const desktopQuery =
    window.matchMedia("(min-width: 901px)");


function heroParallax() {

    if (!heroBackground) return;

    if (!desktopQuery.matches) {

        heroBackground.style.transform =
            "scale(1)";

        return;

    }

    const scroll =
        window.scrollY;

    heroBackground.style.transform =
        `translateY(${scroll * 0.12}px) scale(1.03)`;

}


window.addEventListener(
    "scroll",
    heroParallax,
    { passive: true }
);


/* =========================================================
   10. COMPANY CARD INTERACTION
========================================================= */

const companyCards =
    document.querySelectorAll(".company-card");


companyCards.forEach(card => {

    card.addEventListener("click", function () {

        const company =
            this.querySelector("h3");

        if (!company) return;

        const companyName =
            company.textContent.trim();

        console.log(
            "Selected company:",
            companyName
        );

    });

});


/* =========================================================
   11. PREVENT IMAGE DRAGGING
========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.setAttribute(
        "draggable",
        "false"
    );

});


/* =========================================================
   12. YEAR AUTOMATIC
========================================================= */

const footerYear =
    document.querySelector(".footer-right");

if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.textContent =
        `© ${currentYear}`;

}


/* =========================================================
   13. REDUCE MOTION SUPPORT
========================================================= */

const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reduceMotion.matches) {

    document.documentElement.style.scrollBehavior =
        "auto";

}


/* =========================================================
   14. CONSOLE MESSAGE
========================================================= */

console.log(
    "Niko Juliandarus Portfolio — Ready."
);
```
