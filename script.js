// script.js - JavaScript for Delicious Bites Restaurant Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initMobileMenu();
    initMenuFilters();
    initScrollAnimations();
    initActiveNavigation();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Mobile menu toggle functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('menu-toggle');

    if (navLinks && menuToggle) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Menu filtering functionality
function initMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.category');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            menuCategories.forEach(category => {
                if (filterValue === 'all' || category.classList.contains(filterValue)) {
                    category.style.display = 'block';
                    // Add fade-in animation
                    category.style.opacity = '0';
                    setTimeout(() => {
                        category.style.opacity = '1';
                    }, 100);
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// Scroll animations for sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;

            if (pageYOffset >= sectionTop - headerHeight - 50) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Utility function for animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .category, .info-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    });

    elements.forEach(element => {
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations on load
animateOnScroll();

// Add loading animation for hero section
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero .container');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Form validation for contact (if we add a contact form later)
function validateContactForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    let isValid = true;

    // Simple validation
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        clearError(name);
    }

    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(email);
    }

    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else {
        clearError(message);
    }

    return isValid;
}

function showError(element, message) {
    const errorElement = element.parentElement.querySelector('.error-message') ||
                        document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';

    if (!element.parentElement.querySelector('.error-message')) {
        element.parentElement.appendChild(errorElement);
    }

    element.style.borderColor = '#e74c3c';
}

function clearError(element) {
    const errorElement = element.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    element.style.borderColor = '#ddd';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}