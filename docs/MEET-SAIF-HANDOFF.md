# SAIF SHORFA — Developer Handoff | V1.0
**المشروع:** صفحة شخصية Premium Landing Page + Portfolio لخدمات الإعلانات الممولة.
**حالة الملف:** Developer-ready prototype + documented spec. الأصول المرجعية والـ SVG والبورتريه موجودة داخل `assets/`.
**المرجع المعتمد:** `assets/hero-approved-reference.jpg` — النسخة الفاتحة بعنوان **Meet Saif**، وصورة شخصية يمينًا، وخلفية Off-white ومربعات Grid خفيفة.
**الهوية البصرية:** Modern Editorial / Quiet Luxury / Minimal Swiss Grid.

## 0) مبادئ ثابتة غير قابلة للتغيير دون اعتماد
1. **المحتوى الأساسي:** Meta Ads وGoogle Ads. لا يُعرض SEO كخدمة في النسخة الجديدة.
2. **الشعار:** أيقونة S هي **أول حرف من Saif**، ثم يُكتب **`aif Shorfa`** بجوارها مباشرة. ممنوع `S + Saif Shorfa`؛ هذا يكرر S ويُفقد التكامل.
3. **الـ Hero المعتمد:** العنوان `Meet Saif` مع صورة شخصية، خلفية بيضاء دافئة ونص أسود، وليس dark theme شاملًا.
4. **Grid خفيف:** خلف الصورة والمحتوى لا فوق الوجه، تتحرك الطبقات بخفة مع المؤشر (parallax).
5. **لا تعرض أرقامًا تجريبية:** `50+ Campaigns` و`3x Average ROAS` و`100% results focused` ظهرت في mockup للعرض فقط، ولم تُثبت كمقاييس عامة. تُستبدل بحالات النتائج الحقيقية الموثقة أدناه.
6. **الصور المرجعية ليست صور خلفية جاهزة:** لا تضع لقطة التصميم كاملة داخل `<img>` كصفحة؛ يجب تفكيكها إلى HTML/CSS responsive وصورة معزولة ونصوص حقيقية.
7. **لا شعارات جهات عملاء، أو بيانات شخصية من screenshots، دون الإذن المناسب.**

## 1) الاستراتيجية التسويقية والتموضع
**Primary positioning:** Independent Paid Media Specialist — Meta Ads & Google Ads.
**وعد القيمة:** بناء حملات اكتساب مُدارة بالأرقام، بربط الإنفاق بالنتيجة من خلال تتبّع واضح، اختبارات مضبوطة، وتحسين مستمر.
**الجمهور:** ملاك ومتخذو القرار في متاجر إلكترونية، شركات خدمات وتطبيقات تعمل بالسعودية والخليج، لديهم ميزانيات إعلانية وأهداف نمو واضحة.
**التحويل الرئيسي:** التواصل لطلب مراجعة حساب إعلاني أو نقاش مشروع عبر WhatsApp.
**التحويل الثانوي:** فتح تفاصيل نتائج فعلية، قراءة حالات، إرسال الاستفسار.
**اللغة:** نسخة إنجليزية أولية مطابقة للمرجع البصري؛ توفير محتوى عربي ملائم للسعودية والخليج، وإنشاء مسار /ar لاحقًا أو ضمن النسخة الأولى بحسب الوقت.

## 2) الألوان والستايل
| Token | HEX | استخدام |
|---|---|---|
| background | #F7F5F0 | خلفية عامة دافئة (ليست أبيض ثلجي) |
| background-soft | #EFECE5 | خلفيات أقسام وجزء من بطاقة المشروع |
| ink | #101010 | عناوين وشعار |
| ink-soft | #5E5C58 | وصف/نص ثانوي |
| line | #DCD8D0 | حدود وفواصل Grid |
| accent | #B9A992 | لون ثانوي خفيف، **ليس** لون CTA |
| black | #0F0F0F | زر CTA والأقسام الداكنة الاختيارية |
| white | #FFFFFF | نص أبيض على CTA |

**ممنوع:** Gradients زاهية، بطاقات بلا حدود وبظلال كثيفة، glassmorphism، ألوان صاخبة، animating every component. يفضل ظل ناعم جدًا تحت البورتريه أو طبقته إذا احتاج عمق.

