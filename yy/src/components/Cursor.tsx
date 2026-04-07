import { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence, useMotionValue } from 'motion/react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
      
      // Auto-remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [ringX, ringY]);

  return (
    <>
      <motion.div
        className="fixed w-2.5 h-2.5 bg-studio-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
        }}
      />
      <motion.div
        className="fixed w-9 h-9 border border-studio-white/35 rounded-full pointer-events-none z-[9998]"
        style={{
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
        }}
      />

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed w-12 h-12 border border-studio-accent/30 rounded-full pointer-events-none z-[9997]"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
