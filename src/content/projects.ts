import type {
  CapabilityId,
  Integration,
  LocalizedString,
  Module,
  Project,
  ProjectScale,
  Role,
  SystemMass,
  Workflow,
} from "./types";

function L(ar: string, en: string): LocalizedString {
  return { ar, en };
}

function mod(
  id: string,
  ar: string,
  en: string,
  dar: string,
  den: string,
): Module {
  return {
    id,
    name: L(ar, en),
    description: L(dar, den),
  };
}

function role(
  id: string,
  ar: string,
  en: string,
  modules: string[] = [],
  workflows: string[] = [],
): Role {
  return { id, name: L(ar, en), modules, workflows };
}

function wf(
  id: string,
  ar: string,
  en: string,
  steps: [string, string][],
  group?: Workflow["group"],
): Workflow {
  return {
    id,
    name: L(ar, en),
    steps: steps.map(([a, e]) => L(a, e)),
    group,
  };
}

function integ(
  id: string,
  catAr: string,
  catEn: string,
  system: string,
  purAr: string,
  purEn: string,
): Integration {
  return {
    id,
    category: L(catAr, catEn),
    system,
    purpose: L(purAr, purEn),
  };
}

function scaleFromMass(mass: SystemMass, complexity: ProjectScale["complexity"]): ProjectScale {
  return {
    complexity,
    modules: mass.modules ?? 0,
    roles: mass.roles ?? 0,
    integrations: mass.integrations ?? 0,
  };
}

