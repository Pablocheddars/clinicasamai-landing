/* Clínica Samai — interactions */
(function () {
  'use strict';
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const closeMenu = () => {
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  burger.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open');
    burger.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  const tabs = document.querySelectorAll('.serv-tab');
  const panels = document.querySelectorAll('.serv-panel');
  const pill = document.getElementById('servPill');
  const positionPill = (tab) => {
    if (!tab || !pill) return;
    pill.style.width = tab.offsetWidth + 'px';
    pill.style.transform = `translateX(${tab.offsetLeft - 5}px)`;
  };
  const activateTab = (name) => {
    tabs.forEach(t => {
      const active = t.dataset.tab === name;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) positionPill(t);
    });
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === name));
  };
  tabs.forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));
  const initialActive = document.querySelector('.serv-tab.is-active');
  requestAnimationFrame(() => positionPill(initialActive));
  window.addEventListener('resize', () => {
    const cur = document.querySelector('.serv-tab.is-active');
    positionPill(cur);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => positionPill(document.querySelector('.serv-tab.is-active')));
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();