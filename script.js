document.addEventListener('DOMContentLoaded', function() {

    // --- بخش ۱: مدیریت تم (روشن/تاریک) ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- بخش ۲: بارگذاری و ساخت محتوای پویا از فایل JSON ---
    const tabsContainer = document.querySelector('.tabs');
    const mainContainer = document.querySelector('main');

    // تابع اصلی برای بارگذاری اطلاعات از JSON
    async function loadWebsites() {
        try {
            const response = await fetch('websites.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const categories = await response.json();
            buildPageContent(categories);
        } catch (error) {
            console.error("خطا در بارگذاری فایل websites.json:", error);
            mainContainer.innerHTML = '<p style="text-align: center; color: red;">متاسفانه در بارگذاری اطلاعات مشکلی پیش آمد.</p>';
        }
    }

    // تابع برای ساخت زبانه‌ها و کاشی‌ها بر اساس داده‌های دریافتی
    function buildPageContent(categories) {
        if (!categories || categories.length === 0) {
            mainContainer.innerHTML = '<p style="text-align: center;">هیچ دسته‌بندی برای نمایش وجود ندارد.</p>';
            return;
        }

        categories.forEach((category, index) => {
            // ۱. ساخت دکمه زبانه
            const tabButton = document.createElement('button');
            tabButton.className = 'tab-button';
            tabButton.textContent = category.categoryName;
            tabButton.dataset.tab = category.categoryId;
            
            // ۲. ساخت پنل محتوا برای هر زبانه
            const contentPane = document.createElement('div');
            contentPane.className = 'tab-content';
            contentPane.id = category.categoryId;
            
            const tilesGrid = document.createElement('div');
            tilesGrid.className = 'tiles-grid';

            // ۳. ساخت کاشی‌ها برای هر سایت در دسته‌بندی
            if (category.sites && category.sites.length > 0) {
                category.sites.forEach(site => {
                    const tile = document.createElement('a');
                    tile.className = 'tile';
                    tile.href = site.url;
                    tile.target = '_blank';
                    tile.textContent = site.name;
                    tilesGrid.appendChild(tile);
                });
            } else {
                tilesGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">هنوز سایتی در این دسته ثبت نشده است.</p>';
            }
            
            contentPane.appendChild(tilesGrid);

            // فعال کردن اولین زبانه به صورت پیش‌فرض
            if (index === 0) {
                tabButton.classList.add('active');
                contentPane.classList.add('active');
            }

            tabsContainer.appendChild(tabButton);
            mainContainer.appendChild(contentPane);
        });

        // بعد از ساخت تمام دکمه‌ها، قابلیت کلیک را به آن‌ها اضافه می‌کنیم
        setupTabListeners();
    }
    
    // تابع برای مدیریت کلیک روی زبانه‌ها
    function setupTabListeners() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const targetContent = document.getElementById(button.dataset.tab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // اجرای تابع اصلی برای شروع
    loadWebsites();
});
