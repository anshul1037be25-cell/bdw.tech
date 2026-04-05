// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Intersection Observer for scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(element => {
  observer.observe(element);
});

// Contact Form Submission (Simulation)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerText;

    btn.innerText = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        contactForm.innerHTML = `<div style="text-align:center; padding: 2rem;"><h3 class="text-gradient">Message Sent!</h3><p>${result.message}</p></div>`;
      } else {
        alert('Something went wrong. Please try again.');
        btn.innerText = originalText;
        btn.disabled = false;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message. Please ensure the server is running.');
      btn.innerText = originalText;
      btn.disabled = false;
    }
  });
}

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');

  navItems.forEach(item => {
    const itemPath = item.getAttribute('href');
    if (currentPath.endsWith(itemPath) || (currentPath.endsWith('/') && itemPath === 'index.html')) {
      item.classList.add('active');
    }
  });
});
