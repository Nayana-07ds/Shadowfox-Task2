// ===============================
// WELCOME MESSAGE
// ===============================
console.log("%c🔥 Welcome to the RCB Premium Fan Hub! 🔥", "color: #c90e0e; font-size: 16px; font-weight: bold;");

// ===============================
// PRELOADER
// ===============================
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 600);
        }, 800);
    }
});

// ===============================
// MOBILE HAMBURGER MENU
// ===============================
const mobileBtn = document.getElementById("mobile-menu-btn");
const navbar = document.getElementById("navbar");

if (mobileBtn && navbar) {
    mobileBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
        const icon = mobileBtn.querySelector("i");
        if (navbar.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
}

// ===============================
// HERO SLIDER (Fade & Zoom)
// ===============================
let slideIndex = 0;
const slides = document.querySelectorAll(".hero-sliderContainer .slide");

function showSlides() {
    if (slides.length === 0) return;
    
    slides.forEach(s => s.classList.remove("active"));
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 5000); // Change slide every 5 sec
}

if (slides.length > 0) {
    showSlides();
}

// ===============================
// TYPING EFFECT (Hero Tagline)
// ===============================
const typingText = document.getElementById("hero-typing-text");
if (typingText) {
    const texts = ["Play Bold • 2026 Season", "The 12th Man Army", "Bengaluru's Pride"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.innerText = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.innerText = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, speed);
    }

    // Start typing effect after short delay
    setTimeout(typeEffect, 1500);
}

// ===============================
// SCROLL TO TOP BUTTON
// ===============================
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (scrollBtn) {
        scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    }
});

if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===============================
// REVEAL ANIMATION ON SCROLL
// ===============================
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Reveal slightly before element comes fully into view
        if (top < windowHeight - 80) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
// Trigger once on init in case elements are already in view
revealOnScroll();

// ===============================
// ANIMATED COUNTERS
// ===============================
const counters = document.querySelectorAll(".counter");

function startCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 200; // factor to divide by for increments
    
    const increment = target / speed;

    const updateCount = () => {
        count += increment;
        
        if (count < target) {
            counter.innerText = Math.ceil(count).toLocaleString();
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    updateCount();
}

function checkCounters() {
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (rect < windowHeight - 50 && !counter.started) {
            counter.started = true;
            startCounter(counter);
        }
    });
}

if (counters.length > 0) {
    window.addEventListener("scroll", checkCounters);
    window.addEventListener("load", checkCounters);
    checkCounters();
}

// ===============================
// CONTACT FORM VALIDATION
// ===============================
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.querySelector("input[name='name']").value.trim();
        const email = form.querySelector("input[name='email']").value.trim();
        const message = form.querySelector("textarea[name='message']").value.trim();

        if (!name || !email || !message) {
            alert("⚠ Please fill all fields to contact the RCB team!");
            return;
        }

        alert("✅ Message Sent! The 12th Man Army appreciates your support.");
        form.reset();
    });
}

// ===============================
// FAN ZONE POLL BUTTON ACTION
// ===============================
const pollButtons = document.querySelectorAll(".poll button");

if (pollButtons.length > 0) {
    pollButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active from all
            pollButtons.forEach(b => {
                b.style.background = "";
                b.style.color = "";
            });
            
            // Set active
            button.style.background = "var(--rcb-gold)";
            button.style.color = "var(--rcb-black)";
            
            // Add a temporary success message
            const pollContainer = button.parentElement;
            let msg = pollContainer.querySelector(".vote-msg");
            if (!msg) {
                msg = document.createElement("p");
                msg.className = "vote-msg";
                msg.style.color = "var(--rcb-gold)";
                msg.style.marginTop = "15px";
                msg.style.fontWeight = "bold";
                pollContainer.appendChild(msg);
            }
            msg.innerText = "✅ Vote recorded for: " + button.innerText;
        });
    });
}