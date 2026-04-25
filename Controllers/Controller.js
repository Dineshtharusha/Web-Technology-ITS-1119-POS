// ================ CONTROLLER - Business Logic ================
class POSController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Subscribe to model changes
        this.model.addObserver(this);

        this.setupEventListeners();
    }

    // ================ OBSERVER UPDATE ================
    update(event, data) {
        // Auto-refresh UI when model changes
        if (event === 'customerAdded' || event === 'customerUpdated' || event === 'customerDeleted') {
            this.refreshCustomers();
            this.view.populateCustomerDropdown(this.model.getCustomers());
        }
        if (event === 'itemAdded' || event === 'itemUpdated' || event === 'itemDeleted') {
            this.refreshItems();
            this.view.populateItemDropdown(this.model.getItems());
        }
        if (event === 'userAdded' || event === 'userUpdated' || event === 'userDeleted') {
            this.refreshUsers();
        }
        if (event === 'cartUpdated') {
            const subtotal = data.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const discountPercent = this.view.getDiscountPercent();
            this.view.renderCart(data, subtotal, discountPercent);
        }
        if (event === 'orderCreated') {
            this.refreshOrders();
            this.refreshDashboard();
        }
    }

    // ================ EVENT LISTENERS ================
    setupEventListeners() {
        // Login
        window.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !document.getElementById('login-screen').classList.contains('hidden')) {
                this.handleLogin();
            }
        });

        // Customer events
        document.addEventListener('selectCustomer', (e) => {
            this.selectCustomerForEdit(e.detail);
        });

        // Item events
        document.addEventListener('selectItem', (e) => {
            this.selectItemForEdit(e.detail);
        });

        // User events
        document.addEventListener('selectUser', (e) => {
            this.selectUserForEdit(e.detail);
        });

        // Discount change
        const discountInput = document.getElementById('discount-percent');
        if (discountInput) {
            discountInput.addEventListener('change', () => {
                const cart = this.model.getCurrentCart();
                const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                const discountPercent = this.view.getDiscountPercent();
                this.view.renderCart(cart, subtotal, discountPercent);
            });
        }
    }

    // ================ LOGIN MANAGEMENT ================
    handleLogin() {
        const credentials = this.view.getLoginCredentials();

        if (credentials.username === 'Dinesh' && credentials.password === '123') {
            this.view.showMainScreen();
            this.model.loadDemoData();
            this.view.clearLoginForm();
            this.switchTab('dashboard');
        } else {
            this.view.showAlert('Invalid username or password');
        }
    }

    logout() {
        if (this.view.showConfirm('Logout and clear session?')) {
            location.reload();
        }
    }

    // ================ TAB SWITCHING ================
    switchTab(tab) {
        this.view.switchTab(tab);

        if (tab === 'dashboard') this.refreshDashboard();
        else if (tab === 'customer') this.refreshCustomers();
        else if (tab === 'items') this.refreshItems();
        else if (tab === 'order') this.switchToOrderTab();
        else if (tab === 'history') this.refreshOrders();
        else if (tab === 'user') this.refreshUsers();
    }

    // ================ DASHBOARD ================
    refreshDashboard() {
        const data = this.model.getDashboardData();
        this.view.renderDashboard(data);
    }

    // ================ CUSTOMER MANAGEMENT ================
    refreshCustomers() {
        const customers = this.model.getCustomers();
        const searchTerm = this.view.getCustomerSearchTerm();

        let filtered = customers;
        if (searchTerm) {
            filtered = customers.filter(c =>
                c.name.toLowerCase().includes(searchTerm) ||
                c.contact.includes(searchTerm) ||
                c.address.toLowerCase().includes(searchTerm)
            );
        }

        this.view.renderCustomers(filtered);
    }

    selectCustomerForEdit(customer) {
        this.model.setSelectedCustomer(customer);
        this.view.setCustomerFormData(customer);
    }

    saveCustomer() {
        const data = this.view.getCustomerFormData();

        if (!data.name || !data.contact) {
            this.view.showAlert('Name and Contact are required!');
            return;
        }

        const selected = this.model.getSelectedCustomer();
        if (selected) {
            this.model.updateCustomer(selected.id, data.name, data.contact, data.address);
        } else {
            this.model.addCustomer(data.name, data.contact, data.address);
        }

        this.view.clearCustomerForm();
        this.model.setSelectedCustomer(null);
    }

    updateCustomer() {
        if (!this.model.getSelectedCustomer()) {
            this.view.showAlert('Please select a customer to update');
            return;
        }
        this.saveCustomer();
    }

    deleteCustomer() {
        if (!this.model.getSelectedCustomer()) {
            this.view.showAlert('Please select a customer to delete');
            return;
        }

        if (this.view.showConfirm('Delete this customer?')) {
            this.model.deleteCustomer(this.model.getSelectedCustomer().id);
            this.view.clearCustomerForm();
            this.model.setSelectedCustomer(null);
        }
    }

    // ================ ITEM MANAGEMENT ================
    refreshItems() {
        const items = this.model.getItems();
        const searchTerm = this.view.getItemSearchTerm();

        let filtered = items;
        if (searchTerm) {
            filtered = items.filter(i =>
                i.itemCode.toLowerCase().includes(searchTerm) ||
                i.name.toLowerCase().includes(searchTerm)
            );
        }

        this.view.renderItems(filtered);
    }

    selectItemForEdit(item) {
        this.model.setSelectedItem(item);
        this.view.setItemFormData(item);
    }

    saveItem() {
        const data = this.view.getItemFormData();

        if (!data.itemCode || !data.name) {
            this.view.showAlert('Item code and name are required!');
            return;
        }

        const selected = this.model.getSelectedItem();
        if (selected) {
            this.model.updateItem(selected.id, data.itemCode, data.name, data.price, data.qty);
        } else {
            this.model.addItem(data.itemCode, data.name, data.price, data.qty);
        }

        this.view.clearItemForm();
        this.model.setSelectedItem(null);
    }

    updateItem() {
        if (!this.model.getSelectedItem()) {
            this.view.showAlert('Please select an item to update');
            return;
        }
        this.saveItem();
    }

    deleteItem() {
        if (!this.model.getSelectedItem()) {
            this.view.showAlert('Please select an item to delete');
            return;
        }

        if (this.view.showConfirm('Delete this item?')) {
            this.model.deleteItem(this.model.getSelectedItem().id);
            this.view.clearItemForm();
            this.model.setSelectedItem(null);
        }
    }

    // ================ ORDER/CART MANAGEMENT ================
    switchToOrderTab() {
        this.view.populateCustomerDropdown(this.model.getCustomers());
        this.view.populateItemDropdown(this.model.getItems());

        const today = new Date().toISOString().split('T')[0];
        this.view.setOrderDate(today);

        const cart = this.model.getCurrentCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discountPercent = this.view.getDiscountPercent();
        this.view.renderCart(cart, subtotal, discountPercent);
    }

    addToCart() {
        const formData = this.view.getOrderFormData();

        if (!formData.customerId || !formData.itemCode || formData.qty <= 0) {
            this.view.showAlert('Please select Customer, Item and enter Quantity');
            return;
        }

        const foundItem = this.model.getItems().find(i => i.itemCode === formData.itemCode);

        if (foundItem && foundItem.qty < formData.qty) {
            if (!this.view.showConfirm(`Only ${foundItem.qty} available. Continue anyway?`)) {
                return;
            }
        }

        this.model.addToCart(formData.customerId, formData.itemCode, formData.qty);

        document.getElementById('order-item-select').value = '';
        document.getElementById('order-qty').value = '1';
    }

    removeFromCart(index) {
        this.model.removeFromCart(index);
    }

    cancelOrder() {
        if (this.model.getCurrentCart().length > 0 && this.view.showConfirm('Clear the entire cart?')) {
            this.model.clearCart();
            this.view.resetOrderForm();
        }
    }

    purchaseOrder() {
        const cart = this.model.getCurrentCart();
        if (cart.length === 0) {
            this.view.showAlert('Cart is empty!');
            return;
        }

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discountPercent = this.view.getDiscountPercent();

        const order = this.model.createOrder(cart[0].customerId, cart, subtotal, discountPercent);

        this.model.clearCart();
        this.view.resetOrderForm();

        this.view.showAlert(`✅ Order ${order.id} placed successfully!\nSubtotal: Rs. ${order.subtotal.toFixed(2)}\nDiscount: Rs. ${order.discountAmount.toFixed(2)}\nFinal Total: Rs. ${order.total.toFixed(2)}`);
    }

    // ================ ORDER HISTORY ================
    refreshOrders() {
        const orders = this.model.getOrders();
        this.view.renderHistory(orders);
    }

    // ================ USER MANAGEMENT ================
    refreshUsers() {
        const users = this.model.getUsers();
        const searchTerm = this.view.getUserSearchTerm();

        let filtered = users;
        if (searchTerm) {
            filtered = users.filter(u =>
                u.name.toLowerCase().includes(searchTerm) ||
                u.email.toLowerCase().includes(searchTerm)
            );
        }

        this.view.renderUsers(filtered);
    }

    selectUserForEdit(user) {
        this.model.setSelectedUser(user);
        this.view.setUserFormData(user);
    }

    saveUser() {
        const data = this.view.getUserFormData();

        if (!data.name || !data.email) {
            this.view.showAlert('Name and Email are required!');
            return;
        }

        const selected = this.model.getSelectedUser();
        if (selected) {
            this.model.updateUser(selected.id, data.name, data.contact, data.address, data.email, data.password);
        } else {
            this.model.addUser(data.name, data.contact, data.address, data.email, data.password);
        }

        this.view.clearUserForm();
        this.model.setSelectedUser(null);
    }

    updateUser() {
        if (!this.model.getSelectedUser()) {
            this.view.showAlert('Please select a user to update');
            return;
        }
        this.saveUser();
    }

    deleteUser() {
        if (!this.model.getSelectedUser()) {
            this.view.showAlert('Please select a user to delete');
            return;
        }

        if (this.view.showConfirm('Delete this user?')) {
            this.model.deleteUser(this.model.getSelectedUser().id);
            this.view.clearUserForm();
            this.model.setSelectedUser(null);
        }
    }
}
