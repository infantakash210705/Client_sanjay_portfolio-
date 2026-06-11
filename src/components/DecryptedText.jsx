import React, { useState, useEffect, useRef } from 'react';

/**
 * DecryptedText displays a high-tech scramble reveal effect when the element
 * enters the viewport. Letters systematically resolve from cyber symbols into target text.
 */
export default function DecryptedText({ text, speed = 30, className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);
  
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>/?~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) {
      // Show scrambled text of the same length initially
      setDisplayText(
        text
          .split('')
          .map(char => (char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
          .join('')
      );
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === ' ') {
              return ' ';
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Reveals a character every 3 steps (makes it smoother)
    }, speed);

    return () => clearInterval(interval);
  }, [hasTriggered, text, speed]);

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
}
