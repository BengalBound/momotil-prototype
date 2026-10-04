# MoMoTill - Portable POS System (Multi-tenant SaaS)
### Client Presentation Prototype
**Project:** MoMoTill-Portable POS System  
**Client:** Frank Louis Ohachosim  
**Developer:** BengalBound Technologies  
**Date:** October 2026  

---

## 🚀 Overview

**MoMoTill** is an AI-enhanced, voice-powered, mobile-first portable point-of-sale system built for modern retail, supermarkets, and micro-merchants across emerging markets. This repository contains the complete interactive client presentation prototype showcasing all three hierarchical user tiers:

1. **Tier 1 - Store Clerk:** Simulated Flutter mobile POS application with speech-to-text ordering, camera barcode scanning, offline mode with SQLite queue sync, and Mobile Money (MoMo / M-Pesa / Card / Cash) checkout.
2. **Tier 2 - Store CEO:** Web operations dashboard with real-time KPI metrics, weekly revenue charts, clerk RBAC permission controls (`accView`, `accApprove`, `accPrice`, `accTeam`, `accExport`), live inventory stock alerts, and high-value transaction approval queue.
3. **Tier 3 - Master Admin:** SaaS platform management console with real-time tenant provisioning, subdomain availability verification (`.momotill.io`), global GMV telemetry, feature flags toggle, maintenance mode switch, and support user impersonation.
4. **Public Marketing Landing Page:** High-converting presentation site with hero section, 6 feature cards, pricing tiers ($0, $29/mo, $99/mo), testimonials, interactive demo guide, and demo request form.

---

## 💻 Tech Stack

- **Frontend:** React 18, React Router (Hash-based for zero-config preview), Tailwind CSS
- **Icons:** Lucide React
- **Visualizations:** Recharts (Area charts, Bar charts, Donut charts)
- **Audio & AI:** Web Speech API & Edge TTS Simulation, HTML5 Web Audio Synthesis
- **Interactive Effects:** Canvas Confetti, Laser Scanning Viewfinder
- **State & Data Persistence:** Browser `localStorage` simulation with initial seed data

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup & Launch
```bash
# 1. Clone or navigate to the repository directory
cd MoMoTill-prototype

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
```

Open your browser to: **`http://localhost:3000`**

### Production Build
```bash
npm run build
```
This generates the optimized static bundle in `/dist` which can be hosted directly on Vercel, Netlify, Cloudflare Pages, or an Nginx web server.

---

## 🔑 Demo Access & Credentials

The prototype features a persistent top navigation bar allowing instant one-click switching between all tiers, without needing to re-login manually:

| Tier | Role | Demo User / Store | Pre-filled Credentials | URL Route |
|------|------|-------------------|------------------------|-----------|
| **Tier 1** | Store Clerk | Amara Okonkwo (`apexretail.ng`) | Phone: `+234 802 345 6789`<br/>OTP: `123456` (One-click auto-fill) | `/#/clerk/login`<br/>`/#/clerk/catalog` |
| **Tier 2** | Store CEO | Frank Louis Ohachosim | Pre-authenticated session | `/#/ceo/dashboard` |
| **Tier 3** | Master Admin | BengalBound Super Admin | Pre-authenticated session | `/#/admin/tenants` |
| **Public** | Prospect / Client | Marketing Website | Public Access | `/#/` |

---

## 📱 Deliverables & Features Breakdown

### 1. Store Clerk Flutter Mobile POS (Tier 1)
- **Smartphone Device Frame Simulator:** Realistic iPhone chassis with camera notch, signal indicator, and home bar (toggleable on/off).
- **Interactive Catalog:** Over 22 realistic products across Electronics, Apparel, Food, and Beverages with high-definition Unsplash photography.
- **AI Voice Order Entry:** Click the microphone icon to activate STT voice matching (e.g. *"Add iPhone 15 Pro Max"*, *"Add 2 Caramel Macchiato Latte"*).
- **Vision Camera Barcode Scanner:** Viewfinder with animated red laser sweep simulating barcode scanning.
- **Shopping Cart & Taxes:** Real-time running totals with automated 5% VAT and quantity stepper.
- **Multi-Payment Checkout:** Supports MTN MoMo, M-Pesa, Card/POS terminal, and Cash (with live cash received and change due calculator).
- **High-Value Order Forwarding:** Automatically flags orders exceeding $800 to the Store CEO approval queue.
- **Digital Receipt Simulation:** Printable thermal receipt with audio TTS confirmation.
- **Offline Mode:** Toggleable offline state that buffers orders in a simulated SQLite cache and provides a one-click cloud synchronization button.

### 2. Store CEO Management Dashboard (Tier 2)
- **Executive KPI Cards:** Today's Sales ($2,450.00), Today's Orders (42), Active Clerks on shift, and Low Stock Alerts.
- **Sales Analytics:** Recharts weekly revenue area chart with gradient fills and live transaction feed.
- **Clerk Management & RBAC:** Comprehensive permissions matrix for `accView`, `accApprove`, `accPrice`, `accTeam`, `accExport` with instant toggles and clerk provisioning modal.
- **Inventory Control:** Real-time stock levels, low-stock warning badges (&le; 5 units), margin calculations, and quick +10 restock actions.
- **Transaction Approvals Queue:** Dedicated workflow to inspect, approve, or reject high-value sales orders with rejection reason tracking.
- **CSV Data Export:** Real-time browser download of `momotill-sales-report.csv`.

### 3. Master Admin Panel (Tier 3)
- **Dark Aesthetic:** High-contrast slate/indigo console for platform-wide operations.
- **Tenant Registry:** 8 multi-tenant store instances across Nigeria, Kenya, Ghana, Rwanda, Ethiopia, and Uganda.
- **Tenant Provisioner:** Live subdomain availability checker for `*.momotill.io`.
- **Global Platform Telemetry:** $144k+ platform GMV, $18.9k MRR, and regional market distribution.
- **Feature Flags & Settings:** Dynamic switches for STT voice, OCR camera, offline SQLite sync, and global maintenance mode.
- **User Impersonation:** Simulate any Store CEO or Clerk session with an active impersonation top banner and one-click exit.

---

## 📸 Screenshots

- **Marketing Landing Page:** Complete hero, features, pricing comparison, and testimonials.
- **Store Clerk POS:** Mobile phone frame with product catalog, cart drawer, and thermal receipt.
- **Store CEO Dashboard:** KPI statistics, weekly chart, clerk permission switches, and approval queue.
- **Master Admin Panel:** Dark mode SaaS dashboard, subdomain availability checker, and tenant inspector.

---

## 🏢 BengalBound Technologies
**Project:** MoMoTill-Portable POS System  
**Prepared for:** Frank Louis Ohachosim  
&copy; 2026 BengalBound Technologies. All rights reserved.
