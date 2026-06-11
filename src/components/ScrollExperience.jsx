import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function ScrollExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const onScroll = (e) => {
      const p = e?.progress ?? lenis?.progress;
      if (typeof p === 'number' && !isNaN(p)) {
        setScrollProgress(p * 100);
      }
    };

    lenis.on('scroll', onScroll);

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    // Backup standard scroll handler for instant update
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top glowing progress scanner bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-black/40 z-[9995] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll Scanner Node on the right */}
      <div className="fixed right-3 top-1/4 bottom-1/4 w-[2px] bg-cyber-border/40 pointer-events-none z-[9990] hidden md:block rounded-full">
        <div 
          className="w-2.5 h-2.5 rounded-full bg-cyber-primary shadow-[0_0_12px_rgba(16,185,129,1)] absolute -left-1 -translate-y-1/2 transition-all duration-100 ease-out"
          style={{ top: `${scrollProgress}%` }}
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[8px] font-mono text-cyber-primary/70 tracking-widest uppercase whitespace-nowrap bg-black/60 px-1 border border-cyber-primary/20 rounded">
            SCAN: {Math.floor(scrollProgress)}%
          </span>
        </div>
      </div>
    </>
  );
}
