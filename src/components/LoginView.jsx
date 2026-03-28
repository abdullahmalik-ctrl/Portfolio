import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Sparkles } from 'lucide-react';

const AUTH_MODES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FORGOT: 'forgot',
};

function mapAuthError(error) {
  if (error.code === 'auth/unavailable') {
    return 'Login is disabled in this public demo build.';
  }
  if (error.code === 'auth/invalid-credential') return 'Invalid email or password.';
  if (error.code === 'auth/email-already-in-use') return 'This email is already in use.';
  if (error.code === 'auth/invalid-email') return 'Please enter a valid email address.';
  if (error.code === 'auth/weak-password') return 'Password must be at least 6 characters.';
  if (error.code === 'auth/popup-closed-by-user') return '';
  if (error.code === 'auth/cancelled-popup-request') return 'Another sign-in popup is already open.';
  if (error.code === 'auth/account-exists-with-different-credential') {
    return 'This email already exists with another provider.';
  }
  if (error.code === 'auth/too-many-requests') return 'Too many attempts. Try again in a few minutes.';
  if (error.code === 'auth/network-request-failed') return 'Network error. Check your connection.';
  return 'Request failed. Please try again.';
}

export function LoginView({ onLogin, onSignUp, onForgotPassword, onGoogleLogin }) {
  const [mode, setMode] = useState(AUTH_MODES.LOGIN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (mode === AUTH_MODES.LOGIN) {
        await onLogin(email, password);
      }

      if (mode === AUTH_MODES.SIGNUP) {
        await onSignUp(name, email, password);
      }

      if (mode === AUTH_MODES.FORGOT) {
        await onForgotPassword(email);
        setSuccessMessage('Password reset email sent.');
      }
    } catch (error) {
      setErrorMessage(mapAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    if (mode === AUTH_MODES.SIGNUP) return 'Create Your Account';
    if (mode === AUTH_MODES.FORGOT) return 'Forgot Password?';
    return 'Welcome Back!';
  };

  const getDescription = () => {
    if (mode === AUTH_MODES.SIGNUP) return 'Create your account to access your private client dashboard.';
    if (mode === AUTH_MODES.FORGOT) return 'Enter your email and we will send a reset link instantly.';
    return 'Sign in to access smart, personalized project updates and services.';
  };

  const getButtonLabel = () => {
    if (isSubmitting && mode === AUTH_MODES.LOGIN) return 'Signing In...';
    if (isSubmitting && mode === AUTH_MODES.SIGNUP) return 'Creating Account...';
    if (isSubmitting && mode === AUTH_MODES.FORGOT) return 'Sending Link...';
    if (mode === AUTH_MODES.SIGNUP) return 'Register';
    if (mode === AUTH_MODES.FORGOT) return 'Send Code';
    return 'Sign In';
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleGoogleClick = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      await onGoogleLogin();
    } catch (error) {
      const message = mapAuthError(error);
      if (message) {
        setErrorMessage(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-10">
      <div className="relative w-full max-w-sm animate-fade-in-up">
        <div className="absolute -inset-2 bg-gradient-to-br from-purple-600/30 via-cyan-500/10 to-pink-500/20 blur-2xl rounded-[2.4rem]" />

        <div className="relative rounded-[2.2rem] border border-white/15 bg-black/70 backdrop-blur-2xl shadow-[0_25px_80px_rgba(2,6,23,0.75)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 w-[24rem] h-[24rem] rounded-full bg-purple-600/20 blur-3xl" />
            <div className="absolute top-20 right-[-5rem] w-[14rem] h-[14rem] rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          <div className="relative px-6 pt-6 pb-5">
            <div className="text-center mb-7">
              <div className="relative w-20 h-20 rounded-full mx-auto mb-5 border border-purple-300/40 bg-gradient-to-b from-purple-500/35 to-black/40 flex items-center justify-center shadow-[0_0_28px_rgba(168,85,247,0.55)]">
                <div className="absolute inset-0 rounded-full border border-cyan-300/20 scale-125" />
                <Mail size={28} className="text-purple-100" />
              </div>
              <h2 className="text-3xl leading-tight font-bold text-white">{getTitle()}</h2>
              <p className="text-slate-300/80 mt-2 text-sm leading-6 px-3">{getDescription()}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === AUTH_MODES.SIGNUP && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Full Name*</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 focus:border-purple-400 text-white outline-none transition placeholder:text-slate-500"
                    placeholder="Alex Smith"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email address*</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 focus:border-purple-400 text-white outline-none transition placeholder:text-slate-500"
                  placeholder="example@gmail.com"
                />
              </div>

              {mode !== AUTH_MODES.FORGOT && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Password*</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 pr-12 rounded-xl bg-black/40 border border-white/15 focus:border-purple-400 text-white outline-none transition placeholder:text-slate-500"
                      placeholder="@Sn123hsn#"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === AUTH_MODES.LOGIN && (
                <div className="flex items-center justify-between pt-0.5">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-black/40"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => switchMode(AUTH_MODES.FORGOT)}
                    className="text-xs text-purple-300 hover:text-purple-200 font-semibold transition"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1 bg-gradient-to-r from-purple-500 to-cyan-400 text-slate-900 font-extrabold py-3.5 rounded-2xl hover:brightness-105 transition shadow-[0_10px_30px_rgba(34,211,238,0.25)] disabled:opacity-70"
              >
                {mode === AUTH_MODES.FORGOT ? (
                  <span className="inline-flex items-center gap-2">
                    <Sparkles size={16} /> {getButtonLabel()}
                  </span>
                ) : (
                  getButtonLabel()
                )}
              </button>

              {mode !== AUTH_MODES.FORGOT && (
                <>
                  <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
                    <span className="h-px flex-1 bg-white/10" />
                    <span>Or continue with</span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleGoogleClick}
                    className="w-full border border-white/20 bg-white/5 text-white font-semibold py-3.5 rounded-2xl hover:bg-white/10 transition flex items-center justify-center gap-3"
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3C33.65 32.66 29.23 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.95 3.03l5.66-5.66C34.07 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z" />
                      <path fill="#FF3D00" d="M6.31 14.69l6.57 4.82C14.66 15.12 18.96 12 24 12c3.06 0 5.84 1.15 7.95 3.03l5.66-5.66C34.07 6.05 29.27 4 24 4c-7.68 0-14.32 4.34-17.69 10.69z" />
                      <path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.98 13.41-5.2l-6.19-5.24C29.15 35.09 26.67 36 24 36c-5.21 0-9.62-3.32-11.29-7.95l-6.52 5.02C9.53 39.56 16.21 44 24 44z" />
                      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3c-.78 2.46-2.35 4.45-4.49 5.56l6.19 5.24C36.56 39.2 44 34 44 24c0-1.34-.14-2.65-.39-3.92z" />
                    </svg>
                    Continue with Google
                  </button>
                </>
              )}

              {errorMessage && <p className="text-center text-sm text-red-400">{errorMessage}</p>}
              {successMessage && <p className="text-center text-sm text-emerald-400">{successMessage}</p>}

              <div className="text-center text-xs text-slate-400 pt-1">
                {mode === AUTH_MODES.LOGIN && (
                  <p>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode(AUTH_MODES.SIGNUP)}
                      className="text-purple-300 hover:text-purple-200 font-semibold"
                    >
                      Sign Up
                    </button>
                  </p>
                )}
                {mode === AUTH_MODES.SIGNUP && (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode(AUTH_MODES.LOGIN)}
                      className="text-purple-300 hover:text-purple-200 font-semibold"
                    >
                      Sign In
                    </button>
                  </p>
                )}
                {mode === AUTH_MODES.FORGOT && (
                  <p>
                    Remember your password?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode(AUTH_MODES.LOGIN)}
                      className="text-purple-300 hover:text-purple-200 font-semibold"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
