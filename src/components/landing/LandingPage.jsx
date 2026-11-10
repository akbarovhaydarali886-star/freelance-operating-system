import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Receipt,
  Users,
  KanbanSquare,
  Clock,
  ShieldCheck,
  ChevronDown,
  Layers,
  Zap,
  TrendingUp,
  Globe,
  DollarSign,
  Star,
  Check,
} from 'lucide-react';

export const LandingPage = () => {
  const { t, setCurrentPage, formatMoney, currency, setCurrency, setLang, lang } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: t('landing.faq1Q'), a: t('landing.faq1A') },
    { q: t('landing.faq2Q'), a: t('landing.faq2A') },
    { q: t('landing.faq3Q'), a: t('landing.faq3A') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] overflow-hidden pointer-events-none -z-10 opacity-40 dark:opacity-20">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[140px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[140px]" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Release Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-8 hover:scale-105 transition-transform cursor-pointer">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>{t('landing.badge')}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.15] mb-6 break-words">
          <span>{t('landing.heroTitle1')} </span>
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
            {t('landing.heroTitle2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          {t('landing.heroSubtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{t('landing.openAppBtn')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('features-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800/80 transition shadow-sm"
          >
            {t('landing.featuresBtn')}
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://images.unsplash.com/photo-${1500000000000 + i * 12345}?auto=format&fit=crop&q=80&w=64&h=64`}
                alt="user"
                className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {t('landing.satisfaction')}
            </span>
            <span>• {t('landing.activeUsersCount')}</span>
          </div>
        </div>

        {/* Interactive App Preview Showcase Box */}
        <div className="mt-14 p-2 sm:p-4 rounded-3xl bg-gradient-to-b from-slate-200/60 to-slate-200/20 dark:from-slate-800/60 dark:to-slate-900/20 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 text-left">
            {/* Mock Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                </div>
                <span className="text-xs font-mono font-medium text-slate-400 truncate max-w-[130px] sm:max-w-none">
                  worksphere.app/workspace/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  ● Live Data Synchronized
                </span>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Enter App
                </button>
              </div>
            </div>

            {/* Quick Metrics in Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  {t('dashboard.totalRevenue')}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatMoney(24800)}
                </div>
                <div className="text-xs text-emerald-500 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +32% this month
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  {t('dashboard.activeProjects')}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  6 Active Tasks
                </div>
                <div className="text-xs text-indigo-500 font-bold mt-1">
                  Kanban Flow Active
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  {t('dashboard.pendingInvoices')}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {formatMoney(7640)}
                </div>
                <div className="text-xs text-amber-500 font-bold mt-1">
                  2 Invoices awaiting payment
                </div>
              </div>
            </div>

            {/* Micro Kanban Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                <span className="text-[11px] font-bold uppercase text-slate-400 mb-2 block">
                  To Do (2)
                </span>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Next.js 15 Server Components & SEO
                  </div>
                  <div className="text-slate-500 text-[10px]">CloudScale Inc.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-dashed border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20">
                <span className="text-[11px] font-bold uppercase text-indigo-500 mb-2 block">
                  In Progress (2)
                </span>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/60 shadow-sm text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">
                    FinTech Mobile App Redesign
                  </div>
                  <div className="text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                    Payme Ecosystem • High Priority
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-dashed border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20">
                <span className="text-[11px] font-bold uppercase text-emerald-500 mb-2 block">
                  Completed (2)
                </span>
                <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 shadow-sm text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white line-through text-slate-400">
                    E-Commerce REST API & Telegram Bot
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    Delivered & Paid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
              {t('landing.metric1Value')}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {t('landing.metric1Label')}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-violet-600 dark:text-violet-400 mb-1">
              {t('landing.metric2Value')}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {t('landing.metric2Label')}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-pink-600 dark:text-pink-400 mb-1">
              {t('landing.metric3Value')}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {t('landing.metric3Label')}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
              {t('landing.metric4Value')}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {t('landing.metric4Label')}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section id="features-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {t('landing.featuresTitle')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            {t('landing.featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <KanbanSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('landing.feature1Title')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('landing.feature1Desc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-violet-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('landing.feature2Title')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('landing.feature2Desc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-pink-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('landing.feature3Title')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('landing.feature3Desc')}
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('landing.feature4Title')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('landing.feature4Desc')}
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('landing.feature5Title')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('landing.feature5Desc')}
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t('landing.feature6Title')}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('landing.feature6Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRICING TIERS */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {t('landing.pricingTitle')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-6">
              {t('landing.pricingSubtitle')}
            </p>

            {/* Currency toggle for pricing */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  currency === 'USD'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('UZS')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  currency === 'UZS'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                UZS (so'm)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Starter */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{t('landing.planStarter')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {t('landing.planStarterDesc')}
                </p>
                <div className="text-3xl sm:text-4xl font-extrabold mb-6">
                  {currency === 'USD' ? '$0' : "0 so'm"}
                  <span className="text-xs font-normal text-slate-400"> / free forever</span>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    t('landing.planStarterF1'),
                    t('landing.planStarterF2'),
                    t('landing.planStarterF3'),
                    t('landing.planStarterF4'),
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {t('landing.ctaBtn')}
              </button>
            </div>

            {/* Pro - Featured */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-900/10 via-white to-white dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl relative flex flex-col justify-between transform lg:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold shadow-md">
                POPULAR CHOICE
              </span>
              <div>
                <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">
                  {t('landing.planPro')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {t('landing.planProDesc')}
                </p>
                <div className="text-3xl sm:text-4xl font-extrabold mb-6 text-slate-900 dark:text-white">
                  {currency === 'USD' ? '$12' : "150 000 so'm"}
                  <span className="text-xs font-normal text-slate-400">{t('landing.planProPeriod')}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    t('landing.planProF1'),
                    t('landing.planProF2'),
                    t('landing.planProF3'),
                    t('landing.planProF4'),
                    t('landing.planProF5'),
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 font-medium">
                      <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition active:scale-98"
              >
                {t('landing.ctaBtn')}
              </button>
            </div>

            {/* Agency */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{t('landing.planAgency')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {t('landing.planAgencyDesc')}
                </p>
                <div className="text-3xl sm:text-4xl font-extrabold mb-6">
                  {currency === 'USD' ? '$39' : "485 000 so'm"}
                  <span className="text-xs font-normal text-slate-400">{t('landing.planAgencyPeriod')}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    t('landing.planAgencyF1'),
                    t('landing.planAgencyF2'),
                    t('landing.planAgencyF3'),
                    t('landing.planAgencyF4'),
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {t('landing.ctaBtn')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t('landing.faqTitle')}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-base hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION BOTTOM BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('landing.ctaBannerTitle')}
            </h2>
            <p className="text-indigo-100 text-base sm:text-lg">
              {t('landing.ctaBannerSub')}
            </p>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="px-8 py-4 rounded-2xl bg-white text-indigo-700 hover:bg-slate-100 font-extrabold text-base shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>{t('landing.ctaBannerBtn')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 text-sm text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              WorkSphere
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs font-semibold">
            <button onClick={() => setCurrentPage('dashboard')} className="hover:underline">
              {t('nav.dashboard')}
            </button>
            <button onClick={() => setCurrentPage('projects')} className="hover:underline">
              {t('nav.projects')}
            </button>
            <button onClick={() => setCurrentPage('invoices')} className="hover:underline">
              {t('nav.invoices')}
            </button>
            <button onClick={() => setCurrentPage('settings')} className="hover:underline">
              {t('nav.settings')}
            </button>
          </div>
          <div className="text-xs">
            © {new Date().getFullYear()} WorkSphere. {t('nav.allRights')}.
          </div>
        </div>
      </footer>
    </div>
  );
};
