Object.assign(copy.en, {
  servicesTitle: 'How can I help your business <span class="accent">grow?</span>',
  servicesIntro: 'Campaigns, measurement and ongoing optimisation. From the first click to understanding results and deciding what comes next.',
  heroRole: 'Performance marketing · Data · Growth',
  heroTitle: 'Saif Shorfa<span>PERFORMANCE & MEASUREMENT</span>',
  heroPromise: 'Smarter spend.<br><strong>Measurable impact.</strong>',
  heroLead: 'I manage your campaigns and their measurement, so you know what drives results and where to invest next.',
  floatOne: 'Cost per recorded conversion',
  bridgeCopy: '<strong>Already running ads?</strong> Start with the problem affecting your results.',
  bridgeCta: 'Start with a short audit',
  workTitle: 'The work speaks.<br><span class="accent">In numbers.</span>',
  workIntro: 'Three projects. Different challenges. Decisions grounded in data.',
  caseOneTitle: 'Clearer measurement.<br>A more efficient clinic account.',
  caseTwoTitle: 'From campaigns to measurement.<br>A growth system for a legal app.',
  caseTwoCopy: 'We managed acquisition campaigns for a legal app serving women in Saudi Arabia, connecting Google Ads, Play Console, Firebase and GA4 to track the journey from install to usage and retention, and guide optimisation with clear data.',
  caseThreeTitle: 'From purchase intent.<br>To 9.5× ROAS.',
  caseDays: '25 days', detailToggle: 'Project details', openEvidence: 'View evidence ↗',
  clinicDetail: '<h4>Challenge</h4><p>A multi-specialty account requiring clearer structure and measurement for each objective.</p><h4>Execution</h4><p>Separated campaigns by specialty and city, redefined conversions and aligned bidding strategies.</p><h4>Recorded result</h4><p>814 conversions from July 1–25, 2026, with SAR 5,906.11 in spend. A recorded conversion does not necessarily represent a confirmed booking.</p>',
  appDetail: '<h4>Challenge</h4><p>Grow a legal app for women in Saudi Arabia and connect acquisition with usage measurement.</p><h4>Execution</h4><p>Connected Google Ads, Play Console, Firebase and GA4 to measure acquisition and retention.</p><h4>Recorded result</h4><p>5,070 paid installs at SAR 0.43 per install. Installs measure acquisition; user quality requires usage and retention data.</p>',
  storeDetail: '<h4>Challenge</h4><p>Low-quality paid traffic for a travel-bag store.</p><h4>Execution</h4><p>Isolated purchase terms in Exact Match, refined negative keywords and improved the product-to-checkout journey.</p><h4>Reported result</h4><p>SAR 105K revenue and 225 orders at 9.5× ROAS. Return on ad spend is not net profit.</p>'
});

// Count each visible result once, leaving the final value available to assistive technology.
if (motionOK) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);
      const el = entry.target;
      const finalText = el.textContent;
      const value = Number(finalText.replace(/[^\d.]/g, ''));
      const suffix = finalText.replace(/[\d,.]/g, '');
      const decimals = finalText.includes('.') ? 1 : 0;
      el.setAttribute('aria-label', finalText);
      const display = document.createElement('span');
      display.setAttribute('aria-hidden', 'true');
      el.replaceChildren(display);
      const start = performance.now();
      function frame(now) {
        const progress = Math.min((now - start) / 1000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        display.textContent = (value * eased).toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals}) + suffix;
        if (progress < 1) requestAnimationFrame(frame);
        else display.textContent = finalText;
      }
      requestAnimationFrame(frame);
    });
  }, {threshold: 0.5});
  document.querySelectorAll('.trust-num').forEach(el => counterObserver.observe(el));
}

const navigationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.querySelectorAll('a').forEach(link => {
      if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, {rootMargin: '-15% 0px -65% 0px'});
document.querySelectorAll('main > section[id]').forEach(section => navigationObserver.observe(section));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus();
  }
});
document.querySelectorAll('.case-details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) document.querySelectorAll('.case-details').forEach(other => {
      if (other !== details) other.open = false;
    });
  });
});

// A small, clearly illustrative result burst makes clicks feel connected to business outcomes.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const clickMessages = [
    '+$300 SALES', '+1 NEW ORDER', '+5 QUALIFIED LEADS',
    '+$120 REVENUE', '+1 NEW OPPORTUNITY', '+3 APP INSTALLS'
  ];
  let clickIndex = 0;
  document.addEventListener('click', event => {
    if (event.target.closest('.floating-whatsapp, #dialogClose, input, select, textarea')) return;
    const result = document.createElement('span');
    result.className = 'click-result';
    result.textContent = clickMessages[clickIndex++ % clickMessages.length];
    result.style.left = Math.min(Math.max(event.clientX, 100), innerWidth - 100) + 'px';
    result.style.top = Math.min(Math.max(event.clientY, 70), innerHeight - 60) + 'px';
    document.body.appendChild(result);
    result.addEventListener('animationend', () => result.remove(), {once: true});
  });
}

