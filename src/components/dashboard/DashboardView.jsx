import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Receipt,
  CheckSquare,
  Users,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  ArrowUpRight,
  Sparkles,
  Calendar,
  AlertCircle,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';

export const DashboardView = () => {
  const {
    t,
    user,
    tasks,
    invoices,
    clients,
    monthlyRevenueData,
    currency,
    formatMoney,
    setCurrentPage,
    timerRunning,
    timerSeconds,
    toggleTimer,
    resetTimer,
    markInvoicePaid,
  } = useApp();

  // Calculations
  const totalRevenueUSD = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => {
      if (inv.currency === 'USD') return sum + inv.total;
      return sum + inv.total / 12500;
    }, 0);

  const pendingRevenueUSD = invoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, inv) => {
      if (inv.currency === 'USD') return sum + inv.total;
      return sum + inv.total / 12500;
    }, 0);

  const activeTasks = tasks.filter((t) => t.column !== 'done');
  const completedTasks = tasks.filter((t) => t.column === 'done');
  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  // Hourly earnings today from timer
  const hourlyRate = user?.hourlyRate || 40;
  const hoursWorked = timerSeconds / 3600;
  const earnedFromTimerUSD = Math.round(hoursWorked * hourlyRate);

  // Format timer
  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Max revenue for relative bar heights
  const maxRevenue = Math.max(...monthlyRevenueData.map((d) => d.revenueUSD));

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>
              {t('dashboard.greeting')}, {user ? user.name.split(' ')[0] : 'Freelancer'}!
            </span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {t('dashboard.overview')}
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCurrentPage('projects')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('dashboard.newProject')}</span>
          </button>

          <button
            onClick={() => setCurrentPage('invoices')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition active:scale-95"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>{t('dashboard.newInvoice')}</span>
          </button>
        </div>
      </div>

      {/* 1. KEY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('dashboard.totalRevenue')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatMoney(totalRevenueUSD)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.5% vs last month</span>
          </div>
        </div>

        {/* Card 2: Active Projects / Tasks */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('dashboard.activeProjects')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {activeTasks.length}{' '}
            <span className="text-xs font-normal text-slate-400">
              / {tasks.length} total
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>Kanban Flow Active</span>
          </div>
        </div>

        {/* Card 3: Pending Invoices */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('dashboard.pendingInvoices')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatMoney(pendingRevenueUSD)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>
              {invoices.filter((i) => i.status === 'pending').length} unpaid invoices
            </span>
          </div>
        </div>

        {/* Card 4: Task Completion */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t('dashboard.taskCompletion')}
            </span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {completionRate}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: REVENUE CHART & LIVE TIME TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {t('dashboard.monthlyEarnings')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Past 6 months growth performance
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50">
              +195% Growth
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {monthlyRevenueData.map((item, idx) => {
              const heightPercent = Math.round((item.revenueUSD / maxRevenue) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-slate-700 dark:text-slate-300 -translate-y-1">
                    {formatMoney(item.revenueUSD)}
                  </div>
                  <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800/80 rounded-xl p-1 h-44 flex items-end">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-indigo-600 via-indigo-500 to-violet-500 transition-all duration-500 group-hover:brightness-110 shadow-sm"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-full">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Billable Time Tracker Widget */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-900/10 via-white to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-extrabold">{t('dashboard.timeTracker')}</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  timerRunning
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 animate-pulse'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {timerRunning ? 'RECORDING' : 'IDLE'}
              </span>
            </div>

            <div className="my-6 text-center">
              <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-slate-900 dark:text-white">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                {t('dashboard.loggedHours')} • {t('dashboard.billableRate')}: ${hourlyRate}/hr
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {t('dashboard.earnedToday')}:
              </span>
              <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                {formatMoney(earnedFromTimerUSD)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={toggleTimer}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition ${
                timerRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
              }`}
            >
              {timerRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>{t('dashboard.stopTimer')}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{t('dashboard.startTimer')}</span>
                </>
              )}
            </button>
            <button
              onClick={resetTimer}
              title={t('dashboard.resetTimer')}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: RECENT INVOICES & RECENT TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t('dashboard.recentInvoices')}
            </h2>
            <button
              onClick={() => setCurrentPage('invoices')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>{t('common.all')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoices.slice(0, 4).map((inv) => (
              <div key={inv.id} className="py-3.5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {inv.clientName}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {inv.id} • {inv.issueDate}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {inv.currency === 'USD'
                        ? `$${inv.total.toLocaleString()}`
                        : `${inv.total.toLocaleString()} so'm`}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inv.status === 'paid'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {inv.status === 'paid' ? t('common.paid') : t('common.pending')}
                    </span>
                  </div>

                  {inv.status === 'pending' && (
                    <button
                      onClick={() => markInvoicePaid(inv.id)}
                      title={t('invoices.markAsPaid')}
                      className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tasks In Progress */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t('projects.title')}
            </h2>
            <button
              onClick={() => setCurrentPage('projects')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>{t('common.all')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-indigo-500/30 transition"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {task.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {task.clientName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    task.priority === 'urgent'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                      : task.priority === 'high'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {t(`common.${task.priority}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
