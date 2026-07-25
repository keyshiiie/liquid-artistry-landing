export class Booking {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!this.validate(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.form.querySelector('.booking__submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            await this.sendToTelegram(data);
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            console.error('Booking error:', error);
            this.showError();
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    validate(data) {
        // Basic validation
        if (!data.name || data.name.length < 2) {
            alert('Please enter your name');
            return false;
        }
        if (!data.email || !data.email.includes('@')) {
            alert('Please enter a valid email');
            return false;
        }
        if (!data.phone || data.phone.length < 5) {
            alert('Please enter a valid phone number');
            return false;
        }
        if (!data.people) {
            alert('Please select number of people');
            return false;
        }
        if (!data.date || !data.time) {
            alert('Please select date and time');
            return false;
        }
        return true;
    }
    
    async sendToTelegram(data) {
        const token = 'YOUR_BOT_TOKEN'; // Replace with your token
        const chatId = 'YOUR_CHAT_ID'; // Replace with your chat ID
        
        const message = `
🔔 New Booking!
━━━━━━━━━━━━━━━━━
👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
👥 Guests: ${data.people}
📅 Date: ${data.date}
⏰ Time: ${data.time}
━━━━━━━━━━━━━━━━━
        `;
        
        // For now, just log and show success
        console.log('Booking data:', data);
        
        // Uncomment when you have Telegram bot set up
        /*
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message })
        });
        
        if (!response.ok) {
            throw new Error('Failed to send booking');
        }
        */
    }
    
    showSuccess() {
        alert('✅ Booking submitted successfully! We will contact you shortly.');
    }
    
    showError() {
        alert('❌ Something went wrong. Please try again or call us directly.');
    }
}