// ================ MAIN MODEL - Data Management ================
class POSModel {
    constructor() {
        // Observers for state changes
        this.observers = [];

        // Reference to database
        this.db = db;

        // Initialize sub-models
        this.customerModel = new CustomerModel(this);
        this.itemModel = new ItemModel(this);
        this.userModel = new UserModel(this);
        this.cartModel = new CartModel(this, this.itemModel);
        this.orderModel = new OrderModel(this);
        this.dashboardModel = new DashboardModel(this);
    }

    // Observer pattern
    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(event, data) {
        this.observers.forEach(observer => observer.update(event, data));
    }

    // Load all demo data
    loadDemoData() {
        this.db.loadDemoData();
        this.notifyObservers('dataLoaded', null);
    }

    // ================ CUSTOMER MANAGEMENT ================
    getCustomers() {
        return this.customerModel.getCustomers();
    }

    addCustomer(name, contact, address) {
        return this.customerModel.addCustomer(name, contact, address);
    }

    updateCustomer(id, name, contact, address) {
        return this.customerModel.updateCustomer(id, name, contact, address);
    }

    deleteCustomer(id) {
        return this.customerModel.deleteCustomer(id);
    }

    setSelectedCustomer(customer) {
        this.customerModel.setSelectedCustomer(customer);
    }

    getSelectedCustomer() {
        return this.customerModel.getSelectedCustomer();
    }

    // ================ ITEM MANAGEMENT ================
    getItems() {
        return this.itemModel.getItems();
    }

    addItem(itemCode, name, price, qty) {
        return this.itemModel.addItem(itemCode, name, price, qty);
    }

    updateItem(id, itemCode, name, price, qty) {
        return this.itemModel.updateItem(id, itemCode, name, price, qty);
    }

    deleteItem(id) {
        return this.itemModel.deleteItem(id);
    }

    setSelectedItem(item) {
        this.itemModel.setSelectedItem(item);
    }

    getSelectedItem() {
        return this.itemModel.getSelectedItem();
    }

    // ================ USER MANAGEMENT ================
    getUsers() {
        return this.userModel.getUsers();
    }

    addUser(name, contact, address, email, password) {
        return this.userModel.addUser(name, contact, address, email, password);
    }

    updateUser(id, name, contact, address, email, password) {
        return this.userModel.updateUser(id, name, contact, address, email, password);
    }

    deleteUser(id) {
        return this.userModel.deleteUser(id);
    }

    setSelectedUser(user) {
        this.userModel.setSelectedUser(user);
    }

    getSelectedUser() {
        return this.userModel.getSelectedUser();
    }

    // ================ CART MANAGEMENT ================
    getCurrentCart() {
        return this.cartModel.getCurrentCart();
    }

    addToCart(customerId, itemCode, qty) {
        return this.cartModel.addToCart(customerId, itemCode, qty);
    }

    removeFromCart(index) {
        this.cartModel.removeFromCart(index);
    }

    clearCart() {
        this.cartModel.clearCart();
    }

    // ================ ORDER MANAGEMENT ================
    getOrders() {
        return this.orderModel.getOrders();
    }

    createOrder(customerId, cart, subtotal, discountPercent) {
        return this.orderModel.createOrder(customerId, cart, subtotal, discountPercent);
    }

    // ================ DASHBOARD DATA ================
    getDashboardData() {
        return this.dashboardModel.getDashboardData();
    }
}
