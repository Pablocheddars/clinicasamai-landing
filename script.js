/* Clínica Samai — interactions */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     Hero rotating doctor (crossfade every 5s)
     ---------------------------------------------------------- */
  const heroImgs = document.querySelectorAll('.hero-visual .hero-img');
  const heroBadge = document.getElementById('heroBadge');
  const heroBadgeAvatar = document.getElementById('heroBadgeAvatar');
  const heroBadgeName = document.getElementById('heroBadgeName');
  const heroBadgeRole = document.getElementById('heroBadgeRole');
  const heroDoctors = [
    { key: 'daniela',  initial: 'D', name: 'Dra. Daniela Gavilán',     role: 'Implantología Bucomaxilofacial' },
    { key: 'mariapaz', initial: 'M', name: 'Dra. María Paz Villegas',  role: 'Odontopediatría' }
  ];
  if (heroImgs.length && heroBadge) {
    let i = 0;
    const rotate = () => {
      i = (i + 1) % heroDoctors.length;
      const next = heroDoctors[i];
      heroImgs.forEach(img => img.classList.toggle('is-active', img.dataset.doctor === next.key));
      heroBadge.classList.add('is-fading');
      setTimeout(() => {
        heroBadgeAvatar.textContent = next.initial;
        heroBadgeName.textContent   = next.name;
        heroBadgeRole.textContent   = next.role;
        heroBadge.classList.remove('is-fading');
      }, 400);
    };
    setInterval(rotate, 5000);
  }

  /* ----------------------------------------------------------
     Nav scroll state
     ---------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     Mobile menu
     ---------------------------------------------------------- */
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

  /* ----------------------------------------------------------
     Service tabs
     ---------------------------------------------------------- */
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

  // initial pill position (wait for fonts to settle)
  const initialActive = document.querySelector('.serv-tab.is-active');
  requestAnimationFrame(() => positionPill(initialActive));
  window.addEventListener('resize', () => {
    const cur = document.querySelector('.serv-tab.is-active');
    positionPill(cur);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => positionPill(document.querySelector('.serv-tab.is-active')));
  }

  /* ----------------------------------------------------------
     Reveal-on-scroll
     ---------------------------------------------------------- */
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

  /* ----------------------------------------------------------
     Smooth-scroll offset for sticky nav
     ---------------------------------------------------------- */
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
