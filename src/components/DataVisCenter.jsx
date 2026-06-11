import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, GitCommit, Settings } from 'lucide-react';

// Generate semi-random git contribution activity levels (0-4) for a 52-week grid
const generateHeatmapData = () => {
  const data = [];
  // 52 weeks * 7 days
  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      // Create interesting patterns instead of pure random
      let level = 0;
      const seed = Math.sin(w * 0.15) * Math.cos(d * 0.4) + Math.random();
      if (seed > 0.8) level = 4;
      else if (seed > 0.4) level = 3;
      else if (seed > 0.1) level = 2;
      else if (seed > -0.3) level = 1;
      week.push(level);
    }
    data.push(week);
  }
  return data;
};

export default function DataVisCenter() {
  const [heatmap] = useState(generateHeatmapData());
  const [hoveredCell, setHoveredCell] = useState(null);
  const [telemetryTimer, setTelemetryTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTimer((prev) => (prev + 1) % 9999);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getHeatmapColor = (level) => {
    switch (level) {
      case 0: return '#18181b'; // zinc-900
      case 1: return '#064e3b'; // emerald-950
      case 2: return '#047857'; // emerald-700
      case 3: return '#10b981'; // emerald-500
      case 4: return '#34d399'; // emerald-400
      default: return '#18181b';
    }
  };

  return (
    <div className="bg-cyber-card/10 border border-cyber-border/40 p-8 rounded-2xl relative overflow-hidden space-y-8">
      {/* Background neon grid */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyber-border/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-cyber-primary font-bold">
            <BarChart3 className="w-5 h-5 animate-pulse" />
            <h2 className="text-xl font-mono uppercase tracking-wider">
              REAL-TIME DEVELOPMENT LOGISTICS
            </h2>
          </div>
          <p className="text-xs font-mono text-cyber-muted">
            Continuous delivery dashboard monitoring code integrity, system compilation, and local network operations.
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-zinc-950 border border-cyber-border px-4 py-2 rounded font-mono text-[10px] text-cyber-secondary flex items-center space-x-3">
          <span>SEC_PULSE: ACTIVE</span>
          <span className="w-2 h-2 bg-cyber-secondary rounded-full animate-ping" />
          <span>CYCLES: {telemetryTimer}</span>
        </div>
      </div>

      {/* Grid of Gauges & Technical Dials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Radial Gauge 1: Java & Spring Capacity */}
        <div className="bg-black/40 border border-cyber-border p-6 rounded-xl flex flex-col items-center justify-between text-center relative group">
          <div className="absolute top-2 left-2 text-[8px] font-mono text-cyber-muted">METRIC: JVM_01</div>
          <div className="w-28 h-28 relative flex items-center justify-center mt-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="44" stroke="#1f2937" strokeWidth="6" fill="transparent" />
              <circle 
                cx="56" 
                cy="56" 
                r="44" 
                stroke="#10b981" 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - 0.90)}
                className="transition-all duration-1000 group-hover:stroke-cyber-accent"
              />
            </svg>
            <div className="absolute font-mono text-lg font-bold text-cyber-text text-glow">90%</div>
          </div>
          <div className="mt-4 font-mono">
            <h4 className="text-xs font-bold text-cyber-text uppercase tracking-widest">Spring Core Integrity</h4>
            <p className="text-[10px] text-cyber-muted mt-1 leading-normal">
              Framework stability testing across JPA controllers, REST endpoints, and security layers.
            </p>
          </div>
        </div>

        {/* Radial Gauge 2: Threat Detection Coverage */}
        <div className="bg-black/40 border border-cyber-border p-6 rounded-xl flex flex-col items-center justify-between text-center relative group">
          <div className="absolute top-2 left-2 text-[8px] font-mono text-cyber-muted">METRIC: SIEM_DET</div>
          <div className="w-28 h-28 relative flex items-center justify-center mt-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="44" stroke="#1f2937" strokeWidth="6" fill="transparent" />
              <circle 
                cx="56" 
                cy="56" 
                r="44" 
                stroke="#06b6d4" 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - 0.75)}
                className="transition-all duration-1000 group-hover:stroke-cyber-primary"
              />
            </svg>
            <div className="absolute font-mono text-lg font-bold text-cyber-text text-glow-cyan">75%</div>
          </div>
          <div className="mt-4 font-mono">
            <h4 className="text-xs font-bold text-cyber-text uppercase tracking-widest">Wazuh Telemetry Coverage</h4>
            <p className="text-[10px] text-cyber-muted mt-1 leading-normal">
              Active host logging, daemon triggers, privilege audits, and rule integration coverage.
            </p>
          </div>
        </div>

        {/* Radial Gauge 3: ML Engine Inference */}
        <div className="bg-black/40 border border-cyber-border p-6 rounded-xl flex flex-col items-center justify-between text-center relative group">
          <div className="absolute top-2 left-2 text-[8px] font-mono text-cyber-muted">METRIC: AI_CORE</div>
          <div className="w-28 h-28 relative flex items-center justify-center mt-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="44" stroke="#1f2937" strokeWidth="6" fill="transparent" />
              <circle 
                cx="56" 
                cy="56" 
                r="44" 
                stroke="#a855f7" 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - 0.80)}
                className="transition-all duration-1000 group-hover:stroke-cyber-secondary"
              />
            </svg>
            <div className="absolute font-mono text-lg font-bold text-cyber-text text-glow-rose">80%</div>
          </div>
          <div className="mt-4 font-mono">
            <h4 className="text-xs font-bold text-cyber-text uppercase tracking-widest">Local ML Accuracy</h4>
            <p className="text-[10px] text-cyber-muted mt-1 leading-normal">
              Inference classification performance for offline tracking metrics and user activities.
            </p>
          </div>
        </div>

      </div>

      {/* SVG GitHub Commit Heatmap */}
      <div className="bg-black/50 border border-cyber-border rounded-xl p-6 relative">
        <div className="flex justify-between items-center mb-4 font-mono">
          <div className="flex items-center space-x-2 text-xs text-cyber-text font-bold">
            <GitCommit className="w-4 h-4 text-cyber-primary" />
            <span className="uppercase tracking-widest">REPOSITORY DEPLOYMENT COMMIT PULSE (PAST 12 MONTHS)</span>
          </div>
          <span className="text-[10px] text-cyber-muted font-bold">
            {hoveredCell ? `COMMITS: ${hoveredCell.level * 2 + 1} ON WEEK ${hoveredCell.w + 1}, DAY ${hoveredCell.d + 1}` : 'HOVER BLOCK FOR LOGS'}
          </span>
        </div>

        {/* Heatmap Grid Wrapper */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px] flex flex-col space-y-1.5 select-none pb-2">
            <div className="flex space-x-1.5">
              {heatmap.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col space-y-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredCell({ level, w: wIdx, d: dIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className="w-[10px] h-[10px] rounded-[1px] transition-colors duration-150 cursor-crosshair border border-black/40 hover:scale-125 hover:border-cyber-primary z-10"
                      style={{ backgroundColor: getHeatmapColor(level) }}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            {/* Legend indicators */}
            <div className="flex justify-end items-center space-x-2 text-[9px] font-mono text-cyber-muted pt-2 pr-2">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: getHeatmapColor(0) }} />
              <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: getHeatmapColor(1) }} />
              <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: getHeatmapColor(2) }} />
              <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: getHeatmapColor(3) }} />
              <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: getHeatmapColor(4) }} />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
