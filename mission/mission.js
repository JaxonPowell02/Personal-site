document.addEventListener('DOMContentLoaded', function() {
    const themeSelector = document.getElementById('theme-toggle');
    const logo = document.getElementById('logo');

    // Function that changes the theme
    function changeTheme() {
        // Get the current selected value from the dropdown
        const selectedTheme = themeSelector.value;

        // If the selected value is "dark", apply dark theme
        if (selectedTheme === 'dark') {
            document.body.classList.add('dark');
            logo.src = logo.getAttribute('data-dark'); // Change to dark logo
        } else {
            // Otherwise, apply light theme
            document.body.classList.remove('dark');
            logo.src = logo.getAttribute('data-light'); // Change to light logo
        }
    }

    // Add event listener for dropdown value change to change the theme
    themeSelector.addEventListener('change', changeTheme);
    
    // Initialize the theme to light mode by default
    changeTheme();
});
