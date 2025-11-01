/*
 * ==========================================
 * 瑞光沙舟 - JavaScript 腳本 (script.js)
 * 負責所有互動邏輯
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 區塊滑入動畫效果 (Intersection Observer) ---
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
    document.querySelectorAll('.card-expandable').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // --- 3. 導覽列下拉選單功能 (桌面版) 【重點優化區塊】 ---
    
    // a. 變數宣告與整合
    const journeyButtonDesktop = document.getElementById('journey-button-desktop');
    const journeyMenuDesktop = document.getElementById('journey-menu-desktop');
    const journeyContainerDesktop = document.getElementById('journey-dropdown-container-desktop');
    
    const resourcesButtonDesktop = document.getElementById('resources-button-desktop');
    const resourcesMenuDesktop = document.getElementById('resources-menu-desktop');
    const resourcesContainerDesktop = document.getElementById('resources-dropdown-container-desktop');

    // 【新增的個案回饋變數】
    const testimonialsButtonDesktop = document.getElementById('testimonials-button-desktop');
    const testimonialsMenuDesktop = document.getElementById('testimonials-menu-desktop');
    const testimonialsContainerDesktop = document.getElementById('testimonials-dropdown-container-desktop');

    // 彙整所有選單的參考 (統一管理所有選單邏輯，避免遺漏或衝突)
    const allMenuDetails = [
        { menu: journeyMenuDesktop, button: journeyButtonDesktop, container: journeyContainerDesktop },
        { menu: resourcesMenuDesktop, button: resourcesButtonDesktop, container: resourcesContainerDesktop },
        { menu: testimonialsMenuDesktop, button: testimonialsButtonDesktop, container: testimonialsContainerDesktop },
    ].filter(detail => detail.menu); // 過濾掉未在 HTML 中找到的元素

    // 輔助函數：關閉指定的選單
    const closeMenu = (menu, button) => {
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            if (button) button.setAttribute('aria-expanded', 'false');
        }
    };

    // 輔助函數：關閉除了當前點擊之外的所有選單 (實現點擊自動收回)
    const closeOtherMenu = (currentMenu) => {
        allMenuDetails.forEach(detail => {
            if (detail.menu && detail.menu !== currentMenu) {
                closeMenu(detail.menu, detail.button);
            }
        });
    };

    // b. 為每個選單按鈕添加點擊事件邏輯
    allMenuDetails.forEach(detail => {
        if (detail.button && detail.menu) {
            detail.button.addEventListener('click', (event) => {
                event.stopPropagation();
                
                // 1. 先關閉所有其他已開啟的選單
                closeOtherMenu(detail.menu); 
                
                // 2. 切換當前選單的顯示狀態
                const isHidden = detail.menu.classList.toggle('hidden');
                detail.button.setAttribute('aria-expanded', !isHidden);
            });
        }
    });
    
    // c. 點擊外部時關閉所有桌面下拉選單
    document.addEventListener('click', (event) => {
        allMenuDetails.forEach(detail => {
            if (detail.container && detail.menu) {
                // 檢查點擊是否在選單容器(包含按鈕和下拉內容)之外
                if (!detail.container.contains(event.target)) {
                    closeMenu(detail.menu, detail.button);
                }
            }
        });
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
// 讓方案區塊具備 Tab 切換的互動功能 (精簡與優化)
// ===============================================

// 獲取所有按鈕 (方案選項) 和所有內容區塊
const pricingButtons = document.querySelectorAll('#pricing-tabs .pricing-button');
const pricingContents = document.querySelectorAll('#pricing-content-container .pricing-content');

function showPricingTab(targetTab) {
    pricingButtons.forEach(button => {
        const isActive = button.getAttribute('data-pricing') === targetTab;
        
        // 1. 處理所有按鈕的樣式 (統一使用第二套更詳細的樣式邏輯)
        if (isActive) {
            button.classList.add('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
            button.classList.remove('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');
        } else {
            button.classList.remove('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
            button.classList.add('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');
        }
    });

    // 2. 處理內容區塊的顯示 (統一使用第二套更詳細的樣式邏輯)
    pricingContents.forEach(content => {
        const isTarget = content.getAttribute('data-content') === targetTab;
        
        if (isTarget) {
            content.classList.remove('hidden');
            content.classList.add('active-content');
        } else {
            content.classList.remove('active-content');
            content.classList.add('hidden');
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
    // 預設選中第一個 (潛意識探索)
    const defaultButton = document.querySelector('[data-pricing="explore"]');
    if(defaultButton) {
        // 呼叫點擊事件以確保樣式和內容都正確顯示
        defaultButton.click();
    } else if (pricingButtons.length > 0) {
        // 如果沒有 'explore'，則預設點擊第一個按鈕
        pricingButtons[0].click();
    }
});
