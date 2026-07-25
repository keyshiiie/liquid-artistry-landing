// js/modules/customSelect.js

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
        
        // Toggle dropdown
        display.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.style.display === 'block';
            dropdown.style.display = isOpen ? 'none' : 'block';
            display.classList.toggle('active', !isOpen);
        });
        
        // Select option
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Убираем выделение со всех опций
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Выделяем выбранную
                option.classList.add('selected');
                
                // Обновляем поле ввода
                const value = option.dataset.value;
                const text = option.textContent;
                display.value = text;
                display.classList.add('valid');
                
                // Сохраняем значение для отправки
                display.dataset.value = value;
                
                // Закрываем дропдаун
                dropdown.style.display = 'none';
                display.classList.remove('active');
            });
        });
        
        // Закрываем при клике вне
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.style.display = 'none';
                display.classList.remove('active');
            }
        });
        
        // Закрываем по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
                display.classList.remove('active');
            }
        });
    }
}