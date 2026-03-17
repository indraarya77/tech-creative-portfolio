// Preloader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        
        // GSAP Hero Animations
        gsap.from('.hero-content h1', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });
        gsap.from('.hero-content p', { duration: 1, y: 30, opacity: 0, ease: 'power3.out', delay: 0.3 });
        gsap.from('.hero-btns', { duration: 1, y: 20, opacity: 0, ease: 'power3.out', delay: 0.6 });
    }, 500);
});

// Initialize AOS (Scroll Animations)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Particles.js Init
particlesJS("particles-js", {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#C08552" }, // <--- UBAH BARIS INI
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#C08552", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } } }
    },
    retina_detect: true
});

// Sticky Navbar & Back to Top behavior
const navbar = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
        backToTop.classList.remove('d-none');
    } else {
        backToTop.classList.add('d-none');
    }
});

// Back to Top Click
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                // Trigger reflow for animation
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
        
        // Re-trigger AOS on layout change
        setTimeout(() => AOS.refresh(), 300);
    });
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

window.openLightbox = function(src) {
    lightboxImg.src = src;
    lightbox.classList.remove('d-none');
    lightbox.classList.add('d-flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

window.closeLightbox = function() {
    lightbox.classList.add('d-none');
    lightbox.classList.remove('d-flex');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close lightbox on click outside image
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) { closeLightbox(); }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (htmlTag.getAttribute('data-theme') === 'dark') {
        htmlTag.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        htmlTag.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

// =========================================
// AUTO-CLOSE MOBILE NAVBAR SAAT LINK DIKLIK
// =========================================
const navLinks = document.querySelectorAll('.nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // Cek apakah menu mobile sedang dalam keadaan terbuka (memiliki class 'show')
        if (navbarCollapse.classList.contains('show')) {
            // Jika terbuka, simulasikan klik pada tombol hamburger untuk menutupnya
            navbarToggler.click();
        }
    });
});