import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

export default function CyberTerminal({ close }) {
  const [history, setHistory] = useState([
    'SANJAY OPERATING SHELL v1.4.0 (TTY/1)',
    'Type "help" to display allowed administrative directives.',
    ''
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const execCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = [];

    switch(cmd) {
      case 'help':
        response = [
          'Available diagnostics instructions:',
          '  about       - Detailed summary of candidate systems config',
          '  skills      - Query core tech proficiencies stack',
          '  projects    - Output references to deployed logic layers',
          '  education   - Inspect academic credentials metadata',
          '  clear       - Wipe session buffer output logs',
          '  exit        - Terminate console connection thread'
        ];
        break;
      case 'about':
        response = ['Sanjay S - Full Stack Developer & Cybersecurity Specialist. Specialize in secure enterprise-grade systems architecture, offline machine learning engines, and microservices configuration tracking loops.'];
        break;
      case 'skills':
        response = ['Core Stack Metrics: Java (Spring Boot), Python (Machine Learning), PostgreSQL, Web Security Architecture, Wazuh SIEM Endpoint configuration Management, REST Routing.'];
        break;
      case 'projects':
        response = ['- AI-Based Productivity Tracker (Spring Boot Local Model Processing Core)', '- Local High-Entropy Cryptographic Shield Stack', '- Threat Hunting Infrastructure Logging Hub (Wazuh Execution Engine)'];
        break;
      case 'education':
        response = ['B.Tech Information Technology - Rathinam Technical Campus (CGPA: 8.4) [2023 - 2027]'];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        close();
        return;
      default:
        response = [`Command not found: "${cmd}". Enter "help" for systematic instructions.`];
    }

    setHistory(prev => [...prev, `sanjay@sec-hub:~$ ${input}`, ...response, '']);
    setInput('');
  };

  return (
    <div className="fixed inset-x-4 bottom-4 md:right-4 md:left-auto md:w-[500px] h-80 bg-black/95 border border-cyber-primary/40 rounded-xl shadow-2xl z-50 flex flex-col font-mono text-xs overflow-hidden">
      <div className="bg-zinc-900 border-b border-cyber-border px-4 py-2 flex items-center justify-between text-cyber-muted select-none">
        <span className="flex items-center space-x-2 text-[10px] tracking-wider text-cyber-primary font-bold">
          <span className="w-2 h-2 rounded-full bg-cyber-primary animate-ping" />
          <span>CORE_TERMINAL_ROOT</span>
        </span>
        <div className="flex items-center space-x-2">
          <Minimize2 className="w-3 h-3 cursor-pointer hover:text-white" />
          <X className="w-3 h-3 cursor-pointer hover:text-rose-400" onClick={close} />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-1 text-emerald-400">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">{line}</div>
        ))}
        <form onSubmit={execCommand} className="flex items-center pt-1">
          <span className="text-cyber-secondary mr-2">sanjay@sec-hub:~$</span>
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-cyber-text focus:ring-0 p-0"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}