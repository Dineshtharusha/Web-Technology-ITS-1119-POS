// ================ APPLICATION INITIALIZATION ================
class POSApplication {
    constructor() {
        this.model = new POSModel();
        this.view = new POSView();
        this.appController = new AppController(this.model, this.view);
    }

    // Expose app controller methods to global scope
    handleLogin() {
        this.appController.handleLogin();
    }

    logout() {
        this.appController.logout();
    }

    setTab(tab) {
        this.appController.switchTab(tab);
    }

    // Customer operations
    saveCustomer() {
        this.appController.saveCustomer();
    }

    updateCustomer() {
        this.appController.updateCustomer();
    }

    deleteCustomer() {
        this.appController.deleteCustomer();
    }

    filterCustomers() {
        this.appController.filterCustomers();
    }

    // Item operations
    saveItem() {
        this.appController.saveItem();
    }

    updateItem() {
        this.appController.updateItem();
    }

    deleteItem() {
        this.appController.deleteItem();
    }

    filterItems() {
        this.appController.filterItems();
    }

    // Order operations
    addToCart() {
        this.appController.addToCart();
    }

    removeFromCart(index) {
        this.appController.removeFromCart(index);
    }

    cancelOrder() {
        this.appController.cancelOrder();
    }

    purchaseOrder() {
        this.appController.purchaseOrder();
    }

    // User operations
    saveUser() {
        this.appController.saveUser();
    }

    updateUser() {
        this.appController.updateUser();
    }

    deleteUser() {
        this.appController.deleteUser();
    }

    filterUsers() {
        this.appController.filterUsers();
    }
}

// Initialize app
let POSApp;
document.addEventListener('DOMContentLoaded', () => {
    POSApp = new POSApplication();
    console.log('%c✅ POS System Ready - Separated Controllers Architecture Loaded', 'color:#facc15; font-size:18px; font-weight:bold');
});
