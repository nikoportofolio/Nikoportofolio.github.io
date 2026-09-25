const PROCESS_PHOTO_LIMIT = 30;

const projects = {
    "inamarine": {
        title: "Inamarine",
        category: "EXHIBITION PROJECT",
        cover: "assets/images/inamarine.jpg",
        processFolder: "assets/images/projects/inamarine/"
    },
    "technology": {
        title: "Indonesia Technology & Innovation",
        category: "EXHIBITION PROJECT",
        cover: "assets/images/inti.jpg",
        processFolder: "assets/images/projects/technology/"
    },
    "iee": {
        title: "Indonesia Energy & Engineering Series",
        category: "EXHIBITION PROJECT",
        cover: "assets/images/IEE.jpg",
        processFolder: "assets/images/projects/iee/"
    },
    "allpack": {
        title: "ALLPack Indonesia",
        category: "EXHIBITION PROJECT",
        cover: "",
        processFolder: "assets/images/projects/allpack/"
    },
    "plastics-rubber": {
        title: "Plastics & Rubber Indonesia",
        category: "EXHIBITION PROJECT",
        cover: "assets/images/pri.jpg",
        processFolder: "assets/images/projects/plastics-rubber/"
    },
    "manufacturing": {
        title: "Manufacturing Indonesia",
        category: "EXHIBITION PROJECT",
        cover: "assets/images/mfi.jpg",
        processFolder: "assets/images/projects/manufacturing/"
    },
    "bigbang": {
        title: "BigBang 2025-2026",
        category: "EXHIBITION PROJECT",
        cover: "assets/images/bigbang.jpg",
        processFolder: "assets/images/projects/bigbang/"
    },
    "uni-global": {
        title: "Uni-Global Retail Exhibition",
        category: "EXHIBITION PROJECT",
        cover: "assets/images/uniglobal.jpg",
        processFolder: "assets/images/projects/uni-global/"
    }
};

const params = new URLSearchParams(window.location.search);
const projectId = (params.get("id") || "inamarine").trim().toLowerCase();
const project = projects[projectId];

const titleEl = document.getElementById("project-title");
const categoryEl = document.getElementById("project-category");
const coverEl = document.getElementById("project-cover");
const galleryEl = document.getElementById("process-gallery");
const emptyEl = document.getElementById("empty-process");
const processNavEl = document.getElementById("process-nav");
const prevButton = document.getElementById("process-prev");
const nextButton = document.getElementById("process-next");

const lightboxEl = document.getElementById("lightbox");
const lightboxImageEl = document.getElementById("lightbox-image");
const closeButton = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let lightboxImages = [];
let lightboxIndex = 0;

function getProcessScrollAmount() {
    const firstItem = galleryEl.querySelector(".process-item:not([hidden])");

    if (!firstItem) {
        return galleryEl.clientWidth * 0.85;
    }

    const gap = parseFloat(getComputedStyle(galleryEl).gap) || 0;
    return firstItem.getBoundingClientRect().width + gap;
}

function updateProcessArrows() {
    if (!processNavEl || !prevButton || !nextButton || !galleryEl) {
        return;
    }

    const hasOverflow = galleryEl.scrollWidth > galleryEl.clientWidth + 2;
    processNavEl.hidden = !hasOverflow;

    if (!hasOverflow) {
        prevButton.disabled = true;
        nextButton.disabled = true;
        return;
    }

    prevButton.disabled = galleryEl.scrollLeft <= 2;
    nextButton.disabled =
        galleryEl.scrollLeft + galleryEl.clientWidth >=
        galleryEl.scrollWidth - 2;
}

function updateLightbox() {
    if (!lightboxImages.length || !lightboxImageEl) {
        return;
    }

    const current = lightboxImages[lightboxIndex];

    lightboxImageEl.src = current.src;
    lightboxImageEl.alt = current.alt || "";

    if (lightboxPrev) {
        lightboxPrev.disabled = lightboxIndex === 0;
        lightboxPrev.hidden = lightboxImages.length <= 1;
    }

    if (lightboxNext) {
        lightboxNext.disabled =
            lightboxIndex === lightboxImages.length - 1;
        lightboxNext.hidden = lightboxImages.length <= 1;
    }
}

function openLightbox(images, index) {
    if (!lightboxEl || !lightboxImageEl || !images.length) {
        return;
    }

    lightboxImages = images;
    lightboxIndex = Math.max(
        0,
        Math.min(index, images.length - 1)
    );

    updateLightbox();

    lightboxEl.classList.add("is-open");
    lightboxEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    if (closeButton) {
        closeButton.focus();
    }
}

