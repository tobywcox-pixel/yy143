import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import LiquidWaves from './LiquidWaves';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental progress for a more "organic" feel
        const inc = Math.random() > 0.7 ? 2 : 1;
        return Math.min(prev + inc, 100);
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 1500);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.2,
        filter: "blur(20px)"
      }}
      transition={{ 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-transparent pointer-events-none"
    >
      {/* Background Waves removed to show GlobalBackground */}


      {/* Content Overlay */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.1,
              filter: 'blur(20px)',
              transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] }
            }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8"
          >
            {/* Progress Bar Container */}
            <div className="w-full max-w-md space-y-4 mt-12">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="block text-[10px] font-sans font-bold tracking-[0.4em] text-studio-white/20 uppercase">
                    Loading
                  </span>
                </div>
                <span className="text-[24px] font-syne font-extrabold text-studio-white tabular-nums">
                  {progress}%
                </span>
              </div>

              <div className="relative h-[2px] w-full bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Flash/Transition Overlay removed */}
      
      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
      </motion.div>
    );
}
