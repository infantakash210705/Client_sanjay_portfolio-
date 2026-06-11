import React, { useState, useEffect } from 'react';
import { ShieldAlert, Server, Network, ShieldCheck } from 'lucide-react';
import TiltCard from './TiltCard';
import CyberCore3D from './CyberCore3D';

export default function DashboardWidgets() {
  const [metrics, setMetrics] = useState({ packets: 1420, threatsBlocked: 89, memoryUsage: 42.1 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        packets: prev.packets + Math.floor(Math.random() * 8) + 1,
        threatsBlocked: prev.threatsBlocked + (Math.random() > 0.94 ? 1 : 0),
        memoryUsage: +(40 + Math.random() * 4).toFixed(1)
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
      
      {/* Interactive Telemetry Metrics (Col Span 2 on Desktop) */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Card 1: Firewall Telemetry */}
        <TiltCard className="h-full">
          <div 
            className="bg-cyber-card/60 border border-cyber-border hover:border-cyber-secondary/30 p-5 rounded-xl h-full flex flex-col justify-between space-y-4 relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-center" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-cyber-muted tracking-widest uppercase">FIREWALL TELEMETRY</span>
              <Network className="text-cyber-secondary w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
            
            <div 
              className="text-2xl font-bold tracking-tight text-cyber-text text-glow-cyan py-1" 
              style={{ transform: 'translateZ(40px)' }}
            >
              {metrics.packets.toLocaleString()} Pkts/s
            </div>
            
            <div className="text-[10px] text-cyber-secondary flex items-center space-x-1.5" style={{ transform: 'translateZ(15px)' }}>
              <span className="w-1.5 h-1.5 bg-cyber-secondary rounded-full animate-ping" />
              <span className="font-bold tracking-wider">INGESTION PIPELINE ACTIVE</span>
            </div>
          </div>
        </TiltCard>

        {/* Card 2: SIEM Events Blocked */}
        <TiltCard className="h-full">
          <div 
            className="bg-cyber-card/60 border border-cyber-border hover:border-rose-500/30 p-5 rounded-xl h-full flex flex-col justify-between space-y-4 relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-center" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-cyber-muted tracking-widest uppercase">SIEM EVENTS BLOCK</span>
              <ShieldAlert className="text-rose-500 w-5 h-5 animate-pulse" />
            </div>
            
            <div 
              className="text-2xl font-bold tracking-tight text-rose-400 text-glow-rose py-1" 
              style={{ transform: 'translateZ(40px)' }}
            >
              {metrics.threatsBlocked} Attacks Nullified
            </div>
            
            <div className="text-[10px] text-rose-400/80 flex items-center space-x-1.5" style={{ transform: 'translateZ(15px)' }}>
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
              <span className="font-bold tracking-wider">MALICIOUS SIGNATURES DROPPED</span>
            </div>
          </div>
        </TiltCard>

        {/* Card 3: Local Runtime Memory */}
        <TiltCard className="h-full">
          <div 
            className="bg-cyber-card/60 border border-cyber-border hover:border-cyber-accent/30 p-5 rounded-xl h-full flex flex-col justify-between space-y-4 relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-center" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-cyber-muted tracking-widest uppercase">LOCAL RUNTIME MEM</span>
              <Server className="text-cyber-accent w-5 h-5" />
            </div>
            
            <div className="space-y-2" style={{ transform: 'translateZ(35px)' }}>
              <div className="text-2xl font-bold tracking-tight text-cyber-text">{metrics.memoryUsage}% JVM Buffer</div>
              <div className="w-full bg-cyber-bg h-1.5 rounded-full overflow-hidden border border-cyber-border">
                <div 
                  className="bg-gradient-to-r from-cyber-accent to-cyber-secondary h-full transition-all duration-1000" 
                  style={{ width: `${metrics.memoryUsage}%` }} 
                />
              </div>
            </div>
            
            <div className="text-[10px] text-cyber-muted flex items-center justify-between" style={{ transform: 'translateZ(15px)' }}>
              <span>SWAP STATUS: OK</span>
              <span className="text-cyber-accent font-bold">HEAP ALLOCATED</span>
            </div>
          </div>
        </TiltCard>

        {/* Card 4: System Integrity */}
        <TiltCard className="h-full">
          <div 
            className="bg-cyber-card/60 border border-cyber-primary/20 hover:border-cyber-primary/40 p-5 rounded-xl h-full flex flex-col justify-between space-y-4 relative overflow-hidden bg-gradient-to-br from-cyber-card/80 to-cyber-bg"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-center" style={{ transform: 'translateZ(20px)' }}>
              <span className="text-cyber-primary tracking-widest uppercase font-bold">SYSTEM INTEGRITY</span>
              <ShieldCheck className="text-cyber-primary w-5 h-5" />
            </div>
            
            <div 
              className="text-2xl font-bold tracking-tight text-cyber-primary text-glow py-1" 
              style={{ transform: 'translateZ(40px)' }}
            >
              COMPLIANT
            </div>
            
            <div className="text-[10px] text-cyber-muted flex justify-between items-center" style={{ transform: 'translateZ(15px)' }}>
              <span>WAZUH CONFIG REGISTERED</span>
              <span className="text-cyber-primary font-bold">SECURE</span>
            </div>
          </div>
        </TiltCard>

      </div>

      {/* 3D Cyber Core Node Telemetry (Col Span 1 on Desktop, stands next to widgets) */}
      <div className="lg:col-span-1 flex flex-col h-full justify-between">
        <CyberCore3D metrics={metrics} />
      </div>

    </div>
  );
}