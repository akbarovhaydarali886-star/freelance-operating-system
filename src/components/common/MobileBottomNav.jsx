import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CheckSquare,
  Receipt,
  Users,
  Settings,
  BarChart3,
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { currentPage, setCurrentPage, tasks, invoices, t } = useApp();

  // Only display in authenticated workspace views
  if (currentPage === 'landing' || currentPage === 'auth') {
    return null;
  }

  const pendingInvoicesCount = invoices.filter((i) => i.status === 'pending').length;
  const activeTasksCount = tasks.filter((task) => task.column !== 'done').length;

  const items = [
    {
      id: 'dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'projects',
      label: t('nav.projects'),
      icon: CheckSquare,
      badge: activeTasksCount > 0 ? activeTasksCount : null,
    },
    {
      id: 'invoices',
      label: t('nav.invoices'),
      icon: Receipt,
      badge: pendingInvoicesCount > 0 ? pendingInvoicesCount : null,
    },
    {
      id: 'clients',
      label: t('nav.clients'),
      icon: Users,
      badge: null,
    },
    {
      id: 'analytics',
      label: t('nav.analytics'),
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1 shadow-lg shadow-slate-900/10"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge !== null && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
