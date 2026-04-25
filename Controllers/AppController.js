// ================ APP CONTROLLER - Main Orchestrator ================
class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Initialize individual controllers
        this.authController = new AuthController(model, view);
        this.dashboardController = new DashboardController(model, view);
        this.customerController = new CustomerController(model, view);
        this.itemController = new ItemController(model, view);
        this.userController = new UserController(model, view);
        this.orderController = new OrderController(model, view);

        // Subscribe to model changes
        this.model.addObserver(this);

        this.setupEventListeners();
    }

    // ================ OBSERVER UPDATE ================
    update(event, data) {
        // Auto-refresh UI when model changes
        if (event === 'customerAdded' || event === 'customerUpdated' || event === 'customerDeleted') {
            this.customerController.refresh();
            this.customerController.updateDropdown();
        }
        if (event === 'itemAdded' || event === 'itemUpdated' || event === 'itemDeleted') {
            this.itemController.refresh();
            this.itemController.updateDropdown();
        }
        if (event === 'userAdded' || event === 'userUpdated' || event === 'userDeleted') {
            this.userController.refresh();
        }
        if (event === 'cartUpdated') {
            this.orderController.updateCartDisplay();
        }
        if (event === 'orderCreated') {
            this.orderController.refreshHistory();
            this.dashboardController.refresh();
        }
    }

    // ================ EVENT LISTENERS ================
    setupEventListeners() {
        document.addEventListener('switchTab', (e) => {
            this.switchTab(e.detail);
        });
    }

    // ================ TAB SWITCHING ================
    switchTab(tab) {
        this.view.switchTab(tab);

        if (tab === 'dashboard') this.dashboardController.refresh();
        else if (tab === 'customer') this.customerController.refresh();
        else if (tab === 'items') this.itemController.refresh();
        else if (tab === 'order') this.orderController.switchToOrderTab();
        else if (tab === 'history') this.orderController.refreshHistory();
        else if (tab === 'user') this.userController.refresh();
    }

    // ================ EXPOSE CONTROLLER METHODS ================
    handleLogin() {
        this.authController.handleLogin();
    }

    logout() {
        this.authController.logout();
    }

    // Customer methods
    saveCustomer() {
        this.customerController.save();
    }

    updateCustomer() {
        this.customerController.update();
    }

    deleteCustomer() {
        this.customerController.delete();
    }

    filterCustomers() {
        this.customerController.refresh();
    }

    // Item methods
    saveItem() {
        this.itemController.save();
    }

    updateItem() {
        this.itemController.update();
    }

    deleteItem() {
        this.itemController.delete();
    }

    filterItems() {
        this.itemController.refresh();
    }

    // Order methods
    addToCart() {
        this.orderController.addToCart();
    }

    removeFromCart(index) {
        this.orderController.removeFromCart(index);
    }

    cancelOrder() {
        this.orderController.cancelOrder();
    }

    purchaseOrder() {
        this.orderController.purchaseOrder();
    }

    // User methods
    saveUser() {
        this.userController.save();
    }

    updateUser() {
        this.userController.update();
    }

    deleteUser() {
        this.userController.delete();
    }

    filterUsers() {
        this.userController.refresh();
    }
}
