import React from 'react';
import { X, GitCommit, GitPullRequest, Code2, Terminal, ShieldAlert } from 'lucide-react';

const MOCK_COMMITS_BY_PROJECT = {
  'ai-tracker': [
    { sha: '8c9d2f4', msg: 'feat: integrate offline ML classification runtime', date: '2 days ago', author: 'sanjays' },
    { sha: '3a1e0b5', msg: 'refactor: optimize local thread pool execution locks', date: '5 days ago', author: 'sanjays' },
    { sha: 'd4b7a2c', msg: 'feat: configure PostgreSQL transactional buffering', date: '1 week ago', author: 'sanjays' }
  ],
  'secure-encrypt': [
    { sha: 'f9c0e3a', msg: 'feat: implement AES-GCM local string protection', date: '3 days ago', author: 'sanjays' },
    { sha: '4b7d2f9', msg: 'security: harden key derivation salt entropy parameters', date: '1 week ago', author: 'sanjays' }
  ],
  'wazuh-siem': [
    { sha: 'a1b2c3d', msg: 'feat: configure local log aggregation endpoint rules', date: '1 day ago', author: 'sanjays' },
    { sha: 'e5f6a7b', msg: 'fix: adjust false positive threshold for shell access', date: '4 days ago', author: 'sanjays' }
  ]
};

export default function ProjectShowcase({ project, onClose }) {
  if (!project) return null;

  const commits = MOCK_COMMITS_BY_PROJECT[project.id] || [
    { sha: 'a0b1c2d', msg: 'init: resolve cryptographic handshake baseline', date: '2 weeks ago', author: 'sanjays' }
  ];

  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 font-mono text-xs select-text">
      {/* Outer Glow Box */}
      <div 
        className="w-full max-w-4xl bg-zinc-950 border-2 border-cyber-primary/70 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)] flex flex-col relative h-[90vh] sm:h-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Scanline Sweep */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-primary/5 to-transparent h-1/2 w-full pointer-events-none animate-[scanline-sweep-vertical_4s_linear_infinite]" />

        {/* Top Header Bar */}
        <div className="bg-cyber-card border-b border-cyber-border p-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-cyber-primary rounded-full animate-pulse" />
            <span className="text-[10px] text-cyber-primary font-bold uppercase tracking-widest">
              DEPLOYED_PROJECT_INDEX // {project.id.toUpperCase()}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded bg-black/40 border border-cyber-border text-cyber-muted hover:text-rose-500 hover:border-rose-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content Grid */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Left Column: Info & Radar Target HUD */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[9px] text-cyber-secondary font-bold uppercase tracking-widest">{project.category}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-cyber-text tracking-wide">{project.title}</h2>
                <p className="text-cyber-muted leading-relaxed font-sans font-light mt-2">{project.tagline}</p>
              </div>

              {/* Radar Simulation Frame (Video Target Mock) */}
              <div className="relative bg-cyber-bg/80 border border-cyber-border rounded-xl aspect-video flex flex-col items-center justify-center overflow-hidden">
                {/* HUD Scan target */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-[180px] h-[180px] rounded-full border border-cyber-secondary flex items-center justify-center animate-[spin_20s_linear_infinite]">
                    <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyber-secondary/60" />
                    <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyber-secondary/60" />
                    <div className="w-[120px] h-[120px] rounded-full border border-dashed border-cyber-primary/60 flex items-center justify-center">
                      <div className="w-[60px] h-[60px] rounded-full border border-cyber-accent/80" />
                    </div>
                  </div>
                  {/* Rotating radar sweep ray */}
                  <div 
                    className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0.15) 0deg, transparent 90deg)',
                      animation: 'spin 5s linear infinite'
                    }}
                  />
                </div>
                
                {/* Glitch Overlay Text */}
                <div className="z-10 text-center space-y-1 text-cyber-secondary animate-pulse text-[10px]">
                  <ShieldAlert className="w-8 h-8 text-cyber-secondary mx-auto mb-2" />
                  <div className="font-bold uppercase tracking-widest text-glow-cyan">TELEMETRY_LINK_ESTABLISHED</div>
                  <div className="text-[8px] text-cyber-muted">GRID_LOCK: 11.23.58.13</div>
                </div>

                {/* Scope corners */}
                <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-cyber-primary/60" />
                <span className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-cyber-primary/60" />
                <span className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-cyber-primary/60" />
                <span className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-cyber-primary/60" />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <div className="text-[10px] text-cyber-muted uppercase tracking-widest">Stack Inventory</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-cyber-card text-cyber-text border border-cyber-border rounded text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Code Share, Metrics, & Github Mock Commits */}
            <div className="space-y-6">
              
              {/* Metrics Panels */}
              <div className="bg-black/60 border border-cyber-border rounded-xl p-4 space-y-3">
                <div className="text-[10px] text-cyber-primary font-bold uppercase tracking-widest border-b border-cyber-border pb-1.5 flex items-center justify-between">
                  <span>DEPLOYMENT METRICS</span>
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(project.metrics).map(([name, val]) => (
                    <div key={name} className="space-y-0.5 bg-zinc-950 p-2 border border-cyber-border/40 rounded">
                      <div className="text-[9px] text-cyber-muted uppercase tracking-wider">{name}</div>
                      <div className="text-sm font-bold text-cyber-secondary text-glow-cyan">{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock GitHub Commits Feed */}
              <div className="bg-black/60 border border-cyber-border rounded-xl p-4 space-y-3">
                <div className="text-[10px] text-cyber-secondary font-bold uppercase tracking-widest border-b border-cyber-border pb-1.5 flex items-center justify-between">
                  <span>GITHUB COMPILED COMMITS FEED</span>
                  <GitPullRequest className="w-3.5 h-3.5" />
                </div>
                
                <div className="space-y-3">
                  {commits.map((commit, cIdx) => (
                    <div key={commit.sha} className="flex items-start space-x-3 text-[11px] leading-relaxed relative">
                      {/* Commit dot connector line */}
                      {cIdx < commits.length - 1 && (
                        <div className="absolute left-[7px] top-[14px] bottom-[-16px] w-[1px] bg-cyber-border" />
                      )}
                      
                      <div className="mt-1">
                        <GitCommit className="w-3.5 h-3.5 text-cyber-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-cyber-primary font-bold">{commit.sha}</span>
                          <span className="text-[9px] text-cyber-muted">{commit.date}</span>
                        </div>
                        <p className="text-cyber-text truncate mt-0.5 font-mono">{commit.msg}</p>
                        <span className="text-[9px] text-cyber-muted">Author: @{commit.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Terminal Trace logs */}
              <div className="bg-zinc-950 border border-cyber-border p-3.5 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-1.5 text-[9px] text-cyber-primary font-bold uppercase tracking-wider mb-1">
                  <Terminal className="w-3.5 h-3.5 animate-pulse" />
                  <span>CORE_DEPLOYMENT_SYSTEM_LOGS</span>
                </div>
                <div className="text-[9px] text-cyber-muted space-y-1">
                  <div>[SYS] Connecting client tunnel to port 443...</div>
                  <div>[SYS] Checking database integrity: postgres://localhost:5432</div>
                  <div className="text-cyber-primary font-bold">[OK] SECURE TELEMETRY CHANNELS ACTIVE. STATUS: STABLE</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
