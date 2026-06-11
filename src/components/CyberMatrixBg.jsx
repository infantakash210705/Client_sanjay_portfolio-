import React, { useEffect, useRef } from 'react';

/**
 * CyberMatrixBg renders a full-viewport interactive 3D grid and starfield.
 * Shifts camera angle and scale dynamically with scroll and mouse coordinate changes.
 * Warps space around the mouse cursor and generates spark bursts on screen clicks.
 */
export default function CyberMatrixBg() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, rawX: -9999, rawY: -9999 });
  const scroll = useRef({ y: 0, targetY: 0 });
  const sparks = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas resolution
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse coordinates (mapped to -1 to +1 relative to screen center)
    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.rawX = e.clientX;
      mouse.current.rawY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.rawX = -9999;
      mouse.current.rawY = -9999;
    };

    // Track scroll offset
    const handleScroll = () => {
      scroll.current.targetY = window.scrollY;
    };

    // Spawns digital sparks on mouse clicks
    const handleWindowClick = (e) => {
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const velocity = 2 + Math.random() * 5;
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.025,
          color: Math.random() > 0.5 ? '#10b981' : '#06b6d4',
          size: Math.random() * 2 + 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleWindowClick);

    // Generate 3D background points
    const numPoints = 65;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: (Math.random() - 0.5) * 800, // Spread width
        y: (Math.random() - 0.5) * 600, // Spread height
        z: Math.random() * 800 + 100,    // Depth
        speedZ: -0.15 - Math.random() * 0.1, // Move forward slowly
        color: i % 3 === 0 ? 'rgba(6, 182, 212,' : 'rgba(16, 185, 129,', // Cyan and Emerald
      });
    }

    // Gravity warp calculation
    const applyGravityWarp = (sx, sy) => {
      if (mouse.current.rawX === -9999) return { x: sx, y: sy };
      const dx = mouse.current.rawX - sx;
      const dy = mouse.current.rawY - sy;
      const dist = Math.hypot(dx, dy);
      const gravityRange = 160;

      if (dist < gravityRange) {
        // Bend space coordinates towards cursor
        const force = (1 - dist / gravityRange) * 16;
        return {
          x: sx + (dx / dist) * force,
          y: sy + (dy / dist) * force,
          warped: true
        };
      }
      return { x: sx, y: sy };
    };

    const render = () => {
      if (!ctx || !canvas) return;

      // Dark background fill
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const focalLength = 350;

      // Smoothly interpolate mouse inputs
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

      // Smoothly interpolate scroll offset
      scroll.current.y += (scroll.current.targetY - scroll.current.y) * 0.1;

      // Calculate camera angles based on mouse and scroll
      // Scroll shifts camera pitch (rotates around X-axis)
      const angleX = mouse.current.y * 0.08 + scroll.current.y * 0.0006;
      const angleY = mouse.current.x * 0.1;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // --- Draw 3D Grid Plane (Cyber Landscape) ---
      ctx.lineWidth = 0.5;
      const gridY = 220; // Floor height in 3D
      const gridWidth = 1200;
      const numGridLines = 15;
      const minZ = 100;
      const maxZ = 900;

      // 1. Vertical grid lines running into the distance
      for (let i = 0; i <= numGridLines; i++) {
        const xPercent = (i / numGridLines) - 0.5;
        const gridX = xPercent * gridWidth;

        // Line start (far distance)
        const zFar = maxZ;
        const x1Far = gridX * cosY - zFar * sinY;
        const z1Far = gridX * sinY + zFar * cosY;
        const y2Far = gridY * cosX - z1Far * sinX;
        const z2Far = gridY * sinX + z1Far * cosX;
        const scaleFar = focalLength / (focalLength + z2Far);
        const rawSxFar = centerX + x1Far * scaleFar;
        const rawSyFar = centerY + y2Far * scaleFar;

        // Apply mouse gravity warp
        const pFar = applyGravityWarp(rawSxFar, rawSyFar);

        // Line end (near distance)
        const zNear = minZ;
        const x1Near = gridX * cosY - zNear * sinY;
        const z1Near = gridX * sinY + zNear * cosY;
        const y2Near = gridY * cosX - z1Near * sinX;
        const z2Near = gridY * sinX + z1Near * cosX;
        const scaleNear = focalLength / (focalLength + z2Near);
        const rawSxNear = centerX + x1Near * scaleNear;
        const rawSyNear = centerY + y2Near * scaleNear;

        // Apply mouse gravity warp
        const pNear = applyGravityWarp(rawSxNear, rawSyNear);

        // Draw line with opacity fading into distance
        const grad = ctx.createLinearGradient(pNear.x, pNear.y, pFar.x, pFar.y);
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0.01)');
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(pNear.x, pNear.y);
        ctx.lineTo(pFar.x, pFar.y);
        ctx.stroke();
      }

      // 2. Horizontal grid divisions (depth rings)
      const numDivisions = 12;
      for (let i = 0; i < numDivisions; i++) {
        // Shift horizontal lines based on scroll position for scroll velocity animation
        const zBase = ((i / numDivisions) * (maxZ - minZ) + minZ - (scroll.current.y * 0.2)) % (maxZ - minZ);
        const gridZ = zBase < 0 ? zBase + (maxZ - minZ) + minZ : zBase + minZ;

        const leftX = -gridWidth / 2;
        const rightX = gridWidth / 2;

        // Left point
        const x1L = leftX * cosY - gridZ * sinY;
        const z1L = leftX * sinY + gridZ * cosY;
        const y2L = gridY * cosX - z1L * sinX;
        const z2L = gridY * sinX + z1L * cosX;
        const scaleL = focalLength / (focalLength + z2L);
        const rawSxL = centerX + x1L * scaleL;
        const rawSyL = centerY + y2L * scaleL;
        const pL = applyGravityWarp(rawSxL, rawSyL);

        // Right point
        const x1R = rightX * cosY - gridZ * sinY;
        const z1R = rightX * sinY + gridZ * cosY;
        const y2R = gridY * cosX - z1R * sinX;
        const z2R = gridY * sinX + z1R * cosX;
        const scaleR = focalLength / (focalLength + z2R);
        const rawSxR = centerX + x1R * scaleR;
        const rawSyR = centerY + y2R * scaleR;
        const pR = applyGravityWarp(rawSxR, rawSyR);

        // Fade out lines deep in depth (z)
        const alpha = Math.max(0, 1 - (gridZ - minZ) / (maxZ - minZ)) * 0.08;
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;

        ctx.beginPath();
        ctx.moveTo(pL.x, pL.y);
        ctx.lineTo(pR.x, pR.y);
        ctx.stroke();
      }

      // --- Draw 3D Drifting Starfield Nodes ---
      const projected = points.map((p) => {
        p.z += p.speedZ;
        // Wrap particle depth if it flies past the camera or too far back
        if (p.z < 10) {
          p.z = 900;
          p.x = (Math.random() - 0.5) * 800;
          p.y = (Math.random() - 0.5) * 600;
        }

        // Rotate Y axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Rotate X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Projection
        const scale = focalLength / (focalLength + z2);
        const rawSx = centerX + x1 * scale;
        const rawSy = centerY + y2 * scale;

        // Apply mouse gravity warp
        const pWarped = applyGravityWarp(rawSx, rawSy);

        return {
          x: pWarped.x,
          y: pWarped.y,
          z: z2,
          scale: scale,
          color: p.color,
          rawZ: p.z,
        };
      });

      // Connections between nearby background stars (constellation nodes)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const starA = projected[i];
        if (starA.z < 0 || starA.x < 0 || starA.x > width || starA.y < 0 || starA.y > height) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const starB = projected[j];
          if (starB.z < 0 || starB.x < 0 || starB.x > width || starB.y < 0 || starB.y > height) continue;

          // Connect if they are within proximity
          const dx = starA.x - starB.x;
          const dy = starA.y - starB.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 90 && Math.abs(starA.rawZ - starB.rawZ) < 80) {
            const alpha = Math.max(0, 1 - dist / 90) * 0.05;
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(starA.x, starA.y);
            ctx.lineTo(starB.x, starB.y);
            ctx.stroke();
          }
        }
      }

      // Draw the background particles
      projected.forEach((star) => {
        if (star.z < 10) return;

        // Distance opacity mapping
        const alpha = Math.max(0, 1 - star.rawZ / 900) * 0.25;
        ctx.fillStyle = `${star.color}${alpha.toFixed(2)})`;

        ctx.beginPath();
        ctx.arc(star.x, star.y, Math.max(0.5, 2.0 * star.scale), 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Draw & Update Click Sparks ---
      sparks.current.forEach((spark, index) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        // Gravity pull sparks down slightly
        spark.vy += 0.06;
        spark.life -= spark.decay;

        if (spark.life <= 0) {
          sparks.current.splice(index, 1);
          return;
        }

        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.life;
        ctx.shadowBlur = 4;
        ctx.shadowColor = spark.color;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
