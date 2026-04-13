const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icons
const {
  FaExclamationTriangle, FaCheckCircle, FaLaptopMedical, FaGraduationCap,
  FaPassport, FaServer, FaCogs, FaUserMd, FaUserTie, FaChartBar,
  FaShieldAlt, FaRocket, FaExchangeAlt, FaGem, FaArrowLeft,
  FaBell, FaFileAlt, FaCreditCard, FaComments, FaUsers,
  FaDatabase, FaLock, FaClipboardCheck, FaChartLine, FaEye,
  FaClock, FaUserShield, FaCalendarCheck
} = require("react-icons/fa");

function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── Color Palette ──
const C = {
  navy:      "1E3A5F",
  navyDark:  "0F1D30",
  teal:      "0EA5E9",
  tealDark:  "0284C7",
  tealLight: "E0F2FE",
  white:     "FFFFFF",
  offWhite:  "F8FAFC",
  gray100:   "F1F5F9",
  gray200:   "E2E8F0",
  gray400:   "94A3B8",
  gray500:   "64748B",
  gray700:   "334155",
  gray900:   "0F172A",
  green:     "10B981",
  greenBg:   "D1FAE5",
  red:       "EF4444",
  redBg:     "FEE2E2",
  amber:     "F59E0B",
  amberBg:   "FEF3C7",
};

// ── Helpers ──
const mkShadow = () => ({ type: "outer", color: "000000", blur: 4, offset: 1.5, angle: 135, opacity: 0.08 });

function addPageNumber(slide, num, total) {
  slide.addText(`${num} / ${total}`, {
    x: 0, y: 5.25, w: 10, h: 0.35,
    fontSize: 9, color: C.gray400, align: "center", fontFace: "Calibri",
  });
}

