console.log("Order script loaded"); // eventListener from lectures - sidebar toggle MDN (classList.toggle), W3 example cart //

let cart = JSON.parse(sessionStorage.getItem("cart")) || []; // cart state, lectures //

// tab function //
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".order-nav"); // lectures //
  const tabs = document.querySelectorAll(".tab-content");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.dataset.tab;
      const targetTab = document.getElementById(targetId);

      if (!targetTab) return;

      tabs.forEach((tab) => tab.classList.remove("active"));
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // activate clicked tab //
      targetTab.classList.add("active");
      link.classList.add("active");
    });
  });
});

// side bar toggle //
const cartSidebar = document.getElementById("cart-sidebar");
const cartToggle = document.getElementById("cart-toggle");

if (cartSidebar && cartToggle) {
  // open & close cart //
  cartToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // prevents instant close, MDN //
    cartSidebar.classList.toggle("open");
  });

  // close when clicking outside //
  document.addEventListener("click", function (e) {
    if (!cartSidebar.classList.contains("open")) return;

    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
      cartSidebar.classList.remove("open");
    }
  });
}

//add to cart button//
document.addEventListener("click", function (e) {
  const button = e.target.closest(".add-button");
  if (!button) return;

  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);

  addToCart(name, price);
});

//add to cart func //
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name); // check if item exists

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      // lectures + MDN arrays
      name: name,
      price: price,
      quantity: 1,
    });
  }

  console.log("Added:", name);
  console.log("Cart:", cart);

  sessionStorage.setItem("cart", JSON.stringify(cart)); // lectures
  renderCart();
}

// remove from cart //
document.addEventListener("click", function (e) {
  const removeBtn = e.target.closest(".remove-item");
  if (!removeBtn) return;

  const name = removeBtn.dataset.name;
  removeFromCart(name);
});

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);

  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// cart render //
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  // safety check
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const div = document.createElement("div");

    div.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button class="remove-item" data-name="${item.name}">remove</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

  if (cartCount) {
    cartCount.textContent = itemCount;
  }
}

/// clearing cart //
const clearCartBtn = document.getElementById("clear-cart"); // MDN

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    sessionStorage.removeItem("cart");
    renderCart();
  });
}

// inital render //
renderCart();
