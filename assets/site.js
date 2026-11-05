// Menu, "bring your own task" demo and the Calendly booking embed. No libraries; only Calendly's widget loads from the internet, on the Book page.
(function () {
  'use strict';
  var cfg = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---- mobile menu ----
  var menuBtn = $('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    $$('.links a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- "About" in the menu is selected while the About section is the target (#about) ----
  var aboutLink = $('.links [data-nav="about"]'), homeLink = $('.links [data-nav="home"]');
  if (aboutLink && homeLink && document.body.classList.contains('page-home')) {
    var syncNav = function () {
      var about = window.location.hash === '#about';
      if (about) { aboutLink.setAttribute('aria-current', 'location'); homeLink.removeAttribute('aria-current'); }
      else { homeLink.setAttribute('aria-current', 'page'); aboutLink.removeAttribute('aria-current'); }
    };
    syncNav();
    window.addEventListener('hashchange', syncNav);
  }

  // ---- the letters of the name only bounce while the cat is in view (top of the page) ----
  var atTop = function () { document.body.classList.toggle('at-top', (window.scrollY || 0) < 30); };
  atTop();
  window.addEventListener('scroll', atTop, { passive: true });

  // ---- demo: vague ask vs clear ask ----
  var demo = $('[data-demo]');
  if (demo) {
    var data = JSON.parse($('#demo-data').textContent);
    var task = 0, mode = 'vague';
    var q = $('[data-q]', demo), a = $('[data-a]', demo), note = $('[data-note]', demo);
    var chips = $$('[data-task]', demo), tabs = $$('[data-mode]', demo);
    var paint = function () {
      var t = data.tasks[task][mode];
      q.textContent = t.q;
      a.textContent = t.a;
      note.textContent = mode === 'vague' ? data.noteVague : data.noteClear;
      chips.forEach(function (c, i) { c.setAttribute('aria-pressed', String(i === task)); });
      tabs.forEach(function (c) { c.setAttribute('aria-selected', String(c.getAttribute('data-mode') === mode)); });
    };
    chips.forEach(function (c, i) { c.addEventListener('click', function () { task = i; paint(); }); });
    tabs.forEach(function (c) { c.addEventListener('click', function () { mode = c.getAttribute('data-mode'); paint(); }); });
  }

  // ---- book page: Calendly booking ----
  var textEl = $('#book-text');
  if (!textEl) return;
  var T = JSON.parse(textEl.textContent);

  var wrap = $('[data-calendly]');
  if (wrap && /^https:\/\/calendly\.com\//.test(cfg.bookingUrl || '')) {
    var widget = $('[data-calendly-widget]', wrap);
    widget.setAttribute('data-url', cfg.bookingUrl + (cfg.bookingUrl.indexOf('?') < 0 ? '?' : '&') + 'hide_gdpr_banner=1');
    var link = document.createElement('a');
    link.href = cfg.bookingUrl; link.target = '_blank'; link.rel = 'noopener';
    link.textContent = T.altCal;
    $('[data-alt]', wrap).appendChild(link);
    wrap.hidden = false;
    var sc = document.createElement('script');
    sc.src = 'https://assets.calendly.com/assets/external/widget.js'; sc.async = true;
    document.body.appendChild(sc);
  }
})();