function addTopBar(slide) {
  slide.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Waseet Platform";
  pres.title = "Waseet Platform - Technical Presentation";
  pres.rtlMode = true;

  const TOTAL = 15;

  // Pre-render icons
  const icons = {};
  const iconMap = {
    warning: [FaExclamationTriangle, C.amber],
    check: [FaCheckCircle, C.green],
    medical: [FaLaptopMedical, C.white],
    education: [FaGraduationCap, C.white],
    passport: [FaPassport, C.white],
    server: [FaServer, C.teal],
    cogs: [FaCogs, C.teal],
    userMd: [FaUserMd, C.teal],
    userTie: [FaUserTie, C.teal],
    chartBar: [FaChartBar, C.teal],
    shield: [FaShieldAlt, C.teal],
    rocket: [FaRocket, C.white],
    exchange: [FaExchangeAlt, C.teal],
    gem: [FaGem, C.teal],
    arrow: [FaArrowLeft, C.teal],
    bell: [FaBell, C.teal],
    file: [FaFileAlt, C.teal],
    credit: [FaCreditCard, C.teal],
    comments: [FaComments, C.teal],
    users: [FaUsers, C.teal],
    database: [FaDatabase, C.teal],
    lock: [FaLock, C.teal],
    clipboard: [FaClipboardCheck, C.teal],
    chartLine: [FaChartLine, C.teal],
    eye: [FaEye, C.teal],
    clock: [FaClock, C.teal],
    userShield: [FaUserShield, C.teal],
    calendar: [FaCalendarCheck, C.teal],
    medicalTeal: [FaLaptopMedical, C.teal],
    educationTeal: [FaGraduationCap, C.teal],
    passportTeal: [FaPassport, C.teal],
    rocketTeal: [FaRocket, C.teal],
    shieldWhite: [FaShieldAlt, C.white],
    gemWhite: [FaGem, C.white],
    checkWhite: [FaCheckCircle, C.white],
    warningWhite: [FaExclamationTriangle, C.white],
    medNavy: [FaLaptopMedical, C.navy],
    eduNavy: [FaGraduationCap, C.navy],
    visNavy: [FaPassport, C.navy],
  };

  for (const [key, [comp, color]] of Object.entries(iconMap)) {
    icons[key] = await iconToBase64Png(comp, "#" + color);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 1 — Title
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Decorative shapes
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.teal } });
    s.addShape("rect", { x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: C.teal } });

    // Subtle accent circle
    s.addShape("ellipse", { x: 7.5, y: -1, w: 4, h: 4, fill: { color: C.teal, transparency: 90 } });
    s.addShape("ellipse", { x: -1, y: 3.5, w: 3, h: 3, fill: { color: C.teal, transparency: 92 } });

    s.addText("منصة وسيط", {
      x: 0.5, y: 1.2, w: 9, h: 1.2,
      fontSize: 52, fontFace: "Calibri", bold: true, color: C.white, align: "center",
      charSpacing: 3,
    });

    s.addText("التحول الرقمي لعملياتنا", {
      x: 0.5, y: 2.3, w: 9, h: 0.8,
      fontSize: 28, fontFace: "Calibri", color: C.teal, align: "center",
    });

    // Divider line
    s.addShape("rect", { x: 3.5, y: 3.3, w: 3, h: 0.03, fill: { color: C.teal, transparency: 40 } });

    s.addText("عرض تقني — ماذا نبني ولماذا", {
      x: 0.5, y: 3.6, w: 9, h: 0.6,
      fontSize: 16, fontFace: "Calibri", color: C.gray400, align: "center",
    });

    s.addText("أبريل 2026", {
      x: 0.5, y: 4.4, w: 9, h: 0.5,
      fontSize: 13, fontFace: "Calibri", color: C.gray400, align: "center",
    });
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 2 — Current Problems
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("الوضع الحالي — لماذا نحتاج التحول", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const problems = [
      ["إدارة الطلبات عبر Excel و WhatsApp و Email — أدوات غير مترابطة"],
      ["لا يوجد تتبع مركزي للطلبات — كل شيء يعتمد على ذاكرة الموظفين"],
      ["صعوبة متابعة المستندات الناقصة والمكتملة — تأخيرات متكررة"],
      ["لا توجد تقارير مالية دقيقة أو لحظية — قرارات بدون بيانات"],
      ["العميل لا يرى حالة طلبه — يتصل ويسأل باستمرار"],
      ["التوسع يعني توظيف المزيد بنفس النسبة — لا كفاءة تشغيلية"],
    ];

    const startY = 1.25;
    const rowH = 0.65;
    problems.forEach((p, i) => {
      const y = startY + i * rowH;

      // Red accent bar on right
      s.addShape("rect", {
        x: 9.15, y: y + 0.08, w: 0.06, h: rowH - 0.2,
        fill: { color: C.red },
      });

      // Card bg
      s.addShape("rect", {
        x: 0.6, y: y, w: 8.5, h: rowH - 0.08,
        fill: { color: i % 2 === 0 ? C.gray100 : C.white },
      });

      s.addText(p[0], {
        x: 0.8, y: y, w: 8.1, h: rowH - 0.08,
        fontSize: 13.5, fontFace: "Calibri", color: C.gray700, align: "right", valign: "middle",
      });
    });

    // Bottom warning box
    s.addShape("rect", {
      x: 1.5, y: 5.0, w: 7, h: 0.45,
      fill: { color: C.amberBg },
    });
    s.addImage({ data: icons.warning, x: 7.85, y: 5.07, w: 0.3, h: 0.3 });
    s.addText("النتيجة: عمليات يدوية مكلفة، تجربة عميل غير احترافية، نمو محدود", {
      x: 1.5, y: 5.0, w: 6.3, h: 0.45,
      fontSize: 11.5, fontFace: "Calibri", color: C.gray700, align: "center", valign: "middle", bold: true,
    });

    addPageNumber(s, 2, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 3 — The Solution
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("الحل — منصة تشغيل رقمية متكاملة", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const solutions = [
      [icons.users, "منصة واحدة تربط العميل، فريق التشغيل، والمزودين"],
      [icons.file, "بوابة للعميل: يرفع طلبه، يتابع حالته، يرى العروض، يدفع إلكترونيًا"],
      [icons.clipboard, "لوحة إدارة: الفريق يدير الطلبات، يراجع المستندات، يعتمد العروض"],
      [icons.cogs, "بوابة المزودين (مرحلة لاحقة): المراكز الطبية والمعاهد يدخلون عروضهم"],
      [icons.bell, "نظام إشعارات تلقائي: WhatsApp + Email + SMS"],
      [icons.eye, "كل شيء موثق ومركزي وقابل للقياس"],
    ];

    const startY = 1.2;
    const rowH = 0.68;
    solutions.forEach((item, i) => {
      const y = startY + i * rowH;

      s.addShape("rect", {
        x: 0.8, y: y, w: 8.4, h: rowH - 0.1,
        fill: { color: C.white },
        shadow: mkShadow(),
      });

      // Icon circle
      s.addShape("ellipse", {
        x: 8.45, y: y + 0.08, w: 0.48, h: 0.48,
        fill: { color: C.tealLight },
      });
      s.addImage({ data: item[0], x: 8.53, y: y + 0.14, w: 0.32, h: 0.32 });

      // Green accent on right
      s.addShape("rect", {
        x: 9.15, y: y + 0.08, w: 0.05, h: rowH - 0.26,
        fill: { color: C.green },
      });

      s.addText(item[1], {
        x: 1.0, y: y, w: 7.3, h: rowH - 0.1,
        fontSize: 13.5, fontFace: "Calibri", color: C.gray700, align: "right", valign: "middle",
      });
    });

    addPageNumber(s, 3, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 4 — Platform Components
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    addTopBar(s);

    s.addText("ماذا نبني — مكونات المنصة", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const components = [
      {
        icon: icons.users, title: "بوابة العميل",
        subtitle: "Client Portal",
        desc: "تسجيل، إنشاء طلب، رفع مستندات\nدفع إلكتروني، متابعة الحالة، رسائل",
      },
      {
        icon: icons.chartBar, title: "لوحة الإدارة",
        subtitle: "Admin Panel",
        desc: "إدارة الطلبات، توزيع العمل\nمراجعة المستندات، تقارير مالية",
      },
      {
        icon: icons.cogs, title: "محرك الطلبات",
        subtitle: "Order Engine",
        desc: "نظام حالات ذكي، تتبع كل مرحلة\nسجل تدقيق كامل لكل عملية",
      },
      {
        icon: icons.bell, title: "نظام الإشعارات",
        subtitle: "Notifications",
        desc: "إشعارات تلقائية عبر كل القنوات\nعند كل تحديث على الطلب",
      },
    ];

    const cardW = 4.1;
    const cardH = 1.9;
    const gap = 0.3;
    const startX = (10 - 2 * cardW - gap) / 2;
    const startY = 1.2;

    components.forEach((comp, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = startX + col * (cardW + gap);
      const y = startY + row * (cardH + gap);

      // Card
      s.addShape("rect", {
        x, y, w: cardW, h: cardH,
        fill: { color: C.white },
        shadow: mkShadow(),
      });

      // Teal top border
      s.addShape("rect", {
        x, y, w: cardW, h: 0.05,
        fill: { color: C.teal },
      });

      // Icon
      s.addShape("ellipse", {
        x: x + cardW - 0.8, y: y + 0.25, w: 0.55, h: 0.55,
        fill: { color: C.tealLight },
      });
      s.addImage({ data: comp.icon, x: x + cardW - 0.72, y: y + 0.32, w: 0.4, h: 0.4 });

      // Title
      s.addText(comp.title, {
        x: x + 0.2, y: y + 0.25, w: cardW - 1.2, h: 0.35,
        fontSize: 16, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
      });

      // Subtitle
      s.addText(comp.subtitle, {
        x: x + 0.2, y: y + 0.58, w: cardW - 1.2, h: 0.3,
        fontSize: 11, fontFace: "Calibri", color: C.gray400, align: "right", margin: 0,
      });

      // Description
      s.addText(comp.desc, {
        x: x + 0.2, y: y + 0.95, w: cardW - 0.4, h: 0.8,
        fontSize: 12, fontFace: "Calibri", color: C.gray500, align: "right", valign: "top",
        lineSpacingMultiple: 1.3,
      });
    });

    addPageNumber(s, 4, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 5 — Three Services
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("3 خدمات — منصة واحدة", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const services = [
      {
        icon: icons.medical, bg: "0284C7", title: "العلاج الطبي",
        tag: "الأولوية",
        flow: "طلب  ←  مراجعة  ←  عروض من المراكز  ←  اعتماد  ←  اختيار  ←  دفع  ←  تنسيق كامل",
      },
      {
        icon: icons.education, bg: "059669", title: "التعليم والمعاهد",
        tag: "المرحلة الثانية",
        flow: "كتالوج معاهد  ←  مقارنة  ←  اختيار  ←  دفع  ←  تسجيل  ←  تنسيق",
      },
      {
        icon: icons.passport, bg: "7C3AED", title: "التأشيرات",
        tag: "المرحلة الثانية",
        flow: "اختيار الدولة والنوع  ←  دفع  ←  رفع مستندات  ←  متابعة  ←  النتيجة",
      },
    ];

    const cardW = 8.6;
    const cardH = 1.25;
    const startY = 1.2;
    const gap = 0.2;

    services.forEach((svc, i) => {
      const y = startY + i * (cardH + gap);

      // Card
      s.addShape("rect", {
        x: 0.7, y, w: cardW, h: cardH,
        fill: { color: C.white },
        shadow: mkShadow(),
      });

      // Left color band
      s.addShape("rect", {
        x: 0.7, y, w: 0.06, h: cardH,
        fill: { color: svc.bg },
      });

      // Icon circle
      s.addShape("ellipse", {
        x: 8.5, y: y + 0.15, w: 0.6, h: 0.6,
        fill: { color: svc.bg },
      });
      s.addImage({ data: svc.icon, x: 8.58, y: y + 0.22, w: 0.44, h: 0.44 });

      // Title
      s.addText(svc.title, {
        x: 1.0, y: y + 0.1, w: 7.2, h: 0.4,
        fontSize: 18, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
      });

      // Tag
      s.addShape("rect", {
        x: 5.8, y: y + 0.15, w: 1.3, h: 0.3,
        fill: { color: svc.bg, transparency: 85 },
      });
      s.addText(svc.tag, {
        x: 5.8, y: y + 0.15, w: 1.3, h: 0.3,
        fontSize: 9, fontFace: "Calibri", bold: true, color: svc.bg, align: "center", valign: "middle",
      });

      // Flow
      s.addText(svc.flow, {
        x: 1.0, y: y + 0.6, w: 7.8, h: 0.5,
        fontSize: 12, fontFace: "Calibri", color: C.gray500, align: "right", valign: "middle",
      });
    });

    // Bottom note
    s.addShape("rect", { x: 1.5, y: 4.8, w: 7, h: 0.45, fill: { color: C.tealLight } });
    s.addText("بنية موحدة — كل خدمة تستخدم نفس محرك الطلبات والمستندات والدفع", {
      x: 1.5, y: 4.8, w: 7, h: 0.45,
      fontSize: 12, fontFace: "Calibri", bold: true, color: C.tealDark, align: "center", valign: "middle",
    });

    addPageNumber(s, 5, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 6 — Technical Architecture
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    addTopBar(s);

    s.addText("البنية التقنية", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const techs = [
      { icon: icons.server, label: "Frontend", value: "Next.js (React)", desc: "سريع، يدعم PWA وتعدد اللغات" },
      { icon: icons.cogs, label: "Backend", value: "NestJS (Node.js)", desc: "بنية معيارية، TypeScript" },
      { icon: icons.database, label: "Database", value: "PostgreSQL", desc: "قوية، مرنة، آمنة" },
      { icon: icons.lock, label: "Storage", value: "S3-compatible", desc: "تخزين آمن للمستندات" },
      { icon: icons.comments, label: "Real-time", value: "WebSocket", desc: "تحديثات لحظية" },
      { icon: icons.credit, label: "Payments", value: "Moyasar / HyperPay", desc: "mada, Visa, Apple Pay" },
    ];

    const colW = 2.7;
    const rowH = 1.85;
    const startX = (10 - 3 * colW - 2 * 0.25) / 2;
    const startY = 1.15;

    techs.forEach((tech, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = startX + col * (colW + 0.25);
      const y = startY + row * (rowH + 0.2);

      s.addShape("rect", {
        x, y, w: colW, h: rowH,
        fill: { color: C.white },
        shadow: mkShadow(),
      });

      // Icon
      s.addShape("ellipse", {
        x: x + (colW - 0.5) / 2, y: y + 0.15, w: 0.5, h: 0.5,
        fill: { color: C.tealLight },
      });
      s.addImage({ data: tech.icon, x: x + (colW - 0.34) / 2, y: y + 0.23, w: 0.34, h: 0.34 });

      // Label
      s.addText(tech.label, {
        x: x + 0.1, y: y + 0.75, w: colW - 0.2, h: 0.3,
        fontSize: 11, fontFace: "Calibri", color: C.gray400, align: "center", margin: 0,
      });

      // Value
      s.addText(tech.value, {
        x: x + 0.1, y: y + 1.0, w: colW - 0.2, h: 0.35,
        fontSize: 14, fontFace: "Calibri", bold: true, color: C.navy, align: "center", margin: 0,
      });

      // Desc
      s.addText(tech.desc, {
        x: x + 0.1, y: y + 1.35, w: colW - 0.2, h: 0.35,
        fontSize: 10.5, fontFace: "Calibri", color: C.gray500, align: "center", margin: 0,
      });
    });

    addPageNumber(s, 6, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 7 — Smart Order System
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("نظام الطلبات الذكي", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    // Order number showcase
    s.addShape("rect", {
      x: 2.5, y: 1.1, w: 5, h: 0.5,
      fill: { color: C.navy },
    });
    s.addText("WAS-MED-2026-00001", {
      x: 2.5, y: 1.1, w: 5, h: 0.5,
      fontSize: 18, fontFace: "Consolas", bold: true, color: C.teal, align: "center", valign: "middle",
    });

    const features = [
      [icons.chartLine, "شريط تقدم مرئي للعميل يوضح المرحلة الحالية"],
      [icons.clipboard, "نظام حالات ذكي — كل انتقال موثق (من غيّر، متى، لماذا)"],
      [icons.cogs, "نماذج ذكية تتغير حسب نوع الخدمة"],
      [icons.file, "تتبع المستندات المطلوبة والناقصة تلقائيًا"],
      [icons.comments, "مركز رسائل داخل كل طلب — كل المحادثات موثقة"],
      [icons.clock, "تنبيهات تلقائية عند التأخر عن SLA"],
    ];

    const startY = 1.85;
    const rowH = 0.58;
    features.forEach((f, i) => {
      const y = startY + i * rowH;

      s.addShape("ellipse", {
        x: 8.7, y: y + 0.06, w: 0.42, h: 0.42,
        fill: { color: C.tealLight },
      });
      s.addImage({ data: f[0], x: 8.77, y: y + 0.12, w: 0.28, h: 0.28 });

      s.addText(f[1], {
        x: 0.8, y: y, w: 7.7, h: rowH,
        fontSize: 13, fontFace: "Calibri", color: C.gray700, align: "right", valign: "middle",
      });
    });

    addPageNumber(s, 7, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 8 — Client Experience
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("تجربة العميل", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const items = [
      [icons.userShield, "تسجيل سهل برقم الجوال + OTP"],
      [icons.chartLine, "حاسبة تكلفة تقديرية قبل بدء الطلب"],
      [icons.file, "رفع المستندات مع تتبع واضح: مكتمل / ناقص / مرفوض"],
      [icons.exchange, "مقارنة العروض بشكل مرتب وواضح (العلاج الطبي)"],
      [icons.credit, "دفع إلكتروني آمن (mada, Visa, Apple Pay)"],
      [icons.eye, "متابعة لحظية لحالة الطلب عبر شريط تقدم"],
      [icons.bell, "إشعارات فورية عبر WhatsApp و SMS والبريد"],
      [icons.clipboard, "لوحة تحكم شخصية لكل طلباته ومستنداته"],
    ];

    // Two-column layout
    const colItems = [items.slice(0, 4), items.slice(4, 8)];
    const colX = [5.1, 0.5];
    const startY = 1.15;
    const rowH = 0.93;

    colItems.forEach((col, ci) => {
      col.forEach((item, ri) => {
        const x = colX[ci];
        const y = startY + ri * rowH;

        // Card
        s.addShape("rect", {
          x, y, w: 4.3, h: rowH - 0.12,
          fill: { color: C.gray100 },
        });

        // Icon
        s.addShape("ellipse", {
          x: x + 3.7, y: y + 0.14, w: 0.45, h: 0.45,
          fill: { color: C.tealLight },
        });
        s.addImage({ data: item[0], x: x + 3.77, y: y + 0.2, w: 0.3, h: 0.3 });

        s.addText(item[1], {
          x: x + 0.15, y: y, w: 3.45, h: rowH - 0.12,
          fontSize: 12, fontFace: "Calibri", color: C.gray700, align: "right", valign: "middle",
        });
      });
    });

    addPageNumber(s, 8, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 9 — Operations Team Benefits
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    addTopBar(s);

    s.addText("ماذا يستفيد فريق التشغيل", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const benefits = [
      "لوحة واحدة لكل الطلبات بدلاً من Excel + WhatsApp",
      "توزيع تلقائي وعادل للطلبات على الفريق",
      "تنبيهات فورية عند وصول طلب جديد أو مستند",
      "مراجعة المستندات واعتمادها بضغطة زر",
      "إدخال العروض ومراجعتها وإضافة الهامش الربحي",
      "إرسال رسائل للعميل من داخل النظام مباشرة",
      "كل الملاحظات الداخلية موثقة ومحفوظة",
      "تنبيه تلقائي عند اقتراب انتهاء SLA",
    ];

    const startY = 1.15;
    const rowH = 0.52;
    benefits.forEach((b, i) => {
      const y = startY + i * rowH;

      s.addShape("rect", {
        x: 0.8, y, w: 8.4, h: rowH - 0.07,
        fill: { color: C.white },
        shadow: mkShadow(),
      });

      // Green check
      s.addImage({ data: icons.check, x: 8.65, y: y + 0.1, w: 0.28, h: 0.28 });

      s.addText(b, {
        x: 1.0, y, w: 7.5, h: rowH - 0.07,
        fontSize: 12.5, fontFace: "Calibri", color: C.gray700, align: "right", valign: "middle",
      });
    });

    addPageNumber(s, 9, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 10 — Management Benefits
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("ماذا تستفيد الإدارة", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const mgmtItems = [
      { icon: icons.eye, title: "رؤية شاملة", desc: "كل العمليات في لحظة واحدة — لوحة مؤشرات مركزية" },
      { icon: icons.chartBar, title: "تقارير مالية دقيقة", desc: "إيرادات، هوامش ربح، مستحقات، مستردات — تلقائية" },
      { icon: icons.users, title: "قياس أداء الفريق", desc: "وقت المعالجة، عدد الطلبات، نسبة الإنجاز لكل موظف" },
      { icon: icons.exchange, title: "تتبع أداء المزودين", desc: "من يرد أسرع؟ من عروضه أفضل؟ بيانات حقيقية" },
      { icon: icons.clipboard, title: "سجل تدقيق كامل", desc: "من فعل ماذا ومتى — مساءلة وشفافية تامة" },
      { icon: icons.chartLine, title: "مؤشرات أداء KPIs", desc: "قرارات مبنية على أرقام حقيقية وليس تقديرات" },
    ];

    const cardW = 4.1;
    const cardH = 1.2;
    const gap = 0.22;
    const startX = (10 - 2 * cardW - gap) / 2;
    const startY = 1.15;

    mgmtItems.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = startX + col * (cardW + gap);
      const y = startY + row * (cardH + gap);

      s.addShape("rect", {
        x, y, w: cardW, h: cardH,
        fill: { color: C.gray100 },
      });

      s.addShape("ellipse", {
        x: x + cardW - 0.7, y: y + 0.15, w: 0.48, h: 0.48,
        fill: { color: C.tealLight },
      });
      s.addImage({ data: item.icon, x: x + cardW - 0.62, y: y + 0.22, w: 0.32, h: 0.32 });

      s.addText(item.title, {
        x: x + 0.15, y: y + 0.15, w: cardW - 1.0, h: 0.35,
        fontSize: 14, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
      });

      s.addText(item.desc, {
        x: x + 0.15, y: y + 0.55, w: cardW - 0.3, h: 0.5,
        fontSize: 11.5, fontFace: "Calibri", color: C.gray500, align: "right", valign: "top", margin: 0,
      });
    });

    addPageNumber(s, 10, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 11 — Security
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });

    s.addImage({ data: icons.shieldWhite, x: 4.5, y: 0.3, w: 0.6, h: 0.6 });

    s.addText("الأمان وحماية البيانات", {
      x: 0.5, y: 0.95, w: 9, h: 0.6,
      fontSize: 26, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0,
    });

    const secItems = [
      "تشفير كامل للبيانات أثناء النقل والتخزين (AES-256 + TLS 1.3)",
      "حماية خاصة للبيانات الطبية الحساسة مع سجل وصول",
      "نظام صلاحيات متعدد المستويات — كل موظف يرى فقط ما يخصه",
      "مصادقة ثنائية (2FA) إلزامية لحسابات الموظفين",
      "سجل تدقيق لكل عملية وصول للبيانات",
      "نسخ احتياطية يومية تلقائية",
      "متوافق مع نظام حماية البيانات الشخصية السعودي",
    ];

    const startY = 1.75;
    const rowH = 0.5;
    secItems.forEach((item, i) => {
      const y = startY + i * rowH;

      s.addImage({ data: icons.checkWhite, x: 8.85, y: y + 0.08, w: 0.28, h: 0.28 });

      s.addText(item, {
        x: 0.8, y, w: 7.9, h: rowH,
        fontSize: 13, fontFace: "Calibri", color: C.white, align: "right", valign: "middle",
      });
    });

    addPageNumber(s, 11, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 12 — Roadmap
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.offWhite };
    addTopBar(s);

    s.addText("خطة التنفيذ — 3 مراحل", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const phases = [
      {
        num: "1", title: "الأساس", timeline: "الأشهر 1-5", color: C.teal,
        items: [
          "بوابة العميل + لوحة الإدارة",
          "خدمة العلاج الطبي (كاملة)",
          "نظام الدفع الإلكتروني",
          "إدارة المستندات",
          "الإشعارات (Email + SMS)",
          "عربي + إنجليزي",
        ],
      },
      {
        num: "2", title: "التوسع", timeline: "الأشهر 5-8", color: "059669",
        items: [
          "خدمة التعليم والمعاهد",
          "خدمة التأشيرات",
          "تكامل WhatsApp",
          "PWA (تطبيق قابل للتثبيت)",
          "بوابة المزودين (نسخة أولى)",
          "لغات إضافية",
        ],
      },
      {
        num: "3", title: "التطوير", timeline: "الأشهر 9-14", color: "7C3AED",
        items: [
          "بوابة مزودين كاملة",
          "تعدد العملات",
          "تكامل API خارجي",
          "تحليلات متقدمة",
          "نظام تقييمات",
          "حتى 8 لغات",
        ],
      },
    ];

    const cardW = 2.85;
    const cardH = 3.9;
    const gap = 0.25;
    const startX = (10 - 3 * cardW - 2 * gap) / 2;
    const startY = 1.1;

    phases.forEach((phase, i) => {
      const x = startX + i * (cardW + gap);

      // Card
      s.addShape("rect", {
        x, y: startY, w: cardW, h: cardH,
        fill: { color: C.white },
        shadow: mkShadow(),
      });

      // Top color band
      s.addShape("rect", {
        x, y: startY, w: cardW, h: 0.55,
        fill: { color: phase.color },
      });

      // Phase number
      s.addText(`المرحلة ${phase.num}`, {
        x: x + 0.1, y: startY + 0.02, w: cardW - 0.2, h: 0.3,
        fontSize: 14, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0,
      });

      // Timeline
      s.addText(phase.timeline, {
        x: x + 0.1, y: startY + 0.28, w: cardW - 0.2, h: 0.25,
        fontSize: 10, fontFace: "Calibri", color: C.white, align: "center", margin: 0,
        transparency: 20,
      });

      // Title
      s.addText(phase.title, {
        x: x + 0.1, y: startY + 0.65, w: cardW - 0.2, h: 0.35,
        fontSize: 15, fontFace: "Calibri", bold: true, color: C.navy, align: "center", margin: 0,
      });

      // Items
      const itemStartY = startY + 1.1;
      const itemH = 0.42;
      phase.items.forEach((item, j) => {
        const iy = itemStartY + j * itemH;

        s.addShape("rect", {
          x: x + 0.15, y: iy, w: cardW - 0.3, h: itemH - 0.07,
          fill: { color: j % 2 === 0 ? C.gray100 : C.white },
        });

        s.addText(item, {
          x: x + 0.2, y: iy, w: cardW - 0.4, h: itemH - 0.07,
          fontSize: 10.5, fontFace: "Calibri", color: C.gray700, align: "right", valign: "middle",
        });
      });
    });

    addPageNumber(s, 12, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 13 — Before vs After
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("الأثر المتوقع — قبل وبعد", {
      x: 0.5, y: 0.3, w: 9, h: 0.6,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    // Table headers
    const headerY = 1.05;
    // "Before" header (left)
    s.addShape("rect", { x: 0.5, y: headerY, w: 3.8, h: 0.45, fill: { color: C.redBg } });
    s.addText("قبل المنصة", {
      x: 0.5, y: headerY, w: 3.8, h: 0.45,
      fontSize: 13, fontFace: "Calibri", bold: true, color: C.red, align: "center", valign: "middle",
    });

    // "After" header (right)
    s.addShape("rect", { x: 5.7, y: headerY, w: 3.8, h: 0.45, fill: { color: C.greenBg } });
    s.addText("بعد المنصة", {
      x: 5.7, y: headerY, w: 3.8, h: 0.45,
      fontSize: 13, fontFace: "Calibri", bold: true, color: C.green, align: "center", valign: "middle",
    });

    // Arrow column in middle
    s.addShape("rect", { x: 4.4, y: headerY, w: 1.2, h: 0.45, fill: { color: C.gray100 } });
    s.addText("←", {
      x: 4.4, y: headerY, w: 1.2, h: 0.45,
      fontSize: 18, fontFace: "Calibri", bold: true, color: C.teal, align: "center", valign: "middle",
    });

    const comparisons = [
      ["أيام من التنسيق اليدوي", "ساعات مع النظام"],
      ["العميل يتصل ويسأل باستمرار", "يتابع بنفسه لحظيًا"],
      ["المستندات تُنسى أو تتأخر", "تنبيهات تلقائية فورية"],
      ["تقارير يدوية وغير دقيقة", "تقارير تلقائية ولحظية"],
      ["أداء الفريق غير قابل للقياس", "مؤشرات واضحة ومراقبة"],
      ["التوسع = موظفين بنفس النسبة", "النظام يتحمل حجم أكبر"],
      ["تجربة تعتمد على الموظف", "تجربة موحدة واحترافية"],
    ];

    const startY = 1.6;
    const rowH = 0.52;
    comparisons.forEach((comp, i) => {
      const y = startY + i * rowH;
      const bg = i % 2 === 0 ? C.gray100 : C.white;

      // Before cell
      s.addShape("rect", { x: 0.5, y, w: 3.8, h: rowH - 0.05, fill: { color: bg } });
      s.addText(comp[0], {
        x: 0.5, y, w: 3.8, h: rowH - 0.05,
        fontSize: 11.5, fontFace: "Calibri", color: C.gray700, align: "center", valign: "middle",
      });

      // Arrow
      s.addShape("rect", { x: 4.4, y, w: 1.2, h: rowH - 0.05, fill: { color: bg } });
      s.addText("←", {
        x: 4.4, y, w: 1.2, h: rowH - 0.05,
        fontSize: 14, fontFace: "Calibri", color: C.teal, align: "center", valign: "middle",
      });

      // After cell
      s.addShape("rect", { x: 5.7, y, w: 3.8, h: rowH - 0.05, fill: { color: bg } });
      s.addText(comp[1], {
        x: 5.7, y, w: 3.8, h: rowH - 0.05,
        fontSize: 11.5, fontFace: "Calibri", color: C.gray700, align: "center", valign: "middle",
      });
    });

    addPageNumber(s, 13, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 14 — Investment Summary
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addTopBar(s);

    s.addText("ملخص الاستثمار", {
      x: 0.5, y: 0.3, w: 9, h: 0.7,
      fontSize: 28, fontFace: "Calibri", bold: true, color: C.navy, align: "right", margin: 0,
    });

    const investItems = [
      [icons.gem, "منصة تشغيل تملكها الشركة بالكامل — ليست اشتراكًا شهريًا بخدمة خارجية"],
      [icons.chartLine, "أصل رقمي يزيد قيمته مع الوقت والبيانات المتراكمة"],
      [icons.cogs, "بنية تقنية قابلة للتوسع لخدمات جديدة مستقبلًا"],
      [icons.database, "بيانات مركزية تُمكّن من اتخاذ قرارات أفضل"],
      [icons.users, "تجربة عميل احترافية ترفع الثقة والولاء"],
      [icons.chartBar, "كفاءة تشغيلية تقلل التكاليف وتزيد الإنتاجية"],
    ];

    const startY = 1.15;
    const rowH = 0.6;
    investItems.forEach((item, i) => {
      const y = startY + i * rowH;

      s.addShape("rect", {
        x: 0.8, y, w: 8.4, h: rowH - 0.08,
        fill: { color: i % 2 === 0 ? C.gray100 : C.white },
      });

      s.addShape("ellipse", {
        x: 8.55, y: y + 0.07, w: 0.42, h: 0.42,
        fill: { color: C.tealLight },
      });
      s.addImage({ data: item[0], x: 8.62, y: y + 0.13, w: 0.28, h: 0.28 });

      s.addText(item[1], {
        x: 1.0, y, w: 7.4, h: rowH - 0.08,
        fontSize: 13, fontFace: "Calibri", color: C.gray700, align: "right", valign: "middle",
      });
    });

    // Cost callout
    s.addShape("rect", {
      x: 1.5, y: 4.85, w: 7, h: 0.55,
      fill: { color: C.tealLight },
    });
    s.addText("تكلفة البنية التحتية الشهرية: ~$150-200 — أقل من راتب موظف واحد", {
      x: 1.5, y: 4.85, w: 7, h: 0.55,
      fontSize: 13, fontFace: "Calibri", bold: true, color: C.tealDark, align: "center", valign: "middle",
    });

    addPageNumber(s, 14, TOTAL);
  }

  // ════════════════════════════════════════════════════════
  // SLIDE 15 — Closing
  // ════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape("rect", { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
    s.addShape("rect", { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.teal } });

    // Decorative
    s.addShape("ellipse", { x: -1, y: -1, w: 3, h: 3, fill: { color: C.teal, transparency: 92 } });
    s.addShape("ellipse", { x: 8, y: 3.5, w: 3.5, h: 3.5, fill: { color: C.teal, transparency: 92 } });

    s.addText("الخطوة القادمة", {
      x: 0.5, y: 0.6, w: 9, h: 0.8,
      fontSize: 36, fontFace: "Calibri", bold: true, color: C.white, align: "center",
    });

    // Divider
    s.addShape("rect", { x: 3.5, y: 1.5, w: 3, h: 0.03, fill: { color: C.teal, transparency: 40 } });

    const closingItems = [
      "المنصة ليست مجرد موقع — هي نظام تشغيل رقمي يُحوّل طريقة عملنا",
      "نبدأ بخدمة العلاج الطبي (عملنا الأساسي) ونتوسع بناءً على النتائج",
      "التنفيذ على مراحل = مخاطر أقل + نتائج أسرع",
    ];

    const startY = 1.8;
    const rowH = 0.65;
    closingItems.forEach((item, i) => {
      const y = startY + i * rowH;
      s.addImage({ data: icons.checkWhite, x: 8.5, y: y + 0.12, w: 0.3, h: 0.3 });
      s.addText(item, {
        x: 1.0, y, w: 7.3, h: rowH,
        fontSize: 15, fontFace: "Calibri", color: C.white, align: "right", valign: "middle",
      });
    });

    // Quote
    s.addShape("rect", { x: 1.5, y: 4.1, w: 7, h: 0.7, fill: { color: C.teal, transparency: 80 } });
    s.addText("التحول الرقمي ليس خيارًا — هو ضرورة للنمو", {
      x: 1.5, y: 4.1, w: 7, h: 0.7,
      fontSize: 18, fontFace: "Calibri", bold: true, italic: true, color: C.teal, align: "center", valign: "middle",
    });
  }

  // ── Save ──
  await pres.writeFile({ fileName: "D:/basemah_1/Waseet_Platform_Technical_Presentation.pptx" });
  console.log("Presentation saved successfully!");
}

main().catch(console.error);
