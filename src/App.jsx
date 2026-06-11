import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillRadar from './components/SkillRadar';
import ProjectCard from './components/ProjectCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import DashboardWidgets from './components/DashboardWidgets';
import CyberTerminal from './components/CyberTerminal';
import AIChatbot from './components/AIChatbot';
import CyberMatrixBg from './components/CyberMatrixBg';
import TiltCard from './components/TiltCard';
import DecryptedText from './components/DecryptedText';
import portfolioData from './data/portfolioData.json';
import { Shield, Cpu, Code, Award, GraduationCap, Mail, Terminal as TermIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';

// New components for premium interactive Awwwards upgrade
import CinematicLoader from './components/CinematicLoader';
import CyberCursor from './components/CyberCursor';
import ScrollExperience from './components/ScrollExperience';
import SkillsGalaxy from './components/SkillsGalaxy';
import PersonalBranding from './components/PersonalBranding';
import DataVisCenter from './components/DataVisCenter';
import ProjectShowcase from './components/ProjectShowcase';

// Viewport count-up counter for technical skills matrix
function SkillCounter({ target }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1200;
        const steps = 30;
        const stepTime = duration / steps;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
        
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={elementRef}>{count}%</span>;
}

// 3D Flippable Skill Card with cartoon sub-framework details
function FlippableSkillCard({ skill, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getSubSkills = (category) => {
    switch (category.toLowerCase()) {
      case 'backend':
        return ['Spring Boot framework', 'REST Routing APIs', 'JPA / Hibernate ORM'];
      case 'ai/ml':
        return ['Python ML Models', 'Lightweight Local inference', 'Data Analytics Pipelines'];
      case 'database':
        return ['PostgreSQL engines', 'Locking & ACID state', 'Schema Optimizers'];
      case 'security':
        return ['Wazuh SIEM daemon', 'Threat Hunter rules', 'Log Parser pipelines'];
      case 'frontend':
        return ['HTML5 / Vanilla CSS3', 'JavaScript ES6 core', 'Tailwind utilities'];
      default:
        return ['Symmetric Cryptography', 'Key derivation loops', 'High-entropy validation'];
    }
  };

  const subSkills = getSubSkills(skill.category || skill.name);

  return (
    <div 
      onClick={() => setIsFlipped(!isFlipped)}
      className="h-full cursor-pointer select-none perspective-1000"
      style={{ minHeight: '120px' }}
    >
      <div 
        className={`relative w-full h-full duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* FRONT FACE */}
        <div className="backface-hidden w-full h-full">
          <TiltCard className="h-full">
            <div 
              className="bg-cyber-card/60 border border-cyber-border hover:border-cyber-primary/40 p-4 rounded-lg font-mono relative overflow-hidden h-full flex flex-col justify-between"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex justify-between items-center mb-2" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-[10px] text-cyber-secondary font-bold uppercase tracking-widest">{skill.category}</span>
                <span className="text-sm text-cyber-primary text-glow font-bold"><SkillCounter target={skill.level} /></span>
              </div>
              <div className="text-sm font-bold text-cyber-text truncate" style={{ transform: 'translateZ(30px)' }}>{skill.name}</div>
              <div className="w-full bg-cyber-bg h-1.5 mt-3 rounded-full overflow-hidden border border-cyber-border" style={{ transform: 'translateZ(15px)' }}>
                <div className="bg-gradient-to-r from-cyber-primary to-cyber-secondary h-full transition-all duration-500 cartoon-wiggle-sketch" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          </TiltCard>
        </div>

        {/* BACK FACE */}
        <div className="backface-hidden absolute inset-0 rotate-y-180 w-full h-full">
          <TiltCard className="h-full">
            <div 
              className="bg-zinc-950 border border-cyber-primary/40 hover:border-cyber-primary/60 p-4 rounded-lg font-mono relative overflow-hidden h-full flex flex-col justify-between bg-gradient-to-br from-zinc-950 to-cyber-card/90"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-[9px] text-cyber-primary font-bold tracking-widest uppercase mb-1" style={{ transform: 'translateZ(20px)' }}>
                SYSTEM_METADATA_INDEX
              </div>
              <div className="space-y-1.5 my-auto" style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}>
                {subSkills.map((sub, sIdx) => (
                  <div key={sIdx} className="flex items-center space-x-1.5 text-[10px] text-cyber-text">
                    <span className="text-cyber-secondary">▶</span>
                    <span className="truncate">{sub}</span>
                  </div>
                ))}
              </div>
              <div className="text-[8px] text-cyber-muted text-right opacity-65" style={{ transform: 'translateZ(15px)' }}>
                [CLICK TO DECRYPT CODEBAR]
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#030712] z-[9999] p-8 font-mono text-rose-500 overflow-auto select-text text-xs space-y-4">
          <div className="border-2 border-rose-500 p-6 bg-rose-950/20 rounded-xl max-w-4xl mx-auto space-y-4 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <div className="flex items-center space-x-2 font-bold text-sm uppercase tracking-widest text-glow-rose border-b border-rose-500/30 pb-2">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              <span>● CRITICAL FAULT INGESTED // DIAGNOSTIC SCREEN</span>
            </div>
            <div className="font-bold text-cyber-text text-sm">Error: {this.state.error?.message || this.state.error?.toString()}</div>
            <div className="text-[10px] text-cyber-muted uppercase tracking-widest font-bold">[Crash Stack Trace]</div>
            <pre className="bg-black/80 p-4 rounded border border-rose-500/20 text-[10px] leading-relaxed overflow-x-auto text-rose-400 select-all max-h-[250px]">
              {this.state.error?.stack}
            </pre>
            <div className="text-[10px] text-cyber-muted">
              Please copy and paste this stack trace to proceed with direct structural adjustments.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' });
  
  // Loader and modal state coordinates
  const [loaderActive, setLoaderActive] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    // Handle Konami Code easter egg
    let keys = [];
    const konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
    const handleKeyDown = (e) => {
      keys.push(e.key);
      keys = keys.slice(-10);
      if (keys.join('').includes('ArrowUpArrowUp')) {
        // Trigger secret console logs or modes if necessary
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ status: 'loading', message: 'Encrypting and transmitting payload...' });

    // Initialized template ready for EmailJS binding
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_default',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default',
      formData,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'user_public'
    ).then(() => {
      setFormStatus({ status: 'success', message: 'Transmission successful. Secure connection linked.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }).catch((err) => {
      setFormStatus({ status: 'error', message: 'Failed transmission route. Direct mail to sakthivelsanjay5@gmail.com' });
    });
  };

  return (
    <ErrorBoundary>
      <div className={`${isDarkMode ? 'dark bg-cyber-bg text-cyber-text' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-300 relative selection:bg-cyber-primary selection:text-black`}>
      {/* Cinematic startup sequence */}
      {loaderActive && <CinematicLoader onComplete={() => setLoaderActive(false)} />}

      {/* Cyber Cursor Tracker and scroll experience (mounts on loader completion) */}
      {!loaderActive && (
        <>
          <CyberCursor />
          <ScrollExperience />
        </>
      )}

      <CyberMatrixBg />
      
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setTerminalOpen={setTerminalOpen} />
      
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10 space-y-32 pb-24 ${loaderActive ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-700'}`}>
        
        <Hero data={portfolioData.candidate} />
        
        {/* Real-time Operations Dashboard Overview */}
        <section id="dashboard" className="scroll-mt-24">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="text-cyber-primary w-6 h-6 animate-pulse" />
            <h2 className="text-2xl font-mono font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
              <DecryptedText text="SECURE OPERATION COMMAND CENTER" />
            </h2>
          </div>
          <DashboardWidgets />
        </section>

        {/* Skills Galaxy Orbit Map */}
        <section id="galaxy" className="scroll-mt-24">
          <div className="flex items-center space-x-3 mb-8">
            <Cpu className="text-cyber-primary w-6 h-6 animate-pulse" />
            <h2 className="text-2xl font-mono font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
              <DecryptedText text="SECURE SKILLS GALAXY CLUSTER" />
            </h2>
          </div>
          <SkillsGalaxy />
        </section>

        {/* Technical Vector Map & Skills Matrix */}
        <section id="skills" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Cpu className="text-cyber-secondary w-6 h-6" />
              <h2 className="text-2xl font-mono font-bold tracking-wider uppercase">
                <DecryptedText text="ARCHITECTURAL MATRIX" />
              </h2>
            </div>
            <p className="text-cyber-muted font-mono text-sm leading-relaxed mb-6">
              Cross-functional framework indexing runtime production limits across standard microservice patterns, local model integration frameworks, and strict cryptographic implementations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {portfolioData.skills.map((skill, index) => (
                <FlippableSkillCard key={index} skill={skill} index={index} />
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <SkillRadar skills={portfolioData.skills} />
          </div>
        </section>

        {/* Project Matrix Deployments */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex items-center space-x-3 mb-12">
            <Code className="text-cyber-primary w-6 h-6" />
            <h2 className="text-2xl font-mono font-bold tracking-wider uppercase">
              <DecryptedText text="REPOS & RUNTIME DEPLOYMENTS" />
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenModal={setActiveProject} />
            ))}
          </div>
        </section>

        {/* Personal Branding & Philosophy Directives */}
        <section className="scroll-mt-24">
          <PersonalBranding />
        </section>

        {/* Career Timeline Track */}
        <section id="experience" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <GraduationCap className="text-cyber-secondary w-6 h-6" />
              <h2 className="text-2xl font-mono font-bold tracking-wider uppercase">
                <DecryptedText text="ACADEMIC PROFILE" />
              </h2>
            </div>
            <TiltCard className="relative group/tooltip">
              {/* Bouncy Comic Speech Bubble */}
              <div 
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyber-secondary text-black font-bold text-[9px] px-2.5 py-1.5 rounded-lg border border-black shadow-lg opacity-0 pointer-events-none transition-all duration-300 scale-75 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:-top-14 origin-bottom flex items-center space-x-1"
                style={{
                  animation: 'cartoon-wiggle 2.2s ease-in-out infinite',
                  zIndex: 40
                }}
              >
                <span>IT ENGINEER IN MAKING! 🎓</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-cyber-secondary" />
              </div>
              <div 
                className="bg-cyber-card/40 border border-cyber-border hover:border-cyber-secondary/30 p-6 rounded-xl font-mono space-y-4 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-lg font-bold text-cyber-text" style={{ transform: 'translateZ(30px)' }}>{portfolioData.candidate.education.degree}</h3>
                <p className="text-sm text-cyber-secondary" style={{ transform: 'translateZ(20px)' }}>{portfolioData.candidate.education.institution}</p>
                <div className="flex justify-between text-xs text-cyber-muted pt-2 border-t border-cyber-border" style={{ transform: 'translateZ(15px)' }}>
                  <span>TIMELINE: {portfolioData.candidate.education.duration}</span>
                  <span className="text-cyber-primary font-bold">CGPA: {portfolioData.candidate.education.cgpa}</span>
                </div>
              </div>
            </TiltCard>
 
            <TiltCard className="relative group/tooltip">
              {/* Bouncy Comic Speech Bubble */}
              <div 
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyber-primary text-black font-bold text-[9px] px-2.5 py-1.5 rounded-lg border border-black shadow-lg opacity-0 pointer-events-none transition-all duration-300 scale-75 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 group-hover/tooltip:-top-14 origin-bottom flex items-center space-x-1"
                style={{
                  animation: 'cartoon-wiggle 2s ease-in-out infinite',
                  zIndex: 40
                }}
              >
                <span>100% CLOUD VERIFIED! ☁️</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-cyber-primary" />
              </div>
              <div 
                className="bg-gradient-to-br from-cyber-card to-cyber-bg border border-cyber-primary/20 hover:border-cyber-primary/40 p-6 rounded-xl font-mono space-y-2 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-0 right-0 bg-cyber-primary text-black text-[10px] font-bold px-2 py-0.5 tracking-widest uppercase" style={{ transform: 'translateZ(25px)' }}>Verified</div>
                <div className="text-xs text-cyber-primary uppercase tracking-widest font-bold" style={{ transform: 'translateZ(20px)' }}>AWS INFRASTRUCTURE</div>
                <div className="text-md font-bold text-cyber-text" style={{ transform: 'translateZ(30px)' }}>AWS Cloud Essentials</div>
                <p className="text-xs text-cyber-muted" style={{ transform: 'translateZ(15px)' }}>Validation of distributed system topologies, cloud optimization metrics, and fundamental IAM provisioning models.</p>
              </div>
            </TiltCard>
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="text-cyber-primary w-6 h-6" />
              <h2 className="text-2xl font-mono font-bold tracking-wider uppercase">
                <DecryptedText text="TIMELINE & MILESTONES" />
              </h2>
            </div>
            <ExperienceTimeline experience={portfolioData.experience} achievements={portfolioData.achievements} />
          </div>
        </section>

        {/* Data Analytics Center */}
        <section id="analytics" className="scroll-mt-24">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="text-cyber-primary w-6 h-6 animate-pulse" />
            <h2 className="text-2xl font-mono font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
              <DecryptedText text="QUANTUM DEPLOYMENT ANALYTICS" />
            </h2>
          </div>
          <DataVisCenter />
        </section>

        {/* Secured Telemetry Contact System */}
        <section id="contact" className="scroll-mt-24 max-w-3xl mx-auto">
          <TiltCard>
            <div 
              className="bg-cyber-card/40 border border-cyber-border hover:border-cyber-primary/20 p-8 rounded-2xl relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent" />
              <div className="text-center mb-8 font-mono" style={{ transform: 'translateZ(30px)' }}>
                <Mail className="w-8 h-8 text-cyber-primary mx-auto mb-2 animate-bounce" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
                  <DecryptedText text="INITIALIZE PERSISTENT HANDSHAKE" />
                </h2>
                <p className="text-xs text-cyber-muted mt-1">Encrypted packets will route securely to sakthivelsanjay5@gmail.com</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6 font-mono" style={{ transformStyle: 'preserve-3d' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ transform: 'translateZ(15px)' }}>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-cyber-muted mb-2">IDENTIFIER NAME</label>
                    <input 
                      type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-cyber-bg border border-cyber-border focus:border-cyber-primary focus:shadow-[0_0_12px_rgba(16,185,129,0.25)] focus:ring-1 focus:ring-cyber-primary rounded p-3 text-sm font-mono outline-none transition-all text-cyber-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-cyber-muted mb-2">RETURN COMPULSORY EMAIL</label>
                    <input 
                      type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-cyber-bg border border-cyber-border focus:border-cyber-secondary focus:shadow-[0_0_12px_rgba(6,182,212,0.25)] focus:ring-1 focus:ring-cyber-secondary rounded p-3 text-sm font-mono outline-none transition-all text-cyber-text"
                    />
                  </div>
                </div>
                <div style={{ transform: 'translateZ(20px)' }}>
                  <label className="block text-xs uppercase tracking-widest text-cyber-muted mb-2">TELEMETRY SUBJECT</label>
                  <input 
                    type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-cyber-bg border border-cyber-border focus:border-cyber-primary focus:shadow-[0_0_12px_rgba(16,185,129,0.25)] focus:ring-1 focus:ring-cyber-primary rounded p-3 text-sm font-mono outline-none transition-all text-cyber-text"
                  />
                </div>
                <div style={{ transform: 'translateZ(25px)' }}>
                  <label className="block text-xs uppercase tracking-widest text-cyber-muted mb-2">MESSAGE PACKET DATA</label>
                  <textarea 
                    rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-cyber-bg border border-cyber-border focus:border-cyber-secondary focus:shadow-[0_0_12px_rgba(6,182,212,0.25)] focus:ring-1 focus:ring-cyber-secondary rounded p-3 text-sm font-mono outline-none transition-all text-cyber-text"
                  ></textarea>
                </div>

                <div style={{ transform: 'translateZ(35px)' }}>
                  <button 
                    type="submit" disabled={formStatus.status === 'loading'}
                    className="w-full py-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black font-bold uppercase text-xs tracking-widest rounded shadow-lg hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-1.5">
                      <span>{formStatus.status === 'loading' ? 'TRANSMITTING...' : 'DISPATCH SECURE DATA STREAM'}</span>
                      <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1.5 font-bold">»</span>
                    </span>
                  </button>
                </div>

                {formStatus.message && (
                  <div className={`p-3 text-xs rounded border text-center ${formStatus.status === 'success' ? 'bg-emerald-950/40 border-cyber-primary text-cyber-primary' : 'bg-rose-950/40 border-rose-500 text-rose-400'}`} style={{ transform: 'translateZ(10px)' }}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>
          </TiltCard>
        </section>

      </main>

      {/* Hidden SVG Cartoon Wiggle Filters */}
      <svg className="hidden">
        <defs>
          <filter id="cartoon-wiggle-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="cartoon-wiggle-filter-2" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="G" yChannelSelector="R" />
          </filter>
        </defs>
      </svg>

      {/* Floating Tactical Modules */}
      {!loaderActive && <AIChatbot />}
      {terminalOpen && <CyberTerminal close={() => setTerminalOpen(false)} />}

      {/* Project details showcase modal overlay */}
      {activeProject && (
        <ProjectShowcase 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}

      <footer className="border-t border-cyber-border py-8 text-center font-mono text-xs text-cyber-muted relative z-10 bg-cyber-bg/80 backdrop-blur">
        <div>© 2026 SANJAY S. DEPLOYED INFRASTRUCTURE SYSTEMS ENGINE.</div>
        <div className="text-[10px] text-cyber-primary/40 mt-1">STATUS: SECURE // LOCATION: COIMBATORE, IN</div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}