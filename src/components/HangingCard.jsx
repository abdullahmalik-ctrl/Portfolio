import React from 'react';
import { Paperclip } from 'lucide-react';

export function HangingCard({ children, delay = 0 }) {
  return (
    <div className="relative group/hang pt-8">
      <div className="absolute top-4 left-4 z-20 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover/hang:scale-110 transition-transform duration-300 transform -rotate-45">
        <Paperclip size={32} strokeWidth={2} />
      </div>
      <div className="relative z-10 origin-top-left animate-swing" style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}
