import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, Database, Eye, Terminal, Layers } from 'lucide-react';

const CATEGORIES = {
  Security: { color: '#f43f5e', icon: Shield, label: 'SEC_SYS' },
  'AI/ML': { color: '#a855f7', icon: Cpu, label: 'AI_ML' },
  Backend: { color: '#06b6d4', icon: Layers, label: 'BACK_SYS' },
  Database: { color: '#eab308', icon: Database, label: 'DB_STORE' },
  Frontend: { color: '#10b981', icon: Eye, label: 'FE_PORT' },
};

const SKILLS_DATA = [
  { name: "Wazuh SIEM", category: "Security", level: 75, r: 100, angle: 30, details: ["Endpoint Logs", "SIEM Dashboards", "Defensive Hunting"] },
  { name: "Cryptographic Systems", category: "Security", level: 80, r: 100, angle: 150, details: ["Symmetric/Asymmetric Keying", "AES-GCM Pipelines", "Entropy Buffering"] },
  { name: "Python & ML", category: "AI/ML", level: 80, r: 160, angle: 90, details: ["Scikit-learn Model Training", "Offline Inference Loops", "Data Telemetry Analysis"] },
  { name: "Java & Spring Boot", category: "Backend", level: 90, r: 160, angle: 210, details: ["Spring MVC / Security Controllers", "Hibernate Data Persistence", "Multi-threaded REST Services"] },
  { name: "REST APIs", category: "Backend", level: 90, r: 160, angle: 330, details: ["JWT Secure Authentication", "Throttled API Route Limits", "Clean JSON Serialization"] },
  { name: "PostgreSQL", category: "Database", level: 85, r: 220, angle: 270, details: ["Index Opts & Locking Keys", "Relational Mapping Schemas", "Optimized Query Compilation"] },
  { name: "HTML/CSS/JavaScript", category: "Frontend", level: 85, r: 220, angle: 30, details: ["Modern ES6 React Bindings", "Hardware-accelerated CSS", "Tailwind Design Pipelines"] },
];

