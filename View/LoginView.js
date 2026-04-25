// ================ LOGIN VIEW ================
class LoginView {
    showLoginScreen() {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('main-screen').classList.add('hidden');
    }

    showMainScreen() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');
    }

    getLoginCredentials() {
        return {
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password').value.trim()
        };
    }

    clearLoginForm() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}
