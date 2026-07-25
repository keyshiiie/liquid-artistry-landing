import { menuData } from '../data/menu.js';

export class Slider {
    constructor(container) {
        this.container = container;
        this.slider = container.querySelector('.slider');
        this.prevBtn = container.querySelector('.slider-btn--prev');
        this.nextBtn = container.querySelector('.slider-btn--next');
        this.dotsContainer = container.querySelector('.slider-dots');
        this.currentIndex = 0;
        this.cards = [];
        this.dots = [];
        
        this.init();
    }
    
    init() {
        this.renderCards();
        this.createDots();
        this.setupEventListeners();
        this.goTo(0);
    }
    
    renderCards() {
        const cardsHTML = menuData.map(item => `
            <div class="menu-card">
                <div class="menu-card__inner">
                    <img src="${item.image}" alt="${item.alt}" class="menu-card__img">
                    <div class="menu-card__text">
                        <span class="menu-card__category">${item.category}</span>
                        <h4 class="menu-card__title"><b>${item.title.split(' ')[0]}</b> ${item.title.split(' ').slice(1).join(' ')}</h4>
                        <p class="menu-card__description">${item.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        this.slider.innerHTML = cardsHTML;
        this.cards = this.slider.querySelectorAll('.menu-card');
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        this.cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
    }
    
    goTo(index) {
        const total = this.cards.length;
        if (index < 0) index = 0;
        if (index >= total) index = total - 1;
        
        this.currentIndex = index;
        this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
        
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === total - 1;
    }
    
    next() {
        if (this.currentIndex < this.cards.length - 1) {
            this.goTo(this.currentIndex + 1);
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.goTo(this.currentIndex - 1);
        }
    }
    
    setupEventListeners() {
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });
        
        // Touch events
        let touchStartX = 0;
        let touchEndX = 0;
        const container = this.container.querySelector('.slider-container');
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.next();
                else this.prev();
            }
        });
    }
}