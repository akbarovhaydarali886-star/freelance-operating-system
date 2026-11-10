import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Globe,
  DollarSign,
  RotateCcw,
  CheckCircle2,
  Building,
  Mail,
  Shield,
  CreditCard,
  Check,
} from 'lucide-react';
import { FlagIcon } from '../common/FlagIcon';

export const SettingsView = () => {
  const {
    user,
    setUser,
    theme,
    toggleTheme,
    lang,
    setLang,
    currency,
    setCurrency,
    resetToSampleData,
    addToast,
    t,
  } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    email: user?.email || '',
    company: user?.company || '',
    hourlyRate: user?.hourlyRate || 45,
    taxId: user?.taxId || '',
    bankDetails: user?.bankDetails || '',
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, ...formData });
    localStorage.setItem('worksphere_user', JSON.stringify({ ...user, ...formData }));
    addToast(t('settings.savedSuccess'), 'success');
  };

  const languages = [
    { code: 'uz', label: "O'zbek tili (Lotin)", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский язык', flag: '🇷🇺' },
    { code: 'en', label: 'English (US / Global)', flag: '🇺🇸' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('settings.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('settings.subtitle')}
        </p>
      </div>

      {/* 1. Profile Section */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t('settings.profileSection')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personal branding and billing profile
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('settings.fullName')}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('settings.titleRole')}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('settings.email')}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('settings.companyName')}
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('settings.hourlyRate')}
              </label>
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({ ...formData, hourlyRate: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('settings.taxId')}
              </label>
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Bank Rekvizitlari (Bank Information for Invoices)
            </label>
            <input
              type="text"
              value={formData.bankDetails}
              onChange={(e) => setFormData({ ...formData, bankDetails: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition"
            >
              {t('settings.saveBtn')}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Preferences & Appearance */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {t('settings.systemSection')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize language, theme, and currency
            </p>
          </div>
        </div>

        {/* Theme mode cards */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            {t('settings.themeLabel')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                if (theme !== 'light') toggleTheme();
              }}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50/60 text-indigo-700 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="text-xs">{t('common.lightMode')}</span>
              </div>
              {theme === 'light' && <Check className="w-4 h-4 text-indigo-600" />}
            </button>

            <button
              type="button"
              onClick={() => {
                if (theme !== 'dark') toggleTheme();
              }}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-950/50 text-indigo-300 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-indigo-400" />
                <span className="text-xs">{t('common.darkMode')}</span>
              </div>
              {theme === 'dark' && <Check className="w-4 h-4 text-indigo-400" />}
            </button>
          </div>
        </div>

        {/* 3-Language switch: UZ, RU, EN */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            {t('settings.langLabel')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                  lang === l.code
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FlagIcon code={l.code} className="w-6 h-4 rounded-[2px] shadow-sm" />
                  <span className="text-xs font-semibold">{l.label}</span>
                </div>
                {lang === l.code && (
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Default Currency */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            {t('settings.currencyLabel')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                currency === 'USD'
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-indigo-500" />
                <span className="text-xs">USD ($) - US Dollar</span>
              </div>
              {currency === 'USD' && (
                <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setCurrency('UZS')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                currency === 'UZS'
                  ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-500">UZS</span>
                <span className="text-xs">UZS (so'm) - O'zbekiston</span>
              </div>
              {currency === 'UZS' && (
                <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Demo Data Reset */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
          {t('settings.dataSection')}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t('settings.resetWarning')}
        </p>

        <button
          onClick={resetToSampleData}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('settings.resetBtn')}</span>
        </button>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
          {t('settings.version')}
        </div>
      </div>
    </div>
  );
};
