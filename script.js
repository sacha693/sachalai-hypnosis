/*
 * ==========================================
 * 瑞光沙舟 - JavaScript 腳本 (script.js)
 * 負責所有互動邏輯
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 區塊滑入動畫效果 (Intersection Observer) ---
    // 讓內容在使用者捲動到時優雅地滑入
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2 // 當區塊 20% 進入畫面時觸發
    });
    document.querySelectorAll('.section-reveal').forEach(section => {
        observer.observe(section);
    });

    // --- 2. 服務項目卡片展開效果 (Accordion) ---
    // 點擊卡片標題時，切換 'active' class 來控制內容展開和 '+' 旋轉
    document.querySelectorAll('.card-expandable').forEach(card => {
        card.addEventListener('click', () => {
            // 由於 CSS 中已經定義了 .active 的樣式，這裡只需切換 class
            card.classList.toggle('active');
        });
    });

    // --- 3. 導覽列下拉選單功能 (桌面版) ---
    const journeyButtonDesktop = document.getElementById('journey-button-desktop');
    const journeyMenuDesktop = document.getElementById('journey-menu-desktop');
    const journeyContainerDesktop = document.getElementById('journey-dropdown-container-desktop');
    const resourcesButtonDesktop = document.getElementById('resources-button-desktop');
    const resourcesMenuDesktop = document.getElementById('resources-menu-desktop');
    const resourcesContainerDesktop = document.getElementById('resources-dropdown-container-desktop');

    // 輔助函數：關閉指定的選單
    const closeMenu = (menu) => {
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    };

    // 輔助函數：關閉除了當前打開之外的所有選單
    const closeOtherMenu = (currentMenu) => {
        if (currentMenu !== journeyMenuDesktop) {
            closeMenu(journeyMenuDesktop);
        }
        if (currentMenu !== resourcesMenuDesktop) {
            closeMenu(resourcesMenuDesktop);
        }
    };

    // a. 開始你的旅程 選單邏輯
    if (journeyButtonDesktop && journeyMenuDesktop) {
        journeyButtonDesktop.addEventListener('click', (event) => {
            event.stopPropagation();
            closeOtherMenu(journeyMenuDesktop); // 關閉其他選單
            const isHidden = journeyMenuDesktop.classList.toggle('hidden');
            journeyButtonDesktop.setAttribute('aria-expanded', !isHidden);
        });
    }

    // b. 其它資源 選單邏輯
    if (resourcesButtonDesktop && resourcesMenuDesktop) {
        resourcesButtonDesktop.addEventListener('click', (event) => {
            event.stopPropagation();
            closeOtherMenu(resourcesMenuDesktop); // 關閉其他選單
            const isHidden = resourcesMenuDesktop.classList.toggle('hidden');
            resourcesButtonDesktop.setAttribute('aria-expanded', !isHidden);
        });
    }
    
    // 點擊外部時關閉所有桌面下拉選單
    document.addEventListener('click', (event) => {
        // 檢查點擊是否在任一選單容器之外
        const isOutsideJourney = journeyContainerDesktop && !journeyContainerDesktop.contains(event.target);
        const isOutsideResources = resourcesContainerDesktop && !resourcesContainerDesktop.contains(event.target);
        
        if (isOutsideJourney) {
            closeMenu(journeyMenuDesktop);
            if (journeyButtonDesktop) journeyButtonDesktop.setAttribute('aria-expanded', 'false');
        }
        
        if (isOutsideResources) {
            closeMenu(resourcesMenuDesktop);
            if (resourcesButtonDesktop) resourcesButtonDesktop.setAttribute('aria-expanded', 'false');
        }
    });

    // --- 4. 手機版選單切換功能 (漢堡選單) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
