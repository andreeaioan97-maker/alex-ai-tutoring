# Alex Croitoriu · AI tutoring
Bilingual (EN/RO) static site: home, services and a booking-request calendar.
- Copy for both languages lives in `src/content.mjs`; run `node src/build.mjs` to regenerate the pages (Romanian, the default, at `*.html`; English at `en/*.html`; `ro/*.html` redirect old Romanian links).
- Booking settings (Alex's email, optional Calendly link, closed days) are in `assets/config.js`.
- GitHub Pages redeploys automatically after the nightly publish automation pushes to `main` (see `automations/publish-main.md`); do not push by hand.
