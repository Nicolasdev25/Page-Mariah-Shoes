const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded',false)}));
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  els.forEach(el=>io.observe(el));
}else{els.forEach(el=>el.classList.add('in'))}
const sl=[...document.querySelectorAll('#slides .slide')],dots=document.getElementById('dots');let cur=0,timer;
sl.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Ir para o modelo '+(i+1));b.onclick=()=>{go(i);play()};dots.appendChild(b)});
function go(i){cur=(i+sl.length)%sl.length;sl.forEach((s,k)=>s.classList.toggle('on',k===cur));[...dots.children].forEach((d,k)=>d.setAttribute('aria-current',k===cur))}
function play(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(()=>go(cur+1),4500)}
document.querySelector('.cbtn.prev').onclick=()=>{go(cur-1);play()};
document.querySelector('.cbtn.next').onclick=()=>{go(cur+1);play()};
const car=document.querySelector('.arch');car.addEventListener('mouseenter',()=>clearInterval(timer));car.addEventListener('mouseleave',play);
let sx=0;car.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});car.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40){go(cur+(d<0?1:-1));play()}});
go(0);play();
