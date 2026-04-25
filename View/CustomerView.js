// ================ CUSTOMER VIEW ================
class CustomerView {
    renderCustomers(customers) {
        const tbody = document.getElementById('customer-table-body');
        tbody.innerHTML = '';

        customers.forEach(customer => {
            const row = document.createElement('div');
            row.className = 'table-row grid grid-cols-4 px-8 py-6 cursor-pointer';
            row.innerHTML = `
                <div class="font-medium">${customer.id}</div>
                <div>${customer.name}</div>
                <div>${customer.contact}</div>
                <div>${customer.address}</div>
            `;
            row.onclick = () => {
                const event = new CustomEvent('selectCustomer', { detail: customer });
                document.dispatchEvent(event);
            };
            tbody.appendChild(row);
        });

        if (customers.length === 0) {
            tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No customers found</div>`;
        }
    }

    getCustomerFormData() {
        return {
            name: document.getElementById('customer-name').value.trim(),
            contact: document.getElementById('customer-contact').value.trim(),
            address: document.getElementById('customer-address').value.trim()
        };
    }

    setCustomerFormData(customer) {
        document.getElementById('customer-name').value = customer.name;
        document.getElementById('customer-contact').value = customer.contact;
        document.getElementById('customer-address').value = customer.address;
    }

    clearCustomerForm() {
        document.getElementById('customer-name').value = '';
        document.getElementById('customer-contact').value = '';
        document.getElementById('customer-address').value = '';
        document.getElementById('customer-search').value = '';
    }

    getCustomerSearchTerm() {
        return document.getElementById('customer-search').value.toLowerCase().trim();
    }
}
