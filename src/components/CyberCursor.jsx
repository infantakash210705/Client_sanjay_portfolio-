import React, { useEffect, useRef, useState } from 'react';

export default function CyberCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const canvasRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Mouse positions
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const particles = useRef([]);

  // Ref to store active hover element to avoid costly querySelector calls on every frame
  const hoveredElementRef = useRef(null);

  useEffect(() => {
    // Hide default cursor on desktop
    const style = document.createElement('style');
    style.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, input, select, textarea, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setHidden(false);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      createParticles(mouse.current.x, mouse.current.y);
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Dynamic Hover / Magnetic detection
    const handleMouseOver = (e) => {
      if (e.target && typeof e.target.closest === 'function') {
        const target = e.target.closest('a, button, input, textarea, [data-cursor-text], .cursor-pointer');
        if (target) {
          hoveredElementRef.current = target;
          setIsHovered(true);
          const text = target.getAttribute('data-cursor-text');
          if (text) {
            setCursorText(text);
          }

          // Magnetic snap: if it has snap attribute or is a button/input
          if (target.getAttribute('data-cursor-snap') !== 'false') {
            const rect = target.getBoundingClientRect();
            // We can let the ring expand to cover the button
            if (cursorRingRef.current) {
              cursorRingRef.current.style.width = `${rect.width + 12}px`;
              cursorRingRef.current.style.height = `${rect.height + 12}px`;
              cursorRingRef.current.style.borderRadius = getComputedStyle(target).borderRadius || '4px';
            }
          }
        }
      }
    };

    const handleMouseOut = (e) => {
      if (e.target && typeof e.target.closest === 'function') {
        const target = e.target.closest('a, button, input, textarea, [data-cursor-text], .cursor-pointer');
        if (target) {
          hoveredElementRef.current = null;
          setIsHovered(false);
          setCursorText('');
          if (cursorRingRef.current) {
            cursorRingRef.current.style.width = '32px';
            cursorRingRef.current.style.height = '32px';
            cursorRingRef.current.style.borderRadius = '50%';
          }
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Particle logic inside a requestAnimationFrame loop
    let animationFrameId;
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;

    const updateRingAndParticles = () => {
      // Spring logic for ring position
      const ease = 0.15;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ease;

      if (cursorRingRef.current) {
        const snapTarget = hoveredElementRef.current;
        
        if (snapTarget && snapTarget.getAttribute('data-cursor-snap') !== 'false') {
          const rect = snapTarget.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + rect.height / 2;
          
          ringPos.current.x += (targetX - ringPos.current.x) * 0.25;
          ringPos.current.y += (targetY - ringPos.current.y) * 0.25;
        }
        
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Draw Particles
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        particles.current = particles.current.filter((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity || 0.05;
          p.life -= p.decay;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();

          return p.life > 0;
        });
      }

      animationFrameId = requestAnimationFrame(updateRingAndParticles);
    };

    animationFrameId = requestAnimationFrame(updateRingAndParticles);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      document.head.removeChild(style);
    };
  }, []);

  const createParticles = (x, y) => {
    const colors = ['#06b6d4', '#10b981', '#f43f5e', '#a855f7'];
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.04,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
      });
    }
  };

  return (
    <div className={`transition-opacity duration-300 ${hidden ? 'opacity-0' : 'opacity-100'}`}>
      {/* Click Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
      />

      {/* Center crosshair dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyber-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen hidden md:flex items-center justify-center"
      >
        <div className="w-[18px] h-[1px] bg-cyber-primary/40 absolute" />
        <div className="h-[18px] w-[1px] bg-cyber-primary/40 absolute" />
      </div>

      {/* Lagging outer tracking circle */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9998] transition-[width,height,border-radius,border-color,background-color] duration-300 ease-out hidden md:block ${
          isClicking
            ? 'border-cyber-accent bg-cyber-accent/10 scale-75'
            : isHovered
            ? 'border-cyber-secondary bg-cyber-secondary/5 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            : 'border-cyber-primary bg-transparent'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
          width: '32px',
          height: '32px',
        }}
      >
        {/* Tech crosshair markings */}
        {!isHovered && (
          <>
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-[1px] bg-cyber-primary" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-[1px] bg-cyber-primary" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-1.5 bg-cyber-primary" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-1.5 bg-cyber-primary" />
          </>
        )}

        {/* Dynamic Context Tooltip String */}
        {cursorText && (
          <div className="absolute top-1/2 left-10 -translate-y-1/2 bg-black/85 border border-cyber-secondary px-2 py-0.5 rounded text-[9px] font-mono text-cyber-secondary uppercase tracking-widest whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.6)] animate-pulse">
            {cursorText}
          </div>
        )}
      </div>
    </div>
  );
}
