import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Moon,
  Globe,
  DollarSign,
  Play,
  Pause,
  Layers,
  ArrowRight,
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  ChevronDown,
  Check,
} from 'lucide-react';
import { FlagIcon } from './FlagIcon';

export const Navbar = () => {
  const {
    lang,
    setLang,
    theme,
    toggleTheme,
    currency,
    setCurrency,
    currentPage,
    setCurrentPage,
    user,
    logoutUser,
    timerRunning,
    timerSeconds,
    toggleTimer,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef(null);

  // Close lang menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format seconds to HH:MM:SS
  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const languages = [
    { code: 'uz', label: "O'zbekcha", flag: '🇺🇿', short: 'UZ' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺', short: 'RU' },
    { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
  ];

  const currentLangObj = languages.find((l) => l.code === lang) || languages[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentPage(user ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent flex items-center gap-1.5">
                WorkSphere
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block -mt-1 font-medium">
                Freelance & Agency OS
              </span>
            </div>
          </button>

          {/* Quick toggle to Landing or Dashboard */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setCurrentPage('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentPage === 'landing'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('nav.landing')}
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentPage !== 'landing' && currentPage !== 'auth'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t('nav.dashboard')}
            </button>
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Live Billable Timer widget */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/70 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                timerRunning ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
              }`}
            />
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
              {formatTimer(timerSeconds)}
            </span>
            <button
              onClick={toggleTimer}
              title={timerRunning ? t('dashboard.stopTimer') : t('dashboard.startTimer')}
              className={`p-1 rounded-full transition ${
                timerRunning
                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 hover:bg-amber-200'
                  : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200'
              }`}
            >
              {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>

          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'UZS' : 'USD')}
            title="Valyutani almashtirish / Сменить валюту / Switch currency"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
            <span>{currency === 'USD' ? 'USD ($)' : "UZS (so'm)"}</span>
          </button>

          {/* Language Switcher Dropdown (UZ / RU / EN) */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              title="Tilni almashtirish / Выбрать язык / Choose language"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              <FlagIcon code={currentLangObj.code} className="w-5 h-3.5 rounded-[2px] shadow-xs" />
              <span>{currentLangObj.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-left transition ${
                      lang === l.code
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon code={l.code} className="w-5 h-3.5 rounded-[2px] shadow-xs" />
                      <span className="font-semibold">{l.label}</span>
                    </div>
                    {lang === l.code && <Check className="w-4 h-4 text-indigo-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-200" />
            )}
          </button>

          {/* User Profile or Auth */}
          {user ? (
            <div className="flex items-center gap-2 pl-2">
              <button
                onClick={() => setCurrentPage('settings')}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover border border-indigo-500/40"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                    {user.company}
                  </div>
                </div>
              </button>
              <button
                onClick={logoutUser}
                title={t('nav.logout')}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentPage('auth')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('nav.login')}</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3">
          {/* 3-Language Mobile Switcher */}
          <div className="grid grid-cols-3 gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-semibold ${
                  lang === l.code
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <FlagIcon code={l.code} className="w-5 h-3.5 rounded-[2px] shadow-xs" />
                <span className="truncate">{l.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1.5">
            <button
              onClick={() => {
                setCurrentPage('landing');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t('nav.landing')}
            </button>
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t('nav.dashboard')}
            </button>
            <button
              onClick={() => {
                setCurrentPage('projects');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t('nav.projects')}
            </button>
            <button
              onClick={() => {
                setCurrentPage('invoices');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t('nav.invoices')}
            </button>
            <button
              onClick={() => {
                setCurrentPage('clients');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t('nav.clients')}
            </button>
            <button
              onClick={() => {
                setCurrentPage('analytics');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t('nav.analytics')}
            </button>
            <button
              onClick={() => {
                setCurrentPage('settings');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t('nav.settings')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
