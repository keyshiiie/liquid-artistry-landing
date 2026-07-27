export class CustomSelect {
    constructor() {
        this.initSelect();
    }
    
    initSelect() {
        const wrapper = document.querySelector('.custom-select-wrapper');
        if (!wrapper) return;
        
        const display = wrapper.querySelector('.custom-select-input');
        const dropdown = wrapper.querySelector('.custom-select-dropdown');
        const options = wrapper.querySelectorAll('.select-option');
        
        display.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.style.display === 'block';
            dropdown.style.display = isOpen ? 'none' : 'block';
            display.classList.toggle('active', !isOpen);
        });
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                
                option.classList.add('selected');
                
                const value = option.dataset.value;
                const text = option.textContent;
                display.value = text;
                display.classList.add('valid');
                
                display.dataset.value = value;
                
                dropdown.style.display = 'none';
                display.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.style.display = 'none';
                display.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
                display.classList.remove('active');
            }
        });
    }
}