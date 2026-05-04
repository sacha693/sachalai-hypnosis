document.addEventListener('DOMContentLoaded',()=>{
  const header=document.getElementById('site-header');
  const footer=document.getElementById('site-footer');

  if(header){
    header.innerHTML=`
    <div class="site-header">
      <div class="site-container">
        <div class="site-nav">
          <div class="site-nav-top">
            <a href="index.html" class="brand">瑞光沙舟心流所</a>
            <a href="https://forms.gle/7VM9YDXMJqLBtons5" target="_blank" class="btn-primary">預約</a>
          </div>
          <div class="nav-links">
            <a href="index.html">首頁</a>
            <a href="index.html#about">關於</a>
            <a href="index.html#services">服務主題</a>
            <div class="dropdown">
              <button class="dropdown-toggle">個案回饋分享</button>
              <div class="dropdown-menu">
                <a href="luminous_oasis_hypnosis.html">關係回饋</a>
                <a href="luminous_oasis.html">壓力回饋</a>
              </div>
            </div>
            <a href="appointment.html">預約須知</a>
            <a href="friendly-reminder.html">溫馨提醒</a>
          </div>
        </div>
      </div>
    </div>`;
  }

  if(footer){
    footer.innerHTML=`
    <div class="footer">
      <div class="site-container footer-grid">
        <div>
          <h3>瑞光沙舟心流所</h3>
          <p>潛意識引導・自我覺察</p>
        </div>
        <div>
          <h4>預約</h4>
          <a href="appointment.html">預約須知</a>
          <a href="friendly-reminder.html">溫馨提醒</a>
        </div>
        <div>
          <h4>主題</h4>
          <a href="luminous_oasis.html">壓力</a>
          <a href="luminous_oasis_hypnosis.html">關係</a>
        </div>
        <div>
          <h4>資源</h4>
          <a href="relationship_test.html">測驗</a>
          <a href="keygame.html">轉動思維</a>
        </div>
      </div>
      <div class="site-container legal">
        © 2026 瑞光沙舟心流所 All Rights Reserved ｜ 本服務為自我覺察與潛意識探索引導，不涉及醫療或心理治療
      </div>
    </div>`;
  }
});