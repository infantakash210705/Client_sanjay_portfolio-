import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Terminal, Cpu, FileText, CheckCircle2 } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'skills' | 'resume'
  const [faceState, setFaceState] = useState('idle'); // 'idle' | 'thinking' | 'success' | 'alert'
  
  // Chat state
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Secured AI Command Core online. Run "help" or inquire about skills, projects, and resume telemetry.' }
  ]);
  const [input, setInput] = useState('');
  
  // Skills Tab state
  const [skillFilter, setSkillFilter] = useState('All');
  
  // Resume Analyzer state
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'complete'
  const [scanProgress, setScanProgress] = useState(0);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const processCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    let reply = "";
    let matched = true;

    switch (cleanCmd) {
      case 'help':
        reply = "Available CLI Diagnostics:\n- 'help' : list available diagnostics\n- 'skills' : fetch technology matrix details\n- 'projects' : index runtime repository status\n- 'resume' : parse resume parameters\n- 'contact' : display persistent communication paths\n- 'clear' : purge screen buffers";
        break;
      case 'skills':
        reply = "Sanjay's system layer integrates Java Spring Boot (90%), PostgreSQL (85%), Python & ML offline inference models (80%), HTML/CSS/JS (85%), and Wazuh SIEM security daemon configurations (75%).";
        break;
      case 'projects':
        reply = "Indexed Builds:\n1. AI Time Tracker: local offline inference loop (Java/Python)\n2. Secure Encryption: AES-GCM data buffer guard\n3. Enterprise Wazuh SIEM Hub: security event collection";
        break;
      case 'resume':
        reply = "Candidate: Sanjay S\nDegree: B.Tech Information Technology (CGPA: 8.4)\nExperience: Cybersecurity Intern (TechnoHack Solutions)\nCore Spec: Secure distributed backend systems developer.";
        break;
      case 'contact':
        reply = "Communication link: sakthivelsanjay5@gmail.com\nGithub: Sanjays2006\nLinkedIn: s-sanjay-8111372a5";
        break;
      case 'clear':
        setMessages([]);
        setFaceState('success');
        return;
      default:
        // Fallback to normal semantic matching
        matched = false;
        if (cleanCmd.includes('skill') || cleanCmd.includes('tech')) {
          reply = "Sanjay is skilled in Java & Spring Boot, Python ML, PostgreSQL, Wazuh SIEM auditing, REST routing patterns, and cryptographic security models.";
          matched = true;
        } else if (cleanCmd.includes('project')) {
          reply = "Flagship project is the AI Time Tracker with local inference pipelines, alongside encryption libraries and Wazuh alerts configurations.";
          matched = true;
        } else if (cleanCmd.includes('experience') || cleanCmd.includes('work')) {
          reply = "Sanjay held a Cybersecurity Intern role at TechnoHack Solutions, hardening remote host nodes and designing SIEM dashboards.";
          matched = true;
        } else if (cleanCmd.includes('contact') || cleanCmd.includes('email') || cleanCmd.includes('mail')) {
          reply = "Reach Sanjay directly at sakthivelsanjay5@gmail.com or dispatch a telemetry subject in the form at the bottom of the page.";
          matched = true;
        } else {
          reply = `Query "${cmdText}" parsed. Command unrecognized. Route request to direct email: sakthivelsanjay5@gmail.com.`;
        }
    }

    setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    setFaceState(matched ? 'success' : 'alert');
    setTimeout(() => setFaceState('idle'), 3000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setFaceState('thinking');

    setTimeout(() => {
      processCommand(userMessage);
    }, 800);
  };

  const triggerResumeScan = () => {
    setScanState('scanning');
    setScanProgress(0);
    setFaceState('thinking');

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanState('complete');
          setFaceState('success');
          setTimeout(() => setFaceState('idle'), 2500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Robot SVG Face render helper
  const renderRobotFace = (state) => {
    const strokeColor = state === 'thinking' ? '#06b6d4' : state === 'success' ? '#10b981' : state === 'alert' ? '#f43f5e' : '#10b981';
    
    return (
      <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="w-8 h-6.5 transition-colors duration-300">
        <rect x="2" y="2" width="36" height="28" rx="5" fill="#0b1329" stroke={strokeColor} strokeWidth="2" />
        
        {state === 'thinking' && (
          <>
            <circle cx="13" cy="14" r="3" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 1" fill="none" className="animate-spin origin-[13px_14px]" />
            <circle cx="27" cy="14" r="3" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 1" fill="none" className="animate-spin origin-[27px_14px]" />
            <path d="M17 21 H23" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {state === 'success' && (
          <>
            <path d="M10 16 Q13 11 16 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M24 16 Q27 11 30 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M15 21 Q20 25 25 21" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}

        {state === 'alert' && (
          <>
            <path d="M11 12 L15 16 M15 12 L11 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M25 12 L29 16 M29 12 L25 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <path d="M16 22 Q20 19 24 22" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}

        {state === 'idle' && (
          <>
            <circle cx="13" cy="14" r="2.5" fill={strokeColor} />
            <circle cx="27" cy="14" r="2.5" fill={strokeColor} />
            <path d="M16 20 Q20 23 24 20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}
      </svg>
    );
  };

  const allSkills = [
    { name: 'Java & Spring', category: 'Backend' },
    { name: 'Python ML', category: 'AI/ML' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Wazuh SIEM', category: 'Security' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'Cryptographic Systems', category: 'Security' },
    { name: 'React / HTML / CSS', category: 'Frontend' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-[11px]">
      {isOpen ? (
        <div className="w-[340px] sm:w-[400px] h-[450px] bg-zinc-950 border-2 border-cyber-primary rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent h-1/2 w-full pointer-events-none animate-[scanline-sweep-vertical_5s_linear_infinite] z-0" />

          {/* Header section */}
          <div className="bg-cyber-card px-4 py-3 border-b border-cyber-border flex justify-between items-center z-10">
            <div className="flex items-center space-x-2.5">
              {renderRobotFace(faceState)}
              <div>
                <span className="text-[10px] tracking-widest text-cyber-secondary font-bold uppercase block">AI COMMAND CORE</span>
                <span className="text-[8px] text-cyber-muted uppercase tracking-widest">STATUS: SYSTEM_ON</span>
              </div>
            </div>
            <X className="w-4 h-4 cursor-pointer hover:text-rose-400 text-cyber-muted transition-colors" onClick={() => setIsOpen(false)} />
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-cyber-border bg-black/60 z-10">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 text-center font-bold tracking-widest border-r border-cyber-border text-[9px] uppercase transition-all ${activeTab === 'chat' ? 'bg-cyber-primary/10 text-cyber-primary' : 'text-cyber-muted hover:text-cyber-text'}`}
            >
              [CHAT / CMD]
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={`flex-1 py-2 text-center font-bold tracking-widest border-r border-cyber-border text-[9px] uppercase transition-all ${activeTab === 'skills' ? 'bg-cyber-secondary/10 text-cyber-secondary' : 'text-cyber-muted hover:text-cyber-text'}`}
            >
              [SKILLS MATRIX]
            </button>
            <button 
              onClick={() => setActiveTab('resume')}
              className={`flex-1 py-2 text-center font-bold tracking-widest text-[9px] uppercase transition-all ${activeTab === 'resume' ? 'bg-cyber-accent/10 text-cyber-accent' : 'text-cyber-muted hover:text-cyber-text'}`}
            >
              [RESUME SCAN]
            </button>
          </div>

          {/* Content Pane */}
          <div className="flex-1 overflow-y-auto p-4 z-10 flex flex-col bg-cyber-bg/90">
            
            {/* TAB 1: Chat CLI Console */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div className="flex-1 overflow-y-auto space-y-3 max-h-[280px] pr-1 scrollbar-thin">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[90%] p-2.5 rounded-lg border leading-relaxed whitespace-pre-line ${
                          m.sender === 'user' 
                            ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-text' 
                            : 'bg-cyber-card border-cyber-border text-cyber-secondary'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="flex space-x-2 pt-2 border-t border-cyber-border/40">
                  <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command (e.g. help, skills, resume)..."
                    className="flex-1 bg-black border border-cyber-border/60 focus:border-cyber-primary rounded px-2.5 py-1.5 outline-none text-cyber-text text-xs font-mono"
                  />
                  <button type="submit" className="p-2 bg-cyber-primary text-black rounded hover:brightness-110 flex items-center justify-center transition-all">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: Skills Filter Grid */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="text-[9px] text-cyber-muted uppercase tracking-widest border-b border-cyber-border pb-1.5 flex items-center justify-between">
                  <span>METADATA CATEGORY SELECT</span>
                  <Cpu className="w-3 h-3 text-cyber-secondary" />
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Backend', 'AI/ML', 'Security', 'Database', 'Frontend'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSkillFilter(cat)}
                      className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase transition-colors ${skillFilter === cat ? 'bg-cyber-secondary border-cyber-secondary text-black' : 'border-cyber-border hover:border-cyber-secondary/40 text-cyber-muted hover:text-cyber-text'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {allSkills
                    .filter((s) => skillFilter === 'All' || s.category === skillFilter)
                    .map((s) => (
                      <div key={s.name} className="p-2 bg-black border border-cyber-border/60 hover:border-cyber-secondary/40 rounded flex flex-col justify-between h-12">
                        <span className="text-[8px] text-cyber-muted uppercase tracking-widest leading-none">{s.category}</span>
                        <span className="text-cyber-text font-bold leading-normal truncate">{s.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 3: Resume Analyzer Parser */}
            {activeTab === 'resume' && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[9px] text-cyber-muted uppercase tracking-widest border-b border-cyber-border pb-1.5 flex items-center justify-between mb-4">
                    <span>COGNITIVE RESUME PARSING AGENT</span>
                    <FileText className="w-3.5 h-3.5 text-cyber-accent" />
                  </div>
                  
                  {scanState === 'idle' && (
                    <div className="text-center py-8 space-y-4">
                      <p className="text-cyber-muted font-sans font-light leading-relaxed">
                        Execute cognitive parser loops to aggregate educational history, verification certifications, and local interns parameters.
                      </p>
                      <button 
                        onClick={triggerResumeScan}
                        className="px-4 py-2 border-2 border-cyber-accent text-cyber-accent bg-cyber-accent/10 hover:bg-cyber-accent hover:text-black rounded font-bold uppercase tracking-widest transition-all"
                      >
                        Execute Resume Audit
                      </button>
                    </div>
                  )}

                  {scanState === 'scanning' && (
                    <div className="space-y-4 py-4 text-center">
                      <div className="text-cyber-accent font-bold uppercase tracking-widest animate-pulse">Scanning candidate repository...</div>
                      <div className="w-full bg-black h-3 border border-cyber-border rounded-full overflow-hidden relative">
                        <div 
                          className="h-full bg-cyber-accent transition-all duration-150 shadow-[0_0_8px_#a855f7]" 
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <div className="text-[9px] text-cyber-muted">CYCLES PROCESSED: {scanProgress}%</div>
                    </div>
                  )}

                  {scanState === 'complete' && (
                    <div className="space-y-3 bg-black/60 border border-cyber-accent/30 p-3.5 rounded font-mono text-[10px] leading-relaxed">
                      <div className="flex items-center space-x-2 text-cyber-primary font-bold border-b border-cyber-border/40 pb-1 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-cyber-primary" />
                        <span className="uppercase">AUDIT REPORT DEFINITIVE</span>
                      </div>
                      <div>CANDIDATE: <span className="text-cyber-text font-bold">SANJAY S</span></div>
                      <div>DEGREE: <span className="text-cyber-text">B.Tech IT (2023 - 2027) // RTC</span></div>
                      <div>CGPA: <span className="text-cyber-primary font-bold">8.4 / 10</span></div>
                      <div>VERIFIED: <span className="text-cyber-secondary font-bold">AWS Cloud Essentials</span></div>
                      <div>DIAGNOSTICS: <span className="text-cyber-text font-bold">98% SecOps Alignment index</span></div>
                    </div>
                  )}
                </div>

                {scanState === 'complete' && (
                  <button 
                    onClick={() => setScanState('idle')}
                    className="w-full py-2 bg-zinc-900 border border-cyber-border/80 text-cyber-muted hover:text-cyber-text rounded text-[10px] uppercase font-bold"
                  >
                    Reset Parser Loop
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Console footer bar */}
          <div className="bg-black/60 border-t border-cyber-border px-4 py-2 flex justify-between items-center text-[8px] text-cyber-muted z-10">
            <span>SEC_CONSOLE: OK</span>
            <span>MEMORY: heap_buffers_safe</span>
          </div>
        </div>
      ) : (
        /* Floating CRT robot face expression launcher button */
        <button 
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 bg-zinc-950 border-2 border-cyber-primary text-black rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 ease-out select-none active:scale-95 group hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] outline-none"
          style={{
            animation: 'cartoon-squash-float 3.5s ease-in-out infinite',
            transformOrigin: 'bottom center'
          }}
        >
          {/* Antennas */}
          <div className="absolute -top-1.5 left-3 w-1 h-2.5 bg-cyber-primary rounded-full origin-bottom group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1.5 right-3 w-1 h-2.5 bg-cyber-primary rounded-full origin-bottom group-hover:-rotate-12 transition-transform" />
          <div className="absolute -top-2 left-4 right-4 h-0.5 bg-cyber-primary" />
          
          {/* CRT Screen inside the button */}
          <div className="w-10 h-8 bg-[#0b1329] rounded-lg flex items-center justify-center border border-cyber-primary/40 overflow-hidden relative">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" className="w-6 h-5 transition-transform group-hover:scale-105">
              <circle cx="7" cy="9" r="1.8" fill="#10b981" />
              <circle cx="17" cy="9" r="1.8" fill="#10b981" />
              <path d="M10 13 Q12 15 14 13" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-primary/5 via-transparent to-cyber-primary/5 pointer-events-none" />
          </div>
        </button>
      )}
    </div>
  );
}