document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        // Save the new theme to localStorage
        localStorage.setItem('theme', newTheme);
    });


    // --- Tab Functionality ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Show the corresponding content
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

});
