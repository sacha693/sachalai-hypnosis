// --- 控制電腦版下拉選單的 JavaScript ---
const journeyButtonDesktop = document.getElementById('journey-button-desktop');
const journeyMenuDesktop = document.getElementById('journey-menu-desktop');
const journeyContainerDesktop = document.getElementById('journey-dropdown-container-desktop');

// 只有當元素存在時才綁定事件監聽，避免錯誤
if (journeyButtonDesktop) {
    journeyButtonDesktop.addEventListener('click', (event) => {
        // 阻止事件冒泡，這樣點擊按鈕不會觸發下面的 document 點擊事件
        event.stopPropagation(); 
        journeyMenuDesktop.classList.toggle('hidden');
    });
}

// 點擊頁面任何地方來關閉下拉選單
document.addEventListener('click', (event) => {
    // 檢查 journeyMenuDesktop 是否存在且當前不是隱藏狀態
    if (journeyMenuDesktop && !journeyMenuDesktop.classList.contains('hidden')) {
        // 如果點擊的目標不在下拉選單容器內
        if (!journeyContainerDesktop.contains(event.target)) {
            journeyMenuDesktop.classList.add('hidden');
        }
    }
});


// --- 控制手機版漢堡選單的 JavaScript ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
