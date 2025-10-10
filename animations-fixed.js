// Animation system using Motion Dev library
// Optimized for performance and stability

document.addEventListener('DOMContentLoaded', function() {
    // Wait for Motion library to be available
    if (typeof Motion === 'undefined') {
        console.warn('Motion library not loaded, animations disabled');
        return;
    }

    const { inView, animate } = Motion;

    // Initialize scroll-based animations with proper margins
    function initScrollAnimations() {
        // Timeline items - slide animations
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';

            inView(item, () => {
                animate(item, {
                    opacity: 1,
                    transform: 'translateX(0px)'
                }, {
                    duration: 0.6,
                    easing: [0.25, 0.46, 0.45, 0.94]
                });
            }, { margin: "0px 0px -100px 0px" });
        });

        // Counter animations for stats
        const counterElements = document.querySelectorAll('.counter[data-target]');
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;

            inView(counter, () => {
                animate(
                    (progress) => {
                        counter.textContent = Math.round(progress * target).toString();
                    },
                    { duration: 2, easing: [0.25, 0.46, 0.45, 0.94] }
                );
            }, { margin: "0px 0px -50px 0px" });
        });

        // Fade in animations for cards and sections
        const fadeElements = document.querySelectorAll('.card, .purpose-card, .service-card, .pillar-card, .promise-card');
        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            inView(element, () => {
                animate(element, {
                    opacity: 1,
                    transform: 'translateY(0px)'
                }, {
                    duration: 0.5,
                    easing: [0.25, 0.46, 0.45, 0.94]
                });
            }, { margin: "0px 0px -50px 0px" });
        });

        // Scale animations for portfolio items (if they exist)
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';

            inView(item, () => {
                animate(item, {
                    opacity: 1,
                    transform: 'scale(1)'
                }, {
                    duration: 0.4,
                    easing: [0.25, 0.46, 0.45, 0.94]
                });
            }, { margin: "0px 0px -50px 0px" });
        });
    }

    // Year countdown animation
    function initYearCountdown() {
        const yearElement = document.querySelector('.year-counter');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            const startYear = 1989;
            const yearsInBusiness = currentYear - startYear;

            inView(yearElement, () => {
                animate(
                    (progress) => {
                        const year = Math.round(startYear + (progress * yearsInBusiness));
                        yearElement.textContent = year.toString();
                    },
                    { duration: 2, easing: [0.25, 0.46, 0.45, 0.94] }
                );
            }, { margin: "0px 0px -50px 0px" });
        }
    }

    // Initialize animations after a short delay to ensure DOM is ready
    setTimeout(() => {
        initScrollAnimations();
        initYearCountdown();
    }, 100);
});