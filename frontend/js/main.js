/* ==========================================
   Vertex Institute of Technology
   main.js
========================================== */

// ===============================
// Mobile Navigation
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// ===============================
// Close Menu After Clicking Link
// ===============================

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});

// ===============================
// Scroll To Top Button
// ===============================

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (scrollBtn) {

        if (window.scrollY > 300) {

            scrollBtn.style.display = "block";

        } else {

            scrollBtn.style.display = "none";

        }

    }

});

if (scrollBtn) {

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// ===============================
// Sticky Navbar Shadow
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (header) {

        if (window.scrollY > 50) {

            header.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";

        } else {

            header.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";

        }

    }

});

// ===============================
// Active Navigation
// ===============================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    if (
        href === currentPage ||
        (currentPage === "" && href === "index.html")
    ) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});

// ===============================
// Simple Counter Animation
// ===============================

const counters = document.querySelectorAll(".stat-card h2");

const speed = 100;

const animateCounter = (counter) => {

    const target = parseInt(counter.innerText.replace(/\D/g, ""));

    let count = 0;

    const increment = Math.ceil(target / speed);

    const update = () => {

        if (count < target) {

            count += increment;

            if (count > target) {

                count = target;

            }

            if (counter.innerText.includes("%")) {

                counter.innerText = count + "%";

            } else if (counter.innerText.includes("+")) {

                counter.innerText = count + "+";

            } else {

                counter.innerText = count;

            }

            requestAnimationFrame(update);

        }

    };

    update();

};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    observer.observe(counter);

});

// ===============================
// Welcome Message
// ===============================

console.log("Welcome to Vertex Institute of Technology");