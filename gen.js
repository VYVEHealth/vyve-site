/* ═══════════════════════════════════════════════════════
   VYVE HEALTH — Global Stylesheet v2
   Corporate: Premium, data-led, enterprise-credible
   Individual: Warm, human, empowering
   Brand: Teal #1B7878 | Dark #0D2B2B | Warm White #FAFAF8
═══════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  /* Brand */
  --teal:       #1B7878;
  --teal-deep:  #134F4F;
  --teal-mid:   #2A9A9A;
  --teal-lt:    #5BBABA;
  --teal-pale:  #C8E8E8;
  --teal-wash:  #EBF5F5;
  --teal-whisp: #F4FAFA;

  /* Neutrals */
  --dark:       #0D2B2B;
  --slate:      #1E3A3A;
  --ink:        #2C4040;
  --body:       #445555;
  --muted:      #7A9090;
  --border:     #D8E8E8;
  --border-lt:  #EBF2F2;
  --warm-white: #FAFAF8;
  --white:      #FFFFFF;

  /* Accent */
  --gold:       #C8963C;
  --gold-lt:    #F0D8A8;

  /* Typography */
  --font-head: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, sans-serif;

  /* Spacing */
  --radius:     10px;
  --radius-lg:  18px;
  --radius-xl:  28px;

  /* Shadows */
  --shadow-sm:  0 2px 12px rgba(13,43,43,0.08);
  --shadow:     0 6px 32px rgba(13,43,43,0.12);
  --shadow-lg:  0 16px 56px rgba(13,43,43,0.18);
  --shadow-xl:  0 24px 80px rgba(13,43,43,0.24);

  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--white);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* ── Layout ─────────────────────────────────────────── */
.container        { max-width: 1160px; margin: 0 auto; padding: 0 32px; }
.container--narrow { max-width: 800px; margin: 0 auto; padding: 0 32px; }
.container--wide  { max-width: 1320px; margin: 0 auto; padding: 0 32px; }

/* ── Typography ─────────────────────────────────────── */
.display {
  font-family: var(--font-head);
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.headline {
  font-family: var(--font-head);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  line-height: 1.18;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.subhead {
  font-family: var(--font-head);
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
  line-height: 1.3;
  font-weight: 600;
}
.lead {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.8;
  color: var(--body);
  font-weight: 300;
}
.eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--teal);
}