## 3) Typography
- **Editorial Display:** `Bodoni Moda` 500/600 لعنوان Meet Saif، عناوين الأقسام الكبيرة، والكلمة المطبوعة `aif Shorfa` بجوار الأيقونة. بديل قريب عند تجربة المطابقة: `Playfair Display`.
- **Interface / Body:** `Manrope` 400/500/600/700 للأزرار، Navigation، وصف الخدمات، والأرقام الوصفية.
- **Arabic:** `IBM Plex Sans Arabic` 400/500/600. عناوين العربية يمكن استخدام الخط نفسه بوزن أقوى دون خلط Serif لاتيني بعشوائية.
- **Micro labels:** `Manrope` uppercase، Letter spacing 0.20em، حجم 10–12px.
- **Hero title desktop:** clamp(92px, 11vw, 184px)، line-height 0.87–0.95، letter-spacing -0.055em؛ يضبط بصريًا حسب العرض حتى لا يصطدم بالوجه.
- **Hero title mobile:** clamp(66px, 16vw, 108px)، سطر أو سطران وفق الشاشة.
- **Section heading:** clamp(48px, 6vw, 94px)، body text 16–19px line-height 1.5–1.7.
- **لا توزع خطوطا كثيرة:** عائلة display + body + Arabic فقط.
- رابط الخطوط: https://fonts.google.com/specimen/Bodoni+Moda ، https://fonts.google.com/specimen/Manrope ، https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic

## 4) الشعار وملفاته
- `assets/s-monogram.svg`: حرف S Ribbon مصمم من الأيقونة المرجعية ومحوّل إلى Vector SVG تجريبي نظيف (مناسب للاستعمال الأولي).
- `assets/logo-integrated.svg`: الشعار الأساسي المتكامل vector outlines مستخرج من المرجع المعتمد؛ أيقونة S هي الحرف الأول، يتبعها `aif Shorfa`، **لا تكرر S**.
- `assets/logo-integrated-editable.svg`: نسخة مرنة قابلة لتغيير الخط والنص، لكنها تعتمد على توافر Bodoni Moda/Playfair/Georgia وتحتاج مراجعة الـ kerning.
- `assets/favicon.svg`، `assets/favicon-512.png` لاستخدام الأيقونة المستقلة فقط في التبويب.
- **Hero:** اعرض الشعار صغيرًا نسبيًا يسار الـ Header (24–30px ارتفاعًا)؛ لا تنافس الـ H1.
- **Logo refinements:** يعاد ضبط المسافة بين الأيقونة والحرف `a` (optical kerning) بعد تحميل خط Bodoni Moda الفعلي؛ النسخة الأساسية `logo-integrated.svg` مسارات SVG وليست نصًا متغير الخط؛ احتفظ بالنسخة editable للضبط المستقبلي، وراجع curve smoothing قبل الاعتماد النهائي للطباعة.
- **الأصل المرجعي:** `assets/logo-reference.jpg` (لا يستخدم في الإنتاج كشعار).

## 5) تخطيط الصفحة Desktop > 1200px
- Max content width: 1440px أو 1520px. Side padding: 56–72px؛ 24px على tablet؛ 18px على mobile.
- Nav height: 76–88px. يسار شعار متكامل، وسط `Work / Approach / About`, يمين `Let's Talk` أو زر contact صغير؛ عند التمرير sticky بحد سفلي رقيق وخلفية off-white شبه معتمة.
- Hero min-height ~ min(900px, 100svh) بحسب حجم الشاشة؛ Desktop layout 12-col grid: text x=1..7, portrait x=7..12 مع تداخل بصري محسوب.
- Top eyebrow: `GROWTH  ·  CAMPAIGNS  ·  PERFORMANCE` من دون SEO.
- H1 الأساسي: `Meet Saif` و **لا يوضع S icon داخل H1**؛ الشعار فقط في الـ Header.
- Header title hero visible from top ~190–240px on 1440 wide and may overlap portrait hair. Keep text legible, no face obstruction.
- Portrait bottom anchored right, width ~50–57% of container, object-fit contain، z-index above grid and adjacent to H1 (exact overlap adjusted to match mockup). لا يقص الوجه واليدين في desktop.
- Body below title left: `Meta Ads • Google Ads • Performance Growth` (20–26px)، ثم paragraph ~2–3 lines.
- CTA solid black rounded pill `Explore Selected Work →` ؛ secondary text action optional `Let's Talk ↗`.
- Bottom proof strip: 3 **case-based verifiable** metrics rather than combined brand averages. Example: `814 recorded conversions`, `5,070 paid installs`, `9.5× reported ROAS`. أضف سياقًا صغيرًا وتوضيحًا أن النتائج تخص حالات مختلفة.
- Floating grid: خطوط 1px وشفافية 12–22%، ومربعات فارغة بأحجام 24/42/64/90px، حول右 الصورة وليس فوق الوجه؛ استخدم CSS + JS parallax فقط.

