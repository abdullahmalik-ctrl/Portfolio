import React from 'react';
import { ArrowLeft, Layout, Smartphone, Database } from 'lucide-react';

export function SkillDetailView({ skillGroup, navigate }) {
  const getIcon = () => {
    if (skillGroup.category === 'Web') return <Layout size={48} />;
    if (skillGroup.category === 'App') return <Smartphone size={48} />;
    return <Database size={48} />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in-up min-h-[80vh] flex flex-col justify-center">
      <button
        onClick={() => navigate('home')}
        className="flex items-center gap-2 text-slate-400 hover:text-white font-medium mb-12 transition-colors w-fit"
      >
        <ArrowLeft size={20} /> Back
      </button>
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl glass-panel text-purple-400 mb-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          {getIcon()}
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">{skillGroup.category}</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">{skillGroup.desc || 'Specialized tools and technologies.'}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skillGroup.items.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center hover:bg-white/5 transition-all group"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 mb-3 opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="font-bold text-slate-200 text-lg">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
