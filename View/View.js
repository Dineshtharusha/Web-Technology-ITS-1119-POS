// ================ MAIN VIEW - UI Management Facade ================
class POSView {
    constructor() {
        // Initialize all sub-views
        this.loginView = new LoginView();
        this.dashboardView = new DashboardView();
        this.customerView = new CustomerView();
        this.itemView = new ItemView();
        this.orderView = new OrderView();
        this.historyView = new HistoryView();
        this.userView = new UserView();
    }

    // ================ LOGIN VIEW ================
    showLoginScreen() {
        this.loginView.showLoginScreen();
    }

    showMainScreen() {
        this.loginView.showMainScreen();
    }

    getLoginCredentials() {
        return this.loginView.getLoginCredentials();
    }

    clearLoginForm() {
        this.loginView.clearLoginForm();
    }

    // ================ TAB SWITCHING ================
    switchTab(tab) {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        const target = document.getElementById(tab + '-content');
        if (target) target.classList.remove('hidden');

        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById('nav-' + tab);
        if (activeBtn) activeBtn.classList.add('active');
    }

    // ================ DASHBOARD VIEW ================
    renderDashboard(data) {
        this.dashboardView.renderDashboard(data);
    }

    // ================ CUSTOMER VIEW ================
    renderCustomers(customers) {
        this.customerView.renderCustomers(customers);
    }

    getCustomerFormData() {
        return this.customerView.getCustomerFormData();
    }

    setCustomerFormData(customer) {
        this.customerView.setCustomerFormData(customer);
    }

    clearCustomerForm() {
        this.customerView.clearCustomerForm();
    }

    getCustomerSearchTerm() {
        return this.customerView.getCustomerSearchTerm();
    }

    // ================ ITEM VIEW ================
    renderItems(items) {
        this.itemView.renderItems(items);
    }

    getItemFormData() {
        return this.itemView.getItemFormData();
    }

    setItemFormData(item) {
        this.itemView.setItemFormData(item);
    }

    clearItemForm() {
        this.itemView.clearItemForm();
    }

    getItemSearchTerm() {
        return this.itemView.getItemSearchTerm();
    }

    // ================ ORDER/CART VIEW ================
    populateCustomerDropdown(customers) {
        this.orderView.populateCustomerDropdown(customers);
    }

    populateItemDropdown(items) {
        this.orderView.populateItemDropdown(items);
    }

    getOrderFormData() {
        return this.orderView.getOrderFormData();
    }

    getDiscountPercent() {
        return this.orderView.getDiscountPercent();
    }

    setDiscountPercent(percent) {
        this.orderView.setDiscountPercent(percent);
    }

    renderCart(cart, subtotal, discountPercent) {
        this.orderView.renderCart(cart, subtotal, discountPercent);
    }

    resetOrderForm() {
        this.orderView.resetOrderForm();
    }

    setOrderDate(date) {
        this.orderView.setOrderDate(date);
    }

    // ================ HISTORY VIEW ================
    renderHistory(orders) {
        this.historyView.renderHistory(orders);
    }

    // ================ USER VIEW ================
    renderUsers(users) {
        this.userView.renderUsers(users);
    }

    getUserFormData() {
        return this.userView.getUserFormData();
    }

    setUserFormData(user) {
        this.userView.setUserFormData(user);
    }

    clearUserForm() {
        this.userView.clearUserForm();
    }

    getUserSearchTerm() {
        return this.userView.getUserSearchTerm();
    }

    // ================ ALERTS ================
    showAlert(message) {
        notificationManager.showAlert(message);
    }

    showConfirm(message) {
        return notificationManager.showConfirm(message);
    }

    showSuccess(message) {
        notificationManager.showSuccess(message);
    }

    showError(message) {
        notificationManager.showError(message);
    }
}
