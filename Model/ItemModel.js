// ================ ITEM MODEL ================
class ItemModel {
    constructor(modelManager) {
        this.modelManager = modelManager;
        this.selectedItem = null;
    }

    // Get all items from database
    getItems() {
        return this.modelManager.db.getItems();
    }

    // Add new item
    addItem(itemCode, name, price, qty) {
        const newItem = {
            id: this.modelManager.db.itemCounter++,
            itemCode: itemCode,
            name: name,
            price: price,
            qty: qty
        };
        this.modelManager.db.items.push(newItem);
        this.modelManager.notifyObservers('itemAdded', newItem);
        return newItem;
    }

    // Update item
    updateItem(id, itemCode, name, price, qty) {
        const item = this.modelManager.db.items.find(i => i.id === id);
        if (item) {
            item.itemCode = itemCode;
            item.name = name;
            item.price = price;
            item.qty = qty;
            this.modelManager.notifyObservers('itemUpdated', item);
        }
        return item;
    }

    // Delete item
    deleteItem(id) {
        const index = this.modelManager.db.items.findIndex(i => i.id === id);
        if (index > -1) {
            const deleted = this.modelManager.db.items.splice(index, 1)[0];
            this.modelManager.notifyObservers('itemDeleted', deleted);
            return deleted;
        }
        return null;
    }

    // Set selected item
    setSelectedItem(item) {
        this.selectedItem = item;
    }

    // Get selected item
    getSelectedItem() {
        return this.selectedItem;
    }
}
