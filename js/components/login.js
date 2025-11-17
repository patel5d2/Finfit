document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('login-form');
    const loginGoogleButton = document.getElementById('login-google');
    const loginFacebookButton = document.getElementById('login-facebook');
    const createAccountLink = document.querySelector('.modal-footer a');
    const userProfile = document.querySelector('.navbar-nav .nav-item a[href="#user-profile"]');
    let isLoggedIn = false;
  
    // Show login modal on login button click
    loginButton.addEventListener('click', () => {
        if (!isLoggedIn) {
            const modalInstance = new bootstrap.Modal(loginModal);
            modalInstance.show();
        } else {
            // Handle logout
            isLoggedIn = false;
            userProfile.textContent = 'My Profile';
            loginButton.textContent = 'Login';
        }
    });
  
    // Handle login form submission
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;
  
      if (email && password) {
        // Simulate API call
        setTimeout(() => {
            isLoggedIn = true;
            userProfile.textContent = 'Welcome, User';
            loginButton.textContent = 'Logout';
            const modalInstance = bootstrap.Modal.getInstance(loginModal);
            modalInstance.hide();
        }, 1000);
      }
    });
  
    // Handle Google login
    loginGoogleButton.addEventListener('click', () => {
        // Simulate API call
        setTimeout(() => {
            isLoggedIn = true;
            userProfile.textContent = 'Welcome, User';
            loginButton.textContent = 'Logout';
            const modalInstance = bootstrap.Modal.getInstance(loginModal);
            modalInstance.hide();
        }, 1000);
    });
  
    // Handle Facebook login
    loginFacebookButton.addEventListener('click', () => {
        // Simulate API call
        setTimeout(() => {
            isLoggedIn = true;
            userProfile.textContent = 'Welcome, User';
            loginButton.textContent = 'Logout';
            const modalInstance = bootstrap.Modal.getInstance(loginModal);
            modalInstance.hide();
        }, 1000);
    });
  
    // Handle create account link click
    createAccountLink.addEventListener('click', (event) => {
      event.preventDefault();
      // Navigate to the registration page or show registration modal
      // Replace the following line with the actual navigation or modal display implementation
      console.log('Create account clicked');
    });
  });