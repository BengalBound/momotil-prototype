# Architecture & Implementation Plan
## Portable POS System - Untitled Project

**Prepared By:** BengalBound Technologies  
**Prepared For:** Frank Louis Ohachosim  
**Date:** October 2026  
**Version:** 1.0 - For Client Presentation

---

## Executive Overview

This document outlines the technical architecture and phased implementation approach for the Portable POS System. The system is designed as a multi-tenant SaaS platform serving three hierarchical user tiers: Store Clerks, Store CEOs, and Master Administrators.

### Project at a Glance

| Attribute | Specification |
|-----------|---------------|
| **Timeline** | 15 Business Days (3 Phases) |
| **Total Development Cost** | USD $1,500.00 |
| **Infrastructure** | KVM4 VPS (4 vCPU, 16GB RAM, 200GB NVMe) |
| **Container Platform** | Podman |
| **Architecture** | Multi-tenant SaaS |

---

## System Architecture

### 3-Tier User Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    TIER 3: MASTER ADMIN                     │
│              (Global SaaS Platform Oversight)               │
│  • Tenant Management    • Global Analytics                  │
│  • System Configuration • User Impersonation                │
│         [Next.js + Django Admin Panel]                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     TIER 2: STORE CEO                       │
│              (Store Operations Management)                │
│  • Clerk Management     • Real-time Analytics               │
│  • Transaction Approval • Inventory Control                 │
│    [Flutter Mobile + Next.js Web Dashboard]                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     TIER 1: STORE CLERK                     │
│                 (Frontline Transaction Processing)        │
│  • Voice Order Entry    • Vision Product Scanning           │
│  • Offline Operation    • Mobile POS Interface              │
│              [Flutter Mobile Application]                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  Mobile Apps (Flutter 3.x)    │  Web Apps (Next.js 14)      │
│  • Clerk App (iOS/Android)    │  • CEO Dashboard            │
│  • CEO Mobile Companion       │  • Master Admin Panel       │
│  • Offline SQLite Storage     │  • Landing Page             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       API GATEWAY                           │
│              [Nginx Reverse Proxy + SSL]                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                      │
│              [Django 5.x + Django REST Framework]           │
│  • Multi-tenant Middleware    • JWT Authentication          │
│  • Role-based Permissions     • API Rate Limiting           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  PostgreSQL 16              │  Redis 7.x                    │
│  • Multi-tenant Schemas     │  • Session Cache              │
│  • Row-level Security       │  • Message Queue              │
│  • Automated Backups        │  • Real-time Pub/Sub          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     AI SERVICES LAYER                       │
│  • Speech-to-Text (STT)     • Text-to-Speech (TTS)          │
│  • Vision OCR (Barcode/Receipt Scanning)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase One: Foundation & Clerk Application (Days 1-5)

**Investment:** USD $500.00 (Paid before commencement)

#### Deliverables

| Component | Technology | Purpose |
|-----------|------------|---------|
| Backend API | Django 5.x + DRF | Core business logic and data management |
| Database | PostgreSQL 16 | Multi-tenant data storage with schema isolation |
| Cache Layer | Redis 7.x | Session management and API response caching |
| Clerk Mobile App | Flutter 3.x | iOS/Android POS interface for store clerks |
| Authentication | JWT + OAuth2 | Secure user authentication across platforms |
| Offline Sync | SQLite + REST | Local storage with server synchronization |

#### Key Features Implemented

1. **Multi-tenant Architecture**
   - Subdomain-based tenant identification
   - Schema-per-tenant database isolation
   - Automated tenant provisioning API

2. **Clerk Mobile Application**
   - Product catalog browsing with search
   - Shopping cart management
   - Order creation and submission
   - Offline mode with SQLite local storage
   - Automatic sync when connectivity restored

3. **Core API Endpoints**
   - `/api/v1/auth/*` - Authentication
   - `/api/v1/products/*` - Product management
   - `/api/v1/orders/*` - Order processing
   - `/api/v1/sync/*` - Offline synchronization

#### Testing & Deployment

- **Testing Endpoint:** `p1-pos.kvm4.bengalbound.dev`
- **Deployment:** Podman containers on KVM4
- **Acceptance Period:** 3 business days

---

### Phase Two: CEO Portal & Management (Days 6-10)

