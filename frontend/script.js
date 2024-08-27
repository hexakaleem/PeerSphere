//Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.close-btn');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');
const mobileIcon = mobileThemeToggle.querySelector('i');
const navItem = document.querySelectorAll('.nav-item');
let defaultActive = document.querySelector('.active');

for (let i = 0; i < navItem.length; i++) {
    navItem[i].addEventListener('click', () => {
        defaultActive.classList.remove('active');
        navItem[i].classList.add('active');
        defaultActive = navItem[i];
    });
}

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


// *JS For Featured Resources Section.
const frFeaturedResources = [
    {
        title: "Introduction to Algorithms",
        description: "Comprehensive notes on fundamental algorithms and data structures.",
        author: "John Doe",
        rating: 4.8,
        type: "Notes",
        icon: "fa-book"
    },
    {
        title: "Advanced JavaScript",
        description: "In-depth guide to modern JavaScript features and best practices.",
        author: "Jane Smith",
        rating: 4.9,
        type: "Cheat Sheet",
        icon: "fa-code"
    },
    {
        title: "Database Management Systems",
        description: "Comprehensive study material for DBMS concepts and SQL.",
        author: "Alex Johnson",
        rating: 4.7,
        type: "Past Paper",
        icon: "fa-database"
    },
    {
        title: "Machine Learning Basics",
        description: "Introductory notes on machine learning algorithms and concepts.",
        author: "Emily Brown",
        rating: 4.6,
        type: "Flashcards",
        icon: "fa-robot"
    },
    {
        title: "Web Development Fundamentals",
        description: "Essential guide to HTML, CSS, and JavaScript for beginners.",
        author: "Michael Lee",
        rating: 4.8,
        type: "Notes",
        icon: "fa-laptop-code"
    },
    {
        title: "Data Structures Practice",
        description: "Collection of practice problems for common data structures.",
        author: "Sarah Wilson",
        rating: 4.9,
        type: "Past Paper",
        icon: "fa-sitemap"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const resourcesContainer = document.querySelector('.fr-resources-container');

    frFeaturedResources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.classList.add('fr-resource-card');
        resourceCard.innerHTML = `
            <div class="fr-resource-type">${resource.type}</div>
            <div class="fr-resource-icon"><i class="fas ${resource.icon}"></i></div>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <div class="fr-resource-meta">
                <span><i class="fas fa-user"></i> ${resource.author}</span>
                <span><i class="fas fa-star"></i> ${resource.rating}</span>
            </div>
            <a href="#" class="fr-resource-link">View Resource</a>
        `;
        resourcesContainer.appendChild(resourceCard);
    });

    const resourceCards = document.querySelectorAll('.fr-resource-card');

    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Scroll prompt functionality
    const scrollPrompt = document.querySelector('.scroll-prompt');
    const featuredResourcesSection = document.querySelector('.fr-section');

    scrollPrompt.addEventListener('click', () => {
        featuredResourcesSection.scrollIntoView({ behavior: 'smooth' });
    });
});




// *Subjects Overview JS
const subjects = [
    {
        title: "Data Structures & Algorithms",
        shortTitle: "DSA",
        icon: "fa-sitemap",
        description: "Master the fundamentals of efficient data organization and problem-solving techniques."
    },
    {
        title: "Object Oriented Programming",
        shortTitle: "OOP",
        icon: "fa-cubes",
        description: "Learn to design and implement software using object-oriented principles and patterns."
    },
    {
        title: "Discrete Structures",
        shortTitle: "DS",
        icon: "fa-project-diagram",
        description: "Explore mathematical structures for representing discrete objects and relationships."
    },
    {
        title: "Databases",
        shortTitle: "DB",
        icon: "fa-database",
        description: "Understand the principles of storing, retrieving, and managing data efficiently."
    },
    {
        title: "Software Engineering Concepts",
        shortTitle: "SEC",
        icon: "fa-cogs",
        description: "Study methodologies and practices for developing large-scale software systems."
    },
    {
        title: "Computer Networks",
        shortTitle: "CN",
        icon: "fa-network-wired",
        description: "Dive into the principles and protocols that enable communication between computers."
    }
];

