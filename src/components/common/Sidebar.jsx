import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CheckSquare,
  Receipt,
  Users,
  BarChart3,
  Settings,
  Sparkles,
  ExternalLink,
  PlusCircle,
} from 'lucide-react';

export const Sidebar = () => {
  const { currentPage, setCurrentPage, tasks, invoices, clients, t } = useApp();

  const pendingInvoicesCount = invoices.filter((i) => i.status === 'pending').length;
  const activeTasksCount = tasks.filter((task) => task.column !== 'done').length;

  const navItems = [
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
      badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300',
    },
    {
      id: 'invoices',
      label: t('nav.invoices'),
      icon: Receipt,
      badge: pendingInvoicesCount > 0 ? pendingInvoicesCount : null,
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
    },
    {
      id: 'clients',
      label: t('nav.clients'),
      icon: Users,
      badge: clients.length,
      badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
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
    <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md hidden lg:flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      {/* Navigation List */}
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Workspace
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Pro Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              WorkSphere Pro
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              Unlimited Storage
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('landing.badge')}
        </p>
        <button
          onClick={() => setCurrentPage('landing')}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 text-xs font-bold hover:shadow-sm transition"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
