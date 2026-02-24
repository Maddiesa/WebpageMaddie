console.log("Order script loaded");
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".order-nav");
  const tabs = document.querySelectorAll(".tab-content");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("data-tab");
      const targetTab = document.getElementById(targetId);

      if (!targetTab) return;

      tabs.forEach((tab) => tab.classList.remove("active"));
      navLinks.forEach((l) => l.classList.remove("active"));

      targetTab.classList.add("active");
      link.classList.add("active");
    });
  });
});
