// ================ CART MODEL ================
class CartModel {
    constructor(modelManager, itemModel) {
        this.modelManager = modelManager;
        this.itemModel = itemModel;
    }

    // Get current cart from database
    getCurrentCart() {
        return this.modelManager.db.getCart();
    }

    // Add item to cart
    addToCart(customerId, itemCode, qty) {
        const item = this.modelManager.db.items.find(i => i.itemCode === itemCode);
        if (!item) return null;

        const existing = this.modelManager.db.currentCart.find(c => c.itemCode === itemCode);
        if (existing) {
            existing.qty += qty;
        } else {
            this.modelManager.db.currentCart.push({
                itemCode: itemCode,
                customerId: customerId,
                qty: qty,
                price: item.price
            });
        }

        this.modelManager.notifyObservers('cartUpdated', this.modelManager.db.currentCart);
        return this.modelManager.db.currentCart;
    }

    // Remove item from cart by index
    removeFromCart(index) {
        if (index >= 0 && index < this.modelManager.db.currentCart.length) {
            this.modelManager.db.currentCart.splice(index, 1);
        }
        this.modelManager.notifyObservers('cartUpdated', this.modelManager.db.currentCart);
    }

    // Clear entire cart
    clearCart() {
        this.modelManager.db.currentCart = [];
        this.modelManager.notifyObservers('cartUpdated', this.modelManager.db.currentCart);
    }
}