export const projects: Project[] = [
  {
    id: "MVS-01",
    slug: "masar-valet",
    title: L("مسار", "MASAR"),
    descriptor: L(
      "بنية تشغيل المركبات",
      "Vehicle Operations Infrastructure",
    ),
    summary: L(
      "بنية تشغيل صف السيارات: تذاكر عامة، QR/NFC، دفع، فرق ميدانية، ومحاسبة.",
      "Valet operations infrastructure: public tickets, QR/NFC, payments, field teams, and accounting.",
    ),
    context: L(
      "عمليات الضيافة والمولات تحتاج تشغيل مركبات عبر مواقع متعددة بفرق ميدانية وعملاء يتحركون بسرعة.",
      "Hospitality and mall operations need vehicle handling across sites with field teams and time-sensitive guests.",
    ),
    challenge: L(
      "التدفق الورقي — تذكرة، بحث يدوي، اتصال هاتفي، دفع غير متتبع — يبطئ التسليم ويفقد الرؤية المحاسبية.",
      "Paper flow — ticket, manual search, phone request, untracked payment — slows handover and breaks accounting visibility.",
    ),
    solution: L(
      "نظام تشغيلي يربط العميل والفريق والموقع والدفع والمحاسبة عبر تذاكر رقمية وأصول QR/NFC وPWA للفرق.",
      "An operating system connecting guest, staff, site, payment, and accounting via digital tickets, QR/NFC assets, and a team PWA.",
    ),
    impact: L(
      "من ورق متفرق إلى تشغيل متصل قابل للتتبع عبر المواقع.",
      "From fragmented paper process to connected, traceable multi-site operations.",
    ),
    sector: "mobility",
    systemType: "operations",
    status: "operating",
    featured: true,
    region: ["Egypt", "Saudi Arabia"],
    roles: [
      role("customer", "عميل", "Customer", ["ticket", "payment"], ["arrival"]),
      role("valet", "سائق صف", "Valet", ["intake", "parking", "dispatch"], ["arrival", "request"]),
      role("supervisor", "مشرف", "Supervisor", ["ops", "dispatch"], ["request"]),
      role("manager", "مدير فرع", "Branch manager", ["ops", "reports"], ["management"]),
      role("ops", "عمليات", "Operations", ["ops", "integrations"], ["management"]),
      role("finance", "مالية", "Finance", ["payment", "accounting"], ["accounting"]),
      role("admin", "مسؤول", "Admin", ["ops", "integrations"], ["management"]),
    ],
    modules: [
      mod("intake", "الاستقبال", "Intake", "التقاط بيانات المركبة والعميل والحالة الابتدائية.", "Captures vehicle, customer, and initial operational state."),
      mod("ticket", "التذكرة العامة", "Public ticket", "واجهة العميل لحالة الطلب والدفع والتتبع.", "Guest interface for status, payment, and tracking."),
      mod("parking", "المواقف", "Parking", "خريطة مواقع الانتظار وإدارة المساحات.", "Parking map and space management."),
      mod("dispatch", "التوجيه", "Dispatch", "توجيه الطلبات للفريق الميداني.", "Routes requests to field staff."),
      mod("payment", "الدفع", "Payment", "تدفق المعاملات وربطها بالتذكرة.", "Transaction flow bound to the ticket."),
      mod("ops", "منصة التشغيل", "Ops platform", "لوحة تحكم المواقع والفرق والحالات.", "Control surface for sites, teams, and states."),
      mod("accounting", "المحاسبة", "Accounting", "تسجيل مالي وربط ERP.", "Financial records and ERP linkage."),
      mod("ai-intake", "استخراج ذكي", "AI intake", "استخراج بيانات المركبة من الصور.", "Structured vehicle intake from images."),
    ],
    workflows: [
      wf(
        "arrival",
        "الوصول",
        "Arrival",
        [
          ["وصول", "Arrival"],
          ["استقبال", "Intake"],
          ["تحقق", "Validation"],
          ["تذكرة", "Ticket"],
          ["ركن", "Park"],
        ],
        "customer",
      ),
      wf(
        "request",
        "طلب المركبة",
        "Vehicle request",
        [
          ["طلب", "Request"],
          ["توجيه", "Dispatch"],
          ["دفع", "Payment"],
          ["تسليم", "Handover"],
        ],
        "operations",
      ),
      wf(
        "accounting",
        "المحاسبة",
        "Accounting",
        [
          ["معاملة", "Transaction"],
          ["مطابقة", "Reconciliation"],
          ["سجل ERP", "ERP record"],
        ],
        "finance",
      ),
    ],
    integrations: [
      integ("odoo", "محاسبة", "Accounting", "Odoo", "فواتير ومطابقة وسجلات مالية", "Invoice, reconciliation, financial records"),
      integ("pay", "مدفوعات", "Payments", "Payment gateway", "تدفق المعاملات الأونلاين", "Online transaction flow"),
      integ("msg", "رسائل", "Messaging", "WhatsApp / SMS", "إشعارات تشغيلية", "Operational notifications"),
      integ("vision", "ذكاء", "AI", "Vision / extraction", "استخراج منظم من الصور", "Structured intake from images"),
    ],
    stack: [
      { layer: "interface", items: ["TanStack Start", "PWA", "RTL UI"] },
      { layer: "application", items: ["Supabase", "RLS", "Signed URLs"] },
      { layer: "data", items: ["PostgreSQL", "Private storage"] },
      { layer: "intelligence", items: ["Vehicle photo extraction"] },
      { layer: "deployment", items: ["Cloudflare Workers"] },
    ],
    mass: {
      modules: 8,
      roles: 7,
      workflows: 3,
      interfaces: 4,
      integrations: 4,
      automations: 2,
      locations: 1,
    },
    capabilities: ["product", "ux", "frontend", "backend", "data", "ai", "integrations", "operations"],
    outcomes: [
      { from: L("يدوي", "Manual"), to: L("مؤتمت جزئيًا", "Partially automated") },
      { from: L("متفرق", "Fragmented"), to: L("متصل", "Connected") },
      { from: L("ورق", "Paper"), to: L("رقمي", "Digital") },
      { from: L("غير متتبع", "Untracked"), to: L("قابل للتتبع", "Traceable") },
    ],
    arkanScope: [
      L("استراتيجية المنتج", "Product strategy"),
      L("معمارية النظام", "System architecture"),
      L("تجربة الاستخدام", "UX"),
      L("الواجهة", "Frontend"),
      L("الأنظمة الخلفية", "Backend"),
      L("البيانات", "Database"),
      L("التكاملات", "Integrations"),
      L("الذكاء الاصطناعي", "AI"),
      L("النشر", "Deployment"),
      L("التشغيل", "Operations"),
    ],
    relatedProjects: ["rentara", "nexora-erp"],
    scale: scaleFromMass(
      { modules: 8, roles: 7, integrations: 4 },
      4,
    ),
    dna: ["ops", "saas", "ai", "pwa"],
    atlas: { x: 72, y: 32 },
  },
  {
    id: "NXR-01",
    slug: "nexora-erp",
    title: L("Nexora ERP", "Nexora ERP"),
    descriptor: L("منصة أنظمة أعمال متعددة الوحدات", "Multi-module business systems platform"),
    summary: L(
      "منصة مؤسسية متعددة الوحدات لإدارة العمليات والتقارير والصلاحيات.",
      "A multi-module enterprise platform for operations, reporting, and permissions.",
    ),
    context: L(
      "منظمات تحتاج حوكمة موحّدة عبر المالية والمخزون والموارد البشرية.",
      "Organizations that need unified governance across finance, inventory, and HR.",
    ),
    challenge: L(
      "جداول متفرقة وصلاحيات ضعيفة تمنع رؤية تشغيلية واحدة.",
      "Scattered spreadsheets and weak permissions block a single operational view.",
    ),
    solution: L(
      "بنية منصّة بمراحل واضحة ووحدات قابلة للتفعيل وأدوار دقيقة.",
      "Platform architecture with phased modules, activatable units, and precise roles.",
    ),
    impact: L(
      "أساس قابل للتوسع لحوكمة وتشغيل موحّد عبر الأقسام.",
      "A scalable foundation for unified governance across departments.",
    ),
    sector: "services",
    systemType: "erp",
    status: "evolving",
    featured: true,
    region: ["Egypt"],
    roles: [
      role("admin", "مسؤول", "Admin", ["platform"], ["governance"]),
      role("finance", "مالية", "Finance", ["finance"], ["reporting"]),
      role("ops", "تشغيل", "Operations", ["ops"], ["ops-flow"]),
      role("hr", "موارد بشرية", "HR", ["hr"], ["ops-flow"]),
      role("manager", "إدارة", "Management", ["reports"], ["reporting"]),
    ],
    modules: [
      mod("platform", "المنصة والصلاحيات", "Platform & roles", "هوية وصلاحيات ووحدات قابلة للتفعيل.", "Identity, permissions, activatable modules."),
      mod("ops", "الوحدات التشغيلية", "Operational modules", "عمليات يومية عبر الأقسام.", "Day-to-day operations across departments."),
      mod("finance", "المالية", "Finance", "مسارات مالية وتسويات.", "Financial flows and reconciliations."),
      mod("hr", "الموارد البشرية", "HR", "أدوار وبيانات أفراد.", "People roles and records."),
      mod("reports", "لوحات المؤشرات", "KPI dashboards", "رؤية تنفيذية موحّدة.", "Unified executive visibility."),
    ],
    workflows: [
      wf("governance", "الحوكمة", "Governance", [["طلب صلاحية", "Access request"], ["موافقة", "Approval"], ["تفعيل", "Activation"]], "management"),
      wf("ops-flow", "التشغيل", "Operations", [["إدخال", "Entry"], ["مراجعة", "Review"], ["تنفيذ", "Execute"]], "operations"),
      wf("reporting", "التقارير", "Reporting", [["تجميع", "Aggregate"], ["لوحة", "Dashboard"], ["قرار", "Decision"]], "management"),
    ],
    integrations: [
      integ("api", "واجهات", "APIs", "Internal platform APIs", "ربط الوحدات الداخلية", "Connect internal modules"),
      integ("report", "تقارير", "Reporting", "Reporting pipelines", " Aggregated operational metrics", "Aggregated operational metrics"),
    ],
    stack: [
      { layer: "frontend", items: ["React", "TypeScript", "Feature modules"] },
      { layer: "backend", items: ["Domain layers", "API routes", "RBAC"] },
      { layer: "data", items: ["PostgreSQL", "Migrations", "Audit trails"] },
      { layer: "ops", items: ["ADRs", "Sprint history", "Testing harness"] },
    ],
    mass: { modules: 12, roles: 8, workflows: 3, interfaces: 3, integrations: 4, automations: 1 },
    capabilities: ["product", "ux", "frontend", "backend", "data", "integrations", "operations"],
    outcomes: [
      { from: L("متفرق", "Fragmented"), to: L("موحّد", "Unified") },
      { from: L("غير محكوم", "Ungoverned"), to: L("محكوم بالأدوار", "Role-governed") },
    ],
    arkanScope: [
      L("استراتيجية المنتج", "Product strategy"),
      L("معمارية النظام", "System architecture"),
      L("الواجهة", "Frontend"),
      L("الأنظمة الخلفية", "Backend"),
      L("البيانات", "Database"),
    ],
    relatedProjects: ["masar-valet", "rentara"],
    scale: { complexity: 5, modules: 12, roles: 8, integrations: 4 },
    dna: ["rbac", "enterprise", "modules"],
    atlas: { x: 22, y: 28 },
  },
  {
    id: "SQN-01",
    slug: "souqna",
    title: L("سوقنا", "Souqna"),
    descriptor: L("بنية تجارة محلية متعددة الأدوار", "Hyperlocal multi-role commerce infrastructure"),
    summary: L(
      "منصة تجارة محلية تربط العملاء والتجار ومندوبي التوصيل.",
      "Local commerce platform connecting customers, merchants, and couriers.",
    ),
    context: L(
      "أسواق محلية تحتاج تشغيلًا رقميًا متعدد الأدوار وليس متجرًا واحدًا.",
      "Local markets need multi-role digital operations — not a single storefront.",
    ),
    challenge: L(
      "أدوار متضاربة (عميل/تاجر/مندوب/إدارة) بدون نظام موحّد للطلبات والتوصيل.",
      "Conflicting roles without one system for orders and delivery.",
    ),
    solution: L(
      "منصة عربية أولًا بتجارب منفصلة لكل دور فوق كتالوج وطلبات مشتركة.",
      "Arabic-first platform with distinct role experiences over shared catalog and orders.",
    ),
    impact: L(
      "محرك سوق محلي قابل لإطلاق أسواق جديدة على نفس البنية.",
      "A local-market engine that can launch new markets on the same infrastructure.",
    ),
    sector: "commerce",
    systemType: "commerce",
    status: "building",
    featured: true,
    region: ["Egypt"],
    roles: [
      role("customer", "عميل", "Customer", ["customer"], ["order"]),
      role("merchant", "تاجر", "Merchant", ["merchant"], ["fulfill"]),
      role("courier", "مندوب", "Courier", ["courier"], ["delivery"]),
      role("admin", "إدارة المنصة", "Platform admin", ["admin"], ["governance"]),
    ],
    modules: [
      mod("customer", "تجربة العميل", "Customer experience", "تصفح وطلب وتتبع.", "Browse, order, track."),
      mod("merchant", "لوحة التاجر", "Merchant console", "كتالوج ومخزون وطلبات.", "Catalog, stock, orders."),
      mod("courier", "التوصيل", "Courier flows", "استلام وتسليم ميداني.", "Field pickup and delivery."),
      mod("admin", "إدارة المنصة", "Platform admin", "حوكمة السوق والمتاجر.", "Market and merchant governance."),
      mod("orders", "الطلبات", "Orders", "دورة حياة الطلب المشتركة.", "Shared order lifecycle."),
    ],
    workflows: [
      wf("order", "الطلب", "Order", [["تصفح", "Browse"], ["طلب", "Order"], ["دفع", "Pay"]], "customer"),
      wf("fulfill", "التنفيذ", "Fulfillment", [["قبول", "Accept"], ["تجهيز", "Prepare"], ["تسليم للمندوب", "Hand to courier"]], "operations"),
      wf("delivery", "التوصيل", "Delivery", [["استلام", "Pickup"], ["توصيل", "Deliver"], ["تأكيد", "Confirm"]], "operations"),
    ],
    integrations: [
      integ("delivery", "لوجستيات", "Logistics", "Delivery workflows", "تنسيق المندوبين", "Courier coordination"),
      integ("catalog", "كتالوج", "Catalog", "Multi-vendor catalog", "مزامنة المتاجر", "Merchant sync"),
    ],
    stack: [
      { layer: "frontend", items: ["Next.js 16", "React 19", "Tailwind 4"] },
      { layer: "backend", items: ["Supabase", "RLS"] },
      { layer: "data", items: ["PostgreSQL", "Seeds"] },
      { layer: "ops", items: ["Multi-role auth", "Integration tests"] },
    ],
    mass: { modules: 9, roles: 4, workflows: 3, interfaces: 4, integrations: 3 },
    capabilities: ["product", "ux", "frontend", "backend", "data", "operations"],
    outcomes: [
      { from: L("متجر واحد", "Single store"), to: L("سوق متعدد الأدوار", "Multi-role market") },
      { from: L("تنسيق يدوي", "Manual coordination"), to: L("تدفقات رقمية", "Digital flows") },
    ],
    arkanScope: [
      L("استراتيجية المنتج", "Product strategy"),
      L("تجربة الاستخدام", "UX"),
      L("الواجهة", "Frontend"),
      L("الأنظمة الخلفية", "Backend"),
      L("التشغيل", "Operations"),
    ],
    relatedProjects: ["qr-menu", "sokany-commerce"],
    scale: { complexity: 5, modules: 9, roles: 4, integrations: 3 },
    dna: ["commerce", "supabase", "rtl", "multi-role"],
    atlas: { x: 18, y: 44 },
  },
  {
    id: "VLR-01",
    slug: "velora-pos",
    title: L("Velora POS", "Velora POS"),
    descriptor: L("تشغيل فروع ومبيعات", "Branch commerce operations"),
    summary: L(
      "نظام كاشير وإدارة فروع: مبيعات، مخزون، ولاء، وطلبات أونلاين.",
      "Multi-location POS: sales, stock, loyalty, online orders.",
    ),
    context: L(
      "مقاهي ومطاعم متعددة الفروع تحتاج كاشيرًا سريعًا مربوطًا بالمخزون والتقارير.",
      "Multi-branch cafés need a fast cashier tied to stock and reporting.",
    ),
    challenge: L(
      "أدوات منفصلة للمبيعات والمخزون والورديات تخلق فجوات تشغيلية.",
      "Disconnected sales, stock, and shift tools create operational gaps.",
    ),
    solution: L(
      "واجهة لمسية للبيع مع جلسات صندوق وتحويلات مخزون وقائمة QR.",
      "Touch-first selling with cash sessions, stock transfers, and QR menu.",
    ),
    impact: L(
      "تشغيل يومي موحّد عبر الفروع مع رؤية للمبيعات والمخزون.",
      "Unified daily operations with sales and inventory visibility.",
    ),
    sector: "commerce",
    systemType: "commerce",
    status: "operating",
    featured: true,
    region: ["Egypt"],
    roles: [
      role("cashier", "كاشير", "Cashier", ["pos"]),
      role("manager", "مدير فرع", "Manager", ["reports", "inventory"]),
      role("admin", "مسؤول", "Admin", ["admin"]),
    ],
    modules: [
      mod("pos", "نقطة البيع", "POS", "بيع لمسي سريع.", "Fast touch selling."),
      mod("inventory", "المخزون", "Inventory", "تحويلات ومستويات مخزون.", "Transfers and stock levels."),
      mod("shifts", "الورديات", "Cash sessions", "جلسات صندوق.", "Cash sessions."),
      mod("loyalty", "الولاء", "Loyalty", "نقاط وعملاء.", "Points and customers."),
      mod("online", "الطلبات الأونلاين", "Online orders", "طلبات من القائمة.", "Orders from menu."),
      mod("reports", "التقارير", "Reports", "لوحات تنفيذية.", "Executive dashboards."),
    ],
    workflows: [
      wf("sale", "البيع", "Sale", [["مسح", "Scan"], ["دفع", "Pay"], ["إيصال", "Receipt"]], "customer"),
      wf("shift", "الوردية", "Shift", [["فتح", "Open"], ["بيع", "Sell"], ["إغلاق", "Close"]], "operations"),
    ],
    integrations: [
      integ("qr", "قائمة", "Menu", "QR menu", "قائمة رقمية للفروع", "Digital menu for branches"),
      integ("pay", "مدفوعات", "Payments", "Payments flow", "تحصيل المبيعات", "Sales collection"),
    ],
    stack: [
      { layer: "frontend", items: ["Next.js", "TypeScript", "Zustand"] },
      { layer: "backend", items: ["Supabase", "RLS"] },
      { layer: "data", items: ["PostgreSQL"] },
      { layer: "ops", items: ["Multi-store", "Audit logs"] },
    ],
    mass: { modules: 10, roles: 6, workflows: 2, interfaces: 3, integrations: 5 },
    capabilities: ["product", "frontend", "backend", "data", "operations"],
    outcomes: [
      { from: L("أدوات منفصلة", "Disconnected tools"), to: L("تشغيل موحّد", "Unified ops") },
    ],
    arkanScope: [
      L("المنتج", "Product"),
      L("الواجهة", "Frontend"),
      L("الأنظمة الخلفية", "Backend"),
    ],
    relatedProjects: ["qr-menu", "souqna"],
    scale: { complexity: 5, modules: 10, roles: 6, integrations: 5 },
    dna: ["pos", "supabase", "rtl"],
    atlas: { x: 48, y: 18 },
  },
  {
    id: "RNT-01",
    slug: "rentara",
    title: L("Rentara", "Rentara"),
    descriptor: L("تشغيل وحدات إيجارية", "Rental units operations"),
    summary: L(
      "لوحة إدارة وحدات إيجارية ثنائية اللغة مع صلاحيات ومراقبة.",
      "Bilingual rental-units dashboard with roles and observability.",
    ),
    context: L(
      "تشغيل إيجاري في السوق السعودي يحتاج دقة عربية/إنجليزية وصلاحيات.",
      "Saudi rental ops need bilingual precision and permissions.",
    ),
    challenge: L(
      "إدارة وحدات وعقود ومستأجرين بدون نظام داخلي واضح.",
      "Units, contracts, and tenants without a clear internal system.",
    ),
    solution: L(
      "Dashboard داخلي مع RTL وSupabase RLS وتكامل Odoo اختياري.",
      "Internal dashboard with RTL, Supabase RLS, optional Odoo.",
    ),
    impact: L(
      "تشغيل إيجاري أوضح للفرق الداخلية.",
      "Clearer rental operations for internal teams.",
    ),
    sector: "operations",
    systemType: "operations",
    status: "deployed",
    featured: true,
    region: ["Saudi Arabia"],
    roles: [
      role("ops", "تشغيل", "Operations"),
      role("admin", "مسؤول", "Admin"),
      role("finance", "مالية", "Finance"),
    ],
    modules: [
      mod("units", "الوحدات", "Units", "سجل الوحدات.", "Unit registry."),
      mod("tenants", "المستأجرون", "Tenants", "بيانات المستأجرين.", "Tenant records."),
      mod("contracts", "العقود", "Contracts", "إدارة العقود.", "Contract management."),
      mod("permissions", "الصلاحيات", "Permissions", "أدوار دقيقة.", "Precise roles."),
      mod("reporting", "التقارير", "Reporting", "رؤية تشغيلية.", "Operational visibility."),
    ],
    workflows: [
      wf("lease", "التأجير", "Lease", [["وحدة", "Unit"], ["عقد", "Contract"], ["تفعيل", "Activate"]], "operations"),
    ],
    integrations: [
      integ("odoo", "محاسبة", "Accounting", "Odoo XML-RPC", "ربط مالي اختياري", "Optional financial link"),
      integ("sentry", "مراقبة", "Observability", "Sentry", "تتبع أخطاء التشغيل", "Ops error tracking"),
    ],
    stack: [
      { layer: "frontend", items: ["Next.js", "next-intl", "RTL"] },
      { layer: "backend", items: ["Supabase Auth", "RLS"] },
      { layer: "data", items: ["PostgreSQL", "Storage"] },
      { layer: "ops", items: ["Sentry", "Feature flags"] },
    ],
    mass: { modules: 7, roles: 5, workflows: 1, interfaces: 2, integrations: 3 },
    capabilities: ["frontend", "backend", "data", "integrations", "operations"],
    outcomes: [{ from: L("يدوي", "Manual"), to: L("لوحة داخلية", "Internal console") }],
    arkanScope: [L("الواجهة", "Frontend"), L("الأنظمة الخلفية", "Backend"), L("التكاملات", "Integrations")],
    relatedProjects: ["masar-valet", "nexora-erp"],
    scale: { complexity: 4, modules: 7, roles: 5, integrations: 3 },
    dna: ["rtl", "supabase", "ops"],
    atlas: { x: 58, y: 55 },
  },
  {
    id: "QRM-01",
    slug: "qr-menu",
    title: L("QR Menu", "QR Menu"),
    descriptor: L("تجربة قائمة رقمية", "Digital menu experience"),
    summary: L(
      "منصة قوائم رقمية: مسح QR، إدارة محتوى، وثنائيات اللغة.",
      "Digital menu platform: QR scan, CMS, bilingual UX.",
    ),
    context: L("مطاعم تحتاج تحديث قائمة فوريًا بدون تطبيق.", "Restaurants need instant menu updates without an app."),
    challenge: L("القوائم الورقية مكلفة وبطيئة التحديث.", "Paper menus are costly and slow to update."),
    solution: L("PWA مع توليد QR وصلاحيات وقوائم عربية/إنجليزية.", "PWA with QR generation, roles, bilingual menus."),
    impact: L("تحديث فوري وتجربة ضيف أنظف.", "Instant updates and cleaner guest experience."),
    sector: "commerce",
    systemType: "experience",
    status: "deployed",
    featured: true,
    roles: [role("guest", "ضيف", "Guest"), role("admin", "إدارة", "Admin")],
    modules: [
      mod("menu", "القائمة العامة", "Public menu", "قائمة الضيف.", "Guest menu."),
      mod("admin", "لوحة الإدارة", "Admin console", "إدارة المحتوى.", "Content management."),
      mod("qr", "مولد QR", "QR generator", "أصول QR.", "QR assets."),
    ],
    workflows: [
      wf("browse", "التصفح", "Browse", [["مسح", "Scan"], ["تصفح", "Browse"], ["طلب", "Order intent"]], "customer"),
    ],
    integrations: [
      integ("qr", "QR", "QR", "QRCode", "توليد أكواد الفروع", "Branch code generation"),
    ],
    stack: [
      { layer: "frontend", items: ["Next.js", "Framer Motion"] },
      { layer: "backend", items: ["Prisma", "JWT auth"] },
      { layer: "data", items: ["PostgreSQL"] },
    ],
    mass: { modules: 5, roles: 4, workflows: 1, interfaces: 2, integrations: 2 },
    capabilities: ["ux", "frontend", "backend"],
    outcomes: [{ from: L("ورق", "Paper"), to: L("رقمي", "Digital") }],
    arkanScope: [L("التجربة", "Experience"), L("الواجهة", "Frontend")],
    relatedProjects: ["velora-pos"],
    scale: { complexity: 3, modules: 5, roles: 4, integrations: 2 },
    dna: ["commerce", "rtl", "pwa"],
    atlas: { x: 30, y: 62 },
  },
  {
    id: "HKM-01",
    slug: "hakimo-production",
    title: L("Hakimo Production", "Hakimo Production"),
    descriptor: L("تشغيل خطوط إنتاج", "Production line operations"),
    summary: L(
      "نظام إنتاج صناعي لخطوط العمل والتتبع ومؤشرات الأداء.",
      "Industrial production system for lines, tracking, and KPIs.",
    ),
    context: L("خطوط إنتاج تحتاج رؤية لحظية.", "Production lines need live visibility."),
    challenge: L("تتبع يدوي يضعف الحوكمة.", "Manual tracking weakens governance."),
    solution: L("منصة تشغيل إنتاجية مع لوحات ووثائق تسليم.", "Production ops platform with dashboards and handover docs."),
    impact: L("تشغيل أوضح للخط.", "Clearer line operations."),
    sector: "operations",
    systemType: "operations",
    status: "evolving",
    featured: true,
    roles: [role("operator", "مشغّل", "Operator"), role("supervisor", "مشرف", "Supervisor")],
    modules: [
      mod("lines", "خطوط الإنتاج", "Production lines", "إدارة الخطوط.", "Line management."),
      mod("tracking", "التتبع", "Tracking", "تتبع العمليات.", "Process tracking."),
      mod("kpi", "المؤشرات", "KPIs", "أداء الخط.", "Line performance."),
    ],
    workflows: [
      wf("produce", "الإنتاج", "Production", [["بدء", "Start"], ["تتبع", "Track"], ["تسليم", "Handover"]], "operations"),
    ],
    integrations: [
      integ("internal", "داخلي", "Internal", "Internal ops tooling", "ربط أدوات التشغيل", "Connect ops tools"),
    ],
    stack: [
      { layer: "frontend", items: ["Dashboards"] },
      { layer: "backend", items: ["Operational APIs"] },
      { layer: "data", items: ["Process records"] },
    ],
    mass: { modules: 6, roles: 5, workflows: 1, interfaces: 2, integrations: 2 },
    capabilities: ["product", "frontend", "backend", "operations"],
    outcomes: [{ from: L("يدوي", "Manual"), to: L("مرئي", "Visible") }],
    arkanScope: [L("التشغيل", "Operations"), L("الواجهة", "Frontend")],
    relatedProjects: ["nexora-erp"],
    scale: { complexity: 4, modules: 6, roles: 5, integrations: 2 },
    dna: ["ops", "industrial", "kpi"],
    atlas: { x: 78, y: 58 },
  },
  {
    id: "SKN-01",
    slug: "sokany-commerce",
    title: L("Sokany Commerce", "Sokany Commerce"),
    descriptor: L("قناة تجارة وعلامة", "Brand commerce channel"),
    summary: L(
      "مكدس تجارة لعلامة أجهزة منزلية: متجر وكتالوج وتشغيل داخلي.",
      "Commerce stack for a home-appliance brand: storefront, catalog, internal ops.",
    ),
    context: L("علامة تحتاج واجهة بيع مربوطة بتشغيل داخلي.", "Brand needs storefront tied to internal ops."),
    challenge: L("فصل بين المحتوى والمخزون والطلبات.", "Content, stock, and orders are disconnected."),
    solution: L("متجر حديث مع SEO ومحتوى منتجات وتكاملات تشغيلية.", "Modern storefront with SEO, product content, ops integrations."),
    impact: L("قناة رقمية جاهزة للنمو.", "Growth-ready digital channel."),
    sector: "commerce",
    systemType: "commerce",
    status: "deployed",
    featured: true,
    roles: [role("customer", "عميل", "Customer"), role("ops", "تشغيل", "Ops")],
    modules: [
      mod("store", "المتجر", "Storefront", "واجهة البيع.", "Selling interface."),
      mod("catalog", "الكتالوج", "Catalog", "محتوى المنتجات.", "Product content."),
      mod("seo", "SEO", "SEO", "طبقات اكتشاف.", "Discovery layers."),
    ],
    workflows: [
      wf("purchase", "الشراء", "Purchase", [["تصفح", "Browse"], ["طلب", "Order"], ["تنفيذ", "Fulfill"]], "customer"),
    ],
    integrations: [
      integ("catalog", "كتالوج", "Catalog", "Catalog sync", "مزامنة المنتجات", "Product sync"),
    ],
    stack: [
      { layer: "frontend", items: ["Next.js", "Storefront UX"] },
      { layer: "backend", items: ["Commerce APIs"] },
      { layer: "data", items: ["Product datasets"] },
    ],
    mass: { modules: 6, roles: 4, workflows: 1, interfaces: 2, integrations: 3 },
    capabilities: ["ux", "frontend", "backend", "operations"],
    outcomes: [{ from: L("قناة ضعيفة", "Weak channel"), to: L("قناة نمو", "Growth channel") }],
    arkanScope: [L("التجربة", "Experience"), L("التجارة", "Commerce")],
    relatedProjects: ["souqna"],
    scale: { complexity: 4, modules: 6, roles: 4, integrations: 3 },
    dna: ["commerce", "seo", "brand"],
    atlas: { x: 40, y: 78 },
  },
  {
    id: "CQM-01",
    slug: "cairo-quarantine",
    title: L("Cairo Quarantine", "Cairo Quarantine"),
    descriptor: L("إدارة حالات حساسة", "Sensitive case operations"),
    summary: L(
      "نظام إداري لعمليات حساسة بتدفقات وصلاحيات صارمة.",
      "Administrative system for sensitive workflows with strict permissions.",
    ),
    context: L("عمليات حساسة تحتاج سجلات موثوقة.", "Sensitive ops need reliable records."),
    challenge: L("تنسيق يدوي وصلاحيات غير واضحة.", "Manual coordination and unclear permissions."),
    solution: L("منصة إدارة مع خدمات خلفية ومسارات منظمة.", "Management platform with backend services and structured paths."),
    impact: L("حوكمة أعلى للعملية.", "Higher process governance."),
    sector: "services",
    systemType: "operations",
    status: "deployed",
    featured: false,
    roles: [role("specialist", "مختص", "Specialist"), role("admin", "مسؤول", "Admin")],
    modules: [
      mod("cases", "إدارة الحالات", "Case management", "تتبع الحالات.", "Case tracking."),
      mod("permissions", "الصلاحيات", "Permissions", "تحكم بالوصول.", "Access control."),
    ],
    workflows: [
      wf("case", "الحالة", "Case", [["تسجيل", "Register"], ["معالجة", "Process"], ["إغلاق", "Close"]], "operations"),
    ],
    integrations: [
      integ("svc", "خدمات", "Services", "Internal services", "تنسيق خلفي", "Backend orchestration"),
    ],
    stack: [
      { layer: "frontend", items: ["Operational UI"] },
      { layer: "backend", items: ["Services", "Workers"] },
      { layer: "data", items: ["Process records"] },
    ],
    mass: { modules: 5, roles: 6, workflows: 1, interfaces: 1, integrations: 2 },
    capabilities: ["backend", "data", "operations"],
    outcomes: [{ from: L("تنسيق يدوي", "Manual coordination"), to: L("حوكمة", "Governance") }],
    arkanScope: [L("الأنظمة الخلفية", "Backend"), L("التشغيل", "Operations")],
    relatedProjects: ["nexora-erp"],
    scale: { complexity: 4, modules: 5, roles: 6, integrations: 2 },
    dna: ["ops", "gov", "rbac"],
    atlas: { x: 65, y: 72 },
  },
  {
    id: "NXS-01",
    slug: "noxus-whatsapp-ai",
    title: L("NOXUS", "NOXUS"),
    descriptor: L("طبقة ذكاء وتواصل", "Intelligence & messaging layer"),
    summary: L(
      "طبقة واتساب ذكية مع لوحة وSDK للدمج في أنظمة الأعمال.",
      "WhatsApp AI layer with dashboard and SDK for business systems.",
    ),
    context: L("التواصل التشغيلي يحتاج أتمتة قابلة للدمج.", "Ops messaging needs embeddable automation."),
    challenge: L("روبوتات معزولة لا تندمج في أنظمة التشغيل.", "Isolated chatbots don't embed into operating systems."),
    solution: L("منصة واتساب مع لوحة وSDK وتوثيق دمج.", "WhatsApp platform with dashboard, SDK, and embed docs."),
    impact: L("قناة تواصل فوق أنظمة التشغيل الحالية.", "Communication channel on existing operating systems."),
    sector: "ventures",
    systemType: "ai",
    status: "venture",
    featured: true,
    roles: [role("ops", "تشغيل", "Ops"), role("dev", "مطوّر", "Developer")],
    modules: [
      mod("dashboard", "لوحة التحكم", "Dashboard", "تشغيل المحادثات.", "Conversation ops."),
      mod("sdk", "SDK", "SDK", "دمج في المنتجات.", "Product embedding."),
      mod("flows", "تدفقات الرسائل", "Message flows", "مسارات الرد.", "Reply paths."),
    ],
    workflows: [
      wf("message", "الرسالة", "Message", [["استقبال", "Receive"], ["توجيه", "Route"], ["رد", "Reply"]], "operations"),
    ],
    integrations: [
      integ("wa", "رسائل", "Messaging", "WhatsApp", "قناة العملاء", "Customer channel"),
      integ("sdk", "دمج", "Embed", "Product SDKs", "دمج في أنظمة الأعمال", "Embed into business systems"),
    ],
    stack: [
      { layer: "frontend", items: ["Dashboard UI"] },
      { layer: "backend", items: ["Messaging APIs"] },
      { layer: "ai", items: ["Conversational AI"] },
    ],
    mass: { modules: 4, roles: 3, workflows: 1, interfaces: 2, integrations: 3, automations: 2 },
    capabilities: ["ai", "frontend", "backend", "integrations"],
    outcomes: [{ from: L("قناة معزولة", "Isolated channel"), to: L("طبقة قابلة للدمج", "Embeddable layer") }],
    arkanScope: [L("الذكاء الاصطناعي", "AI"), L("التكاملات", "Integrations")],
    relatedProjects: ["masar-valet"],
    scale: { complexity: 3, modules: 4, roles: 3, integrations: 3 },
    dna: ["ai", "whatsapp", "sdk"],
    atlas: { x: 84, y: 22 },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectsBySector(sector?: string): Project[] {
  if (!sector || sector === "all") return projects;
  return projects.filter((project) => project.sector === sector);
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) return undefined;
  return projects[(index + 1) % projects.length];
}

/** Prefer raw mass totals for ranking — not a fake score. */
export function massTotal(project: Project): number {
  const m = project.mass;
  return (
    (m.modules ?? 0) +
    (m.roles ?? 0) +
    (m.workflows ?? 0) +
    (m.interfaces ?? 0) +
    (m.integrations ?? 0) +
    (m.automations ?? 0)
  );
}

/** @deprecated use massTotal */
export function scaleScore(project: Project): number {
  return massTotal(project);
}

export function matchProjectsBySector(sector: string, limit = 3): Project[] {
  const primary = projects.filter((project) => project.sector === sector);
  const rest = projects.filter((project) => project.sector !== sector);
  return [...primary, ...rest].slice(0, limit);
}

export function matchProjectsByBrief(input: {
  projectTypes?: string[];
  workflows?: string[];
  integrations?: string[];
  roles?: string[];
}, limit = 3): Project[] {
  const tokens = new Set(
    [
      ...(input.projectTypes ?? []),
      ...(input.workflows ?? []),
      ...(input.integrations ?? []),
      ...(input.roles ?? []),
    ].map((t) => t.toLowerCase()),
  );

  const scored = projects.map((project) => {
    let score = 0;
    if (tokens.has(project.systemType)) score += 3;
    if (tokens.has(project.sector)) score += 2;
    for (const d of project.dna) if (tokens.has(d)) score += 2;
    for (const c of project.capabilities) if (tokens.has(c)) score += 1;
    for (const w of project.workflows) {
      if ([...tokens].some((t) => w.id.includes(t) || w.name.en.toLowerCase().includes(t)))
        score += 1;
    }
    return { project, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || massTotal(b.project) - massTotal(a.project))
    .slice(0, limit)
    .map((s) => s.project);
}

export const SECTORS: Sector[] = [
  "mobility",
  "healthcare",
  "commerce",
  "operations",
  "services",
  "ventures",
  "other",
];

export const SYSTEM_TYPES: import("./types").SystemType[] = [
  "erp",
  "operations",
  "platform",
  "commerce",
  "ai",
  "experience",
];

export const STATUSES: import("./types").ProjectStatus[] = [
  "operating",
  "deployed",
  "evolving",
  "building",
  "venture",
  "concept",
];

export const CAPABILITIES: CapabilityId[] = [
  "product",
  "ux",
  "frontend",
  "backend",
  "data",
  "ai",
  "integrations",
  "operations",
];

type Sector = import("./types").Sector;
