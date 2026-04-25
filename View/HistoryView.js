// ================ HISTORY VIEW ================
class HistoryView {
    renderHistory(orders) {
        const tbody = document.getElementById('history-body');
        tbody.innerHTML = '';

        if (orders.length === 0) {
            tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No orders in history yet</div>`;
            return;
        }

        orders.forEach(order => {
            const itemList = order.cart.map(i => `${i.itemCode}(${i.qty})`).join(', ');

            const row = document.createElement('div');
            row.className = 'table-row grid grid-cols-6 px-8 py-6';
            row.innerHTML = `
                <div class="font-medium">${order.id}</div>
                <div>${order.date}</div>
                <div>${order.customerId}</div>
                <div class="col-span-2 text-sm">${itemList}</div>
                <div class="text-right font-mono font-bold">${order.total.toFixed(2)}</div>
            `;
            tbody.appendChild(row);
        });
    }
}
