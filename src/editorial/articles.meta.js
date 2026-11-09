// Shared article metadata for مختبر النمو (Growth Lab). Article bodies are
// server-rendered from articles.body.js and are not shipped in the client bundle.
export const blog = {
  name: "مختبر النمو",
  title: "مختبر النمو: إعلانات وقياس للشركات والمتاجر في الخليج",
  description:
    "أدلة عملية من إدارة حسابات Google وMeta تساعدك على فهم النتائج، وتشخيص مشكلات القياس، واتخاذ قرار الإعلان التالي.",
  author: "سيف الشرفا",
};

export const categories = {
  measurement: "القياس والتحويل",
  google: "Google Ads",
  meta: "Meta Ads",
  economics: "اقتصاديات الحملات",
};

export const articles = [
  {
    slug: "google-ads-vs-salla-sales",
    title: "لماذا تختلف مبيعات Google Ads عن طلبات سلة؟",
    seoTitle: "لماذا تختلف مبيعات Google Ads عن طلبات سلة؟ دليل المطابقة",
    description:
      "سبع أسباب تجعل قيمة المبيعات في Google Ads لا تطابق تقرير متجرك على سلة، وطريقة مطابقة الرقمين خطوة بخطوة قبل أن تحكم على الحملة.",
    category: "measurement",
    service: "google-ads",
    published: "2026-11-09",
    readMinutes: 7,
  },
  {
    slug: "ga4-duplicate-purchase-events",
    title: "كيف تكتشف تكرار حدث الشراء في GA4 وتصلحه",
    seoTitle: "تكرار حدث purchase في GA4: كيف تكتشفه وتصلحه",
    description:
      "إذا كانت مشتريات GA4 أعلى من طلبات المتجر فغالبًا هناك حدث شراء يُرسل مرتين. هذه طريقة كشف التكرار ومصادره الشائعة وكيف تمنعه.",
    category: "measurement",
    service: "google-ads",
    published: "2026-11-09",
    readMinutes: 6,
  },
  {
    slug: "whatsapp-leads-measurement",
    title: "نقرة واتساب ليست عميلًا: كيف تقيس الطلبات الحقيقية من إعلاناتك",
    seoTitle: "قياس طلبات واتساب من الإعلانات: من النقرة إلى العميل الحقيقي",
    description:
      "النقرة على زر واتساب وبدء المحادثة والعميل المؤهل ثلاثة أشياء مختلفة. إليك طريقة عملية لقياس كل مستوى وربطه بالحملة التي جلبته.",
    category: "meta",
    service: "meta-ads",
    published: "2026-11-09",
    readMinutes: 6,
  },
  {
    slug: "break-even-roas",
    title: "كيف تحسب ROAS الذي يغطي تكاليف متجرك فعلًا",
    seoTitle: "حساب ROAS التعادل لمتجرك: متى تربح الحملة ومتى تخسر؟",
    description:
      "ROAS بقيمة 3 قد يكون ربحًا لمتجر وخسارة لمتجر آخر. هذه معادلة ROAS التعادل مع مثال بالريال، وكيف تحوّلها إلى هدف واضح للحملات.",
    category: "economics",
    service: "google-ads",
    published: "2026-11-09",
    readMinutes: 6,
  },
  {
    slug: "search-vs-performance-max",
    title: "Search أم Performance Max: بأيهما يبدأ متجرك على Google Ads؟",
    seoTitle: "Search أم Performance Max لمتجر سلة أو زد: بأيهما تبدأ؟",
    description:
      "لا توجد إجابة واحدة لكل متجر. هذه شروط القرار بين حملات البحث وPerformance Max حسب القياس وملف المنتجات والميزانية، مع خطة بداية عملية.",
    category: "google",
    service: "google-ads",
    published: "2026-11-09",
    readMinutes: 7,
  },
];

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