const servicePresentation = [
  {logos: [['google-ads', 'Google Ads'], ['meta', 'Meta']], color: '#81adff', ar: ['هيكلة الحملات وتوزيع الميزانية', 'خطة اختبارات وتحسين مستمر', 'تقرير أداء وتوصيات قابلة للتنفيذ'], en: ['Campaign structure and budget allocation', 'Testing plan and ongoing optimisation', 'Performance report and actionable recommendations'], proof: 'majesty-campaigns.png'},
  {logos: [['analytics', 'Google Analytics'], ['tag-manager', 'Google Tag Manager']], color: '#ffbe68', ar: ['خريطة الأحداث ومسار التحويل', 'إعداد التحويلات وقيمها', 'اختبار دقة البيانات والتتبّع'], en: ['Event map and conversion journey', 'Conversion and value configuration', 'Tracking and data accuracy checks'], proof: 'ga4-overview.jpeg'},
  {logos: [['firebase', 'Firebase'], ['google-play', 'Google Play']], color: '#f1c94e', ar: ['حملات اكتساب للتطبيق', 'ربط بيانات الإعلان والاستخدام', 'قياس التفاعل والاحتفاظ'], en: ['App acquisition campaigns', 'Connected advertising and usage data', 'Engagement and retention measurement'], proof: 'app-uac-year.jpeg'},
  {label: 'SEARCH', color: '#80d9b5', ar: ['تدقيق الفهرسة والمشاكل التقنية', 'خطة محتوى بنية شرائية', 'تحسين البنية والربط الداخلي'], en: ['Indexation and technical audit', 'Purchase-intent content plan', 'Site structure and internal linking']},
  {label: 'CONVERSION', color: '#b3b4f5', ar: ['تحليل نقاط التسرب في المسار', 'تحسين صفحات الهبوط والنماذج', 'فرضيات اختبار بمؤشرات نجاح'], en: ['Conversion funnel drop-off analysis', 'Landing page and form improvements', 'Test hypotheses with success metrics']},
  {logos: [['google-ads', 'Google Ads']], color: '#ef9a9a', ar: ['تشخيص سبب التعليق', 'معالجة المخالفات المرتبطة', 'تجهيز ملف الاستئناف والأدلة'], en: ['Suspension cause diagnosis', 'Relevant policy issue remediation', 'Appeal preparation and supporting evidence']}
];
document.querySelectorAll('#services .cap-card').forEach((card, index) => {
  const config = servicePresentation[index];
  card.style.setProperty('--service-color', config.color);
  const header = document.createElement('div');
  header.className = 'service-platforms';
  if (config.logos) config.logos.forEach(([file, name]) => {
    const brand = document.createElement('span');
    brand.className = 'platform-brand';
    const img = document.createElement('img');
    img.src = 'assets/' + file + '.svg';
    img.alt = '';
    img.width = 30;
    img.height = 30;
    brand.append(img, document.createTextNode(name));
    header.appendChild(brand);
  });
  else {
    const label = document.createElement('span');
    label.className = 'service-discipline';
    label.textContent = config.label;
    header.appendChild(label);
  }
  card.querySelector('.cap-icon').replaceWith(header);
  const output = document.createElement('div');
  output.className = 'service-output';
  const label = document.createElement('h4');
  label.dataset.i = 'deliverablesLabel';
  label.textContent = 'مخرجات العمل';
  output.appendChild(label);
  const list = document.createElement('ul');
  config.ar.forEach((value, item) => {
    const li = document.createElement('li');
    const key = 'deliverable' + index + '_' + item;
    li.dataset.i = key;
    li.textContent = value;
    ar[key] = value;
    copy.en[key] = config.en[item];
    list.appendChild(li);
  });
  output.appendChild(list);
  card.querySelector('.cap-list').before(output);
  if (config.proof) {
    const target = [...document.querySelectorAll('.proof-shot')].find(button => button.dataset.src === 'assets/' + config.proof);
    if (target && !target.hidden) {
      target.id = 'service-evidence-' + index;
      const link = document.createElement('a');
      link.className = 'service-evidence';
      link.href = '#' + target.id;
      link.dataset.i = 'serviceEvidence';
      link.textContent = 'شاهد مثالًا من العمل ↗';
      card.appendChild(link);
    }
  }
});
ar.deliverablesLabel = 'مخرجات العمل';
copy.en.deliverablesLabel = 'Deliverables';
ar.serviceEvidence = 'شاهد مثالًا من العمل ↗';
copy.en.serviceEvidence = 'See an example of the work ↗';

// Repeat the complete logo sequence so the marquee loops without a visible seam.
document.querySelectorAll('.client-track').forEach(track => {
  if (track.dataset.loopReady) return;
  [...track.children].forEach(item => track.appendChild(item.cloneNode(true)));
  track.dataset.loopReady = 'true';
});
