/**
 * ==========================================
 * 瑞光沙舟 - 整合腳本 (script.js)
 * 負責導覽列、FAQ、區塊動畫與方案 Tab 的所有互動邏輯
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

    // --- 3. 導覽列下拉選單功能 (桌面版) ---

    // a. 變數宣告與整合
    const allMenuDetails = [
        { 
            menu: document.getElementById('journey-menu-desktop'), 
            button: document.getElementById('journey-button-desktop'), 
            container: document.getElementById('journey-dropdown-container-desktop') 
        },
        { 
            menu: document.getElementById('resources-menu-desktop'), 
            button: document.getElementById('resources-button-desktop'), 
            container: document.getElementById('resources-dropdown-container-desktop') 
        },
        { 
            menu: document.getElementById('testimonials-menu-desktop'), 
            button: document.getElementById('testimonials-button-desktop'), 
            container: document.getElementById('testimonials-dropdown-container-desktop') 
        },
    ].filter(detail => detail.menu); // 過濾掉未在 HTML 中找到的元素

    // 輔助函數：關閉指定的選單並重置 aria 屬性
    const closeMenu = (menu, button) => {
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            // 處理第一個腳本中的過渡效果類別 (雖然建議使用 CSS transition)
            menu.classList.remove('visible'); 
            if (button) {
                button.setAttribute('aria-expanded', 'false');
                const icon = button.querySelector('[id$="-icon-desktop"]');
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        }
    };

    // 輔助函數：關閉除了當前點擊之外的所有選單
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
                
                // 1. 關閉所有其他已開啟的選單 (包含 FAQ)
                closeOtherMenu(detail.menu);
                closeAllFaqExcept(); // 確保 FAQ 也被關閉

                // 2. 切換當前選單的顯示狀態
                const isHidden = detail.menu.classList.toggle('hidden');
                detail.button.setAttribute('aria-expanded', !isHidden);
                
                // 處理過渡效果 (來自第一個腳本的邏輯)
                if (!isHidden) {
                    detail.menu.classList.remove('visible');
                } else {
                    setTimeout(() => detail.menu.classList.add('visible'), 10);
                }

                // 處理箭頭圖標旋轉 (來自第一個腳本的邏輯)
                const icon = detail.button.querySelector('[id$="-icon-desktop"]');
                if(icon) icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
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
            // 確保點擊行動版選單時，桌面下拉選單是關閉的
            allMenuDetails.forEach(detail => closeMenu(detail.menu, detail.button));
            closeAllFaqExcept(); // 確保 FAQ 也被關閉
        });
    }

    // --- 5. FAQ 收合功能 (手風琴效果) ---

    // 輔助函數：關閉所有 FAQ (可被其他選單邏輯調用)
    const closeAllFaqExcept = (currentQuestion = null) => {
        document.querySelectorAll('.qna-question[aria-expanded="true"]').forEach(q => {
            if (q !== currentQuestion) {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling?.classList.add('hidden');
                q.querySelector('.qna-icon').textContent = '+';
            }
        });
    };

    document.querySelectorAll('.qna-item').forEach((item, index) => {
        const question = item.querySelector('.qna-question');
        const answer = item.querySelector('.qna-answer');
        const icon = item.querySelector('.qna-icon');
        
        if (!question || !answer) return;

        // 設定必要的屬性確保無障礙 (A11Y)
        answer.id = `answer${index + 1}`;
        question.setAttribute('aria-controls', answer.id);
        question.setAttribute('aria-expanded', 'false');
        
        const toggleAnswer = () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // 關閉其他已展開的項目
            closeAllFaqExcept(question);
            // 關閉所有桌面下拉選單
            allMenuDetails.forEach(detail => closeMenu(detail.menu, detail.button));

            // 切換當前項目
            question.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('hidden');

            icon.textContent = !isExpanded ? '−' : '+';
        };

        question.addEventListener('click', toggleAnswer);
        
        // 支援鍵盤操作
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAnswer();
            }
        });
    });

    // --- 6. 方案區塊 Tab 切換功能 ---

    // 獲取所有按鈕 (方案選項) 和所有內容區塊
    const pricingButtons = document.querySelectorAll('#pricing-tabs .pricing-button');
    const pricingContents = document.querySelectorAll('#pricing-content-container .pricing-content');

    function showPricingTab(targetTab) {
        pricingButtons.forEach(button => {
            const isActive = button.getAttribute('data-pricing') === targetTab;
            
            // 1. 處理所有按鈕的樣式
            if (isActive) {
                button.classList.add('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
                button.classList.remove('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');
            } else {
                button.classList.remove('active-pricing-tab', 'bg-amber-600', 'text-white', 'shadow-xl');
                button.classList.add('text-gray-700', 'bg-white', 'hover:bg-amber-50', 'shadow-md', 'border', 'border-gray-200');
            }
        });

        // 2. 處理內容區塊的顯示
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
    // 預設選中第一個 (潛意識探索)
    const defaultButton = document.querySelector('[data-pricing="explore"]');
    if(defaultButton) {
        // 使用點擊事件來觸發樣式和內容顯示
        defaultButton.click();
    } else if (pricingButtons.length > 0) {
        // 如果沒有 'explore'，則預設點擊第一個按鈕
        pricingButtons[0].click();
    }
});