/* ── Buttons ────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.92rem; font-weight: 600;
  cursor: pointer; transition: var(--transition);
  white-space: nowrap; border: 2px solid transparent;
  letter-spacing: 0.01em;
}
.btn--primary {
  background: var(--teal); color: var(--white);
}
.btn--primary:hover {
  background: var(--teal-deep);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(27,120,120,0.35);
}
.btn--outline {
  border-color: var(--teal); color: var(--teal); background: transparent;
}
.btn--outline:hover {
  background: var(--teal-wash);
}
.btn--white {
  background: var(--white); color: var(--teal);
}
.btn--white:hover {
  background: var(--teal-wash);
  transform: translateY(-2px);
}
.btn--dark {
  background: var(--dark); color: var(--white);
}
.btn--dark:hover {
  background: var(--slate);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}
.btn--ghost {
  border-color: rgba(255,255,255,0.35); color: var(--white); background: transparent;
}
.btn--ghost:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.6);
}
.btn--lg { padding: 18px 36px; font-size: 1rem; border-radius: 10px; }
.btn--sm { padding: 10px 20px; font-size: 0.85rem; }
.btn svg { width: 16px; height: 16px; flex-shrink: 0; }

/* ── Navigation ─────────────────────────────────────── */
.nav {
  position: sticky; top: 0; z-index: 200;
  background: rgba(250,250,248,0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-lt);
}
.nav__inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; max-width: 1160px; margin: 0 auto; height: 72px;
}
.nav__logo { display: flex; align-items: center; gap: 10px; }
.nav__logo-mark {
  width: 34px; height: 34px; background: var(--teal); border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.nav__logo-mark svg { width: 18px; height: 18px; fill: white; }
.nav__logo-name {
  font-family: var(--font-head); font-size: 1.35rem; font-weight: 700;
  color: var(--dark); letter-spacing: -0.01em;
}
.nav__logo-name span { color: var(--teal); }
.nav__links { display: flex; align-items: center; gap: 2px; }
.nav__link {
  padding: 8px 14px; border-radius: 6px;
  font-size: 0.88rem; font-weight: 500; color: var(--ink);
  transition: var(--transition);
}
.nav__link:hover { background: var(--teal-wash); color: var(--teal); }
.nav__link.active { color: var(--teal); font-weight: 600; }
.nav__cta { margin-left: 12px; }
.nav__mobile { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
.nav__mobile svg { width: 22px; height: 22px; stroke: var(--dark); fill: none; stroke-width: 2; stroke-linecap: round; }

/* ── Hero base ──────────────────────────────────────── */
.hero { padding: 96px 0 80px; position: relative; overflow: hidden; }

/* ── Sections ───────────────────────────────────────── */
.section { padding: 96px 0; }
.section--light { background: var(--warm-white); }
.section--wash  { background: var(--teal-whisp); }
.section--dark  { background: var(--dark); }
.section--teal  { background: var(--teal); }

.section__header { margin-bottom: 56px; }
.section__header .eyebrow { display: block; margin-bottom: 14px; }
.section__header .headline { color: var(--dark); margin-bottom: 16px; }
.section__header .lead { max-width: 580px; }
.section__header--center { text-align: center; }
.section__header--center .lead { margin: 0 auto; }
.section--dark .headline { color: var(--white); }
.section--dark .lead { color: var(--teal-pale); }
.section--dark .eyebrow { color: var(--teal-lt); }

/* ── Stat strip ─────────────────────────────────────── */
.stat-strip { background: var(--dark); padding: 36px 0; }
.stat-strip__inner {
  display: flex; justify-content: space-around;
  align-items: center; flex-wrap: wrap; gap: 24px;
}
.stat-item { text-align: center; }
.stat-item__value {
  font-family: var(--font-head); font-size: 2.4rem;
  font-weight: 700; color: var(--white); line-height: 1;
}
.stat-item__value em { color: var(--teal-lt); font-style: normal; }
.stat-item__label { font-size: 0.8rem; color: var(--teal-pale); margin-top: 6px; }
.stat-item__source { font-size: 0.68rem; color: var(--muted); margin-top: 2px; }

/* ── Cards ──────────────────────────────────────────── */
.cards { display: grid; gap: 24px; }
.cards--2 { grid-template-columns: repeat(2, 1fr); }
.cards--3 { grid-template-columns: repeat(3, 1fr); }
.cards--4 { grid-template-columns: repeat(4, 1fr); }

.card {
  background: var(--white); border-radius: var(--radius-lg);
  padding: 32px; border: 1px solid var(--border);
  transition: var(--transition);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--teal-pale);
}
.card__icon {
  width: 48px; height: 48px; border-radius: 12px;
  background: var(--teal-wash); display: flex;
  align-items: center; justify-content: center; margin-bottom: 20px;
}
.card__icon svg { width: 24px; height: 24px; stroke: var(--teal); fill: none; stroke-width: 2; }
.card__eyebrow { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal-lt); margin-bottom: 8px; }
.card__title { font-family: var(--font-head); font-size: 1.15rem; font-weight: 700; color: var(--dark); margin-bottom: 10px; line-height: 1.3; }
.card__body { font-size: 0.9rem; color: var(--body); line-height: 1.72; }
.card--dark { background: var(--dark); border-color: var(--dark); }
.card--dark .card__title { color: var(--white); }
.card--dark .card__body { color: var(--teal-pale); }
.card--teal { background: var(--teal); border-color: var(--teal); }
.card--teal .card__title { color: var(--white); }
.card--teal .card__body { color: rgba(255,255,255,0.8); }

/* ── Two column layout ──────────────────────────────── */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.two-col--flip .two-col__image { order: -1; }
.two-col__image { border-radius: var(--radius-xl); overflow: hidden; }
.two-col__image img { width: 100%; height: 460px; object-fit: cover; }
.two-col .eyebrow { display: block; margin-bottom: 14px; }
.two-col .subhead { color: var(--dark); margin-bottom: 16px; }
.two-col .lead { margin-bottom: 24px; }

/* ── Check list ─────────────────────────────────────── */
.check-list { display: flex; flex-direction: column; gap: 10px; }
.check-list li {
  display: flex; gap: 12px; align-items: flex-start;
  font-size: 0.92rem; color: var(--ink);
}
.check-list li::before {
  content: '';
  width: 20px; height: 20px; min-width: 20px;
  background: var(--teal-wash) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B7878' stroke-width='2.5'%3E%3Cpolyline points='20,6 9,17 4,12'/%3E%3C/svg%3E") center/13px no-repeat;
  border-radius: 50%; margin-top: 2px; flex-shrink: 0;
}

/* ── Callout / Quote ────────────────────────────────── */
.callout {
  background: var(--dark); border-radius: var(--radius-xl);
  padding: 56px; position: relative; overflow: hidden;
}
.callout::before {
  content: '\201C';
  position: absolute; top: -10px; left: 24px;
  font-size: 12rem; color: rgba(27,120,120,0.18);
  font-family: Georgia, serif; line-height: 1;
  pointer-events: none;
}
.callout__text {
  font-family: var(--font-head); font-size: clamp(1.1rem, 2vw, 1.45rem);
  color: var(--white); line-height: 1.65; position: relative; z-index: 1;
  font-style: italic;
}
.callout__attr { margin-top: 20px; font-size: 0.85rem; color: var(--teal-lt); font-weight: 500; }

