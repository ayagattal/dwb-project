
document.addEventListener("DOMContentLoaded", () => {
  // === MENU TOGGLE ===
  const menuToggle = document.querySelector(".nav-toggle");
  const menuContainer = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && menuContainer) {
    menuToggle.addEventListener("click", () => {
      menuContainer.classList.toggle("active");
      document.body.style.overflow = menuContainer.classList.contains("active") ? "hidden" : "";
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        menuContainer.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && menuContainer.classList.contains("active")) {
        menuContainer.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // === CART PANEL ===
  const cartTrigger = document.querySelector('.middle-item .nav-link');
  const cartPanel = document.querySelector('.cart-panel');
  const closeCart = document.querySelector('.close-cart');
  const cartOverlay = document.querySelector('.cart-overlay');
  const continueShoppingBtn = document.querySelector('.continue-shopping-btn');

  function openCartPanel() {
    cartPanel?.classList.add('active');
    cartOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartPanel() {
    cartPanel?.classList.remove('active');
    cartOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartTrigger?.addEventListener('click', function(e) {
    e.preventDefault();
    openCartPanel();
    menuContainer?.classList.remove('active');
  });

  closeCart?.addEventListener('click', closeCartPanel);
  cartOverlay?.addEventListener('click', closeCartPanel);
  continueShoppingBtn?.addEventListener('click', closeCartPanel);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartPanel?.classList.contains('active')) {
      closeCartPanel();
    }
  });

  // === CATEGORY FILTER ===
  const categoryButtons = document.querySelectorAll(".category-button");
  const productItems = document.querySelectorAll(".product-item");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedCategory = button.getAttribute("data-category");

      if (selectedCategory === "all") {
        productItems.forEach(item => item.style.display = "block");
      } else {
        productItems.forEach(item => {
          item.style.display = item.getAttribute("data-category") === selectedCategory ? "block" : "none";
        });
      }

      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});



document.querySelector('.go-back').addEventListener('click', function () {
  // Hide product detail section
  document.querySelector('.product-detail-section').style.display = 'none';

  // Show shop section again (or product grid if you want finer control)
  document.querySelector('.shop-all-section').style.display = 'block';
});

