// Shared, light article metadata for مختبر النمو (Growth Lab). It ships in
// the client bundle, so keep long text (summary, FAQ, body) in
// articles.body.js, which is server-rendered only.
export const blog = {
  name: "مختبر النمو",
  title: "مختبر النمو: إعلانات وقياس للشركات والمتاجر في الخليج",
  description:
    "أدلة عملية من إدارة حسابات Google وMeta تساعدك على فهم النتائج، وتشخيص مشكلات القياس، واتخاذ قرار الإعلان التالي.",
  author: "سيف الشرفا",
  authorRole: "متخصص Meta Ads وGoogle Ads",
};

// Exactly four categories, each with its own written introduction.
export const categories = [
  {
    slug: "meta-ads",
    name: "Meta Ads",
    title: "مقالات Meta Ads: فيسبوك وإنستغرام للشركات والمتاجر",
    intro:
      "أدلة عن إعلانات فيسبوك وإنستغرام وحملات الرسائل وواتساب: كيف تقرأ النتائج، وكيف تفرّق بين محادثة رخيصة وعميل حقيقي، وماذا تراجع قبل زيادة الميزانية.",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    title: "مقالات Google Ads: البحث والتسوق وPerformance Max",
    intro:
      "أدلة عن حملات البحث والتسوق وPerformance Max للمتاجر والشركات في السعودية والخليج: من اختيار نوع الحملة إلى قراءة عبارات البحث والتحويلات.",
  },
  {
    slug: "tracking",
    name: "التتبع والقياس",
    title: "مقالات التتبع والقياس: GA4 وGTM وPixel",
    intro:
      "قبل أي قرار إعلاني يجب أن يكون الرقم صحيحًا. هنا أشرح أسباب اختلاف أرقام المنصات والمتجر، وتكرار الأحداث، وطريقة التحقق من أن ما تقيسه هو ما يحدث فعلًا.",
  },
  {
    slug: "strategy",
    name: "الاستراتيجية",
    title: "مقالات استراتيجية الإعلانات: الميزانية والعائد والقرار",
    intro:
      "حسابات وقرارات تسبق إدارة الحملة: كم عائدًا تحتاج لتربح، وكيف تضع الميزانية، ومتى توسّع أو تتوقف.",
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

export const articles = [
  {
    slug: "google-ads-vs-salla-sales",
    title: "لماذا تختلف مبيعات Google Ads عن طلبات سلة؟",
    seoTitle: "لماذا تختلف مبيعات Google Ads عن طلبات سلة؟",
    description:
      "سبعة أسباب تجعل قيمة المبيعات في Google Ads لا تطابق تقرير متجرك على سلة، وطريقة مطابقة الرقمين خطوة بخطوة قبل أن تحكم على الحملة.",
    targetKeyword: "اختلاف مبيعات Google Ads عن سلة",
    secondaryKeywords: ["مطابقة تحويلات Google Ads", "نافذة التحويل"],
    category: "tracking",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-09",
    updated: "2026-11-10",
    readMinutes: 7,
  },
  {
    slug: "ga4-duplicate-purchase-events",
    title: "كيف تكتشف تكرار حدث الشراء في GA4 وتصلحه",
    seoTitle: "تكرار حدث purchase في GA4: كيف تكتشفه وتصلحه",
    description:
      "إذا كانت مشتريات GA4 أعلى من طلبات المتجر فغالبًا هناك حدث شراء يُرسل مرتين. هذه طريقة كشف التكرار ومصادره الشائعة وكيف تمنعه.",
    targetKeyword: "تكرار حدث الشراء GA4",
    secondaryKeywords: ["transaction_id", "purchase مكرر"],
    category: "tracking",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-09",
    updated: "2026-11-10",
    readMinutes: 6,
  },
  {
    slug: "whatsapp-leads-measurement",
    title: "نقرة واتساب ليست عميلًا: كيف تقيس الطلبات الحقيقية من إعلاناتك",
    seoTitle: "قياس طلبات واتساب من الإعلانات: من النقرة إلى العميل",
    description:
      "النقرة على زر واتساب وبدء المحادثة والعميل المؤهل ثلاثة أشياء مختلفة. إليك طريقة عملية لقياس كل مستوى وربطه بالحملة التي جلبته.",
    targetKeyword: "قياس طلبات واتساب من الإعلانات",
    secondaryKeywords: ["إعلانات النقر إلى واتساب", "عميل مؤهل"],
    category: "meta-ads",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-09",
    updated: "2026-11-10",
    readMinutes: 6,
  },
  {
    slug: "break-even-roas",
    title: "كيف تحسب ROAS الذي يغطي تكاليف متجرك فعلًا",
    seoTitle: "حساب ROAS التعادل لمتجرك: متى تربح الحملة؟",
    description:
      "ROAS بقيمة 3 قد يكون ربحًا لمتجر وخسارة لمتجر آخر. هذه معادلة ROAS التعادل مع مثال بالريال، وكيف تحوّلها إلى هدف واضح للحملات.",
    targetKeyword: "حساب ROAS التعادل",
    secondaryKeywords: ["العائد على الإنفاق الإعلاني", "هامش المساهمة"],
    category: "strategy",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-09",
    updated: "2026-11-10",
    readMinutes: 6,
  },
  {
    slug: "search-vs-performance-max",
    title: "Search أم Performance Max: بأيهما يبدأ متجرك على Google Ads؟",
    seoTitle: "Search أم Performance Max لمتجر سلة: بأيهما تبدأ؟",
    description:
      "لا توجد إجابة واحدة لكل متجر. هذه شروط القرار بين حملات البحث وPerformance Max حسب القياس وملف المنتجات والميزانية، مع خطة بداية عملية.",
    targetKeyword: "Search أم Performance Max",
    secondaryKeywords: [
      "حملات Performance Max للمتاجر",
      "Google Merchant Center",
    ],
    category: "google-ads",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-09",
    updated: "2026-11-10",
    readMinutes: 7,
  },
].map((a) => ({
  ...a,
  cover: {
    src: `blog/covers/${a.slug}.webp`,
    width: 1200,
    height: 630,
    alt: `غلاف مقال «${a.title}» من مختبر النمو، بقلم سيف الشرفا`,
  },
}));

export const articleSlugs = articles.map((a) => a.slug);

export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