function populateSubjectsOverview() {
    const subjectsGrid = document.querySelector('.subjects-grid');

    subjects.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.classList.add('subject-card');
        subjectCard.innerHTML = `
            <div class="subject-icon"><i class="fas ${subject.icon}"></i></div>
            <h3>${subject.title}</h3>
            <span class="subject-short-title">${subject.shortTitle}</span>
            <p>${subject.description}</p>
        `;
        subjectsGrid.appendChild(subjectCard);
    });

    // Add floating particles
    const subjectsOverview = document.querySelector('.subjects-overview');
    for (let i = 0; i < 20; i++) {
        createParticle(subjectsOverview);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    container.appendChild(particle);

    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = 15000 + Math.random() * 10000;
    const xMove = Math.random() * 100 - 50;
    const yMove = Math.random() * 100 - 50;

    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${xMove}px, ${yMove}px)` }
    ], {
        duration: duration,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateSubjectsOverview();
});




// *Top Contributors Data
const topContributors = [
    {
        rank: 1,
        name: "Sarah Johnson",
        username: "@sarahcodes",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        contributions: 127,
        likes: 1840,
        rating: 4.9,
        badges: ["🏆", "⭐", "📚"]
    },
    {
        rank: 2,
        name: "Michael Chen",
        username: "@mikedev",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        contributions: 115,
        likes: 1620,
        rating: 4.8,
        badges: ["🥈", "💡", "🔧"]
    },
    {
        rank: 3,
        name: "Emily Rodriguez",
        username: "@emilytech",
        avatar: "https://randomuser.me/api/portraits/women/89.jpg",
        contributions: 98,
        likes: 1450,
        rating: 4.7,
        badges: ["🥉", "🚀", "💻"]
    },
    {
        rank: 4,
        name: "Alex Thompson",
        username: "@alexcodes",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        contributions: 89,
        likes: 1320,
        rating: 4.6,
        badges: ["🌟", "💻", "🔍"]
    },
    {
        rank: 5,
        name: "Sophia Lee",
        username: "@sophiadev",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        contributions: 76,
        likes: 1150,
        rating: 4.5,
        badges: ["🚀", "📚", "🎨"]
    },
    {
        rank: 6,
        name: "David Garcia",
        username: "@daveprog",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
        contributions: 68,
        likes: 980,
        rating: 4.4,
        badges: ["💡", "🔧", "🌐"]
    },
    {
        rank: 7,
        name: "Emma Wilson",
        username: "@emmatech",
        avatar: "https://randomuser.me/api/portraits/women/17.jpg",
        contributions: 61,
        likes: 890,
        rating: 4.3,
        badges: ["📱", "🎯", "🔬"]
    },
    {
        rank: 8,
        name: "Ryan Patel",
        username: "@ryandev",
        avatar: "https://randomuser.me/api/portraits/men/72.jpg",
        contributions: 55,
        likes: 820,
        rating: 4.2,
        badges: ["🖥️", "🏆", "🔑"]
    },
    {
        rank: 9,
        name: "Olivia Brown",
        username: "@oliviacoder",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        contributions: 49,
        likes: 750,
        rating: 4.1,
        badges: ["📊", "🎓", "🌈"]
    }
];

function populateTopContributors() {
    const leaderboard = document.querySelector('.contributors-leaderboard');

    topContributors.forEach(contributor => {
        const contributorCard = document.createElement('div');
        contributorCard.classList.add('contributor-card');
        contributorCard.innerHTML = `
            <span class="contributor-rank">#${contributor.rank}</span>
            <img src="${contributor.avatar}" alt="${contributor.name}" class="contributor-avatar">
            <h3 class="contributor-name">${contributor.name}</h3>
            <p class="contributor-username">${contributor.username}</p>
            <div class="contributor-stats">
                <div class="stat">
                    <div class="stat-value">${contributor.contributions}</div>
                    <div class="stat-label">Contributions</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${contributor.likes}</div>
                    <div class="stat-label">Likes</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${contributor.rating}</div>
                    <div class="stat-label">Rating</div>
                </div>
            </div>
            <div class="contributor-badges">
                ${contributor.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
            </div>
            <div class="contributor-actions">
                <button class="action-btn view-profile-btn">View Profile</button>
                <button class="action-btn follow-btn">Follow</button>
            </div>
        `;
        leaderboard.appendChild(contributorCard);
    });
}

function initializeCarousel() {
    const carousel = document.querySelector('.contributors-leaderboard');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const cardWidth = 350 + 32; // card width + gap
    // If screen size is greater than 768px, the visible cards are3 and if it's less than 768 they are two and 1 for less than 480px.
    const visibleCards = window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 1 : 0;

    let currentIndex = 0;

    function updateArrows() {
        leftArrow.style.display = currentIndex > 0 ? 'flex' : 'none';
        rightArrow.style.display = currentIndex < topContributors.length - visibleCards ? 'flex' : 'none';
    }

    function scrollCarousel(direction) {
        if (direction === 'left' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'right' && currentIndex < topContributors.length - visibleCards) {
            currentIndex++;
        }
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateArrows();
    }

    leftArrow.addEventListener('click', () => scrollCarousel('left'));
    rightArrow.addEventListener('click', () => scrollCarousel('right'));

    updateArrows();
}

document.addEventListener('DOMContentLoaded', () => {
    populateTopContributors();
    initializeCarousel();
});