import { Slider } from './modules/slider.js';
import { Booking } from './modules/booking.js';
import { Navigation } from './modules/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    const sliderContainer = document.querySelector('.menu');
    if (sliderContainer) {
        new Slider(sliderContainer);
    }
    
    // Initialize booking form
    new Booking('bookingForm');
    
    // Initialize navigation
    new Navigation();
    
    console.log('🍸 Liquid Maestro — loaded successfully!');
});