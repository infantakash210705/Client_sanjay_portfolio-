import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Sun, Moon, Github, Linkedin } from 'lucide-react';

export default function Navbar({ isDarkMode, setIsDarkMode, setTerminalOpen }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const navLinks = [
    { name: 'DASHBOARD', href: '#dashboard' },
    { name: 'GALAXY', href: '#galaxy' },
    { name: 'DEPLOYS', href: '#projects' },
    { name: 'TIMELINE', href: '#experience' },
    { name: 'ANALYTICS', href: '#analytics' },
    { name: 'CONNECT', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-cyber-border bg-cyber-bg/80 backdrop-blur-md font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Shield className="w-5 h-5 text-cyber-primary transition-transform group-hover:rotate-12" />
          <span className="font-bold tracking-widest text-sm text-cyber-text">SANJAY S</span>
        </div>

        {/* Dynamic sliding pill navigation list */}
        <div className="hidden md:flex items-center space-x-2 relative text-xs font-medium tracking-wider uppercase">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative px-3 py-1.5 text-cyber-muted hover:text-cyber-primary transition-colors duration-200 z-10"
            >
              <span className="relative z-10">{link.name}</span>
              {hoveredIdx === idx && (
                <motion.div
                  layoutId="navbarHoverPill"
                  className="absolute inset-0 bg-cyber-primary/10 border border-cyber-primary/30 rounded-lg"
                  style={{ zIndex: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setTerminalOpen(prev => !prev)}
            className="p-1.5 rounded bg-cyber-card border border-cyber-border text-cyber-secondary hover:text-cyber-primary transition-colors"
            title="Open Console Core"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded bg-cyber-card border border-cyber-border text-cyber-muted hover:text-cyber-text transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="h-4 w-[1px] bg-cyber-border" />
          <a href="https://github.com/Sanjays2006" target="_blank" rel="noreferrer" className="text-cyber-muted hover:text-cyber-text"><Github className="w-4 h-4" /></a>
          <a href="https://www.linkedin.com/in/s-sanjay-8111372a5/" target="_blank" rel="noreferrer" className="text-cyber-muted hover:text-cyber-text"><Linkedin className="w-4 h-4" /></a>
        </div>
      </div>
    </nav>
  );
}