function closeLightbox() {
    if (!lightboxEl) {
        return;
    }

    lightboxEl.classList.remove("is-open");
    lightboxEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (lightboxImageEl) {
        lightboxImageEl.removeAttribute("src");
        lightboxImageEl.alt = "";
    }

    lightboxImages = [];
    lightboxIndex = 0;
}

function showEmptyState() {
    if (emptyEl) {
        emptyEl.hidden = false;
    }

    if (processNavEl) {
        processNavEl.hidden = true;
    }
}

function probeImage(path) {
    return new Promise(function(resolve) {
        const probe = new Image();

        probe.onload = function() {
            resolve(path);
        };

        probe.onerror = function() {
            resolve(null);
        };

        probe.src = path;
    });
}

async function findProcessImage(index) {
    const extensions = ["jpg", "jpeg", "png", "webp"];

    const candidates = extensions.map(function(extension) {
        return (
            project.processFolder +
            "process-" +
            index +
            "." +
            extension
        );
    });

    const results = await Promise.all(
        candidates.map(probeImage)
    );

    return results.find(Boolean) || null;
}

async function loadProcessPhotos() {
    if (!galleryEl || !project) {
        return;
    }

    galleryEl.innerHTML = "";

    if (emptyEl) {
        emptyEl.hidden = true;
    }

    const paths = await Promise.all(
        Array.from(
            { length: PROCESS_PHOTO_LIMIT },
            function(_, i) {
                return findProcessImage(i + 1);
            }
        )
    );

    const processImages = paths
        .filter(Boolean)
        .map(function(src, index) {
            return {
                src: src,
                alt: project.title + " — proses " + (index + 1)
            };
        });

    processImages.forEach(function(item, index) {
        const button = document.createElement("button");

        button.className = "process-item";
        button.type = "button";
        button.setAttribute(
            "aria-label",
            "Buka foto proses " + (index + 1)
        );

        const image = document.createElement("img");

        image.src = item.src;
        image.alt = item.alt;
        image.loading = "lazy";

        button.appendChild(image);
        galleryEl.appendChild(button);

        button.addEventListener("click", function() {
            openLightbox(processImages, index);
        });
    });

    if (!processImages.length) {
        showEmptyState();
    } else {
        updateProcessArrows();
    }
}

function setupEvents() {

    if (prevButton) {
        prevButton.addEventListener("click", function() {
            galleryEl.scrollBy({
                left: -getProcessScrollAmount(),
                behavior: "smooth"
            });
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function() {
            galleryEl.scrollBy({
                left: getProcessScrollAmount(),
                behavior: "smooth"
            });
        });
    }

    if (galleryEl) {
        galleryEl.addEventListener(
            "scroll",
            updateProcessArrows,
            { passive: true }
        );
    }

    window.addEventListener(
        "resize",
        updateProcessArrows
    );

    if (closeButton) {
        closeButton.addEventListener("click", function(event) {
            event.stopPropagation();
            closeLightbox();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", function(event) {
            event.stopPropagation();

            if (lightboxIndex > 0) {
                lightboxIndex--;
                updateLightbox();
            }
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", function(event) {
            event.stopPropagation();

            if (lightboxIndex < lightboxImages.length - 1) {
                lightboxIndex++;
                updateLightbox();
            }
        });
    }

    if (lightboxEl) {
        lightboxEl.addEventListener("click", function(event) {
            if (event.target === lightboxEl) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", function(event) {

        if (
            !lightboxEl ||
            !lightboxEl.classList.contains("is-open")
        ) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
            return;
        }

        if (
            event.key === "ArrowLeft" &&
            lightboxIndex > 0
        ) {
            lightboxIndex--;
            updateLightbox();
        }

        if (
            event.key === "ArrowRight" &&
            lightboxIndex < lightboxImages.length - 1
        ) {
            lightboxIndex++;
            updateLightbox();
        }
    });
}

function initProject() {

    if (!project) {
        document.title =
            "Project Not Found | Niko Juliandarus";

        if (categoryEl) {
            categoryEl.textContent = "PROJECT";
        }

        if (titleEl) {
            titleEl.textContent = "Project Not Found";
        }

        if (coverEl) {
            coverEl.style.display = "none";
        }

        showEmptyState();
        return;
    }

    document.title =
        project.title + " | Niko Juliandarus";

    if (categoryEl) {
        categoryEl.textContent =
            project.category;
    }

    if (titleEl) {
        titleEl.textContent =
            project.title;
    }

    if (coverEl) {

        if (project.cover) {
            coverEl.src = project.cover;
            coverEl.alt = project.title;

            coverEl.addEventListener("error", function() {
                coverEl.style.display = "none";
            });

        } else {
            coverEl.style.display = "none";
        }
    }

    setupEvents();
    loadProcessPhotos();
}

initProject();
