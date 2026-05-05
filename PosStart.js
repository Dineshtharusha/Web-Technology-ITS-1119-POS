// ================ APPLICATION INITIALIZATION ================
class POSApplication {
    constructor() {
        this.model = new POSModel();
        this.view = new POSView();
        this.controller = new POSController(this.model, this.view);
    }

    // Expose controller methods to global scope
    handleLogin() {
        this.controller.handleLogin();
    }

    logout() {
        this.controller.logout();
    }

    setTab(tab) {
        this.controller.switchTab(tab);
    }

    // Customer operations
    saveCustomer() {
        this.controller.saveCustomer();
    }

    updateCustomer() {
        this.controller.updateCustomer();
    }

    deleteCustomer() {
        this.controller.deleteCustomer();
    }

    filterCustomers() {
        this.controller.refreshCustomers();
    }

    // Item operations
    saveItem() {
        this.controller.saveItem();
    }

    updateItem() {
        this.controller.updateItem();
    }

    deleteItem() {
        this.controller.deleteItem();
    }

    filterItems() {
        this.controller.refreshItems();
    }

    // Order operations
    addToCart() {
        this.controller.addToCart();
    }

    removeFromCart(index) {
        this.controller.removeFromCart(index);
    }

    cancelOrder() {
        this.controller.cancelOrder();
    }

    purchaseOrder() {
        this.controller.purchaseOrder();
    }

    // User operations
    saveUser() {
        this.controller.saveUser();
    }

    updateUser() {
        this.controller.updateUser();
    }

    deleteUser() {
        this.controller.deleteUser();
    }

    filterUsers() {
        this.controller.refreshUsers();
    }
}

// Initialize app
let POSApp;
document.addEventListener('DOMContentLoaded', () => {
    POSApp = new POSApplication();
    console.log('%c✅ POS System Ready - MVC Architecture Loaded', 'color:#facc15; font-size:18px; font-weight:bold');
});
