import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Terminal as TermIcon } from 'lucide-react';

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isFading, setIsFading] = useState(false);

  const bootLogs = [
    { threshold: 5, text: "INIT: Initializing Sanjay S Security Core OS v2.0.4..." },
    { threshold: 18, text: "DECRYPT: Key derivation protocols loaded [AES_256 / SHA_256]... OK" },
    { threshold: 32, text: "SIEM: Wazuh Daemon check. Endpoint registered: COMPLIANT" },
    { threshold: 50, text: "AI_AGENT: Loading CYBER_BYTE neural node matrices..." },
    { threshold: 68, text: "HOST: Mapping candidate files (B.Tech IT, 8.4 CGPA)..." },
    { threshold: 82, text: "NETWORK: Port links established. Handshaking secure cockpit..." },
    { threshold: 95, text: "COMPILER: Ingestion sequence stable. Operations console ready." }
  ];

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total boot
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          triggerCompletion();
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Sync logs based on current progress percentage
  useEffect(() => {
    const activeLogs = bootLogs
      .filter((log) => progress >= log.threshold)
      .map((log) => log.text);
    setLogs(activeLogs);
  }, [progress]);

  const triggerCompletion = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 600); // Allow fadeout transition
  };

  return (
    <div 
      className={`fixed inset-0 bg-[#030712] z-[9999] flex flex-col items-center justify-center font-mono text-xs text-cyber-primary p-6 transition-all duration-700 select-none ${isFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}
    >
      {/* Moving CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,7,18,0.7))] z-20" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 z-10"
        style={{
          background: 'linear-gradient(rgba(16, 185, 129, 0) 45%, rgba(16, 185, 129, 0.4) 50%, rgba(16, 185, 129, 0) 55%)',
          backgroundSize: '100% 8px',
        }}
      />

      <div className="max-w-xl w-full flex flex-col items-center space-y-12 relative z-30">
        
        {/* Glowing Shield HUD Logo */}
        <div className="relative group">
          <div className="absolute -inset-1.5 rounded-full bg-cyber-primary/20 blur-md animate-pulse" />
          <div className="relative w-16 h-16 rounded-full border border-cyber-primary flex items-center justify-center bg-black/80">
            <Shield className="w-8 h-8 text-cyber-primary animate-pulse" />
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle 
              cx="72" cy="72" r="62" 
              stroke="rgba(16, 185, 129, 0.1)" strokeWidth="2.5" fill="transparent" 
            />
            <circle 
              cx="72" cy="72" r="62" 
              stroke="#10b981" strokeWidth="3.5" fill="transparent"
              strokeDasharray={2 * Math.PI * 62}
              strokeDashoffset={2 * Math.PI * 62 * (1 - progress / 100)}
              className="transition-all duration-75 ease-out text-glow"
            />
          </svg>
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold tracking-widest text-glow text-cyber-text">{Math.floor(progress)}%</div>
            <div className="text-[9px] text-cyber-secondary font-bold uppercase tracking-widest animate-pulse">BOOTING...</div>
          </div>
        </div>

        {/* Diagnostic log printout block */}
        <div className="w-full h-[130px] bg-black/60 border border-cyber-border rounded-xl p-4 flex flex-col justify-end space-y-1.5 overflow-hidden text-left shadow-lg">
          <div className="flex items-center space-x-1.5 text-cyber-secondary text-[10px] border-b border-cyber-border/40 pb-1.5 mb-1.5">
            <TermIcon className="w-3.5 h-3.5" />
            <span className="font-bold tracking-widest uppercase">BOOT_LOGS_CONSOLE</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 scrollbar-none">
            {logs.map((log, idx) => (
              <div key={idx} className="truncate select-none text-[10px] leading-relaxed opacity-90 text-cyber-primary">
                <span className="text-cyber-secondary mr-1.5">▶</span> {log}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Skip Button */}
      <button 
        onClick={triggerCompletion}
        className="absolute bottom-6 right-6 px-4 py-2 bg-cyber-card border border-cyber-border/80 hover:border-cyber-primary hover:text-cyber-primary text-cyber-muted rounded font-bold text-[10px] tracking-widest uppercase transition-all duration-300 active:scale-95"
      >
        SKIP HANDSHAKE [▶▶]
      </button>

      {/* Access log tag */}
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-cyber-secondary/45">
        SYS_STATUS: SECURE // COIMBATORE, Tamil Nadu, IN
      </div>
    </div>
  );
}
