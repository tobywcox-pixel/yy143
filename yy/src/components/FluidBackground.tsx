import { motion } from 'motion/react';

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fluid Blobs */}
      <div className="absolute inset-0 filter blur-[60px] opacity-60">
        <motion.div
          animate={{
            x: ['-20%', '20%', '-15%'],
            y: ['-15%', '25%', '15%'],
            scale: [1, 1.5, 1.2],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-25%] left-[-25%] w-[100%] h-[100%] rounded-full bg-white/40"
        />
        <motion.div
          animate={{
            x: ['20%', '-20%', '15%'],
            y: ['25%', '-15%', '20%'],
            scale: [1.4, 0.8, 1.3],
            rotate: [0, -120, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[15%] right-[-25%] w-[90%] h-[90%] rounded-full bg-white/35"
        />
        <motion.div
          animate={{
            x: ['-15%', '15%', '0%'],
            y: ['-20%', '20%', '-15%'],
            scale: [0.8, 1.4, 1.2],
            rotate: [0, 240, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-25%] left-[15%] w-[95%] h-[95%] rounded-full bg-white/30"
        />
        <motion.div
          animate={{
            x: ['15%', '-15%', '10%'],
            y: ['20%', '-20%', '15%'],
            scale: [1.3, 0.8, 1.4],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[15%] right-[15%] w-[85%] h-[85%] rounded-full bg-white/32"
        />
      </div>
      
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-studio-black via-transparent to-studio-black opacity-30" />
    </div>
  );
}
