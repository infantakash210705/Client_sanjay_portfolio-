import React, { useRef, useState, useEffect } from 'react';

/**
 * CyberCore3D renders an interactive 3D holographic node sphere representing
 * a security node network or neural threat matrix.
 */
export default function CyberCore3D({ metrics }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.5, y: 0.5 }); // Rotations in radians
  const targetRotation = useRef({ x: 0.5, y: 0.5 });
  const pulseRadius = useRef(0);
  const pulseActive = useRef(false);

  // Initialize 3D points on a sphere
  const numNodes = 40;
  const nodes = useRef([]);
  const sphereRadius = 80;

  useEffect(() => {
    // Generate nodes spread evenly using Fibonacci sphere algorithm
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      pts.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        baseColor: i % 2 === 0 ? 'rgba(16, 185, 129, 0.9)' : 'rgba(6, 182, 210, 0.9)', // Emerald vs Cyan
        size: Math.random() * 2 + 1.5,
      });
    }
    nodes.current = pts;
  }, []);

  // Frame rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const cameraDistance = 250;

      // Smoothly interpolate rotations to add physics weight
      rotation.current.x += (targetRotation.current.x - rotation.current.x) * 0.1;
      rotation.current.y += (targetRotation.current.y - rotation.current.y) * 0.1;

      // Automatically slow-rotate when not dragging
      if (!isDragging) {
        targetRotation.current.y += 0.003;
        targetRotation.current.x = Math.sin(Date.now() * 0.0005) * 0.3; // Gentle wobble
      }

      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);

      // 1. Draw grid background circles (holographic scanning planes)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.3, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Project 3D nodes into 2D space
      const projected = nodes.current.map(node => {
        // Rotate around Y axis
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.x * sinY + node.z * cosY;

        // Rotate around X axis
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective projection
        const scale = cameraDistance / (cameraDistance + z2);
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        return {
          x: sx,
          y: sy,
          z: z2,
          scale: scale,
          color: node.baseColor,
          size: node.size,
        };
      });

      // Sort by depth (Z index) so back-to-front rendering is correct
      projected.sort((a, b) => b.z - a.z);

      // 3. Draw connections between nearby nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const nodeA = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const nodeB = projected[j];

          // Check distance in 3D (approximate by looking at projected coordinates + depth difference)
          const dist2D = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
          const depthDiff = Math.abs(nodeA.z - nodeB.z);

          if (dist2D < 55 && depthDiff < 60) {
            const opacity = Math.max(0, 1 - (dist2D / 55)) * 0.15;
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * (nodeA.scale + nodeB.scale) / 2})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // 4. Draw Orbiting Holographic Rings
      const drawOrbitRing = (tiltAngle, color, rotationOffset) => {
        const ringPoints = [];
        const steps = 60;
        const ringRadius = sphereRadius * 1.1;

        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2 + rotationOffset;
          // Core planar point
          const rx = Math.cos(angle) * ringRadius;
          const rz = Math.sin(angle) * ringRadius;
          const ry = Math.sin(angle) * Math.sin(tiltAngle) * 20;

          // Apply global rotations
          const x1 = rx * cosY - rz * sinY;
          const z1 = rx * sinY + rz * cosY;
          const y2 = ry * cosX - z1 * sinX;
          const z2 = ry * sinX + z1 * cosX;

          const scale = cameraDistance / (cameraDistance + z2);
          ringPoints.push({
            x: centerX + x1 * scale,
            y: centerY + y2 * scale,
            z: z2,
          });
        }

        // Draw ring segments, altering color or breaking line to look cybernetic
        ctx.lineWidth = 1;
        for (let i = 0; i < ringPoints.length - 1; i++) {
          if (i % 6 > 3) continue; // Dotted effect
          const p1 = ringPoints[i];
          const p2 = ringPoints[i + 1];
          const opacity = Math.max(0.1, 0.4 - p1.z / 200);
          ctx.strokeStyle = color.replace('opacity', opacity.toFixed(2));
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      };

      const time = Date.now() * 0.001;
      drawOrbitRing(Math.PI / 4, 'rgba(6, 182, 212, opacity)', time);
      drawOrbitRing(-Math.PI / 3, 'rgba(16, 185, 129, opacity)', -time * 1.2);

      // 5. Draw 3D security pulse wave if triggered
      if (pulseActive.current) {
        pulseRadius.current += 1.8;
        if (pulseRadius.current > sphereRadius * 1.4) {
          pulseActive.current = false;
        } else {
          ctx.strokeStyle = `rgba(16, 185, 129, ${1 - (pulseRadius.current / (sphereRadius * 1.4))})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseRadius.current, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 6. Draw the actual nodes
      projected.forEach(node => {
        // Opacity drops if node is deep in background
        const alpha = Math.max(0.1, Math.min(1, (cameraDistance - node.z) / cameraDistance)) * 0.9;
        ctx.fillStyle = node.color.replace('0.9', alpha.toFixed(2));
        
        ctx.beginPath();
        // Adjust node drawing size by camera scale factor
        ctx.arc(node.x, node.y, node.size * node.scale, 0, Math.PI * 2);
        ctx.fill();

        // Highlight nodes facing closest to camera with a glowing aura
        if (node.z < -40) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#10b981';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 0.6 * node.scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }
      });

      // 7. Scanning Laser Line
      const laserY = centerY + Math.sin(time * 2) * sphereRadius * 0.9;
      const grad = ctx.createLinearGradient(centerX - sphereRadius, laserY, centerX + sphereRadius, laserY);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0)');
      grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(centerX - sphereRadius, laserY - 1, sphereRadius * 2, 2);

      // Radar scanline sweeping around
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDragging]);

  // Handle Drag-to-Rotate events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    targetRotation.current.y += dx * 0.01;
    targetRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.current.x + dy * 0.01));

    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Support Mobile Touch drag rotation
  const handleTouchStart = (e) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;

    targetRotation.current.y += dx * 0.012;
    targetRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.current.x + dy * 0.012));

    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const triggerPingPulse = () => {
    pulseRadius.current = 0;
    pulseActive.current = true;
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[240px] md:h-[280px] bg-cyber-card/30 border border-cyber-border rounded-xl flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing group select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onClick={triggerPingPulse}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
      
      {/* Absolute Overlays for Telemetry Visuals */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-cyber-muted uppercase tracking-widest flex flex-col space-y-1">
        <span className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-pulse" />
          <span className="text-cyber-text font-bold">NODE STATUS: DEPLOYED</span>
        </span>
        <span>SIEM DYN_GRID OVERLAY</span>
      </div>

      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-cyber-muted uppercase tracking-widest flex flex-col">
        <span>X-AXIS ROT: {(rotation.current.x * (180 / Math.PI)).toFixed(0)}°</span>
        <span>Y-AXIS ROT: {(rotation.current.y * (180 / Math.PI)).toFixed(0)}°</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[9px] text-right text-cyber-secondary uppercase tracking-widest flex flex-col space-y-0.5 bg-cyber-bg/70 px-2 py-1 rounded border border-cyber-border/40 backdrop-blur-sm z-30">
        <span>TRSM_RATE: {((metrics?.packets || 1420) / 10).toFixed(1)} KB/S</span>
        <span>CPU_LOAD: {((metrics?.memoryUsage || 42) * 0.8).toFixed(1)}%</span>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-cyber-primary/40 text-right pointer-events-none">
        [CLICK CORE FOR SECURE PING]
      </div>

      {/* Futuristic holographic scanning frame */}
      <div className="absolute inset-0 border border-cyber-primary/10 pointer-events-none rounded-xl" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-primary" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-primary" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-primary" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-primary" />
    </div>
  );
}
