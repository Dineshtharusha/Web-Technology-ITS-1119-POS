// ================ USER VIEW ================
class UserView {
    renderUsers(users) {
        const tbody = document.getElementById('user-table-body');
        tbody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('div');
            row.className = 'table-row grid grid-cols-5 px-8 py-6 cursor-pointer';
            row.innerHTML = `
                <div class="font-medium">${user.id}</div>
                <div>${user.name}</div>
                <div>${user.contact}</div>
                <div>${user.address}</div>
                <div>${user.email}</div>
            `;
            row.onclick = () => {
                const event = new CustomEvent('selectUser', { detail: user });
                document.dispatchEvent(event);
            };
            tbody.appendChild(row);
        });

        if (users.length === 0) {
            tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No users found</div>`;
        }
    }

    getUserFormData() {
        return {
            name: document.getElementById('user-name').value.trim(),
            contact: document.getElementById('user-contact').value.trim(),
            email: document.getElementById('user-email').value.trim(),
            password: document.getElementById('user-password').value.trim(),
            address: document.getElementById('user-address').value.trim()
        };
    }

    setUserFormData(user) {
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-contact').value = user.contact;
        document.getElementById('user-id-input').value = user.id;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-password').value = user.password || '';
        document.getElementById('user-address').value = user.address;
    }

    clearUserForm() {
        document.getElementById('user-name').value = '';
        document.getElementById('user-contact').value = '';
        document.getElementById('user-id-input').value = '';
        document.getElementById('user-email').value = '';
        document.getElementById('user-password').value = '';
        document.getElementById('user-address').value = '';
        document.getElementById('user-search').value = '';
    }

    getUserSearchTerm() {
        return document.getElementById('user-search').value.toLowerCase().trim();
    }
}
