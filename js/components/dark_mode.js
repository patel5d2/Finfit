// Function to toggle dark mode
const toggleDarkMode = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save user's dark mode preference
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('isDarkMode', isDarkMode);
};

// Event listener for the dark mode toggle button
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Initialize dark mode preference from local storage
const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
if (isDarkMode) {
  toggleDarkMode();
}