## 6) Tablet & Mobile
**Tablet 768–1199:** Portrait ~46–52%; shift H1 to avoid face; font clamp, grid softer.
**Mobile <= 767:** Navbar 64px؛ logo height 23–26px؛ hamburger accessible. ترتيب: eyebrow، H1، تخصصات، وصف، CTA، ثم صورة/بورتريه (تظهر في أول الشاشة حسب الجهاز لكن لا تغطي CTA)، ثم social proof. لا تستخدم position:absolute للصورة إن تسبب horizontal overflow. عرض portrait 92–100%، قص أسفل البنطال مسموح، وجه كامل واضح. Grid opacity أقل. Card list stacked.
**Small <= 375px:** عنوان لا يتجاوز 2 أسطر، أزرار full width عند الحاجة، مسافة داخلية 16px.

## 7) ترتيب الأقسام والمحتوى الجاهز (English V1)
### SECTION 01 — HERO
Eyebrow: `GROWTH · CAMPAIGNS · PERFORMANCE`
H1: `Meet Saif`
Role line: `Meta Ads · Google Ads · Performance Marketing`
Supporting copy: `I build and optimize paid campaigns that help ambitious brands reach the right people, acquire customers, and make smarter growth decisions.`
Primary CTA: `Explore Selected Work` → #work
Secondary CTA: `Let's Talk` → #contact
Tiny caption: `Independent Paid Media Specialist · KSA & GCC`

### SECTION 02 — TRUST / RESULT STRIP
- `814` / `Recorded conversions · Healthcare Google Ads · 25 days`
- `5,070` / `Paid app installs · Google Ads campaign`
- `9.5×` / `Reported ROAS · E-commerce Google Ads`
**Disclaimer:** `Selected project results. Outcomes vary by business, budget and measurement setup.`

### SECTION 03 — SELECTED WORK
Headline: `Selected work. Real performance.`
Intro: `Not just dashboards. Decisions, execution, and measurable outcomes.`
**Case 01 (Healthcare):** Google Ads · Lead Generation. `814 recorded conversions in 25 days at SAR 7.26 per recorded conversion.` Work: restructure by service/location, refine conversion definitions and bidding. Disclaimer: recorded conversions may not equal confirmed bookings. Public source: https://saif-shorfa.netlify.app/ . Proof asset: https://saif-shorfa.netlify.app/assets/majesty-campaigns.png
**Case 02 (Mobile App):** Google App Campaigns · Acquisition. `5,070 paid installs at SAR 0.43 per install.` Work: measure acquisition via Google Ads, Firebase, GA4 & Play Console. Disclaimer: installations are not retained users. Public proof: https://saif-shorfa.netlify.app/assets/app-uac-year.jpeg
**Case 03 (E-commerce):** Google Ads · Search. `SAR 105K reported revenue; 225 completed orders; 9.5× ROAS.` Work: high-intent search terms, exact match, negatives and funnel improvements. Disclaimer: ROAS is not profit. On existing site, proof screenshot for this specific case not clearly exposed — request original approved evidence before enabling proof button.
**Meta case:** not yet published/verified on current site. Reserve a slot in content model but DO NOT publish a speculative metric. Request approved before/after Meta export and campaign dates to publish a Meta case (preferably E-commerce/Sales or Lead Gen).

### SECTION 04 — SERVICES (only TWO lead categories)
Heading: `Two platforms. One performance mindset.`
**Meta Ads** — `Strategy, creative testing, audience signals, full-funnel campaigns, retargeting, and ongoing optimization across Facebook and Instagram.`
**Google Ads** — `Search, Shopping, Performance Max and app acquisition — managed around search intent, conversion quality and business outcomes.`
**Supporting capability ribbon (NOT separate main service cards):** `Tracking & Measurement — GA4 · GTM · Meta Pixel · Conversions API · Firebase`.
No separate SEO, website design, social media management, or overly broad agency grid.

### SECTION 05 — PROCESS
Heading: `Clarity before scale.`
1. `Audit` — Review your account structure, funnel, economics and measurement reliability.
2. `Build` — Set up focused campaigns and accurate tracking tied to business goals.
3. `Test` — Run clear experiments across audiences, creatives, search intent and landing pages.
4. `Optimize` — Improve based on real conversion quality, not vanity metrics.

