// 封裝 dropdown 功能，方便重複使用
function setupDropdown(containerId, buttonId, menuId) {
    const container = document.getElementById(containerId);
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    if (!container || !button || !menu) {
        // 如果有任何一個元素找不到，就直接返回，避免錯誤
        return;
    }

    button.addEventListener('click', (event) => {
        // 阻止事件冒泡，避免觸發下面的 document 點擊事件
        event.stopPropagation();
        menu.classList.toggle('hidden');
    });

    // 點擊頁面其他地方時，隱藏這個選單
    document.addEventListener('click', (event) => {
        if (!menu.classList.contains('hidden') && !container.contains(event.target)) {
            menu.classList.add('hidden');
        }
    });
}

// --- 控制電腦版下拉選單 ---

// 設置 "開始你的旅程" 下拉選單
setupDropdown(
    'journey-dropdown-container-desktop', 
    'journey-button-desktop', 
    'journey-menu-desktop'
);

// ✨ 設置新的 "其它資源" 下拉選單
setupDropdown(
    'resources-dropdown-container-desktop',
    'resources-button-desktop',
    'resources-menu-desktop'
);


// --- 控制手機版漢堡選單 ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
