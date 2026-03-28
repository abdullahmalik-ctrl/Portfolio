import React from 'react';
import { ArrowLeft, Layout, Smartphone, Database } from 'lucide-react';
import { HangingCard } from './HangingCard';

export function AllSkillsView({ skills, navigate }) {
  const getIcon = (category) => {
    if (category === 'Web') return <Layout size={28} />;
    if (category === 'App') return <Smartphone size={28} />;
    return <Database size={28} />;
  };

  const getColors = (category) => {
    if (category === 'Web') return 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white';
    if (category === 'App') return 'bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white';
    return 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <div className="flex justify-between items-center mb-12">
        <div>
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Full Tech Stack</h1>
          <p className="text-slate-400 mt-2">Tools, languages, and frameworks I use.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16">
        {skills.map((skillGroup, idx) => (
          <HangingCard key={idx} delay={idx * 0.1}>
            <div
              onClick={() => navigate('skill', skillGroup)}
              className="glass-panel glass-card-hover p-8 rounded-[2rem] cursor-pointer transition-all duration-300 group flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${getColors(skillGroup.category)}`}>
                {getIcon(skillGroup.category)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{skillGroup.category}</h3>
              <p className="text-sm text-slate-400 mb-6">{skillGroup.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {skillGroup.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </HangingCard>
        ))}
      </div>
    </div>
  );
}
