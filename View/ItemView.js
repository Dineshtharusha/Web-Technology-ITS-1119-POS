// ================ ITEM VIEW ================
class ItemView {
    renderItems(items) {
        const tbody = document.getElementById('item-table-body');
        tbody.innerHTML = '';

        items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'table-row grid grid-cols-4 px-8 py-6 cursor-pointer';
            row.innerHTML = `
                <div class="font-medium">${item.itemCode}</div>
                <div>${item.name}</div>
                <div class="font-mono">${item.price}</div>
                <div>${item.qty}</div>
            `;
            row.onclick = () => {
                const event = new CustomEvent('selectItem', { detail: item });
                document.dispatchEvent(event);
            };
            tbody.appendChild(row);
        });

        if (items.length === 0) {
            tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No items found</div>`;
        }
    }

    getItemFormData() {
        return {
            itemCode: document.getElementById('item-code').value.trim(),
            name: document.getElementById('item-name').value.trim(),
            price: parseFloat(document.getElementById('item-price').value) || 0,
            qty: parseInt(document.getElementById('item-qty').value) || 0
        };
    }

    setItemFormData(item) {
        document.getElementById('item-code').value = item.itemCode;
        document.getElementById('item-name').value = item.name;
        document.getElementById('item-price').value = item.price;
        document.getElementById('item-qty').value = item.qty;
    }

    clearItemForm() {
        document.getElementById('item-code').value = '';
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
        document.getElementById('item-qty').value = '';
        document.getElementById('item-search').value = '';
    }

    getItemSearchTerm() {
        return document.getElementById('item-search').value.toLowerCase().trim();
    }
}
