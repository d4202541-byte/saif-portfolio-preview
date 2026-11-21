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
  {
    slug: "best-marketing-services-saudi-2027",
    title:
      "أفضل خدمات التسويق الإلكتروني في السعودية 2027: كيف تختار الجهة المناسبة؟",
    seoTitle: "أفضل شركة تسويق إلكتروني في السعودية 2027: كيف تختار؟",
    description:
      "وكالة شاملة أم وكالة أداء أم مستقل متخصص؟ معايير عملية لاختيار أفضل خدمة تسويق إلكتروني وإعلانات في السعودية عام 2027، مع أسئلة تطرحها قبل التعاقد وعلامات تحذير.",
    targetKeyword: "أفضل خدمات التسويق الإلكتروني في السعودية",
    secondaryKeywords: [
      "أفضل شركة تسويق في السعودية 2027",
      "شركة إعلانات ممولة",
      "مسوق إعلانات مستقل",
    ],
    category: "strategy",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 9,
    coverStat: {
      value: "2027",
      label: "دليل اختيار خدمة التسويق",
    },
  },
  {
    slug: "ads-specialist-riyadh",
    title: "إدارة إعلانات Google وMeta للشركات والمتاجر في الرياض",
    seoTitle: "مسوق إعلانات Google وMeta في الرياض | سيف الشرفا",
    description:
      "كيف أدير حملات Google وMeta لشركات ومتاجر الرياض: الاستهداف الجغرافي داخل المدينة، وقياس اتصالات وواتساب الفروع، ونتائج موثقة من حسابات سعودية، وطريقة العمل عن بُعد.",
    targetKeyword: "مسوق إعلانات في الرياض",
    secondaryKeywords: [
      "شركة إعلانات جوجل الرياض",
      "إعلانات سناب وانستقرام الرياض",
      "تسويق إلكتروني الرياض",
    ],
    category: "strategy",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 7,
    coverStat: {
      value: "الرياض",
      label: "Google Ads · Meta Ads",
    },
  },
  {
    slug: "ads-specialist-jeddah",
    title: "إدارة إعلانات Google وMeta للشركات والمتاجر في جدة",
    seoTitle: "مسوق إعلانات Google وMeta في جدة | سيف الشرفا",
    description:
      "حملات Google وMeta لشركات ومتاجر جدة: التخطيط حول المواسم، والاستهداف داخل جدة ومكة، وقياس طلبات واتساب، ونتائج موثقة من حسابات سعودية، مع طريقة العمل عن بُعد.",
    targetKeyword: "مسوق إعلانات في جدة",
    secondaryKeywords: [
      "شركة تسويق إلكتروني جدة",
      "إعلانات جوجل جدة",
      "إعلانات انستقرام جدة",
    ],
    category: "strategy",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 7,
    coverStat: {
      value: "جدة",
      label: "Google Ads · Meta Ads",
    },
  },
  {
    slug: "clinic-google-ads-case-study",
    title:
      "دراسة حالة: 464 تحويلًا لعيادة سعودية بتكلفة 4.03 ريال من Google Ads",
    seoTitle:
      "إعلانات العيادات في السعودية: دراسة حالة 464 تحويلًا بـ4.03 ريال",
    description:
      "أرقام حقيقية من حساب عيادة متعددة التخصصات في السعودية: 464 تحويلًا بـ4.03 ريال على Google Ads، ثم 814 تحويلًا عند التوسع، و602 محادثة من Meta بأقل من 4 ريالات. ماذا تعني الأرقام وكيف تقرأها.",
    targetKeyword: "إعلانات العيادات في السعودية",
    secondaryKeywords: [
      "إعلانات جوجل للعيادات",
      "تسويق العيادات الطبية",
      "تكلفة العميل للعيادة",
    ],
    category: "google-ads",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 8,
    coverStat: {
      value: "464 × 4.03",
      label: "تحويلًا · ريال للتحويل",
    },
  },
  {
    slug: "google-ads-cost-saudi-arabia",
    title: "تكلفة إعلانات جوجل في السعودية: كم ميزانية تحتاج فعلًا؟",
    seoTitle: "تكلفة إعلانات جوجل في السعودية 2027: النقرة والميزانية بالريال",
    description:
      "كم تكلفة إعلانات جوجل في السعودية؟ تكلفة النقرة الفعلية من حسابات سعودية بالريال، وأسعار نقرة كلمات التسويق من Semrush، وطريقة حساب ميزانيتك الشهرية من هدفك وليس من رقم عشوائي.",
    targetKeyword: "تكلفة إعلانات جوجل في السعودية",
    secondaryKeywords: [
      "اسعار اعلانات جوجل",
      "اعلانات جوجل",
      "ميزانية اعلانات جوجل",
    ],
    category: "google-ads",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 8,
    coverStat: {
      value: "0.64–0.77",
      label: "ريال للنقرة في حسابين سعوديين",
    },
  },
  {
    slug: "whatsapp-ads-saudi-guide",
    title: "إعلانات واتساب من ميتا: الدليل العملي للشركات في السعودية",
    seoTitle: "إعلانات واتساب (Click-to-WhatsApp) في السعودية: الدليل الكامل",
    description:
      "كيف تعمل إعلانات النقر للانتقال إلى واتساب على فيسبوك وإنستغرام، وأي هدف حملة تختار، وكم تكلفة المحادثة (602 محادثة لعيادة سعودية بأقل من 4 ريالات)، وكيف تقيس العميل الحقيقي وليس المحادثة فقط.",
    targetKeyword: "إعلانات واتساب",
    secondaryKeywords: [
      "اعلانات واتساب فيسبوك",
      "Click to WhatsApp",
      "تكلفة المحادثة",
    ],
    category: "meta-ads",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 9,
    coverStat: {
      value: "602",
      label: "محادثة · 3.72 إلى 3.83 ريال",
    },
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
