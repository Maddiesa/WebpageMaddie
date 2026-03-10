console.log("Order script loaded"); // eventListener from lectures - side bar toggle mdn (classList.toggle), w3 for js example of cart. //

let cart = JSON.parse(sessionStorage.getItem("cart")) || []; // cart state, lectures //

// tab functional //
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".order-nav"); //lectures //
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
//cart toggle //
const cartSidebar = document.getElementById("cart-sidebar");
const cartToggle = document.getElementById("cart-toggle");

if (cartSidebar && cartToggle) {
  //open n close cart, some prev knowledge from foundations of programming //
  cartToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // prevents insta close, mdn //
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
// Click listener for add buttons
document.addEventListener("click", function (e) {
  const button = e.target.closest(".add-button");
  if (!button) return;

  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);

  addToCart(name, price);
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name); // find to check if item exists
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      // lectures + mdn for arrays
      name: name,
      price: price,
      quantity: 1,
    });
  }

  console.log("Added:", name);
  console.log("Cart:", cart);

  renderCart();
  sessionStorage.setItem("cart", JSON.stringify(cart)); // lectures
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
const clearCartBtn = document.getElementById("clear-cart"); // mdn

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    sessionStorage.removeItem("cart");
    renderCart();
  });
}

renderCart();
