// ================ USER CONTROLLER ================
class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('selectUser', (e) => {
            this.selectForEdit(e.detail);
        });
    }

    refresh() {
        const users = this.model.getUsers();
        const searchTerm = this.view.getUserSearchTerm();

        let filtered = users;
        if (searchTerm) {
            filtered = users.filter(u =>
                u.name.toLowerCase().includes(searchTerm) ||
                u.email.toLowerCase().includes(searchTerm)
            );
        }

        this.view.renderUsers(filtered);
    }

    selectForEdit(user) {
        this.model.setSelectedUser(user);
        this.view.setUserFormData(user);
    }

    save() {
        const data = this.view.getUserFormData();

        if (!data.name || !data.email) {
            this.view.showAlert('Name and Email are required!');
            return;
        }

        const selected = this.model.getSelectedUser();
        if (selected) {
            this.model.updateUser(selected.id, data.name, data.contact, data.address, data.email, data.password);
        } else {
            this.model.addUser(data.name, data.contact, data.address, data.email, data.password);
        }

        this.view.clearUserForm();
        this.model.setSelectedUser(null);
    }

    update() {
        if (!this.model.getSelectedUser()) {
            this.view.showAlert('Please select a user to update');
            return;
        }
        this.save();
    }

    delete() {
        if (!this.model.getSelectedUser()) {
            this.view.showAlert('Please select a user to delete');
            return;
        }

        this.view.showConfirm('Delete this user?').then(confirmed => {
            if (confirmed) {
                this.model.deleteUser(this.model.getSelectedUser().id);
                this.view.clearUserForm();
                this.model.setSelectedUser(null);
            }
        });
    }
}
