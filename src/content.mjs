// All site copy, in English and Romanian. Edit here, then run `node src/build.mjs`.
export const SITE_URL = 'https://andreeaioan97-maker.github.io/alex-ai-tutoring/';

const ICONS = {
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
};
export const ic = (name, cls = '') => `<svg class="ic ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
export const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${Object.entries(ICONS).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('')}</defs></svg>`;

const bundleKeys = ['single', 'group'];

export const en = {
  lang: 'en', label: 'English',
  meta: {
    home: { title: 'Alex Croitoriu · AI tutoring for everyone', desc: 'Friendly one-to-one tutoring in AI, prompting and Claude Code, taught in plain language by software developer Alex Croitoriu.' },
    services: { title: 'Services · Alex Croitoriu', desc: 'AI tutoring prices: ad hoc one-to-one sessions at 250 lei and Saturday group sessions at 300 lei per person.' },
    book: { title: 'Book a session · Alex Croitoriu', desc: 'Book a session with Alex directly in his calendar.' },
  },
  nav: { aria: 'Main', home: 'Home', services: 'Services', about: 'About', book: 'Book', langAria: 'Language', menu: 'Menu' },
  photoAlt: 'Photo of Alex (coming soon)',
  hero: {
    kicker: 'AI tutoring for everyone',
    h1: ['Learn what AI can ', 'actually', ' do for you.'],
    lead: 'Friendly one-to-one tutoring in AI, prompting and Claude Code, taught in plain language by Alex, a software developer who loves making complicated things click.',
    cta: 'Book a session', cta2: 'See services',
    trust: ['No jargon', 'Any starting level', 'At your own pace'], hi: 'Hi, I’m Alex!',
  },
  strip: ['AI from zero', 'Prompting', 'Anthropic/Claude Code', 'ChatGPT/Codex', 'Automation', 'Safe use', 'Your roadmap'],
  audience: {
    label: 'Who it’s for', title: 'Everyone is welcome.',
    items: [
      { icon: 'sparkles', title: 'Complete beginners', text: 'Never opened an AI tool? Perfect. We start at the very beginning.' },
      { icon: 'briefcase', title: 'Professionals & freelancers', text: 'Save hours every week on writing, research, planning and admin.' },
      { icon: 'zap', title: 'Small business owners', text: 'Put AI to work on the tasks that eat up your day.' },
      { icon: 'book', title: 'Students & career changers', text: 'Pick up the skills people now expect, with a patient guide.' },
      { icon: 'bulb', title: 'Curious creators', text: 'Got an idea for an app, a tool or a project? Let’s build it.' },
      { icon: 'users', title: 'Teams & groups', text: 'Get everyone on the same page with a shared, hands-on session.' },
    ],
  },
  demo: {
    label: 'Try it', title: 'Bring your own task.',
    lead: 'The difference is in the ask. Pick a task, then flip between a vague request and a clear one.',
    tasksLabel: 'Pick a task', vague: 'Vague ask', clear: 'Clear ask',
    noteVague: 'A vague ask gets a vague answer.',
    noteClear: 'Same AI, a clear ask, a far better answer. That’s what Alex teaches.',
    illustrative: 'Example answers are illustrative.',
    own: 'Have your own task? Bring it to a session and we’ll work on it live.',
    tasks: [
      { label: 'Write an email',
        vague: { q: 'Help me with my email.', a: 'Sure! Could you tell me more? Who is it for, and what would you like to say?' },
        clear: { q: 'Rewrite this email to my landlord about the broken heater. Polite but firm, under 100 words.', a: 'Hi, I’m writing about the heater that stopped working last week. Could you arrange a repair by Friday? Please let me know a time that suits you. Thank you!' } },
      { label: 'Plan my week',
        vague: { q: 'Plan my week.', a: 'Sure! Here’s a general plan: work in the morning, exercise in the afternoon, relax in the evening. Tell me more for a plan that fits.' },
        clear: { q: 'Plan my week: I work 9–5, want the gym 3 times, 30 minutes of English a day and Sunday free. Make a table.', a: 'Mon: Work · English 30′ · Gym\nTue: Work · English 30′\nWed: Work · English 30′ · Gym\nThu: Work · English 30′\nFri: Work · English 30′ · Gym\nSat: English 30′\nSun: Free ☀' } },
      { label: 'Learn something',
        vague: { q: 'Explain blockchain.', a: 'Blockchain is a distributed ledger technology that records transactions across many computers using cryptographic hashes and consensus mechanisms…' },
        clear: { q: 'Explain blockchain like I’m 12, in 3 sentences, with an everyday example.', a: 'Imagine a class notebook that every student has a copy of. When someone borrows a pencil, everybody writes it down. Nobody can cheat, because all the copies must match.' } },
    ],
  },
  topics: {
    label: 'What you’ll learn', title: 'Skills you’ll actually use.',
    items: [
      { icon: 'sparkles', title: 'AI, from zero', text: 'What it is, what it’s great at, and where it gets things wrong.' },
      { icon: 'message', title: 'Prompting that works', text: 'Ask clearly, get better answers, and reuse the patterns that work.' },
      { icon: 'code', title: 'Building with Claude Code', text: 'Turn your own idea into a working tool, even if you’ve never coded.' },
      { icon: 'zap', title: 'Everyday automation', text: 'Hand over the repetitive stuff: emails, notes, research, planning.' },
      { icon: 'shield', title: 'Safe, smart use', text: 'Privacy, fact-checking and knowing when not to trust the answer.' },
      { icon: 'compass', title: 'Your own roadmap', text: 'A personal plan so you keep growing long after our sessions.' },
    ],
  },
  steps: {
    label: 'How it works', title: 'Three steps. That’s it.',
    items: [
      { icon: 'message', title: 'Say hello', text: 'Book a session and tell Alex what you’d love AI to do for you.' },
      { icon: 'zap', title: 'Learn by doing', text: 'Hands-on sessions built around your real tasks, not slides.' },
      { icon: 'compass', title: 'Keep going', text: 'Follow-up support and a roadmap so it all sticks.' },
    ],
  },
  about: {
    label: 'About', title: 'Meet Alex.',
    paras: [
      'Alex is a software developer based in Bucharest. He has built web applications and backend systems, set up CI/CD and automation workflows, and worked directly with enterprise customers as a cloud support engineer, so he is well practised at turning technical problems into clear, plain-language answers.',
      'He teaches AI the way he would want to be taught: hands-on, patient and with zero jargon. Whether you are opening an AI assistant for the first time or ready to build your own tool with Claude Code, he will meet you where you are.',
    ],
    chips: ['Software developer', 'Python · JavaScript · C++', 'Google Cloud & Apigee support', 'Automation (n8n, Jenkins)', 'English & Romanian'],
    pillars: [
      { title: 'Plain language', text: 'Every idea explained without jargon, at your level.' },
      { title: 'Hands-on', text: 'You work on your own real tasks, live, with real tools.' },
      { title: 'Patient & flexible', text: 'Your pace, your goals, your plan.' },
      { title: 'Real engineering know-how', text: 'A working developer who knows what AI can and can’t do.' },
    ],
  },
  servicesTeaser: { label: 'Services', title: 'Learn your way.', more: 'Compare all services' },
  kind: {
    label: 'Kind words', title: 'Be one of our first learners.',
    text: 'Tutoring sessions are just opening. Be among the first learners, and your feedback after a few sessions could appear right here.',
    cta: 'Book a session',
  },
  faq: {
    label: 'Questions', title: 'Good questions.',
    items: [
      { q: 'Do I need any technical background?', a: 'Not at all. Alex works with complete beginners and experienced professionals alike, and starts wherever you are.' },
      { q: 'What do we actually do in a session?', a: 'We start from something you want to get done (writing, planning, research, an idea) and work on it together, live, using real AI tools.' },
      { q: 'How do the two options differ?', a: 'An ad hoc session is one-to-one, 60 minutes, and you book it whenever you need it. The group session is a full 8-hour Saturday with a small group.' },
      { q: 'Which languages are sessions in?', a: 'English or Romanian, whichever you are more comfortable with.' },
      { q: 'Do I need to buy any software?', a: 'Many AI tools have free versions. Alex will help you work out what you actually need before you spend anything.' },
    ],
  },
  cta: { title: 'Ready to see what AI can do for you?', text: 'Book a session. No pressure, no jargon, just friendly help with what you want to achieve.', btn: 'Book a session' },
  servicesPage: { label: 'Services', h1: ['Find the ', 'right way', ' to learn.'], lead: 'Two simple options: a one-to-one session when you need it, or a full Saturday with a group.' },
  bundles: {
    single: { name: 'Ad hoc Session', tag: 'One-to-one', amt: '250 lei', note: 'per session · 1 person · 60 minutes', desc: 'One focused 1-on-1 session on a question, a task or an idea. Book it when you need it: 60 minutes.', features: ['Live, hands-on walkthrough', 'Tailored to your question', 'Session notes afterwards'] },
    group: { name: 'Saturday Group Session', tag: 'Small group', amt: '300 lei', note: 'per person · 8 hours · Saturdays', desc: 'A full Saturday of hands-on learning together with a small group, from the basics to building something of your own.', features: ['8 hours, one Saturday', 'Learn alongside other people', 'Hands-on practice with real AI tools', 'Notes to look back on'] },
  },
  ask: 'Book this', recommended: 'Recommended',
  includes: { label: 'Always included', title: 'Every session includes.', items: ['Friendly, jargon-free teaching', 'Hands-on practice with real AI tools', 'Any starting level welcome', 'Session notes to look back on'] },
  book: {
    label: 'Book', h1: ['Book your ', 'session', '.'],
    lead: 'Pick a time that suits you in Alex’s calendar below. You get a confirmation email straight away.',
    altCal: 'Calendar not showing? Open Alex’s calendar',
    next_: { title: 'What happens next', items: [
      { icon: 'check', title: 'You get a confirmation', text: 'Calendly emails you the time and session details as soon as you book.' },
      { icon: 'zap', title: 'Learn by doing', text: 'Bring something you want to get done and work on it together with Alex. No preparation needed.' },
      { icon: 'compass', title: 'Keep going', text: 'Book another session whenever you need one, or join a Saturday group.' },
    ] },
  },
  footer: '© 2026 Alex Croitoriu · Bucharest, Romania · AI tutoring for everyone',
};

