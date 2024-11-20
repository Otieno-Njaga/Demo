// Load cart from localStorage or initialize as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count displayed on the cart icon
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Function to add a product to the cart and save to localStorage
function addToCart(event) {
    const button = event.target;
    const title = button.getAttribute('data-title');
    const price = parseFloat(button.getAttribute('data-price'));

    // Check if product is already in cart
    const existingProduct = cart.find(item => item.title === title);

    if (existingProduct) {
        existingProduct.quantity++; // Increase quantity if it exists
    } else {
        // Add new product to the cart
        cart.push({ title, price, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');

    // Update the cart count display
    updateCartCount();
}

// Function to display cart items on the cart page
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return; // Only run if on the cart page

    // Clear previous cart items
    cartItemsContainer.innerHTML = '';

    // Load the cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="product-thumbnail">
                <img src="/images/promotional-image.jpg" alt="${item.title}">
            </div>
            <div class="product-info">
                <p class="product-name">${item.title}</p>
                <div class="product-quantity">
                    <button class="quantity-btn decrease" onclick="changeQuantity(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button class="quantity-btn increase" onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <p class="product-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to change the quantity of an item in the cart
function changeQuantity(index, change) {
    cart[index].quantity += change;

    // Remove item if quantity goes to 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    // Save updated cart to localStorage and update display
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount(); // Update cart count when quantity changes
}

// Initialize the cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    updateCartCount();
});
