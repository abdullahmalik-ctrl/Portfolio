import React, { useState } from 'react';
import { Menu, X, User, LogOut, Terminal } from 'lucide-react';

export function Navigation({ profile, nav, appUser, navigate, onLogout, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className="sticky top-4 z-40 mx-auto max-w-5xl px-4 transition-all duration-300">
      <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center shadow-2xl shadow-black/20">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('home')}
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:rotate-12 transition-all duration-500">
            <Terminal size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            {profile.name}<span className="text-purple-400">.dev</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
          <button
            onClick={() => navigate('home')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              nav.name === 'home'
                ? 'bg-white/10 text-white shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => navigate('all-skills')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              nav.name === 'all-skills'
                ? 'bg-white/10 text-white shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => navigate('all-projects')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              nav.name === 'all-projects'
                ? 'bg-white/10 text-white shadow-inner'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              if (nav.name !== 'home') {
                navigate('home', null);
                setTimeout(
                  () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                  100
                );
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/5"
          >
            Contact
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {appUser ? (
            <button
              onClick={() => navigate('dashboard')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-purple-600/80 hover:bg-purple-500 rounded-full transition shadow-lg shadow-purple-900/20"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('login')}
              className="p-2 text-slate-400 hover:text-white transition"
            >
              <User size={20} />
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-panel rounded-3xl p-6 animate-fade-in-up z-50">
          <button
            onClick={() => navigate('home')}
            className="block w-full text-left font-bold text-white py-3 border-b border-white/10"
          >
            Portfolio
          </button>
          <button
            onClick={() => navigate('all-skills')}
            className="block w-full text-left font-bold text-white py-3 border-b border-white/10"
          >
            Skills
          </button>
          <button
            onClick={() => navigate('all-projects')}
            className="block w-full text-left font-bold text-white py-3 border-b border-white/10"
          >
            Projects
          </button>
          <button
            onClick={() => {
              if (nav.name !== 'home') navigate('home', null);
              setMobileMenuOpen(false);
              setTimeout(
                () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                100
              );
            }}
            className="block w-full text-left font-bold text-white py-3 border-b border-white/10"
          >
            Contact
          </button>
          {appUser ? (
            <>
              <button
                onClick={() => navigate('dashboard')}
                className="block w-full text-left font-bold text-white py-3 border-b border-white/10"
              >
                Dashboard
              </button>
              <button
                onClick={onLogout}
                className="block w-full text-left font-bold text-red-400 py-3"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('login')}
              className="block w-full text-left font-bold text-purple-400 py-3"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
