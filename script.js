// ============================================
// GLOWTIC SOLUTIONS - SCRIPT.JS
// Interactive Features & Navigation
// ============================================

// ============================================
// PAGE NAVIGATION
// ============================================

// Logo click to go home
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('#home');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        if (targetSection) {
            targetSection.classList.add('active');
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
            // Ensure navbar is visible
            ensureNavbar();
        }
        
        // Close mobile menu if open
        closeMobileMenu();
    });
});

// Set home as active on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('a[href="#home"]').classList.add('active');
    document.querySelector('#home').classList.add('active');
    window.scrollTo(0, 0);
    ensureNavbar();
});

// Function to ensure navbar is visible
function ensureNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'flex';
        navbar.style.visibility = 'visible';
        navbar.style.zIndex = '9999';
    }
}

// ============================================
// SCROLL TO SECTION FUNCTION
// ============================================

function scrollToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);
    
    if (targetSection) {
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        const correspondingLink = document.querySelector(`a[href="${sectionId}"]`);
        if (correspondingLink) {
            correspondingLink.classList.add('active');
        }
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        targetSection.classList.add('active');
        
        // Scroll to top immediately
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
        
        // Ensure navbar is visible
        ensureNavbar();
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
    if (window.innerWidth > 768) {
        // On desktop, nav-menu should always be flex
        if (navMenu) {
            navMenu.style.display = 'flex';
        }
        return;
    }

    // Mobile toggle
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = 'white';
        navMenu.style.padding = '20px';
        navMenu.style.gap = '15px';
        navMenu.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        navMenu.style.zIndex = '999';
        navMenu.style.minWidth = '150px';
    }
}

function closeMobileMenu() {
    if (navMenu && window.innerWidth <= 768) {
        navMenu.style.display = 'none';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        closeMobileMenu();
    }
});

// Handle window resize to ensure nav-menu is visible on desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'static';
        navMenu.style.flexDirection = 'row';
        navMenu.style.backgroundColor = 'transparent';
        navMenu.style.padding = '0';
        navMenu.style.gap = '40px';
        navMenu.style.boxShadow = 'none';
        navMenu.style.minWidth = 'auto';
        navMenu.style.marginLeft = 'auto';
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Prepare mailto link
        const subject = `New Contact Request from ${name}`;
        const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service Interested In: ${service || 'Not specified'}

Message:
${message}
        `.trim();
        
        // Encode mailto link
        const mailtoLink = `mailto:glowticsolutions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you shortly.', 'success');
        
        // Open email client (for demo purposes)
        // window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        
        // Optional: Log the data (for testing)
        console.log({
            name,
            email,
            phone,
            service,
            message,
            timestamp: new Date().toISOString()
        });
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// SMOOTH SCROLL BEHAVIOR FOR INTERNAL LINKS
// ============================================

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const href = link.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            scrollToSection(href);
        }
    }
});

// ============================================
// NAVIGATION HIGHLIGHT ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and elements for animation
document.querySelectorAll('.service-card-preview, .why-item, .value-card, .service-full-card, .info-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Alt + key shortcuts for page navigation
    if (e.altKey) {
        switch(e.key.toLowerCase()) {
            case 'h':
                scrollToSection('#home');
                break;
            case 'a':
                scrollToSection('#about');
                break;
            case 's':
                scrollToSection('#services');
                break;
            case 'c':
                scrollToSection('#contact');
                break;
        }
    }
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SERVICE CARDS STATS COUNTER
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c🌟 Welcome to Glowtic Solutions! 🌟', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cYour Digital Marketing Partner', 'font-size: 14px; color: #ec4899;');
console.log('%cContact: glowticsolutions@gmail.com | Phone: +91 96775 91607', 'font-size: 12px; color: #6b7280;');
