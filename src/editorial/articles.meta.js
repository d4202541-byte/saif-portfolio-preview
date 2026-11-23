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
  {
    slug: "meta-pixel-capi-salla",
    title: "ربط بكسل ميتا وConversions API مع متجر سلة: الإعداد والفحص",
    seoTitle:
      "ربط بكسل ميتا مع سلة وConversions API: خطوات الإعداد والفحص 2027",
    description:
      "كيف تربط بكسل Meta وConversions API والكتالوج بمتجرك في سلة خطوة بخطوة، وكيف تتأكد أن حدث الشراء لا يُحسب مرتين، وما الذي تفحصه في Events Manager قبل أن تثق بأرقام حملاتك.",
    targetKeyword: "ربط بكسل ميتا مع سلة",
    secondaryKeywords: [
      "Conversions API سلة",
      "بكسل فيسبوك سلة",
      "ربط سلة مع ميتا",
    ],
    category: "tracking",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 8,
    coverStat: {
      value: "7",
      label: "خطوات للربط من لوحة سلة",
    },
  },
  {
    slug: "google-ads-conversion-tracking-salla",
    title:
      "تتبع تحويلات إعلانات جوجل في متجر سلة: الإعداد الصحيح وأخطاء التكرار",
    seoTitle: "ربط إعلانات جوجل مع سلة وتتبع التحويلات: الدليل العملي 2027",
    description:
      "خطوات ربط Google Ads بمتجر سلة عبر تطبيق Google AdWords (معرّف التحويل وتسمية الشراء)، وكيف تمنع تكرار التحويل بين التطبيق وGTM وGA4، وكيف تطابق أرقام جوجل مع طلبات سلة.",
    targetKeyword: "ربط اعلانات جوجل مع سلة",
    secondaryKeywords: [
      "تتبع التحويلات سلة",
      "Google Ads سلة",
      "Conversion ID سلة",
    ],
    category: "tracking",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 8,
    coverStat: {
      value: "4",
      label: "تحويلات يدعمها تطبيق سلة",
    },
  },
  {
    slug: "instagram-facebook-ads-cost-saudi",
    title: "أسعار إعلانات إنستغرام وفيسبوك في السعودية: كم تدفع فعلًا؟",
    seoTitle: "أسعار إعلانات انستقرام وفيسبوك في السعودية 2027 بالريال",
    description:
      "كم تكلفة إعلانات إنستغرام وفيسبوك في السعودية؟ أرقام حقيقية بالريال من حسابات سعودية: 3.72 إلى 3.83 ريال للمحادثة لعيادة، و120.75 ريال للشراء لمتجر، وطريقة حساب ميزانيتك من الهدف.",
    targetKeyword: "اسعار اعلانات انستقرام",
    secondaryKeywords: [
      "تكلفة اعلانات فيسبوك",
      "اعلانات انستقرام الممولة",
      "سعر اعلانات الانستقرام",
    ],
    category: "meta-ads",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 8,
    coverStat: {
      value: "3.72",
      label: "ريال للمحادثة في حساب عيادة سعودية",
    },
  },
  {
    slug: "snapchat-ads-saudi-guide",
    title: "إعلانات سناب شات في السعودية: متى تنجح وكيف تبدأ؟",
    seoTitle: "إعلانات سناب شات في السعودية 2027: الدليل العملي للشركات",
    description:
      "دليل إعلانات سناب شات للشركات والمتاجر في السعودية: لماذا سناب مهم في المملكة (26 مليون مستخدم)، وأي هدف حملة تختار، وكيف تربط Snap Pixel مع سلة، وكيف تقيس النتيجة الحقيقية.",
    targetKeyword: "اعلانات سناب شات",
    secondaryKeywords: [
      "مدير اعلانات سناب شات",
      "اعلانات سناب",
      "اسعار اعلانات سناب شات",
    ],
    category: "strategy",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-21",
    updated: "2026-11-21",
    readMinutes: 8,
    coverStat: {
      value: "26M",
      label: "مستخدم لسناب شات في السعودية",
    },
  },
  {
    slug: "google-ads-guide-saudi",
    title: "إعلانات جوجل: الدليل العملي للشركات والمتاجر في السعودية",
    seoTitle: "اعلانات جوجل 2027: دليل عملي للشركات والمتاجر في السعودية",
    description:
      "دليل إعلانات جوجل للشركات في السعودية: أنواع الحملات وأيها تبدأ به، وخطوات الإعداد الصحيح، وأرقام حقيقية من عيادة سعودية (464 تحويلًا بتكلفة 4.03 ريال)، وأكثر الأخطاء التي تحرق الميزانية.",
    targetKeyword: "اعلانات جوجل",
    secondaryKeywords: ["اعلانات قوقل", "Google Ads", "حملات جوجل الاعلانية"],
    category: "google-ads",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-22",
    updated: "2026-11-22",
    readMinutes: 10,
    coverStat: {
      value: "15.97%",
      label: "نسبة تحويل حملة بحث لعيادة سعودية",
    },
  },
  {
    slug: "meta-ads-manager-guide",
    title: "مدير إعلانات فيسبوك (Meta Ads Manager): شرح عملي خطوة بخطوة",
    seoTitle: "مدير اعلانات فيس بوك 2027: شرح Meta Ads Manager بالعربي",
    description:
      "شرح عملي لمدير إعلانات فيسبوك وإنستغرام: الحملة ومجموعة الإعلانات والإعلان، واختيار الهدف والجمهور والميزانية، والأعمدة التي تقرأها لتعرف هل الحملة تربح، مع أرقام حقيقية من حسابات سعودية.",
    targetKeyword: "مدير اعلانات فيس بوك",
    secondaryKeywords: [
      "Meta Ads Manager",
      "مدير الاعلانات فيسبوك",
      "شرح مدير الاعلانات",
    ],
    category: "meta-ads",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-22",
    updated: "2026-11-22",
    readMinutes: 9,
    coverStat: {
      value: "3",
      label: "مستويات: الحملة، المجموعة، الإعلان",
    },
  },
  {
    slug: "marketing-agency-vs-freelancer-saudi",
    title: "شركة تسويق أم مسوّق مستقل؟ كيف تختار في السعودية",
    seoTitle: "شركة تسويق أم مسوق مستقل في السعودية؟ مقارنة عملية 2027",
    description:
      "مقارنة عملية بين التعاقد مع شركة تسويق، أو متخصص إعلانات مستقل، أو موظف داخلي في السعودية: التكلفة، ومن ينفّذ فعليًا، والقياس، ومتى يناسبك كل خيار، و8 أسئلة تسألها قبل التوقيع.",
    targetKeyword: "شركة تسويق",
    secondaryKeywords: [
      "مسوق مستقل",
      "شركة تسويق الكتروني",
      "متخصص اعلانات ممولة",
    ],
    category: "strategy",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 8,
    coverStat: {
      value: "8",
      label: "أسئلة قبل أن توقّع مع أي جهة",
    },
  },
  {
    slug: "digital-marketing-saudi-start",
    title: "التسويق الإلكتروني للشركات في السعودية: من أين تبدأ؟",
    seoTitle:
      "التسويق الإلكتروني في السعودية 2027: خطة البداية للشركات والمتاجر",
    description:
      "خطة عملية للتسويق الإلكتروني للشركات والمتاجر في السعودية: القياس أولًا، ثم اختيار القناة (جوجل، ميتا، سناب)، ثم الميزانية من الهدف، مع أرقام حقيقية من عيادة ومتاجر سعودية.",
    targetKeyword: "تسويق الكتروني",
    secondaryKeywords: [
      "التسويق الالكتروني في السعودية",
      "خطة تسويق الكتروني",
      "تسويق الكتروني للشركات",
    ],
    category: "strategy",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 9,
    coverStat: {
      value: "4",
      label: "خطوات قبل أول ريال إعلاني",
    },
  },
  {
    slug: "store-visits-no-sales",
    title: "ليش متجري يجيب زيارات وما يبيع؟ 7 أسباب وكيف تعرف أيها عندك",
    seoTitle: "متجر فيه زيارات بدون مبيعات؟ 7 أسباب وكيف تعرف السبب عندك",
    description:
      "متجرك يجيب زيارات وما يبيع؟ هذي 7 أسباب أشيك عليها قبل ما ألمس الإعلانات، ومع كل سبب طريقة تعرف فيها إذا هو عندك، بأرقام حقيقية من متاجر سعودية.",
    targetKeyword: "متجر زيارات بدون مبيعات",
    secondaryKeywords: [
      "ليش متجري ما يبيع",
      "زيارات بدون مبيعات سلة",
      "متجر الكتروني بدون مبيعات",
    ],
    category: "strategy",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    coverStat: {
      value: "7",
      label: "أسباب تشيك عليها قبل ما ترفع الميزانية",
    },
  },
  {
    slug: "abandoned-cart-shipping-salla",
    title: "الشحن اللي يطلع في آخر خطوة: ليش العميل يترك السلة عند الدفع",
    seoTitle: "ترك السلة في سلة: ليش العميل يطلع عند الدفع وكيف توقفه",
    description:
      "العميل يضيف للسلة ويطلع عند الدفع؟ غالبًا الشحن أو السعر يظهر له متأخر. هنا كيف تعرف وين يطلع العميل من متجرك على سلة، وكيف تصلحها خطوة بخطوة.",
    targetKeyword: "ترك السلة سلة",
    secondaryKeywords: [
      "السلات المتروكة سلة",
      "العميل يترك السلة عند الدفع",
      "تكلفة الشحن متجر سلة",
    ],
    category: "tracking",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    coverStat: {
      value: "180",
      label: "شراء من 5.6 ألف إضافة للسلة",
    },
  },
  {
    slug: "influencer-ads-no-sales",
    title: "دفعت 25 ألف لمشهور وجاني 38 طلب: كيف تختبر المشاهير قبل ما تدفع",
    seoTitle: "إعلان مشاهير ما جاب مبيعات؟ كيف تختبر المشهور قبل ما تدفع",
    description:
      "إعلان مشاهير ما جاب مبيعات؟ قبل ما تدفع لمشهور ثاني، هذي طريقة تختبر فيها جمهوره بمبلغ صغير، وتحسب كم طلب لازم يجيب عشان الإعلان يغطي نفسه.",
    targetKeyword: "إعلان مشاهير ما جاب مبيعات",
    secondaryKeywords: [
      "اعلانات المشاهير",
      "تسويق المشاهير للمتاجر",
      "سناب المشاهير مبيعات",
    ],
    category: "strategy",
    service: "meta-ads",
    cta: "whatsapp",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 6,
    coverStat: {
      value: "38",
      label: "طلب مقابل 25 ألف ريال لمشهور",
    },
  },
  {
    slug: "fake-roas-google-ads",
    title: "ROAS من 50 إلى 90 ضعف؟ كيف إجراء شراء مكرر ينفخ نتائج Google Ads",
    seoTitle: "ROAS غير حقيقي في Google Ads؟ كيف تكشف إجراء الشراء المكرر",
    description:
      "حسابك في Google Ads يعرض ROAS خيالي؟ غالبًا فيه إجراء شراء مكرر. هنا كيف تكشفه في 10 دقايق وتصلحه، مع مثال من متجر سعودي على سلة.",
    targetKeyword: "ROAS غير حقيقي Google Ads",
    secondaryKeywords: [
      "تحويلات مكررة جوجل ادز",
      "ROAS عالي بدون مبيعات",
      "إجراء التحويل الأساسي Google Ads",
    ],
    category: "google-ads",
    service: "google-ads",
    cta: "whatsapp",
    published: "2026-11-23",
    updated: "2026-11-23",
    readMinutes: 7,
    coverStat: {
      value: "50-90x",
      label: "ROAS معروض، والسبب شراء مكرر",
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
