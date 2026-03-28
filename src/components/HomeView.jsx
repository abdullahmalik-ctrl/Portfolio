import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Code,
  Database,
  Smartphone,
  Layout,
  ChevronRight,
  ChevronLeft,
  Star,
  Quote,
} from 'lucide-react';
import { HangingCard } from './HangingCard';
import { ScrollReveal } from './ScrollReveal';

export function HomeView({ profile, skills, projects, education, testimonials, navigate }) {
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`;
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [showSkillLeft, setShowSkillLeft] = useState(false);
  const [showSkillRight, setShowSkillRight] = useState(true);
  const [showProjLeft, setShowProjLeft] = useState(false);
  const [showProjRight, setShowProjRight] = useState(true);
  const [showTestiLeft, setShowTestiLeft] = useState(false);
  const [showTestiRight, setShowTestiRight] = useState(true);

  const handleScroll = (ref, setLeft, setRight) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeft(scrollLeft > 20);
      setRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const sRef = skillsRef.current;
    const pRef = projectsRef.current;
    const tRef = testimonialsRef.current;
    const checkSkills = () => handleScroll(skillsRef, setShowSkillLeft, setShowSkillRight);
    const checkProjs = () => handleScroll(projectsRef, setShowProjLeft, setShowProjRight);
    const checkTestis = () => handleScroll(testimonialsRef, setShowTestiLeft, setShowTestiRight);
    if (sRef) {
      sRef.addEventListener('scroll', checkSkills);
      checkSkills();
    }
    if (pRef) {
      pRef.addEventListener('scroll', checkProjs);
      checkProjs();
    }
    if (tRef) {
      tRef.addEventListener('scroll', checkTestis);
      checkTestis();
    }
    return () => {
      if (sRef) sRef.removeEventListener('scroll', checkSkills);
      if (pRef) pRef.removeEventListener('scroll', checkProjs);
      if (tRef) tRef.removeEventListener('scroll', checkTestis);
    };
  }, [skills, projects, testimonials]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cardWidthClass = 'w-[85vw] md:w-[45vw] lg:w-[350px]';
  const projectCardHeightClass = 'h-[420px]';
  const skillCardHeightClass = 'h-[340px]';

  const getSkillIcon = (category) => {
    if (category === 'Web') return <Layout size={28} />;
    if (category === 'App') return <Smartphone size={28} />;
    return <Database size={28} />;
  };

  const getSkillColors = (category) => {
    if (category === 'Web') return 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white';
    if (category === 'App') return 'bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white';
    return 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white';
  };

  return (
    <div className="pb-12 space-y-24 md:space-y-32 px-4">
      {/* Hero Section */}
      <section className="relative pt-20 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 backdrop-blur-md rounded-full border border-purple-500/20 text-purple-300 text-xs font-bold tracking-wide uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for Work
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient-x">
                Future of Web
              </span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">{profile.bio}</p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href={gmailLink}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 glass-panel text-white font-bold rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Let's Talk
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
            <div className="absolute top-10 right-10 w-64 h-80 glass-panel rounded-3xl p-6 transform rotate-6 z-10 animate-float">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center mb-4">
                <Code className="text-white" />
              </div>
              <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
              <div className="h-2 w-32 bg-white/10 rounded mb-6"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 w-full bg-white/5 rounded-xl border border-white/5"
                  ></div>
                ))}
              </div>
            </div>

            <div className="absolute top-32 left-0 w-72 h-96 glass-panel bg-black/40 rounded-3xl p-6 transform -rotate-3 z-20 animate-float border-white/20 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div className="text-sm font-bold text-slate-400">Performance</div>
                <div className="text-green-400 text-xs font-bold bg-green-400/20 px-2 py-1 rounded">
                  +24%
                </div>
              </div>
              <div className="flex gap-2 items-end h-48 mb-6 px-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg opacity-80 hover:opacity-100 transition-all"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Database size={14} />
                </div>
                <div className="text-xs text-slate-300">Database Optimized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-7xl mx-auto px-4 relative">
        <div className="mb-8 flex justify-between items-end">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Tech Stack</h2>
          <button
            onClick={() => navigate('all-skills')}
            className="text-purple-400 hover:text-purple-300 font-bold text-sm flex items-center gap-2 transition-colors"
          >
            Explore All <ChevronRight size={16} />
          </button>
        </div>
        <div className="relative group">
          {showSkillLeft && (
            <button
              onClick={() => scroll(skillsRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-purple-600 transition-all active:scale-95 hidden md:flex"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div
            ref={skillsRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-10 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
          >
            {skills.map((skillGroup, idx) => (
              <HangingCard key={idx} delay={idx * 0.2}>
                <div
                  onClick={() => navigate('skill', skillGroup)}
                  className={`glass-panel glass-card-hover p-8 rounded-[2rem] cursor-pointer transition-all duration-300 group/card ${cardWidthClass} ${skillCardHeightClass} snap-center shrink-0 flex flex-col`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${getSkillColors(skillGroup.category)}`}
                  >
                    {getSkillIcon(skillGroup.category)}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{skillGroup.category}</h3>
                  <p className="text-sm text-slate-400 mb-6 line-clamp-3">{skillGroup.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {skillGroup.items.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                    {skillGroup.items.length > 4 && (
                      <span className="px-3 py-1 text-slate-500 text-xs font-semibold">
                        +{skillGroup.items.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </HangingCard>
            ))}
          </div>
          {showSkillRight && (
            <button
              onClick={() => scroll(skillsRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-purple-600 transition-all active:scale-95 hidden md:flex"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Selected Works</h2>
          <button
            onClick={() => navigate('all-projects')}
            className="text-purple-400 hover:text-purple-300 font-bold text-sm flex items-center gap-2 transition-colors"
          >
            Explore All <ChevronRight size={16} />
          </button>
        </div>
        <div className="relative group">
          {showProjLeft && (
            <button
              onClick={() => scroll(projectsRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-purple-600 transition-all active:scale-95 hidden md:flex"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div
            ref={projectsRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-10 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
          >
            {projects.map((project, idx) => (
              <HangingCard key={project.id} delay={idx * 0.2 + 0.5}>
                <div
                  onClick={() => navigate('project', project)}
                  className={`group/card glass-panel rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 ${cardWidthClass} ${projectCardHeightClass} snap-center shrink-0 flex flex-col`}
                >
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 2).map((tag, tIdx) => (
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
                    <div className="mt-auto text-xs font-bold text-slate-500 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                      Learn More <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </HangingCard>
            ))}
          </div>
          {showProjRight && (
            <button
              onClick={() => scroll(projectsRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-purple-600 transition-all active:scale-95 hidden md:flex"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">Education Journey</h2>
        </div>
        <div className="space-y-6 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent md:left-1/2"></div>
          {education.map((edu, idx) => (
            <ScrollReveal
              key={edu.id}
              className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              delay={idx * 90}
              repeat={false}
              x={idx % 2 === 0 ? -56 : 56}
              y={8}
            >
              <div className="hidden md:block w-5/12"></div>
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-purple-500 shadow-[0_0_10px_#a855f7] z-10 mt-6 md:mt-0"></div>
              <div className="ml-20 md:ml-0 w-[calc(100%-5rem)] md:w-5/12 glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <span className="inline-block text-xs font-bold text-purple-300 mb-1">{edu.year}</span>
                <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                <p className="text-slate-400 text-sm">{edu.school}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Client Stories</h2>
            <p className="text-slate-400 mt-2">Feedback from people I've worked with.</p>
          </div>
        </div>
        <div className="relative group">
          {showTestiLeft && (
            <button
              onClick={() => scroll(testimonialsRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-purple-600 transition-all active:scale-95 hidden md:flex"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div
            ref={testimonialsRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-10 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
          >
            {testimonials.map((testi, idx) => (
              <HangingCard key={testi.id} delay={idx * 0.2 + 1}>
                <div className={`glass-panel p-8 rounded-[2rem] flex flex-col ${cardWidthClass} min-h-[300px] snap-center shrink-0`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30">
                      <img
                        src={testi.avatar}
                        alt={testi.clientName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{testi.clientName}</h4>
                      <p className="text-purple-400 text-sm font-medium">{testi.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < testi.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                      />
                    ))}
                  </div>
                  <div className="relative flex-grow">
                    <Quote size={24} className="text-white/10 absolute -top-2 -left-2" />
                    <p className="text-slate-300 italic relative z-10 leading-relaxed pl-6">
                      "{testi.quote}"
                    </p>
                  </div>
                </div>
              </HangingCard>
            ))}
          </div>
          {showTestiRight && (
            <button
              onClick={() => scroll(testimonialsRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-purple-600 transition-all active:scale-95 hidden md:flex"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-3xl mx-auto px-4 text-center">
        <div className="glass-panel rounded-[3rem] p-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">Let's Build Something Amazing</h2>
            <p className="text-slate-400 mb-8 text-lg max-w-lg mx-auto">
              Ready to turn your ideas into reality? I'm currently available for freelance work and collaborations.
            </p>
            <a
              href={gmailLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 glass-panel text-white font-bold px-10 py-4 rounded-full hover:scale-105 hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Get in Touch <Mail size={20} />
            </a>
            <div className="mt-12 flex justify-center gap-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 hover:bg-[#000000] transition-all text-white border border-white/10 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 hover:bg-[#000000] transition-all text-white border border-white/10 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 hover:bg-[#000000] transition-all text-white border border-white/10 hover:scale-110"
              >
                <Instagram size={24} />
              </a>
              <a
                href={profile.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 hover:bg-[#000000] transition-all text-white border border-white/10 hover:scale-110"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
