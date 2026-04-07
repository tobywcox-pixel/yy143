import React from 'react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[500] bg-studio-black flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-8xl md:text-9xl font-syne font-extrabold text-red-500 mb-4 tracking-tighter">404</h1>
          <h2 className="text-2xl md:text-3xl font-syne font-bold text-studio-white mb-6 uppercase tracking-tight">Lost in the flow?</h2>
          <p className="text-sm md:text-base font-sans text-studio-white/40 mb-12 leading-relaxed">
            The page you're looking for has drifted away. Let's get you back to the studio.
          </p>
          
          <a 
            href="/"
            className="inline-block px-12 py-4 bg-red-600 text-white font-syne font-bold uppercase tracking-[0.3em] text-[10px] rounded-sm hover:bg-red-500 transition-all duration-500"
          >
            Return Home
          </a>
        </motion.div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[1px] border-studio-white/5 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[1px] border-studio-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
