// Sample products data
const products = [
    { id: 1, name: 'Laptop-AllyTest', price: 999.99, emoji: '💻' },
    { id: 2, name: 'Smartphone', price: 699.99, emoji: '📱' },
    { id: 3, name: 'Headphones', price: 199.99, emoji: '🎧' },
    { id: 4, name: 'Tablet', price: 399.99, emoji: '📱' },
    { id: 5, name: 'Smart Watch', price: 299.99, emoji: '⌚' },
    { id: 6, name: 'Camera', price: 799.99, emoji: '📷' }
];

// Shopping cart state
let cart = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize the app
function init() {
    renderProducts();
    renderCart();
    updateCartUI();
}

// Render products
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    renderCart();
    updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartUI();
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
            updateCartUI();
        }
    }
}

// Render cart items
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <div class="item-name">${item.emoji} ${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

// Update cart UI (count, total, checkout button)
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    checkoutBtn.disabled = cart.length === 0;
}

// Checkout function
function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Thank you for your purchase!\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
    
    // Clear cart after checkout
    cart = [];
    renderCart();
    updateCartUI();
}

// Add checkout event listener
checkoutBtn.addEventListener('click', checkout);

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', init);