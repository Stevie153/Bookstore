document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    calculateTotal();
});

// Load cart items dynamically
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    cartContainer.innerHTML = ""; // Clear existing items
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        document.querySelector(".cart-total").style.display = "none";
        return;
    }

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <input type="number" value="${item.quantity}" min="1" class="quantity" data-index="${index}">
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    addEventListeners();
    calculateTotal();
}

// Add event listeners for quantity change and remove buttons
function addEventListeners() {
    const quantities = document.querySelectorAll(".quantity");
    const removeButtons = document.querySelectorAll(".remove-btn");

    quantities.forEach(input => {
        input.addEventListener("change", updateQuantity);
    });

    removeButtons.forEach(button => {
        button.addEventListener("click", removeCartItem);
    });
}

// Update item quantity
function updateQuantity(event) {
    const index = event.target.dataset.index;
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems[index].quantity = parseInt(event.target.value, 10);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    calculateTotal();
}

// Remove an item from the cart
function removeCartItem(event) {
    const index = event.target.dataset.index;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    loadCartItems();
}

// Calculate the total cost
function calculateTotal() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.querySelector(".cart-total h3").textContent = `Total: $${total.toFixed(2)}`;
    document.querySelector(".cart-total").style.display = total > 0 ? "block" : "none";
}

// Proceed to checkout
document.querySelector(".checkout-btn")?.addEventListener("click", () => {
    alert("Proceeding to checkout...");
    // Redirect to checkout page or trigger backend checkout process
});
function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(cartItem => cartItem.title === item.title);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.title} has been added to your cart!`);
}


localStorage.setItem("cart", JSON.stringify([
    { title: "Hell's Paradise", price: 19.99, quantity: 1, image: "https://s1.zerochan.net/Jigokuraku.600.3851361.jpg" },
    { title: "One Piece", price: 12.49, quantity: 2, image: "https://s1.zerochan.net/ONE.PIECE.600.4249233.jpg" }
]));
