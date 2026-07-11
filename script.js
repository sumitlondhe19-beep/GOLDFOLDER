// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    const status = document.querySelector('.form-status');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (name === '' || email === '' || message === '') {
            if (status) {
                status.textContent = 'Please fill in all fields before sending.';
                status.className = 'form-status';
            }
            return;
        }

        if (status) {
            status.textContent = `Thank you, ${name}! We will contact you at ${email} soon.`;
            status.className = 'form-status success';
        }

        this.reset();
    });
}

// ===== ADD SCROLL ANIMATION TO CARDS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.product-card, .highlight-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ===== ACTIVE STATE FOR NAV LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PRODUCT CARD INTERACTION =====
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('click', function() {
        const productName = this.querySelector('.product-name').textContent;
        const productPrice = this.querySelector('.product-price').textContent;
        console.log(`Selected: ${productName} - ${productPrice}`);
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.15)';
    }
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.product-image img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        imageObserver.observe(img);
    });
}

// ===== STATS COUNTER =====
const stats = document.querySelectorAll('[data-count]');
if (stats.length) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = Number(element.getAttribute('data-count'));
                const duration = 900;
                const startTime = performance.now();

                const tick = (time) => {
                    const progress = Math.min((time - startTime) / duration, 1);
                    const value = Math.floor(progress * target);
                    element.textContent = value.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        element.textContent = target.toLocaleString();
                    }
                };

                requestAnimationFrame(tick);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.6 });

    stats.forEach(stat => statsObserver.observe(stat));
}

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== PARALLAX EFFECT FOR HERO =====
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c✨ Welcome to Luxe Gold ✨', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cPremium Gold Jewellery Showcase', 'color: #FFD700; font-size: 14px;');
console.log('%cCrafting Elegance Since 1995', 'color: #f5f5f5; font-size: 12px;');
