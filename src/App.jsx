import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { GlobalRoleSwitcher } from './components/common/GlobalRoleSwitcher';
import { ToastContainer } from './components/common/ToastContainer';

// Clerk Components
import { ClerkLayout } from './components/clerk/ClerkLayout';
import { ClerkLogin } from './pages/clerk/ClerkLogin';
import { ClerkCatalog } from './pages/clerk/ClerkCatalog';
import { ClerkCart } from './pages/clerk/ClerkCart';
import { ClerkOrders } from './pages/clerk/ClerkOrders';

// CEO Web Components
import { CeoLayout } from './components/ceo/CeoLayout';
import { CeoDashboard } from './pages/ceo/CeoDashboard';

// CEO Mobile App Components
import { CeoMobileLayout } from './components/ceo/CeoMobileLayout';
import { CeoMobileDashboard } from './pages/ceo/mobile/CeoMobileDashboard';
import { CeoMobileApprovals } from './pages/ceo/mobile/CeoMobileApprovals';
import { CeoMobileClerks } from './pages/ceo/mobile/CeoMobileClerks';
import { CeoMobileInventory } from './pages/ceo/mobile/CeoMobileInventory';
import { CeoClerks } from './pages/ceo/CeoClerks';
import { CeoAnalytics } from './pages/ceo/CeoAnalytics';
import { CeoInventory } from './pages/ceo/CeoInventory';
import { CeoApprovals } from './pages/ceo/CeoApprovals';

// Bound OS Components (Matching boundos.netlify.app)
import { AndroidFrame } from './components/common/AndroidFrame';
import { BoundVendeurApp } from './pages/clerk/BoundVendeurApp';
import { BoundManagerPatronApp } from './pages/ceo/mobile/BoundManagerPatronApp';

// Master Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminTenants } from './pages/admin/AdminTenants';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminConfig } from './pages/admin/AdminConfig';
import { AdminImpersonation } from './pages/admin/AdminImpersonation';

// Landing Page
import { LandingPage } from './pages/LandingPage';

// 404 Fallback
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-white">
    <h1 className="text-6xl font-black text-blue-500 mb-2 font-mono">404</h1>
    <h2 className="text-xl font-bold mb-2">Screen Not Found</h2>
    <p className="text-sm text-slate-400 max-w-sm mb-6">
      The requested route does not exist in the MoMoTill prototype specification.
    </p>
    <a
      href="#/"
      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-xs shadow-md transition"
    >
      Return to Landing Page
    </a>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        {/* Universal Prototype Presentation Bar */}
        <GlobalRoleSwitcher />

        {/* Universal Toast Notification Dispatcher */}
        <ToastContainer />

        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Bound OS: Vendeur Mobile (Clerk App matching boundos.netlify.app) */}
          <Route
            path="/vendeur"
            element={
              <div className="min-h-[calc(100vh-50px)] bg-[var(--bg)] flex items-center justify-center p-2 sm:p-6">
                <AndroidFrame>
                  <BoundVendeurApp />
                </AndroidFrame>
              </div>
            }
          />

          {/* Bound OS: Manager & Patron Mobile (Tier 2 Mobile matching boundos.netlify.app) */}
          <Route
            path="/manager"
            element={
              <div className="min-h-[calc(100vh-50px)] bg-[var(--bg)] flex items-center justify-center p-2 sm:p-6">
                <AndroidFrame>
                  <BoundManagerPatronApp />
                </AndroidFrame>
              </div>
            }
          />

          {/* Tier 1: Store Clerk Flutter Mobile POS */}
          <Route
            path="/clerk/login"
            element={
              <ClerkLayout>
                <ClerkLogin />
              </ClerkLayout>
            }
          />
          <Route
            path="/clerk/catalog"
            element={
              <ClerkLayout>
                <ClerkCatalog />
              </ClerkLayout>
            }
          />
          <Route
            path="/clerk/cart"
            element={
              <ClerkLayout>
                <ClerkCart />
              </ClerkLayout>
            }
          />
          <Route
            path="/clerk/orders"
            element={
              <ClerkLayout>
                <ClerkOrders />
              </ClerkLayout>
            }
          />

          {/* Tier 2: Store CEO Web Dashboard */}
          <Route
            path="/ceo/dashboard"
            element={
              <CeoLayout>
                <CeoDashboard />
              </CeoLayout>
            }
          />
          <Route
            path="/ceo/clerks"
            element={
              <CeoLayout>
                <CeoClerks />
              </CeoLayout>
            }
          />
          <Route
            path="/ceo/analytics"
            element={
              <CeoLayout>
                <CeoAnalytics />
              </CeoLayout>
            }
          />
          <Route
            path="/ceo/inventory"
            element={
              <CeoLayout>
                <CeoInventory />
              </CeoLayout>
            }
          />
          <Route
            path="/ceo/approvals"
            element={
              <CeoLayout>
                <CeoApprovals />
              </CeoLayout>
            }
          />

          {/* Tier 2: CEO Mobile Companion App */}
          <Route
            path="/ceo/mobile"
            element={<Navigate to="/ceo/mobile/dashboard" replace />}
          />
          <Route
            path="/ceo/mobile/dashboard"
            element={
              <CeoMobileLayout>
                <CeoMobileDashboard />
              </CeoMobileLayout>
            }
          />
          <Route
            path="/ceo/mobile/approvals"
            element={
              <CeoMobileLayout>
                <CeoMobileApprovals />
              </CeoMobileLayout>
            }
          />
          <Route
            path="/ceo/mobile/clerks"
            element={
              <CeoMobileLayout>
                <CeoMobileClerks />
              </CeoMobileLayout>
            }
          />
          <Route
            path="/ceo/mobile/inventory"
            element={
              <CeoMobileLayout>
                <CeoMobileInventory />
              </CeoMobileLayout>
            }
          />

          {/* Tier 3: Master Admin Panel */}
          <Route
            path="/admin/tenants"
            element={
              <AdminLayout>
                <AdminTenants />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <AdminAnalytics />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/config"
            element={
              <AdminLayout>
                <AdminConfig />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/impersonation"
            element={
              <AdminLayout>
                <AdminImpersonation />
              </AdminLayout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
