//Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.close-btn');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');
const mobileIcon = mobileThemeToggle.querySelector('i');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
});

mobileThemeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        mobileIcon.classList.remove('fa-sun');
        mobileIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        mobileIcon.classList.remove('fa-moon');
        mobileIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && e.target !== hamburger) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Prevent closing when clicking inside mobile nav
mobileNav.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add this function to handle responsive behavior
function handleResponsive() {
    if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Call this function on window resize
window.addEventListener('resize', handleResponsive);

// Also call it once on page load to ensure correct initial state
handleResponsive();

// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('dark'); // Default to dark mode
}

// Search functionality (placeholder)
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        // Implement actual search functionality here
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Animated background shapes
function createShape(type) {
    const shape = document.createElement('div');
    shape.classList.add('shape');

    let shapeStyle = '';
    if (type === 'triangle') {
        shapeStyle = 'width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 87px solid rgba(255,255,255,0.1);';
    } else if (type === 'pentagon') {
        shapeStyle = 'width: 54px; height: 52px; background: rgba(255,255,255,0.1); clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);';
    }

    shape.style.cssText = shapeStyle;
    shape.style.left = Math.random() * window.innerWidth + 'px';
    shape.style.top = Math.random() * window.innerHeight + 'px';

    document.body.appendChild(shape);

    animateShape(shape);
}

function animateShape(shape) {
    const duration = 15000 + Math.random() * 10000;
    const xMove = Math.random() * 100 - 50;
    const yMove = Math.random() * 100 - 50;

    shape.animate([
        { transform: 'translate(0, 0) rotate(0deg)' },
        { transform: `translate(${xMove}px, ${yMove}px) rotate(360deg)` }
    ], {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}

// Create multiple shapes
for (let i = 0; i < 5; i++) {
    createShape('triangle');
    createShape('pentagon');
}