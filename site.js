/*
============================================================
 site.js（整理版）
============================================================ */

const LINKS = {
  home: 'index-integrated.html',
  about: 'about.html',
  services: 'index-integrated.html#services',
  appointment: 'appointment-final.html',
  reminder: 'friendly-reminder-new.html',
  form: 'https://forms.gle/7VM9YDXMJqLBtons5',
  relationship: 'luminous_oasis_hypnosis.html',
  selfExplore: 'relationship_test.html',
  pressure: 'luminous_oasis.html',
  resources: 'keygame.html',
  articles: 'https://cjrs693.wordpress.com/',
  facebook: 'https://www.facebook.com/profile.php?id=61566762881113',
  instagram: 'https://www.instagram.com/cgrs693/?hl=zh-tw'
};

function renderHeader(){
  return `
  <div class="site-header">
    <div class="site-container">
      <div class="site-nav">
        <div class="site-nav-top">
          <a href="${LINKS.home}" class="brand">瑞光沙舟心流所</a>
        </div>

        <div class="nav-links">
          <a href="${LINKS.home}">首頁</a>
          <a href="${LINKS.about}">關於</a>
          <a href="${LINKS.services}">服務主題</a>

          <div class="dropdown">
            <button class="dropdown-toggle" type="button">個案回饋分享</button>
            <div class="dropdown-menu">
              <a href="${LINKS.relationship}">情感關係</a>
              <a href="${LINKS.selfExplore}">自我探索</a>
              <a href="${LINKS.pressure}">高成就壓力</a>
            </div>
          </div>

          <a href="${LINKS.appointment}">預約須知</a>
          <a href="${LINKS.reminder}">溫馨提醒</a>
          <a href="${LINKS.articles}" target="_blank">文章分享</a>
        </div>

        <a href="${LINKS.appointment}" class="btn-primary">預約探索</a>
      </div>
    </div>
  </div>`;
}

function renderFooter(){
  return `
  <div class="footer">
    <div class="site-container footer-grid">
      <div>
        <h3>瑞光沙舟心流所</h3>
        <p>潛意識引導・自我覺察<br>台中・線上｜一對一陪伴</p>
      </div>

      <div>
        <h4>預約</h4>
        <a href="${LINKS.appointment}">預約須知</a>
        <a href="${LINKS.reminder}">溫馨提醒</a>
        <a href="${LINKS.form}" target="_blank">填寫預約表單</a>
      </div>

      <div>
        <h4>主題</h4>
        <a href="${LINKS.relationship}">情感關係</a>
        <a href="${LINKS.selfExplore}">自我探索</a>
        <a href="${LINKS.pressure}">高成就壓力</a>
        <a href="${LINKS.resources}">轉動思維</a>
      </div>

      <div>
        <h4>社群</h4>
        <a href="${LINKS.facebook}" target="_blank">Facebook</a>
        <a href="${LINKS.instagram}" target="_blank">Instagram</a>
        <a href="${LINKS.form}" target="_blank">LINE@／預約表單</a>
      </div>
    </div>

    <div class="site-container legal">
      © 2026 瑞光沙舟心流所 All Rights Reserved
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('site-header').innerHTML = renderHeader();
  document.getElementById('site-footer').innerHTML = renderFooter();
});
