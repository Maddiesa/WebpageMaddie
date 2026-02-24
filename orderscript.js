const navLinks = document.querySelectorAll(".order-nav");
const tabs = document.querySelectorAll(".tab-content");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // remove active class from all links and tabs
    navLinks.forEach((link) => link.classList.remove("active"));
    tabs.forEach((tab) => tab.classList.remove("active"));
    // active clicked //
    this.classList.add("active");
    const target = document.getElementById(this.dataset.tab);
    if (target) {
      target.classList.add("active");
    }
  });
});
