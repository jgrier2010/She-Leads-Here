// ============================================
// SHE LEADS HERE — Interactive Behaviors
// ============================================

(function () {
  'use strict';

  // ===================================
  // FOUNDING MEMBER COUNTER
  // Update this number in ONE place — all displays sync.
  // ===================================
  const FOUNDING_COUNT = 47;        // <-- update this number as members join
  const FOUNDING_TOTAL = 100;

  function setFoundingCount() {
    const targets = ['founding-count', 'founding-count-mini', 'founding-count-sticky', 'founding-count-final'];
    targets.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = FOUNDING_COUNT;
    });

    // Animate the progress bar
    const fill = document.getElementById('counter-fill');
    if (fill) {
      const percent = (FOUNDING_COUNT / FOUNDING_TOTAL) * 100;
      // Defer to allow CSS transition to render
      setTimeout(() => { fill.style.width = percent + '%'; }, 200);
    }
  }

  // ===================================
  // TIER PRICING TOGGLE (Monthly / Annual)
  // ===================================
  function setupTierToggle() {
    const buttons = document.querySelectorAll('.toggle__btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const period = btn.dataset.period;

        // Update active state
        buttons.forEach(b => b.classList.toggle('toggle__btn--active', b === btn));

        // Update all tier prices
        document.querySelectorAll('.tier__amount').forEach(el => {
          el.textContent = el.dataset[period];
        });

        document.querySelectorAll('.tier__period').forEach(el => {
          el.textContent = el.dataset[period];
        });

        document.querySelectorAll('.tier__price-sub').forEach(el => {
          el.textContent = el.dataset[period];
        });
      });
    });
  }

  // ===================================
  // STICKY CTA — appears after scrolling past hero
  // ===================================
  function setupStickyCta() {
    const cta = document.getElementById('sticky-cta');
    const hero = document.querySelector('.hero');
    if (!cta || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero is OUT of view, show sticky CTA
        cta.classList.toggle('sticky-cta--visible', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    // Hide it once user reaches the final CTA
    const finalCta = document.querySelector('.final-cta');
    if (finalCta) {
      const finalObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) cta.classList.remove('sticky-cta--visible');
        },
        { threshold: 0.3 }
      );
      finalObserver.observe(finalCta);
    }
  }

  // ===================================
  // SCROLL REVEAL — subtle fade-in for sections
  // ===================================
  function setupReveal() {
    const els = document.querySelectorAll('.brief, .coaches__header, .coach-card, .membership__header, .tier, .founder__inner, .faq__inner, .final-cta__inner');
    els.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger reveal slightly for grouped elements
            setTimeout(() => entry.target.classList.add('reveal--in'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach(el => observer.observe(el));
  }

  // ===================================
  // SMOOTH SCROLL — respects user motion preferences
  // ===================================
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ===================================
  // INIT
  // ===================================
  function init() {
    setFoundingCount();
    setupTierToggle();
    setupStickyCta();
    setupReveal();
    setupSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
