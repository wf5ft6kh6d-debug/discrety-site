(function(){
  var toast=document.getElementById('toast');
  var toastTimer;
  function showToast(){
    if(!toast) return;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){toast.classList.remove('show')},2400);
  }

  /* Мобильное меню: открытие и автозакрытие */
  var menuButton=document.getElementById('menuButton');
  var mobileNav=document.getElementById('mobileNav');
  function closeMenu(){
    if(!mobileNav||!mobileNav.classList.contains('open')) return;
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.textContent='☰';
  }
  if(menuButton&&mobileNav){
    menuButton.addEventListener('click',function(){
      var open=mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded',String(open));
      menuButton.textContent=open?'×':'☰';
    });
    document.addEventListener('click',function(e){
      if(!mobileNav.classList.contains('open')) return;
      if(mobileNav.contains(e.target)||menuButton.contains(e.target)) return;
      closeMenu();
    });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeMenu(); });
    window.addEventListener('scroll',closeMenu,{passive:true});
  }

  /* Заглушки для ещё не готовых разделов */
  document.addEventListener('click',function(e){
    var a=e.target.closest('a,button');
    if(!a) return;
    if(a.hasAttribute('data-toast')||a.getAttribute('href')==='#'){
      e.preventDefault();
      showToast();
    }
  });

  /* Формы */
  var searchForm=document.getElementById('searchForm');
  if(searchForm){
    searchForm.addEventListener('submit',function(e){
      e.preventDefault();
      window.location.href='search.html';
    });
  }
  ['resFilters','loginForm','registerForm'].forEach(function(id){
    var f=document.getElementById(id);
    if(f) f.addEventListener('submit',function(e){e.preventDefault(); showToast();});
  });

  /* Индикатор online в блоке профилей */
  var connectionStatus=document.getElementById('connectionStatus');
  function updateConnectionStatus(){
    if(connectionStatus){connectionStatus.classList.toggle('connected', navigator.onLine)}
  }
  window.addEventListener('online',updateConnectionStatus);
  window.addEventListener('offline',updateConnectionStatus);
  updateConnectionStatus();
})();
