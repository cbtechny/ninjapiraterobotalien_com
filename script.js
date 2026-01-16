/**
 * NinjaPirate Studio - Main JavaScript
 * Handles shared component injection and site interactions
 */

// Track if mobile menu has been initialized to avoid duplicate listeners
let mobileMenuInitialized = false;

// Inject shared header and footer on page load
document.addEventListener('DOMContentLoaded', async () => {
  await injectComponents();
});

/**
 * Fetch and inject header and footer partials into the page
 */
async function injectComponents() {
  try {
    // Inject header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      const headerResponse = await fetch('/partials/header.html');
      if (headerResponse.ok) {
        headerPlaceholder.innerHTML = await headerResponse.text();
        highlightActiveNav();
      }
    }
    
    // Inject footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      const footerResponse = await fetch('/partials/footer.html');
      if (footerResponse.ok) {
        footerPlaceholder.innerHTML = await footerResponse.text();
      }
    }
    
    // Re-initialize mobile menu after header is injected
    initMobileMenu();
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

/**
 * Highlight active navigation item based on current page
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a, .footer-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (currentPath.includes(href) || 
        (currentPath.endsWith('index.html') && link.classList.contains('nav-home')) ||
        (currentPath === '/' && link.classList.contains('nav-home')))) {
      link.style.color = 'var(--color-accent)';
    }
  });
}

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
  // Prevent duplicate initialization
  if (mobileMenuInitialized) {
    return;
  }
  
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  
  if (toggle && nav) {
    // Mark as initialized immediately to prevent race conditions
    mobileMenuInitialized = true;
    
    // Add click event to toggle menu
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
      }
    });
  }
}
