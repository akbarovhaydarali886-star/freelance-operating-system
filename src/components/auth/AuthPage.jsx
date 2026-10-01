import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  Lock,
  Mail,
  User,
  Building,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Check,
  X,
} from 'lucide-react';
import { initialUser } from '../../data/initialData';

export const AuthPage = () => {
  const { t, loginUser, addToast, setCurrentPage } = useApp();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Touched states for inline errors
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation rules
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = emailRegex.test(email.trim());

  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber;

  // Password strength score (0 to 3)
  const calculateStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (hasMinLength) score++;
    if (hasLetter && hasNumber) score++;
    if (password.length >= 10 && hasSpecial) score++;
    return score;
  };
  const strengthScore = calculateStrength();

  const isNameValid = fullName.trim().length >= 3;
  const isCompanyValid = companyName.trim().length >= 2;
  const doPasswordsMatch = password === confirmPassword;

  // Form validity
  const isLoginFormValid = isEmailValid && hasMinLength;
  const isRegisterFormValid =
    isEmailValid && isPasswordValid && isNameValid && isCompanyValid && doPasswordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'forgot') {
      if (!isEmailValid) {
        addToast(t('auth.errors.emailInvalid'), 'error');
        return;
      }
      addToast(t('auth.resetSent'), 'success');
      setMode('login');
      return;
    }

    if (mode === 'login') {
      if (!isLoginFormValid) {
        addToast(t('auth.errors.emailInvalid') + ' / ' + t('auth.errors.passwordMin'), 'error');
        return;
      }
      loginUser({
        name: email.split('@')[0],
        email: email,
        company: 'WorkSphere Member',
        title: 'Software Engineer',
        hourlyRate: 45,
        taxId: 'STIR 308 945 120',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      });
    } else {
      if (!isRegisterFormValid) {
        if (!isEmailValid) addToast(t('auth.errors.emailInvalid'), 'error');
        else if (!isPasswordValid) addToast(t('auth.errors.passwordStrength'), 'error');
        else if (!doPasswordsMatch) addToast(t('auth.errors.passwordMismatch'), 'error');
        else if (!isNameValid) addToast(t('auth.errors.nameRequired'), 'error');
        return;
      }
      loginUser({
        name: fullName,
        email: email,
        company: companyName,
        title: 'Agency Founder & Product Lead',
        hourlyRate: 50,
        taxId: 'STIR 409 112 889',
        avatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      });
    }
  };

  const handleQuickDemoFreelancer = () => {
    loginUser(initialUser);
  };

  const handleQuickDemoAgency = () => {
    loginUser({
      name: 'Elena Rostova',
      email: 'elena@apexfin.ae',
      company: 'Apex Global FinTech Dubai',
      title: 'Managing Director & Founder',
      hourlyRate: 85,
      taxId: 'AE-TRN 100 456 789',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        {/* Top Brand Tag */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 text-white shadow-lg shadow-indigo-500/30 mb-2">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {mode === 'login'
              ? t('auth.welcomeBack')
              : mode === 'register'
              ? t('auth.registerTitle')
              : t('auth.forgotPass')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {mode === 'login'
              ? t('auth.signInSub')
              : mode === 'register'
              ? t('auth.registerSub')
              : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* 1-Click Instant Demo Login (Reviewer Favorite!) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800/80 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>{t('auth.quickDemo')}</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={handleQuickDemoFreelancer}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t('auth.demoFreelancer')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleQuickDemoAgency}
              className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-bold transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>{t('auth.demoAgency')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic text-center">
            {t('auth.demoNote')}
          </p>
        </div>

        {/* Regular Auth Card with Enhanced Validations */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          {/* Mode Switcher Tabs */}
          {mode !== 'forgot' && (
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('auth.loginBtn')}
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t('auth.registerBtn')}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (in Register) */}
            {mode === 'register' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('auth.fullName')} *
                  </label>
                  {touched.fullName && (
                    <span className="text-[10px]">
                      {isNameValid ? (
                        <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      ) : (
                        <span className="text-rose-500 font-bold">Min 3 chars</span>
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onBlur={() => handleBlur('fullName')}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alisher Qodirov"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition ${
                      touched.fullName && !isNameValid
                        ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Company Name (in Register) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('auth.companyName')} *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onBlur={() => handleBlur('companyName')}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Creative Labs"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email Field with Regex Feedback */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('auth.email')} *
                </label>
                {touched.email && (
                  <span className="text-[10px]">
                    {isEmailValid ? (
                      <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Email OK
                      </span>
                    ) : (
                      <span className="text-rose-500 font-bold">
                        {t('auth.errors.emailInvalid')}
                      </span>
                    )}
                  </span>
                )}
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onBlur={() => handleBlur('email')}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alisher@apexcreative.dev"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition ${
                    touched.email && !isEmailValid
                      ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'
                  }`}
                />
              </div>
            </div>

            {/* Password Field (not shown in Forgot mode) */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('auth.password')} *
                  </label>
                  {touched.password && (
                    <span className="text-[10px]">
                      {isPasswordValid ? (
                        <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> OK
                        </span>
                      ) : (
                        <span className="text-amber-500 font-bold">
                          Min 8 chars, 1 letter, 1 number
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onBlur={() => handleBlur('password')}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition ${
                      touched.password && !isPasswordValid
                        ? 'border-amber-400 bg-amber-50/30 dark:bg-amber-950/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          strengthScore >= 1
                            ? strengthScore === 1
                              ? 'w-1/3 bg-rose-500'
                              : strengthScore === 2
                              ? 'w-2/3 bg-amber-500'
                              : 'w-full bg-emerald-500'
                            : 'w-0'
                        }`}
                      />
                    </div>
                    <div className="text-[10px] text-right font-bold">
                      {strengthScore <= 1 && (
                        <span className="text-rose-500">{t('auth.strengthWeak')}</span>
                      )}
                      {strengthScore === 2 && (
                        <span className="text-amber-500">{t('auth.strengthMedium')}</span>
                      )}
                      {strengthScore === 3 && (
                        <span className="text-emerald-500">{t('auth.strengthStrong')}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Confirm Password in Register mode */}
            {mode === 'register' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('auth.confirmPassword')} *
                  </label>
                  {touched.confirmPassword && (
                    <span className="text-[10px]">
                      {doPasswordsMatch && password ? (
                        <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Matches
                        </span>
                      ) : (
                        <span className="text-rose-500 font-bold">
                          {t('auth.errors.passwordMismatch')}
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onBlur={() => handleBlur('confirmPassword')}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs font-medium focus:outline-none transition ${
                      touched.confirmPassword && (!doPasswordsMatch || !password)
                        ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20 text-slate-900 dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot password link */}
            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 font-medium">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{t('auth.rememberMe')}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                >
                  {t('auth.forgotPass')}
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition active:scale-98"
            >
              {mode === 'login'
                ? t('auth.loginBtn')
                : mode === 'register'
                ? t('auth.registerBtn')
                : 'Send Password Reset Link'}
            </button>

            {/* Return to login if in forgot mode */}
            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 pt-2"
              >
                Back to Sign In
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
