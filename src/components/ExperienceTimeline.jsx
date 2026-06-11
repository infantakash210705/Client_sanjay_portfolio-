import React, { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp, Terminal, Layers } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ExperienceTimeline({ experience, achievements }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showAchievementsInfo, setShowAchievementsInfo] = useState(false);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  // Extra telemetry data for experience
  const extraTelemetry = [
    {
      teamSize: '3 Cyber Operators',
      impact: '98.5% Security Posture Validation',
      nodes: 'SIEM Core, Kali-Linux Endpoint logs',
      processTags: ['Penetration Auditing', 'IAM Rule Hardening', 'Network Telemetry'],
      debugLogs: [
        '[SYS] Initializing TechnoHack logging rules...',
        '[OK] Hardened communication layers.',
        '[OK] Attack vector database compiled.'
      ]
    }
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* Experience block */}
      {experience.map((exp, index) => {
        const isExpanded = expandedIndex === index;
        const telemetry = extraTelemetry[index] || {
          teamSize: 'N/A',
          impact: 'N/A',
          nodes: 'Local Host',
          processTags: ['Analysis'],
          debugLogs: ['[OK] System metrics online']
        };

        return (
          <TiltCard key={index} className="w-full">
            <div 
              onClick={() => toggleExpand(index)}
              data-cursor-text={isExpanded ? "COLLAPSE" : "EXPAND"}
              className="bg-cyber-card/30 border border-cyber-border hover:border-cyber-secondary/50 p-6 rounded-xl relative overflow-hidden h-full pl-8 cursor-pointer transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Connected vertical pipeline laser */}
              <div className="absolute top-0 left-0 h-full w-1 bg-cyber-secondary/20">
                <div 
                  className="w-full h-12 bg-gradient-to-b from-transparent via-cyber-secondary to-transparent absolute"
                  style={{
                    animation: 'laser-travel 3.5s linear infinite',
                    animationDelay: `${index * 1.2}s`
                  }}
                />
              </div>

              <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                <div style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-cyber-secondary uppercase tracking-widest font-bold block mb-1">PROFESSIONAL TIMELINE</span>
                    <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-ping" />
                  </div>
                  <h3 className="text-lg font-bold text-cyber-text">{exp.role}</h3>
                  <p className="text-sm text-cyber-muted">{exp.company}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span 
                    className="text-xs bg-cyber-bg border border-cyber-border px-2 py-1 rounded text-cyber-muted"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    {exp.duration}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-cyber-secondary" /> : <ChevronDown className="w-4 h-4 text-cyber-secondary" />}
                </div>
              </div>

              <ul 
                className="space-y-2 text-xs text-cyber-muted font-sans list-disc list-inside mb-4"
                style={{ transform: 'translateZ(15px)' }}
              >
                {exp.bullets.map((b, idx) => (
                  <li key={idx} className="marker:text-cyber-secondary">{b}</li>
                ))}
              </ul>

              {/* Expandable Telemetry Pane */}
              {isExpanded && (
                <div 
                  className="border-t border-cyber-border/40 pt-4 mt-4 space-y-4 animate-[fadeIn_0.3s_ease-out_forwards]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 bg-black/40 border border-cyber-border/40 p-3 rounded">
                      <div className="text-[9px] text-cyber-muted uppercase tracking-wider">Operational Audit Scope</div>
                      <div className="text-[10px] text-cyber-secondary font-bold">TEAM: {telemetry.teamSize}</div>
                      <div className="text-[10px] text-cyber-secondary font-bold">RATING: {telemetry.impact}</div>
                      <div className="text-[10px] text-cyber-secondary font-bold">NODE ENV: {telemetry.nodes}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[9px] text-cyber-muted uppercase tracking-wider">Process Classifications</div>
                      <div className="flex flex-wrap gap-1.5">
                        {telemetry.processTags.map((tag) => (
                          <span key={tag} className="px-1.5 py-0.5 bg-cyber-secondary/10 border border-cyber-secondary/20 rounded text-[9px] text-cyber-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Micro Terminal logs */}
                  <div className="bg-zinc-950 p-3 rounded-lg border border-cyber-border/60 font-mono text-[9px] text-cyber-muted space-y-1">
                    <div className="flex items-center space-x-1.5 text-cyber-primary border-b border-cyber-border/30 pb-1 mb-1">
                      <Terminal className="w-3 h-3" />
                      <span className="uppercase font-bold tracking-widest">METADATA_TELEMETRY_LOGS</span>
                    </div>
                    {telemetry.debugLogs.map((log, lIdx) => (
                      <div key={lIdx} className="truncate select-all">{log}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TiltCard>
        );
      })}

      {/* Structural Achievements list */}
      <TiltCard className="w-full">
        <div 
          onClick={() => setShowAchievementsInfo(!showAchievementsInfo)}
          data-cursor-text={showAchievementsInfo ? "COLLAPSE" : "VERIFY"}
          className="bg-cyber-card/20 border border-cyber-border hover:border-cyber-primary/40 p-6 rounded-xl space-y-4 h-full relative overflow-hidden pl-8 cursor-pointer transition-all duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Green laser pipeline tracking breakthrough */}
          <div className="absolute top-0 left-0 h-full w-1 bg-cyber-primary/20">
            <div 
              className="w-full h-12 bg-gradient-to-b from-transparent via-cyber-primary to-transparent absolute"
              style={{
                animation: 'laser-travel 4s linear infinite',
              }}
            />
          </div>

          <div 
            className="text-xs font-bold uppercase tracking-widest text-cyber-primary flex items-center justify-between"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-cyber-primary" />
              <span>VALIDATED ENGINE BREAKTHROUGHS</span>
            </div>
            {showAchievementsInfo ? <ChevronUp className="w-4 h-4 text-cyber-primary" /> : <ChevronDown className="w-4 h-4 text-cyber-primary" />}
          </div>

          <div className="space-y-3" style={{ transform: 'translateZ(15px)' }}>
            {achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs">
                <span className="text-cyber-primary mt-0.5">▶</span>
                <p className="text-cyber-muted leading-relaxed font-sans">{achievement}</p>
              </div>
            ))}
          </div>

          {showAchievementsInfo && (
            <div className="border-t border-cyber-border/40 pt-4 mt-4 bg-zinc-950/60 p-3 rounded space-y-2 animate-[fadeIn_0.3s_ease-out_forwards]">
              <div className="text-[9px] text-cyber-muted flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-cyber-primary" />
                <span className="uppercase font-bold tracking-widest text-cyber-primary">VERIFICATION SHA256 NODES</span>
              </div>
              <div className="text-[8px] text-cyber-muted space-y-1 font-mono">
                <div>VERIFICATION HASH: 0x9f5a7b8e1d2c3c4b5a6f8e7d2c1c0b9a8f7e6d5c</div>
                <div>STATUS: <span className="text-cyber-primary font-bold">100% CRYPTO_VALIDATED</span></div>
              </div>
            </div>
          )}
        </div>
      </TiltCard>
    </div>
  );
}