console.log("Order script loaded");

let cart = [];
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

// cart logic //
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-button")) {
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);

    addToCart(name, price);
  }
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
}

// cart rendering //
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotalContainer) return;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
${item.name} x${item.quantity} -$${itemTotal.toFixed(2)}
`;
    cartItemsContainer.appendChild(div);
  });

  cartTotalContainer.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}
