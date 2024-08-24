document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const themeToggle = document.getElementById('theme-switch');
    const body = document.body;
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    const searchSuggestions = document.querySelector('.search-suggestions');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Theme toggle
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-theme');
        updateParticleBackground();
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Check for saved theme preference or use dark theme as default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-theme');
        themeToggle.checked = false;
    }

    // Search input functionality
    searchInput.addEventListener('focus', () => {
        searchSuggestions.style.display = 'block';
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchSuggestions.style.display = 'none';
        }, 200);
    });

    // Mock search suggestions
    const suggestions = ['Data Structures', 'Object-Oriented Programming', 'Machine Learning', 'Web Development', 'Algorithms', 'Database Management', 'Artificial Intelligence'];

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();
        const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(value));
        displaySuggestions(filteredSuggestions);
    });

    function displaySuggestions(filteredSuggestions) {
        searchSuggestions.innerHTML = '';
        filteredSuggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            li.addEventListener('click', () => {
                searchInput.value = suggestion;
                searchSuggestions.style.display = 'none';
            });
            searchSuggestions.appendChild(li);
        });
    }

    // Particle background
    let particleBackground;

    function initParticleBackground() {
        particleBackground = VANTA.NET({
            el: "#particle-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6C63FF,
            backgroundColor: 0xF4F7F6,
            points: 10.00,
            maxDistance: 20.00,
            spacing: 15.00
        });
    }

    function updateParticleBackground() {
        if (particleBackground) {
            particleBackground.destroy();
        }
        initParticleBackground();
        if (body.classList.contains('dark-theme')) {
            particleBackground.setOptions({
                color: 0x6C63FF,
                backgroundColor: 0x1A1A2E
            });
        } else {
            particleBackground.setOptions({
                color: 0x6C63FF,
                backgroundColor: 0xF4F7F6
            });
        }
    }

    initParticleBackground();
    updateParticleBackground();

    // 3D tilt effect for cards
    const cards = document.querySelectorAll('.tag');
    cards.forEach(card => {
        card.addEventListener('mousemove', tiltCard);
        card.addEventListener('mouseleave', resetTilt);
    });

    function tiltCard(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = (mouseY / cardRect.height) * 20;
        const rotateY = -(mouseX / cardRect.width) * 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    function resetTilt() {
        this.style.transform = '';
    }

    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
});