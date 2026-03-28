import React from 'react';
import { CheckCircle } from 'lucide-react';

export function Toast({ message }) {
  return (
    <div className="fixed bottom-8 right-8 bg-slate-900/80 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-fade-in-up z-50 border border-white/10">
      <CheckCircle size={20} className="text-emerald-400" />
      <span className="font-medium">{message}</span>
    </div>
  );
}
