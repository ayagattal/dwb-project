// contact.js - Contact Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get the Contact link from the menu
    // Make sure you've updated the href to "#contact" in your HTML
    const contactLink = document.querySelector('a[href="#contact"].nav-link');
    
    // Add event listener to Contact link
    if (contactLink) {
      contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        showContactModal();
      });
    }
    
    // Create and display the contact modal
    function showContactModal() {
      // Create the modal container
      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'contact-modal-overlay';
      
      // Create the modal content
      const modalContent = document.createElement('div');
      modalContent.className = 'contact-modal';
      
      // Set content for contact form
      modalContent.innerHTML = `
        <div class="contact-header">
          <h2>Contact Us</h2>
          <button class="close-contact-modal"><i class="ri-close-line"></i></button>
        </div>
        
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-intro">
              <h3>We'd love to hear from you!</h3>
              <p>Have questions about our products, want to place a special order, or just want to say hello? Fill out the form and we'll get back to you as soon as possible.</p>
            </div>
            
            <div class="contact-details">
              <div class="contact-detail-item">
                <i class="ri-map-pin-line"></i>
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Bakery Street, Flour District, City</p>
                </div>
              </div>
              
              <div class="contact-detail-item">
                <i class="ri-phone-line"></i>
                <div>
                  <h4>Call Us</h4>
                  <p>+123 456 7890</p>
                </div>
              </div>
              
              <div class="contact-detail-item">
                <i class="ri-mail-line"></i>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@happyoven.com</p>
                </div>
              </div>
              
              <div class="contact-detail-item">
                <i class="ri-time-line"></i>
                <div>
                  <h4>Opening Hours</h4>
                  <p>Mon-Fri: 7am - 7pm<br>Sat-Sun: 8am - 6pm</p>
                </div>
              </div>
            </div>
            
            <div class="social-links">
              <h4>Follow Us</h4>
              <div class="social-icons">
                <a href="#" class="social-icon"><i class="ri-facebook-fill"></i></a>
                <a href="#" class="social-icon"><i class="ri-instagram-line"></i></a>
                <a href="#" class="social-icon"><i class="ri-twitter-x-line"></i></a>
                <a href="#" class="social-icon"><i class="ri-pinterest-line"></i></a>
              </div>
            </div>
          </div>
          
          <div class="contact-form-container">
            <form id="contact-form" class="contact-form">
              <div class="form-group">
                <label for="contact-name">Full Name</label>
                <input type="text" id="contact-name" required>
              </div>
              
              <div class="form-group">
                <label for="contact-email">Email Address</label>
                <input type="email" id="contact-email" required>
              </div>
              
              <div class="form-group">
                <label for="contact-phone">Phone Number (Optional)</label>
                <input type="tel" id="contact-phone">
              </div>
              
              <div class="form-group">
                <label for="contact-subject">Subject</label>
                <select id="contact-subject" required>
                  <option value="" disabled selected>Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea id="contact-message" rows="5" required></textarea>
              </div>
              
              <div class="form-group checkbox-group">
                <input type="checkbox" id="contact-newsletter">
                <label for="contact-newsletter">Subscribe to our newsletter</label>
              </div>
              
              <button type="submit" class="contact-submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      `;
      
      // Add the modal to the body
      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);
      
      // Add event listeners
      setupContactModalEvents(modalOverlay, modalContent);
    }
    
    function setupContactModalEvents(overlay, modal) {
      // Close button functionality
      const closeBtn = modal.querySelector('.close-contact-modal');
      closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });
      
      // Close when clicking outside the modal
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
      
      // Handle form submission
      const contactForm = modal.querySelector('#contact-form');
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        const newsletter = document.getElementById('contact-newsletter').checked;
        
        // Here you would typically send this data to a server
        console.log('Contact form submitted:', { name, email, phone, subject, message, newsletter });
        
        // Show success message
        showContactMessage(modal, 'Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset the form
        contactForm.reset();
        
        // Close the modal after delay
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 3000);
      });
    }
    
    function showContactMessage(modal, message, type) {
      // Remove any existing message
      const existingMessage = modal.querySelector('.contact-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      // Create message element
      const messageElement = document.createElement('div');
      messageElement.className = `contact-message ${type}`;
      messageElement.textContent = message;
      
      // Find the form container
      const formContainer = modal.querySelector('.contact-form-container');
      
      // Insert before the form
      formContainer.insertBefore(messageElement, formContainer.firstChild);
      
      // Auto-scroll to the message
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });