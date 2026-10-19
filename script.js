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
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    const promises = [];

    // Fetch header
    if (headerPlaceholder) {
      promises.push(
        fetch('/partials/header.html')
          .then(response => {
             if (response.ok) return response.text();
             throw new Error('Failed to load header');
          })
          .then(html => {
            headerPlaceholder.innerHTML = html;
            highlightActiveNav();
          })
          .catch(error => console.error('Header load error:', error))
      );
    }

    // Fetch footer
    if (footerPlaceholder) {
      promises.push(
        fetch('/partials/footer.html')
          .then(response => {
            if (response.ok) return response.text();
            throw new Error('Failed to load footer');
          })
          .then(html => {
            footerPlaceholder.innerHTML = html;
          })
          .catch(error => console.error('Footer load error:', error))
      );
    }

    // Wait for all injections to complete
    await Promise.all(promises);

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
    // Add click event to toggle menu
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu when clicking on nav items
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const isToggleOrNav = toggle.contains(e.target) || nav.contains(e.target);
      if (!isToggleOrNav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        toggle.classList.remove('active');
      }
    });

    // Mark as initialized after all event listeners are successfully added
    mobileMenuInitialized = true;
  }
}
