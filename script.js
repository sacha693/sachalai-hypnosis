/**
 * ==========================================
 * 瑞光沙舟 - 修正後的最終整合腳本 (script.js)
 * 確保所有桌面導覽列下拉選單都能正常運作且互斥
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- A. 全域變數與列表：統一下拉選單管理 ---
    // 註冊所有桌面下拉選單的 ID，確保所有函數都能正確引用和管理
    const DESKTOP_DROPDOWNS = [
        { 
            buttonId: 'journey-button-desktop', 
            menuId: 'journey-menu-desktop', 
            containerId: 'journey-dropdown-container-desktop' 
        },
        { 
            buttonId: 'resources-button-desktop', 
            menuId: 'resources-menu-desktop', 
            containerId: 'resources-dropdown-container-desktop' 
        },
        // 如果有第三個或更多的選單，請在這裡新增：
        { 
            buttonId: 'testimonials-button-desktop', 
            menuId: 'testimonials-menu-desktop', 
            containerId: 'testimonials-dropdown-container-desktop' 
        },
    ];

    // --- B. 輔助函數：關閉/開啟選單的標準化流程 ---

    // 關閉單個選單的標準函數
    const closeSingleDropdown = (menu, button) => {
        const icon = button ? button.querySelector('svg') : null;
        
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            menu.classList.remove('visible'); // 移除動畫類別
            if (icon) icon.style.transform = 'rotate(0deg)';
            if (button) button.setAttribute('aria-expanded', 'false');
        }
    };

    // 關閉所有桌面下拉選單 (供 FAQ 和行動版選單調用)
    const closeDesktopDropdowns = () => {
        DESKTOP_DROPDOWNS.forEach(detail => {
            const menu = document.getElementById(detail.menuId);
            const button = document.getElementById(detail.buttonId);
            closeSingleDropdown(menu, button);
        });
    };

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

    // --- 2. 服務項目卡片展開效果 (簡易 Toggle) ---
    document.querySelectorAll('.card-expandable').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });
    
    // --- 3. 導覽列下拉選單功能 (桌面版 - 修正後的互斥邏輯) ---

    DESKTOP_DROPDOWNS.forEach(detail => {
        const button = document.getElementById(detail.buttonId);
        const menu = document.getElementById(detail.menuId);
        const container = document.getElementById(detail.containerId);
        const icon = button ? button.querySelector('svg') : null; 

        if (button && menu) {

            // a. 點擊按鈕事件
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                
                const isHidden = menu.classList.contains('hidden');
                
                // 1. 關閉所有 FAQ
                closeAllFaq();

                // 2. 關閉所有 *其他* 桌面下拉選單 (實現互斥)
                DESKTOP_DROPDOWNS.forEach(otherDetail => {
                    if (otherDetail.menuId !== detail.menuId) {
                        const otherMenu = document.getElementById(otherDetail.menuId);
                        const otherButton = document.getElementById(otherDetail.buttonId);
                        closeSingleDropdown(otherMenu, otherButton);
                    }
                });
                
                // 3. 切換當前選單
                if (isHidden) {
                    menu.classList.remove('hidden');
                    setTimeout(() => menu.classList.add('visible'), 10);
                    if (icon) icon.style.transform = 'rotate(180deg)';
                    button.setAttribute('aria-expanded', 'true');
                } else {
                    closeSingleDropdown(menu, button);
                }
            });

            // b. 點擊外部關閉選單
            document.addEventListener('click', (event) => {
                if (container && !container.contains(event.target)) {
                    closeSingleDropdown(menu, button);
                }
            });
        }
    });


    // --- 4. 行動版選單切換 (漢堡選單) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // 關閉桌面選單和 FAQ (使用輔助函數)
            closeDesktopDropdowns();
            closeAllFaq();
        });
    }

    // --- 5. Q&A 手風琴互動邏輯 (帶有 CSS 動畫的收合/展開) ---
    
    // 輔助函數：關閉所有 FAQ (供導覽列和行動版選單調用)
    const closeAllFaq = () => {
        document.querySelectorAll('.qna-item.active').forEach(item => {
            const answer = item.querySelector('.qna-answer');
            const icon = item.querySelector('.qna-icon');
            const question = item.querySelector('.qna-question');

            if (answer) {
                answer.classList.remove('visible-animate');
                // 確保只觸發一次 hidden 添加
                const handler = () => {
                    answer.classList.add('hidden');
                    answer.removeEventListener('transitionend', handler);
                };
                answer.addEventListener('transitionend', handler, {once: true});
            }
            if (icon) icon.textContent = '+';
            if (question) question.setAttribute('aria-expanded', 'false');
            item.classList.remove('active');
        });
    };

    const qnaItems = document.querySelectorAll('.qna-item');
    
    qnaItems.forEach((item, index) => {
        const question = item.querySelector('.qna-question');
        const answer = item.querySelector('.qna-answer');
        const icon = item.querySelector('.qna-icon');
        
        if (!question || !answer) return;

        // 設定無障礙屬性 (A11Y)
        answer.id = `qna-answer-${index + 1}`;
        question.setAttribute('aria-controls', answer.id);
        question.setAttribute('aria-expanded', 'false');

        const toggleQna = () => {
            const isHidden = answer.classList.contains('hidden');
            
            // 點擊 FAQ 時，關閉所有桌面下拉選單
            closeDesktopDropdowns();

            // 關閉所有其他已開啟的答案 (手風琴效果)
            document.querySelectorAll('.qna-item.active').forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.qna-answer');
                    const otherIcon = otherItem.querySelector('.qna-icon');
                    const otherQuestion = otherItem.querySelector('.qna-question');
                    
                    if (otherAnswer) {
                        otherAnswer.classList.remove('visible-animate');
                        otherAnswer.addEventListener('transitionend', function handler() {
                            otherAnswer.classList.add('hidden');
                            otherAnswer.removeEventListener('transitionend', handler);
                        }, {once: true});
                    }
                    if (otherIcon) otherIcon.textContent = '+';
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    otherItem.classList.remove('active');
                }
            });
            
            // 切換目前點擊的答案的顯示狀態和動畫
            if (isHidden) {
                // 展開
                answer.classList.remove('hidden');
                setTimeout(() => {
                    answer.classList.add('visible-animate');
                }, 10);
                
                icon.textContent = '×'; // 展開時顯示 '×'
                question.setAttribute('aria-expanded', 'true');
                item.classList.add('active');
            } else {
                // 收合
                answer.classList.remove('visible-animate');
                answer.addEventListener('transitionend', function handler() {
                    answer.classList.add('hidden');
                    answer.removeEventListener('transitionend', handler);
                }, {once: true});

                icon.textContent = '+'; // 收合時顯示 '+'
                question.setAttribute('aria-expanded', 'false');
                item.classList.remove('active');
            }
        };

        question.addEventListener('click', toggleQna);
        
        // 支援鍵盤操作
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleQna();
            }
        });
    });

    // --- 6. 方案區塊 Tab 切換功能 ---

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
    const defaultButton = document.querySelector('[data-pricing="explore"]');
    if(defaultButton) {
        defaultButton.click();
    } else if (pricingButtons.length > 0) {
        pricingButtons[0].click();
    }
});
