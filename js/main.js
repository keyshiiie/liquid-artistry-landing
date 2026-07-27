import { Slider } from './modules/slider.js';
import { Booking } from './modules/booking.js';
import { Navigation } from './modules/navigation.js';
import { CustomPickers } from './modules/customPickers.js';
import { CustomSelect } from './modules/customSelect.js';

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = [];
        let currentValue = '';
        let inQuotes = false;
        
        for (let char of lines[i]) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim());
        
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        result.push(obj);
    }
    return result;
}

document.addEventListener('DOMContentLoaded', async () => {
    const SHEET_URL = "https://docs.google.com/spreadsheets/d/1BNNVPh2yfbxnkxWNCzxkFxn7p4WsseD_hvXCsfvpUwc/export?format=csv";

    try {
        console.log('Загрузка данных из Google Sheets...');
        const response = await fetch(SHEET_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('CSV получен, длина:', csvText.length);
        
        const menuData = parseCSV(csvText);
        console.log('Данные после парсинга:', menuData);
        console.log('Количество позиций:', menuData.length);
        
        if (menuData.length > 0) {
            console.log('Первая позиция:', menuData[0]);
        }
        
        const sliderContainer = document.querySelector('.menu');
        if (sliderContainer) {
            new Slider(sliderContainer, menuData);
        } else {
            console.warn('Контейнер слайдера не найден');
        }
        
    } catch (error) {
        console.error('Ошибка загрузки меню:', error);
        
        const fallbackData = [
            {
                id: '1',
                category: 'Indulgent harmony',
                title: 'Symphony in Gold',
                description: '<b>Aged bourbon, honey, ginger.</b> Experience the symphony of flavors...',
                image: 'img/Indulgent-harmony.png',
                alt: 'Symphony in Gold cocktail'
            },
            {
                id: '2',
                category: 'Indulgent harmony',
                title: 'Enchanted Elixir',
                description: '<b>Berries, vodka, elderflower.</b> Let the enchantment unfold...',
                image: 'img/Enchanted-elixir.png',
                alt: 'Enchanted Elixir cocktail'
            },
            {
                id: '3',
                category: 'Brazilian twist',
                title: 'Raspberry Caipirinha',
                description: '<b>Cachaça, fresh raspberries, lime, sugar.</b> A vibrant spin on the Brazilian classic...',
                image: 'img/raspberry-caipirinha.png',
                alt: 'Raspberry Caipirinha cocktail'
            },
            {
                id: '4',
                category: 'Berry elegance',
                title: 'Blackberry Bramble',
                description: '<b>Gin, blackberry liqueur, lemon, sugar.</b> A sophisticated garden gem...',
                image: 'img/blackberry-bramble.png',
                alt: 'Blackberry Bramble cocktail'
            }
        ];
        
        const sliderContainer = document.querySelector('.menu');
        if (sliderContainer) {
            console.log('Используем резервные данные');
            new Slider(sliderContainer, fallbackData);
        }
    }

    try {
        new Booking('bookingForm');
        new Navigation();
        new CustomPickers();
        new CustomSelect();
    } catch (error) {
        console.error('Ошибка инициализации компонентов:', error);
    }
});