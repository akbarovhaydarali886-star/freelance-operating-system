import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${
              isSuccess
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200'
                : isError
                ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-700/60 text-rose-900 dark:text-rose-200'
                : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-500 shrink-0" />}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md opacity-70 hover:opacity-100 transition hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
