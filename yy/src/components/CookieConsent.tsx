import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-8 left-8 right-8 md:left-auto md:right-12 md:w-96 z-[1000]"
        >
          <div className="relative group overflow-hidden rounded-sm">
            {/* Liquid Glass Base */}
            <div className="absolute inset-0 bg-studio-black/80 backdrop-blur-2xl border border-studio-white/10 rounded-sm shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]" />
            
            {/* Liquid Sheen */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                x: [0, 10, -10, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10 p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <h4 className="text-[10px] font-syne font-bold text-studio-white uppercase tracking-[0.3em]">Cookie Preference</h4>
              </div>

              <p className="text-[11px] font-sans font-light text-studio-white/50 leading-relaxed">
                We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white text-[9px] font-syne font-bold uppercase tracking-[0.2em] transition-colors rounded-sm cursor-none"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 py-2.5 bg-studio-white/5 hover:bg-studio-white/10 text-studio-white/60 hover:text-studio-white text-[9px] font-syne font-bold uppercase tracking-[0.2em] transition-all border border-studio-white/10 rounded-sm cursor-none"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
