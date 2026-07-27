// 정율사관학원 종합반 랜딩 — interactions

// 1) 스크롤 진행 바
(function scrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = `scaleX(${p})`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
})();

// 2) 스크롤 reveal + stagger
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    io.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, [data-stagger]').forEach((el) => io.observe(el));

// 3) FAQ 아코디언
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.getAttribute('data-open') === 'true';
    document.querySelectorAll('.faq-item').forEach((i) => i.setAttribute('data-open', 'false'));
    item.setAttribute('data-open', String(!isOpen));
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// 4) 스티키 바 — 히어로 지나면 표시
(function stickybar() {
  const bar = document.getElementById('stickybar');
  const hero = document.querySelector('.hero');
  if (!bar) return;
  function onScroll() {
    const threshold = hero ? hero.offsetHeight * 0.6 : 400;
    bar.classList.toggle('show', window.scrollY > threshold);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// 5) 히어로 콘텐츠 스크롤 페이드아웃 + 그리드 패럴랙스
(function heroScroll() {
  const inner = document.querySelector('.hero-inner');
  const glow  = document.querySelector('.hero-glow');
  const glow2 = document.querySelector('.hero-glow-2');
  const hero  = document.querySelector('.hero');
  if (!hero) return;
  let ticking = false;
  function update() {
    const y = window.scrollY;
    const h = hero.offsetHeight;
    const p = Math.min(1, Math.max(0, y / h));
    if (inner) {
      inner.style.opacity   = String(1 - p * 1.2);
      inner.style.transform = `translate3d(0, ${-y * 0.12}px, 0)`;
    }
    if (glow)  glow.style.transform  = `translate3d(0, ${y * 0.15}px, 0)`;
    if (glow2) glow2.style.transform = `translate3d(0, ${-y * 0.1}px, 0)`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
})();

// 6) 내비게이션 스크롤 반응 (배경 강화)
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(13,15,58,0.97)'
      : 'rgba(13,15,58,0.85)';
  }, { passive: true });
})();
