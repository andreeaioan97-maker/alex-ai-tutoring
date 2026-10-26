// Generates the English pages (repo root) and Romanian pages (ro/) from src/content.mjs.
// Run from the repo root:  node src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, SITE_URL, ic, sprite, bundleKeys } from './content.mjs';
import { CAT } from './cat.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['index', 'services', 'book'];
const metaKey = { index: 'home', services: 'services', book: 'book' };
const bundleIcons = { single: 'message', starter: 'sparkles', plan: 'compass', custom: 'users' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const num = (i) => String(i + 1).padStart(2, '0');

function ctx(code) {
  const t = LANGS[code];
  const abs = (page, lang) => SITE_URL + (lang === 'en' ? '' : 'ro/') + (page === 'index' ? '' : `${page}.html`);
  return {
    code, t,
    asset: (p) => (code === 'en' ? '' : '../') + 'assets/' + p,
    link: (page, hash = '') => `${page}.html${hash}`,
    altHref: (page) => (code === 'en' ? `ro/${page}.html` : `../${page}.html`),
    abs,
  };
}

const h1 = (parts, tag) => `${esc(parts[0])}<${tag}>${esc(parts[1])}</${tag}>${esc(parts[2])}`;
const price = (c) => `<div class="price"><span class="amt">——</span><span class="note">${esc(c.t.priceNote)}</span></div>`;
const bundles = (c) => bundleKeys.map((k) => ({ key: k, ...c.t.bundles[k], icon: bundleIcons[k], featured: k === 'plan' }));

function shell(c, page, bodyClass, body, extraHead = '') {
  const m = c.t.meta[metaKey[page]];
  const url = c.abs(page, c.code);
  return `<!doctype html>
<html lang="${c.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(m.title)}</title>
<meta name="description" content="${esc(m.desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${c.abs(page, 'en')}">
<link rel="alternate" hreflang="ro" href="${c.abs(page, 'ro')}">
<link rel="alternate" hreflang="x-default" href="${c.abs(page, 'en')}">
<meta property="og:title" content="${esc(m.title)}">
<meta property="og:description" content="${esc(m.desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${c.code === 'en' ? 'en_US' : 'ro_RO'}">
<meta name="theme-color" content="#c9f26a">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌿%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="${c.asset('style.css')}">
${extraHead}</head>
<body class="${bodyClass}">
${sprite}
${body}
<script src="${c.asset('config.js')}"></script>
<script src="${c.asset('site.js')}"></script>
</body>
</html>
`;
}

function header(c, page) {
  const { t } = c;
  const cur = (p) => (page === p ? ' aria-current="page"' : '');
  const langs = ['en', 'ro'].map((code) => (code === c.code
    ? `<span aria-current="true" lang="${code}">${code.toUpperCase()}</span>`
    : `<a href="${c.altHref(page)}" hreflang="${code}" lang="${code}" aria-label="${esc(LANGS[code].label)}">${code.toUpperCase()}</a>`)).join('');
  return `
<header class="top"><div class="wrap bar">
  <a class="brand" href="${c.link('index')}" aria-label="Alex Croitoriu"><span class="logo" aria-hidden="true">A</span><span class="nm" aria-hidden="true">${nameLetters()}</span></a>
  <nav class="links" aria-label="${esc(t.nav.aria)}">
    <a href="${c.link('index')}"${cur('index')}>${esc(t.nav.home)}</a>
    <a href="${c.link('services')}"${cur('services')}>${esc(t.nav.services)}</a>
    <a href="${c.link('index', '#about')}">${esc(t.nav.about)}</a>
    <a href="${c.link('book')}"${cur('book')}>${esc(t.nav.book)}</a>
  </nav>
  <div class="langs" role="group" aria-label="${esc(t.nav.langAria)}">${langs}</div>
  <a class="btn btn-sm" href="${c.link('book')}">${esc(t.nav.cta)}</a>
  <button class="menu-btn" aria-label="${esc(t.nav.menu)}" aria-expanded="false"><span></span><span></span></button>
</div></header>
<div class="wrap cat-anchor">${CAT}</div>`;
}

function nameLetters() {
  let i = 0;
  return ['Alex', 'Croitoriu'].map((w) => `<span class="w">${[...w].map((ch) => `<i style="--i:${++i}">${ch}</i>`).join('')}</span>`).join(' ');
}

const footer = (c) => `<footer class="foot"><div class="wrap">${esc(c.t.footer)}</div></footer>`;

const cta = (c) => `
<section class="section"><div class="wrap">
  <div class="cta">
    <h2>${esc(c.t.cta.title)}</h2>
    <p>${esc(c.t.cta.text)}</p>
    <a class="btn btn-ink" href="${c.link('book')}">${ic('calendar')} ${esc(c.t.cta.btn)}</a>
  </div>
</div></section>`;

const faq = (c) => `
<section class="section"><div class="wrap narrow">
  <div class="sec-head"><span class="label">${esc(c.t.faq.label)}</span><h2>${esc(c.t.faq.title)}</h2></div>
  <div class="faq">${c.t.faq.items.map((f) => `<details><summary><span>${esc(f.q)}</span>${ic('plus')}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
</div></section>`;

const strip = (c) => {
  const run = c.t.strip.map((s) => `<span>${esc(s)}</span><i>✺</i>`).join('');
  return `<div class="strip" aria-hidden="true"><div class="strip-in">${run}${run}${run}${run}</div></div>`;
};

const slab = (c, b, i) => `
<article class="slab s${i % 4}${b.featured ? ' featured' : ''}">
  ${b.featured ? `<span class="stamp">${esc(c.t.recommended)}</span>` : ''}
  <div class="slab-l"><span class="slabno">${num(i)}</span><h3>${esc(b.name)}</h3><span class="tag">${esc(b.tag)}</span></div>
  <div class="slab-m"><p>${esc(b.desc)}</p><ul class="ticks">${b.features.map((f) => `<li>${ic('check')}${esc(f)}</li>`).join('')}</ul></div>
  <div class="slab-r">${price(c)}<a class="btn btn-ink btn-block" href="${c.link('book')}">${esc(c.t.ask)}</a></div>
</article>`;

const mini = (c, b, i) => `<a class="mini s${i % 4}" href="${c.link('services')}"><span class="slabno">${num(i)}</span><h3>${esc(b.name)}</h3><p>${esc(b.desc)}</p><span class="go">${ic('arrow')}</span></a>`;

function demo(c) {
  const d = c.t.demo;
  const first = d.tasks[0].vague;
  return `
<section class="section" id="try"><div class="wrap">
  <div class="demo" data-demo>
    <div>
      <span class="label">${esc(d.label)}</span>
      <h2>${esc(d.title)}</h2>
      <p class="lead">${esc(d.lead)}</p>
      <p class="mini-label">${esc(d.tasksLabel)}</p>
      <div class="task-chips" role="group" aria-label="${esc(d.tasksLabel)}">${d.tasks.map((t, i) => `<button type="button" class="chip-btn" data-task="${i}" aria-pressed="${i === 0}">${esc(t.label)}</button>`).join('')}</div>
      <p class="own">${esc(d.own)}</p>
      <a class="btn" href="${c.link('book')}">${esc(c.t.hero.cta)}</a>
    </div>
    <div class="chat">
      <div class="chat-top">
        <div class="dots" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="seg" role="tablist"><button type="button" role="tab" data-mode="vague" aria-selected="true">${esc(d.vague)}</button><button type="button" role="tab" data-mode="clear" aria-selected="false">${esc(d.clear)}</button></div>
      </div>
      <div class="chat-body" aria-live="polite"><div class="bub me" data-q>${esc(first.q)}</div><div class="bub ai" data-a>${esc(first.a)}</div></div>
      <p class="chat-note"><span data-note>${esc(d.noteVague)}</span> <small>${esc(d.illustrative)}</small></p>
    </div>
  </div>
  <script type="application/json" id="demo-data">${json({ tasks: d.tasks, noteVague: d.noteVague, noteClear: d.noteClear })}</script>
</div></section>`;
}

function home(c) {
  const t = c.t;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Person', name: 'Alex Croitoriu', jobTitle: 'Software developer & AI tutor',
    description: t.meta.home.desc, url: c.abs('index', c.code), knowsLanguage: ['en', 'ro'],
    address: { '@type': 'PostalAddress', addressLocality: 'Bucharest', addressCountry: 'RO' },
  };
  const body = `${header(c, 'index')}
<main>
<section class="hero"><div class="wrap hero-grid">
  <div>
    <span class="label">${esc(t.hero.kicker)}</span>
    <h1>${h1(t.hero.h1, 'mark')}</h1>
    <p class="lead">${esc(t.hero.lead)}</p>
    <div class="cta-row"><a class="btn" href="${c.link('book')}">${ic('calendar')} ${esc(t.hero.cta)}</a><a class="btn btn-white" href="${c.link('services')}">${esc(t.hero.cta2)}</a></div>
    <ul class="trust">${t.hero.trust.map((x) => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul>
  </div>
  <div class="sticker-wrap">
    <div class="sticker" role="img" aria-label="${esc(t.photoAlt)}">AC</div>
    <span class="hi">${esc(t.hero.hi)}</span>
  </div>
</div></section>
${strip(c)}

<section class="section"><div class="wrap">
  <div class="sec-head"><span class="label">${esc(t.audience.label)}</span><h2>${esc(t.audience.title)}</h2></div>
  <div class="cards">${t.audience.items.map((a, i) => `<article class="stk s${i % 3}">${ic(a.icon)}<h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`).join('')}</div>
</div></section>

${demo(c)}

<section class="section inkband"><div class="wrap">
  <div class="sec-head"><span class="label light">${esc(t.topics.label)}</span><h2>${esc(t.topics.title)}</h2></div>
  <ol class="lrows">${t.topics.items.map((x, i) => `<li><span class="n">${num(i)}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></li>`).join('')}</ol>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><span class="label">${esc(t.steps.label)}</span><h2>${esc(t.steps.title)}</h2></div>
  <div class="cards c3">${t.steps.items.map((s, i) => `<article class="stk s${i}"><span class="bignum">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('')}</div>
</div></section>

<section class="section tight" id="about"><div class="wrap">
  <div class="about">
    <div>
      <span class="label">${esc(t.about.label)}</span>
      <h2>${esc(t.about.title)}</h2>
      ${t.about.paras.map((p) => `<p>${esc(p)}</p>`).join('')}
      <ul class="chips">${t.about.chips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
    <div class="pillars">${t.about.pillars.map((p) => `<div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`).join('')}</div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><span class="label">${esc(t.servicesTeaser.label)}</span><h2>${esc(t.servicesTeaser.title)}</h2></div>
  <div class="minis">${bundles(c).map((b, i) => mini(c, b, i)).join('')}</div>
  <p class="more"><a class="btn" href="${c.link('services')}">${esc(t.servicesTeaser.more)} ${ic('arrow')}</a></p>
</div></section>

<section class="section tight"><div class="wrap narrow">
  <div class="stk kind">
    <span class="label">${esc(t.kind.label)}</span>
    <h3>${esc(t.kind.title)}</h3>
    <p>${esc(t.kind.text)}</p>
    <a class="btn btn-sm" href="${c.link('book')}">${esc(t.kind.cta)}</a>
  </div>
</div></section>

${faq(c)}
${cta(c)}
</main>
${footer(c)}`;
  return shell(c, 'index', 'page-home', body, `<script type="application/ld+json">${json(ld)}</script>\n`);
}

function services(c) {
  const t = c.t;
  const list = bundles(c);
  const body = `${header(c, 'services')}
<main>
<section class="hero hero-sm"><div class="wrap">
  <span class="label">${esc(t.servicesPage.label)}</span>
  <h1>${h1(t.servicesPage.h1, 'mark')}</h1>
  <p class="lead">${esc(t.servicesPage.lead)}</p>
</div></section>

<section class="section tight"><div class="wrap">
  <div class="slabs">${list.map((b, i) => slab(c, b, i)).join('')}</div>
  <article class="slab group">
    <div class="slab-l"><span class="slabno">+</span><h3>${esc(t.group.name)}</h3><span class="tag">${esc(t.group.tag)}</span></div>
    <div class="slab-m"><p>${esc(t.group.desc)}</p></div>
    <div class="slab-r"><a class="btn btn-ink btn-block" href="${c.link('book')}">${esc(t.group.btn)}</a></div>
  </article>
</div></section>

<section class="section inkband"><div class="wrap">
  <div class="sec-head"><span class="label light">${esc(t.includes.label)}</span><h2>${esc(t.includes.title)}</h2></div>
  <ul class="inc">${t.includes.items.map((i) => `<li>${ic('check')}<span>${esc(i)}</span></li>`).join('')}</ul>
</div></section>

${faq(c)}
${cta(c)}
</main>
${footer(c)}`;
  return shell(c, 'services', 'page-services', body);
}

function book(c) {
  const t = c.t, b = t.book;
  const text = {
    windows: b.windows, summaryTitle: b.summaryTitle, day: b.day, time: b.time, none: b.none,
    errDay: b.errDay, errWin: b.errWin, errName: b.errName, errEmail: b.errEmail, okMail: b.okMail, okCopy: b.okCopy,
    altCal: b.altCal, mailSubject: b.mailSubject, mailBody: b.mailBody,
  };
  const body = `${header(c, 'book')}
<main>
<section class="hero hero-sm"><div class="wrap">
  <span class="label">${esc(b.label)}</span>
  <h1>${h1(b.h1, 'mark')}</h1>
  <p class="lead">${esc(b.lead)}</p>
</div></section>

<section class="section tight"><div class="wrap">
  <div class="book" data-booking>
    <div class="panel">
      <h2><span class="stepn">1</span>${esc(b.s1)}</h2>
      <div class="cal">
        <div class="cal-head">
          <strong data-cal-title></strong>
          <div class="cal-nav">
            <button type="button" data-prev aria-label="${esc(b.prev)}">${ic('left')}</button>
            <button type="button" data-next aria-label="${esc(b.next)}">${ic('right')}</button>
          </div>
        </div>
        <div class="cal-grid" data-cal-grid role="group" aria-label="${esc(b.calendar)}"></div>
      </div>
      <h2 class="second"><span class="stepn">2</span>${esc(b.s2)}</h2>
      <div class="windows" data-windows role="group" aria-label="${esc(b.s2)}"></div>
      <p class="note-tz">${esc(b.tz)}</p>
    </div>

    <form class="panel" data-form novalidate>
      <h2><span class="stepn">3</span>${esc(b.s3)}</h2>
      <div class="fld"><label for="f-name">${esc(b.name)}</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
      <div class="fld"><label for="f-email">${esc(b.email)}</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="fld"><label for="f-type">${esc(b.type)}</label><select id="f-type" name="type">${b.types.map((x) => `<option>${esc(x)}</option>`).join('')}</select></div>
      <div class="fld"><label for="f-msg">${esc(b.message)}</label><textarea id="f-msg" name="message" placeholder="${esc(b.messagePh)}"></textarea></div>
      <div class="summary" data-summary aria-live="polite"></div>
      <button class="btn btn-block" type="submit">${ic('calendar')} ${esc(b.submit)}</button>
      <p class="err" data-error role="alert"></p>
      <div class="ok" data-ok hidden></div>
      <p class="alt" data-alt hidden></p>
    </form>
  </div>
  <script type="application/json" id="book-text">${json(text)}</script>

  <div class="sec-head next-head"><h2>${esc(b.next_.title)}</h2></div>
  <div class="cards c3">${b.next_.items.map((s, i) => `<article class="stk s${i}"><span class="bignum">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`).join('')}</div>
</div></section>
</main>
${footer(c)}`;
  return shell(c, 'book', 'page-book', body);
}

const render = { index: home, services, book };
for (const code of Object.keys(LANGS)) {
  const c = ctx(code);
  const dir = code === 'en' ? root : path.join(root, code);
  fs.mkdirSync(dir, { recursive: true });
  for (const page of PAGES) fs.writeFileSync(path.join(dir, `${page}.html`), render[page](c));
}
console.log('built', PAGES.length * Object.keys(LANGS).length, 'pages');
