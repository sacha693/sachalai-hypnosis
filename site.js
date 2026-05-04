// site.js
// 用途：集中管理全站共用的「頁首導覽列」與「頁尾資訊」。
// 好處：之後如果要改選單、預約連結、社群連結，只需要改這一個檔案。

// 等待 HTML 完整載入後，再把頁首與頁尾插入指定位置。
document.addEventListener('DOMContentLoaded',()=>{
  // 取得首頁中的掛載點：index-integrated.html 內有 <div id="site-header"></div>
  const header=document.getElementById('site-header');
  // 取得頁尾掛載點：index-integrated.html 內有 <div id="site-footer"></div>
  const footer=document.getElementById('site-footer');

  // ===== 頁首導覽列 =====
  // 包含：品牌名稱、主選單、下拉式選單、右側預約探索按鈕。
  if(header){
    header.innerHTML=`
    <div class="site-header">
      <div class="site-container">
        <div class="site-nav">
          <div class="site-nav-top">
            <!-- 品牌名稱：點擊後回到品牌首頁 -->
            <a href="index-integrated.html" class="brand">瑞光沙舟心流所</a>
          </div>
          <div class="nav-links">
            <!-- 主選單：站內錨點與重要頁面連結 -->
            <a href="index-integrated.html">首頁</a>
            <a href="index-integrated.html#about">關於</a>
            <a href="index-integrated.html#services">服務主題</a>
            
            <!-- 下拉式選單：個案回饋分享分類 -->
            <div class="dropdown">
              <button class="dropdown-toggle">個案回饋分享</button>
              <div class="dropdown-menu">
                <a href="luminous_oasis_hypnosis.html">情感關係</a>
                <a href="relationship_test.html">自我探索</a>
                <a href="luminous_oasis.html">高成就壓力</a>
              </div>
            </div>
            
            <!-- 預約前重要資訊 -->
            <a href="appointment.html">預約須知</a>
            <a href="friendly-reminder.html">溫馨提醒</a>
          </div>
          
          <!-- 主要 CTA：放在頁首最右側，導向預約表單 -->
          <a href="https://forms.gle/7VM9YDXMJqLBtons5" target="_blank" class="btn-primary nav-cta">預約探索</a>
        </div>
      </div>
    </div>`;
  }

  // ===== 頁尾資訊 =====
  // 包含：品牌簡介、預約入口、服務主題、社群連結、版權與非醫療聲明。
  if(footer){
    footer.innerHTML=`
    <div class="footer">
      <div class="site-container footer-grid">
        <!-- 品牌簡介 -->
        <div>
          <h3>瑞光沙舟心流所</h3>
          <p>潛意識引導・自我覺察<br>台中・線上｜一對一陪伴</p>
        </div>
        
        <!-- 預約相關連結 -->
        <div>
          <h4>預約</h4>
          <a href="appointment.html">預約須知</a>
          <a href="friendly-reminder.html">溫馨提醒</a>
          <a href="https://forms.gle/7VM9YDXMJqLBtons5" target="_blank">填寫預約表單</a>
        </div>
        
        <!-- 服務主題連結 -->
        <div>
          <h4>主題</h4>
          <a href="luminous_oasis_hypnosis.html">情感關係</a>
          <a href="relationship_test.html">自我探索</a>
          <a href="luminous_oasis.html">高成就壓力</a>
        </div>
        
        <!-- 社群連結：FB、IG、LINE@目前以預約表單作為入口 -->
        <div>
          <h4>社群</h4>
          <a href="https://www.facebook.com/profile.php?id=61566762881113" target="_blank">Facebook</a>
          <a href="https://www.instagram.com/cgrs693/?hl=zh-tw" target="_blank">Instagram</a>
          <a href="https://forms.gle/7VM9YDXMJqLBtons5" target="_blank">LINE@／預約表單</a>
        </div>
      </div>
      
      <!-- 版權與合規聲明：避免被誤解為醫療或心理治療服務 -->
      <div class="site-container legal">
        © 2026 瑞光沙舟心流所 All Rights Reserved ｜ 本服務為自我覺察與潛意識探索引導，不涉及醫療或心理治療
      </div>
    </div>`;
  }
});