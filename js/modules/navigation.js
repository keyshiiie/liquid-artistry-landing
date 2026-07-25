export class Navigation {
    constructor() {
        this.setupSmoothScroll();
        this.setupBurgerMenu();
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    setupBurgerMenu() {
        const burger = document.querySelector('.burger-menu');
        if (burger) {
            burger.addEventListener('click', () => {
                // Add mobile menu toggle logic here when needed
                console.log('Menu toggled');
            });
        }
    }
}