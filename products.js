// Product data
const products = [
  {
    id: 1,
    name: "",
    image: "choclate.jpg",
    price:300 ,
    category: "cookies",
    sold: 50,
    views: 0,
    reviews: []
  },
  {
    id: 2,
    name: "Chocolate Cake",
    image: "cake.jpg",
    price: 15,
    category: "cakes",
    sold: 32,
    views: 0,
    reviews: []
  }
  // You can add more products here
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const detailSection = document.querySelector('.product-detail-section');
const shopSection = document.querySelector('#shop');
const goBackButton = document.querySelector('.go-back');
const categoryButtons = document.querySelectorAll('.category-button');

// Initialize product items - add click events to show product details
function initializeProductItems() {
  document.querySelectorAll('.product-item').forEach((item) => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      const productItems = document.querySelectorAll(`.product-item[data-category="${category}"]`);
      const index = Array.from(productItems).indexOf(item);
      
      // Find matching product from our products array
      const matchingProducts = products.filter(p => p.category === category);
      if (matchingProducts && matchingProducts[index]) {
        showProductDetail(matchingProducts[index]);
      }
    });
  });
}

// Show product detail view
function showProductDetail(product) {
  product.views++;
  shopSection.style.display = 'none';
  detailSection.style.display = 'block';

  document.getElementById('detail-image').src = product.image;
  document.getElementById('detail-name').textContent = product.name;
  document.getElementById('detail-price').textContent = `${product.price} DZ`;
  document.getElementById('detail-views').textContent = `Views: ${product.views}`;
  document.getElementById('detail-sold').textContent = `Sold: ${product.sold}`;

  // Display reviews if they exist
  if (product.reviews && product.reviews.length > 0) {
    const reviewsList = document.createElement('ul');
    reviewsList.id = 'reviews-list';
    reviewsList.className = 'reviews-list';
    
    product.reviews.forEach(r => {
      const li = document.createElement('li');
      li.textContent = `⭐ ${r.rating} - ${r.comment}`;
      reviewsList.appendChild(li);
    });
    
    // Find the reviews section and append the list
    const reviewsSection = document.querySelector('.reviews');
    // Clear previous reviews
    const existingList = document.getElementById('reviews-list');
    if (existingList) {
      existingList.remove();
    }
    reviewsSection.appendChild(reviewsList);
  }
}

// Go back to shop from product detail view
if (goBackButton) {
  goBackButton.addEventListener('click', () => {
    detailSection.style.display = 'none';
    shopSection.style.display = 'block';
  });
}

// Filter products by category
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    
    // Remove active class from all buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Show all products if 'all' category is selected
    if (category === 'all') {
      document.querySelectorAll('.product-item').forEach(item => {
        item.style.display = 'block';
      });
    } else {
      // Show only products of selected category
      document.querySelectorAll('.product-item').forEach(item => {
        if (item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  });
});

// Rating stars functionality
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-rating'));
    
    // Reset all stars
    document.querySelectorAll('.star').forEach(s => {
      s.classList.remove('ri-star-fill');
      s.classList.add('ri-star-line');
    });
    
    // Fill stars up to the selected rating
    for (let i = 1; i <= rating; i++) {
      const starToFill = document.querySelector(`.star[data-rating="${i}"]`);
      starToFill.classList.remove('ri-star-line');
      starToFill.classList.add('ri-star-fill');
    }
    
    // Store the current rating
    document.querySelector('.rating-stars').setAttribute('data-current-rating', rating);
  });
});

// Submit review
document.querySelector('.submit-review-btn').addEventListener('click', () => {
  const productName = document.getElementById('detail-name').textContent;
  const rating = parseInt(document.querySelector('.rating-stars').getAttribute('data-current-rating') || 0);
  const comment = document.getElementById('review-message').value.trim();
  
  if (rating === 0 || comment === '') {
    alert('Please provide both a rating and a comment');
    return;
  }
  
  const product = products.find(p => p.name === productName);
  if (product) {
    // Initialize reviews array if it doesn't exist
    if (!product.reviews) {
      product.reviews = [];
    }
    
    // Add the review
    product.reviews.push({ rating, comment });
    
    // Update the display
    showProductDetail(product);
    
    // Reset form
    document.querySelectorAll('.star').forEach(s => {
      s.classList.remove('ri-star-fill');
      s.classList.add('ri-star-line');
    });
    document.querySelector('.rating-stars').removeAttribute('data-current-rating');
    document.getElementById('review-message').value = '';
    
    alert('Thank you for your review!');
  }
});

// Add to cart functionality for product detail page
document.querySelector('.add-to-cart-detail').addEventListener('click', () => {
  const productName = document.getElementById('detail-name').textContent;
  const product = products.find(p => p.name === productName);
  if (product) {
    console.log(`Added ${product.name} to cart`);
    // Here you would add the product to the cart array
    // and update cart display
    alert(`${product.name} added to cart!`);
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeProductItems();
});