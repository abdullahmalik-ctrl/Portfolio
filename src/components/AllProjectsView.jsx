import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { HangingCard } from './HangingCard';

export function AllProjectsView({ projects, navigate }) {
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">All Projects</h1>
          <p className="text-slate-400 mt-2">A complete collection of my work and experiments.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-16">
        {projects.map((project, idx) => (
          <HangingCard key={project.id} delay={idx * 0.1}>
            <div
              onClick={() => navigate('project', project)}
              className="group glass-panel rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] uppercase tracking-wider font-bold text-purple-300 bg-purple-500/10 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-4">{project.desc}</p>
              </div>
            </div>
          </HangingCard>
        ))}
      </div>
    </div>
  );
}
