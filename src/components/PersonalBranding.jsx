import React, { useState } from 'react';
import { Target, ShieldAlert, Cpu, Network, Zap } from 'lucide-react';
import TiltCard from './TiltCard';

const ROADMAP_STEPS = [
  {
    phase: 'PHASE 01',
    title: 'Core Systems Ingestion',
    timeline: '2023 - 2024',
    status: 'COMPLETED',
    icon: Cpu,
    color: '#10b981',
    description: 'Establishment of computer systems core, memory models, object-oriented Java foundations, and data schemas.',
    bullets: ['B.Tech IT Matriculation', 'Java & REST APIs Core', 'SQL database schema designs']
  },
  {
    phase: 'PHASE 02',
    title: 'SecOps & Cloud Telemetry',
    timeline: '2025 - 2026',
    status: 'ACTIVE',
    icon: ShieldAlert,
    color: '#06b6d4',
    description: 'Active cloud telemetry deployments, endpoint protection configuration, and lightweight AI ML pipelines.',
    bullets: ['Wazuh SIEM endpoint pipelines', 'AWS Cloud Essentials training', 'Offline inference modeling']
  },
  {
    phase: 'PHASE 03',
    title: 'Cognitive Defense Nodes',
    timeline: '2026 - 2027',
    status: 'PLANNED',
    icon: Network,
    color: '#a855f7',
    description: 'Automating vulnerability discovery loops with local neural agents and advanced cryptographic handshakes.',
    bullets: ['AI-driven anomaly triggers', 'Secure key derivation protocols', 'B.Tech IT graduation']
  },
  {
    phase: 'PHASE 04',
    title: 'SecOps Principal Audit',
    timeline: '2027+',
    status: 'TARGET',
    icon: Target,
    color: '#f43f5e',
    description: 'Enterprise SecOps architect auditing distributed cloud infrastructure systems and advanced threat mitigations.',
    bullets: ['SecOps Specialist auditing', 'Cloud vulnerability architecting', 'Zero-Trust orchestration']
  }
];

export default function PersonalBranding() {
  const [selectedPhase, setSelectedPhase] = useState(1);

  return (
    <div className="space-y-12 bg-cyber-card/10 border border-cyber-border/40 p-8 rounded-2xl relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-secondary/5 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-primary/5 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Philosophy Headers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-cyber-border/60 pb-8">
        <div className="md:col-span-2 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyber-primary/10 border border-cyber-primary/30 px-3 py-1 rounded-full text-xs font-mono text-cyber-primary font-bold uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>MISSION DIRECTIVE CODE: SEC_DEV_SYS</span>
          </div>
          <h2 className="text-3xl font-mono font-bold tracking-wider text-cyber-text">
            SECURE INFRASTRUCTURE ARCHITECTURE
          </h2>
          <p className="text-sm font-mono text-cyber-muted leading-relaxed max-w-2xl">
            "Coding with paranoia: Every input is a vector, every database state is a liability. By fusing Spring Boot core backend processing with localized offline machine learning intelligence and Wazuh SIEM system telemetry, we orchestrate zero-trust applications ready for cloud-scale execution."
          </p>
        </div>

        {/* Philosophy Widgets */}
        <div className="space-y-4">
          <TiltCard>
            <div className="bg-black/60 border border-cyber-border/80 p-5 rounded-xl font-mono text-xs space-y-2 relative overflow-hidden">
              <div className="flex justify-between items-center text-cyber-secondary font-bold">
                <span>SYSTEM CORE PHILOSOPHY</span>
                <span className="animate-pulse">●</span>
              </div>
              <div className="text-[10px] text-cyber-text space-y-1">
                <div className="flex justify-between">
                  <span className="text-cyber-muted">INTEGRITY RATING:</span>
                  <span className="text-cyber-primary font-bold">100% SECURE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-muted">THREAT POSTURE:</span>
                  <span className="text-cyber-accent font-bold">PROACTIVE DEFIANCE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyber-muted">INFERENCE COST:</span>
                  <span className="text-cyber-secondary font-bold">0ms LOCAL LOOP</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Horizontal Roadmap Circuit */}
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <Network className="text-cyber-secondary w-6 h-6" />
          <h3 className="text-xl font-mono font-bold tracking-wider uppercase text-cyber-text">
            DEVELOPMENT & TRAINING ROADMAP
          </h3>
        </div>

        {/* Desktop timeline nodes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting Circuit Line */}
          <div className="absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-cyber-border/40 hidden md:block z-0">
            <div 
              className="h-full bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent transition-all duration-500" 
              style={{ width: `${(selectedPhase / 3) * 100}%` }}
            />
          </div>

          {ROADMAP_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = idx === selectedPhase;
            const isCompleted = idx < selectedPhase;

            return (
              <div 
                key={step.phase}
                onClick={() => setSelectedPhase(idx)}
                className={`cursor-pointer z-10 transition-all duration-300 font-mono ${
                  isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex flex-col items-center md:items-start space-y-4">
                  {/* Step bubble */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative bg-[#030712]"
                    style={{ 
                      borderColor: step.color,
                      boxShadow: isActive ? `0 0 16px ${step.color}88` : isCompleted ? `0 0 8px ${step.color}44` : 'none'
                    }}
                  >
                    <StepIcon className="w-6 h-6" style={{ color: step.color }} />
                    
                    {/* Status badge */}
                    <span 
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[7px] font-bold px-1.5 py-0.5 rounded border leading-none bg-black"
                      style={{ 
                        color: step.color, 
                        borderColor: `${step.color}44`
                      }}
                    >
                      {step.status}
                    </span>
                  </div>

                  {/* Node text metadata */}
                  <div className="text-center md:text-left space-y-1">
                    <span className="text-[10px] font-bold" style={{ color: step.color }}>{step.phase} // {step.timeline}</span>
                    <h4 className="text-sm font-bold text-cyber-text truncate max-w-full">{step.title}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Phase Info Console */}
        <div className="mt-8 bg-zinc-950/80 border border-cyber-border rounded-xl p-6 font-mono text-xs relative">
          <div className="absolute top-0 right-0 bg-cyber-primary/10 border-l border-b border-cyber-border/80 px-3 py-1 text-[8px] text-cyber-primary font-bold tracking-widest uppercase">
            ROADMAP_METADATA_STREAM
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: ROADMAP_STEPS[selectedPhase].color }} />
                <h5 className="text-sm font-bold text-cyber-text">
                  {ROADMAP_STEPS[selectedPhase].title} ({ROADMAP_STEPS[selectedPhase].timeline})
                </h5>
              </div>
              <p className="text-cyber-muted leading-relaxed">
                {ROADMAP_STEPS[selectedPhase].description}
              </p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-cyber-border/60 pt-4 md:pt-0 md:pl-6 space-y-2">
              <div className="text-[10px] text-cyber-secondary font-bold tracking-widest uppercase mb-1">Target Directives</div>
              {ROADMAP_STEPS[selectedPhase].bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-center space-x-2 text-[10px]">
                  <span className="text-cyber-primary">▪</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