### SECTION 06 — ABOUT
Heading: `The person behind the performance.`
Copy: `I'm Saif Shorfa, an independent paid media specialist working with brands in Saudi Arabia and across the GCC. I combine campaign execution, analytics, and clear communication to help businesses make better advertising decisions.`
Optional supporting details: `Direct collaboration`, `Arabic & English`, `KSA & GCC`.
Do not invent years or client names. Years of experience can be added only after confirming preferred exact public phrasing.

### SECTION 07 — CONTACT
Heading: `Let's make your next move count.`
Subtext: `Tell me what you're running, what's not working, and what you'd like to improve. I'll help identify the next practical step.`
Fields: `Name*`, `Business / website`, `Platform* (Meta / Google / Both)`, `Monthly ad budget (range)`, `Biggest challenge*`.
Main CTA: `Send via WhatsApp ↗`. Form constructs wa.me prefilling all fields; do not silently transmit data to arbitrary third parties.
Source site public contact: `https://wa.me/970597200690`, `mailto:saif.shorfa@gmail.com`. Reconfirm number before go-live.

### SECTION 08 — FOOTER
`S [mark] + aif Shorfa` | `Meta Ads · Google Ads · Growth` | `© 2026 Saif Shorfa`
Links to Work, About, Contact, LinkedIn. Avoid fabricated accreditation badges.

## 8) Arabic localized content (copy — not literal translation)
- Hero eyebrow: `نمو · حملات إعلانية · أداء`
- H1: `تعرّف على سيف` (في النسخة العربية)
- Hero role: `حملات Meta وGoogle · تسويق الأداء`
- Hero body: `أبني وأحسّن الحملات الإعلانية للوصول إلى العملاء المناسبين وتحويل الإنفاق إلى قرارات ونتائج واضحة، من إعداد التتبع إلى التحسين المستمر.`
- CTA main: `شاهد أبرز الأعمال`؛ secondary: `تواصل معي`
- Work title: `أعمال مختارة. نتائج بالأرقام.`
- Services title: `منصتان. تركيز واحد على الأداء.`
- Meta service: `تخطيط وإدارة حملات فيسبوك وإنستغرام، اختبار المحتوى والجمهور، إعادة الاستهداف، وتحسين الأداء في مختلف مراحل رحلة العميل.`
- Google service: `إدارة البحث وShopping وPerformance Max وحملات التطبيقات، مع تركيز على نية البحث وجودة التحويل والعائد التجاري.`
- Process title: `الوضوح قبل التوسّع.`
- About title: `تتعامل معي مباشرة.`
- Contact title: `خلينا نحدد الخطوة القادمة.`

## 9) Behavior + microinteractions
**Grid pointer parallax:** use requestAnimationFrame; pointer x/y relative to the HERO section; max translation 12–16px for nearest squares and 4–8px for far grid. Easing ~0.07–0.1. Constrain transforms; on touch use no mouse effect. Respect `prefers-reduced-motion: reduce` and stop parallax for reduced motion. See `starter/script.js`.
**Intro reveal:** CSS opacity + translateY 12–18px over 600–900ms. No giant loading screens or animations hiding content.
**Buttons:** dark fill, small arrow shift 3–5px on hover; clear keyboard focus ring.
**Scroll:** content reveals once via IntersectionObserver or native `animation-timeline` with fallback. Avoid heavy GSAP unless truly needed; no WebGL mandatory.
**Navbar:** transparent to warm offwhite on scroll, no jump.
**Proof screenshots:** open modal/lightbox only for proven assets; include accessible close button, escape key, keyboard focus handling.

## 10) Technical stack and components
**Recommended:** Astro + React islands for tiny interactive bits (cursor grid, language chooser/form) OR Next.js if existing workflow depends on it. If current repo is plain HTML/React, no migration required for appearance; use CSS and JS. `starter/` includes a lightweight, framework-neutral prototype which can be ported.

Suggested components: `SiteHeader`, `MonogramWordmark`, `Hero`, `FloatingGrid`, `ProofStrip`, `CaseStudyList`, `PlatformCapabilities`, `Process`, `About`, `ContactForm`, `SiteFooter`.

**Design tokens:** `starter/styles.css` top `:root`.
**Data source:** `content/portfolio.en.json`, `content/portfolio.ar.json`; easy to edit.

