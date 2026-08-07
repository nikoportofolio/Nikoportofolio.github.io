/* ==========================================
   NIKO JULIANDARUS PORTFOLIO
   Premium Script v1.0
========================================== */

// ================= LOADER =================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.transition = ".8s";

    setTimeout(() => {

        loader.style.display = "none";

    }, 800);

});

// ================= NAVBAR =================

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        nav.classList.add("scrolled");

    }else{

        nav.classList.remove("scrolled");

    }

});

// ================= COUNTER =================

const counters = document.querySelectorAll(".counter");

const speed = 40;

const startCounter = () => {

    counters.forEach(counter => {

        const update = () => {

            const target = +counter.dataset.target;

            const current = +counter.innerText;

            const increment = target / speed;

            if(current < target){

                counter.innerText = Math.ceil(current + increment);

                setTimeout(update,35);

            }else{

                counter.innerText = target;

            }

        }

        update();

    });

}

let counterPlayed = false;

window.addEventListener("scroll",()=>{

    const stats = document.querySelector(".stats");

    const top = stats.getBoundingClientRect().top;

    if(top < window.innerHeight-100 && !counterPlayed){

        startCounter();

        counterPlayed = true;

    }

});

// ================= REVEAL =================

const reveals = document.querySelectorAll("section");

window.addEventListener("scroll", revealSection);

function revealSection(){

    reveals.forEach(section=>{

        const top = section.getBoundingClientRect().top;

        if(top < window.innerHeight-120){

            section.classList.add("reveal");

            section.classList.add("active");

        }

    });

}

revealSection();

// ================= SMOOTH BUTTON =================

document.querySelectorAll("a[href^='#']").forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});

// ================= HERO PARALLAX =================

window.addEventListener("scroll",()=>{

    const hero = document.querySelector(".hero");

    let value = window.scrollY;

    hero.style.backgroundPositionY = value * .5 + "px";

});

// ================= GALLERY =================

const galleryImages = document.querySelectorAll(".gallery-grid img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

document.body.appendChild(lightbox);

galleryImages.forEach(image=>{

    image.addEventListener("click",()=>{

        lightbox.classList.add("active");

        const img = document.createElement("img");

        img.src = image.src;

        while(lightbox.firstChild){

            lightbox.removeChild(lightbox.firstChild);

        }

        lightbox.appendChild(img);

    });

});

lightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

// ================= CURSOR EFFECT =================

const cursor = document.createElement("div");

cursor.classList.add("cursor");

document.body.appendChild(cursor);

window.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX+"px";

    cursor.style.top = e.clientY+"px";

});

// ================= PROJECT HOVER =================

const cards = document.querySelectorAll(".project-card");

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.setProperty("--x",x+"px");

        card.style.setProperty("--y",y+"px");

    });

});

// ================= TYPING EFFECT =================

const text = [

"Warehouse Staff",

"Inventory Specialist",

"Event Supervisor",

"Project Coordinator"

];

let count = 0;

let index = 0;

let currentText = "";

let letter = "";

const title = document.querySelector(".hero p");

(function type(){

    if(count === text.length){

        count = 0;

    }

    currentText = text[count];

    letter = currentText.slice(0,++index);

    title.innerHTML = letter;

    if(letter.length === currentText.length){

        count++;

        index = 0;

        setTimeout(type,1500);

    }else{

        setTimeout(type,80);

    }

})();

// ================= BACK TO TOP =================

const topButton = document.createElement("button");

topButton.innerHTML="↑";

topButton.id="topButton";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

console.log("Portfolio Ready 🚀");