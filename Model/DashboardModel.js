// ================ DASHBOARD MODEL ================
class DashboardModel {
    constructor(modelManager) {
        this.modelManager = modelManager;
    }

    // Get dashboard data
    getDashboardData() {
        const orders = this.modelManager.db.getOrders();
        const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const lastOrder = orders.length > 0 ? orders[orders.length - 1] : null;

        return {
            totalSales: totalSales,
            totalCustomers: this.modelManager.db.getCustomers().length,
            totalProducts: this.modelManager.db.getItems().length,
            lastOrder: lastOrder
        };
    }
}
