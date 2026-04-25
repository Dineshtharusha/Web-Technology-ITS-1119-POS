// ================ DASHBOARD VIEW ================
class DashboardView {
    renderDashboard(data) {
        document.getElementById('today-sales').textContent = data.totalSales.toFixed(2);
        document.getElementById('total-customers').textContent = data.totalCustomers;
        document.getElementById('total-products').textContent = data.totalProducts;

        const lastOrderBody = document.getElementById('last-order-body');
        lastOrderBody.innerHTML = '';

        if (data.lastOrder) {
            const item = data.lastOrder.cart && data.lastOrder.cart[0] ? data.lastOrder.cart[0] : { itemCode: '-', qty: 0, price: 0 };

            const html = `
                <div class="grid grid-cols-4 text-lg font-medium">
                    <div>${item.itemCode}</div>
                    <div>${data.lastOrder.customerId || '-'}</div>
                    <div>${item.qty}</div>
                    <div class="font-mono">${item.price}</div>
                </div>
            `;
            lastOrderBody.innerHTML = html;
        } else {
            lastOrderBody.innerHTML = `<p class="text-amber-500 text-center py-8">No orders yet</p>`;
        }
    }
}
