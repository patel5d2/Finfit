console.log('dark_mode.js: Script start');
document.addEventListener('componentsLoaded', () => {
    console.log('dark_mode.js: componentsLoaded event received');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) {
        console.warn('dark_mode.js: dark-mode-toggle element not found.');
        return;
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('isDarkMode', isDarkMode);
        console.log('dark_mode.js: Dark mode toggled to', isDarkMode);
    });

    const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        console.log('dark_mode.js: Dark mode initialized from localStorage.');
    }
});
console.log('dark_mode.js: Script end');