// 瑞光沙舟首頁 2.0 互動效果（SEO 友善，延遲載入）
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // IntersectionObserver：淡入
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity = 1;
        e.target.style.transform = 'translateY(0)';
      }
    });
  },{threshold:.1});

  document.querySelectorAll('.section').forEach(el=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease';
    io.observe(el);
  });

  if(prefersReduced) return;

  // 滑鼠流動效果（輕量）
  document.addEventListener('mousemove', (e)=>{
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.querySelectorAll('.orb').forEach(el=>{
      el.style.transform = `translate(${x*30}px, ${y*20}px)`;
    });
  });
})();
