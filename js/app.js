console.log('app.js: Script start');
import './pin.js';
import './dashboard.js';
import './link_account.js';
import './categorize.js';
import './budget.js';
import './investments.js';
import './credit_score.js';
import './stock_market.js';
import './dark_mode.js';

document.addEventListener('componentsLoaded', () => {
    console.log('app.js: componentsLoaded event received');
    const navLinks = document.querySelectorAll('.nav-link');
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const searchForm = document.querySelector('.form-inline');

    // Add smooth scrolling to nav links
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        
        navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');

        const target = event.target.getAttribute('href');
        if (target.startsWith('#')) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`app.js: Target element not found for smooth scroll: ${target}`);
            }
        } else {
            window.location.href = target;
        }
      });
    });

    // Initialize tooltips
    tooltips.forEach(tooltip => {
      if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        new bootstrap.Tooltip(tooltip);
      } else {
        console.warn('app.js: Bootstrap Tooltip not available.');
      }
    });

    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchInput = event.target.querySelector('input[type="search"]');
            const searchQuery = searchInput.value.trim();

            if (searchQuery.length > 0) {
                console.log(`app.js: Search query: ${searchQuery}`);
            } else {
                searchInput.focus();
            }
        });
    } else {
        console.warn('app.js: Search form not found.');
    }
  });
console.log('app.js: Script end');