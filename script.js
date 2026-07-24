document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.slider-btn--prev');
    const nextBtn = document.querySelector('.slider-btn--next');
    const cards = document.querySelectorAll('.menu-card');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    const totalCards = cards.length;
    
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goTo(index) {
        if (index < 0) index = 0;
        if (index >= totalCards) index = totalCards - 1;
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalCards - 1;
    }
    
    function next() {
        if (currentIndex < totalCards - 1) {
            goTo(currentIndex + 1);
        }
    }
    
    function prev() {
        if (currentIndex > 0) {
            goTo(currentIndex - 1);
        }
    }
    
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const container = document.querySelector('.slider-container');
    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
    });
    
    goTo(0);
});

