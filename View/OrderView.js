// ================ ORDER/CART VIEW ================
class OrderView {
    populateCustomerDropdown(customers) {
        const select = document.getElementById('order-customer-select');
        if (!select) return;

        select.innerHTML = '<option value="">Select Customer</option>';
        customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = `${customer.id} - ${customer.name}`;
            select.appendChild(option);
        });
    }

    populateItemDropdown(items) {
        const select = document.getElementById('order-item-select');
        if (!select) return;

        select.innerHTML = '<option value="">Select Item</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.itemCode;
            option.textContent = `${item.itemCode} - ${item.name} (Rs. ${item.price})`;
            select.appendChild(option);
        });
    }

    getOrderFormData() {
        return {
            customerId: document.getElementById('order-customer-select').value,
            itemCode: document.getElementById('order-item-select').value,
            qty: parseInt(document.getElementById('order-qty').value) || 0,
            date: document.getElementById('order-date').value
        };
    }

    getDiscountPercent() {
        return parseFloat(document.getElementById('discount-percent').value) || 0;
    }

    setDiscountPercent(percent) {
        document.getElementById('discount-percent').value = percent;
    }

    renderCart(cart, subtotal, discountPercent) {
        const tbody = document.getElementById('cart-body');
        tbody.innerHTML = '';

        cart.forEach((item, index) => {
            const lineTotal = item.price * item.qty;

            const row = document.createElement('div');
            row.className = 'table-row grid grid-cols-5 px-8 py-5 items-center';
            row.innerHTML = `
                <div class="font-medium">${item.itemCode}</div>
                <div>${item.customerId}</div>
                <div>${item.qty}</div>
                <div class="font-mono">${item.price}</div>
                <div class="text-right">
                    <button onclick="POSApp.removeFromCart(${index}); event.stopImmediatePropagation()" 
                            class="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-2xl">Remove</button>
                </div>
            `;
            tbody.appendChild(row);
        });

        if (cart.length === 0) {
            tbody.innerHTML = `<div class="px-8 py-16 text-center text-amber-500">Cart is empty</div>`;
        }

        // Calculate totals
        const discountAmount = subtotal * (discountPercent / 100);
        const finalTotal = subtotal - discountAmount;

        document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('discount-amount').textContent = discountAmount.toFixed(2);
        document.getElementById('cart-total').textContent = finalTotal.toFixed(2);
    }

    resetOrderForm() {
        document.getElementById('order-customer-select').value = '';
        document.getElementById('order-item-select').value = '';
        document.getElementById('order-qty').value = '1';
        document.getElementById('discount-percent').value = '0';
        this.renderCart([], 0, 0);
    }

    setOrderDate(date) {
        const dateInput = document.getElementById('order-date');
        if (dateInput) dateInput.value = date;
    }
}
