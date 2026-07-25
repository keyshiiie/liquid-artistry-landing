import { Slider } from './modules/slider.js';
import { Booking } from './modules/booking.js';
import { Navigation } from './modules/navigation.js';
import { CustomPickers } from './modules/customPickers.js';
import { CustomSelect } from './modules/customSelect.js';

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.menu');
    if (sliderContainer) {
        new Slider(sliderContainer);
    }
    new Booking('bookingForm');
    new Navigation();
    new CustomPickers();
    new CustomSelect();
    console.log('🍸 Liquid Maestro — loaded successfully!');
});