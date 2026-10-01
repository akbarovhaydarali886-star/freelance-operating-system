import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { translations } from '../translations';
import {
  initialUser,
  initialClients,
  initialTasks,
  initialInvoices,
  monthlyRevenueData,
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language state
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('worksphere_lang') || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('worksphere_lang', lang);
  }, [lang]);

  // Helper translation function t('nav.dashboard')
  const t = (path) => {
    const keys = path.split('.');
    let current = translations[lang];
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to English
        let fallback = translations['en'];
        for (const fKey of keys) {
          if (!fallback || fallback[fKey] === undefined) return path;
          fallback = fallback[fKey];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  // 2. Theme state (dark / light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('worksphere_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('worksphere_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 3. User & Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('worksphere_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('worksphere_last_page') || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('worksphere_last_page', currentPage);
  }, [currentPage]);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('worksphere_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
    addToast(t('auth.loginSuccess'), 'success');
    triggerConfetti();
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('worksphere_user');
    setCurrentPage('landing');
    addToast(t('auth.logoutSuccess'), 'info');
  };

  // 4. Data states with LocalStorage persistence
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('worksphere_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('worksphere_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('worksphere_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  useEffect(() => {
    localStorage.setItem('worksphere_clients', JSON.stringify(clients));
  }, [clients]);

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('worksphere_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  useEffect(() => {
    localStorage.setItem('worksphere_invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Currency preference: USD or UZS
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('worksphere_currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('worksphere_currency', currency);
  }, [currency]);

  // Exchange rate: 1 USD = 12,500 UZS
  const USD_TO_UZS = 12500;

  const formatMoney = (amountUSD, specificCurrency = null) => {
    const cur = specificCurrency || currency;
    if (cur === 'UZS') {
      const val = amountUSD * USD_TO_UZS;
      return new Intl.NumberFormat('uz-UZ').format(Math.round(val)) + " so'm";
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amountUSD);
  };

  // 5. Toast Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  // 6. Confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981'],
      });
    } catch {
      // ignore in tests or if canvas unsupported
    }
  };

  // 7. Time Tracker Widget
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(3600 * 2 + 14 * 60 + 20); // 2h 14m 20s

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const toggleTimer = () => {
    setTimerRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  // 8. CRUD Actions
  // Tasks
  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: `tsk-${Date.now()}`,
      loggedHours: 0,
    };
    setTasks((prev) => [task, ...prev]);
    addToast(t('projects.taskAddedSuccess'), 'success');
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
    addToast(t('projects.taskUpdatedSuccess'), 'success');
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addToast(t('projects.taskDeletedSuccess'), 'info');
  };

  const moveTaskColumn = (id, newColumn) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, column: newColumn } : t))
    );
    if (newColumn === 'done') {
      triggerConfetti();
    }
  };

  // Clients
  const addClient = (newClient) => {
    const client = {
      ...newClient,
      id: `cl-${Date.now()}`,
      totalSpentUSD: 0,
      totalSpentUZS: 0,
      projectsCount: 0,
    };
    setClients((prev) => [client, ...prev]);
    addToast(t('clients.addedSuccess'), 'success');
  };

  const updateClient = (id, updatedFields) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    addToast(t('clients.updatedSuccess'), 'success');
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    addToast(t('clients.deletedSuccess'), 'info');
  };

  // Invoices
  const addInvoice = (newInvoice) => {
    const invoice = {
      ...newInvoice,
      id: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    };
    setInvoices((prev) => [invoice, ...prev]);
    addToast(t('invoices.createdSuccess'), 'success');
    triggerConfetti();
  };

  const markInvoicePaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'paid' } : inv))
    );
    addToast(t('invoices.paidSuccess'), 'success');
    triggerConfetti();
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    addToast(t('invoices.deletedSuccess'), 'info');
  };

  // Reset sample data
  const resetToSampleData = () => {
    setTasks(initialTasks);
    setClients(initialClients);
    setInvoices(initialInvoices);
    setUser(initialUser);
    localStorage.setItem('worksphere_tasks', JSON.stringify(initialTasks));
    localStorage.setItem('worksphere_clients', JSON.stringify(initialClients));
    localStorage.setItem('worksphere_invoices', JSON.stringify(initialInvoices));
    localStorage.setItem('worksphere_user', JSON.stringify(initialUser));
    addToast(t('settings.resetSuccess'), 'success');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        theme,
        toggleTheme,
        user,
        setUser,
        loginUser,
        logoutUser,
        currentPage,
        setCurrentPage,
        currency,
        setCurrency,
        formatMoney,
        USD_TO_UZS,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTaskColumn,
        clients,
        addClient,
        updateClient,
        deleteClient,
        invoices,
        addInvoice,
        markInvoicePaid,
        deleteInvoice,
        monthlyRevenueData,
        toasts,
        addToast,
        removeToast,
        triggerConfetti,
        timerRunning,
        timerSeconds,
        toggleTimer,
        resetTimer,
        resetToSampleData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
