// ================ NOTIFICATION MANAGER ================
class NotificationManager {
    constructor() {
        this.overlay = document.getElementById('notification-overlay');
        this.confirmCallback = null;
    }

    // Show Alert Notification
    showAlert(message) {
        const modal = document.getElementById('alert-modal');
        document.getElementById('alert-message').textContent = message;
        
        this.overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        
        // Auto-focus OK button
        setTimeout(() => {
            modal.querySelector('button').focus();
        }, 100);
    }

    // Close Alert
    closeAlert() {
        const modal = document.getElementById('alert-modal');
        modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
    }

    // Show Confirm Notification (returns Promise)
    showConfirm(message) {
        return new Promise((resolve) => {
            this.confirmCallback = resolve;
            const modal = document.getElementById('confirm-modal');
            document.getElementById('confirm-message').textContent = message;
            
            this.overlay.classList.remove('hidden');
            modal.classList.remove('hidden');
            
            // Auto-focus Yes button
            setTimeout(() => {
                modal.querySelector('button').focus();
            }, 100);
        });
    }

    // Confirm Yes
    confirmYes() {
        const modal = document.getElementById('confirm-modal');
        modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
        if (this.confirmCallback) {
            this.confirmCallback(true);
            this.confirmCallback = null;
        }
    }

    // Confirm No
    confirmNo() {
        const modal = document.getElementById('confirm-modal');
        modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
        if (this.confirmCallback) {
            this.confirmCallback(false);
            this.confirmCallback = null;
        }
    }

    // Show Success Notification (auto-closes after 3 seconds)
    showSuccess(message) {
        const modal = document.getElementById('success-modal');
        document.getElementById('success-message').textContent = message;
        
        this.overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            this.closeSuccess();
        }, 3000);
    }

    // Close Success
    closeSuccess() {
        const modal = document.getElementById('success-modal');
        modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
    }

    // Show Error Notification
    showError(message) {
        const modal = document.getElementById('error-modal');
        document.getElementById('error-message').textContent = message;
        
        this.overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
        
        // Auto-focus OK button
        setTimeout(() => {
            modal.querySelector('button').focus();
        }, 100);
    }

    // Close Error
    closeError() {
        const modal = document.getElementById('error-modal');
        modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
    }

    // Close all modals
    closeAll() {
        document.getElementById('alert-modal').classList.add('hidden');
        document.getElementById('confirm-modal').classList.add('hidden');
        document.getElementById('success-modal').classList.add('hidden');
        document.getElementById('error-modal').classList.add('hidden');
        this.overlay.classList.add('hidden');
    }

    // Handle keyboard events
    setupKeyboardHandlers() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes all modals
            if (e.key === 'Escape') {
                this.closeAll();
            }
            
            // Enter key confirms
            if (e.key === 'Enter') {
                const confirmModal = document.getElementById('confirm-modal');
                if (!confirmModal.classList.contains('hidden')) {
                    this.confirmYes();
                }
            }
        });
    }
}

// Global notification manager instance
const notificationManager = new NotificationManager();
notificationManager.setupKeyboardHandlers();
