/* Stack — landing page interactions */

(function () {
  'use strict';

  // Sticky nav background toggle
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // Auto-fill current year in footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // ==========================================
  // Peptide case — open/close + vial previews
  // ==========================================
  const caseEl = document.getElementById('case');
  const caseToggle = document.getElementById('caseToggle');

  if (caseEl && caseToggle) {
    const vials = Array.from(caseEl.querySelectorAll('[data-vial]'));
    const shot = document.getElementById('detailShot');
    const glyphBox = document.getElementById('detailGlyph');
    const eyebrow = document.getElementById('detailEyebrow');
    const title = document.getElementById('detailTitle');
    const body = document.getElementById('detailBody');
    const list = document.getElementById('detailList');
    const toggleLabel = caseToggle.querySelector('span');

    const GLYPHS = {
      calculator:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="2" width="16" height="20" rx="2.5"/><path d="M8 6h8M8 11h2m3 0h3M8 15h2m3 0h3M8 19h8" stroke-linecap="round"/></svg>',
      vial:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 2h8M9 2v5.5L5.6 18.2A2.5 2.5 0 0 0 8 21.5h8a2.5 2.5 0 0 0 2.4-3.3L15 7.5V2" stroke-linejoin="round"/><path d="M6.6 14h10.8" stroke-linecap="round"/></svg>',
      lock:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke-linecap="round"/><circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none"/></svg>'
    };

    let openState = false;

    const setOpen = (next) => {
      openState = next;
      caseEl.dataset.open = String(next);
      caseToggle.setAttribute('aria-expanded', String(next));
      if (toggleLabel) toggleLabel.textContent = next ? 'Close case' : 'Open case';
      if (!next) clearDetail();
    };

    function clearDetail() {
      caseEl.classList.remove('is-detail', 'has-shot', 'has-glyph');
      vials.forEach((v) => v.classList.remove('is-active'));
    }

    function showDetail(vial) {
      if (!openState) return;

      const accent = vial.style.getPropertyValue('--v').trim() || '#6366f1';
      const src = vial.dataset.shot;

      caseEl.style.setProperty('--accent', accent);
      eyebrow.textContent = vial.dataset.eyebrow || '';
      title.textContent = vial.dataset.title || '';
      body.textContent = vial.dataset.body || '';

      list.innerHTML = '';
      (vial.dataset.list || '')
        .split('|')
        .filter(Boolean)
        .forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });

      if (src) {
        shot.src = src;
        shot.alt = vial.dataset.alt || '';
        caseEl.classList.add('has-shot');
        caseEl.classList.remove('has-glyph');
      } else {
        glyphBox.innerHTML = GLYPHS[vial.dataset.glyph] || GLYPHS.vial;
        caseEl.classList.add('has-glyph');
        caseEl.classList.remove('has-shot');
      }

      caseEl.classList.add('is-detail');
      vials.forEach((v) => v.classList.toggle('is-active', v === vial));
    }

    let preloaded = false;
    const preload = () => {
      if (preloaded) return;
      preloaded = true;
      vials.forEach((v) => {
        if (v.dataset.shot) new Image().src = v.dataset.shot;
      });
    };

    caseToggle.addEventListener('click', () => {
      preload();
      setOpen(!openState);
    });

    // Warm the screenshots as soon as the case is close to being used
    caseEl.addEventListener('pointerenter', preload, { once: true });

    vials.forEach((vial) => {
      vial.addEventListener('mouseenter', () => showDetail(vial));
      vial.addEventListener('focus', () => showDetail(vial));
      // Touch / click: open the case if closed, otherwise pin the detail
      vial.addEventListener('click', (e) => {
        e.preventDefault();
        if (!openState) {
          setOpen(true);
          window.setTimeout(() => showDetail(vial), 620);
        } else {
          showDetail(vial);
        }
      });
    });

    // Only clear on pointer devices — keeps tapped selection sticky on touch
    const foam = caseEl.querySelector('.case__foam');
    if (foam && window.matchMedia('(hover: hover)').matches) {
      foam.addEventListener('mouseleave', clearDetail);
    }
  }

  // Affiliate form (client-side demo handler)
  const form = document.getElementById('affiliateForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Submitting…';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        if (success) {
          success.classList.add('visible');
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
        if (submitBtn) {
          submitBtn.textContent = 'Submit application';
          submitBtn.disabled = false;
        }
      }, 700);
    });
  }
})();
