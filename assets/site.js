// Menu, "bring your own task" demo and the booking calendar. No libraries, nothing loads from the internet.
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

  // ---- booking calendar ----
  var root = $('[data-booking]');
  if (!root) return;
  var T = JSON.parse($('#book-text').textContent);
  var lang = document.documentElement.lang || 'en';

  var startOf = function (d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
  var addDays = function (d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); };
  var iso = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  var parse = function (s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };

  var today = startOf(new Date());
  var minDate = addDays(today, typeof cfg.minDaysAhead === 'number' ? cfg.minDaysAhead : 1);
  var maxDate = addDays(today, (cfg.maxWeeksAhead || 8) * 7);
  var closedDays = cfg.closedWeekdays || [];
  var closedDates = cfg.closedDates || [];
  var allowed = cfg.windows || ['morning', 'afternoon', 'evening', 'flexible'];
  var view = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  var sel = { date: null, win: null };

  var fmtMonth = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' });
  var fmtDow = new Intl.DateTimeFormat(lang, { weekday: 'short' });
  var fmtLong = new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long' });
  var fmtFull = new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  var grid = $('[data-cal-grid]', root), title = $('[data-cal-title]', root);
  var prev = $('[data-prev]', root), next = $('[data-next]', root);
  var winBox = $('[data-windows]', root), summary = $('[data-summary]', root);
  var form = $('[data-form]', root), errEl = $('[data-error]', root), okEl = $('[data-ok]', root), altEl = $('[data-alt]', root);
  var windows = T.windows.filter(function (w) { return allowed.indexOf(w.id) >= 0; });

  var isOpen = function (d) { return d >= minDate && d <= maxDate && closedDays.indexOf(d.getDay()) < 0 && closedDates.indexOf(iso(d)) < 0; };

  function renderCal() {
    title.textContent = fmtMonth.format(view);
    var html = '';
    for (var i = 0; i < 7; i++) html += '<div class="cal-dow" aria-hidden="true">' + fmtDow.format(new Date(2024, 0, 1 + i)) + '</div>'; // 1 Jan 2024 is a Monday
    var offset = (new Date(view.getFullYear(), view.getMonth(), 1).getDay() + 6) % 7;
    var days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (var b = 0; b < offset; b++) html += '<span class="cal-blank"></span>';
    for (var n = 1; n <= days; n++) {
      var d = new Date(view.getFullYear(), view.getMonth(), n), k = iso(d);
      html += '<button type="button" class="cal-day' + (+d === +today ? ' today' : '') + '" data-iso="' + k + '" aria-label="' + fmtLong.format(d) +
        '" aria-pressed="' + (sel.date === k) + '"' + (isOpen(d) ? '' : ' disabled') + '>' + n + '</button>';
    }
    grid.innerHTML = html;
    prev.disabled = view <= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    next.disabled = view >= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  }

  function renderWindows() {
    winBox.innerHTML = windows.map(function (w) {
      return '<button type="button" class="win" data-win="' + w.id + '" aria-pressed="' + (sel.win === w.id) + '"><span>' + w.label + '</span><small>' + w.hours + '</small></button>';
    }).join('');
  }

  function winLabel(w) { return w.id === 'flexible' ? w.label : w.label + ' (' + w.hours + ')'; }

  function renderSummary() {
    var w = windows.filter(function (x) { return x.id === sel.win; })[0];
    summary.innerHTML = '<strong>' + T.summaryTitle + '</strong><br>' + T.day + ': <span>' + (sel.date ? fmtFull.format(parse(sel.date)) : T.none) +
      '</span><br>' + T.time + ': <span>' + (w ? winLabel(w) : T.none) + '</span>';
  }

  grid.addEventListener('click', function (e) {
    var b = e.target.closest('.cal-day');
    if (!b || b.disabled) return;
    sel.date = b.getAttribute('data-iso');
    renderCal(); renderSummary();
  });
  winBox.addEventListener('click', function (e) {
    var b = e.target.closest('.win');
    if (!b) return;
    sel.win = b.getAttribute('data-win');
    renderWindows(); renderSummary();
  });
  prev.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCal(); });
  next.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCal(); });

  if (cfg.bookingUrl) {
    altEl.hidden = false;
    var link = document.createElement('a');
    link.className = 'btn btn-white btn-block';
    link.href = cfg.bookingUrl; link.target = '_blank'; link.rel = 'noopener';
    link.textContent = T.altCal;
    altEl.appendChild(link);
  }

  var fill = function (s, v) { return s.replace(/\{(\w+)\}/g, function (_, k) { return v[k] != null ? v[k] : ''; }); };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var name = String(f.get('name') || '').trim(), email = String(f.get('email') || '').trim();
    var type = String(f.get('type') || ''), message = String(f.get('message') || '').trim();
    var err = !sel.date ? T.errDay : !sel.win ? T.errWin : !name ? T.errName : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? T.errEmail : '';
    errEl.textContent = err;
    okEl.hidden = true;
    if (err) return;

    var w = windows.filter(function (x) { return x.id === sel.win; })[0];
    var v = { type: type, day: fmtFull.format(parse(sel.date)), time: winLabel(w), name: name, email: email, message: message };
    var subject = fill(T.mailSubject, v), body = fill(T.mailBody, v).replace(/\s+$/, '');

    okEl.textContent = '';
    if (cfg.contactEmail) {
      okEl.textContent = T.okMail;
      window.location.href = 'mailto:' + cfg.contactEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    } else {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(subject + '\n\n' + body).catch(function () {});
      var p = document.createElement('p'); p.textContent = T.okCopy;
      var pre = document.createElement('pre'); pre.textContent = body;
      okEl.appendChild(p); okEl.appendChild(pre);
    }
    okEl.hidden = false;
  });

  renderCal(); renderWindows(); renderSummary();
})();
