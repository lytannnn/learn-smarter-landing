// Preloader
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 1000);
  });
  
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  
  // Modal functionality
  function openModal() {
    const modal = document.getElementById("notifyModal");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  
  function closeModal() {
    const modal = document.getElementById("notifyModal");
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
  
  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("notifyModal");
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
  
  // Enhanced form submission handler with AJAX
  async function handleFormSubmit(formId, formType) {
    const form = document.getElementById(formId);
    
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        message: form.querySelector('[name="message"]')?.value || '',
        form_type: formType
      };
      
      // Validate form
      if (!validateForm(formData)) {
        return;
      }
      
      // Add loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
      
      try {
        const response = await fetch("mail.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        console.log(response)
        
        const result = await response.json();
        
        if (!response.ok) {
            console.log(response)
          throw new Error(result.message || "Server error");
        }
        
        // Show success message
        showAlert(result.message || "Thank you! We'll be in touch soon.", "success");
        
        // Reset form and close modal if applicable
        form.reset();
        if (formType === "modal") {
          closeModal();
        }
        
      } catch (error) {
        showAlert(error.message || "An error occurred. Please try again later.", "error");
        console.error("Form submission error:", error);
      } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }
  
  // Form validation
  function validateForm(formData) {
    const { name, email } = formData;
    
    if (!name.trim()) {
      showAlert("Please enter your name.", "error");
      return false;
    }
    
    if (!email.trim()) {
      showAlert("Please enter your email address.", "error");
      return false;
    }
    
    if (!validateEmail(email)) {
      showAlert("Please enter a valid email address.", "error");
      return false;
    }
    
    return true;
  }
  
  // Email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Show alert message
  function showAlert(message, type = "success") {
    // Remove any existing alerts
    const existingAlert = document.querySelector(".custom-alert");
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // Create alert element
    const alertEl = document.createElement("div");
    alertEl.className = `custom-alert ${type}`;
    alertEl.textContent = message;
    
    // Add to body
    document.body.appendChild(alertEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      alertEl.classList.add("fade-out");
      setTimeout(() => alertEl.remove(), 300);
    }, 5000);
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
  
  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  
  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize form handlers
    handleFormSubmit("contactForm", "contact");
    handleFormSubmit("modalForm", "modal");
    
    // Set up scroll animations
    const animateElements = document.querySelectorAll(".feature-card, .about-text, .contact-form-container");
    animateElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
    
    // Add CSS for custom alerts
    const style = document.createElement("style");
    style.textContent = `
      .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        max-width: 90%;
        width: 350px;
      }
      
      .custom-alert.success {
        background: #10B981;
      }
      
      .custom-alert.error {
        background: #EF4444;
      }
      
      .custom-alert.fade-out {
        animation: fadeOut 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  });