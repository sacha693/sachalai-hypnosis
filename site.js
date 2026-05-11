/*
============================================================
 site.js（品牌共用版）
 - 統一管理全站 Header / Footer / 導覽連結
 - 搭配深海星夜藍 × 星霧極光 × 水波流動品牌 CSS
============================================================ */

const LINKS = {
  home: 'index.html',
  about: 'about.html',
  services: 'index.html#services',
  appointment: 'appointment-final.html',
  reminder: 'friendly-reminder-new.html',
  form: 'https://forms.gle/7VM9YDXMJqLBtons5',
  relationship: 'relationship-hypnosis-new.html',
  selfExplore: 'relationship_test.html',
  pressure: 'luminous-oasis-new.html',
  resources: 'keygame.html',
  articles: 'https://cjrs693.wordpress.com/',
  facebook: 'https://www.facebook.com/profile.php?id=61566762881113',
  instagram: 'https://www.instagram.com/cgrs693/?hl=zh-tw',
  terms: 'terms.html',
  privacy: 'privacy.html',
  cookies: 'cookies.html',
  logo: 'https://github.com/sacha693/sachalai-hypnosis/blob/main/LOGO.png?raw=true'
};

function renderHeader(){
  return `
  <div class="site-header">
    <div class="site-container">
      <div class="site-nav">
        <div class="site-nav-top">
          <a href="${LINKS.home}" class="brand brand-with-logo" aria-label="回到瑞光沙舟心流所首頁">
            <img src="${LINKS.logo}" alt="瑞光沙舟心流所 Logo" class="brand-logo">
            <span>瑞光沙舟心流所</span>
          </a>
          <button class="mobile-menu-toggle" type="button" aria-label="開啟選單" aria-expanded="false">☰</button>
        </div>

        <div class="nav-links" id="main-nav-links">
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

          <div class="dropdown">
            <button class="dropdown-toggle" type="button">預約探索</button>
            <div class="dropdown-menu">
              <a href="${LINKS.appointment}">預約前須知</a>
              <a href="${LINKS.form}" target="_blank" rel="noopener noreferrer">填寫預約表單</a>
              <a href="${LINKS.reminder}">預約後叮嚀</a>
            </div>
          </div>

          <a href="${LINKS.articles}" target="_blank" rel="noopener noreferrer">文章分享</a>
        </div>

        <a href="${LINKS.appointment}" class="btn-primary nav-cta">先了解這段旅程</a>
      </div>
    </div>
  </div>`;
}

function renderFooter(){
  return `
  <div class="footer">
    <div class="site-container footer-grid">
      <div class="footer-brand-block">
        <img src="${LINKS.logo}" alt="瑞光沙舟心流所 Logo" class="footer-logo">
        <h3>瑞光沙舟心流所</h3>
        <p>潛意識引導・自我覺察<br>台中・線上｜一對一陪伴</p>
        <p class="footer-poem">承載著希盼，靜靜地抵達瑞光沙舟。</p>
      </div>
      <div><h4>預約</h4><a href="${LINKS.appointment}">預約前須知</a><a href="${LINKS.reminder}">預約後叮嚀</a><a href="${LINKS.form}" target="_blank" rel="noopener noreferrer">填寫預約表單</a></div>
      <div><h4>主題</h4><a href="${LINKS.relationship}">情感關係</a><a href="${LINKS.selfExplore}">自我探索</a><a href="${LINKS.pressure}">高成就壓力</a><a href="${LINKS.resources}">轉動思維</a></div>
      <div><h4>社群</h4><a href="${LINKS.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a><a href="${LINKS.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a><a href="${LINKS.form}" target="_blank" rel="noopener noreferrer">LINE@／預約表單</a></div>
    </div>
    <div class="site-container legal">
      <div>© 2026 瑞光沙舟心流所 All Rights Reserved</div>
      <div class="legal-links">
        <a href="${LINKS.terms}">服務條款</a>
        <span>／</span>
        <a href="${LINKS.privacy}">隱私權政策</a>
        <span>／</span>
        <a href="${LINKS.cookies}">Cookie 政策</a>
      </div>
    </div>
  </div>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if(header){header.innerHTML = renderHeader();}
  if(footer){footer.innerHTML = renderFooter();}

  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.getElementById('main-nav-links');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', ()=>{
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
        toggle.textContent = '☰';
      });
    });
  }
});
