// ================ ITEM CONTROLLER ================
class ItemController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('selectItem', (e) => {
            this.selectForEdit(e.detail);
        });
    }

    refresh() {
        const items = this.model.getItems();
        const searchTerm = this.view.getItemSearchTerm();

        let filtered = items;
        if (searchTerm) {
            filtered = items.filter(i =>
                i.itemCode.toLowerCase().includes(searchTerm) ||
                i.name.toLowerCase().includes(searchTerm)
            );
        }

        this.view.renderItems(filtered);
    }

    selectForEdit(item) {
        this.model.setSelectedItem(item);
        this.view.setItemFormData(item);
    }

    save() {
        const data = this.view.getItemFormData();

        if (!data.itemCode || !data.name) {
            this.view.showAlert('Item code and name are required!');
            return;
        }

        const selected = this.model.getSelectedItem();
        if (selected) {
            this.model.updateItem(selected.id, data.itemCode, data.name, data.price, data.qty);
        } else {
            this.model.addItem(data.itemCode, data.name, data.price, data.qty);
        }

        this.view.clearItemForm();
        this.model.setSelectedItem(null);
    }

    update() {
        if (!this.model.getSelectedItem()) {
            this.view.showAlert('Please select an item to update');
            return;
        }
        this.save();
    }

    delete() {
        if (!this.model.getSelectedItem()) {
            this.view.showAlert('Please select an item to delete');
            return;
        }

        this.view.showConfirm('Delete this item?').then(confirmed => {
            if (confirmed) {
                this.model.deleteItem(this.model.getSelectedItem().id);
                this.view.clearItemForm();
                this.model.setSelectedItem(null);
            }
        });
    }

    updateDropdown() {
        this.view.populateItemDropdown(this.model.getItems());
    }
}
