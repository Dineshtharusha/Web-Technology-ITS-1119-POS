// ================ ORDER CONTROLLER ================
class OrderController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const discountInput = document.getElementById('discount-percent');
        if (discountInput) {
            discountInput.addEventListener('change', () => {
                this.updateCartDisplay();
            });
        }
    }

    switchToOrderTab() {
        this.view.populateCustomerDropdown(this.model.getCustomers());
        this.view.populateItemDropdown(this.model.getItems());

        const today = new Date().toISOString().split('T')[0];
        this.view.setOrderDate(today);

        this.updateCartDisplay();
    }

    addToCart() {
        const formData = this.view.getOrderFormData();

        if (!formData.customerId || !formData.itemCode || formData.qty <= 0) {
            this.view.showAlert('Please select Customer, Item and enter Quantity');
            return;
        }

        const foundItem = this.model.getItems().find(i => i.itemCode === formData.itemCode);

        if (foundItem && foundItem.qty < formData.qty) {
            this.view.showConfirm(`Only ${foundItem.qty} available. Continue anyway?`).then(confirmed => {
                if (confirmed) {
                    this.model.addToCart(formData.customerId, formData.itemCode, formData.qty);
                    document.getElementById('order-item-select').value = '';
                    document.getElementById('order-qty').value = '1';
                }
            });
            return;
        }

        this.model.addToCart(formData.customerId, formData.itemCode, formData.qty);

        document.getElementById('order-item-select').value = '';
        document.getElementById('order-qty').value = '1';
    }

    removeFromCart(index) {
        this.model.removeFromCart(index);
    }

    cancelOrder() {
        if (this.model.getCurrentCart().length > 0) {
            this.view.showConfirm('Clear the entire cart?').then(confirmed => {
                if (confirmed) {
                    this.model.clearCart();
                    this.view.resetOrderForm();
                }
            });
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

    updateCartDisplay() {
        const cart = this.model.getCurrentCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discountPercent = this.view.getDiscountPercent();
        this.view.renderCart(cart, subtotal, discountPercent);
    }

    refreshHistory() {
        const orders = this.model.getOrders();
        this.view.renderHistory(orders);
    }
}
