// ================ CUSTOMER CONTROLLER ================
class CustomerController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('selectCustomer', (e) => {
            this.selectForEdit(e.detail);
        });
    }

    refresh() {
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

    selectForEdit(customer) {
        this.model.setSelectedCustomer(customer);
        this.view.setCustomerFormData(customer);
    }

    save() {
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

    update() {
        if (!this.model.getSelectedCustomer()) {
            this.view.showAlert('Please select a customer to update');
            return;
        }
        this.save();
    }

    delete() {
        if (!this.model.getSelectedCustomer()) {
            this.view.showAlert('Please select a customer to delete');
            return;
        }

        this.view.showConfirm('Delete this customer?').then(confirmed => {
            if (confirmed) {
                this.model.deleteCustomer(this.model.getSelectedCustomer().id);
                this.view.clearCustomerForm();
                this.model.setSelectedCustomer(null);
            }
        });
    }

    updateDropdown() {
        this.view.populateCustomerDropdown(this.model.getCustomers());
    }
}
