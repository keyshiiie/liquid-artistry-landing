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
        const overlay = document.getElementById('burgerOverlay');
        const links = document.querySelectorAll('.burger-nav__link');
        
        if (!burger || !overlay) return;
        
        // Открытие/закрытие по клику на бургер
        burger.addEventListener('click', () => {
            const isActive = overlay.classList.contains('active');
            if (isActive) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        });
        
        // Закрытие по клику на ссылку
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Закрытие по клику на оверлей (только на пустое место)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeMenu();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }
    
    openMenu() {
        const overlay = document.getElementById('burgerOverlay');
        const burger = document.querySelector('.burger-menu');
        if (!overlay) return;
        
        overlay.classList.add('active');
        burger.classList.add('active');
        document.body.classList.add('no-scroll');
    }
    
    closeMenu() {
        const overlay = document.getElementById('burgerOverlay');
        const burger = document.querySelector('.burger-menu');
        if (!overlay) return;
        
        overlay.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}