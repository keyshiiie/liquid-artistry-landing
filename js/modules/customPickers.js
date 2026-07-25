// js/modules/customPickers.js

export class CustomPickers {
    constructor() {
        this.initDatePicker();
        this.initTimePicker();
    }
    
    initDatePicker() {
        const dateWrapper = document.querySelector('.custom-date-wrapper');
        const dateInput = dateWrapper.querySelector('.booking__input');
        const datePicker = dateWrapper.querySelector('.custom-date-picker');
        const daysContainer = datePicker.querySelector('.picker-days');
        const monthYearDisplay = datePicker.querySelector('.picker-month-year');
        
        let currentDate = new Date();
        let selectedDate = null;
        
        // Toggle picker
        dateInput.addEventListener('click', () => {
            datePicker.style.display = datePicker.style.display === 'none' ? 'block' : 'none';
            if (datePicker.style.display === 'block') {
                this.renderCalendar(currentDate, daysContainer, monthYearDisplay, selectedDate);
            }
        });
        
        // Close picker on outside click
        document.addEventListener('click', (e) => {
            if (!dateWrapper.contains(e.target)) {
                datePicker.style.display = 'none';
            }
        });
        
        // Navigation
        datePicker.querySelector('[data-action="prev-month"]').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            this.renderCalendar(currentDate, daysContainer, monthYearDisplay, selectedDate);
        });
        
        datePicker.querySelector('[data-action="next-month"]').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            this.renderCalendar(currentDate, daysContainer, monthYearDisplay, selectedDate);
        });
        
        // Day selection (delegation)
        daysContainer.addEventListener('click', (e) => {
            const day = e.target.closest('.picker-day');
            if (!day || day.classList.contains('other-month')) return;
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const dayNum = parseInt(day.textContent);
            
            selectedDate = new Date(year, month, dayNum);
            dateInput.value = this.formatDate(selectedDate);
            dateInput.classList.add('valid');
            datePicker.style.display = 'none';
            
            this.renderCalendar(currentDate, daysContainer, monthYearDisplay, selectedDate);
        });
    }
    
    renderCalendar(date, container, titleDisplay, selected) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        titleDisplay.textContent = `${this.getMonthName(month)} ${year}`;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay() || 7; // Monday first
        
        let html = '';
        
        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i > 0; i--) {
            const day = prevMonthLastDay - i + 1;
            html += `<div class="picker-day other-month">${day}</div>`;
        }
        
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const isSelected = selected && 
                selected.getDate() === i && 
                selected.getMonth() === month && 
                selected.getFullYear() === year;
            
            html += `<div class="picker-day ${isSelected ? 'selected' : ''}">${i}</div>`;
        }
        
        container.innerHTML = html;
    }
    
    initTimePicker() {
        const timeWrapper = document.querySelector('.custom-time-wrapper');
        const timeInput = timeWrapper.querySelector('.booking__input');
        const timePicker = timeWrapper.querySelector('.custom-time-picker');
        const options = timePicker.querySelectorAll('.time-option');
        
        // Toggle picker
        timeInput.addEventListener('click', () => {
            timePicker.style.display = timePicker.style.display === 'none' ? 'block' : 'none';
        });
        
        // Close picker on outside click
        document.addEventListener('click', (e) => {
            if (!timeWrapper.contains(e.target)) {
                timePicker.style.display = 'none';
            }
        });
        
        // Time selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                timeInput.value = option.textContent;
                timeInput.classList.add('valid');
                timePicker.style.display = 'none';
            });
        });
    }
    
    getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }
    
    formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
}