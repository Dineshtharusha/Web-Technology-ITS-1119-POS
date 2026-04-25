// ================ AUTH CONTROLLER - Login & Logout ================
class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !document.getElementById('login-screen').classList.contains('hidden')) {
                this.handleLogin();
            }
        });
    }

    handleLogin() {
        const credentials = this.view.getLoginCredentials();

        if (credentials.username === 'Dinesh' && credentials.password === '123') {
            this.view.showMainScreen();
            this.model.loadDemoData();
            this.view.clearLoginForm();
            // Dispatch event to switch to dashboard
            document.dispatchEvent(new CustomEvent('switchTab', { detail: 'dashboard' }));
        } else {
            this.view.showAlert('Invalid username or password');
        }
    }

    logout() {
        this.view.showConfirm('Logout and clear session?').then(confirmed => {
            if (confirmed) {
                location.reload();
            }
        });
    }
}
