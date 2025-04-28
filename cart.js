// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const cartIcon = document.getElementById('cart-icon');
  const cartPanel = document.querySelector('.cart-panel');
  const cartOverlay = document.querySelector('.cart-overlay');
  const closeCartBtn = document.querySelector('.close-cart');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const continueShoppingBtn = document.querySelector('.continue-shopping-btn');

  // Manage box buttons
  const addMoreBtn = document.querySelector('.add-more-btn');
  const removeSelectedBtn = document.querySelector('.remove-selected-btn');
  const clearBoxBtn = document.querySelector('.clear-box-btn');
  const updateCartBtn = document.querySelector('.update-cart-btn');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // Cart state
  let cart = [];

  // Open cart panel
  function openCart() {
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateCartDisplay();
  }

  // Close cart panel
  function closeCart() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Add item to cart
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        selected: false
      });
    }

    updateCartDisplay();
    updateCartCount();
    showNotification(`Added ${product.name} to your box!`);
  }

  // Remove item from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
  }

  // Update item quantity
  function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        updateCartDisplay();
      }
    }

    updateCartCount();
  }

  // Clear entire cart
  function clearCart() {
    if (confirm('Are you sure you want to clear all items from your box?')) {
      cart = [];
      updateCartDisplay();
      updateCartCount();
      cartItemsContainer.innerHTML = ''; // Make sure it's visually emptied
      cartTotal.textContent = 0;          // Reset total
    }
  }
  

  // Toggle item selection
  function toggleItemSelection(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.selected = !item.selected;
      updateCartDisplay();
    }
  }

  // Remove selected items
  function removeSelectedItems() {
    const hasSelected = cart.some(item => item.selected);

    if (!hasSelected) {
      alert('Please select items to remove first.');
      return;
    }

    if (confirm('Remove selected items from your box?')) {
      cart = cart.filter(item => !item.selected);
      updateCartDisplay();
      updateCartCount();
    }
  }

  // Update cart display
  function updateCartDisplay() {
    if (cart.length === 0) {
      emptyCartMessage.style.display = 'flex';
      cartItemsContainer.style.display = 'none';
      cartTotal.textContent = '0';
      return;
    }

    emptyCartMessage.style.display = 'none';
    cartItemsContainer.style.display = 'block';
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      if (item.selected) {
        cartItemElement.classList.add('selected');
      }

      cartItemElement.innerHTML = `
        <input type="checkbox" class="item-checkbox" ${item.selected ? 'checked' : ''}>
        <span class="item-name">${item.name}</span>
        <div class="item-controls">
          <button class="decrease-btn">−</button>
          <span class="item-qty">${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>
        <span class="item-price">${itemTotal} DZD</span>
        <button class="remove-btn"><i class="ri-delete-bin-line"></i></button>
      `;

      cartItemsContainer.appendChild(cartItemElement);

      const decreaseBtn = cartItemElement.querySelector('.decrease-btn');
      const increaseBtn = cartItemElement.querySelector('.increase-btn');
      const removeBtn = cartItemElement.querySelector('.remove-btn');
      const checkbox = cartItemElement.querySelector('.item-checkbox');

      decreaseBtn.addEventListener('click', () => updateQuantity(item.id, -1));
      increaseBtn.addEventListener('click', () => updateQuantity(item.id, 1));
      removeBtn.addEventListener('click', () => removeFromCart(item.id));
      checkbox.addEventListener('change', () => toggleItemSelection(item.id));
    });

    cartTotal.textContent = total.toString();
  }

  // Update cart count badge
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (totalItems > 0) {
      cartCount.style.display = 'flex';
    } else {
      cartCount.style.display = 'none';
    }
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 2000);
  }

  // Event Listeners
  cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    openCart();
  });

  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  continueShoppingBtn.addEventListener('click', closeCart);

  if (addMoreBtn) {
    addMoreBtn.addEventListener('click', closeCart);
  }

  if (removeSelectedBtn) {
    removeSelectedBtn.addEventListener('click', removeSelectedItems);
  }

  if (clearBoxBtn) {
    clearBoxBtn.addEventListener('click', clearCart);
  }

  if (updateCartBtn) {
    updateCartBtn.addEventListener('click', function() {
      updateCartDisplay();
      showNotification('Cart updated!');
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('Your box is empty. Add some items before checkout.');
        return;
      }
      alert('Proceeding to checkout!');
    });
  }

  // Add to cart buttons on product page
  const addToCartButtons = document.querySelectorAll('.add-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productItem = this.closest('.product-item');
      const productId = productItem.dataset.id || Math.random().toString(36).substr(2, 9);
      const productName = productItem.querySelector('.product-title').textContent;
      const productPriceText = productItem.querySelector('.product-price').textContent;
      const productPrice = parseInt(productPriceText.replace(/[^\d]/g, ''));
      
      addToCart({
        id: productId,
        name: productName,
        price: productPrice
      });
    });
  });

  // Initialize
  updateCartCount();
});

// Add this CSS to your stylesheet
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background-color: #eab161;
      color: white;
      padding: 12px 20px;
      border-radius: 30px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 2000;
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .notification.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .cart-item.selected {
      background-color: #fff0f5;
    }

    .item-checkbox {
      margin-right: 10px;
      cursor: pointer;
      width: 18px;
      height: 18px;
      accent-color: #ff6e91;
    }
  </style>
`);
