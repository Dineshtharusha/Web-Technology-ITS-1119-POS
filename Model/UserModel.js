// ================ USER MODEL ================
class UserModel {
    constructor(modelManager) {
        this.modelManager = modelManager;
        this.selectedUser = null;
    }

    // Get all users from database
    getUsers() {
        return this.modelManager.db.getUsers();
    }

    // Add new user
    addUser(name, contact, address, email, password) {
        const newUser = {
            id: this.modelManager.db.userCounter++,
            name: name,
            contact: contact,
            address: address,
            email: email,
            password: password
        };
        this.modelManager.db.users.push(newUser);
        this.modelManager.notifyObservers('userAdded', newUser);
        return newUser;
    }

    // Update user
    updateUser(id, name, contact, address, email, password) {
        const user = this.modelManager.db.users.find(u => u.id === id);
        if (user) {
            user.name = name;
            user.contact = contact;
            user.address = address;
            user.email = email;
            user.password = password;
            this.modelManager.notifyObservers('userUpdated', user);
        }
        return user;
    }

    // Delete user
    deleteUser(id) {
        const index = this.modelManager.db.users.findIndex(u => u.id === id);
        if (index > -1) {
            const deleted = this.modelManager.db.users.splice(index, 1)[0];
            this.modelManager.notifyObservers('userDeleted', deleted);
            return deleted;
        }
        return null;
    }

    // Set selected user
    setSelectedUser(user) {
        this.selectedUser = user;
    }

    // Get selected user
    getSelectedUser() {
        return this.selectedUser;
    }
}