export const ro = {
  lang: 'ro', label: 'Română',
  meta: {
    home: { title: 'Alex Croitoriu · Meditații AI pentru oricine', desc: 'Meditații individuale și prietenoase despre AI, prompting și Claude Code, explicate pe înțelesul tuturor de dezvoltatorul de software Alex Croitoriu.' },
    services: { title: 'Servicii · Alex Croitoriu', desc: 'Prețuri meditații AI: sesiuni individuale ad hoc la 250 lei și sesiuni de grup de sâmbătă la 300 lei de persoană.' },
    book: { title: 'Programează o sesiune · Alex Croitoriu', desc: 'Programează o sesiune cu Alex direct în calendarul lui.' },
  },
  nav: { aria: 'Principal', home: 'Acasă', services: 'Servicii', about: 'Despre', book: 'Programare', langAria: 'Limba', menu: 'Meniu' },
  photoAlt: 'Fotografia lui Alex (în curând)',
  hero: {
    kicker: 'Meditații AI pentru oricine',
    h1: ['Descoperă ce poate ', 'de fapt', ' să facă AI-ul pentru tine.'],
    lead: 'Meditații individuale și prietenoase despre AI, prompting și Claude Code, explicate pe înțelesul tuturor de Alex, un dezvoltator de software căruia îi place să facă lucrurile complicate să pară simple.',
    cta: 'Programează o sesiune', cta2: 'Vezi serviciile',
    trust: ['Fără jargon', 'Orice nivel de start', 'În ritmul tău'], hi: 'Salut, sunt Alex!',
  },
  strip: ['AI de la zero', 'Prompting', 'Anthropic/Claude Code', 'ChatGPT/Codex', 'Automatizări', 'Utilizare sigură', 'Planul tău'],
  audience: {
    label: 'Pentru cine este', title: 'Oricine este binevenit.',
    items: [
      { icon: 'sparkles', title: 'Începători absoluți', text: 'N-ai deschis niciodată un instrument AI? Perfect. Începem de la zero.' },
      { icon: 'briefcase', title: 'Profesioniști și freelanceri', text: 'Câștigă ore în fiecare săptămână la scris, documentare, planificare și administrativ.' },
      { icon: 'zap', title: 'Antreprenori și mici afaceri', text: 'Pune AI-ul să preia sarcinile care îți consumă ziua.' },
      { icon: 'book', title: 'Studenți și cei care își schimbă cariera', text: 'Învață abilitățile cerute azi, alături de un ghid răbdător.' },
      { icon: 'bulb', title: 'Creativi curioși', text: 'Ai o idee de aplicație, de instrument sau de proiect? Hai să o construim.' },
      { icon: 'users', title: 'Echipe și grupuri', text: 'Aduceți pe toată lumea la același nivel, într-o sesiune practică, în comun.' },
    ],
  },
  demo: {
    label: 'Încearcă', title: 'Adu-ți propria sarcină.',
    lead: 'Diferența stă în felul în care ceri. Alege o sarcină, apoi comută între o cerere vagă și una clară.',
    tasksLabel: 'Alege o sarcină', vague: 'Cerere vagă', clear: 'Cerere clară',
    noteVague: 'O cerere vagă primește un răspuns vag.',
    noteClear: 'Același AI, o cerere clară, un răspuns mult mai bun. Asta îl învață Alex.',
    illustrative: 'Răspunsurile sunt exemple ilustrative.',
    own: 'Ai propria sarcină? Adu-o la o sesiune și lucrăm pe ea live.',
    tasks: [
      { label: 'Scrie un email',
        vague: { q: 'Ajută-mă cu emailul meu.', a: 'Sigur! Îmi poți spune mai multe? Cui îi este adresat și ce vrei să spui?' },
        clear: { q: 'Rescrie acest email către proprietarul apartamentului despre centrala stricată. Politicos, dar ferm, sub 100 de cuvinte.', a: 'Bună ziua, vă scriu despre centrala care s-a defectat săptămâna trecută. Puteți programa o reparație până vineri? Vă rog să-mi spuneți ce oră vi se potrivește. Mulțumesc!' } },
      { label: 'Planifică-mi săptămâna',
        vague: { q: 'Planifică-mi săptămâna.', a: 'Sigur! Iată un plan general: lucru dimineața, mișcare după-amiaza, relaxare seara. Spune-mi mai multe pentru un plan potrivit.' },
        clear: { q: 'Planifică-mi săptămâna: lucrez 9–17, vreau sală de 3 ori, 30 de minute de engleză pe zi și duminica liberă. Fă un tabel.', a: 'Lu: Lucru · Engleză 30′ · Sală\nMa: Lucru · Engleză 30′\nMi: Lucru · Engleză 30′ · Sală\nJo: Lucru · Engleză 30′\nVi: Lucru · Engleză 30′ · Sală\nSâ: Engleză 30′\nDu: Liber ☀' } },
      { label: 'Învață ceva',
        vague: { q: 'Explică blockchain.', a: 'Blockchain este o tehnologie de registru distribuit care înregistrează tranzacții pe multe computere folosind funcții hash criptografice și mecanisme de consens…' },
        clear: { q: 'Explică blockchain-ul ca pentru un copil de 12 ani, în 3 propoziții, cu un exemplu din viața de zi cu zi.', a: 'Imaginează-ți un caiet al clasei pe care îl are fiecare elev. Când cineva împrumută un creion, toți notează asta. Nimeni nu poate trișa, pentru că toate caietele trebuie să arate la fel.' } },
    ],
  },
  topics: {
    label: 'Ce vei învăța', title: 'Abilități pe care chiar le vei folosi.',
    items: [
      { icon: 'sparkles', title: 'AI, de la zero', text: 'Ce este, la ce se pricepe și unde greșește.' },
      { icon: 'message', title: 'Prompting care funcționează', text: 'Cere clar, primește răspunsuri mai bune și refolosește tiparele care merg.' },
      { icon: 'code', title: 'Construiește cu Claude Code', text: 'Transformă-ți ideea într-un instrument funcțional, chiar dacă n-ai programat niciodată.' },
      { icon: 'zap', title: 'Automatizări de zi cu zi', text: 'Lasă-i AI-ului lucrurile repetitive: emailuri, notițe, documentare, planificare.' },
      { icon: 'shield', title: 'Utilizare sigură și inteligentă', text: 'Confidențialitate, verificarea faptelor și cum îți dai seama când să nu te încrezi într-un răspuns.' },
      { icon: 'compass', title: 'Propriul tău plan', text: 'Un plan personal ca să continui să evoluezi mult după ce se termină sesiunile.' },
    ],
  },
  steps: {
    label: 'Cum funcționează', title: 'Trei pași. Atât.',
    items: [
      { icon: 'message', title: 'Spune salut', text: 'Programează o sesiune și spune-i lui Alex ce ți-ar plăcea să facă AI-ul pentru tine.' },
      { icon: 'zap', title: 'Învață făcând', text: 'Sesiuni practice construite în jurul sarcinilor tale reale, nu al prezentărilor.' },
      { icon: 'compass', title: 'Continuă', text: 'Suport după sesiuni și un plan, ca tot ce ai învățat să rămână.' },
    ],
  },
  about: {
    label: 'Despre', title: 'Cunoaște-l pe Alex.',
    paras: [
      'Alex este dezvoltator de software din București. A construit aplicații web și sisteme backend, a configurat fluxuri CI/CD și de automatizare și a lucrat direct cu clienți enterprise ca inginer de suport cloud, așa că este obișnuit să transforme problemele tehnice în răspunsuri clare, pe înțelesul tuturor.',
      'Îi învață pe ceilalți AI așa cum ar vrea el să fie învățat: practic, cu răbdare și fără jargon. Fie că deschizi un asistent AI pentru prima dată, fie că ești gata să-ți construiești propriul instrument cu Claude Code, te întâlnește exact unde ești.',
    ],
    chips: ['Dezvoltator de software', 'Python · JavaScript · C++', 'Suport Google Cloud & Apigee', 'Automatizări (n8n, Jenkins)', 'Engleză și română'],
    pillars: [
      { title: 'Limbaj simplu', text: 'Fiecare idee explicată fără jargon, pe nivelul tău.' },
      { title: 'Practic', text: 'Lucrezi pe sarcinile tale reale, live, cu instrumente reale.' },
      { title: 'Răbdător și flexibil', text: 'Ritmul tău, obiectivele tale, planul tău.' },
      { title: 'Experiență reală de inginer', text: 'Un dezvoltator în activitate care știe ce poate și ce nu poate face AI-ul.' },
    ],
  },
  servicesTeaser: { label: 'Servicii', title: 'Învață în felul tău.', more: 'Vezi toate serviciile' },
  kind: {
    label: 'Cuvinte frumoase', title: 'Fii unul dintre primii cursanți.',
    text: 'Sesiunile abia se deschid. Fii printre primii cursanți, iar părerea ta după câteva sesiuni ar putea apărea chiar aici.',
    cta: 'Programează o sesiune',
  },
  faq: {
    label: 'Întrebări', title: 'Întrebări frecvente.',
    items: [
      { q: 'Am nevoie de cunoștințe tehnice?', a: 'Deloc. Alex lucrează atât cu începători absoluți, cât și cu profesioniști cu experiență și pornește de unde ești tu.' },
      { q: 'Ce facem concret într-o sesiune?', a: 'Pornim de la ceva ce vrei să rezolvi (un text, un plan, o documentare, o idee) și lucrăm împreună, live, cu instrumente AI reale.' },
      { q: 'Prin ce diferă cele două variante?', a: 'Sesiunea ad hoc este individuală, de 60 de minute, și o programezi când ai nevoie. Sesiunea de grup este o sâmbătă întreagă, de 8 ore, cu un grup mic.' },
      { q: 'În ce limbi se țin sesiunile?', a: 'În engleză sau în română, cea în care te simți mai confortabil.' },
      { q: 'Trebuie să cumpăr vreun program?', a: 'Multe instrumente AI au versiuni gratuite. Alex te ajută să afli de ce ai nevoie cu adevărat înainte să cheltuiești ceva.' },
    ],
  },
  cta: { title: 'Ești gata să vezi ce poate face AI-ul pentru tine?', text: 'Programează o sesiune. Fără presiune, fără jargon, doar ajutor prietenos pentru ce vrei să realizezi.', btn: 'Programează o sesiune' },
  servicesPage: { label: 'Servicii', h1: ['Găsește ', 'calea potrivită', ' de a învăța.'], lead: 'Două variante simple: o sesiune individuală când ai nevoie sau o sâmbătă întreagă în grup.' },
  bundles: {
    single: { name: 'Sesiune ad hoc', tag: 'Individual', amt: '250 lei', note: 'pe sesiune · 1 persoană · 60 de minute', desc: 'O sesiune individuală concentrată pe o întrebare, o sarcină sau o idee. O programezi când ai nevoie: 60 de minute.', features: ['Parcurgere practică, live', 'Adaptată întrebării tale', 'Notițe după sesiune'] },
    group: { name: 'Sesiune de grup de sâmbătă', tag: 'Grup mic', amt: '300 lei', note: 'pe persoană · 8 ore · sâmbăta', desc: 'O zi întreagă de sâmbătă de învățat practic împreună cu un grup mic, de la bazele AI până la construirea a ceva al tău.', features: ['8 ore, într-o sâmbătă', 'Înveți alături de alți oameni', 'Practică cu instrumente AI reale', 'Notițe la care te poți întoarce'] },
  },
  ask: 'Programează', recommended: 'Recomandat',
  includes: { label: 'Mereu inclus', title: 'Fiecare sesiune include.', items: ['Predare prietenoasă, fără jargon', 'Practică cu instrumente AI reale', 'Orice nivel de start este binevenit', 'Notițe de sesiune la care te poți întoarce'] },
  book: {
    label: 'Programare', h1: ['Programează-ți ', 'sesiunea', '.'],
    lead: 'Alege o oră care ți se potrivește în calendarul lui Alex de mai jos. Primești imediat un email de confirmare.',
    altCal: 'Nu se vede calendarul? Deschide calendarul lui Alex',
    next_: { title: 'Ce urmează', items: [
      { icon: 'check', title: 'Primești confirmarea', text: 'Calendly îți trimite pe email ora și detaliile sesiunii imediat ce te programezi.' },
      { icon: 'zap', title: 'Înveți lucrând', text: 'Aduci ceva ce vrei să rezolvi și lucrați împreună la asta. Nu e nevoie de pregătire.' },
      { icon: 'compass', title: 'Continui', text: 'Programezi o nouă sesiune oricând ai nevoie sau te alături unui grup de sâmbătă.' },
    ] },
  },
  footer: '© 2026 Alex Croitoriu · București, România · Meditații AI pentru oricine',
};

export const LANGS = { en, ro };
export { bundleKeys };
