// Menu, "bring your own task" demo, the Calendly booking embed and the question form. No libraries; only Calendly's widget loads from the internet, on the Book page.
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

  // ---- book page: Calendly booking + question form ----
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

  var form = $('[data-ask]');
  if (!form) return;
  var errEl = $('[data-error]', form), okEl = $('[data-ok]', form);
  var fill = function (s, v) { return s.replace(/\{(\w+)\}/g, function (_, k) { return v[k] != null ? v[k] : ''; }); };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var v = {
      name: String(f.get('name') || '').trim(),
      email: String(f.get('email') || '').trim(),
      message: String(f.get('message') || '').trim(),
    };
    var err = !v.name ? T.errName : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email) ? T.errEmail : !v.message ? T.errMsg : '';
    errEl.textContent = err;
    okEl.hidden = true;
    if (err || !cfg.contactEmail) return;
    okEl.textContent = T.okMail;
    okEl.hidden = false;
    window.location.href = 'mailto:' + cfg.contactEmail + '?subject=' + encodeURIComponent(fill(T.mailSubject, v)) +
      '&body=' + encodeURIComponent(fill(T.mailBody, v));
  });
})();
