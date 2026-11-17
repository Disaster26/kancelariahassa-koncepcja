(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  b.addEventListener('click',function(){var o=m.classList.toggle('otw');b.setAttribute('aria-expanded',o)});
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('otw');b.setAttribute('aria-expanded','false')}});
  document.getElementById('rok').textContent=new Date().getFullYear();

  // pasek mobilny dopiero po przewinieciu za przycisk w hero
  var mob=document.getElementById('mob'),cta=document.querySelector('.karta .btn');
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){mob.classList.toggle('widac',!e[0].isIntersecting&&e[0].boundingClientRect.top<0)}).observe(cta);
    var mapa=document.getElementById('mapa');
    var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();
      var f=document.createElement('iframe');f.title='Mapa: Kancelaria Adwokacka Hassa, ul. Koraszewskiego 8-16, Opole';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';
      f.src='https://maps.google.com/maps?q=Koraszewskiego+8-16,+45-011+Opole&z=16&output=embed';mapa.innerHTML='';mapa.appendChild(f)}},{rootMargin:'300px'});
    io.observe(mapa);
  }

  // lightbox
  var zdj=[
    ['img/aneta-hassa.webp','Adwokat Aneta Hassa'],
    ['img/mariusz-hassa.webp','Adwokat dr Mariusz Hassa'],
    ['img/siedziba-opole.webp','Budynek kancelarii, ul. Koraszewskiego 8-16, Opole']
  ],lb=document.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p'),i=0;
  function pokaz(n){i=(n+zdj.length)%zdj.length;li.src=zdj[i][0];li.alt=zdj[i][1];lp.textContent=zdj[i][1]+'  ('+(i+1)+'/'+zdj.length+')'}
  document.querySelectorAll('[data-lb]').forEach(function(el){el.addEventListener('click',function(){pokaz(+el.dataset.lb);lb.classList.add('otw');lb.querySelector('.zam').focus()})});
  function zamknij(){lb.classList.remove('otw')}
  lb.querySelector('.zam').onclick=zamknij;
  lb.querySelector('.pop').onclick=function(){pokaz(i-1)};
  lb.querySelector('.nast').onclick=function(){pokaz(i+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)zamknij()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('otw'))return;if(e.key==='Escape')zamknij();if(e.key==='ArrowLeft')pokaz(i-1);if(e.key==='ArrowRight')pokaz(i+1)});
  var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)pokaz(i+(d<0?1:-1));x0=null});

  // formularz pokazowy
  document.getElementById('formularz').addEventListener('submit',function(e){e.preventDefault();
    document.getElementById('info-form').textContent='To podgląd strony - formularz zacznie wysyłać wiadomości po wdrożeniu.'});
})();