**Investment:** USD $500.00 (Paid before Phase Two commencement)

#### Deliverables

| Component | Technology | Purpose |
|-----------|------------|---------|
| CEO Web Portal | Next.js 14 + Tailwind | Browser-based management dashboard |
| CEO Mobile App | Flutter 3.x | On-the-go management companion |
| Clerk Management | Django Admin + API | CRUD operations for store clerks |
| Analytics Engine | PostgreSQL + Chart.js | Real-time sales visualization |
| Inventory System | Django ORM | Stock tracking and alerts |
| Push Notifications | Firebase Cloud Messaging | Real-time alerts to mobile devices |

#### Key Features Implemented

1. **CEO Web Dashboard**
   - Real-time sales metrics and KPIs
   - Transaction history with filtering
   - CSV/PDF export capabilities
   - Role-based access control (RBAC)

2. **Clerk Management System**
   - Create, edit, deactivate clerk accounts
   - Permission assignment (accView, accApprove, accPrice, accTeam, accExport)
   - Activity logging and audit trails

3. **Analytics & Reporting**
   - Daily/weekly/monthly sales reports
   - Top-selling products identification
   - Revenue trends and forecasting
   - Export to Excel/PDF

4. **Inventory Management**
   - Stock level monitoring
   - Low-stock alert notifications
   - Category-based organization
   - Cost price tracking

#### Testing & Deployment

- **Testing Endpoint:** `p2-pos.kvm4.bengalbound.dev`
- **Updated Components:** CEO Web, CEO Mobile, enhanced Clerk App
- **Acceptance Period:** 3 business days

---

### Phase Three: Master Admin, AI & Production (Days 11-15)

**Investment:** USD $500.00 (Paid before Phase Three commencement)

#### Deliverables

| Component | Technology | Purpose |
|-----------|------------|---------|
| Master Admin Panel | Next.js 14 + Django | Global SaaS platform management |
| Speech-to-Text | Cloud STT API | Voice-activated order entry |
| Text-to-Speech | Edge TTS | Audio order confirmations |
| Vision OCR | Tesseract.js | Barcode and receipt scanning |
| Landing Page | Next.js SSR | Product marketing website |
| Production Deploy | Podman + Nginx | Live production environment |

#### Key Features Implemented

1. **Master Admin Panel**
   - Tenant lifecycle management (create, suspend, delete)
   - Global platform analytics across all tenants
   - System configuration and feature flags
   - User impersonation for support purposes
   - Revenue tracking and billing management

2. **AI Integration Suite**
   - **Voice Order Entry:** Clerks speak product names, system transcribes and matches to catalog
   - **Audio Confirmations:** Order details read aloud for accessibility
   - **Barcode Scanning:** Camera-based product identification
   - **Receipt OCR:** Digital receipt capture and parsing

3. **Product Landing Page**
   - Server-side rendered for SEO
   - Feature showcase with animations
   - Pricing tier presentation
   - Contact form and demo request
   - Responsive design (mobile-first)

4. **Production Infrastructure**
   - SSL certificate installation
   - Automated backup scripts
   - Monitoring and alerting setup
   - Log aggregation and analysis

#### Testing & Deployment

- **Testing Endpoint:** `pos.kvm4.bengalbound.dev`
- **Production URL:** `[To be configured]`
- **Acceptance Period:** 3 business days

---

## Infrastructure Specifications

### KVM4 VPS Configuration

| Resource | Specification |
|----------|---------------|
| **Virtualization** | KVM4 |
| **vCPU Cores** | 4 |
| **RAM** | 16 GB |
| **Storage** | 200 GB NVMe SSD |
| **Bandwidth** | 16 TB/month |
| **Operating System** | Ubuntu 22.04 LTS |

### Container Architecture (Podman)

```
┌─────────────────────────────────────────────────────────────┐
│                    PODMAN POD LAYOUT                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   nginx     │  │   django    │  │  nextjs-ceo │           │
│  │  (Proxy)    │  │   (API)     │  │  (Web App)  │           │
│  │  Port 80/443│  │  Port 8000  │  │  Port 3000  │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ nextjs-admin│  │  postgres   │  │    redis    │           │
│  │(Admin Panel)│  │  (Database) │  │   (Cache)   │           │
│  │  Port 3001  │  │  Port 5432  │  │  Port 6379  │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Network Architecture

```
Internet
    │
    ▼
