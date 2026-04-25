// ================ CUSTOMER MODEL ================
class CustomerModel {
    constructor(modelManager) {
        this.modelManager = modelManager;
        this.selectedCustomer = null;
    }

    // Get all customers from database
    getCustomers() {
        return this.modelManager.db.getCustomers();
    }

    // Add new customer
    addCustomer(name, contact, address) {
        const newCustomer = {
            id: this.modelManager.db.customerCounter++,
            name: name,
            contact: contact,
            address: address
        };
        this.modelManager.db.customers.push(newCustomer);
        this.modelManager.notifyObservers('customerAdded', newCustomer);
        return newCustomer;
    }

    // Update customer
    updateCustomer(id, name, contact, address) {
        const customer = this.modelManager.db.customers.find(c => c.id === id);
        if (customer) {
            customer.name = name;
            customer.contact = contact;
            customer.address = address;
            this.modelManager.notifyObservers('customerUpdated', customer);
        }
        return customer;
    }

    // Delete customer
    deleteCustomer(id) {
        const index = this.modelManager.db.customers.findIndex(c => c.id === id);
        if (index > -1) {
            const deleted = this.modelManager.db.customers.splice(index, 1)[0];
            this.modelManager.notifyObservers('customerDeleted', deleted);
            return deleted;
        }
        return null;
    }

    // Set selected customer
    setSelectedCustomer(customer) {
        this.selectedCustomer = customer;
    }

    // Get selected customer
    getSelectedCustomer() {
        return this.selectedCustomer;
    }
}
