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
// ===============================================
// 讓方案區塊具備 Tab 切換的互動功能 (新增)
// ===============================================

// 獲取所有按鈕 (方案選項) 和所有內容區塊
const pricingButtons = document.querySelectorAll('#pricing-tabs .pricing-button');
const pricingContents = document.querySelectorAll('#pricing-content-container .pricing-content');

function showPricingTab(targetTab) {
    // 1. 處理所有按鈕的樣式
    pricingButtons.forEach(button => {
        if (button.getAttribute('data-pricing') === targetTab) {
            // 點擊的按鈕設為「活躍」樣式
            button.classList.add('active-pricing-tab', 'bg-amber-500', 'text-white', 'hover:bg-amber-600', 'shadow-lg');
            button.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        } else {
            // 其他按鈕設為「非活躍」樣式
            button.classList.remove('active-pricing-tab', 'bg-amber-500', 'text-white', 'hover:bg-amber-600', 'shadow-lg');
            button.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        }
    });

    // 2. 處理內容區塊的顯示
    pricingContents.forEach(content => {
        if (content.getAttribute('data-content') === targetTab) {
            // 顯示目標內容
            content.classList.remove('hidden', 'opacity-0');
            content.classList.add('opacity-100');
        } else {
            // 隱藏其他內容 (使用 opacity-0 配合 transition 實現淡出效果)
            content.classList.add('hidden', 'opacity-0');
            content.classList.remove('opacity-100');
        }
    });
}

// 為每個按鈕添加點擊事件
pricingButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-pricing');
        showPricingTab(targetTab);
    });
});

// 確保頁面載入時預設顯示第一個 Tab 的內容
document.addEventListener('DOMContentLoaded', () => {
    const activePricingTab = document.querySelector('.active-pricing-tab');
    if (activePricingTab) {
        showPricingTab(activePricingTab.getAttribute('data-pricing'));
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('#pricing-tabs .pricing-button');
    const tabContents = document.querySelectorAll('#pricing-content-container .pricing-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-pricing');

            // 移除所有按鈕的 active 狀態
            tabButtons.forEach(btn => {
                btn.classList.remove('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
                btn.classList.add('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');
            });

            // 設置當前按鈕的 active 狀態
            this.classList.add('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
            this.classList.remove('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');

            // 隱藏所有內容區塊
            tabContents.forEach(content => {
                content.classList.remove('active-content');
                content.classList.add('hidden');
                // 為了過渡效果，先強制重繪
                void content.offsetWidth;
            });

            // 顯示目標內容區塊
            const activeContent = document.querySelector(`[data-content="${target}"]`);
            if (activeContent) {
                activeContent.classList.remove('hidden');
                activeContent.classList.add('active-content');
            }
        });
    });
    
    // 預設選中第一個 (潛意識探索)
    const defaultButton = document.querySelector('[data-pricing="explore"]');
    if(defaultButton) {
        defaultButton.click();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('#pricing-tabs .pricing-button');
    const tabContents = document.querySelectorAll('#pricing-content-container .pricing-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-pricing');

            // 移除所有按鈕的 active 狀態
            tabButtons.forEach(btn => {
                btn.classList.remove('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
                btn.classList.add('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');
            });

            // 設置當前按鈕的 active 狀態
            this.classList.add('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
            this.classList.remove('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');

            // 隱藏所有內容區塊
            tabContents.forEach(content => {
                content.classList.remove('active-content');
                content.classList.add('hidden');
                // 為了過渡效果，先強制重繪
                void content.offsetWidth;
            });

            // 顯示目標內容區塊
            const activeContent = document.querySelector(`[data-content="${target}"]`);
            if (activeContent) {
                activeContent.classList.remove('hidden');
                activeContent.classList.add('active-content');
            }
        });
    });
    
    // 預設選中第一個 (潛意識探索)
    const defaultButton = document.querySelector('[data-pricing="explore"]');
    if(defaultButton) {
        defaultButton.click();
    }
});
