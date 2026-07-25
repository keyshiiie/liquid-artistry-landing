// js/modules/slider.js

export class Slider {
    constructor(container, data = null) {
        this.container = container;
        this.slider = container.querySelector('.slider');
        this.prevBtn = container.querySelector('.slider-btn--prev');
        this.nextBtn = container.querySelector('.slider-btn--next');
        this.dotsContainer = container.querySelector('.slider-dots');
        this.currentIndex = 0;
        this.cards = [];
        this.dots = [];
        this.menuData = data || [];
        
        this.init();
    }
    
    init() {
        this.renderCards();
        this.createDots();
        this.setupEventListeners();
        this.goTo(0);
    }
    
    renderCards() {
        const data = this.menuData || [];
        
        if (data.length === 0) {
            this.slider.innerHTML = `
                <div class="menu-card">
                    <div class="menu-card__inner">
                        <div class="menu-card__text" style="padding: 40px; text-align: center; width: 100%;">
                            <p style="color: rgba(255,255,255,0.6); font-family: 'Montserrat', serif;">No menu items available. Please check back later.</p>
                        </div>
                    </div>
                </div>
            `;
            this.cards = this.slider.querySelectorAll('.menu-card');
            return;
        }
        
        const cardsHTML = data.map(item => {
            let titleParts = item.title ? item.title.split(' ') : ['', ''];
            let firstWord = titleParts[0] || '';
            let restWords = titleParts.slice(1).join(' ') || '';
            
            return `
                <div class="menu-card">
                    <div class="menu-card__inner">
                        <img src="${item.image || 'img/placeholder.png'}" alt="${item.alt || item.title || 'Cocktail'}" class="menu-card__img">
                        <div class="menu-card__text">
                            <span class="menu-card__category">${item.category || 'Cocktail'}</span>
                            <h4 class="menu-card__title"><b>${firstWord}</b> ${restWords}</h4>
                            <p class="menu-card__description">${item.description || ''}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        this.slider.innerHTML = cardsHTML;
        this.cards = this.slider.querySelectorAll('.menu-card');
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        const total = this.cards.length;
        
        if (total === 0) return;
        
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
    }
    
    goTo(index) {
        const total = this.cards.length;
        if (total === 0) return;
        
        if (index < 0) index = 0;
        if (index >= total) index = total - 1;
        
        this.currentIndex = index;
        this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
        
        if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
        if (this.nextBtn) this.nextBtn.disabled = this.currentIndex === total - 1;
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
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        const container = this.container.querySelector('.slider-container');
        
        if (container) {
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
    
    updateData(newData) {
        this.menuData = newData || [];
        this.renderCards();
        this.createDots();
        this.goTo(0);
    }
}