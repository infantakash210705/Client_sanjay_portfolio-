import React, { useRef, useState } from 'react';

/**
 * TiltCard provides a premium 3D tilt and glare effect on mouse hover or touch moves.
 * Elements inside can use CSS transform properties (like translateZ) to float in 3D space.
 */
export default function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, active: false });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to card center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angles (max 10 degrees)
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;

    setRotate({ x: rX, y: rY });
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setCoords(prev => ({ ...prev, active: false }));
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = touch.clientX - rect.left - width / 2;
    const mouseY = touch.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;

    setRotate({ x: rX, y: rY });
    setCoords({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      active: true
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out cursor-pointer select-none ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glowing spotlight background overlay */}
      {coords.active && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 160px at ${coords.x}px ${coords.y}px, rgba(16, 185, 129, 0.12), transparent 85%)`,
            transform: 'translateZ(1px)',
          }}
        />
      )}

      {/* Futuristic cyan/emerald border highlight tracking cursor */}
      {coords.active && (
        <div
          className="absolute -inset-[1px] pointer-events-none rounded-xl z-10 opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${coords.x}px ${coords.y}px, rgba(6, 182, 212, 0.4), transparent 75%)`,
            maskImage: 'linear-gradient(black, black)',
            WebkitMaskImage: 'linear-gradient(black, black)',
            transform: 'translateZ(0px)',
          }}
        />
      )}

      {/* Internal wrapper forcing elements to support preserve-3d */}
      <div className="h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
