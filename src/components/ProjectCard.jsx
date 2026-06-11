import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, CheckCircle, Hourglass } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ProjectCard({ project, onOpenModal }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const templates = [
      `[INFO] Pipeline stream synced`,
      `[OK] SHA256 signature verified`,
      `[INFO] JVM buffer optimized`,
      `[OK] DB transaction committed`,
      `[INFO] Heartbeat diagnostics: OK`,
      `[INFO] Local AI inference loop: 0ms`,
      `[OK] Cryptographic derivation safe`,
      `[INFO] Wazuh alerts active`
    ];

    // Seed initial logs
    setLogs([
      `[OK] Decrypt handshake resolved`,
      templates[Math.floor(Math.random() * templates.length)],
      templates[Math.floor(Math.random() * templates.length)]
    ]);

    const interval = setInterval(() => {
      setLogs(prev => {
        const line = templates[Math.floor(Math.random() * templates.length)];
        return [...prev.slice(-2), line]; // Keep last 3 logs
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpenModal && onOpenModal(project)}
      data-cursor-text="PREVIEW"
      className="cursor-pointer"
    >
      <TiltCard className="w-full relative overflow-hidden group rounded-2xl">
        {/* Dynamic sweeping laser scanline */}
        <div 
          className="absolute inset-x-0 h-[60%] pointer-events-none opacity-20 z-20"
          style={{
            background: 'linear-gradient(rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.4) 50%, rgba(16, 185, 129, 0) 100%)',
            top: '-100%',
            animation: 'scanline-sweep-vertical 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />

        <div 
          className="bg-cyber-card/30 border border-cyber-border hover:border-cyber-primary/40 rounded-2xl p-6 sm:p-8 font-mono grid grid-cols-1 lg:grid-cols-3 gap-8 relative overflow-hidden h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="lg:col-span-2 space-y-4" style={{ transformStyle: 'preserve-3d' }}>
            <div className="flex flex-wrap items-center gap-3" style={{ transform: 'translateZ(20px)' }}>
              <span className="px-2 py-0.5 bg-cyber-bg border border-cyber-border text-cyber-secondary text-[10px] font-bold tracking-widest uppercase rounded">
                {project.category}
              </span>
              <span className={`inline-flex items-center space-x-1 text-[10px] uppercase font-bold tracking-widest ${project.status === 'Completed' ? 'text-cyber-primary' : 'text-amber-400'}`}>
                {project.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Hourglass className="w-3 h-3" />}
                <span>{project.status}</span>
              </span>
            </div>

            <div style={{ transform: 'translateZ(30px)' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-cyber-text tracking-wide group-hover:text-cyber-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-cyber-secondary mt-1">{project.tagline}</p>
            </div>

            <ul 
              className="space-y-2 text-xs sm:text-sm text-cyber-muted font-sans font-light list-inside list-disc leading-relaxed"
              style={{ transform: 'translateZ(15px)' }}
            >
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="marker:text-cyber-primary">{highlight}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2" style={{ transform: 'translateZ(25px)' }}>
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-2 py-1 bg-cyber-bg text-cyber-muted text-[11px] border border-cyber-border rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Metric/Telemetry visualization frame */}
          <div 
            className="lg:col-span-1 bg-cyber-bg/60 border border-cyber-border rounded-xl p-5 flex flex-col justify-between space-y-4"
            style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
          >
            <div className="text-[10px] text-cyber-muted tracking-widest uppercase flex items-center justify-between border-b border-cyber-border pb-2" style={{ transform: 'translateZ(10px)' }}>
              <span>METRIC TELEMETRY LAYER</span>
              <Cpu className="w-3 h-3 text-cyber-primary" />
            </div>
            <div className="space-y-4 my-auto" style={{ transform: 'translateZ(20px)' }}>
              {Object.entries(project.metrics).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-xs text-cyber-muted uppercase tracking-wider">{key}:</span>
                  <span className="text-sm font-bold text-cyber-primary text-glow">{val}</span>
                </div>
              ))}
            </div>
            
            {/* Live Diagnostic Stream logs */}
            <div className="text-[9px] text-cyber-secondary/50 font-mono space-y-1 h-[45px] overflow-hidden pt-2 border-t border-cyber-border/40" style={{ transform: 'translateZ(15px)' }}>
              {logs.map((log, idx) => (
                <div key={idx} className="truncate select-none opacity-85">{log}</div>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}