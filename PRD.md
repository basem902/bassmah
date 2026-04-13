# Waseet Platform — Product Requirements Document (PRD)
# منصة وسيط — وثيقة متطلبات المنتج

**Version:** 1.0  
**Date:** 2026-04-13  
**Status:** Draft  
**Classification:** Confidential  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Business Context](#2-business-context)
3. [System Architecture](#3-system-architecture)
4. [Technology Stack](#4-technology-stack)
5. [User Roles & Permissions](#5-user-roles--permissions)
6. [Core Platform Modules](#6-core-platform-modules)
7. [Service Module: Medical Treatment](#7-service-module-medical-treatment)
8. [Service Module: Education & Institutes](#8-service-module-education--institutes)
9. [Service Module: Visa Services](#9-service-module-visa-services)
10. [Database Schema](#10-database-schema)
11. [Order State Machines](#11-order-state-machines)
12. [Payment System](#12-payment-system)
13. [Document Management System](#13-document-management-system)
14. [Notification System](#14-notification-system)
15. [Messaging System](#15-messaging-system)
16. [Admin Dashboard](#16-admin-dashboard)
17. [Provider Portal](#17-provider-portal)
18. [Search, Filtering & Catalog](#18-search-filtering--catalog)
19. [Cost Calculator](#19-cost-calculator)
20. [API Design](#20-api-design)
21. [Security & Compliance](#21-security--compliance)
22. [Internationalization (i18n)](#22-internationalization-i18n)
23. [PWA Requirements](#23-pwa-requirements)
24. [Third-Party Integrations](#24-third-party-integrations)
25. [Phase Plan](#25-phase-plan)
26. [KPIs & Analytics](#26-kpis--analytics)
27. [Infrastructure & DevOps](#27-infrastructure--devops)
28. [Non-Functional Requirements](#28-non-functional-requirements)
29. [Glossary](#29-glossary)

---

## 1. Project Overview

### 1.1 Vision
بناء منصة تشغيل رقمية (Digital Operations Platform) تحوّل العمليات اليدوية الحالية للشركة إلى نظام متكامل يخدم العملاء والفريق التشغيلي والمزودين من خلال واجهات مخصصة لكل طرف.

### 1.2 Mission
تقديم تجربة شفافة ومنظمة للعميل، وأدوات إدارة فعّالة للفريق التشغيلي، مع الحفاظ على مرونة التعامل مع المزودين.

### 1.3 Platform Type
هذا **ليس موقعًا إلكترونيًا** وليس Marketplace تقليدي. هذه **منصة وساطة مُدارة (Managed Brokerage Platform)** بطبقة تشغيل متكاملة.

### 1.4 Core Value Proposition

| الطرف | القيمة |
|-------|--------|
| **العميل** | تجربة منظمة وشفافة بدلًا من تنسيق يدوي مع جهات متعددة |
| **فريق التشغيل** | نظام موحد لإدارة الطلبات بدلًا من Excel + WhatsApp + Email |
| **المزودون** | قناة منظمة لاستقبال الطلبات وتقديم العروض |
| **الإدارة** | رؤية شاملة للعمليات والأرقام واتخاذ قرارات مبنية على بيانات |

### 1.5 Key Assumptions
- الشركة تعمل حاليًا بنظام يدوي ولديها قاعدة عملاء وعلاقات مع مزودين
- الفريق التشغيلي سيتعامل مع المنصة بشكل يومي
- المزودون (مراكز طبية / معاهد) قد لا يستخدمون البوابة الرقمية فورًا
- المنصة ستعمل بالريال السعودي كعملة أساسية في المرحلة الأولى

---

## 2. Business Context

### 2.1 Current State (AS-IS)
```
العميل يتواصل عبر: هاتف / واتساب / إيميل
       ↓
الموظف يستقبل الطلب ويسجله: Excel / ملفات محلية
       ↓
التنسيق مع المزودين: واتساب / إيميل / هاتف
       ↓
العروض تصل للموظف: إيميل / واتساب
       ↓
الموظف يعرض العروض للعميل: واتساب / إيميل
       ↓
الدفع: تحويل بنكي / نقاط بيع
       ↓
التنسيق: يدوي بالكامل
       ↓
المتابعة: واتساب + مكالمات
```

**المشكلات الحالية:**
- لا يوجد تتبع مركزي للطلبات
- لا يوجد توثيق للمحادثات والقرارات
- صعوبة متابعة المستندات الناقصة
- لا توجد تقارير مالية دقيقة
- اعتماد كامل على ذاكرة الموظفين
- صعوبة التوسع بدون زيادة الموظفين بنفس النسبة

### 2.2 Target State (TO-BE)
```
العميل يدخل المنصة → ينشئ طلب → يرفع المستندات → يدفع
       ↓
النظام يُخطر فريق التشغيل → يُعيّن الطلب لموظف
       ↓
الموظف يُرسل الحالة للمزودين (عبر البوابة أو يدويًا)
       ↓
العروض تُدخل في النظام → تُراجع → تُعتمد
       ↓
العميل يرى العروض المعتمدة → يختار → يدفع
       ↓
النظام يتتبع كل مرحلة بإشعارات تلقائية
       ↓
كل شيء موثّق ومركزي وقابل للقياس
```

### 2.3 Services Overview

| الخدمة | التعقيد | حجم العمليات الحالي | الأولوية |
|--------|---------|---------------------|----------|
| العلاج الطبي | عالٍ (عروض ديناميكية + تنسيق متعدد) | أساسي — العمل الرئيسي للشركة | **Phase 1** |
| التعليم والمعاهد | متوسط (كتالوج + تسجيل) | ثانوي | Phase 2 |
| التأشيرات | منخفض (خطي) | ثانوي | Phase 2 |

> **ملاحظة:** بما أن العلاج الطبي هو العمل الأساسي القائم للشركة، فإن MVP سيركز عليه مع بنية تسمح بإضافة الخدمات الأخرى لاحقًا.

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Client Portal│  │ Admin Panel  │  │ Provider Portal      │   │
│  │ (PWA)        │  │ (SPA)        │  │ (SPA) [Phase 2+]     │   │
│  │              │  │              │  │                      │   │
│  │ - Dashboard  │  │ - Orders     │  │ - Incoming Requests  │   │
│  │ - Orders     │  │ - Users      │  │ - Submit Quotes      │   │
│  │ - Documents  │  │ - Providers  │  │ - Order Status       │   │
│  │ - Payments   │  │ - Finance    │  │ - Documents          │   │
│  │ - Messages   │  │ - Reports    │  │ - Messages           │   │
│  │ - Profile    │  │ - Settings   │  │                      │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘   │
│         │                 │                      │               │
└─────────┼─────────────────┼──────────────────────┼───────────────┘
          │                 │                      │
          ▼                 ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                               │
│                  (Authentication + Rate Limiting)                 │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICES                            │
│                                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────┐ │
│  │ Auth       │ │ Order      │ │ Payment    │ │ Notification │ │
│  │ Service    │ │ Service    │ │ Service    │ │ Service      │ │
│  └────────────┘ └────────────┘ └────────────┘ └──────────────┘ │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────┐ │
│  │ Document   │ │ Messaging  │ │ Provider   │ │ Catalog      │ │
│  │ Service    │ │ Service    │ │ Service    │ │ Service      │ │
│  └────────────┘ └────────────┘ └────────────┘ └──────────────┘ │
│  ┌────────────┐ ┌────────────┐                                  │
│  │ Reporting  │ │ Audit      │                                  │
│  │ Service    │ │ Service    │                                  │
│  └────────────┘ └────────────┘                                  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ PostgreSQL   │  │ Redis        │  │ Object Storage     │    │
│  │ (Primary DB) │  │ (Cache +     │  │ (S3 / MinIO)       │    │
│  │              │  │  Sessions +   │  │ Documents + Files  │    │
│  │              │  │  Queues)      │  │                    │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL INTEGRATIONS                          │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Payment  │ │ WhatsApp │ │ SMS      │ │ Email (SMTP /    │  │
│  │ Gateway  │ │ Business │ │ Gateway  │ │  Transactional)   │  │
│  │ (Moyasar/│ │ API      │ │          │ │                   │  │
│  │  HyperPay│ │          │ │          │ │                   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Architecture Principles

1. **Modular Monolith أولًا، Microservices لاحقًا:** نبدأ بتطبيق واحد منظم بوحدات (modules) وليس خدمات مصغرة منفصلة. أقل تعقيدًا في البداية مع إمكانية التفكيك لاحقًا.

2. **Service-Type Agnostic Core:** الكيانات الأساسية (Order, Payment, Document, Message) مصممة لتعمل مع أي نوع خدمة. التفاصيل الخاصة بكل خدمة تكون في كيانات فرعية.

3. **Event-Driven Internal Communication:** تغيير حالة الطلب يُطلق Events تستمع لها الأنظمة الأخرى (إشعارات، تدقيق، تقارير).

4. **Soft Delete Everywhere:** لا حذف نهائي لأي بيانات. كل شيء يُؤرشف مع الاحتفاظ بـ Audit Trail.

5. **Multi-tenancy Ready:** التصميم يسمح مستقبلًا بخدمة أكثر من شركة على نفس المنصة.

### 3.3 Application Structure

```
src/
├── core/                          # Shared across all services
│   ├── auth/                      # Authentication & Authorization
│   ├── users/                     # User management
│   ├── orders/                    # Base order engine
│   ├── payments/                  # Payment processing
│   ├── documents/                 # Document management
│   ├── messaging/                 # In-order messaging
│   ├── notifications/             # Email / SMS / WhatsApp / Push
│   ├── audit/                     # Audit trail logging
│   └── common/                    # Shared utilities, types, guards
│
├── services/                      # Service-specific modules
│   ├── medical/                   # Medical treatment service
│   │   ├── medical-case/          # Case-specific entities & logic
│   │   ├── quotes/                # Quote management
│   │   ├── providers/             # Medical center management
│   │   └── coordination/         # Appointments, housing, etc.
│   │
│   ├── education/                 # Education service [Phase 2]
│   │   ├── institutes/
│   │   ├── programs/
│   │   └── enrollment/
│   │
│   └── visa/                      # Visa service [Phase 2]
│       ├── countries/
│       ├── visa-types/
│       └── applications/
│
├── admin/                         # Admin-specific endpoints & logic
├── provider-portal/               # Provider portal [Phase 2+]
└── integrations/                  # Third-party integrations
    ├── payment-gateway/
    ├── whatsapp/
    ├── sms/
    └── email/
```

---

## 4. Technology Stack

### 4.1 Recommended Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Frontend** | Next.js 14+ (App Router) | SSR + SSG + PWA support + excellent i18n + React ecosystem |
| **UI Library** | Tailwind CSS + shadcn/ui | Fast development + RTL support + customizable |
| **State Management** | Zustand + React Query | Lightweight + excellent server state management |
| **Backend** | Node.js + NestJS | TypeScript full-stack + modular architecture + excellent ORM integration |
| **Database** | PostgreSQL 16 | JSONB for flexible data + robust + excellent indexing |
| **ORM** | Prisma | Type-safe + migrations + excellent DX |
| **Cache** | Redis | Sessions + caching + rate limiting + job queues |
| **Job Queue** | BullMQ (Redis-based) | Background jobs for notifications, report generation |
| **File Storage** | AWS S3 / MinIO | Scalable object storage for documents |
| **Search** | PostgreSQL Full-Text (MVP) → MeiliSearch (Phase 2+) | Start simple, upgrade when needed |
| **Real-time** | Socket.IO | Notifications + messaging + status updates |
| **Email** | Resend / Amazon SES | Transactional emails |
| **SMS** | Twilio / Unifonic | SMS notifications |
| **WhatsApp** | WhatsApp Business API (via 360dialog or official) | WhatsApp notifications |
| **Payment** | Moyasar / HyperPay | Saudi payment gateways with mada support |
| **Hosting** | AWS / Hetzner + Coolify | Cost-effective + scalable |
| **CI/CD** | GitHub Actions | Automated testing + deployment |
| **Monitoring** | Sentry + Uptime Kuma | Error tracking + uptime monitoring |

### 4.2 Why This Stack

- **Full TypeScript:** Frontend + Backend + Database types — type safety end-to-end, one language for the team
- **NestJS:** Enforces modular architecture — critical for a multi-service platform
- **Next.js:** PWA support, SSR for SEO (landing pages), CSR for app sections
- **PostgreSQL:** Handles relational data (orders, payments) + JSON flexibility (dynamic forms) in one database
- **Start Monolith:** One deployment, one database, simpler debugging — split later when scale demands it

### 4.3 Alternative Considerations

| If... | Then consider... |
|-------|-----------------|
| Team is stronger in Python | Django + DRF instead of NestJS |
| Budget is very tight | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| Team prefers Laravel | Laravel + Inertia.js + Vue (strong in Arab dev community) |
| Need mobile apps quickly | React Native / Expo for mobile + Next.js for web |

---

## 5. User Roles & Permissions

### 5.1 Role Hierarchy

```
Super Admin
├── Admin
│   ├── Operations Lead
│   │   ├── Operations Agent
│   │   └── Operations Agent
│   ├── Finance Manager
│   └── Content Manager
├── Provider User (Phase 2+)
│   ├── Provider Admin
│   └── Provider Agent
└── Client
```

### 5.2 Permissions Matrix

```
Permission                          | Client | Ops Agent | Ops Lead | Finance | Admin | Super Admin
─────────────────────────────────────┼────────┼───────────┼──────────┼─────────┼───────┼────────────
Create Order                        | ✅     | ✅*       | ✅*      | ❌      | ✅*   | ✅*
View Own Orders                     | ✅     | —         | —        | —       | —     | —
View Assigned Orders                | —      | ✅        | ✅       | ✅(R)   | ✅    | ✅
View All Orders                     | ❌     | ❌        | ✅       | ✅(R)   | ✅    | ✅
Update Order Status                 | ❌     | ✅**      | ✅       | ❌      | ✅    | ✅
Assign Order to Agent               | ❌     | ❌        | ✅       | ❌      | ✅    | ✅
Upload Documents                    | ✅     | ✅        | ✅       | ❌      | ✅    | ✅
Review Documents                    | ❌     | ✅        | ✅       | ❌      | ✅    | ✅
Send Messages (in order)            | ✅     | ✅        | ✅       | ❌      | ✅    | ✅
Make Payment                        | ✅     | ❌        | ❌       | ❌      | ❌    | ❌
View Financial Reports              | ❌     | ❌        | ❌       | ✅      | ✅    | ✅
Process Refund                      | ❌     | ❌        | ❌       | ✅      | ✅    | ✅
Manage Services & Pricing           | ❌     | ❌        | ❌       | ❌      | ✅    | ✅
Manage Users & Roles                | ❌     | ❌        | ❌       | ❌      | ❌    | ✅
Manage Providers                    | ❌     | ❌        | ✅       | ❌      | ✅    | ✅
Enter/Approve Quotes                | ❌     | ✅**      | ✅       | ❌      | ✅    | ✅
View System Settings                | ❌     | ❌        | ❌       | ❌      | ❌    | ✅
View Audit Log                      | ❌     | ❌        | ❌       | ❌      | ✅    | ✅

* = On behalf of client (walk-in / phone order)
** = Only for orders assigned to them
(R) = Read-only
```

### 5.3 Role Details

**Client (العميل):**
- تسجيل ذاتي عبر المنصة
- يرى فقط طلباته الخاصة
- يتحكم في معلوماته الشخصية ومستنداته
- يمكنه التواصل مع الفريق عبر رسائل الطلب فقط

**Operations Agent (موظف التشغيل):**
- يُعيَّن له طلبات محددة
- يدير دورة حياة الطلب من الاستلام للإنجاز
- يتواصل مع العميل والمزودين
- لا يرى طلبات غيره إلا إذا نُقلت إليه

**Operations Lead (مشرف التشغيل):**
- يرى جميع الطلبات ويوزعها على الفريق
- يعتمد العروض أو يرفضها
- يراقب أداء الفريق (SLA، أوقات الاستجابة)
- يمكنه التدخل في أي طلب

**Finance Manager (المدير المالي):**
- يرى البيانات المالية فقط (لا يتدخل في التشغيل)
- يعالج المسترجعات ويوافق عليها
- يراجع التسويات مع المزودين
- يصدر التقارير المالية

**Admin (مدير النظام):**
- إدارة الخدمات والأسعار والمحتوى
- إدارة المزودين
- الوصول لجميع الأقسام

**Super Admin:**
- إدارة المستخدمين والصلاحيات
- إعدادات النظام
- Audit Log

---

## 6. Core Platform Modules

### 6.1 Authentication Module

**التسجيل:**
```
Client Registration:
├── Phone + OTP (primary method)
├── Email + Password (secondary)
├── Google OAuth (optional)
└── After registration:
    ├── Basic profile (name, email, phone, nationality)
    └── Redirect to service selection or dashboard

Admin/Staff Registration:
├── Created by Super Admin only
├── Email + Password + 2FA (mandatory)
└── Role assigned at creation
```

**تسجيل الدخول:**
```
Client:
├── Phone + OTP (recommended)
└── Email + Password

Staff:
├── Email + Password + 2FA
└── Session duration: 8 hours (configurable)
```

**Security Requirements:**
- JWT with short-lived access tokens (15 min) + refresh tokens (7 days)
- Rate limiting on OTP: 3 attempts per 5 minutes
- Account lockout after 5 failed password attempts
- Audit log for all auth events
- Force logout capability for admins

### 6.2 Base Order Engine

هذا أهم مكون في النظام. كل خدمة (علاج / تعليم / تأشيرات) تبني فوق هذا المحرك الأساسي.

**Order Entity (Base):**
```typescript
interface BaseOrder {
  id: string;                    // UUID
  orderNumber: string;           // Human-readable: WAS-MED-2026-00001
  serviceType: ServiceType;      // MEDICAL | EDUCATION | VISA
  clientId: string;              // FK → User
  assignedTo: string | null;     // FK → User (staff)
  status: OrderStatus;           // Current status (varies by service type)
  priority: Priority;            // LOW | NORMAL | HIGH | URGENT
  
  // Financial
  estimatedPrice: number | null;
  finalPrice: number | null;
  companyMargin: number | null;
  currency: string;              // SAR (default)
  
  // Metadata
  source: OrderSource;           // PLATFORM | PHONE | WALKIN | REFERRAL
  notes: string | null;          // Internal notes (not visible to client)
  clientNotes: string | null;    // Client's notes
  tags: string[];                // For filtering/organization
  
  // Timestamps
  createdAt: DateTime;
  updatedAt: DateTime;
  submittedAt: DateTime | null;  // When client submitted (not just created)
  completedAt: DateTime | null;
  cancelledAt: DateTime | null;
  
  // Relations
  statusHistory: OrderStatusChange[];
  payments: Payment[];
  documents: Document[];
  messages: Message[];
  addons: OrderAddon[];
}
```

**Order Number Format:**
```
WAS-{SERVICE}-{YEAR}-{SEQUENCE}
Examples:
  WAS-MED-2026-00001  (Medical)
  WAS-EDU-2026-00001  (Education)
  WAS-VIS-2026-00001  (Visa)
```

**Key Design Decisions:**
1. كل Order له `serviceType` يحدد نوع الخدمة
2. الحقول المشتركة في BaseOrder، والحقول الخاصة في كيانات فرعية
3. نظام الحالات (Status) مختلف لكل نوع خدمة لكن يُدار بآلية واحدة
4. كل تغيير في الحالة يُسجَّل في `statusHistory` مع من غيّرها ومتى ولماذا

### 6.3 User Management Module

**User Entity:**
```typescript
interface User {
  id: string;
  type: UserType;                // CLIENT | STAFF | PROVIDER
  email: string;
  phone: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  
  // Profile
  firstName: string;
  lastName: string;
  nationality: string | null;
  dateOfBirth: Date | null;
  gender: Gender | null;
  preferredLanguage: string;     // ar, en, etc.
  avatarUrl: string | null;
  
  // For Staff
  role: Role | null;             // Null for clients
  department: string | null;
  
  // For Providers
  providerId: string | null;     // FK → Provider
  
  // Status
  status: UserStatus;            // ACTIVE | INACTIVE | SUSPENDED | PENDING_VERIFICATION
  lastLoginAt: DateTime | null;
  
  // Timestamps
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

---

## 7. Service Module: Medical Treatment

### 7.1 Overview
هذه الخدمة الأكثر تعقيدًا والأعلى قيمة. تتضمن وساطة بين العميل والمراكز الطبية مع إدارة عروض أسعار وتنسيق خدمات متعددة.

### 7.2 Medical Case Entity

```typescript
interface MedicalCase {
  id: string;
  orderId: string;               // FK → BaseOrder
  
  // Medical Info
  patientName: string;           // قد يكون مختلفًا عن صاحب الحساب
  patientAge: number;
  patientGender: Gender;
  relationship: Relationship;    // SELF | SPOUSE | CHILD | PARENT | OTHER
  
  // Case Details
  diagnosisSummary: string;      // وصف مبسط من العميل
  treatmentType: TreatmentType;  // SURGERY | CONSULTATION | THERAPY | CHECKUP | OTHER
  preferredCountry: string | null;
  preferredCity: string | null;
  urgencyLevel: UrgencyLevel;    // ROUTINE | SOON | URGENT | EMERGENCY
  
  // Additional Preferences
  budgetRange: BudgetRange | null;  // { min: number, max: number }
  languagePreference: string | null;
  specialRequirements: string | null;
  
  // Coordination (post-selection)
  selectedQuoteId: string | null;
  treatmentStartDate: Date | null;
  treatmentEndDate: Date | null;
  coordinationDetails: CoordinationDetails | null;
  
  // Relations
  quotes: MedicalQuote[];
  coordinationItems: CoordinationItem[];
}
```

### 7.3 Medical Quote Entity

```typescript
interface MedicalQuote {
  id: string;
  medicalCaseId: string;         // FK → MedicalCase
  providerId: string;            // FK → Provider (Medical Center)
  
  // Quote Details
  providerPrice: number;         // السعر من المركز الطبي
  companyMargin: number;         // هامش الشركة
  finalPrice: number;            // السعر النهائي للعميل
  currency: string;
  
  // Treatment Plan
  treatmentPlan: string;         // وصف الخطة العلاجية
  estimatedDuration: string;     // مدة العلاج التقديرية
  hospitalStayDays: number | null;
  
  // Included Services
  includedServices: string[];    // ما يشمله العرض
  excludedServices: string[];    // ما لا يشمله
  
  // Status
  status: QuoteStatus;           // RECEIVED | UNDER_REVIEW | APPROVED | REJECTED | SELECTED | EXPIRED
  internalReviewNote: string | null;  // ملاحظات داخلية (لا يراها العميل)
  rejectionReason: string | null;
  
  // Approval
  reviewedBy: string | null;     // FK → User (staff)
  reviewedAt: DateTime | null;
  approvedBy: string | null;     // FK → User (lead/admin)
  approvedAt: DateTime | null;
  
  // Validity
  validUntil: Date;              // تاريخ انتهاء صلاحية العرض
  
  // Attachments
  attachments: QuoteAttachment[];
  
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### 7.4 Coordination Entity

بعد اختيار العرض والدفع، تبدأ مرحلة التنسيق:

```typescript
interface CoordinationItem {
  id: string;
  medicalCaseId: string;
  type: CoordinationType;        // APPOINTMENT | HOUSING | RECEPTION | TRANSLATION | TRANSPORT | OTHER
  
  status: CoordinationStatus;    // PENDING | CONFIRMED | CANCELLED | COMPLETED
  
  // Details (flexible JSON)
  details: {
    date?: Date;
    time?: string;
    location?: string;
    providerName?: string;
    contactInfo?: string;
    confirmationNumber?: string;
    notes?: string;
    [key: string]: any;
  };
  
  // Cost (if applicable)
  cost: number | null;
  includedInQuote: boolean;
  
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### 7.5 Medical Service — Complete Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    MEDICAL SERVICE FLOW                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CLIENT                    PLATFORM                    OPERATIONS        │
│  ──────                    ────────                    ──────────        │
│                                                                          │
│  1. Browse Medical      →  Show service info                             │
│     Service                + cost calculator                             │
│                                                                          │
│  2. Start New Request   →  Dynamic Form:                                │
│     Fill medical info      - Patient info                                │
│     Upload reports         - Diagnosis description                       │
│     Describe case          - Treatment type                              │
│                            - Country preference                          │
│                            - Upload medical reports                      │
│                                                                          │
│  3. Pay Initial         →  Payment Gateway          →  Notify team      │
│     Deposit                Process payment              "New case        │
│                            Create Order                  received"       │
│                            Status: DEPOSIT_PAID                          │
│                                                                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│                                                                          │
│                                                     4. Review case      │
│                                                        Check documents  │
│                                                        Assign to agent  │
│                                                                          │
│                                                     5. If docs          │
│                            Notify client ←             incomplete:       │
│  6. Upload missing      ←  "Documents needed"          Request more     │
│     documents                                                            │
│                                                                          │
│                                                     7. Send case to     │
│                                                        medical centers  │
│                                                        (3-5 centers)    │
│                            Status: SENT_TO_PROVIDERS                     │
│                                                                          │
│                            ⏳ Wait for quotes (SLA: 3-5 business days)  │
│                                                                          │
│                                                     8. Quotes arrive    │
│                                                        (from providers  │
│                                                         or entered      │
│                                                         manually)       │
│                                                                          │
│                                                     9. Review quotes    │
│                                                        Add margin       │
│                                                        Approve/Reject   │
│                            Status: QUOTES_READY                          │
│                                                                          │
│  10. View approved      ←  Notify client                                │
│      quotes                "Quotes ready for review"                     │
│      Compare them                                                        │
│      Ask questions          Messages ←→                Messages         │
│                                                                          │
│  11. Select quote       →  Mark quote selected                          │
│                            Calculate remaining                           │
│                            Status: QUOTE_SELECTED                        │
│                                                                          │
│  12. Pay remaining      →  Payment Gateway          →  Notify team      │
│      amount                Process payment              "Payment         │
│                            Status: FULLY_PAID            received"       │
│                                                                          │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│                                                                          │
│                                                     13. Start           │
│                                                         coordination    │
│                            Status: COORDINATING                          │
│                                                                          │
│                                                     14. Book:           │
│                                                        - Appointment    │
│                                                        - Housing        │
│                                                        - Reception      │
│                                                        - Translation    │
│                                                        - Transport      │
│                                                                          │
│  15. View coordination  ←  Notify each confirmation                     │
│      details               Status updates per item                       │
│      Confirmations                                                       │
│                                                                          │
│                            Status: READY_FOR_TRAVEL                      │
│                                                                          │
│  16. Travel & receive   →                           →  Monitor &        │
│      treatment                                         follow up        │
│                            Status: IN_TREATMENT                          │
│                                                                          │
│  17.                    →  Status: TREATMENT_COMPLETE                    │
│                                                                          │
│  18. Rate experience    →  Save feedback            →  Internal review  │
│      (optional)            Status: CLOSED                                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 7.6 Medical Addons

```typescript
const MEDICAL_ADDONS = [
  { code: 'MED_VIP_RECEPTION',    name: 'استقبال VIP في المطار',     price: 500 },
  { code: 'MED_TRANSLATION',      name: 'مترجم طبي مرافق',          price: 300 },  // per day
  { code: 'MED_HOTEL_UPGRADE',    name: 'ترقية السكن',               price: null },  // variable
  { code: 'MED_COMPANION',        name: 'تنسيق سفر المرافق',        price: 200 },
  { code: 'MED_POST_TREATMENT',   name: 'متابعة ما بعد العلاج',     price: 150 },
  { code: 'MED_INSURANCE',        name: 'تأمين سفر طبي',            price: null },  // variable
  { code: 'MED_SECOND_OPINION',   name: 'رأي طبي ثانٍ',             price: 400 },
];
```

---

## 8. Service Module: Education & Institutes

### 8.1 Overview
خدمة شبه كتالوجية — المعاهد والبرامج معروضة مسبقًا، والعميل يختار ثم تبدأ عملية التسجيل والتنسيق.

### 8.2 Institute & Program Entities

```typescript
interface Institute {
  id: string;
  providerId: string;            // FK → Provider
  
  // Basic Info
  name: LocalizedString;         // { ar: '...', en: '...' }
  description: LocalizedString;
  logo: string;
  images: string[];
  
  // Location
  country: string;
  city: string;
  address: string | null;
  
  // Features
  housingAvailable: boolean;
  housingDetails: LocalizedString | null;
  facilities: string[];          // e.g., ['wifi', 'library', 'gym', 'cafeteria']
  accreditations: string[];
  
  // Rating
  rating: number | null;         // 1-5, calculated from reviews
  reviewCount: number;
  
  // Status
  status: InstituteStatus;       // ACTIVE | INACTIVE | COMING_SOON
  featured: boolean;             // للعرض في الصفحة الرئيسية
  
  // Relations
  programs: Program[];
  
  createdAt: DateTime;
  updatedAt: DateTime;
}

interface Program {
  id: string;
  instituteId: string;
  
  name: LocalizedString;
  description: LocalizedString;
  
  // Details
  type: ProgramType;             // LANGUAGE | DIPLOMA | CERTIFICATE | SHORT_COURSE
  language: string;              // لغة الدراسة
  durationWeeks: number;
  hoursPerWeek: number;
  startDates: Date[];            // تواريخ البدء المتاحة
  
  // Pricing
  tuitionPrice: number;          // سعر الدراسة (من المعهد)
  registrationFee: number;
  materialsFee: number;
  housingPrice: number | null;   // سعر السكن إن وجد
  totalProviderPrice: number;    // المجموع من المعهد
  companyMargin: number;         // هامش الشركة
  displayPrice: number;          // السعر المعروض للعميل
  currency: string;
  
  // Requirements
  requirements: LocalizedString;
  ageRange: { min: number; max: number } | null;
  levelRequired: string | null;  // e.g., 'beginner', 'intermediate'
  
  status: ProgramStatus;         // ACTIVE | FULL | CLOSED
  
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### 8.3 Education Enrollment Entity

```typescript
interface EducationEnrollment {
  id: string;
  orderId: string;               // FK → BaseOrder
  
  // Selection
  instituteId: string;
  programId: string;
  preferredStartDate: Date;
  
  // Student Info
  studentName: string;
  studentAge: number;
  educationLevel: string;
  
  // Housing
  housingRequested: boolean;
  housingType: HousingType | null;  // SHARED | PRIVATE | FAMILY
  
  // Enrollment Progress
  enrollmentStatus: EnrollmentStatus;
  acceptanceLetterUrl: string | null;
  enrollmentConfirmationUrl: string | null;
  
  // Coordination
  coordinationItems: CoordinationItem[];  // Same entity as medical
}
```

### 8.4 Education Service — Complete Flow

```
CLIENT                          PLATFORM                      OPERATIONS
──────                          ────────                      ──────────

1. Browse Institutes       →    Show catalog with filters:
   Filter & Compare             - Country / City
                                - Price range
                                - Duration
                                - Housing included
                                - Program type
                                - Start dates

2. Select Program          →    Show program details
   View details                 + price breakdown
                                + requirements checklist

3. Pay (full or deposit)   →    Payment Gateway            →  Notify team
                                Create Order
                                Status: PAID

4. Upload required         →    Document checklist          →  Review documents
   documents                    Track completion %
                                Status: DOCS_UNDER_REVIEW

                                                            5. If docs OK:
                                                               Start enrollment
                                                               Contact institute
                                Status: ENROLLMENT_IN_PROGRESS

                                                            6. Institute confirms
                                                               Upload acceptance
                                Status: ENROLLED

7. View acceptance         ←    Notify client
   Pay remaining (if any)  →    Process payment
                                Status: FULLY_PAID

                                                            8. Coordinate:
                                                               - Housing
                                                               - Airport pickup
                                                               - Orientation
                                Status: COORDINATION_COMPLETE

9. Receive final package   ←    Send booking confirmations
   (confirmations, guides)      Status: READY
                                
10. Rate experience        →    Status: COMPLETED
```

### 8.5 Education Comparison Features

العميل يجب أن يستطيع مقارنة المعاهد والبرامج بسهولة:

```
Comparison Table:
┌─────────────────┬────────────────┬────────────────┬────────────────┐
│                 │ معهد A          │ معهد B          │ معهد C          │
├─────────────────┼────────────────┼────────────────┼────────────────┤
│ المدينة          │ لندن            │ دبلن            │ مالطا           │
│ السعر الشهري      │ 3,500 ر.س       │ 2,800 ر.س       │ 2,200 ر.س       │
│ مدة البرنامج      │ 12 أسبوع         │ 12 أسبوع         │ 16 أسبوع         │
│ ساعات / أسبوع     │ 25              │ 20              │ 20              │
│ السكن مشمول       │ ✅              │ ❌ (+1,500)      │ ✅              │
│ التقييم           │ ⭐ 4.5          │ ⭐ 4.2          │ ⭐ 4.0          │
│ اعتماد            │ British Council │ ACELS           │ FELTOM          │
│ الإجمالي          │ 42,000 ر.س      │ 38,000 ر.س      │ 35,200 ر.س      │
└─────────────────┴────────────────┴────────────────┴────────────────┘
                    [اختيار]          [اختيار]          [اختيار]
```

---

## 9. Service Module: Visa Services

### 9.1 Overview
أبسط الخدمات الثلاث. تدفق خطي بدون عروض أسعار أو مفاوضات.

### 9.2 Visa Application Entity

```typescript
interface VisaApplication {
  id: string;
  orderId: string;               // FK → BaseOrder
  
  // Visa Details
  destinationCountry: string;
  visaType: VisaType;            // TOURIST | BUSINESS | STUDENT | WORK | TRANSIT | OTHER
  
  // Applicant Info
  applicantName: string;
  passportNumber: string;
  passportExpiryDate: Date;
  nationality: string;
  
  // Travel Details
  travelDate: Date | null;
  returnDate: Date | null;
  purpose: string | null;
  
  // Processing
  processingType: ProcessingType;  // STANDARD | EXPRESS
  applicationReference: string | null;  // Reference from embassy/agency
  
  // Result
  result: VisaResult | null;     // APPROVED | REJECTED | PENDING
  resultDate: Date | null;
  resultNotes: string | null;
  visaNumber: string | null;
  visaExpiryDate: Date | null;
}
```

### 9.3 Visa Catalog Entity

```typescript
interface VisaService {
  id: string;
  country: string;
  countryCode: string;
  countryFlag: string;           // emoji or URL
  
  visaTypes: VisaTypeConfig[];
  
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: DateTime;
  updatedAt: DateTime;
}

interface VisaTypeConfig {
  id: string;
  visaServiceId: string;
  
  type: VisaType;
  name: LocalizedString;
  description: LocalizedString;
  
  // Pricing
  basePrice: number;             // السعر الأساسي (يشمل هامش الشركة)
  expressPrice: number | null;   // السعر العاجل
  currency: string;
  
  // Processing
  standardDays: string;          // e.g., "5-7 أيام عمل"
  expressDays: string | null;    // e.g., "2-3 أيام عمل"
  
  // Requirements
  requirements: VisaRequirement[];
  
  // Available Addons
  availableAddons: string[];     // addon codes
}

interface VisaRequirement {
  id: string;
  name: LocalizedString;         // e.g., "صورة شخصية بخلفية بيضاء"
  description: LocalizedString;
  documentType: string;          // PASSPORT_COPY | PHOTO | BANK_STATEMENT | etc.
  required: boolean;
  format: string | null;         // e.g., "PDF or JPG, max 5MB"
}
```

### 9.4 Visa Service — Complete Flow

```
CLIENT                          PLATFORM                      OPERATIONS
──────                          ────────                      ──────────

1. Select Country          →    Show available visa types
                                + requirements
                                + pricing
                                + processing time

2. Select Visa Type        →    Show requirements checklist
   Choose Standard/Express      Show price breakdown

3. Pay                     →    Payment Gateway            →  Notify team
                                Create Order
                                Status: PAID

4. Upload required docs    →    Document checklist
                                Validate completeness
                                Status: DOCS_SUBMITTED

                                                            5. Review docs
                                                               If incomplete:
                                Notify client ←                Request fixes
                                Status: DOCS_INCOMPLETE

6. Fix & re-upload         →    Status: DOCS_RESUBMITTED

                                                            7. Docs approved
                                                               Start processing
                                Status: IN_PROGRESS

                                                            8. Submit to
                                                               embassy/agency
                                Status: SUBMITTED_TO_AUTHORITY

                                ⏳ Processing period

                                                            9. Result received
                                                               Upload visa copy
                                Status: RESULT_READY

10. View result            ←    Notify client
    Download visa copy          "Your visa result is ready"
                                Status: DELIVERED

11. Rate (optional)        →    Status: COMPLETED
```

### 9.5 Visa Addons

```typescript
const VISA_ADDONS = [
  { code: 'VIS_EXPRESS',         name: 'معالجة عاجلة',             price: null },  // varies by country
  { code: 'VIS_DOC_REVIEW',      name: 'تدقيق المستندات مسبقًا',     price: 100 },
  { code: 'VIS_TRANSLATION',     name: 'ترجمة معتمدة',              price: 150 },  // per document
  { code: 'VIS_APPOINTMENT',     name: 'حجز موعد السفارة',          price: 75 },
  { code: 'VIS_INSURANCE',       name: 'تأمين سفر',                price: null },  // varies
  { code: 'VIS_PHOTO',           name: 'تصوير بيومتري',             price: 50 },
];
```

---

## 10. Database Schema

### 10.1 Entity Relationship Diagram (Simplified)

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   User       │       │    Order          │       │   Provider   │
│──────────────│       │──────────────────│       │──────────────│
│ id           │───┐   │ id               │       │ id           │
│ type         │   │   │ orderNumber      │       │ type         │
│ email        │   ├──▶│ clientId         │       │ name         │
│ phone        │   │   │ assignedTo       │──┐    │ country      │
│ role         │   │   │ serviceType      │  │    │ status       │
│ ...          │   │   │ status           │  │    │ ...          │
└──────────────┘   │   │ priority         │  │    └──────┬───────┘
                   │   │ finalPrice       │  │           │
                   │   │ ...              │  │    ┌──────┴───────┐
                   │   └──────┬───────────┘  │    │  Institute   │
                   │          │              │    │──────────────│
                   │    ┌─────┼──────┐       │    │ id           │
                   │    │     │      │       │    │ providerId   │
                   │    ▼     ▼      ▼       │    │ name         │
              ┌────────┐ ┌──────┐ ┌──────┐   │    │ city         │
              │Payment │ │Doc   │ │Msg   │   │    │ ...          │
              │────────│ │──────│ │──────│   │    └──────┬───────┘
              │id      │ │id    │ │id    │   │           │
              │orderId │ │ordId │ │ordId │   │    ┌──────┴───────┐
              │amount  │ │type  │ │sendId│   │    │   Program    │
              │status  │ │url   │ │body  │   │    │──────────────│
              │...     │ │status│ │...   │   │    │ id           │
              └────────┘ └──────┘ └──────┘   │    │ instituteId  │
                                             │    │ price        │
              ┌──────────────────────────┐   │    │ duration     │
              │     MedicalCase          │   │    │ ...          │
              │──────────────────────────│   │    └──────────────┘
              │ id                       │   │
              │ orderId ─────────────────│───┘
              │ patientName              │
              │ diagnosisSummary         │        ┌──────────────┐
              │ treatmentType            │        │ MedicalQuote │
              │ selectedQuoteId          │───────▶│──────────────│
              │ ...                      │        │ id           │
              └──────────────────────────┘        │ caseId       │
                                                  │ providerId   │
              ┌──────────────────────────┐        │ providerPrice│
              │  EducationEnrollment     │        │ finalPrice   │
              │──────────────────────────│        │ status       │
              │ id                       │        │ treatmentPlan│
              │ orderId                  │        │ ...          │
              │ instituteId              │        └──────────────┘
              │ programId                │
              │ enrollmentStatus         │        ┌──────────────┐
              │ ...                      │        │ VisaApplicatn│
              └──────────────────────────┘        │──────────────│
                                                  │ id           │
              ┌──────────────────────────┐        │ orderId      │
              │   CoordinationItem       │        │ country      │
              │──────────────────────────│        │ visaType     │
              │ id                       │        │ result       │
              │ orderId                  │        │ ...          │
              │ type (APPT/HOUSING/...)  │        └──────────────┘
              │ status                   │
              │ details (JSONB)          │
              │ ...                      │
              └──────────────────────────┘
```

### 10.2 Complete Schema (Prisma Format)

```prisma
// ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

enum UserType {
  CLIENT
  STAFF
  PROVIDER
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

enum Role {
  SUPER_ADMIN
  ADMIN
  OPERATIONS_LEAD
  OPERATIONS_AGENT
  FINANCE_MANAGER
  CONTENT_MANAGER
  PROVIDER_ADMIN
  PROVIDER_AGENT
}

enum ServiceType {
  MEDICAL
  EDUCATION
  VISA
}

enum OrderSource {
  PLATFORM
  PHONE
  WALKIN
  REFERRAL
}

enum Priority {
  LOW
  NORMAL
  HIGH
  URGENT
}

enum Gender {
  MALE
  FEMALE
}

enum PaymentType {
  DEPOSIT
  FINAL
  FULL
  ADDON
  REFUND
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum PaymentMethod {
  CREDIT_CARD
  MADA
  BANK_TRANSFER
  APPLE_PAY
  STC_PAY
}

enum DocumentStatus {
  PENDING_REVIEW
  APPROVED
  REJECTED
  REUPLOAD_REQUESTED
}

enum QuoteStatus {
  RECEIVED
  UNDER_REVIEW
  APPROVED
  REJECTED
  SELECTED
  EXPIRED
}

enum CoordinationType {
  APPOINTMENT
  HOUSING
  RECEPTION
  TRANSLATION
  TRANSPORT
  OTHER
}

enum CoordinationStatus {
  PENDING
  IN_PROGRESS
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum NotificationType {
  EMAIL
  SMS
  WHATSAPP
  PUSH
  IN_APP
}

enum NotificationStatus {
  PENDING
  SENT
  DELIVERED
  FAILED
}

enum VisaResult {
  APPROVED
  REJECTED
  PENDING
}

enum ProviderType {
  MEDICAL_CENTER
  INSTITUTE
  VISA_AGENCY
  HOUSING_PROVIDER
  TRANSLATION_SERVICE
  TRANSPORT_SERVICE
  OTHER
}

// ─────────────────────────────────────────
// CORE MODELS
// ─────────────────────────────────────────

model User {
  id                String      @id @default(uuid())
  type              UserType
  email             String      @unique
  phone             String      @unique
  passwordHash      String?
  phoneVerified     Boolean     @default(false)
  emailVerified     Boolean     @default(false)
  twoFactorEnabled  Boolean     @default(false)
  twoFactorSecret   String?
  
  firstName         String
  lastName          String
  nationality       String?
  dateOfBirth       DateTime?
  gender            Gender?
  preferredLanguage String      @default("ar")
  avatarUrl         String?
  timezone          String      @default("Asia/Riyadh")
  
  role              Role?
  department        String?
  
  providerId        String?
  provider          Provider?   @relation(fields: [providerId], references: [id])
  
  status            UserStatus  @default(ACTIVE)
  lastLoginAt       DateTime?
  
  // Relations
  clientOrders      Order[]     @relation("ClientOrders")
  assignedOrders    Order[]     @relation("AssignedOrders")
  sentMessages      Message[]   @relation("SentMessages")
  uploadedDocs      Document[]  @relation("UploadedDocs")
  reviewedDocs      Document[]  @relation("ReviewedDocs")
  auditLogs         AuditLog[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  deletedAt         DateTime?

  @@index([type])
  @@index([role])
  @@index([status])
  @@index([email])
  @@index([phone])
}

model Order {
  id                String      @id @default(uuid())
  orderNumber       String      @unique
  serviceType       ServiceType
  
  clientId          String
  client            User        @relation("ClientOrders", fields: [clientId], references: [id])
  
  assignedTo        String?
  assignee          User?       @relation("AssignedOrders", fields: [assignedTo], references: [id])
  
  status            String      // Flexible string — validated by service module
  priority          Priority    @default(NORMAL)
  
  // Financial
  estimatedPrice    Decimal?    @db.Decimal(12, 2)
  finalPrice        Decimal?    @db.Decimal(12, 2)
  companyMargin     Decimal?    @db.Decimal(12, 2)
  totalPaid         Decimal     @default(0) @db.Decimal(12, 2)
  currency          String      @default("SAR")
  
  // Metadata
  source            OrderSource @default(PLATFORM)
  internalNotes     String?     @db.Text
  clientNotes       String?     @db.Text
  tags              String[]
  
  // Timestamps
  submittedAt       DateTime?
  completedAt       DateTime?
  cancelledAt       DateTime?
  cancelReason      String?
  
  // Relations
  statusHistory     OrderStatusChange[]
  payments          Payment[]
  documents         Document[]
  messages          Message[]
  addons            OrderAddon[]
  coordinationItems CoordinationItem[]
  
  // Service-specific (one-to-one)
  medicalCase       MedicalCase?
  educationEnroll   EducationEnrollment?
  visaApplication   VisaApplication?
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  deletedAt         DateTime?

  @@index([serviceType])
  @@index([clientId])
  @@index([assignedTo])
  @@index([status])
  @@index([priority])
  @@index([createdAt])
  @@index([orderNumber])
}

model OrderStatusChange {
  id          String   @id @default(uuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  
  fromStatus  String
  toStatus    String
  changedBy   String   // User ID
  reason      String?
  metadata    Json?    // Additional context
  
  createdAt   DateTime @default(now())

  @@index([orderId])
  @@index([createdAt])
}

model Payment {
  id              String        @id @default(uuid())
  orderId         String
  order           Order         @relation(fields: [orderId], references: [id])
  
  type            PaymentType
  amount          Decimal       @db.Decimal(12, 2)
  currency        String        @default("SAR")
  method          PaymentMethod?
  
  status          PaymentStatus @default(PENDING)
  
  // Gateway
  gatewayRef      String?       // Reference from payment gateway
  gatewayResponse Json?         // Full response from gateway
  
  // Refund
  refundAmount    Decimal?      @db.Decimal(12, 2)
  refundReason    String?
  refundedAt      DateTime?
  refundedBy      String?       // User ID (staff)
  
  // Metadata
  description     String?
  invoiceUrl      String?
  receiptUrl      String?
  
  paidAt          DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([orderId])
  @@index([status])
  @@index([type])
}

model Document {
  id              String         @id @default(uuid())
  orderId         String
  order           Order          @relation(fields: [orderId], references: [id])
  
  // Document Info
  type            String         // MEDICAL_REPORT | PASSPORT | PHOTO | etc.
  category        String         // REQUIRED | OPTIONAL | RESULT
  name            String
  description     String?
  
  // File
  fileUrl         String
  fileName        String
  fileSize        Int            // bytes
  mimeType        String
  
  // Review
  status          DocumentStatus @default(PENDING_REVIEW)
  reviewedBy      String?
  reviewer        User?          @relation("ReviewedDocs", fields: [reviewedBy], references: [id])
  reviewedAt      DateTime?
  rejectionReason String?
  
  // Upload
  uploadedBy      String
  uploader        User           @relation("UploadedDocs", fields: [uploadedBy], references: [id])
  
  // Version tracking
  version         Int            @default(1)
  previousVersion String?        // FK → Document (self-reference for re-uploads)
  
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  deletedAt       DateTime?

  @@index([orderId])
  @@index([type])
  @@index([status])
}

model Message {
  id          String   @id @default(uuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  
  senderId    String
  sender      User     @relation("SentMessages", fields: [senderId], references: [id])
  
  body        String   @db.Text
  
  // Attachments
  attachments Json?    // [{ name, url, size, type }]
  
  // Read tracking
  readAt      DateTime?
  readBy      String[] // User IDs who read this message
  
  // Metadata
  isInternal  Boolean  @default(false)  // Internal staff note (not visible to client)
  isSystem    Boolean  @default(false)  // System-generated message
  
  createdAt   DateTime @default(now())

  @@index([orderId])
  @@index([senderId])
  @@index([createdAt])
}

model OrderAddon {
  id          String   @id @default(uuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  
  addonCode   String
  name        String
  price       Decimal  @db.Decimal(12, 2)
  quantity    Int      @default(1)
  
  // Payment link
  paymentId   String?
  paid        Boolean  @default(false)
  
  notes       String?
  
  createdAt   DateTime @default(now())

  @@index([orderId])
}

// ─────────────────────────────────────────
// MEDICAL SERVICE MODELS
// ─────────────────────────────────────────

model MedicalCase {
  id                  String      @id @default(uuid())
  orderId             String      @unique
  order               Order       @relation(fields: [orderId], references: [id])
  
  // Patient
  patientName         String
  patientAge          Int
  patientGender       Gender
  relationship        String      // SELF | SPOUSE | CHILD | PARENT | OTHER
  
  // Case
  diagnosisSummary    String      @db.Text
  treatmentType       String      // SURGERY | CONSULTATION | THERAPY | CHECKUP | OTHER
  preferredCountry    String?
  preferredCity       String?
  urgencyLevel        String      @default("ROUTINE")  // ROUTINE | SOON | URGENT
  budgetMin           Decimal?    @db.Decimal(12, 2)
  budgetMax           Decimal?    @db.Decimal(12, 2)
  specialRequirements String?     @db.Text
  
  // After selection
  selectedQuoteId     String?
  treatmentStartDate  DateTime?
  treatmentEndDate    DateTime?
  
  // Relations
  quotes              MedicalQuote[]
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt

  @@index([treatmentType])
}

model MedicalQuote {
  id                  String      @id @default(uuid())
  medicalCaseId       String
  medicalCase         MedicalCase @relation(fields: [medicalCaseId], references: [id])
  
  providerId          String
  provider            Provider    @relation(fields: [providerId], references: [id])
  
  // Pricing
  providerPrice       Decimal     @db.Decimal(12, 2)
  companyMargin       Decimal     @db.Decimal(12, 2)
  finalPrice          Decimal     @db.Decimal(12, 2)
  currency            String      @default("SAR")
  
  // Treatment
  treatmentPlan       String      @db.Text
  estimatedDuration   String
  hospitalStayDays    Int?
  includedServices    String[]
  excludedServices    String[]
  
  // Status
  status              QuoteStatus @default(RECEIVED)
  internalNote        String?     @db.Text
  rejectionReason     String?
  
  // Review
  reviewedBy          String?
  reviewedAt          DateTime?
  approvedBy          String?
  approvedAt          DateTime?
  
  // Validity
  validUntil          DateTime
  
  // Attachments
  attachments         Json?       // [{ name, url }]
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt

  @@index([medicalCaseId])
  @@index([providerId])
  @@index([status])
}

// ─────────────────────────────────────────
// EDUCATION SERVICE MODELS
// ─────────────────────────────────────────

model Institute {
  id                String      @id @default(uuid())
  providerId        String
  provider          Provider    @relation(fields: [providerId], references: [id])
  
  nameAr            String
  nameEn            String
  descriptionAr     String?     @db.Text
  descriptionEn     String?     @db.Text
  logo              String?
  images            String[]
  
  country           String
  city              String
  address           String?
  
  housingAvailable  Boolean     @default(false)
  housingDetailsAr  String?
  housingDetailsEn  String?
  facilities        String[]
  accreditations    String[]
  
  rating            Decimal?    @db.Decimal(2, 1)
  reviewCount       Int         @default(0)
  
  status            String      @default("ACTIVE") // ACTIVE | INACTIVE | COMING_SOON
  featured          Boolean     @default(false)
  sortOrder         Int         @default(0)
  
  programs          Program[]
  enrollments       EducationEnrollment[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  deletedAt         DateTime?

  @@index([country])
  @@index([city])
  @@index([status])
  @@index([featured])
}

model Program {
  id                String      @id @default(uuid())
  instituteId       String
  institute         Institute   @relation(fields: [instituteId], references: [id])
  
  nameAr            String
  nameEn            String
  descriptionAr     String?     @db.Text
  descriptionEn     String?     @db.Text
  
  type              String      // LANGUAGE | DIPLOMA | CERTIFICATE | SHORT_COURSE
  language          String      // Language of instruction
  durationWeeks     Int
  hoursPerWeek      Int
  startDates        DateTime[]
  
  // Pricing
  tuitionPrice      Decimal     @db.Decimal(12, 2)
  registrationFee   Decimal     @default(0) @db.Decimal(12, 2)
  materialsFee      Decimal     @default(0) @db.Decimal(12, 2)
  housingPrice      Decimal?    @db.Decimal(12, 2)
  totalProviderPrice Decimal    @db.Decimal(12, 2)
  companyMargin     Decimal     @db.Decimal(12, 2)
  displayPrice      Decimal     @db.Decimal(12, 2)
  currency          String      @default("SAR")
  
  // Requirements
  requirementsAr    String?     @db.Text
  requirementsEn    String?     @db.Text
  minAge            Int?
  maxAge            Int?
  levelRequired     String?
  
  status            String      @default("ACTIVE")  // ACTIVE | FULL | CLOSED
  
  enrollments       EducationEnrollment[]
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  deletedAt         DateTime?

  @@index([instituteId])
  @@index([type])
  @@index([status])
}

model EducationEnrollment {
  id                    String      @id @default(uuid())
  orderId               String      @unique
  order                 Order       @relation(fields: [orderId], references: [id])
  
  instituteId           String
  institute             Institute   @relation(fields: [instituteId], references: [id])
  programId             String
  program               Program     @relation(fields: [programId], references: [id])
  
  preferredStartDate    DateTime
  
  studentName           String
  studentAge            Int?
  educationLevel        String?
  
  housingRequested      Boolean     @default(false)
  housingType           String?     // SHARED | PRIVATE | FAMILY
  
  enrollmentStatus      String      @default("PENDING")
  acceptanceLetterUrl   String?
  confirmationUrl       String?
  
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt

  @@index([instituteId])
  @@index([programId])
}

// ─────────────────────────────────────────
// VISA SERVICE MODELS
// ─────────────────────────────────────────

model VisaService {
  id            String      @id @default(uuid())
  country       String
  countryCode   String      @unique
  countryFlag   String?
  
  status        String      @default("ACTIVE")
  sortOrder     Int         @default(0)
  
  visaTypes     VisaTypeConfig[]
  
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([countryCode])
  @@index([status])
}

model VisaTypeConfig {
  id              String      @id @default(uuid())
  visaServiceId   String
  visaService     VisaService @relation(fields: [visaServiceId], references: [id])
  
  type            String      // TOURIST | BUSINESS | STUDENT | WORK | TRANSIT
  nameAr          String
  nameEn          String
  descriptionAr   String?     @db.Text
  descriptionEn   String?     @db.Text
  
  basePrice       Decimal     @db.Decimal(12, 2)
  expressPrice    Decimal?    @db.Decimal(12, 2)
  currency        String      @default("SAR")
  
  standardDays    String
  expressDays     String?
  
  requirements    Json        // Array of requirement objects
  
  status          String      @default("ACTIVE")
  
  applications    VisaApplication[]
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([visaServiceId])
  @@index([type])
}

model VisaApplication {
  id                  String      @id @default(uuid())
  orderId             String      @unique
  order               Order       @relation(fields: [orderId], references: [id])
  
  visaTypeConfigId    String
  visaTypeConfig      VisaTypeConfig @relation(fields: [visaTypeConfigId], references: [id])
  
  applicantName       String
  passportNumber      String
  passportExpiry      DateTime
  nationality         String
  
  travelDate          DateTime?
  returnDate          DateTime?
  purpose             String?
  
  processingType      String      @default("STANDARD")  // STANDARD | EXPRESS
  applicationRef      String?
  
  result              VisaResult?
  resultDate          DateTime?
  resultNotes         String?
  visaNumber          String?
  visaExpiry          DateTime?
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt

  @@index([visaTypeConfigId])
  @@index([result])
}

// ─────────────────────────────────────────
// SHARED MODELS
// ─────────────────────────────────────────

model Provider {
  id            String        @id @default(uuid())
  type          ProviderType
  
  nameAr        String
  nameEn        String
  
  country       String
  city          String?
  address       String?
  
  contactName   String?
  contactEmail  String?
  contactPhone  String?
  website       String?
  
  // Contract
  contractStart DateTime?
  contractEnd   DateTime?
  commissionRate Decimal?     @db.Decimal(5, 2)  // Percentage
  
  status        String        @default("ACTIVE")
  notes         String?       @db.Text
  
  // Relations
  users         User[]
  quotes        MedicalQuote[]
  institutes    Institute[]
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  deletedAt     DateTime?

  @@index([type])
  @@index([status])
  @@index([country])
}

model CoordinationItem {
  id          String              @id @default(uuid())
  orderId     String
  order       Order               @relation(fields: [orderId], references: [id])
  
  type        CoordinationType
  status      CoordinationStatus  @default(PENDING)
  
  details     Json                // Flexible details per type
  
  scheduledAt DateTime?
  confirmedAt DateTime?
  
  cost        Decimal?            @db.Decimal(12, 2)
  includedInOrder Boolean         @default(true)
  
  assignedTo  String?             // Staff user ID
  providerRef String?             // External reference
  
  notes       String?
  
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  @@index([orderId])
  @@index([type])
  @@index([status])
}

model Notification {
  id          String             @id @default(uuid())
  userId      String
  
  type        NotificationType
  status      NotificationStatus @default(PENDING)
  
  title       String
  body        String             @db.Text
  
  // Delivery
  channel     String             // email | sms | whatsapp | push
  recipient   String             // email address | phone number
  
  // Reference
  orderId     String?
  actionUrl   String?
  
  // Tracking
  sentAt      DateTime?
  deliveredAt DateTime?
  readAt      DateTime?
  failReason  String?
  
  metadata    Json?
  
  createdAt   DateTime           @default(now())

  @@index([userId])
  @@index([orderId])
  @@index([status])
  @@index([createdAt])
}

model AuditLog {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  action      String   // e.g., "order.status_changed", "document.approved", "payment.refunded"
  entityType  String   // e.g., "Order", "Document", "Payment"
  entityId    String
  
  oldValue    Json?
  newValue    Json?
  
  ipAddress   String?
  userAgent   String?
  
  createdAt   DateTime @default(now())

  @@index([userId])
  @@index([entityType, entityId])
  @@index([action])
  @@index([createdAt])
}

model Setting {
  id          String   @id @default(uuid())
  key         String   @unique
  value       Json
  description String?
  group       String?  // e.g., "payment", "notification", "general"
  
  updatedBy   String?
  updatedAt   DateTime @updatedAt
  createdAt   DateTime @default(now())

  @@index([group])
}
```

---

## 11. Order State Machines

### 11.1 Medical Order States

```
                                ┌─────────────┐
                                │   DRAFT     │ العميل بدأ ولم يرسل بعد
                                └──────┬──────┘
                                       │ Client submits + pays deposit
                                       ▼
                                ┌─────────────┐
                          ┌─────│DEPOSIT_PAID │ تم دفع الدفعة الأولى
                          │     └──────┬──────┘
                          │            │ Staff reviews
                          │            ▼
                          │     ┌─────────────────┐
                          │     │ CASE_UNDER_     │ الفريق يراجع الحالة
                          │     │ REVIEW          │
                          │     └──────┬──────────┘
                          │            │
                          │     ┌──────┴──────────┐
                          │     │                 │
                          │     ▼                 ▼
                          │ ┌──────────┐  ┌─────────────────┐
                          │ │DOCS_     │  │SENT_TO_         │
                          │ │INCOMPLETE│  │PROVIDERS        │
                          │ └────┬─────┘  └──────┬──────────┘
                          │      │ Client        │ Providers respond
                          │      │ re-uploads    │
                          │      └───────┐       ▼
                          │              │ ┌─────────────────┐
                          │              └▶│QUOTES_RECEIVED  │ العروض وصلت
                          │                └──────┬──────────┘
                          │                       │ Staff reviews & approves
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │QUOTES_READY     │ العروض جاهزة للعميل
                          │                └──────┬──────────┘
                          │                       │ Client selects
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │QUOTE_SELECTED   │ العميل اختار
                          │                └──────┬──────────┘
                          │                       │ Client pays remaining
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │FULLY_PAID       │ تم الدفع الكامل
                          │                └──────┬──────────┘
                          │                       │ Staff starts coordination
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │COORDINATING     │ جارٍ التنسيق
                          │                └──────┬──────────┘
                          │                       │ All items confirmed
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │READY_FOR_TRAVEL │ جاهز للسفر
                          │                └──────┬──────────┘
                          │                       │ Patient travels
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │IN_TREATMENT     │ قيد العلاج
                          │                └──────┬──────────┘
                          │                       │ Treatment done
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │COMPLETED        │ مكتمل
                          │                └──────┬──────────┘
                          │                       │ Feedback + close
                          │                       ▼
                          │                ┌─────────────────┐
                          │                │CLOSED           │ مغلق
                          │                └─────────────────┘
                          │
                          │  (Can happen from most states)
                          └──────────────────────┐
                                                 ▼
                                          ┌─────────────┐
                                          │ CANCELLED   │
                                          └─────────────┘
```

### 11.2 Medical Order Status Config

```typescript
const MEDICAL_STATUSES = {
  DRAFT: {
    label: { ar: 'مسودة', en: 'Draft' },
    color: '#94A3B8',
    allowedTransitions: ['DEPOSIT_PAID', 'CANCELLED'],
    visibleToClient: true,
    requiresPayment: false,
    progressPercent: 0,
  },
  DEPOSIT_PAID: {
    label: { ar: 'تم دفع العربون', en: 'Deposit Paid' },
    color: '#3B82F6',
    allowedTransitions: ['CASE_UNDER_REVIEW', 'CANCELLED'],
    visibleToClient: true,
    requiresPayment: false,
    progressPercent: 10,
  },
  CASE_UNDER_REVIEW: {
    label: { ar: 'قيد المراجعة', en: 'Under Review' },
    color: '#F59E0B',
    allowedTransitions: ['DOCS_INCOMPLETE', 'SENT_TO_PROVIDERS', 'CANCELLED'],
    visibleToClient: true,
    requiresPayment: false,
    progressPercent: 15,
  },
  DOCS_INCOMPLETE: {
    label: { ar: 'مستندات ناقصة', en: 'Documents Incomplete' },
    color: '#EF4444',
    allowedTransitions: ['CASE_UNDER_REVIEW', 'CANCELLED'],
    visibleToClient: true,
    requiresPayment: false,
    progressPercent: 15,
  },
  SENT_TO_PROVIDERS: {
    label: { ar: 'أُرسلت للمراكز', en: 'Sent to Centers' },
    color: '#8B5CF6',
    allowedTransitions: ['QUOTES_RECEIVED', 'CANCELLED'],
    visibleToClient: true,
    progressPercent: 25,
  },
  QUOTES_RECEIVED: {
    label: { ar: 'تم استلام العروض', en: 'Quotes Received' },
    color: '#8B5CF6',
    allowedTransitions: ['QUOTES_READY', 'SENT_TO_PROVIDERS'],
    visibleToClient: false,  // لا يراها العميل حتى تُعتمد
    progressPercent: 35,
  },
  QUOTES_READY: {
    label: { ar: 'العروض جاهزة', en: 'Quotes Ready' },
    color: '#10B981',
    allowedTransitions: ['QUOTE_SELECTED'],
    visibleToClient: true,
    progressPercent: 45,
  },
  QUOTE_SELECTED: {
    label: { ar: 'تم الاختيار', en: 'Quote Selected' },
    color: '#10B981',
    allowedTransitions: ['FULLY_PAID', 'CANCELLED'],
    visibleToClient: true,
    requiresPayment: true,
    progressPercent: 55,
  },
  FULLY_PAID: {
    label: { ar: 'تم الدفع', en: 'Fully Paid' },
    color: '#10B981',
    allowedTransitions: ['COORDINATING'],
    visibleToClient: true,
    progressPercent: 60,
  },
  COORDINATING: {
    label: { ar: 'جارٍ التنسيق', en: 'Coordinating' },
    color: '#6366F1',
    allowedTransitions: ['READY_FOR_TRAVEL'],
    visibleToClient: true,
    progressPercent: 70,
  },
  READY_FOR_TRAVEL: {
    label: { ar: 'جاهز للسفر', en: 'Ready for Travel' },
    color: '#06B6D4',
    allowedTransitions: ['IN_TREATMENT'],
    visibleToClient: true,
    progressPercent: 80,
  },
  IN_TREATMENT: {
    label: { ar: 'قيد العلاج', en: 'In Treatment' },
    color: '#F97316',
    allowedTransitions: ['COMPLETED'],
    visibleToClient: true,
    progressPercent: 90,
  },
  COMPLETED: {
    label: { ar: 'مكتمل', en: 'Completed' },
    color: '#22C55E',
    allowedTransitions: ['CLOSED'],
    visibleToClient: true,
    progressPercent: 100,
  },
  CLOSED: {
    label: { ar: 'مغلق', en: 'Closed' },
    color: '#6B7280',
    allowedTransitions: [],
    visibleToClient: true,
    progressPercent: 100,
  },
  CANCELLED: {
    label: { ar: 'ملغي', en: 'Cancelled' },
    color: '#EF4444',
    allowedTransitions: [],
    visibleToClient: true,
    progressPercent: 0,
  },
};
```

### 11.3 Education Order States

```
DRAFT → PAID → DOCS_PENDING → DOCS_UNDER_REVIEW → DOCS_APPROVED 
→ ENROLLMENT_IN_PROGRESS → ENROLLED → FINAL_PAYMENT_PENDING 
→ FULLY_PAID → COORDINATING → READY → COMPLETED → CLOSED
                                                 ↗
                              DOCS_INCOMPLETE ───┘ (loop back to DOCS_PENDING)
```

### 11.4 Visa Order States

```
DRAFT → PAID → DOCS_PENDING → DOCS_UNDER_REVIEW → DOCS_APPROVED 
→ IN_PROGRESS → SUBMITTED_TO_AUTHORITY → RESULT_READY 
→ DELIVERED → COMPLETED → CLOSED
                                                  ↗
                              DOCS_INCOMPLETE ────┘ (loop back)
```

---

## 12. Payment System

### 12.1 Payment Patterns per Service

```typescript
const PAYMENT_PATTERNS = {
  MEDICAL: {
    // Step 1: Deposit to start processing
    deposit: {
      type: 'DEPOSIT',
      amount: 'FIXED',          // e.g., 500 SAR (configurable)
      timing: 'BEFORE_PROCESSING',
      refundable: true,          // If cancelled before quotes
      refundPolicy: 'FULL_BEFORE_QUOTES, PARTIAL_AFTER_QUOTES, NONE_AFTER_PAYMENT',
    },
    // Step 2: Remaining after selecting quote
    final: {
      type: 'FINAL',
      amount: 'CALCULATED',      // finalPrice - depositAmount
      timing: 'AFTER_QUOTE_SELECTION',
      refundable: false,         // Subject to provider's cancellation policy
    },
    // Optional: Addons
    addons: {
      type: 'ADDON',
      amount: 'VARIABLE',
      timing: 'ANY_TIME_AFTER_DEPOSIT',
    },
  },
  
  EDUCATION: {
    // Option A: Full payment
    full: {
      type: 'FULL',
      amount: 'FIXED',          // displayPrice from program
      timing: 'BEFORE_PROCESSING',
    },
    // Option B: Deposit + Final
    deposit: {
      type: 'DEPOSIT',
      amount: 'PERCENTAGE',      // e.g., 30%
      timing: 'BEFORE_PROCESSING',
    },
    final: {
      type: 'FINAL',
      amount: 'CALCULATED',
      timing: 'AFTER_ENROLLMENT_CONFIRMED',
    },
  },
  
  VISA: {
    // Full payment upfront (simplest)
    full: {
      type: 'FULL',
      amount: 'FIXED',          // From VisaTypeConfig
      timing: 'BEFORE_PROCESSING',
      refundable: true,          // If application not yet submitted
    },
  },
};
```

### 12.2 Payment Flow

```
Client initiates payment
        │
        ▼
┌─────────────────┐
│ Create Payment   │  status: PENDING
│ record in DB     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redirect to      │  Payment Gateway (Moyasar/HyperPay)
│ Payment Gateway  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│SUCCESS │ │FAILED  │
└───┬────┘ └───┬────┘
    │          │
    ▼          ▼
┌────────────┐ ┌────────────┐
│Update       │ │Update       │
│Payment:     │ │Payment:     │
│COMPLETED    │ │FAILED       │
│Update Order │ │Show error   │
│totalPaid    │ │to client    │
│Trigger      │ └────────────┘
│events       │
└────────────┘
```

### 12.3 Refund Logic

```typescript
interface RefundPolicy {
  serviceType: ServiceType;
  rules: RefundRule[];
}

const REFUND_POLICIES: RefundPolicy[] = [
  {
    serviceType: 'MEDICAL',
    rules: [
      {
        condition: 'BEFORE_QUOTES_SENT',
        refundPercent: 100,
        description: 'استرجاع كامل قبل إرسال الحالة للمراكز',
      },
      {
        condition: 'AFTER_QUOTES_BEFORE_SELECTION',
        refundPercent: 75,
        description: 'استرجاع 75% بعد استلام العروض وقبل الاختيار',
      },
      {
        condition: 'AFTER_SELECTION_BEFORE_COORDINATION',
        refundPercent: 50,
        description: 'استرجاع 50% بعد الاختيار وقبل بدء التنسيق',
      },
      {
        condition: 'AFTER_COORDINATION_STARTED',
        refundPercent: 0,
        description: 'لا استرجاع بعد بدء التنسيق',
      },
    ],
  },
  {
    serviceType: 'VISA',
    rules: [
      {
        condition: 'BEFORE_SUBMISSION_TO_AUTHORITY',
        refundPercent: 100,
        description: 'استرجاع كامل قبل تقديم الطلب للجهة',
      },
      {
        condition: 'AFTER_SUBMISSION',
        refundPercent: 0,
        description: 'لا استرجاع بعد التقديم',
      },
    ],
  },
  {
    serviceType: 'EDUCATION',
    rules: [
      {
        condition: 'BEFORE_ENROLLMENT',
        refundPercent: 100,
        description: 'استرجاع كامل قبل بدء التسجيل',
      },
      {
        condition: 'AFTER_ENROLLMENT_BEFORE_START',
        refundPercent: 50,
        description: 'استرجاع 50% بعد التسجيل وقبل بدء الدراسة',
      },
      {
        condition: 'AFTER_START',
        refundPercent: 0,
        description: 'لا استرجاع بعد بدء الدراسة',
      },
    ],
  },
];
```

### 12.4 Margin Calculation

```typescript
// For Medical (dynamic pricing)
function calculateMedicalPrice(providerPrice: number, marginConfig: MarginConfig): number {
  if (marginConfig.type === 'PERCENTAGE') {
    return providerPrice * (1 + marginConfig.value / 100);
  }
  if (marginConfig.type === 'FIXED') {
    return providerPrice + marginConfig.value;
  }
  // CUSTOM: admin sets final price manually
  return marginConfig.customPrice;
}

// For Education (catalog pricing - pre-calculated)
// displayPrice = totalProviderPrice + companyMargin
// Set once when program is created/updated in admin

// For Visa (fixed pricing)
// basePrice already includes margin, set in admin
```

---

## 13. Document Management System

### 13.1 Document Types per Service

```typescript
const DOCUMENT_CONFIGS = {
  MEDICAL: {
    REQUIRED: [
      { type: 'PASSPORT_COPY', label: { ar: 'صورة الجواز', en: 'Passport Copy' }, formats: ['pdf', 'jpg', 'png'], maxSize: '5MB' },
      { type: 'MEDICAL_REPORT', label: { ar: 'التقرير الطبي', en: 'Medical Report' }, formats: ['pdf'], maxSize: '20MB' },
      { type: 'PATIENT_PHOTO', label: { ar: 'صورة شخصية', en: 'Patient Photo' }, formats: ['jpg', 'png'], maxSize: '5MB' },
    ],
    OPTIONAL: [
      { type: 'XRAY', label: { ar: 'صور الأشعة', en: 'X-Ray Images' }, formats: ['pdf', 'jpg', 'png', 'dicom'], maxSize: '50MB' },
      { type: 'LAB_RESULTS', label: { ar: 'نتائج التحاليل', en: 'Lab Results' }, formats: ['pdf'], maxSize: '20MB' },
      { type: 'PREVIOUS_TREATMENT', label: { ar: 'تقارير علاج سابقة', en: 'Previous Treatment Reports' }, formats: ['pdf'], maxSize: '20MB' },
    ],
    RESULT: [
      { type: 'TREATMENT_SUMMARY', label: { ar: 'ملخص العلاج', en: 'Treatment Summary' } },
      { type: 'DISCHARGE_REPORT', label: { ar: 'تقرير الخروج', en: 'Discharge Report' } },
      { type: 'FOLLOW_UP_PLAN', label: { ar: 'خطة المتابعة', en: 'Follow-up Plan' } },
    ],
  },
  
  EDUCATION: {
    REQUIRED: [
      { type: 'PASSPORT_COPY', label: { ar: 'صورة الجواز', en: 'Passport Copy' }, formats: ['pdf', 'jpg', 'png'], maxSize: '5MB' },
      { type: 'PERSONAL_PHOTO', label: { ar: 'صورة شخصية', en: 'Personal Photo' }, formats: ['jpg', 'png'], maxSize: '5MB' },
    ],
    OPTIONAL: [
      { type: 'ACADEMIC_CERT', label: { ar: 'الشهادة الأكاديمية', en: 'Academic Certificate' }, formats: ['pdf'], maxSize: '10MB' },
      { type: 'TRANSCRIPT', label: { ar: 'كشف الدرجات', en: 'Transcript' }, formats: ['pdf'], maxSize: '10MB' },
      { type: 'LANGUAGE_CERT', label: { ar: 'شهادة لغة', en: 'Language Certificate' }, formats: ['pdf'], maxSize: '10MB' },
    ],
    RESULT: [
      { type: 'ACCEPTANCE_LETTER', label: { ar: 'خطاب القبول', en: 'Acceptance Letter' } },
      { type: 'ENROLLMENT_CONFIRM', label: { ar: 'تأكيد التسجيل', en: 'Enrollment Confirmation' } },
      { type: 'HOUSING_CONFIRM', label: { ar: 'تأكيد السكن', en: 'Housing Confirmation' } },
    ],
  },
  
  VISA: {
    REQUIRED: [
      { type: 'PASSPORT_COPY', label: { ar: 'صورة الجواز', en: 'Passport Copy' }, formats: ['pdf', 'jpg', 'png'], maxSize: '5MB' },
      { type: 'PERSONAL_PHOTO', label: { ar: 'صورة شخصية بخلفية بيضاء', en: 'Photo (white background)' }, formats: ['jpg', 'png'], maxSize: '5MB' },
    ],
    CONDITIONAL: [
      // Shown based on visa type / country
      { type: 'BANK_STATEMENT', label: { ar: 'كشف حساب بنكي', en: 'Bank Statement' }, condition: 'country requires financial proof' },
      { type: 'HOTEL_BOOKING', label: { ar: 'حجز فندق', en: 'Hotel Booking' } },
      { type: 'FLIGHT_BOOKING', label: { ar: 'حجز طيران', en: 'Flight Booking' } },
      { type: 'INVITATION_LETTER', label: { ar: 'خطاب دعوة', en: 'Invitation Letter' } },
      { type: 'EMPLOYMENT_LETTER', label: { ar: 'خطاب عمل', en: 'Employment Letter' } },
    ],
    RESULT: [
      { type: 'VISA_COPY', label: { ar: 'نسخة التأشيرة', en: 'Visa Copy' } },
      { type: 'REJECTION_LETTER', label: { ar: 'خطاب الرفض', en: 'Rejection Letter' } },
    ],
  },
};
```

### 13.2 Document Review Workflow

```
Client uploads document
        │
        ▼
┌─────────────────────┐
│ Status: PENDING_     │
│ REVIEW               │
│                      │
│ Virus scan           │
│ Format validation    │
│ Size check           │
└──────────┬──────────┘
           │
           ▼
    Staff reviews
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌────────┐  ┌──────────────────┐
│APPROVED│  │REJECTED          │
└────────┘  │                  │
            │ reason required  │
            │ notify client    │
            │ client re-uploads│
            └──────────────────┘
```

### 13.3 Document Completeness Tracking

```typescript
// Client-facing document tracker
interface DocumentTracker {
  orderId: string;
  serviceType: ServiceType;
  
  required: {
    total: number;
    uploaded: number;
    approved: number;
    rejected: number;
    pending: number;
  };
  
  optional: {
    total: number;
    uploaded: number;
  };
  
  completionPercent: number;  // (approved required) / (total required) * 100
  allRequiredApproved: boolean;
  
  items: DocumentTrackerItem[];
}

interface DocumentTrackerItem {
  type: string;
  label: LocalizedString;
  category: 'REQUIRED' | 'OPTIONAL';
  status: 'NOT_UPLOADED' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  uploadedAt?: DateTime;
}
```

---

## 14. Notification System

### 14.1 Notification Events

```typescript
const NOTIFICATION_EVENTS = {
  // ─── Order Lifecycle ───
  ORDER_CREATED: {
    channels: ['email', 'sms'],
    recipients: ['client'],
    template: 'order_created',
  },
  ORDER_ASSIGNED: {
    channels: ['in_app'],
    recipients: ['assignee'],
    template: 'order_assigned',
  },
  ORDER_STATUS_CHANGED: {
    channels: ['email', 'sms', 'whatsapp', 'push'],
    recipients: ['client'],
    template: 'order_status_update',
  },
  
  // ─── Documents ───
  DOCUMENT_UPLOADED: {
    channels: ['in_app'],
    recipients: ['assignee'],
    template: 'document_uploaded',
  },
  DOCUMENT_APPROVED: {
    channels: ['push', 'in_app'],
    recipients: ['client'],
    template: 'document_approved',
  },
  DOCUMENT_REJECTED: {
    channels: ['email', 'sms', 'push'],
    recipients: ['client'],
    template: 'document_rejected',
  },
  DOCUMENTS_INCOMPLETE: {
    channels: ['email', 'whatsapp'],
    recipients: ['client'],
    template: 'documents_needed',
  },
  
  // ─── Payments ───
  PAYMENT_RECEIVED: {
    channels: ['email', 'sms'],
    recipients: ['client'],
    template: 'payment_confirmation',
  },
  PAYMENT_REMINDER: {
    channels: ['email', 'whatsapp'],
    recipients: ['client'],
    template: 'payment_reminder',
  },
  REFUND_PROCESSED: {
    channels: ['email', 'sms'],
    recipients: ['client'],
    template: 'refund_processed',
  },
  
  // ─── Quotes (Medical) ───
  QUOTES_READY: {
    channels: ['email', 'sms', 'whatsapp', 'push'],
    recipients: ['client'],
    template: 'quotes_ready',
  },
  QUOTE_EXPIRING: {
    channels: ['email', 'push'],
    recipients: ['client'],
    template: 'quote_expiring_soon',
  },
  
  // ─── Messages ───
  NEW_MESSAGE: {
    channels: ['push', 'email'],
    recipients: ['counterpart'],  // If client sent → staff, if staff sent → client
    template: 'new_message',
  },
  
  // ─── Coordination ───
  COORDINATION_CONFIRMED: {
    channels: ['email', 'whatsapp', 'push'],
    recipients: ['client'],
    template: 'coordination_confirmed',
  },
  
  // ─── Internal ───
  SLA_BREACH_WARNING: {
    channels: ['in_app', 'email'],
    recipients: ['assignee', 'operations_lead'],
    template: 'sla_warning',
  },
  NEW_ORDER_ALERT: {
    channels: ['in_app'],
    recipients: ['operations_lead'],
    template: 'new_order_alert',
  },
};
```

### 14.2 Notification Preferences

العميل يمكنه التحكم في قنوات الإشعارات:

```typescript
interface NotificationPreferences {
  userId: string;
  
  channels: {
    email: boolean;      // default: true
    sms: boolean;        // default: true
    whatsapp: boolean;   // default: true
    push: boolean;       // default: true
  };
  
  // Can't disable critical notifications (payment confirmation, order status)
  // Can disable: marketing, reminders, tips
}
```

### 14.3 Notification Templates

كل Template يدعم:
- متغيرات ديناميكية (`{{clientName}}`, `{{orderNumber}}`, `{{status}}`)
- تعدد اللغات (ar, en, ...)
- تعدد القنوات (النسخة عبر Email أطول من SMS)

```typescript
// Example template
const ORDER_STATUS_UPDATE = {
  id: 'order_status_update',
  
  email: {
    ar: {
      subject: 'تحديث على طلبك #{{orderNumber}}',
      body: `مرحبًا {{clientName}},
      
      تم تحديث حالة طلبك #{{orderNumber}} إلى: {{statusLabel}}.
      
      {{#if actionRequired}}
      الإجراء المطلوب: {{actionDescription}}
      {{/if}}
      
      يمكنك متابعة طلبك من خلال المنصة:
      {{orderUrl}}`,
    },
    en: { /* ... */ },
  },
  
  sms: {
    ar: 'تحديث طلبك #{{orderNumber}}: {{statusLabel}}. تابع من المنصة: {{shortUrl}}',
    en: 'Order #{{orderNumber}} update: {{statusLabel}}. Track: {{shortUrl}}',
  },
  
  whatsapp: {
    ar: `مرحبًا {{clientName}} 👋
    
تم تحديث طلبك *#{{orderNumber}}*
الحالة الجديدة: *{{statusLabel}}*

{{#if actionRequired}}
⚠️ مطلوب منك: {{actionDescription}}
{{/if}}

تابع طلبك: {{orderUrl}}`,
  },
  
  push: {
    ar: { title: 'تحديث طلبك', body: '{{statusLabel}} - #{{orderNumber}}' },
    en: { title: 'Order Update', body: '{{statusLabel}} - #{{orderNumber}}' },
  },
};
```

---

## 15. Messaging System

### 15.1 Design

رسائل داخل سياق الطلب (ليست chat عام):

```
┌─────────────────────────────────────────┐
│ Order #WAS-MED-2026-00042               │
│ Messages                                 │
├─────────────────────────────────────────┤
│                                          │
│  [System] 10 Mar, 09:00                  │
│  تم إنشاء الطلب                          │
│                                          │
│  [Client] 10 Mar, 09:15                  │
│  مرفق التقرير الطبي الأخير               │
│  📎 medical_report.pdf                   │
│                                          │
│  [Staff: Ahmed] 10 Mar, 11:30            │
│  شكرًا، تم استلام التقرير.                │
│  نحتاج أيضًا صورة الأشعة الأخيرة.         │
│                                          │
│  [Staff: Ahmed] 10 Mar, 11:31  🔒        │
│  ⚠️ Internal: الحالة تحتاج رأي طبي      │
│  قبل إرسالها للمراكز                      │
│  (visible to staff only)                 │
│                                          │
│  [Client] 11 Mar, 08:00                  │
│  تم رفع صورة الأشعة                      │
│  📎 xray_march.jpg                       │
│                                          │
├─────────────────────────────────────────┤
│ [Type a message...]           📎 Send   │
└─────────────────────────────────────────┘
```

### 15.2 Features

- **Per-Order Messaging:** كل طلب له محادثة خاصة
- **Internal Notes:** رسائل داخلية مرئية للفريق فقط (isInternal: true)
- **System Messages:** رسائل تلقائية عند تغيير الحالة (isSystem: true)
- **Attachments:** إرفاق ملفات (يُرفع لـ Object Storage)
- **Read Receipts:** تتبع من قرأ الرسالة ومتى
- **Real-time:** عبر WebSocket / Socket.IO
- **Notifications:** إشعار فوري عند وصول رسالة جديدة

---

## 16. Admin Dashboard

### 16.1 Dashboard Home

```
┌───────────────────────────────────────────────────────────────────┐
│  WASEET Admin Dashboard                              Ahmed ▾     │
├───────────┬───────────────────────────────────────────────────────┤
│           │                                                       │
│ 📊 Home   │  Overview                          Today: 13 Apr 2026│
│           │                                                       │
│ 📋 Orders │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│           │  │ New      │ │Active    │ │Completed │ │Revenue   ││
│ 👥 Clients│  │ Today    │ │Orders    │ │This Month│ │This Month││
│           │  │   12     │ │   47     │ │   89     │ │ 145,000  ││
│ 🏥 Provdrs│  │ ↑ 3 vs   │ │          │ │ ↑ 12%    │ │ ↑ 8%     ││
│           │  │ yesterday│ │          │ │          │ │ SAR      ││
│ 💰 Finance│  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│           │                                                       │
│ 📄 Docs   │  ⚠️ Requires Attention                               │
│           │  ┌────────────────────────────────────────────────┐   │
│ 📈 Reports│  │ • 3 orders pending assignment                  │   │
│           │  │ • 5 orders with incomplete documents            │   │
│ ⚙️ Settings│  │ • 2 quotes expiring tomorrow                   │   │
│           │  │ • 1 payment pending confirmation                │   │
│           │  │ • 1 order approaching SLA breach               │   │
│           │  └────────────────────────────────────────────────┘   │
│           │                                                       │
│           │  Recent Orders                                        │
│           │  ┌─────────┬────────┬──────────┬─────────┬────────┐  │
│           │  │Order #  │Client  │Service   │Status   │Assigned│  │
│           │  ├─────────┼────────┼──────────┼─────────┼────────┤  │
│           │  │MED-0042 │فهد     │Medical   │Coordinat│Ahmed   │  │
│           │  │MED-0041 │سارة    │Medical   │Quotes   │Nora    │  │
│           │  │VIS-0015 │محمد    │Visa      │In Progr │Ahmed   │  │
│           │  │EDU-0008 │خالد    │Education │Enrolled │Nora    │  │
│           │  └─────────┴────────┴──────────┴─────────┴────────┘  │
│           │                                                       │
└───────────┴───────────────────────────────────────────────────────┘
```

### 16.2 Order Management View

**List View Features:**
- Filter by: service type, status, assigned agent, priority, date range, tags
- Sort by: date, priority, status, last updated
- Bulk actions: assign, change priority, export
- Quick search by order number or client name
- Color-coded status badges
- SLA indicators (green/yellow/red)

**Single Order View:**
```
┌─────────────────────────────────────────────────────────────┐
│ Order #WAS-MED-2026-00042                                    │
│ Status: COORDINATING          Priority: HIGH    🔴           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Progress Bar: ████████████████░░░░ 70%]                   │
│                                                              │
│  ┌─────────┬──────────┬──────────┬──────────┬─────────┐     │
│  │Overview │Documents │Quotes    │Coordinatn│Messages │     │
│  └─────────┴──────────┴──────────┴──────────┴─────────┘     │
│                                                              │
│  Client: فهد العمري          Assigned: Ahmed                 │
│  Service: Medical Treatment  Created: 2 Mar 2026             │
│  Diagnosis: Knee Replacement                                 │
│  Country: Turkey                                             │
│                                                              │
│  Financial Summary:                                          │
│  ┌──────────────────────────────────────────┐               │
│  │ Estimated:    45,000 SAR                 │               │
│  │ Provider:     35,000 SAR                 │               │
│  │ Margin:       10,000 SAR (28.5%)         │               │
│  │ Deposit Paid: 500 SAR ✅                  │               │
│  │ Final Paid:   44,500 SAR ✅               │               │
│  │ Total Paid:   45,000 SAR ✅               │               │
│  └──────────────────────────────────────────┘               │
│                                                              │
│  Status History:                                             │
│  ├─ 02 Mar: DRAFT → DEPOSIT_PAID (Client)                  │
│  ├─ 02 Mar: DEPOSIT_PAID → CASE_UNDER_REVIEW (Ahmed)       │
│  ├─ 03 Mar: CASE_UNDER_REVIEW → SENT_TO_PROVIDERS (Ahmed)  │
│  ├─ 06 Mar: SENT_TO_PROVIDERS → QUOTES_RECEIVED (System)   │
│  ├─ 07 Mar: QUOTES_RECEIVED → QUOTES_READY (Nora)          │
│  ├─ 08 Mar: QUOTES_READY → QUOTE_SELECTED (Client)         │
│  ├─ 08 Mar: QUOTE_SELECTED → FULLY_PAID (Client)           │
│  └─ 09 Mar: FULLY_PAID → COORDINATING (Ahmed)              │
│                                                              │
│  [Change Status ▾]  [Add Internal Note]  [Transfer Order]   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 16.3 Admin Modules

| Module | Features |
|--------|----------|
| **Orders** | List, filter, assign, status management, bulk operations |
| **Clients** | Client list, profile, order history, documents |
| **Providers** | Provider list, contracts, performance, quotes history |
| **Finance** | Revenue reports, payments, refunds, provider settlements |
| **Documents** | Pending reviews, approval queue, document search |
| **Catalog** | Manage institutes, programs, visa types, pricing |
| **Reports** | Operational KPIs, financial reports, team performance |
| **Settings** | System config, notification templates, payment config |
| **Audit Log** | All system actions with who/when/what |

---

## 17. Provider Portal

> **Phase 2+ Feature** — في MVP، العروض تُدخل يدويًا بواسطة فريق التشغيل.

### 17.1 Provider Portal Features (Phase 2)

```
Provider logs in
        │
        ▼
┌─────────────────────────────────┐
│  Provider Dashboard              │
│                                  │
│  📥 New Requests (3)             │
│  📝 Pending Quotes (2)          │
│  ✅ Approved Orders (5)          │
│  📊 Performance Stats           │
│                                  │
│  New Request:                    │
│  ┌────────────────────────────┐ │
│  │ Case #MED-0045             │ │
│  │ Type: Knee Surgery         │ │
│  │ Patient: Male, 55          │ │
│  │ Reports: [View] [Download] │ │
│  │                            │ │
│  │ [Submit Quote]             │ │
│  └────────────────────────────┘ │
│                                  │
│  Submit Quote Form:             │
│  ├─ Treatment plan (text)       │
│  ├─ Price                        │
│  ├─ Duration                     │
│  ├─ Hospital stay days           │
│  ├─ Included services            │
│  ├─ Excluded services            │
│  ├─ Valid until                   │
│  └─ Attachments                  │
│                                  │
└─────────────────────────────────┘
```

### 17.2 Provider vs Manual Entry

في MVP (Phase 1):
```
المزود يرسل العرض عبر: Email / WhatsApp / Phone
        ↓
موظف التشغيل يدخل العرض يدويًا في النظام
        ↓
المشرف يراجع ويعتمد
        ↓
يظهر للعميل
```

في Phase 2:
```
المنصة ترسل الحالة للمزود تلقائيًا
        ↓
المزود يدخل عرضه مباشرة في البوابة
        ↓
المشرف يراجع ويعتمد
        ↓
يظهر للعميل
```

---

## 18. Search, Filtering & Catalog

### 18.1 Institute Catalog (Education)

**Filters:**
```
Country:       [All ▾]  [السعودية | بريطانيا | أمريكا | أستراليا | ماليزيا | ...]
City:          [All ▾]  (dynamic based on country)
Program Type:  [All ▾]  [لغة | دبلوم | شهادة | دورة قصيرة]
Duration:      [All ▾]  [1-4 أسابيع | 5-12 أسبوع | 13-24 أسبوع | 25+ أسبوع]
Price Range:   [Slider: 0 — 100,000 SAR]
Housing:       [All ▾]  [مشمول | غير مشمول]
Start Date:    [Date picker]
Sort By:       [Price ↑ | Price ↓ | Rating | Popular | Newest]
```

### 18.2 Visa Catalog

```
Step 1: Select Country (grid with flags)
Step 2: Select Visa Type (cards with descriptions)
Step 3: View details + requirements + price → Start Application
```

---

## 19. Cost Calculator

### 19.1 Medical Cost Calculator

قبل إنشاء الطلب، العميل يمكنه الحصول على تقدير:

```
┌─────────────────────────────────────────────┐
│  حاسبة التكلفة التقديرية                      │
│                                              │
│  نوع العلاج:     [عملية جراحية ▾]             │
│  التخصص:         [عظام ▾]                     │
│  الدولة:          [تركيا ▾]                    │
│                                              │
│  ─────────────────────────────────────────   │
│  التكلفة التقديرية: 30,000 - 50,000 ر.س       │
│  ─────────────────────────────────────────   │
│                                              │
│  يشمل عادةً:                                  │
│  ✅ العملية والإقامة بالمستشفى                  │
│  ✅ الفحوصات الأولية                           │
│  ✅ المتابعة لمدة أسبوع                        │
│                                              │
│  لا يشمل:                                     │
│  ❌ تذاكر الطيران                              │
│  ❌ السكن الخارجي                              │
│  ❌ الترجمة والاستقبال (متوفرة كخدمات إضافية)  │
│                                              │
│  ⚠️ هذا تقدير مبدئي. السعر النهائي يعتمد      │
│  على التقرير الطبي وعرض المركز المعتمد.        │
│                                              │
│  [ابدأ طلبك الآن]                              │
└─────────────────────────────────────────────┘
```

**Implementation:** جدول تقديري في الـ Admin يحدد نطاقات الأسعار حسب (نوع العلاج × التخصص × الدولة).

### 19.2 Education Cost Calculator

```
اختر المعهد → اختر البرنامج → اختر المدة → السكن؟ → الإجمالي
```

أبسط لأن الأسعار محددة مسبقًا في الكتالوج.

---

## 20. API Design

### 20.1 API Structure

```
/api/v1/
├── /auth/
│   ├── POST   /register
│   ├── POST   /login
│   ├── POST   /otp/send
│   ├── POST   /otp/verify
│   ├── POST   /refresh
│   ├── POST   /logout
│   └── POST   /password/reset
│
├── /users/
│   ├── GET    /me
│   ├── PATCH  /me
│   ├── GET    /me/notifications
│   └── PATCH  /me/notification-preferences
│
├── /orders/
│   ├── GET    /                          # List (filtered by role)
│   ├── POST   /                          # Create
│   ├── GET    /:id                       # Get details
│   ├── PATCH  /:id                       # Update
│   ├── PATCH  /:id/status                # Change status
│   ├── POST   /:id/assign               # Assign to agent
│   ├── GET    /:id/status-history        # Status timeline
│   ├── GET    /:id/documents             # List documents
│   ├── POST   /:id/documents             # Upload document
│   ├── GET    /:id/messages              # List messages
│   ├── POST   /:id/messages              # Send message
│   ├── GET    /:id/payments              # List payments
│   ├── POST   /:id/payments              # Initiate payment
│   └── GET    /:id/addons                # List addons
│
├── /medical/
│   ├── GET    /cases/:orderId            # Get medical case
│   ├── PATCH  /cases/:orderId            # Update case
│   ├── GET    /cases/:orderId/quotes     # List quotes
│   ├── POST   /cases/:orderId/quotes     # Add quote (admin)
│   ├── PATCH  /quotes/:id               # Update quote (approve/reject)
│   ├── POST   /quotes/:id/select        # Client selects quote
│   ├── GET    /cases/:orderId/coordination
│   ├── POST   /cases/:orderId/coordination
│   └── PATCH  /coordination/:id
│
├── /education/
│   ├── GET    /institutes                # List institutes
│   ├── GET    /institutes/:id            # Institute details
│   ├── GET    /institutes/:id/programs   # Programs
│   ├── GET    /programs/:id              # Program details
│   ├── GET    /enrollments/:orderId      # Enrollment details
│   └── PATCH  /enrollments/:orderId      # Update enrollment
│
├── /visa/
│   ├── GET    /services                  # List countries
│   ├── GET    /services/:countryCode     # Country visa types
│   ├── GET    /types/:id                 # Visa type details
│   ├── GET    /applications/:orderId     # Application details
│   └── PATCH  /applications/:orderId     # Update application
│
├── /documents/
│   ├── PATCH  /:id/review               # Approve/Reject (admin)
│   └── DELETE /:id                       # Soft delete
│
├── /payments/
│   ├── POST   /callback                 # Payment gateway webhook
│   └── POST   /:id/refund              # Process refund (finance)
│
├── /providers/                           # Admin only
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /:id
│   ├── PATCH  /:id
│   └── GET    /:id/quotes              # Provider's quote history
│
├── /catalog/                             # Admin: manage content
│   ├── POST   /institutes
│   ├── PATCH  /institutes/:id
│   ├── POST   /programs
│   ├── PATCH  /programs/:id
│   ├── POST   /visa-services
│   ├── PATCH  /visa-services/:id
│   └── ...
│
├── /reports/                             # Admin/Finance
│   ├── GET    /financial/summary
│   ├── GET    /financial/revenue
│   ├── GET    /financial/provider-settlements
│   ├── GET    /operational/overview
│   ├── GET    /operational/sla
│   └── GET    /operational/team-performance
│
├── /admin/
│   ├── GET    /users                    # User management
│   ├── POST   /users                    # Create staff user
│   ├── PATCH  /users/:id               # Update user
│   ├── GET    /audit-log               # Audit trail
│   └── GET/PATCH /settings             # System settings
│
├── /calculator/
│   ├── POST   /medical/estimate        # Cost estimate
│   └── POST   /education/estimate      # Cost estimate
│
└── /notifications/
    ├── GET    /                          # User's notifications
    ├── PATCH  /:id/read                 # Mark as read
    └── POST   /read-all                 # Mark all as read
```

### 20.2 API Response Format

```typescript
// Success Response
{
  "success": true,
  "data": { /* ... */ },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### 20.3 Real-time Events (WebSocket)

```typescript
// Events the client subscribes to
const WS_EVENTS = {
  'order:status_changed':    { orderId, newStatus, timestamp },
  'order:assigned':          { orderId, assigneeId },
  'message:new':             { orderId, message },
  'message:read':            { orderId, messageId, readBy },
  'document:status_changed': { orderId, documentId, newStatus },
  'quote:new':               { orderId, quoteId },
  'notification:new':        { notification },
  'coordination:updated':    { orderId, itemId, newStatus },
};
```

---

## 21. Security & Compliance

### 21.1 Authentication & Authorization
- JWT with RS256 signing
- Access tokens: 15-minute expiry
- Refresh tokens: 7-day expiry, rotated on use
- 2FA mandatory for all staff accounts
- OTP rate limiting: 3 per 5 minutes, 10 per hour
- Password: minimum 8 chars, mixed case + number
- Account lockout after 5 failed attempts (30-min cooldown)

### 21.2 Data Protection
- All data encrypted at rest (AES-256)
- All communication over TLS 1.3
- Medical documents: additional encryption layer + access logging
- PII fields encrypted at database level (passport numbers, etc.)
- File uploads: virus scanning before storage
- Presigned URLs for document access (15-min expiry)

### 21.3 Access Control
- Role-based access control (RBAC) as defined in Section 5
- API-level permission checks (NestJS Guards)
- Row-level security: clients only see their own data
- Staff see only assigned orders (unless Operations Lead+)
- All access to medical documents logged in audit trail

### 21.4 Compliance Considerations

| Area | Requirement | Status |
|------|-------------|--------|
| Saudi Personal Data Protection | Data residency in KSA / compliant regions | **Must verify** |
| Medical Data | HIPAA-equivalent local regulations | **Must verify with legal** |
| Payment | PCI DSS compliance (via payment gateway) | Gateway handles this |
| Cookie/Tracking | Privacy policy + consent | Must implement |
| Terms of Service | Clear service terms + liability | Must draft with legal |
| Refund Policy | Compliant with Saudi e-commerce law | Must verify |

### 21.5 API Security
- Rate limiting: 100 requests/minute per user, 1000/minute per IP
- Input validation on all endpoints (class-validator + Zod)
- SQL injection prevention via ORM (Prisma)
- XSS prevention via output encoding
- CSRF protection for cookie-based sessions
- CORS whitelist
- Request size limits (10MB for regular, 50MB for file uploads)
- Helmet.js for HTTP headers

---

## 22. Internationalization (i18n)

### 22.1 Strategy

**MVP (Phase 1):** Arabic + English only  
**Phase 2:** Add 2-3 high-demand languages  
**Phase 3:** Up to 8 languages  

### 22.2 Implementation

```typescript
// i18n Architecture
// Using next-intl (Next.js) for frontend
// Backend returns localized strings OR keys that frontend resolves

// Directory structure
locales/
├── ar/
│   ├── common.json        // Shared UI strings
│   ├── medical.json       // Medical service strings
│   ├── education.json     // Education service strings
│   ├── visa.json          // Visa service strings
│   └── notifications.json // Notification templates
├── en/
│   ├── common.json
│   ├── medical.json
│   ├── education.json
│   ├── visa.json
│   └── notifications.json
├── tr/  [Phase 2]
├── fr/  [Phase 3]
└── ...
```

### 22.3 RTL/LTR Support
- Arabic, Urdu: RTL
- English, Turkish, French, etc.: LTR
- Tailwind CSS with `dir` attribute: `rtl:` and `ltr:` variants
- Layout mirroring for RTL
- Number and date formatting per locale

### 22.4 Content Localization
- Static content (UI labels, buttons, errors): translation files
- Dynamic content (institute names, descriptions): dual columns in DB (`nameAr`, `nameEn`)
- User-generated content (messages, notes): stored as-is, no translation
- Notification templates: per-language templates

---

## 23. PWA Requirements

### 23.1 Scope
PWA applies to **Client Portal only** (Admin and Provider Portal are desktop SPA).

### 23.2 Features
- **Installable:** Add to home screen on mobile
- **Offline support:** View cached order status and documents
- **Push notifications:** Via Service Worker + Web Push API
- **Responsive:** Mobile-first design, works on all screen sizes

### 23.3 Implementation (Phase 2)
```
next.config.js:
  withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })

Caching strategy:
  - Pages: NetworkFirst (always fresh, fallback to cache)
  - Images/Static: CacheFirst
  - API calls: NetworkFirst with 5-min stale cache
  - Documents: CacheFirst after first load
```

---

## 24. Third-Party Integrations

### 24.1 Payment Gateway

**Primary: Moyasar or HyperPay**

```typescript
// Integration points
interface PaymentGateway {
  // Create payment session
  createSession(params: {
    amount: number;
    currency: string;
    orderId: string;
    description: string;
    callbackUrl: string;
    customerEmail: string;
    customerPhone: string;
    methods: ('creditcard' | 'mada' | 'applepay' | 'stcpay')[];
  }): Promise<PaymentSession>;
  
  // Process webhook callback
  handleCallback(payload: WebhookPayload): Promise<PaymentResult>;
  
  // Refund
  refund(transactionId: string, amount: number): Promise<RefundResult>;
  
  // Query status
  getTransaction(transactionId: string): Promise<TransactionStatus>;
}
```

**Supported Methods:**
- mada (debit cards — most common in KSA)
- Visa / MasterCard
- Apple Pay
- STC Pay

### 24.2 WhatsApp Business API

```typescript
// Via 360dialog or official Meta Cloud API
interface WhatsAppService {
  // Send template message (pre-approved by Meta)
  sendTemplate(params: {
    to: string;           // Phone number with country code
    templateName: string; // e.g., 'order_status_update'
    language: string;     // e.g., 'ar'
    components: TemplateComponent[];
  }): Promise<MessageResult>;
  
  // Send free-form message (within 24h window)
  sendMessage(params: {
    to: string;
    text: string;
  }): Promise<MessageResult>;
}
```

### 24.3 SMS Gateway

**Unifonic (KSA-focused) or Twilio**

```typescript
interface SmsService {
  send(params: {
    to: string;
    message: string;
    senderId: string;  // e.g., 'WASEET'
  }): Promise<SmsResult>;
  
  sendOtp(params: {
    to: string;
    code: string;
  }): Promise<SmsResult>;
}
```

### 24.4 Email Service

**Resend or Amazon SES**

```typescript
interface EmailService {
  send(params: {
    to: string;
    subject: string;
    html: string;
    from: string;       // e.g., 'noreply@waseet.com'
    replyTo?: string;
  }): Promise<EmailResult>;
  
  sendTemplate(params: {
    to: string;
    templateId: string;
    variables: Record<string, any>;
  }): Promise<EmailResult>;
}
```

### 24.5 File Storage

**AWS S3 or MinIO (self-hosted)**

```
Bucket structure:
waseet-documents/
├── orders/{orderId}/
│   ├── medical-reports/
│   ├── passport/
│   ├── photos/
│   ├── quotes/
│   ├── results/
│   └── coordination/
├── catalog/
│   ├── institutes/{id}/
│   └── providers/{id}/
└── temp/  (for uploads before assignment)
```

---

## 25. Phase Plan

### Phase 1 — MVP (Months 1-4)

**Focus: Medical Service + Core Platform**

```
Week 1-2: Setup & Foundation
├── Project setup (Next.js + NestJS + PostgreSQL + Prisma)
├── Authentication (OTP + Email/Password)
├── Base user management
├── i18n framework (Arabic + English)
└── CI/CD pipeline

Week 3-4: Core Order Engine
├── Base Order CRUD
├── Order number generation
├── Status management + state machine
├── Status history / audit trail
└── Order list with filters (admin)

Week 5-6: Medical Service
├── Medical case creation form (dynamic)
├── Quote management (manual entry by staff)
├── Quote review + approval workflow
├── Quote display for client (comparison view)
├── Quote selection flow
└── Coordination items management

Week 7-8: Document Management
├── File upload (S3 integration)
├── Document type configs per service
├── Document review workflow
├── Document completeness tracker
├── Virus scanning integration
└── Presigned URL generation

Week 9-10: Payment System
├── Payment gateway integration (Moyasar/HyperPay)
├── Deposit payment flow
├── Final payment flow
├── Payment status tracking
├── Webhook handling
├── Basic refund processing
└── Receipt generation

Week 11-12: Messaging & Notifications
├── In-order messaging system
├── Internal notes (staff-only)
├── Email notifications (key events)
├── SMS notifications (key events)
├── In-app notification center
└── Real-time updates (WebSocket)

Week 13-14: Admin Dashboard
├── Dashboard home (KPIs, alerts)
├── Order management views
├── Client management
├── Provider management (basic)
├── Team assignment
├── Basic financial reports
└── System settings

Week 15-16: Client Portal
├── Client dashboard (my orders, documents)
├── New order creation wizard
├── Order detail view + progress bar
├── Quote comparison page
├── Document upload interface
├── Payment pages
├── Messaging interface
├── Profile management
└── Cost calculator (medical)

Week 17-18: Testing & Polish
├── End-to-end testing
├── Security audit
├── Performance optimization
├── Arabic RTL refinement
├── Bug fixing
├── User acceptance testing (with real team)
└── Soft launch
```

**MVP Deliverables:**
- Client Portal (web, responsive, Arabic + English)
- Admin Panel (full order management)
- Medical Service (complete flow)
- Document Management
- Payment (deposit + final)
- Messaging (in-order)
- Notifications (email + SMS)
- Basic reporting

### Phase 2 (Months 5-8)

```
├── Education Service (institutes catalog + enrollment)
├── Visa Service (catalog + applications)
├── WhatsApp Integration
├── PWA (Client Portal)
├── Provider Portal (basic — quote submission)
├── Advanced Financial Reports
├── Refund Management (advanced)
├── 2 additional languages
├── Cost calculator (education)
├── Add-on management (order addons)
├── SLA monitoring + alerts
├── Team performance dashboard
└── Mobile push notifications
```

### Phase 3 (Months 9-14)

```
├── Provider Portal (full — dashboard, stats, messaging)
├── Multi-currency support
├── API integrations with external providers
├── Advanced analytics / BI dashboard
├── Rating & review system
├── Referral program
├── Remaining languages (up to 8)
├── Automated workflows (auto-assign, auto-reminders)
├── Advanced search (MeiliSearch)
├── Mobile apps (React Native) — if needed
├── Client loyalty / points system
└── Public API for partners
```

---

## 26. KPIs & Analytics

### 26.1 Operational KPIs

| KPI | Definition | Target (MVP) |
|-----|-----------|-------------|
| Average Processing Time | Order creation → completion | Medical: < 30 days, Visa: < 10 days |
| First Response Time | Order creation → first staff action | < 4 hours |
| Document Review Time | Upload → approval/rejection | < 24 hours |
| Quote Turnaround | Case sent to providers → quotes ready for client | < 5 business days |
| SLA Compliance | % of orders within SLA | > 85% |
| Order Completion Rate | Completed / Total (excl. cancelled) | > 80% |
| Cancellation Rate | Cancelled / Total | < 15% |
| Client Response Time | Staff message → client reply | Monitor only |

### 26.2 Financial KPIs

| KPI | Definition |
|-----|-----------|
| Revenue | Total payments received |
| Gross Margin | (Revenue - Provider costs) / Revenue |
| Average Order Value | Revenue / Number of completed orders |
| Revenue per Service | Breakdown by medical / education / visa |
| Refund Rate | Refund amount / Total revenue |
| Outstanding Payments | Deposits received where final payment pending |
| Provider Settlement Cycle | Average days from order completion to provider payment |

### 26.3 Growth KPIs

| KPI | Definition |
|-----|-----------|
| New Clients / Month | Unique new registrations that created at least 1 order |
| Repeat Client Rate | Clients with 2+ orders / Total clients |
| Conversion Rate | Orders completed / Visitors (or leads) |
| Client Acquisition Cost | Marketing spend / New clients |
| Client Lifetime Value | Average revenue per client over lifetime |
| NPS Score | Net Promoter Score (quarterly survey) |

### 26.4 Dashboard Widgets

```
Admin Home:
┌──────────────────────────────────────────────────┐
│                                                   │
│  [Today] [This Week] [This Month] [Custom Range] │
│                                                   │
│  Revenue Chart (line)     Orders by Status (pie)  │
│  ┌─────────────────┐     ┌─────────────────┐    │
│  │   📈             │     │   🟢 Active: 47  │    │
│  │                  │     │   🟡 Pending: 12 │    │
│  │  145K SAR        │     │   🔴 Blocked: 3  │    │
│  └─────────────────┘     └─────────────────┘    │
│                                                   │
│  Orders by Service (bar)  Team Workload (bar)    │
│  ┌─────────────────┐     ┌─────────────────┐    │
│  │ Medical  ████ 62│     │ Ahmed   ████ 15 │    │
│  │ Education ██ 28 │     │ Nora    ███ 12  │    │
│  │ Visa     █ 10   │     │ Saeed   ██ 8    │    │
│  └─────────────────┘     └─────────────────┘    │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## 27. Infrastructure & DevOps

### 27.1 Environment Setup

```
Environments:
├── Development (local)
├── Staging (cloud — mirrors production)
└── Production (cloud)
```

### 27.2 Recommended Infrastructure

**Option A: AWS (Enterprise)**
```
├── ECS / EC2: Application hosting
├── RDS: PostgreSQL
├── ElastiCache: Redis
├── S3: File storage
├── CloudFront: CDN
├── SES: Email
├── Route 53: DNS
└── CloudWatch: Monitoring
```

**Option B: Cost-Effective (Recommended for MVP)**
```
├── Hetzner Cloud / DigitalOcean: VPS hosting
├── Coolify: Self-hosted PaaS (deploy, SSL, etc.)
├── PostgreSQL: Managed or self-hosted
├── Redis: Self-hosted
├── MinIO: S3-compatible storage (self-hosted) or Cloudflare R2
├── Cloudflare: CDN + DNS + DDoS protection
├── Resend: Email
└── Uptime Kuma: Monitoring
```

**Estimated Monthly Cost (Option B, MVP):**
```
VPS (2x CPX31):        ~$50/month
Managed PostgreSQL:     ~$30/month  (or self-hosted: $0)
Domain + DNS:           ~$15/year
Email (Resend):         ~$20/month
SMS (Unifonic):         ~$50/month  (depends on volume)
S3/R2 Storage:          ~$5/month   (small volume initially)
─────────────────────────────────
Total:                  ~$150-200/month
```

### 27.3 CI/CD Pipeline

```yaml
# GitHub Actions
on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    - Lint (ESLint + Prettier)
    - Type check (TypeScript)
    - Unit tests (Jest/Vitest)
    - Integration tests
    
  build:
    - Build backend (NestJS)
    - Build frontend (Next.js)
    - Build Docker images
    
  deploy-staging:
    - Deploy to staging (on push to staging branch)
    - Run smoke tests
    
  deploy-production:
    - Deploy to production (on push to main)
    - Health checks
    - Rollback on failure
```

### 27.4 Backup Strategy
- Database: Daily automated backups, 30-day retention
- File storage: Cross-region replication (or regular S3 backup)
- Configuration: Version controlled in Git
- Disaster recovery: Documented procedures, tested quarterly

---

## 28. Non-Functional Requirements

### 28.1 Performance
- Page load time: < 3 seconds (first contentful paint)
- API response time: < 500ms (95th percentile)
- File upload: support up to 50MB per file
- Concurrent users: support 500+ simultaneous (MVP target)
- Database queries: < 100ms average

### 28.2 Availability
- Target uptime: 99.5% (allows ~44 hours downtime/year)
- Planned maintenance windows: Friday 2-4 AM (KSA time)
- Graceful degradation: core features work even if WhatsApp/SMS is down

### 28.3 Scalability
- Horizontal scaling: stateless backend allows adding instances
- Database: connection pooling (PgBouncer if needed)
- File storage: inherently scalable (S3/MinIO)
- Cache: Redis for hot data (sessions, frequent queries)

### 28.4 Browser Support
- Chrome 90+ (desktop + mobile)
- Safari 14+ (desktop + mobile)
- Firefox 90+
- Edge 90+
- Samsung Internet 15+

### 28.5 Accessibility
- WCAG 2.1 Level AA compliance (target, not MVP blocker)
- Keyboard navigation for all interactive elements
- Screen reader support for key flows
- Sufficient color contrast ratios
- RTL layout support

---

## 29. Glossary

| Term | Definition |
|------|-----------|
| **Order** | طلب خدمة من العميل — الكيان الأساسي في النظام |
| **Medical Case** | حالة طبية مرتبطة بطلب علاج |
| **Quote** | عرض سعر من مزود خدمة (مركز طبي) |
| **Provider** | مزود خدمة خارجي (مركز طبي / معهد / وكالة) |
| **Coordination Item** | بند تنسيقي (موعد / سكن / استقبال / ترجمة) |
| **Addon** | خدمة إضافية اختيارية مرتبطة بالطلب |
| **Deposit** | دفعة أولى / عربون |
| **Margin** | هامش ربح الشركة على سعر المزود |
| **SLA** | اتفاقية مستوى الخدمة — الحد الأقصى المقبول لوقت المعالجة |
| **Enrollment** | تسجيل طالب في معهد/برنامج |
| **PWA** | Progressive Web App — تطبيق ويب قابل للتثبيت |
| **i18n** | Internationalization — دعم تعدد اللغات |
| **RBAC** | Role-Based Access Control — صلاحيات مبنية على الأدوار |
| **Audit Trail** | سجل تتبع لجميع الإجراءات في النظام |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-13 | System Architect | Initial comprehensive PRD |

---

*This document is the single source of truth for the Waseet Platform project. All development decisions should reference this document. Updates should be versioned and tracked.*