┌─────────────┐
│  Cloudflare │  (Optional - DDoS protection, CDN)
│    Proxy    │
└─────────────┘
    │
    ▼
┌─────────────┐
│    Nginx    │  (SSL termination, static files, rate limiting)
│   Gateway   │
└─────────────┘
    │
    ├──▶ Django API (Gunicorn)
    ├──▶ Next.js CEO (Node.js)
    ├──▶ Next.js Admin (Node.js)
    └──▶ Static Assets
```

---

## Database Schema Overview

### Multi-tenant Strategy

```sql
-- Each tenant gets isolated schema
tenant_001 (store_a)
  ├── users
  ├── products
  ├── orders
  └── transactions

tenant_002 (store_b)
  ├── users
  ├── products
  ├── orders
  └── transactions

-- Shared schema (platform-level)
public
  ├── tenants (tenant registry)
  ├── audit_logs (global audit)
  └── system_config
```

### Core Entities

| Entity | Description | Key Relationships |
|--------|-------------|-------------------|
| **Tenant** | Store/organization container | Has many Users, Products, Orders |
| **User** | System user (clerk, CEO, admin) | Belongs to Tenant, has Role |
| **Product** | Sellable item | Belongs to Tenant, has OrderItems |
| **Order** | Transaction record | Belongs to User, has OrderItems |
| **OrderItem** | Line item in order | Belongs to Order and Product |
| **Transaction** | Payment/approval record | Belongs to Order |

---

## Security Architecture

### Authentication Flow

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│  Client │────▶│  Django API │────▶│  PostgreSQL │
│         │     │             │     │   (Users)   │
│         │◀────│             │◀────│             │
└─────────┘     └─────────────┘     └─────────────┘
     │
     │ JWT Access Token (15 min expiry)
     │ JWT Refresh Token (7 day expiry)
     ▼
┌─────────────┐
│  Subsequent │
│   Requests  │
│  (Bearer    │
│   Token)    │
└─────────────┘
```

### Permission Matrix

| Permission | Clerk | CEO | Master Admin |
|------------|-------|-----|--------------|
| accView | ✅ | ✅ | ✅ |
| accApprove | ❌ | ✅ | ✅ |
| accPrice | ❌ | ✅ | ✅ |
| accTeam | ❌ | ✅ | ✅ |
| accExport | ❌ | ✅ | ✅ |
| Tenant Management | ❌ | ❌ | ✅ |

---

## API Architecture

### RESTful Endpoint Structure

```
/api/v1/
├── auth/
│   ├── login/           [POST]
│   ├── logout/          [POST]
│   ├── refresh/         [POST]
│   └── password-reset/  [POST]
├── products/
│   ├── list/            [GET]
│   ├── create/          [POST]
│   ├── {id}/            [GET, PUT, DELETE]
│   └── search/          [GET]
├── orders/
│   ├── list/            [GET]
│   ├── create/          [POST]
│   ├── {id}/            [GET, PUT]
│   ├── {id}/approve/    [POST]
│   └── {id}/cancel/     [POST]
├── clerks/
│   ├── list/            [GET]
│   ├── create/          [POST]
│   └── {id}/            [GET, PUT, DELETE]
├── analytics/
│   ├── sales/           [GET]
│   ├── inventory/       [GET]
│   └── export/          [GET]
├── sync/
│   ├── push/            [POST]
│   └── pull/            [GET]
├── ai/
│   ├── stt/             [POST]
│   ├── tts/             [POST]
│   └── vision/          [POST]
└── admin/
    ├── tenants/         [GET, POST]
    └── tenants/{id}/     [GET, PUT, DELETE]
```

---

## Offline Synchronization Strategy

### Clerk App Offline Mode

