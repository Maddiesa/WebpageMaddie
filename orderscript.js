console.log("Order script loaded");

let cart = []; // cart state //

// tab functional //
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".order-nav");
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

// Click listener for add buttons
document.addEventListener("click", function (e) {
  const button = e.target.closest(".add-button");
  if (!button) return;

  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);

  addToCart(name, price);
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  console.log("Added:", name);
  console.log("Cart:", cart);

  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  // VERY IMPORTANT SAFETY CHECK
  if (!cartItems || !cartTotal)
    //console.log("Cart elements not found. Skipping render."); //
    return;

  cartItems.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const div = document.createElement("div");
    div.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;

  if (cartCount) {
    cartCount.textContent = itemCount;
  }
}
const cartSidebar = document.getElementById("cart-sidebar");
const cartToggle = document.getElementById("cart-toggle");

if (cartToggle && cartSidebar) {
  console.log("Cart toggle and sidebar found");
  cartToggle.addEventListener("click", () => {
    cartSidebar.classList.toggle("open");
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartToggle = document.getElementById("cart-toggle");

  if (!cartSidebar || !cartToggle) {
    console.error("Cart toggle or sidebar not found.");
    return;
  }

  cartToggle.addEventListener("click", function () {
    cartSidebar.classList.toggle("open");
    console.log("Cart toggled");
  });
});