export default function SkillsGalaxy() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_DATA[0]);
  const [time, setTime] = useState(0);

  // Rotate satellites slowly over time
  useEffect(() => {
    let animId;
    const update = () => {
      setTime((prev) => prev + 0.15);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  const getCoordinates = (r, initialAngle, speedMultiplier = 1) => {
    // Convert angle to radians and add time rotation
    const angleRad = ((initialAngle + time * speedMultiplier) * Math.PI) / 180;
    const x = 300 + r * Math.cos(angleRad);
    const y = 300 + r * Math.sin(angleRad);
    return { x, y };
  };

  const activeColor = activeCategory ? CATEGORIES[activeCategory]?.color : '#10b981';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-cyber-card/25 border border-cyber-border/40 p-8 rounded-2xl relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* SVG Interactive Galaxy Graph (span 2 cols on wide screen) */}
      <div className="lg:col-span-2 flex justify-center items-center relative min-h-[400px] md:min-h-[550px]">
        <svg 
          viewBox="0 0 600 600" 
          className="w-full max-w-[500px] md:max-w-[550px] drop-shadow-[0_0_15px_rgba(16,185,129,0.1)] select-none"
        >
          {/* Defs for gradients & glowing filters */}
          <defs>
            {Object.keys(CATEGORIES).map((cat) => (
              <radialGradient id={`glow-${cat}`} key={cat}>
                <stop offset="0%" stopColor={CATEGORIES[cat].color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={CATEGORIES[cat].color} stopOpacity="0" />
              </radialGradient>
            ))}
            <radialGradient id="core-glow">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Orbit rings */}
          <circle cx="300" cy="300" r="100" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4,8" className="opacity-20" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="8,8" className="opacity-15 animate-[spin_120s_linear_infinite]" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="3,12" className="opacity-10 animate-[spin_180s_linear_infinite]" />

          {/* Target Scanning Crosshairs */}
          <line x1="300" y1="50" x2="300" y2="550" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
          <line x1="50" y1="300" x2="550" y2="300" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />

          {/* Central Security core */}
          <circle cx="300" cy="300" r="45" fill="url(#core-glow)" />
          <circle cx="300" cy="300" r="24" fill="#030712" stroke="#10b981" strokeWidth="2" className="animate-pulse shadow-inner" />
          <g transform="translate(288, 288) scale(0.9)">
            <Shield className="w-6 h-6 text-cyber-primary animate-[pulse_2s_infinite]" />
          </g>
          <text x="300" y="340" textAnchor="middle" fill="#10b981" className="font-mono text-[8px] font-bold tracking-widest uppercase opacity-75">
            SEC_CORE_V1
          </text>

          {/* Vector connection paths */}
          {SKILLS_DATA.map((skill, idx) => {
            const coords = getCoordinates(skill.r, skill.angle, 0.35);
            const isTargeted = activeCategory === skill.category;
            const isSelected = selectedSkill.name === skill.name;
            const catInfo = CATEGORIES[skill.category];

            if (!activeCategory || isTargeted) {
              return (
                <g key={`path-${idx}`}>
                  {/* Neon laser line to core */}
                  <line 
                    x1="300" 
                    y1="300" 
                    x2={coords.x} 
                    y2={coords.y} 
                    stroke={catInfo.color} 
                    strokeWidth={isSelected ? 1.5 : 0.75} 
                    className="opacity-40"
                    strokeDasharray={isSelected ? "4,4" : "none"}
                  />
                  {/* Floating data bits sliding along vectors */}
                  <circle 
                    cx={300 + (coords.x - 300) * ((time * 0.05) % 1.0)} 
                    cy={300 + (coords.y - 300) * ((time * 0.05) % 1.0)} 
                    r="2.5" 
                    fill={catInfo.color} 
                    className="shadow-md"
                  />
                </g>
              );
            }
            return null;
          })}

          {/* Satellite Skill Nodes */}
          {SKILLS_DATA.map((skill, idx) => {
            const coords = getCoordinates(skill.r, skill.angle, 0.35);
            const catInfo = CATEGORIES[skill.category];
            const isTargeted = !activeCategory || activeCategory === skill.category;
            const isSelected = selectedSkill.name === skill.name;

            return (
              <g 
                key={`node-${idx}`}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: isTargeted ? 1 : 0.2 }}
                onClick={() => setSelectedSkill(skill)}
                onMouseEnter={() => {
                  setActiveCategory(skill.category);
                  setSelectedSkill(skill);
                }}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Node Outer Glow Range */}
                <circle 
                  cx={coords.x} 
                  cy={coords.y} 
                  r={isSelected ? 30 : 20} 
                  fill={`url(#glow-${skill.category})`} 
                  className="transition-all duration-300"
                />

                {/* Satellite Body */}
                <circle 
                  cx={coords.x} 
                  cy={coords.y} 
                  r={isSelected ? 14 : 10} 
                  fill="#030712" 
                  stroke={catInfo.color} 
                  strokeWidth={isSelected ? 3.5 : 2} 
                  className="transition-all duration-300"
                />

                {/* Category Icon mini indicators */}
                <g transform={`translate(${coords.x - 6}, ${coords.y - 6}) scale(0.5)`} className="pointer-events-none">
                  {React.createElement(catInfo.icon, {
                    className: "text-white",
                    style: { color: catInfo.color }
                  })}
                </g>

                {/* Text Labels */}
                <text 
                  x={coords.x} 
                  y={coords.y - (isSelected ? 20 : 16)} 
                  textAnchor="middle" 
                  fill={catInfo.color} 
                  className="font-mono text-[9px] font-bold tracking-wider uppercase drop-shadow-md pointer-events-none"
                >
                  {skill.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Side HUD Panel console (span 1 col) */}
      <div className="flex flex-col h-full bg-black/60 border border-cyber-border rounded-xl p-5 font-mono text-xs text-cyber-text relative">
        {/* Panel Glitch Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent h-1/2 w-full pointer-events-none animate-[scanline-sweep-vertical_6s_linear_infinite]" />

        <div className="flex justify-between items-center pb-3 border-b border-cyber-border/60 mb-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyber-primary animate-pulse" />
            <span className="font-bold text-cyber-primary tracking-widest text-[10px] uppercase">GALAXY_CONSOLE_TELEMETRY</span>
          </div>
          <span className="text-[9px] text-cyber-secondary font-bold bg-cyber-secondary/10 px-1.5 py-0.5 rounded">
            {CATEGORIES[selectedSkill.category]?.label || 'SYS_OK'}
          </span>
        </div>

        <div className="space-y-4 flex-1">
          {/* Skill Name */}
          <div>
            <div className="text-[10px] text-cyber-muted tracking-widest uppercase">Target Identifier</div>
            <div className="text-base font-bold text-cyber-text text-glow-cyan flex items-center space-x-1.5 mt-0.5">
              <span>{selectedSkill.name}</span>
            </div>
          </div>

          {/* Level Gauges */}
          <div>
            <div className="flex justify-between text-[10px] text-cyber-muted tracking-widest uppercase mb-1">
              <span>Capability Rating</span>
              <span className="text-cyber-primary font-bold">{selectedSkill.level}%</span>
            </div>
            <div className="w-full bg-cyber-bg h-2 rounded-full overflow-hidden border border-cyber-border/40">
              <div 
                className="h-full bg-gradient-to-r transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                style={{ 
                  width: `${selectedSkill.level}%`, 
                  backgroundImage: `linear-gradient(to right, ${CATEGORIES[selectedSkill.category].color}, #10b981)` 
                }} 
              />
            </div>
          </div>

          {/* Category Details */}
          <div>
            <div className="text-[10px] text-cyber-muted tracking-widest uppercase mb-2">Category Cluster</div>
            <span 
              className="px-2 py-1 rounded text-[10px] font-bold inline-block border transition-all duration-300"
              style={{ 
                color: CATEGORIES[selectedSkill.category].color, 
                borderColor: `${CATEGORIES[selectedSkill.category].color}33`,
                backgroundColor: `${CATEGORIES[selectedSkill.category].color}11` 
              }}
            >
              {selectedSkill.category.toUpperCase()} ROUTING NODE
            </span>
          </div>

          {/* Subskill Terminal Output */}
          <div className="flex-1 bg-zinc-950/80 border border-cyber-border/60 p-3 rounded space-y-1.5 overflow-y-auto max-h-[140px] select-text">
            <div className="text-[8px] text-cyber-primary/60 font-bold tracking-widest uppercase border-b border-cyber-border/40 pb-1 mb-1">
              [SYSTEM_DIAGNOSTICS_PAYLOAD]
            </div>
            {selectedSkill.details.map((detail, dIdx) => (
              <div key={dIdx} className="flex items-start space-x-2 text-[10px]">
                <span className="text-cyber-secondary mt-0.5">»</span>
                <span className="text-cyber-text font-mono leading-tight">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Console footer */}
        <div className="mt-4 pt-3 border-t border-cyber-border/40 flex justify-between items-center text-[9px] text-cyber-muted">
          <span>VECTOR_STATE: ONLINE</span>
          <span className="text-cyber-accent font-bold animate-pulse">● TRANSMITTING</span>
        </div>
      </div>
    </div>
  );
}
