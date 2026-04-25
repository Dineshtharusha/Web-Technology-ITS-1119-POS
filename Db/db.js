// ================ DATABASE - Data Storage Layer ================
class POSDatabase {
    constructor() {
        // Initialize all data arrays
        this.customers = [];
        this.items = [];
        this.users = [];
        this.orders = [];
        this.currentCart = [];

        // Counters for auto IDs
        this.customerCounter = 4;
        this.itemCounter = 4;
        this.userCounter = 3;
        this.orderCounter = 1;
    }

    // ================ LOAD DEMO DATA ================
    loadDemoData() {
        // Clear existing data
        this.customers = [];
        this.items = [];
        this.users = [];
        this.orders = [];
        this.currentCart = [];

        // Load customer demo data
        this.customers = [
            { id: 1, name: "Dinesh", contact: "123456", address: "Galle" },
            { id: 2, name: "Dinesh", contact: "123456", address: "Galle" },
            { id: 3, name: "Dinesh", contact: "123456", address: "Galle" }
        ];

        // Load item demo data
        this.items = [
            { id: 1, itemCode: "101-10", name: "T shirt", price: 123456, qty: 10 },
            { id: 2, itemCode: "102-20", name: "Denim", price: 123456, qty: 45 },
            { id: 3, itemCode: "103-30", name: "Short", price: 123456, qty: 2 }
        ];

        // Load user demo data
        this.users = [
            { id: 1, name: "Dinesh", contact: "123456", address: "Galle", email: "ABD@gmail.com", password: "123" },
            { id: 2, name: "Dinesh", contact: "123456", address: "Galle", email: "des@gmail.com", password: "123" }
        ];

        // Load order demo data
        this.orders = [
            {
                id: "ORD-001",
                date: "2026-04-19",
                customerId: 10,
                cart: [{ itemCode: "101-10", customerId: 10, qty: 2, price: 7999.99 }],
                total: 15999.98
            }
        ];

        // Reset counters
        this.customerCounter = 4;
        this.itemCounter = 4;
        this.userCounter = 3;
        this.orderCounter = 2;
    }

    // ================ CLEAR DATA ================
    clearAllData() {
        this.customers = [];
        this.items = [];
        this.users = [];
        this.orders = [];
        this.currentCart = [];
        this.customerCounter = 4;
        this.itemCounter = 4;
        this.userCounter = 3;
        this.orderCounter = 1;
    }

    // ================ DATA GETTERS ================
    getCustomers() {
        return this.customers;
    }

    getItems() {
        return this.items;
    }

    getUsers() {
        return this.users;
    }

    getOrders() {
        return this.orders;
    }

    getCart() {
        return this.currentCart;
    }
}

// Global database instance
const db = new POSDatabase();
