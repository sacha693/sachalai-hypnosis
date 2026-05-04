/*
============================================================
 site.js（整理版）
------------------------------------------------------------
用途：
  - 統一管理全站 Header（頁首）與 Footer（頁尾）
  - 讓所有頁面共用同一套導覽與連結

你之後只需要改這一份，就可以影響整個網站
============================================================
*/


/* ============================================================
   1️⃣ 共用連結設定（最重要）
   ------------------------------------------------------------
   所有網址集中在這裡
   👉 未來只要改這裡，不用整份 JS 找來找去
============================================================ */

const LINKS = {
  home: 'index-integrated.html',
  about: 'about.html',
  services: 'index-integrated.html#services',

  appointment: 'appointment.html',
  reminder: 'friendly-reminder.html',
  form: 'https://forms.gle/7VM9YDXMJqLBtons5',

  relationship: 'luminous_oasis_hypnosis.html',
  selfExplore: 'relationship_test.html',
  pressure: 'luminous_oasis.html',

  facebook: 'https://www.facebook.com/profile.php?id=61566762881113',
  instagram: 'https://www.instagram.com/cgrs693/?hl=zh-tw'
};


/* ============================================================
   2️⃣ Header（頁首）
   ------------------------------------------------------------
   👉 控制：選單、品牌名稱、預約按鈕
============================================================ */

function renderHeader(){
  return `
  <div class="site-header">
    <div class="site-container">
      <div class="site-nav">

        <!-- 品牌 Logo / 名稱 -->
        <div class="site-nav-top">
          <a href="${LINKS.home}" class="brand">瑞光沙舟心流所</a>
        </div>

        <!-- 主選單 -->
        <div class="nav-links">
          <a href="${LINKS.home}">首頁</a>
          <a href="${LINKS.about}">關於</a>
          <a href="${LINKS.services}">服務主題</a>

          <!-- 下拉選單 -->
          <div class="dropdown">
            <button class="dropdown-toggle">個案回饋分享</button>
            <div class="dropdown-menu">
              <a href="${LINKS.relationship}">情感關係</a>
              <a href="${LINKS.selfExplore}">自我探索</a>
              <a href="${LINKS.pressure}">高成就壓力</a>
            </div>
          </div>

          <a href="${LINKS.appointment}">預約須知</a>
          <a href="${LINKS.reminder}">溫馨提醒</a>
        </div>

        <!-- CTA：最重要按鈕 -->
        <a href="${LINKS.form}" target="_blank" rel="noopener noreferrer" class="btn-primary nav-cta">預約探索</a>

      </div>
    </div>
  </div>`;
}


/* ============================================================
   3️⃣ Footer（頁尾）
   ------------------------------------------------------------
   👉 控制：品牌資訊 / 社群 / 預約入口
============================================================ */

function renderFooter(){
  return `
  <div class="footer">

    <div class="site-container footer-grid">

      <!-- 品牌簡介 -->
      <div>
        <h3>瑞光沙舟心流所</h3>
        <p>潛意識引導・自我覺察<br>台中・線上｜一對一陪伴</p>
      </div>

      <!-- 預約 -->
      <div>
        <h4>預約</h4>
        <a href="${LINKS.appointment}">預約須知</a>
        <a href="${LINKS.reminder}">溫馨提醒</a>
        <a href="${LINKS.form}" target="_blank" rel="noopener noreferrer">填寫預約表單</a>
      </div>

      <!-- 主題 -->
      <div>
        <h4>主題</h4>
        <a href="${LINKS.relationship}">情感關係</a>
        <a href="${LINKS.selfExplore}">自我探索</a>
        <a href="${LINKS.pressure}">高成就壓力</a>
      </div>

      <!-- 社群 -->
      <div>
        <h4>社群</h4>
        <a href="${LINKS.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="${LINKS.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="${LINKS.form}" target="_blank" rel="noopener noreferrer">LINE@／預約表單</a>
      </div>

    </div>

    <!-- 版權與合規聲明 -->
    <div class="site-container legal">
      © 2026 瑞光沙舟心流所 All Rights Reserved ｜ 本服務為自我覺察與潛意識探索引導，不涉及醫療或心理治療
    </div>

  </div>`;
}


/* ============================================================
   4️⃣ 初始化（把 Header / Footer 放進頁面）
============================================================ */

document.addEventListener('DOMContentLoaded', ()=>{

  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  // 插入頁首
  if(header){
    header.innerHTML = renderHeader();
  }

  // 插入頁尾
  if(footer){
    footer.innerHTML = renderFooter();
  }

});
