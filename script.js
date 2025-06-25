document.addEventListener('DOMContentLoaded', function() {

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement;

    // بارگذاری تم ذخیره شده از حافظه مرورگر
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        // ذخیره تم جدید
        localStorage.setItem('theme', newTheme);
    });

    // --- Tab Functionality ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // حذف کلاس فعال از تمام دکمه‌ها و محتواها
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // افزودن کلاس فعال به دکمه کلیک شده
            button.classList.add('active');

            // نمایش محتوای متناظر
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
