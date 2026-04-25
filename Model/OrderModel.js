// ================ ORDER MODEL ================
class OrderModel {
    constructor(modelManager) {
        this.modelManager = modelManager;
    }

    // Get all orders from database
    getOrders() {
        return this.modelManager.db.getOrders();
    }

    // Create new order
    createOrder(customerId, cart, subtotal, discountPercent) {
        const discountAmount = subtotal * (discountPercent / 100);
        const total = subtotal - discountAmount;

        const newOrder = {
            id: `ORD-${String(this.modelManager.db.orderCounter++).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            customerId: customerId,
            cart: [...cart],
            subtotal: subtotal,
            discountPercent: discountPercent,
            discountAmount: discountAmount,
            total: total
        };

        this.modelManager.db.orders.push(newOrder);
        this.modelManager.notifyObservers('orderCreated', newOrder);
        return newOrder;
    }
}
