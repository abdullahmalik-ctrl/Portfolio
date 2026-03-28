import React from 'react';
import { ArrowLeft, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { Github } from 'lucide-react';

export function ProjectDetailView({ project, navigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in-up">
      <button
        onClick={() => navigate('home')}
        className="flex items-center gap-2 text-slate-400 hover:text-white font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Portfolio
      </button>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8 order-2 lg:order-1">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">{project.desc}</p>
          </div>
          <div className="grid gap-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="font-bold text-white flex items-center gap-2 mb-2">
                <Award size={20} className="text-orange-400" /> The Challenge
              </h3>
              <p className="text-slate-400">{project.challenge}</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="font-bold text-white flex items-center gap-2 mb-2">
                <CheckCircle size={20} className="text-green-400" /> The Solution
              </h3>
              <p className="text-slate-400">{project.solution}</p>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 glass-panel text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition shadow-lg shadow-white/5">
              Launch Live <ExternalLink size={18} />
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 glass-panel text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">
              <Github size={18} /> Source Code
            </button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="sticky top-24">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
