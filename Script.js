// ================ DATA STORAGE (In-memory arrays - clears on refresh) ================
        let customers = []
        let items = []
        let users = []
        let orders = []
        let currentCart = []
        
        // Counters for auto IDs
        let customerCounter = 4
        let itemCounter = 4
        let userCounter = 3
        let orderCounter = 1
        
        // Selected items for editing
        let selectedCustomer = null
        let selectedItem = null
        let selectedUser = null
        
        // ================ TAILWIND INITIALIZATION ================
        function initTailwind() {
            return {
                config(userConfig = {}) {
                    return {
                        content: [],
                        theme: { extend: {} },
                        plugins: [],
                        ...userConfig,
                    }
                },
                theme: { extend: {} }
            }
        }
        
        // ================ LOGIN ================
        function handleLogin() {
            const username = document.getElementById('username').value.trim()
            const password = document.getElementById('password').value.trim()
            
            if (username === 'Dinesh' && password === '123') {
                // Demo login - correct credentials
            } else {
                alert('Invalid username or password')
                return
            }
            
            // Demo login - any credentials work
            document.getElementById('login-screen').classList.add('hidden')
            document.getElementById('main-screen').classList.remove('hidden')
            
            // Load initial demo data
            loadDemoData()
            
            // Show dashboard
            setTab('dashboard')
        }
        
        function logout() {
            notificationManager.showConfirm('Logout and clear session?').then(confirmed => {
                if (confirmed) {
                    location.reload();
                }
            });
        }
        
        // ================ DEMO DATA ================
        function loadDemoData() {
            // Customers
            customers = [
                { id: 1, name: "Dinesh", contact: "123456", address: "Galle" },
                { id: 2, name: "Dinesh", contact: "123456", address: "Galle" },
                { id: 3, name: "Dinesh", contact: "123456", address: "Galle" }
            ]
            
            // Items
            items = [
                { id: 1, itemCode: "101-10", name: "T shirt", price: 123456, qty: 10 },
                { id: 2, itemCode: "102-20", name: "Denim", price: 123456, qty: 45 },
                { id: 3, itemCode: "103-30", name: "Short", price: 123456, qty: 2 }
            ]
            
            // Users
            users = [
                { id: 1, name: "Dinesh", contact: "123456", address: "Galle", email: "ABD@gmail.com", password: "123" },
                { id: 2, name: "Dinesh", contact: "123456", address: "Galle", email: "des@gmail.com", password: "123" }
            ]
            
            // One sample order
            orders = [
                {
                    id: "ORD-001",
                    date: "2026-04-19",
                    customerId: 10,
                    cart: [{ itemCode: "101-10", customerId: 10, qty: 2, price: 7999.99 }],
                    total: 15999.98
                }
            ]
            
            // Update counters
            customerCounter = 4
            itemCounter = 4
            userCounter = 3
            orderCounter = 2
        }
        
        // ================ TAB SWITCHING ================
        function setTab(tab) {
            // Hide all contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden')
            })
            
            // Show selected
            const target = document.getElementById(tab + '-content')
            if (target) target.classList.remove('hidden')
            
            // Update active nav
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'))
            const activeBtn = document.getElementById('nav-' + tab)
            if (activeBtn) activeBtn.classList.add('active')
            
            // Refresh data for the tab
            if (tab === 'dashboard') renderDashboard()
            else if (tab === 'customer') renderCustomers()
            else if (tab === 'items') renderItems()
            else if (tab === 'order') {
                populateCustomerDropdown()
                populateItemDropdown()
                renderCart()
                // Set today's date
                const dateInput = document.getElementById('order-date')
                if (dateInput) dateInput.value = new Date().toISOString().split('T')[0]
            }
            else if (tab === 'history') renderHistory()
            else if (tab === 'user') renderUsers()
        }
        
        // ================ DASHBOARD ================
        function renderDashboard() {
            // Today sales (sum of all orders for demo)
            const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0)
            document.getElementById('today-sales').textContent = totalSales.toFixed(2)
            
            document.getElementById('total-customers').textContent = customers.length
            document.getElementById('total-products').textContent = items.length
            
            // Last order
            const lastOrderBody = document.getElementById('last-order-body')
            lastOrderBody.innerHTML = ''
            
            if (orders.length > 0) {
                const last = orders[orders.length - 1]
                const item = last.cart && last.cart[0] ? last.cart[0] : { itemCode: '-', qty: 0, price: 0 }
                
                const html = `
                    <div class="grid grid-cols-4 text-lg font-medium">
                        <div>${item.itemCode}</div>
                        <div>${last.customerId || '-'}</div>
                        <div>${item.qty}</div>
                        <div class="font-mono">${item.price}</div>
                    </div>
                `
                lastOrderBody.innerHTML = html
            } else {
                lastOrderBody.innerHTML = `<p class="text-amber-500 text-center py-8">No orders yet</p>`
            }
        }
        
        // ================ CUSTOMER CRUD ================
        function renderCustomers(filtered = null) {
            const tbody = document.getElementById('customer-table-body')
            tbody.innerHTML = ''
            
            const dataToShow = filtered || customers
            
            dataToShow.forEach(customer => {
                const row = document.createElement('div')
                row.className = 'table-row grid grid-cols-4 px-8 py-6 cursor-pointer'
                row.innerHTML = `
                    <div class="font-medium">${customer.id}</div>
                    <div>${customer.name}</div>
                    <div>${customer.contact}</div>
                    <div>${customer.address}</div>
                `
                row.onclick = () => selectCustomerForEdit(customer)
                tbody.appendChild(row)
            })
            
            if (dataToShow.length === 0) {
                tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No customers found</div>`
            }
        }
        
        function filterCustomers() {
            const term = document.getElementById('customer-search').value.toLowerCase().trim()
            if (!term) {
                renderCustomers()
                return
            }
            const filtered = customers.filter(c => 
                c.name.toLowerCase().includes(term) || 
                c.contact.includes(term) || 
                c.address.toLowerCase().includes(term)
            )
            renderCustomers(filtered)
        }
        
        function selectCustomerForEdit(customer) {
            selectedCustomer = customer
            document.getElementById('customer-name').value = customer.name
            document.getElementById('customer-contact').value = customer.contact
            document.getElementById('customer-address').value = customer.address
        }
        
        function saveCustomer() {
            const name = document.getElementById('customer-name').value.trim()
            const contact = document.getElementById('customer-contact').value.trim()
            const address = document.getElementById('customer-address').value.trim()
            
            if (!name || !contact) {
                alert('Name and Contact are required!')
                return
            }
            
            if (selectedCustomer) {
                // Update
                selectedCustomer.name = name
                selectedCustomer.contact = contact
                selectedCustomer.address = address
            } else {
                // New
                const newCustomer = {
                    id: customerCounter++,
                    name: name,
                    contact: contact,
                    address: address
                }
                customers.push(newCustomer)
            }
            
            renderCustomers()
            resetCustomerForm()
            populateCustomerDropdown()
            renderDashboard()
        }
        
        function updateCustomer() {
            if (!selectedCustomer) {
                alert('Please select a customer to update')
                return
            }
            saveCustomer()
        }
        
        function deleteCustomer() {
            if (!selectedCustomer) {
                alert('Please select a customer to delete')
                return
            }
            if (confirm('Delete this customer?')) {
                customers = customers.filter(c => c.id !== selectedCustomer.id)
                renderCustomers()
                resetCustomerForm()
                renderDashboard()
            }
        }
        
        function resetCustomerForm() {
            selectedCustomer = null
            document.getElementById('customer-name').value = ''
            document.getElementById('customer-contact').value = ''
            document.getElementById('customer-address').value = ''
            document.getElementById('customer-search').value = ''
        }
        
        // ================ ITEMS CRUD ================
        function renderItems(filtered = null) {
            const tbody = document.getElementById('item-table-body')
            tbody.innerHTML = ''
            
            const dataToShow = filtered || items
            
            dataToShow.forEach(item => {
                const row = document.createElement('div')
                row.className = 'table-row grid grid-cols-4 px-8 py-6 cursor-pointer'
                row.innerHTML = `
                    <div class="font-medium">${item.itemCode}</div>
                    <div>${item.name}</div>
                    <div class="font-mono">${item.price}</div>
                    <div>${item.qty}</div>
                `
                row.onclick = () => selectItemForEdit(item)
                tbody.appendChild(row)
            })
            
            if (dataToShow.length === 0) {
                tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No items found</div>`
            }
        }
        
        function filterItems() {
            const term = document.getElementById('item-search').value.toLowerCase().trim()
            if (!term) {
                renderItems()
                return
            }
            const filtered = items.filter(i => 
                i.itemCode.toLowerCase().includes(term) || 
                i.name.toLowerCase().includes(term)
            )
            renderItems(filtered)
        }
        
        function selectItemForEdit(item) {
            selectedItem = item
            document.getElementById('item-code').value = item.itemCode
            document.getElementById('item-name').value = item.name
            document.getElementById('item-price').value = item.price
            document.getElementById('item-qty').value = item.qty
        }
        
        function saveItem() {
            const itemCode = document.getElementById('item-code').value.trim()
            const name = document.getElementById('item-name').value.trim()
            const price = parseFloat(document.getElementById('item-price').value) || 0
            const qty = parseInt(document.getElementById('item-qty').value) || 0
            
            if (!itemCode || !name) {
                alert('Item code and name are required!')
                return
            }
            
            if (selectedItem) {
                selectedItem.itemCode = itemCode
                selectedItem.name = name
                selectedItem.price = price
                selectedItem.qty = qty
            } else {
                const newItem = {
                    id: itemCounter++,
                    itemCode: itemCode,
                    name: name,
                    price: price,
                    qty: qty
                }
                items.push(newItem)
            }
            
            renderItems()
            resetItemForm()
            populateItemDropdown()
            renderDashboard()
        }
        
        function updateItem() {
            if (!selectedItem) {
                alert('Please select an item to update')
                return
            }
            saveItem()
        }
        
        function deleteItem() {
            if (!selectedItem) {
                alert('Please select an item to delete')
                return
            }
            if (confirm('Delete this item?')) {
                items = items.filter(i => i.id !== selectedItem.id)
                renderItems()
                resetItemForm()
                renderDashboard()
            }
        }
        
        function resetItemForm() {
            selectedItem = null
            document.getElementById('item-code').value = ''
            document.getElementById('item-name').value = ''
            document.getElementById('item-price').value = ''
            document.getElementById('item-qty').value = ''
            document.getElementById('item-search').value = ''
        }
        

              // ================ CUSTOMER & ITEM DROPDOWNS FOR ORDER TAB ================
             function populateCustomerDropdown() {
             const select = document.getElementById('order-customer-select');
             if (!select) return;

             select.innerHTML = '<option value="">Select Customer</option>';
             customers.forEach(customer => {
             const option = document.createElement('option');
             option.value = customer.id;
             option.textContent = `${customer.id} - ${customer.name}`;
             select.appendChild(option);
       
               });
           }

           function populateItemDropdown() {
           const select = document.getElementById('order-item-select');
           if (!select) return;

           select.innerHTML = '<option value="">Select Item</option>';
           items.forEach(item => {
           const option = document.createElement('option');
           option.value = item.itemCode;
           option.textContent = `${item.itemCode} - ${item.name} (Rs. ${item.price})`;
           select.appendChild(option);
        
             });
        }


        // ================ ORDER & CART ================
        function addToCart() {
            const customerId = document.getElementById('order-customer-select').value
            const itemCode = document.getElementById('order-item-select').value
            let qty = parseInt(document.getElementById('order-qty').value) || 0
            
            if (!customerId || !itemCode || qty <= 0) {
                alert('Please select Customer, Item and enter Quantity')
                return
            }
            
            // Try to find item to get price
            const foundItem = items.find(i => i.itemCode === itemCode)
            const price = foundItem ? foundItem.price : 0
            
            // Check quantity if item exists
            if (foundItem && foundItem.qty < qty) {
                if (!confirm(`Only ${foundItem.qty} available. Continue anyway?`)) return
            }
            
            // Add or update existing in cart
            const existing = currentCart.find(c => c.itemCode === itemCode)
            if (existing) {
                existing.qty += qty
            } else {
                currentCart.push({
                    itemCode: itemCode,
                    customerId: customerId,
                    qty: qty,
                    price: price
                })
            }
            
            renderCart()
            
            // Clear inputs except customer id
            document.getElementById('order-item-select').value = ''
            document.getElementById('order-qty').value = '1'
        }
        
        function renderCart() {
            const tbody = document.getElementById('cart-body')
            tbody.innerHTML = ''
            
            let subtotal = 0
            
            currentCart.forEach((item, index) => {
                const lineTotal = item.price * item.qty
                subtotal += lineTotal
                
                const row = document.createElement('div')
                row.className = 'table-row grid grid-cols-5 px-8 py-5 items-center'
                row.innerHTML = `
                    <div class="font-medium">${item.itemCode}</div>
                    <div>${item.customerId}</div>
                    <div>${item.qty}</div>
                    <div class="font-mono">${item.price}</div>
                    <div class="text-right">
                        <button onclick="removeFromCart(${index}); event.stopImmediatePropagation()" 
                                class="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-2xl">Remove</button>
                    </div>
                `
                tbody.appendChild(row)
            })
            
            if (currentCart.length === 0) {
                tbody.innerHTML = `<div class="px-8 py-16 text-center text-amber-500">Cart is empty</div>`
            }
            
            // Calculate discount
            const discountPercent = parseFloat(document.getElementById('discount-percent').value) || 0
            const discountAmount = subtotal * (discountPercent / 100)
            const finalTotal = subtotal - discountAmount
            
            document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2)
            document.getElementById('discount-amount').textContent = discountAmount.toFixed(2)
            document.getElementById('cart-total').textContent = finalTotal.toFixed(2)
        }
        
        function removeFromCart(index) {
            currentCart.splice(index, 1)
            renderCart()
        }
        
        function cancelOrder() {
            if (currentCart.length > 0 && confirm('Clear the entire cart?')) {
                currentCart = []
                renderCart()
            }
        }
        
        function purchaseOrder() {
            if (currentCart.length === 0) {
                alert('Cart is empty!')
                return
            }
            
            const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.qty), 0)
            const discountPercent = parseFloat(document.getElementById('discount-percent').value) || 0
            const discountAmount = subtotal * (discountPercent / 100)
            const total = subtotal - discountAmount
            
            // Create order
            const newOrder = {
                id: `ORD-${String(orderCounter++).padStart(3, '0')}`,
                date: document.getElementById('order-date').value || new Date().toISOString().split('T')[0],
                customerId: currentCart[0].customerId,
                cart: [...currentCart],
                subtotal: subtotal,
                discountPercent: discountPercent,
                discountAmount: discountAmount,
                total: total
            }
            
            orders.push(newOrder)
            
            // Clear cart and discount
            currentCart = []
            document.getElementById('discount-percent').value = '0'
            renderCart()
            
            // Refresh dashboard & history
            renderDashboard()
            if (!document.getElementById('history-content').classList.contains('hidden')) {
                renderHistory()
            }
            
            alert(`✅ Order ${newOrder.id} placed successfully!\nSubtotal: Rs. ${subtotal.toFixed(2)}\nDiscount: Rs. ${discountAmount.toFixed(2)}\nFinal Total: Rs. ${total.toFixed(2)}`)
        }
        
        // ================ HISTORY ================
        function renderHistory() {
            const tbody = document.getElementById('history-body')
            tbody.innerHTML = ''
            
            if (orders.length === 0) {
                tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No orders in history yet</div>`
                return
            }
            
            orders.forEach(order => {
                const itemList = order.cart.map(i => `${i.itemCode}(${i.qty})`).join(', ')
                
                const row = document.createElement('div')
                row.className = 'table-row grid grid-cols-6 px-8 py-6'
                row.innerHTML = `
                    <div class="font-medium">${order.id}</div>
                    <div>${order.date}</div>
                    <div>${order.customerId}</div>
                    <div class="col-span-2 text-sm">${itemList}</div>
                    <div class="text-right font-mono font-bold">${order.total.toFixed(2)}</div>
                `
                tbody.appendChild(row)
            })
        }
        
        // ================ USER CRUD ================
        function renderUsers(filtered = null) {
            const tbody = document.getElementById('user-table-body')
            tbody.innerHTML = ''
            
            const dataToShow = filtered || users
            
            dataToShow.forEach(user => {
                const row = document.createElement('div')
                row.className = 'table-row grid grid-cols-5 px-8 py-6 cursor-pointer'
                row.innerHTML = `
                    <div class="font-medium">${user.id}</div>
                    <div>${user.name}</div>
                    <div>${user.contact}</div>
                    <div>${user.address}</div>
                    <div>${user.email}</div>
                `
                row.onclick = () => selectUserForEdit(user)
                tbody.appendChild(row)
            })
            
            if (dataToShow.length === 0) {
                tbody.innerHTML = `<div class="px-8 py-12 text-center text-amber-500">No users found</div>`
            }
        }
        
        function filterUsers() {
            const term = document.getElementById('user-search').value.toLowerCase().trim()
            if (!term) {
                renderUsers()
                return
            }
            const filtered = users.filter(u => 
                u.name.toLowerCase().includes(term) || 
                u.email.toLowerCase().includes(term)
            )
            renderUsers(filtered)
        }
        
        function selectUserForEdit(user) {
            selectedUser = user
            document.getElementById('user-name').value = user.name
            document.getElementById('user-contact').value = user.contact
            document.getElementById('user-id-input').value = user.id
            document.getElementById('user-email').value = user.email
            document.getElementById('user-password').value = user.password || ''
            document.getElementById('user-address').value = user.address
        }
        
        function saveUser() {
            const name = document.getElementById('user-name').value.trim()
            const contact = document.getElementById('user-contact').value.trim()
            const email = document.getElementById('user-email').value.trim()
            const password = document.getElementById('user-password').value.trim()
            const address = document.getElementById('user-address').value.trim()
            
            if (!name || !email) {
                alert('Name and Email are required!')
                return
            }
            
            if (selectedUser) {
                selectedUser.name = name
                selectedUser.contact = contact
                selectedUser.email = email
                selectedUser.password = password
                selectedUser.address = address
            } else {
                const newUser = {
                    id: userCounter++,
                    name: name,
                    contact: contact,
                    address: address,
                    email: email,
                    password: password
                }
                users.push(newUser)
            }
            
            renderUsers()
            resetUserForm()
        }
        
        function updateUser() {
            if (!selectedUser) {
                alert('Please select a user to update')
                return
            }
            saveUser()
        }
        
        function deleteUser() {
            if (!selectedUser) {
                alert('Please select a user to delete')
                return
            }
            if (confirm('Delete this user?')) {
                users = users.filter(u => u.id !== selectedUser.id)
                renderUsers()
                resetUserForm()
            }
        }
        
        function resetUserForm() {
            selectedUser = null
            document.getElementById('user-name').value = ''
            document.getElementById('user-contact').value = ''
            document.getElementById('user-id-input').value = ''
            document.getElementById('user-email').value = ''
            document.getElementById('user-password').value = ''
            document.getElementById('user-address').value = ''
            document.getElementById('user-search').value = ''
        }
        
        // ================ APP START ================
        document.addEventListener('DOMContentLoaded', () => {
            console.log('%c✅ POS System Ready - All tabs in one page - Data stored in arrays', 'color:#facc15; font-size:18px; font-weight:bold')
            // Tailwind already initialized via CDN
        })