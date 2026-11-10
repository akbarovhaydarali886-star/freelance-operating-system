import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { KanbanBoard } from './components/projects/KanbanBoard';
import { InvoicesView } from './components/invoices/InvoicesView';
import { ClientsView } from './components/clients/ClientsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';

const MainContent = () => {
  const { currentPage } = useApp();

  // Landing page view
  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  // Auth page view
  if (currentPage === 'auth') {
    return <AuthPage />;
  }

  // Authenticated workspace views with Sidebar and MobileBottomNav
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50/70 dark:bg-slate-950/70">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-4rem)] pb-24 lg:pb-8">
        {currentPage === 'dashboard' && <DashboardView />}
        {currentPage === 'projects' && <KanbanBoard />}
        {currentPage === 'invoices' && <InvoicesView />}
        {currentPage === 'clients' && <ClientsView />}
        {currentPage === 'analytics' && <AnalyticsView />}
        {currentPage === 'settings' && <SettingsView />}
      </main>
      <MobileBottomNav />
    </div>
  );
};

const AppShell = () => {
  const { theme } = useApp();

  return (
    <div className={`${theme} min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors`}>
      <Navbar />
      <MainContent />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
