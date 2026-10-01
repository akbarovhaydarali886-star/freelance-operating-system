import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Activity,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';

export const AnalyticsView = () => {
  const { clients, invoices, tasks, t, formatMoney } = useApp();

  const totalRevenueUSD = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => (i.currency === 'USD' ? sum + i.total : sum + i.total / 12500), 0);

  const pendingRevenueUSD = invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => (i.currency === 'USD' ? sum + i.total : sum + i.total / 12500), 0);

  const totalInvoiced = totalRevenueUSD + pendingRevenueUSD;
  const collectionRatio =
    totalInvoiced > 0 ? Math.round((totalRevenueUSD / totalInvoiced) * 100) : 0;

  const avgProjectValue =
    clients.length > 0 ? Math.round(totalInvoiced / clients.length) : 0;

  // Client breakdown
  const maxClientSpent = Math.max(...clients.map((c) => c.totalSpentUSD || 1000));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('analytics.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('analytics.subtitle')}
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              {t('analytics.avgProjectValue')}
            </span>
            <DollarSign className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatMoney(avgProjectValue)}
          </div>
          <div className="text-xs text-emerald-500 font-bold mt-1">
            +18% from last quarter
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              {t('analytics.efficiencyScore')}
            </span>
            <Activity className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            96.4%
          </div>
          <div className="text-xs text-indigo-500 font-bold mt-1">
            Top tier performance
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              {t('analytics.paidVsPending')}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {collectionRatio}% Paid
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${collectionRatio}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">
              {t('analytics.monthlyGrowth')}
            </span>
            <TrendingUp className="w-4 h-4 text-pink-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            +34.8%
          </div>
          <div className="text-xs text-slate-400 mt-1">Consistent upward climb</div>
        </div>
      </div>

      {/* Middle Row: Revenue By Client & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue By Client */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              {t('analytics.revenueByClient')}
            </h3>
            <span className="text-xs text-slate-400">Total: {clients.length} Clients</span>
          </div>

          <div className="space-y-4">
            {clients.map((client) => {
              const spent = client.totalSpentUSD || 0;
              const percent = Math.round((spent / maxClientSpent) * 100);

              return (
                <div key={client.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">
                      {client.company}
                    </span>
                    <span className="text-slate-900 dark:text-white font-extrabold">
                      {formatMoney(spent)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deliverables & Streams */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Service Stream Breakdown
            </h3>
            <span className="text-xs text-indigo-500 font-bold">100% Billable</span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Full-Stack Web & SaaS Dev', pct: 45, color: 'bg-indigo-500' },
              { label: 'Mobile & Telegram Apps', pct: 25, color: 'bg-violet-500' },
              { label: 'UI/UX & Design Systems', pct: 20, color: 'bg-pink-500' },
              { label: 'Architecture & DevOps Consulting', pct: 10, color: 'bg-emerald-500' },
            ].map((stream, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${stream.color}`} />
                    <span className="text-slate-700 dark:text-slate-300">{stream.label}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {stream.pct}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${stream.color} h-full rounded-full`}
                    style={{ width: `${stream.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 flex items-center gap-3">
            <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">Pro Tip:</strong> Your hourly
              rate of <strong>${user?.hourlyRate || 45}/hr</strong> is optimal for Central Asian
              and Middle Eastern clients.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