/* ── CTA section ────────────────────────────────────── */
.cta-band {
  background: linear-gradient(135deg, var(--dark) 0%, #0f3535 60%, var(--teal-deep) 100%);
  padding: 100px 0; text-align: center; position: relative; overflow: hidden;
}
.cta-band::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(27,120,120,0.2) 0%, transparent 70%);
  pointer-events: none;
}
.cta-band .display { color: var(--white); margin-bottom: 20px; }
.cta-band .lead { color: rgba(255,255,255,0.7); margin-bottom: 40px; max-width: 500px; margin-left: auto; margin-right: auto; }
.cta-band__btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; position: relative; z-index: 1; }

/* ── Footer ─────────────────────────────────────────── */
.footer { background: #061414; padding: 72px 0 36px; }
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 56px; }
.footer__logo-name { font-family: var(--font-head); font-size: 1.4rem; font-weight: 700; color: var(--white); }
.footer__logo-name span { color: var(--teal-lt); }
.footer__tagline { color: var(--muted); font-size: 0.88rem; margin-top: 12px; line-height: 1.75; max-width: 240px; }
.footer__col-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal-lt); margin-bottom: 18px; }
.footer__links li { margin-bottom: 10px; }
.footer__links a { color: var(--muted); font-size: 0.88rem; transition: var(--transition); }
.footer__links a:hover { color: var(--teal-pale); }
.footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 28px; display: flex; justify-content: space-between;
  align-items: center; flex-wrap: wrap; gap: 12px;
}
.footer__copy { font-size: 0.8rem; color: var(--muted); }
.footer__badges { display: flex; gap: 10px; }
.footer__badge {
  padding: 5px 12px; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px; font-size: 0.7rem; font-weight: 600; color: var(--muted);
  letter-spacing: 0.04em;
}

/* ── Pill / Tag ─────────────────────────────────────── */
.pill {
  display: inline-block; padding: 5px 14px; border-radius: 20px;
  font-size: 0.76rem; font-weight: 600; letter-spacing: 0.02em;
}
.pill--teal   { background: var(--teal-wash); color: var(--teal); }
.pill--dark   { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); }
.pill--gold   { background: var(--gold-lt); color: var(--gold); }
.pill--white  { background: rgba(255,255,255,0.15); color: var(--white); border: 1px solid rgba(255,255,255,0.25); }

/* ── Animations ─────────────────────────────────────── */
.fade-up {
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }
.fade-in { opacity: 0; transition: opacity 0.7s ease; }
.fade-in.visible { opacity: 1; }

/* staggered children */
.stagger > * { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.stagger.visible > *:nth-child(1) { opacity:1; transform:none; transition-delay:0s; }
.stagger.visible > *:nth-child(2) { opacity:1; transform:none; transition-delay:0.1s; }
.stagger.visible > *:nth-child(3) { opacity:1; transform:none; transition-delay:0.2s; }
.stagger.visible > *:nth-child(4) { opacity:1; transform:none; transition-delay:0.3s; }
.stagger.visible > *:nth-child(5) { opacity:1; transform:none; transition-delay:0.4s; }
.stagger.visible > *:nth-child(6) { opacity:1; transform:none; transition-delay:0.5s; }

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .cards--4 { grid-template-columns: repeat(2, 1fr); }
  .footer__grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .hero { padding: 72px 0 60px; }
  .two-col { grid-template-columns: 1fr; gap: 40px; }
  .two-col__image { display: none; }
  .cards--2, .cards--3 { grid-template-columns: 1fr; }
  .nav__links { display: none; }
  .nav__cta { display: none; }
  .nav__mobile { display: flex; }
  .footer__grid { grid-template-columns: 1fr; gap: 32px; }
  .section { padding: 72px 0; }
  .stat-strip__inner { gap: 32px; }
  .callout { padding: 36px 28px; }
}
@media (max-width: 480px) {
  .display { font-size: 2.1rem; }
  .container { padding: 0 20px; }
  .cta-band__btns { flex-direction: column; align-items: center; }
  .btn--lg { width: 100%; justify-content: center; }
}

/* Mobile nav open */
.nav.open .nav__links {
  display: flex; flex-direction: column;
  position: absolute; top: 72px; left: 0; right: 0;
  background: var(--warm-white); border-bottom: 1px solid var(--border);
  padding: 16px 20px; gap: 4px; z-index: 199;
}

/* ── SVG safety ─────────────────────────────────────── */
.card__icon svg,
.nav__logo-mark svg,
.nav__mobile svg,
.chooser__logo-mark svg {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
