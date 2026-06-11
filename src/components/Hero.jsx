import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Cpu, ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import TiltCard from './TiltCard';
import DecryptedText from './DecryptedText';

// Three.js 3D WebGL neural particle grid background
function ThreeNeuralBg() {
  const containerRef = useRef(null);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene, camera, renderer, geometry, material, lineGeometry, lineMaterial, animId;
    let eventListenersActive = false;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.04;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.04;
    };

    const onResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    try {
      // scene
      scene = new THREE.Scene();
      
      // camera
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 380;

      // renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      // particles configuration
      const particleCount = 75;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 550;
        const y = (Math.random() - 0.5) * 550;
        const z = (Math.random() - 0.5) * 550;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        velocities.push({
          x: (Math.random() - 0.5) * 0.4,
          y: (Math.random() - 0.5) * 0.4,
          z: (Math.random() - 0.5) * 0.4
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      material = new THREE.PointsMaterial({
        color: 0x10b981, // emerald
        size: 4.5,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // connections
      lineMaterial = new THREE.LineBasicMaterial({
        color: 0x06b6d4, // cyan
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
      });

      lineGeometry = new THREE.BufferGeometry();
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onResize);
      eventListenersActive = true;

      // animate loop
      const animate = () => {
        animId = requestAnimationFrame(animate);

        // update node positions
        const posArr = geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          posArr[i * 3] += velocities[i].x;
          posArr[i * 3 + 1] += velocities[i].y;
          posArr[i * 3 + 2] += velocities[i].z;

          // bounce boundaries
          if (posArr[i * 3] < -275 || posArr[i * 3] > 275) velocities[i].x *= -1;
          if (posArr[i * 3 + 1] < -275 || posArr[i * 3 + 1] > 275) velocities[i].y *= -1;
          if (posArr[i * 3 + 2] < -275 || posArr[i * 3 + 2] > 275) velocities[i].z *= -1;
        }
        geometry.attributes.position.needsUpdate = true;

        // recalculate connections
        const linePositions = [];
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = posArr[i * 3] - posArr[j * 3];
            const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
            const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 90) {
              linePositions.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2]);
              linePositions.push(posArr[j * 3], posArr[j * 3 + 1], posArr[j * 3 + 2]);
            }
          }
        }

        if (linePositions.length > 0) {
          lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
          lineGeometry.computeBoundingSphere();
          lines.visible = true;
        } else {
          lines.visible = false;
        }

        // slow passive rotation
        particles.rotation.y += 0.0008;
        lines.rotation.y += 0.0008;

        // mouse offset easing
        targetX.current += (mouseX - targetX.current) * 0.04;
        targetY.current += (mouseY - targetY.current) * 0.04;
        scene.rotation.y = targetX.current * 0.004;
        scene.rotation.x = targetY.current * 0.004;

        renderer.render(scene, camera);
      };

      animate();

    } catch (err) {
      console.warn("ThreeJS initialization failed (WebGL probably unsupported):", err);
    }

    return () => {
      if (eventListenersActive) {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
      }
      if (animId) cancelAnimationFrame(animId);

      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (lineGeometry) lineGeometry.dispose();
      if (lineMaterial) lineMaterial.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none -z-20 overflow-hidden" />;
}

export default function Hero({ data }) {
  const [text, setText] = useState('');
  const [hudOffset, setHudOffset] = useState({ x: 0, y: 0 });
  const fullText = "Building Intelligent Software & Secure Digital Systems";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08; // 8% parallax
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    setHudOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setHudOffset({ x: 0, y: 0 });
  };

  // Entrance variants for staggered cascade
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[85vh] flex flex-col justify-center items-center text-center relative font-mono pt-12 select-none overflow-hidden"
    >
      {/* Three.js background */}
      <ThreeNeuralBg />

      {/* 3D Holographic Parallax Target Scope */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none -z-10 opacity-15 transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${-hudOffset.x}px, ${-hudOffset.y}px, 0)` }}
      >
        <div className="w-[600px] h-[600px] rounded-full border border-cyber-primary/20 flex items-center justify-center animate-spin-slow relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyber-primary/15" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyber-primary/15" />
          
          <div className="w-[460px] h-[460px] rounded-full border border-dashed border-cyber-secondary/35 flex items-center justify-center animate-reverse-spin relative">
            <div className="w-[300px] h-[300px] rounded-full border border-cyber-accent/20 flex items-center justify-center relative">
              <div className="w-6 h-[1px] bg-cyber-primary absolute" />
              <div className="h-6 w-[1px] bg-cyber-primary absolute" />
            </div>
          </div>
        </div>
      </div>

      {/* Hexagonal Background Glow elements */}
      <div className="absolute w-72 h-72 bg-cyber-primary/5 rounded-full blur-[80px] -z-15 top-1/4" />
      <div className="absolute w-96 h-96 bg-cyber-secondary/5 rounded-full blur-[100px] -z-15 bottom-1/4" />

      {/* Main Interactive 3D Card Block */}
      <TiltCard className="w-full max-w-3xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-cyber-card/15 border border-cyber-border/30 backdrop-blur-[3px] p-8 sm:p-12 rounded-3xl space-y-6 flex flex-col items-center justify-center relative overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-cyber-card border border-cyber-primary/30 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest text-cyber-primary uppercase"
            style={{ transform: 'translateZ(20px)' }}
          >
            <Shield className="w-3.5 h-3.5 animate-spin-slow text-cyber-primary" />
            <span>CYBERNETIC SECURITY ENGINE ACTIVATED // SEC_OVERSEER</span>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            style={{ transform: 'translateZ(45px)' }}
            className="space-y-1"
          >
            <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-cyber-secondary font-bold font-mono">ACCESSING PROFILE DATABASE:</span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-accent uppercase text-glow">
              <DecryptedText text="SANJAY S" speed={60} />
            </h1>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-md sm:text-2xl font-bold tracking-tight text-cyber-text max-w-2xl mx-auto leading-normal min-h-[3rem]"
            style={{ transform: 'translateZ(30px)' }}
          >
            {text}<span className="animate-pulse text-cyber-primary font-bold">|</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-xs sm:text-base text-cyber-muted max-w-2xl mx-auto font-sans font-light tracking-wide leading-relaxed"
            style={{ transform: 'translateZ(15px)' }}
          >
            IT Undergraduate Specialist targeting secure transactional middleware execution pipelines, multi-threaded Java Spring backend system compilation, and integrated enterprise local AI modules.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 pt-4 text-[10px] sm:text-xs font-bold tracking-widest uppercase"
            style={{ transform: 'translateZ(25px)' }}
          >
            <a 
              href="#contact" 
              className="px-6 py-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black rounded font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 border border-transparent"
            >
              <Cpu className="w-4 h-4" />
              <span>ESTABLISH LINK</span>
            </a>
            <a 
              href="/resume/Sanjay_S_Resume.pdf" download
              className="px-6 py-3 bg-cyber-bg/50 border border-cyber-border hover:border-cyber-primary hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] text-cyber-text rounded transition-all flex items-center space-x-2"
            >
              <Terminal className="w-4 h-4 text-cyber-secondary" />
              <span>EXTRACT CORE RESUME</span>
            </a>
          </motion.div>
        </motion.div>
      </TiltCard>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-cyber-muted" />
      </div>
    </section>
  );
}