import React from 'react';
import TiltCard from './TiltCard';

// Generates an interactive geometric canvas mapping structural proficiency matrix
export default function SkillRadar({ skills }) {
  const center = 150;
  const radius = 100;
  const totalSides = skills.length;
  
  // Calculate polar coordinates for the dynamic polyline vector
  const points = skills.map((skill, i) => {
    const angle = (Math.PI * 2 / totalSides) * i - Math.PI / 2;
    const distance = (skill.level / 100) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <TiltCard className="w-full max-w-[320px]">
      <div 
        className="w-full aspect-square bg-cyber-card/20 border border-cyber-border hover:border-cyber-primary/30 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-3 left-3 text-[9px] text-cyber-muted font-mono tracking-widest" style={{ transform: 'translateZ(15px)' }}>
          VECTOR MATRIX TELEMETRY
        </div>
        <svg 
          viewBox="0 0 300 300" 
          className="w-full h-full transform rotate-0 transition-transform duration-700 group-hover:rotate-6"
          style={{ transform: 'translateZ(35px)' }}
        >
          {/* Render Concentric Tracking Webs */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, idx) => (
            <circle 
              key={idx} cx={center} cy={center} r={radius * ratio} 
              fill="none" stroke="#1f2937" strokeWidth="1" strokeDasharray={ratio === 1 ? "4 4" : "0"}
            />
          ))}
          {/* Render Computed Mathematical Framework Polygon */}
          <polygon points={points} fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" />
          
          {/* Dynamic Nodes */}
          {skills.map((skill, i) => {
            const angle = (Math.PI * 2 / totalSides) * i - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#1f2937" strokeWidth="1" />
            );
          })}
        </svg>
      </div>
    </TiltCard>
  );
}