## 11) Accessibility / SEO / performance
- True H1 once; semantic `main`, `section`, headings, descriptive button links, meaningful alt for portrait.
- Contrast for body >= WCAG AA; don't rely on faint tiny grey type for meaning.
- Mobile nav keyboard accessible with `aria-expanded` and focus management; no horizontal overflow.
- LCP prioritize portrait / font / hero; hero cutout `webp`, width/height declared, no lazy load. Other images lazy, responsive `srcset` after export.
- Avoid large unoptimized screenshots as thumbnails; use crops/WebP and click for originals only where permissions allow.
- Reduce CLS: reserve image aspect ratios; preconnect Google Fonts or self-host fonts with proper rights, `font-display: swap`.
- SEO English title proposal: `Saif Shorfa | Meta Ads & Google Ads Specialist`.
- SEO description: `Independent Meta and Google Ads specialist helping ambitious businesses grow through paid acquisition, measurement, and ongoing optimization. KSA & GCC.`
- Arabic title: `سيف الشرفا | متخصص إعلانات Meta وGoogle Ads`.
- Arabic meta description: `إدارة وتحسين الحملات الممولة على Meta وGoogle للشركات والمتاجر، مع قياس واضح للنتائج واستراتيجيات نمو مدروسة في السعودية والخليج.`
- Canonical / hreflang if language locales both live; OpenGraph hero image derived from approved visual without misleading performance figures; JSON-LD `Person` and `ProfessionalService` only for verifiable data, no fake Review or rating schema.
- Measure conversion: `view_case_study`, `click_whatsapp_cta`, `contact_form_submit` (when user taps CTA), `click_email`, `language_switch`, deduplicate events by source; UTM tracking and consent compliant with destination region.
- Privacy: no sending contact form data without click; mask third-party account IDs/names in proofs.

## 12) Files in this package
```
saif-shorfa-handoff/
  README_AR.md
  QA_CHECKLIST.md
  content/
    portfolio.en.json
    portfolio.ar.json
  assets/
    hero-approved-reference.jpg       # visual reference only
    logo-reference.jpg                # visual reference only
    saif-portrait-transparent.png      # isolated portrait, RGBA
    saif-portrait.webp                 # optimized web production candidate
    s-monogram.svg                    # traced vector S
    logo-integrated.svg               # single outlined wordmark: S + aif Shorfa
    logo-integrated-editable.svg      # editable text version
    favicon.svg / favicon-512.png
    s-monogram-black.png
  starter/
    index.html
    styles.css
    script.js
```
**ملاحظة حول الصور:** البورتريه المعزول مولّد/معالج بالذكاء الاصطناعي اعتمادًا على صورك والموك أب؛ اعتمد الملامح والإضاءة قبل النشر النهائي. مرجع الـ Hero يحتوي نصوصًا، وهو للمطابقة فقط. مقاطع صور الإثبات الموجودة على الموقع الأصلي ينبغي استرجاع ملفاتها الأصلية من مستودع الموقع والتأكد من إخفاء بيانات العميل.

## 13) خطة تسليم العمل للمبرمج
1. يوم/مرحلة 1: انسخ المتغيرات، الخطوط، الشعار المدمج، والـ Hero كما بالمرجع (Desktop & Mobile) وأرسل معاينة.
2. مرحلة 2: ابنِ أقسام العمل/الخدمات/المنهجية/عني/التواصل من الـ JSON.
3. مرحلة 3: أضف الحركة الدقيقة للـ Grid، lazy loading، SEO، analytics، وتجربة الأجهزة.
4. مرحلة 4: تدقيق دقة النتائج والموافقة على محتوى Meta وإثباته، ثم إطلاق V1.

**شرط القبول:** في العرض الأول يجب أن نرى نفس هدوء وفخامة المرجع، وجهًا واضحًا، عنوانًا ضخمًا بلا قص، شعارًا حرفيًا `S + aif Shorfa` وليس `S + Saif Shorfa`، وحركة خلفية يكاد الزائر يلاحظها لا تُشتت الانتباه.

## 14) مصادِر بيانات النتائج
- الموقع الأصلي: https://saif-shorfa.netlify.app/
- لقطة حالة Healthcare: https://saif-shorfa.netlify.app/assets/majesty-campaigns.png
- لقطة App installs: https://saif-shorfa.netlify.app/assets/app-uac-year.jpeg
- صورة الموقع الأصلي: https://saif-shorfa.netlify.app/assets/portrait-saif.webp
- تم الاطلاع على الموقع في 12 أكتوبر 2026. لا تمثل الأرقام وعودًا أو معدلات مستقبلية.