```
┌─────────────────────────────────────────────────────────────┐
│                    OFFLINE SYNC FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ONLINE STATE                    OFFLINE STATE              │
│  ─────────────                   ─────────────              │
│                                                             │
│  1. User creates order           1. User creates order        │
│     ↓                               ↓                       │
│  2. Validate against API         2. Store in SQLite         │
│     ↓                               ↓                       │
│  3. Save to PostgreSQL         3. Queue for sync          │
│     ↓                               ↓                       │
│  4. Return confirmation        4. Show "pending sync"       │
│                                                             │
│  WHEN CONNECTIVITY RESTORED:                               │
│  ───────────────────────────                               │
│  1. Detect online state                                     │
│  2. Upload queued orders (sync/push)                       │
│  3. Download updates (sync/pull)                          │
│  4. Resolve conflicts (last-write-wins)                     │
│  5. Clear local queue                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## AI Integration Architecture

### Service Abstraction Layer

```
┌─────────────────────────────────────────────────────────────┐
│                  AI SERVICE ABSTRACTION                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐     ┌─────────────────┐                 │
│  │   Application   │────▶│  AI Service     │                 │
│  │   Code          │     │  Interface      │                 │
│  └─────────────────┘     └─────────────────┘                 │
│                                    │                        │
│                    ┌───────────────┼───────────────┐         │
│                    ▼               ▼               ▼         │
│              ┌─────────┐    ┌─────────┐    ┌─────────┐     │
│              │   STT   │    │   TTS   │    │  Vision │     │
│              │ Provider│    │ Provider│    │ Provider│     │
│              │ (Swappable)   │ (Swappable)   │ (Swappable)   │
│              └─────────┘    └─────────┘    └─────────┘     │
│                                                             │
│  BENEFIT: Provider can be changed without code changes      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Deployment Strategy

### Phase Deployment Checklist

#### Phase One Deployment
- [ ] Django backend container built and tested
- [ ] PostgreSQL schema migrations applied
- [ ] Redis cache configured
- [ ] Clerk Flutter app built (Android APK + iOS IPA)
- [ ] Nginx reverse proxy configured
- [ ] SSL certificates installed
- [ ] KVM4 deployment completed
- [ ] Smoke tests passed
- [ ] Client access credentials provided

#### Phase Two Deployment
- [ ] CEO Next.js app built and deployed
- [ ] CEO Flutter app built
- [ ] Analytics queries optimized
- [ ] Push notification service configured
- [ ] Integration tests passed
- [ ] Documentation updated

#### Phase Three Deployment
- [ ] Master Admin panel deployed
- [ ] AI service integrations tested
- [ ] Landing page deployed
- [ ] Production monitoring configured
- [ ] Backup automation verified
- [ ] Final security audit completed

---

## Success Metrics

### Technical KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response Time | < 200ms | 95th percentile |
| Mobile App Launch | < 3 seconds | Cold start |
| Offline Sync | < 5 seconds | 100 orders |
| System Uptime | 99.9% | Monthly |
| Test Coverage | > 80% | Code coverage |

### Business KPIs

| Metric | Target |
|--------|--------|
| Phase Acceptance Rate | 100% (3/3 phases) |
| Defect Resolution | < 24 hours (critical) |
| Client Satisfaction | > 4.5/5.0 |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Scope creep | Medium | High | Strict change control, written approvals |
| Payment delays | Low | High | Payment before phase commencement |
| Technical debt | Medium | Medium | Code reviews, automated testing |
| Third-party API changes | Low | Medium | Abstraction layer, fallback mechanisms |
| Client unavailability | Medium | Medium | Clear communication plan, async updates |

---

## Post-Launch Support

### Warranty Period
- **Duration:** 30 days from Phase Three Acceptance
- **Coverage:** Bug fixes, defect resolution
- **Exclusions:** New features, third-party issues

### Maintenance Options (Post-Warranty)
| Tier | Monthly Cost | Includes |
|------|--------------|----------|
| Basic | $200 | Bug fixes, security updates |
| Standard | $500 | + Feature enhancements |
| Premium | $1,000 | + Priority support, custom dev |

---

## Appendices

### Appendix A: Glossary
- **KVM4** - Kernel-based Virtual Machine (4th generation VPS)
- **Podman** - Daemonless container engine (Docker alternative)
- **STT** - Speech-to-Text
- **TTS** - Text-to-Speech
- **OCR** - Optical Character Recognition
- **RBAC** - Role-Based Access Control
- **JWT** - JSON Web Token

### Appendix B: Document References
- Software Requirements Specification (SRS) v1.0
- Software Development Agreement
- Schedule A: Development Phases

---

**END OF DOCUMENT**

*This document is confidential and proprietary to BengalBound Technologies.*