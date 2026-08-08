/**
 * One-shot merge of SEO + explanatory copy into messages/{en,ar}.json
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

function deepMerge(target, source) {
  if (Array.isArray(source)) return source.slice();
  if (source && typeof source === "object") {
    const out = { ...(target && typeof target === "object" ? target : {}) };
    for (const [k, v] of Object.entries(source)) {
      out[k] = deepMerge(out[k], v);
    }
    return out;
  }
  return source;
}

const en = {
  Meta: {
    title: "Arkan — From idea to a working system",
    description:
      "Arkan is a studio for building digital systems and products — from project discovery and product design to engineering, integrations, AI, and operations under one accountable team.",
    seoTitle: "Arkan Studio | Digital Systems from Business Problem to Working Product",
    seoDescription:
      "Turn a business problem into a working digital system. Arkan designs and builds business systems, operations platforms, commerce, SaaS, AI inside real workflows, and digital experiences — product, design, engineering, and operations as one team.",
  },
  Hero: {
    eyebrow: "From problem to system",
    brand: "ARKAN",
    tagline: "Your idea is bigger than a website.",
    supporting:
      "We turn complex ideas and operations into clear, connected, scalable digital systems. From project discovery and product design to interfaces, engineering, integrations, AI, and operations — one team owns the full picture.",
    definition:
      "Arkan is not a traditional development shop. Arkan is a studio for building digital systems and products. We work with companies and founders to turn a new idea, a complex operating process, or a set of fragmented tools into one clear digital product. We do not start from the screen. We start from the work itself.",
    ctaExplore: "Explore what we’ve built →",
    ctaStart: "Start your project →",
    ctaPrimary: "Explore what we’ve built →",
    ctaSecondary: "Start your project →",
  },
  Atlas: {
    eyebrow: "SYSTEMS ATLAS",
    title: "Systems we’ve built.",
    subtitle:
      "Different industries. Different scales. One common starting point: a real business problem that needed a real system.",
    seoTitle: "Systems We’ve Built | Digital Operations Portfolio | Arkan",
    seoDescription:
      "Explore systems Arkan has built across operations, ERP, commerce, platforms, and AI — each case starts from a real business problem and ends as a working digital system.",
    lead: "This is not a gallery of screenshots. It is an atlas of operating systems — roles, workflows, modules, integrations, and the outcomes that matter on the ground.",
    body: "Browse by sector, system type, and mass to see how Arkan turns fragmented tools and manual work into connected products. Every entry explains the business context, the operating problem, how we thought about the system, and what changed after it went live.",
  },
  Capabilities: {
    title: "What we put into operation.",
    subtitle:
      "Not a menu of services — a map of system families that companies actually need to run and grow.",
    seoTitle: "Digital System Capabilities | Business, Operations, Commerce, AI | Arkan",
    seoDescription:
      "Arkan builds business systems, operations platforms, multi-role SaaS, commerce stacks, AI inside real workflows, and digital experiences — with modules, roles, and integrations designed as one system.",
    lead: "Clients rarely buy “development.” They buy relief from fragmented tools, invisible field work, broken commerce ops, or an idea that needs a real product structure.",
    body: "These six families describe the kinds of systems we put into operation. Each one can stand alone or combine with another — the method stays the same: understand the work, map the system, design for every role, build, connect, launch, and evolve.",
    items: {
      business: {
        title: "Business Systems",
        lead: "Systems that connect internal company operations in one place.",
        body: "When finance, sales, inventory, approvals, and reporting live in separate tools — or in spreadsheets — decisions slow down and truth fragments. We build business systems that unify roles, permissions, workflows, and reporting: a new ERP, an operating layer on an existing ERP, or internal tools that give managers a single source of truth.",
        solves:
          "Complex operations, fragmented tools, and finance/inventory/approvals without a single source of truth.",
        builds:
          "New ERP cores or ops layers on existing ERP, internal tools, reporting, permissions, and control rooms.",
        users: "Managers, finance, admins, department operators",
      },
      operations: {
        title: "Operations Systems",
        lead: "When work happens in the field, the system must be there too.",
        body: "People, sites, vehicles, tickets, assets, and requests need a measurable workflow — not phone calls and paper. We build operations platforms that turn daily movement into dispatch, tracking, and accountability so supervisors and field teams share one live operating picture.",
        solves:
          "Field work without visibility across people, sites, vehicles, requests, and assets.",
        builds:
          "Dispatch, tickets, tracking, tasks, and measurable operating states for field and back-office roles.",
        users: "Field teams, supervisors, ops, customers",
      },
      platforms: {
        title: "Platforms & SaaS",
        lead: "One idea. Multiple roles. A product ready to grow.",
        body: "Marketplaces, portals, and multi-tenant products fail when roles, subscriptions, and admin are bolted on late. We design the permission model, workflows, and administration from day one so customers, operators, partners, and admins can share one coherent platform.",
        solves:
          "One product that needs multiple roles, subscriptions, and scalable administration.",
        builds:
          "Multi-role platforms, portals, subscription models, and operator admin systems.",
        users: "Customers, operators, partners, platform admins",
      },
      commerce: {
        title: "Commerce",
        lead: "Selling is not checkout alone.",
        body: "Catalog, order, payment, inventory, merchants, delivery, support, and reporting must work as one commerce system. We build from the customer journey through fulfilment and finance so growth does not break operations behind the storefront.",
        solves: "Selling disconnected from inventory, delivery, support, and reporting.",
        builds:
          "Commerce systems from customer journey through payments, fulfilment, merchants, and reporting.",
        users: "Customers, merchants, couriers, ops, finance",
      },
      ai: {
        title: "AI & Automation",
        lead: "Intelligence when it has real work to do.",
        body: "We do not add AI for decoration. We use it when it can remove a manual step, read a document, understand an image, extract data, assist an operator, or improve a decision inside an existing workflow. AI is not always the product — sometimes it is the part that makes the product smarter.",
        solves:
          "Manual documents, images, repetitive steps, and slow decisions inside live processes.",
        builds:
          "Document intelligence, vision, assistants, extraction, and automation inside the operating system.",
        users: "Operators, support, analysts, managers",
      },
      experiences: {
        title: "Digital Experiences",
        lead: "Sometimes the experience itself is part of the product’s value.",
        body: "Corporate sites, product experiences, and high-signal portals still need a systems method: strategy, design system, performance, and content structure. We build digital experiences when impression and interaction matter — without abandoning the operating foundation underneath.",
        solves:
          "When impression, content, and interaction are part of system value — not decoration after the product.",
        builds:
          "Corporate sites, product experiences, portals, and design systems with the same systems method.",
        users: "Visitors, customers, operators",
      },
    },
  },
  Approach: {},
  Studio: {
    title: "The system that builds systems.",
    subtitle:
      "Arkan is not a set of specialties working side by side. It is one multidisciplinary unit that owns the outcome.",
    seoTitle: "Arkan Studio | Product, Design, Engineering & Operations Under One Team",
    seoDescription:
      "Meet the Arkan studio model: product, experience, frontend, backend, operations, and growth working as one system — from understanding the work to launching and evolving a digital product.",
    lead: "We build the team around the project itself — not around a menu of disconnected services.",
    body: "Product understands the work. Experience turns complexity into clarity. Engineering turns experience into a system. Operations connects that system to reality. Growth keeps it alive after launch. Every decision shapes the next, so we work as one accountable team from the start.",
    why: {
      workFirst: {
        title: "We understand the work before the technology.",
        body: "We don’t start by picking a framework or a dashboard look. We start by understanding the process: who acts, what breaks, which data matters, and what success looks like in the business — then technology serves that reality.",
      },
      systemBeforeScreens: {
        title: "We design the system before the screens.",
        body: "Roles, data, permissions, and workflows come before visual detail. Screens are how people enter the system — they are not the system. Designing the operating model first prevents beautiful interfaces that cannot run the work.",
      },
      whatIsNeeded: {
        title: "We build what the project needs.",
        body: "Not every project needs a mobile app. Not every project needs AI. Not every project needs a full ERP on day one. We size the first increment to the real problem so you get a working system, not a catalogue of unused features.",
      },
      operations: {
        title: "We think about operations from day one.",
        body: "Who will use it? Who will run it? What happens on error? How will it grow across sites, roles, or volume? Operational questions belong in discovery and architecture — not as surprises after launch.",
      },
      oneResponsibility: {
        title: "One responsibility.",
        body: "Instead of managing multiple vendors for product, design, engineering, ERP, AI, and ops, you work with one team accountable for the whole product — from problem framing to a system that runs in reality.",
      },
      afterLaunch: {
        title: "We stay after launch.",
        body: "The first version of a system is not its end. We watch real usage, friction, and growth signals, then build the next increment from how the business actually operates — not from a frozen feature list.",
      },
    },
  },
  Team: {
    title: "The team that builds systems.",
    subtitle:
      "Not specialties sitting side by side — one unit accountable for the product from understanding to operations.",
    seoTitle: "Arkan Team | Product, Experience, Engineering & Operations",
    seoDescription:
      "Meet the Arkan team behind digital systems — product, experience, frontend, backend, operations, and growth working as one accountable unit from discovery to launch.",
    lead: "Arkan is people who can hold the whole picture: the business problem, the experience, the engineering, and the operating reality after go-live.",
    body: "You will not get a relay of handoffs between agencies. You get a studio that frames the problem, maps the system, designs for every role, builds the product, connects integrations, and stays responsible when the system meets real users.",
  },
  Start: {
    title: "Let’s understand the system you need.",
    subtitle:
      "Answer a few short questions. We’ll turn your answers into an initial project picture before we talk.",
    seoTitle: "Start Your Project | System Blueprint Builder | Arkan",
    seoDescription:
      "Describe your business problem in a few steps. Arkan turns your answers into an initial system blueprint — roles, workflows, integrations, and a recommended starting point — before the first conversation.",
    eyebrow: "BUILD WITH ARKAN",
    lead: "You don’t need a perfect brief. You need a clear picture of the work, the people, and what must change.",
    body: "This builder is designed to think like a systems studio: what you are building, where the project stands, who will use it, what must happen inside, what it should connect to, and where intelligence or automation might help. At the end you get a readable blueprint you can send to Arkan as a real starting point — not a blank contact form.",
  },
  Home: {
    brandStatement: {
      headline: "We don’t only build what the user sees.",
      support: "Behind every good screen sits a system the user never sees.",
      body: "Business rules. Permissions. Data. Processes. Integrations. Automation. Decisions. So we don’t treat a project as a set of pages. We treat it as a system. We map how work starts, how data moves, who decides, what can be automated, and what must happen when the project grows. Then we build the interface on a foundation that can run it.",
      footer: "The interface is what you see. The system is what makes it work.",
    },
    whatWeBuild: {
      eyebrow: "SCOPE / WHAT WE BUILD",
      title: "Operational digital systems",
      support:
        "Six system families — each one is a real operating layer with modules, roles, and integrations, not a service label.",
      lead: "From internal business systems to field operations, platforms, commerce, AI inside workflows, and digital experiences — Arkan builds what the operation needs to run.",
      body: "Explore the families below, then open Capabilities for deeper anatomy, or Atlas for proof inside real systems we have already put into operation.",
    },
    invisible: {
      eyebrow: "WHAT’S UNDER THE INTERFACE?",
      title: "We don’t only build what the user sees.",
      lead: "Behind every good screen sits a system the user never sees.",
      body: "Business rules, permissions, data, processes, integrations, automation, and decisions. That is why we do not treat a project as a set of pages. We treat it as a system — then we build the interface on a foundation that can run it.",
      footer: "The interface is what you see. The system is what makes it work.",
    },
    selected: {
      eyebrow: "SELECTED WORK",
      title: "Systems with mass",
      support:
        "Selected systems that show how Arkan turns a real operating problem into a working product — not a concept deck.",
      lead: "Each system started with friction on the ground: manual steps, fragmented tools, or a product idea that needed structure across roles.",
      atlas: "Open Atlas →",
      explore: "Enter system →",
    },
    oneTeam: {
      title: "You don’t need six companies to build one product.",
      support: "Arkan brings the whole system under one responsibility.",
      body: "Product idea in one place. Design in another. Engineering somewhere else. ERP with a different vendor. AI with another team. Operations falling between everyone. That is how systems fragment. Arkan gathers product, experience, engineering, operations, and growth as one accountable spine.",
      lines: {
        idea: "Product idea in one place.",
        design: "Design in another.",
        eng: "Engineering somewhere else.",
        erp: "ERP with a different vendor.",
        ai: "AI with another team.",
        ops: "Operations falling between everyone.",
      },
    },
    six: {
      eyebrow: "Six pillars. One team.",
      title: "The Six Arkan",
      support:
        "Each discipline feeds the next — product frames, experience clarifies, engineering builds, operations grounds, growth sustains.",
      items: {
        product: {
          title: "Product",
          line: "Turns a business problem into a buildable product.",
          body: "We define users, roles, processes, priorities, MVP scope, and the evolution map before the first production slice.",
        },
        experience: {
          title: "Experience",
          line: "Turns complexity into understandable workflows.",
          body: "Journeys, interfaces, states, and a design system so every role knows what to do next — including empty, error, and exception paths.",
        },
        frontend: {
          title: "Frontend",
          line: "Builds the interaction layer users touch.",
          body: "Fast, responsive, accessible interfaces designed to carry many states and grow with the product — not a disposable mock layer.",
        },
        backend: {
          title: "Backend",
          line: "Builds logic, services, and data foundations.",
          body: "Data models, permissions, APIs, processes, services, and integration edges that keep operational truth consistent.",
        },
        operations: {
          title: "Operations",
          line: "Connects software to real business execution.",
          body: "Great software fails if it does not work with people and processes on the ground. Operations keeps the system honest after launch.",
        },
        growth: {
          title: "Growth",
          line: "Ensures the system can support adoption and scale.",
          body: "The product’s job does not end at launch. We watch usage, friction, and the next stage the business needs to reach.",
        },
      },
    },
    how: {
      support:
        "A short view of how Arkan moves from a business problem to a working system. Open the full approach for stage-by-stage detail.",
    },
    builder: {
      title: "Let’s understand the system you need.",
      support:
        "Answer a few short questions. We’ll turn your answers into an initial project picture before we talk.",
      body: "No technical jargon required. Pick what is closest to your idea, who will use it, what must happen inside, and what it should connect to — then send a blueprint to Arkan.",
      cta: "Start →",
      hint: "Every answer reshapes the live blueprint.",
    },
    studio: {
      eyebrow: "STUDIO / OPERATING MODEL",
      title: "One team. Six arkan. Shared responsibility.",
      support:
        "Product, experience, engineering, operations, and growth run as one operating model — not a relay of vendors.",
      body: "Enter the studio to see how the six pillars hand work to each other, and why one accountable unit builds clearer systems than a stack of separate agencies.",
      cta: "Enter the Studio",
    },
    finalCta: {
      eyebrow: "NEXT SYSTEM",
      title: "Every large system started with a problem.",
      subtitle: "What’s the problem you need to solve?",
      body: "Tell us about the operation, the idea, or the fragmentation you are living with. We’ll help turn it into a clear system picture — then a working product.",
      ctaStart: "Start your project →",
      ctaExplore: "Explore systems →",
      nextNode: "NODE / NEW",
      yourSystem: "Your system",
    },
  },
};

const ar = {
  Meta: {
    title: "أركان — من الفكرة إلى نظام يعمل",
    description:
      "أركان استوديو لبناء الأنظمة والمنتجات الرقمية — من دراسة المشروع وتصميم المنتج إلى الهندسة والتكاملات والذكاء الاصطناعي والتشغيل تحت مسؤولية فريق واحد.",
    seoTitle: "أركان | أنظمة رقمية من مشكلة العمل إلى منتج يعمل",
    seoDescription:
      "حوّل مشكلة العمل إلى نظام رقمي يعمل. أركان تصمم وتبني أنظمة الأعمال ومنصات التشغيل والتجارة وSaaS والذكاء داخل workflows حقيقية والتجارب الرقمية — منتج وتصميم وهندسة وتشغيل كفريق واحد.",
  },
  Hero: {
    eyebrow: "من مشكلة إلى نظام",
    brand: "أركان",
    tagline: "فكرتك أكبر من مجرد موقع.",
    supporting:
      "نحوّل الأفكار والعمليات المعقدة إلى أنظمة رقمية واضحة، مترابطة وقابلة للنمو. من دراسة المشروع وتصميم المنتج، إلى الواجهات والهندسة والتكاملات والذكاء الاصطناعي والتشغيل — فريق واحد مسؤول عن الصورة كاملة.",
    definition:
      "أركان ليست شركة تطوير تقليدية. أركان استوديو لبناء الأنظمة والمنتجات الرقمية. نعمل مع الشركات ورواد الأعمال لتحويل فكرة جديدة، أو عملية تشغيل معقدة، أو مجموعة أنظمة متفرقة إلى منتج رقمي واحد يعمل بوضوح. لا نبدأ من الشاشة. نبدأ من العمل نفسه.",
    ctaExplore: "استكشف ما بنيناه ←",
    ctaStart: "ابدأ مشروعك ←",
    ctaPrimary: "استكشف ما بنيناه ←",
    ctaSecondary: "ابدأ مشروعك ←",
  },
  Atlas: {
    eyebrow: "أطلس الأنظمة",
    title: "أنظمة بنيناها.",
    subtitle:
      "مشاريع تختلف في القطاع والحجم، لكن يجمعها شيء واحد: كل واحد منها بدأ بمشكلة حقيقية احتاجت نظامًا حقيقيًا.",
    seoTitle: "أنظمة بنيناها | محفظة أنظمة التشغيل الرقمية | أركان",
    seoDescription:
      "استكشف أنظمة بنتها أركان عبر التشغيل وERP والتجارة والمنصات والذكاء الاصطناعي — كل حالة تبدأ بمشكلة عمل حقيقية وتنتهي بنظام رقمي يعمل.",
    lead: "هذه ليست معرض لقطات شاشة. هذا أطلس لأنظمة تشغيل — أدوار، workflows، وحدات، تكاملات، ونتائج تهم على الأرض.",
    body: "تصفّح حسب القطاع ونوع النظام والحجم لترى كيف نحوّل الأدوات المتفرقة والعمل اليدوي إلى منتجات مترابطة. كل مشروع يشرح سياق العمل، مشكلة التشغيل، كيف فكّرنا في النظام، وما الذي تغيّر بعد الإطلاق.",
  },
  Capabilities: {
    title: "ما الذي نضعه في التشغيل.",
    subtitle: "ليست قائمة خدمات — خريطة لعائلات أنظمة تحتاجها الشركات فعليًا لتعمل وتنمو.",
    seoTitle: "قدرات بناء الأنظمة الرقمية | أعمال وتشغيل وتجارة وذكاء | أركان",
    seoDescription:
      "تبني أركان أنظمة الأعمال ومنصات التشغيل وSaaS متعدد الأدوار ومنظومات التجارة والذكاء داخل workflows حقيقية والتجارب الرقمية — بوحدات وأدوار وتكاملات مصممة كنظام واحد.",
    lead: "العميل نادرًا ما يشتري «تطويرًا». يشتري خلاصًا من أدوات متفرقة، أو تشغيل ميداني غير مرئي، أو تجارة مكسورة، أو فكرة تحتاج بنية منتج حقيقية.",
    body: "هذه العائلات الست تصف أنواع الأنظمة التي نضعها في التشغيل. كل واحدة قد تقف وحدها أو تتداخل مع أخرى — والمنهج واحد: نفهم العمل، نرسم النظام، نصمم لكل دور، نبني، نربط، نطلق، ونطوّر.",
    items: {
      business: {
        title: "أنظمة الأعمال",
        lead: "أنظمة تربط العمليات الداخلية للشركة في مكان واحد.",
        body: "عندما تعيش المالية والمبيعات والمخزون والموافقات والتقارير في أدوات منفصلة — أو في جداول — تتباطأ القرارات وتتفكك الحقيقة. نبني أنظمة أعمال توحّد الأدوار والصلاحيات والـworkflows والتقارير: ERP جديد، أو طبقة تشغيل فوق ERP قائم، أو أدوات داخلية تمنح المديرين مصدر حقيقة واحد.",
        solves:
          "تشغيل معقد، أدوات متفرقة، ومالية/مخزون/موافقات بلا مصدر حقيقة واحد.",
        builds:
          "أنوية ERP جديدة أو طبقات تشغيل فوق ERP قائم، أدوات داخلية، تقارير، صلاحيات، وغرف تحكم.",
        users: "مديرون، مالية، مسؤولون، مشغّلو الإدارات",
      },
      operations: {
        title: "أنظمة التشغيل",
        lead: "عندما يكون العمل في الميدان، يجب أن يكون النظام هناك أيضًا.",
        body: "الأشخاص والمواقع والمركبات والتذاكر والأصول والطلبات تحتاج workflow قابلًا للقياس — لا اتصالات ورقًا. نبني منصات تشغيل تحوّل الحركة اليومية إلى توجيه وتتبع ومسؤولية، ليشترك المشرفون والفرق الميدانية في صورة تشغيل حية واحدة.",
        solves:
          "عمل ميداني بلا رؤية عبر الأشخاص والمواقع والمركبات والطلبات والأصول.",
        builds:
          "توجيه، تذاكر، تتبع، مهام، وحالات تشغيل قابلة للقياس للميدان والمكتب.",
        users: "فرق ميدانية، مشرفون، عمليات، عملاء",
      },
      platforms: {
        title: "منصات وSaaS",
        lead: "فكرة واحدة. أدوار متعددة. منتج جاهز للنمو.",
        body: "المنصات والبوابات والمنتجات متعددة المستأجرين تفشل حين تُضاف الأدوار والاشتراكات والإدارة متأخرًا. نصمم نموذج الصلاحيات والـworkflows والإدارة من اليوم الأول حتى يتشارك العملاء والمشغّلون والشركاء والمسؤولون منصة متماسكة.",
        solves: "منتج واحد يحتاج أدوارًا متعددة واشتراكات وإدارة قابلة للتوسع.",
        builds: "منصات متعددة الأدوار، بوابات، نماذج اشتراك، وأنظمة إدارة للمشغّلين.",
        users: "عملاء، مشغّلون، شركاء، مسؤولو المنصة",
      },
      commerce: {
        title: "التجارة",
        lead: "البيع ليس صفحة الدفع فقط.",
        body: "الكتالوج والطلب والدفع والمخزون والتجار والتوصيل والدعم والتقارير يجب أن تعمل كمنظومة تجارة واحدة. نبني من رحلة العميل حتى التنفيذ والمالية حتى لا يكسر النمو التشغيل خلف الواجهة.",
        solves: "بيع منفصل عن المخزون والتوصيل والدعم والتقارير.",
        builds:
          "أنظمة تجارة من رحلة العميل عبر الدفع والتنفيذ والتجار والتقارير.",
        users: "عملاء، تجار، مندوبو توصيل، عمليات، مالية",
      },
      ai: {
        title: "الذكاء والأتمتة",
        lead: "الذكاء عندما يكون له عمل حقيقي.",
        body: "لا نضيف الذكاء للزينة. نستخدمه حين يقلل خطوة يدوية، أو يقرأ مستندًا، أو يفهم صورة، أو يستخرج بيانات، أو يساعد مشغّلًا، أو يحسّن قرارًا داخل workflow موجود. الذكاء ليس دائمًا المنتج — أحيانًا هو الجزء الذي يجعل المنتج أذكى.",
        solves:
          "مستندات وصور يدوية وخطوات متكررة وقرارات بطيئة داخل عمليات حية.",
        builds:
          "ذكاء مستندات، رؤية، مساعدين، استخراجًا، وأتمتة داخل نظام التشغيل.",
        users: "مشغّلون، دعم، محللون، مديرون",
      },
      experiences: {
        title: "التجارب الرقمية",
        lead: "أحيانًا تكون التجربة نفسها جزءًا من قيمة المنتج.",
        body: "المواقع المؤسسية وتجارب المنتجات والبوابات عالية الإشارة ما زالت تحتاج منهج أنظمة: استراتيجية، نظام تصميم، أداء، وبنية محتوى. نبني تجارب رقمية حين يهم الانطباع والتفاعل — دون التخلي عن الأساس التشغيلي تحتها.",
        solves:
          "حين يكون الانطباع والمحتوى والتفاعل جزءًا من قيمة النظام — لا زينة بعد المنتج.",
        builds:
          "مواقع مؤسسية، تجارب منتجات، بوابات، وأنظمة تصميم بنفس منهج الأنظمة.",
        users: "زوار، عملاء، مشغّلون",
      },
    },
  },
  Studio: {
    title: "النظام الذي يبني الأنظمة.",
    subtitle:
      "أركان ليست مجموعة تخصّصات تعمل بجوار بعضها. هي وحدة متعددة التخصّصات تملك النتيجة.",
    seoTitle: "استوديو أركان | منتج وتصميم وهندسة وتشغيل تحت فريق واحد",
    seoDescription:
      "تعرّف على نموذج استوديو أركان: منتج وتجربة وواجهة وخلفية وتشغيل ونمو يعملون كنظام واحد — من فهم العمل إلى إطلاق المنتج الرقمي وتطويره.",
    lead: "نبني الفريق حول المشروع نفسه — لا حول قائمة خدمات منفصلة.",
    body: "المنتج يفهم العمل. التجربة تحوّل التعقيد إلى وضوح. الهندسة تحوّل التجربة إلى نظام. التشغيل يربط النظام بالواقع. النمو يبقيه حيًا بعد الإطلاق. كل قرار يؤثر في الذي بعده، لذلك نعمل كفريق واحد مسؤول منذ البداية.",
    why: {
      workFirst: {
        title: "نفهم العمل قبل التقنية.",
        body: "لا نبدأ باختيار framework أو شكل dashboard. نبدأ بفهم العملية: من يفعل؟ ما الذي ينكسر؟ أي بيانات تهم؟ وما شكل النجاح في العمل — ثم تخدم التقنية هذا الواقع.",
      },
      systemBeforeScreens: {
        title: "نصمم النظام قبل الشاشات.",
        body: "الأدوار والبيانات والصلاحيات والـworkflows تأتي قبل التفاصيل البصرية. الشاشات طريقة دخول الناس إلى النظام — وليست النظام. تصميم نموذج التشغيل أولًا يمنع واجهات جميلة لا تستطيع تشغيل العمل.",
      },
      whatIsNeeded: {
        title: "نبني ما يحتاجه المشروع.",
        body: "ليس كل مشروع يحتاج تطبيق موبايل. وليس كل مشروع يحتاج ذكاءً اصطناعيًا. وليس كل مشروع يحتاج ERP كاملًا من اليوم الأول. نصغّر الزيادة الأولى على المشكلة الحقيقية لتحصل على نظام يعمل، لا كتالوج ميزات غير مستخدمة.",
      },
      operations: {
        title: "نفكر في التشغيل من اليوم الأول.",
        body: "من سيستخدمه؟ من سيديره؟ ماذا يحدث عند الخطأ؟ وكيف سيكبر عبر مواقع أو أدوار أو حجم؟ أسئلة التشغيل مكانها في الاكتشاف والمعمارية — لا كمفاجآت بعد الإطلاق.",
      },
      oneResponsibility: {
        title: "مسؤولية واحدة.",
        body: "بدل أن تدير عدة موردين للمنتج والتصميم والهندسة وERP والذكاء والتشغيل، تتعامل مع فريق واحد مسؤول عن المنتج ككل — من تأطير المشكلة إلى نظام يعمل في الواقع.",
      },
      afterLaunch: {
        title: "نبقى بعد الإطلاق.",
        body: "النسخة الأولى من النظام ليست نهايته. نراقب الاستخدام الحقيقي والاحتكاك وإشارات النمو، ثم نبني الزيادة التالية من كيف يعمل العمل فعلًا — لا من قائمة ميزات مجمّدة.",
      },
    },
  },
  Team: {
    title: "الفريق الذي يبني الأنظمة.",
    subtitle:
      "ليست تخصّصات متجاورة — وحدة واحدة مسؤولة عن المنتج من الفهم إلى التشغيل.",
    seoTitle: "فريق أركان | منتج وتجربة وهندسة وتشغيل",
    seoDescription:
      "تعرّف على فريق أركان خلف الأنظمة الرقمية — منتج وتجربة وواجهة وخلفية وتشغيل ونمو يعملون كوحدة واحدة مسؤولة من الاكتشاف إلى الإطلاق.",
    lead: "أركان أناس يستطيعون حمل الصورة كاملة: مشكلة العمل، والتجربة، والهندسة، وواقع التشغيل بعد الإطلاق.",
    body: "لن تحصل على سباق تسليم بين وكالات. ستحصل على استوديو يؤطّر المشكلة، يرسم النظام، يصمم لكل دور، يبني المنتج، يربط التكاملات، ويبقى مسؤولًا حين يلتقي النظام بمستخدمين حقيقيين.",
  },
  Start: {
    title: "خلّينا نفهم النظام الذي تحتاجه.",
    subtitle:
      "جاوب على مجموعة أسئلة قصيرة. سنحوّل إجاباتك إلى تصور أولي للمشروع قبل أن نتحدث.",
    seoTitle: "ابدأ مشروعك | أداة مخطّط النظام | أركان",
    seoDescription:
      "صف مشكلة عملك في خطوات قصيرة. أركان تحوّل إجاباتك إلى مخطّط نظام أولي — أدوار وworkflows وتكاملات ونقطة بداية موصى بها — قبل أول حديث.",
    eyebrow: "ابنِ مع أركان",
    lead: "مش محتاج brief مثالي. محتاج صورة واضحة للعمل والأشخاص وما الذي يجب أن يتغيّر.",
    body: "هذه الأداة مصممة لتفكر كاستوديو أنظمة: ماذا تبني، أين المشروع الآن، من سيستخدمه، ماذا يجب أن يحدث داخله، مع ماذا يجب أن يتصل، وأين قد يساعد الذكاء أو الأتمتة. في النهاية تحصل على مخطّط مقروء ترسله لأركان كنقطة بداية حقيقية — لا نموذج تواصل فارغ.",
  },
  Home: {
    brandStatement: {
      headline: "نحن لا نبني ما يراه المستخدم فقط.",
      support: "كل شاشة جيدة تقف خلفها منظومة لا يراها المستخدم.",
      body: "قواعد عمل. صلاحيات. بيانات. عمليات. تكاملات. أتمتة. قرارات. لهذا لا نتعامل مع المشروع كمجموعة صفحات. نتعامل معه كنظام. نرسم كيف يبدأ العمل، كيف تنتقل البيانات، من يتخذ القرار، ما الذي يمكن أتمتته، وما الذي يجب أن يحدث عندما يكبر المشروع. ثم نبني الواجهة فوق أساس يستطيع تشغيله.",
      footer: "الواجهة هي الجزء الذي تراه. النظام هو ما يجعلها تعمل.",
    },
    whatWeBuild: {
      eyebrow: "النطاق / ماذا نبني",
      title: "أنظمة رقمية تشغيلية",
      support:
        "ستّ عائلات أنظمة — كل واحدة طبقة تشغيل حقيقية بوحدات وأدوار وتكاملات، وليست تسمية خدمة.",
      lead: "من أنظمة الأعمال الداخلية إلى التشغيل الميداني والمنصات والتجارة والذكاء داخل الـworkflows والتجارب الرقمية — أركان تبني ما يحتاجه التشغيل ليعمل.",
      body: "استكشف العائلات بالأسفل، ثم افتح القدرات للتشريح الأعمق، أو الأطلس لإثبات داخل أنظمة وضعناها في التشغيل فعلًا.",
    },
    invisible: {
      eyebrow: "ماذا تحت الواجهة؟",
      title: "نحن لا نبني ما يراه المستخدم فقط.",
      lead: "كل شاشة جيدة تقف خلفها منظومة لا يراها المستخدم.",
      body: "قواعد عمل، صلاحيات، بيانات، عمليات، تكاملات، أتمتة، وقرارات. لذلك لا نتعامل مع المشروع كمجموعة صفحات. نتعامل معه كنظام — ثم نبني الواجهة فوق أساس يستطيع تشغيله.",
      footer: "الواجهة هي الجزء الذي تراه. النظام هو ما يجعلها تعمل.",
    },
    selected: {
      eyebrow: "أعمال مختارة",
      title: "أنظمة لها كتلة",
      support:
        "أنظمة مختارة تُظهر كيف نحوّل مشكلة تشغيل حقيقية إلى منتج يعمل — لا عرض مفهوم.",
      lead: "كل نظام بدأ باحتكاك على الأرض: خطوات يدوية، أدوات متفرقة، أو فكرة منتج احتاجت بنية عبر أدوار متعددة.",
      atlas: "افتح الأطلس ←",
      explore: "ادخل النظام ←",
    },
    oneTeam: {
      title: "مش محتاج تجمع ست شركات عشان تبني منتج واحد.",
      support: "أركان تجمع المنظومة تحت مسؤولية واحدة.",
      body: "فكرة المنتج في مكان. التصميم في مكان. البرمجة في مكان. الـERP عند شركة أخرى. الـAI عند فريق مختلف. والتشغيل يقع بين الجميع. هكذا تتفكك الأنظمة. أركان تجمع المنتج والتجربة والهندسة والتشغيل والنمو كعمود فقري واحد مسؤول.",
      lines: {
        idea: "فكرة المنتج في مكان.",
        design: "التصميم في مكان.",
        eng: "البرمجة في مكان.",
        erp: "الـERP عند شركة أخرى.",
        ai: "الـAI عند فريق مختلف.",
        ops: "والتشغيل يقع بين الجميع.",
      },
    },
    six: {
      eyebrow: "ستة أركان. فريق واحد.",
      title: "الأركان الستة",
      support:
        "كل تخصّص يغذّي الذي يليه — المنتج يؤطّر، التجربة توضّح، الهندسة تبني، التشغيل يرسّخ، والنمو يستدام.",
      items: {
        product: {
          title: "المنتج",
          line: "نحوّل مشكلة العمل إلى منتج يمكن بناؤه.",
          body: "نحدد المستخدمين والأدوار والعمليات والأولويات ونطاق الـMVP وخارطة التطور قبل أول شريحة إنتاج.",
        },
        experience: {
          title: "التجربة",
          line: "نحوّل التعقيد إلى مسارات مفهومة.",
          body: "رحلات وواجهات وحالات ونظام تصميم حتى يعرف كل دور ماذا يفعل تاليًا — بما في ذلك مسارات الفراغ والخطأ والاستثناء.",
        },
        frontend: {
          title: "الواجهة",
          line: "نبني طبقة التفاعل التي يلمسها المستخدم.",
          body: "واجهات سريعة ومتجاوبة ومتاحة مصممة لتحمّل حالات كثيرة والنمو مع المنتج — لا طبقة mock تُرمى.",
        },
        backend: {
          title: "الخلفية",
          line: "نبني المنطق والخدمات وأسس البيانات.",
          body: "نماذج بيانات وصلاحيات وواجهات API وعمليات وخدمات وحواف تكامل تبقي الحقيقة التشغيلية متسقة.",
        },
        operations: {
          title: "التشغيل",
          line: "نربط البرمجيات بتنفيذ العمل الحقيقي.",
          body: "أفضل software يفشل إن لم يعمل مع الأشخاص والعمليات على الأرض. التشغيل يبقي النظام صادقًا بعد الإطلاق.",
        },
        growth: {
          title: "النمو",
          line: "نضمن أن النظام يدعم التبنّي والتوسّع.",
          body: "دور المنتج لا ينتهي عند الإطلاق. نراقب الاستخدام والاحتكاك والمرحلة التالية التي يحتاج العمل الوصول إليها.",
        },
      },
    },
    how: {
      support:
        "نظرة قصيرة لكيف تنتقل أركان من مشكلة عمل إلى نظام يعمل. افتح المنهج كاملًا لتفاصيل كل مرحلة.",
    },
    builder: {
      title: "خلّينا نفهم النظام الذي تحتاجه.",
      support:
        "جاوب على مجموعة أسئلة قصيرة. سنحوّل إجاباتك إلى تصور أولي للمشروع قبل أن نتحدث.",
      body: "مش محتاج اسمًا تقنيًا. اختار الأقرب لفكرتك، من سيستخدمه، ماذا يجب أن يحدث داخله، ومع ماذا يجب أن يتصل — ثم أرسل مخطّطًا لأركان.",
      cta: "ابدأ ←",
      hint: "كل إجابة تعيد تشكيل المخطّط الحي.",
    },
    studio: {
      eyebrow: "الاستوديو / نموذج التشغيل",
      title: "فريق واحد. ستة أركان. مسؤولية مشتركة.",
      support:
        "المنتج والتجربة والهندسة والتشغيل والنمو يعملون كنموذج تشغيل واحد — لا سباق موردين.",
      body: "ادخل الاستوديو لترى كيف تسلّم الأركان الستة العمل لبعضها، ولماذا وحدة واحدة مسؤولة تبني أنظمة أوضح من ركام وكالات منفصلة.",
      cta: "ادخل الاستوديو",
    },
    finalCta: {
      eyebrow: "النظام التالي",
      title: "كل نظام كبير بدأ بمشكلة.",
      subtitle: "إيه المشكلة اللي محتاج تحلها؟",
      body: "احكِ لنا عن التشغيل أو الفكرة أو التفكك الذي تعيشه. سنساعدك لتحويله إلى صورة نظام واضحة — ثم إلى منتج يعمل.",
      ctaStart: "ابدأ مشروعك ←",
      ctaExplore: "استكشف الأنظمة ←",
      nextNode: "عقدة / جديد",
      yourSystem: "نظامك",
    },
  },
};

for (const [locale, patch] of [
  ["en", en],
  ["ar", ar],
]) {
  const file = path.join(root, "messages", `${locale}.json`);
  const current = JSON.parse(fs.readFileSync(file, "utf8"));
  const next = deepMerge(current, patch);
  fs.writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`updated ${locale}.json`);
}
