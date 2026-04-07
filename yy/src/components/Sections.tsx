import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowRight, Globe, RefreshCw, Smartphone, Palette, Server, User, Activity, Calendar, Truck, Linkedin, Instagram, Facebook } from 'lucide-react';
import LiquidWaves from './LiquidWaves';
import PrivacyPolicy from './PrivacyPolicy';

interface SectionProps {
  setPage: (page: number) => void;
}

export function Home({ setPage }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    'breathe', 'evolve', 'inspire', 'convert', 'connect',
    'perform', 'resonate', 'matter', 'flow', 'thrive',
    'scale', 'endure', 'captivate', 'transform', 'deliver',
    'engage', 'shine', 'succeed', 'simplify', 'empower'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 1.0
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section ref={containerRef} className="w-full h-full bg-transparent overflow-hidden relative">
      {/* Main Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-10 h-full w-full flex flex-col justify-center p-8 md:p-32 pb-12 md:pb-32 lg:p-48 tablet-p-md"
      >
        <div className="max-w-5xl">
          {/* Heading Container */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-14">
            <h1 className="text-[clamp(32px,9vw,90px)] mobile-landscape-text-sm font-syne font-extrabold leading-[0.9] tracking-tighter text-studio-white flex flex-col gap-0 uppercase">
              <span className="inline-block">We design websites that</span>
              <span className="relative inline-block min-w-[6em] h-[1.2em] overflow-hidden align-bottom text-red-500">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 font-extrabold uppercase"
                  >
                    {words[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          {/* Stable Elements (Subheading & Buttons) */}
          <motion.div 
            variants={itemVariants}
            className="text-[8px] md:text-[10px] font-sans font-medium tracking-[0.4em] uppercase text-studio-white/30"
          >
            2026 &mdash; HAMPSHIRE, ENGLAND
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 md:mt-14 flex gap-4 md:gap-6 flex-wrap"
          >
            {[
              { label: 'View Work', action: () => setPage(2) },
              { label: 'Start a Project', action: () => setPage(4) }
            ].map((btn, i) => (
              <motion.button
                key={i}
                onClick={btn.action}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative px-6 md:px-9 py-2.5 md:py-3.5 group cursor-none overflow-hidden rounded-sm"
              >
                {/* Liquid Glass Base */}
                <div className="absolute inset-0 bg-studio-white/5 backdrop-blur-xl border border-studio-white/10 rounded-sm transition-all duration-1000 group-hover:bg-red-600/10 group-hover:border-red-500/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]" />
                
                {/* Liquid Movement Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  animate={{
                    x: [0, 10, -10, 0],
                    y: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Text */}
                <span className="relative z-10 text-studio-white font-sans text-[8px] md:text-[10px] tracking-[0.3em] uppercase font-medium transition-colors duration-1000 group-hover:text-red-500">
                  {btn.label}
                </span>

                {/* Subtle Shine */}
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-studio-white/10 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1500 ease-in-out" />
              </motion.button>
            ))}
          </motion.div>

          {/* SEO Optimized Hidden Text */}
          <div className="sr-only">
            <h2>Premium Web Design Studio in Hampshire & South of England</h2>
            <p>
              Yin & Yang Studios specializes in bespoke web design, high-performance web development, and strategic branding for businesses in Southampton, Portsmouth, Winchester, and across the South of England. Our Hampshire-based digital agency creates design-led experiences that convert and perform.
            </p>
            <ul>
              <li>Web Design Southampton</li>
              <li>Web Development Hampshire</li>
              <li>Digital Agency South of England</li>
              <li>Bespoke Website Design UK</li>
              <li>UI/UX Design Studio</li>
            </ul>
          </div>
        </div>

        {/* Stable Coordinates */}
        <motion.div 
          variants={itemVariants}
          className="text-[10px] tracking-[0.4em] uppercase absolute bottom-12 right-12 z-10 text-studio-white/20"
        >
          51.0577&deg; N &nbsp;&middot;&nbsp; 1.3081&deg; W
        </motion.div>
      </motion.div>
    </section>
  );
}

const SkillForgeMockup = ({ view }: { view: 'web' | 'mobile' }) => {
  const [isLive, setIsLive] = useState(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
      const targetWidth = view === 'web' ? 1920 : 390;
      const targetHeight = view === 'web' ? 1080 : 844;
      
      const scaleX = containerWidth / targetWidth;
      const scaleY = containerHeight / targetHeight;
      setScale(Math.min(scaleX, scaleY, 1));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
    };
  }, [view]);

  const handleIframeLoad = () => {
    // Increased delay to 5 seconds to ensure StackBlitz has finished 
    // its internal build/boot process before we reveal the iframe.
    setTimeout(() => {
      setIsIframeLoaded(true);
    }, 5000);
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-studio-black flex items-center justify-center overflow-hidden relative group">
      <AnimatePresence mode="wait">
        {!isIframeLoaded && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-50 bg-studio-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Waves */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <LiquidWaves />
            </div>

            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
              style={{ 
                backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} 
            />

            <div className={`relative z-10 flex flex-col items-center ${view === 'web' ? 'gap-10' : 'gap-6'}`}>
              {/* Central Geometric Loader */}
              <div className={`relative ${view === 'web' ? 'w-24 h-24' : 'w-16 h-16'} flex items-center justify-center`}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-studio-accent/20 rounded-sm"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-studio-accent/40 rounded-sm"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-studio-accent rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                />
              </div>

              {/* Status Text - Syne Typography */}
              <div className={`flex flex-col items-center ${view === 'web' ? 'gap-3' : 'gap-2'}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className={`${view === 'web' ? 'text-[10px]' : 'text-[8px]'} font-syne font-light tracking-[0.4em] uppercase text-studio-white`}
                >
                  Initializing Environment
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  className={`${view === 'web' ? 'text-[7px]' : 'text-[6px]'} font-syne tracking-[0.2em] uppercase text-studio-white/30`}
                >
                  Compiling assets for {view === 'web' ? 'Desktop' : 'Mobile'} view
                </motion.div>
              </div>

              {/* Progress Bar - Minimalist Architectural */}
              <div className={`${view === 'web' ? 'w-64' : 'w-40'} h-[1px] bg-studio-white/5 relative overflow-hidden`}>
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-studio-accent/60"
                />
              </div>
            </div>

            {/* Technical Metadata Footer */}
            <div className={`absolute ${view === 'web' ? 'bottom-12 left-12 right-12' : 'bottom-8 left-8 right-8'} flex justify-between items-end border-t border-studio-white/5 pt-6`}>
              <div className="flex flex-col gap-1.5">
                <div className="text-[6px] font-mono text-studio-white/20 tracking-[0.3em] uppercase">Status: Compiling_Assets</div>
                <div className="text-[6px] font-mono text-studio-white/20 tracking-[0.3em] uppercase">Source: StackBlitz_Live_Engine</div>
              </div>
              <div className="text-[6px] font-mono text-studio-white/20 tracking-[0.3em] uppercase">
                {view === 'web' ? '1920x1080' : '390x844'} // Architectural_Scale
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLive && (
        <div 
          style={{
            width: view === 'web' ? '1920px' : '390px',
            height: view === 'web' ? '1080px' : '844px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            flexShrink: 0
          }}
          className={`relative z-20 transition-opacity duration-700 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'} overflow-hidden`}
        >
          <iframe 
            src="https://stackblitz.com/github/tobywcox-pixel/SkillForge?embed=1&view=preview&hideNavigation=1&hideExplorer=1"
            className="w-full h-[calc(100%+32px)] border-none -mb-[32px]"
            onLoad={handleIframeLoad}
            title="Skill Forge Academy Live Preview"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.08]"
        style={{ 
          backgroundImage: `linear-gradient(#c8b89a 1px, transparent 1px), linear-gradient(90deg, #c8b89a 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} 
      />
    </div>
  );
};

const HarbourWellnessMockup = ({ view }: { view: 'web' | 'mobile' }) => {
  const [isLive, setIsLive] = useState(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const desktopImages = [
    '/images/portfolio/hw1.png',
    '/images/portfolio/hw2.png',
    '/images/portfolio/hw3.png',
    '/images/portfolio/hw4.png',
    '/images/portfolio/hw5.png',
    '/images/portfolio/hw6.png',
    '/images/portfolio/hw7.png'
  ];

  const mobileImages = [
    '/images/portfolio/hw1mob.png',
    '/images/portfolio/hw2mob.png',
    '/images/portfolio/hw3mob.png',
    '/images/portfolio/hw4mob.png'
  ];

  const currentImages = view === 'web' ? desktopImages : mobileImages;

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
      const targetWidth = view === 'web' ? 1920 : 390;
      const targetHeight = view === 'web' ? 1080 : 844;
      
      const scaleX = containerWidth / targetWidth;
      const scaleY = containerHeight / targetHeight;
      // Cap scale at 1 to ensure "same size as live site" if container is larger
      setScale(Math.min(scaleX, scaleY, 1));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
    };
  }, [view]);

  const handleIframeLoad = () => {
    // Increased delay to 5 seconds to ensure StackBlitz has finished 
    // its internal build/boot process before we reveal the iframe.
    setTimeout(() => {
      setIsIframeLoaded(true);
    }, 5000);
  };

  return (
    <div ref={containerRef} className="w-full h-full bg-studio-black flex items-center justify-center overflow-hidden relative group">
      {/* Loading State - Themed to match Studio */}
      <AnimatePresence mode="wait">
        {!isIframeLoaded && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-50 bg-studio-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Waves */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <LiquidWaves />
            </div>

            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
              style={{ 
                backgroundImage: `linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} 
            />

            <div className={`relative z-10 flex flex-col items-center ${view === 'web' ? 'gap-10' : 'gap-6'}`}>
              {/* Central Geometric Loader */}
              <div className={`relative ${view === 'web' ? 'w-24 h-24' : 'w-16 h-16'} flex items-center justify-center`}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-studio-accent/20 rounded-sm"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-studio-accent/40 rounded-sm"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-studio-accent rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                />
              </div>

              {/* Status Text - Syne Typography */}
              <div className={`flex flex-col items-center ${view === 'web' ? 'gap-3' : 'gap-2'}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className={`${view === 'web' ? 'text-[10px]' : 'text-[8px]'} font-syne font-light tracking-[0.4em] uppercase text-studio-white`}
                >
                  Initializing Environment
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  className={`${view === 'web' ? 'text-[7px]' : 'text-[6px]'} font-syne tracking-[0.2em] uppercase text-studio-white/30`}
                >
                  Compiling assets for {view === 'web' ? 'Desktop' : 'Mobile'} view
                </motion.div>
              </div>

              {/* Progress Bar - Minimalist Architectural */}
              <div className={`${view === 'web' ? 'w-64' : 'w-40'} h-[1px] bg-studio-white/5 relative overflow-hidden`}>
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-studio-accent/60"
                />
              </div>
            </div>

            {/* Technical Metadata Footer */}
            <div className={`absolute ${view === 'web' ? 'bottom-12 left-12 right-12' : 'bottom-8 left-8 right-8'} flex justify-between items-end border-t border-studio-white/5 pt-6`}>
              <div className="flex flex-col gap-1.5">
                <div className="text-[6px] font-mono text-studio-white/20 tracking-[0.3em] uppercase">Status: Compiling_Assets</div>
                <div className="text-[6px] font-mono text-studio-white/20 tracking-[0.3em] uppercase">Source: StackBlitz_Live_Engine</div>
              </div>
              <div className="text-[6px] font-mono text-studio-white/20 tracking-[0.3em] uppercase">
                {view === 'web' ? '1920x1080' : '390x844'} // Architectural_Scale
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live View - Loaded on Demand */}
      {isLive && (
        <div 
          style={{
            width: view === 'web' ? '1920px' : '390px',
            height: view === 'web' ? '1080px' : '844px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            flexShrink: 0
          }}
          className={`relative z-20 transition-opacity duration-700 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'} overflow-hidden`}
        >
          {/* 
            We use a slight height offset (h-[calc(100%+32px)]) and overflow-hidden 
            to clip the StackBlitz footer banner, providing a clean, full-screen 
            website preview without branding.
          */}
          <iframe 
            src="https://stackblitz.com/github/tobywcox-pixel/Harbour-Wellness?embed=1&view=preview&hideNavigation=1&hideExplorer=1"
            className="w-full h-[calc(100%+32px)] border-none -mb-[32px]"
            onLoad={handleIframeLoad}
            title="Harbour Wellness Live Preview"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>
      )}

      {/* Technical Overlay */}
      <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.08]"
        style={{ 
          backgroundImage: `linear-gradient(#c8b89a 1px, transparent 1px), linear-gradient(90deg, #c8b89a 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} 
      />
    </div>
  );
};

const ProjectCard = ({ project, index, setSelectedProject, setSelectedView }: any) => {
  const [hoverSide, setHoverSide] = useState<'none' | 'top' | 'bottom'>('none');
  const isHovered = hoverSide !== 'none';

  return (
    <div 
      key={index} 
      className="relative h-full overflow-hidden cursor-none group bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:border-studio-white/20 backdrop-blur-sm"
    >
      {/* Background Image - Liquid Glass Effect */}
      <div 
        className="absolute inset-0 grayscale opacity-20 group-hover:opacity-50 transition-all duration-1000 bg-cover bg-center rotate-45 scale-[2.0] group-hover:scale-[1.9] blur-[3px] group-hover:blur-0"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      
      {/* Glass Overlay with Dynamic Sheen & Refraction */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Main Glass Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-studio-white/10 via-transparent to-studio-black/40 opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
        
        {/* Moving Specular Highlight */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-studio-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -15, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 border border-studio-white/5 group-hover:border-studio-white/10 transition-colors duration-700" />
      </div>

      {/* Hover Overlays - Darken the active half */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div 
          className={`absolute top-0 left-0 w-full h-1/2 bg-studio-black transition-opacity duration-700 ${hoverSide === 'top' ? 'opacity-40' : 'opacity-0'}`}
        />
        <div 
          className={`absolute bottom-0 left-0 w-full h-1/2 bg-studio-black transition-opacity duration-700 ${hoverSide === 'bottom' ? 'opacity-40' : 'opacity-0'}`}
        />
      </div>

      {/* Interaction Zones - Horizontal Split */}
      <div className="absolute inset-0 z-40 flex flex-col">
        <div 
          className="flex-1 w-full pointer-events-auto"
          onMouseEnter={() => setHoverSide('top')}
          onMouseLeave={() => setHoverSide('none')}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(project);
            setSelectedView('web');
          }}
        />
        <div 
          className="flex-1 w-full pointer-events-auto"
          onMouseEnter={() => setHoverSide('bottom')}
          onMouseLeave={() => setHoverSide('none')}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(project);
            setSelectedView('mobile');
          }}
        />
      </div>

      {/* Mandala Container */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <motion.svg
          width="240"
          height="240"
          viewBox="0 0 200 200"
          animate={{
            rotate: hoverSide === 'top' ? 45 : hoverSide === 'bottom' ? -45 : 0,
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1]
          }}
          className={`transition-shadow duration-700 ${isHovered ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]' : ''}`}
        >
          {/* Concentric Circles */}
          <motion.circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="white"
            animate={{ strokeOpacity: isHovered ? 0.4 : 0.1 }}
            strokeWidth="0.5"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="white"
            animate={{ strokeOpacity: isHovered ? 0.3 : 0.07 }}
            strokeWidth="0.5"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="35"
            fill="none"
            stroke="white"
            animate={{ strokeOpacity: isHovered ? 0.2 : 0.04 }}
            strokeWidth="0.5"
          />
          
          {/* Sacred Geometry Lines */}
          {[0, 45, 90, 135].map((angle) => (
            <motion.line
              key={angle}
              x1="100" y1="15" x2="100" y2="185"
              stroke="white"
              animate={{ strokeOpacity: isHovered ? 0.15 : 0.03 }}
              strokeWidth="0.5"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}

          {/* Central Dots */}
          <motion.circle
            cx="100"
            cy="75"
            r="2"
            fill="white"
            animate={{ scale: isHovered ? 2 : 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          />
          <motion.circle
            cx="100"
            cy="125"
            r="2"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            animate={{ scale: isHovered ? 2 : 1, strokeOpacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </motion.svg>
      </div>
      {/* Buttons Overlay (Text Labels) - Corner Technical Style */}
      <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
        {/* Top Left: Desktop */}
        <div className={`absolute top-8 left-8 transition-all duration-500 ${hoverSide === 'top' ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-20'}`}>
           <div className={`text-[7px] md:text-[9px] tracking-[0.6em] uppercase font-light transition-all duration-500 ${hoverSide === 'top' ? 'text-studio-white' : 'text-studio-white/40'}`}>
              View Desktop
           </div>
        </div>
        {/* Bottom Right: Mobile */}
        <div className={`absolute bottom-8 right-8 transition-all duration-500 ${hoverSide === 'bottom' ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-20'}`}>
           <div className={`text-[7px] md:text-[9px] tracking-[0.6em] uppercase font-light transition-all duration-500 ${hoverSide === 'bottom' ? 'text-studio-white' : 'text-studio-white/40'}`}>
              View Mobile
           </div>
        </div>
      </div>

      {/* Project Info - Architectural Label Style */}
      <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-700 group-hover:opacity-0">
        {/* Left Vertical Index - Liquid Glass Style */}
        <div className="absolute top-0 left-0 bottom-0 w-10 flex items-center justify-center bg-studio-white/5 border-r border-studio-white/10">
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
            className="absolute right-0 top-0 bottom-0 w-[1px] bg-studio-white/10 origin-top"
          />
          <span className="text-[6px] md:text-[7px] font-syne text-studio-white tracking-[0.6em] uppercase -rotate-90 whitespace-nowrap opacity-30 group-hover:opacity-100 transition-all duration-700 group-hover:tracking-[0.8em]">
            {(index + 1).toString().padStart(2, '0')} &mdash; {project.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export function Work({ onModalToggle }: { onModalToggle?: (open: boolean) => void }) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedView, setSelectedView] = useState<'web' | 'mobile' | null>(null);
  const [magnifierPos, setMagnifierPos] = useState<any>({ x: 0, y: 0, xPercent: 0, yPercent: 0, show: false });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      onModalToggle?.(true);
    } else {
      document.body.style.overflow = 'unset';
      onModalToggle?.(false);
      setMagnifierPos({ x: 0, y: 0, xPercent: 0, yPercent: 0, show: false });
    }
    return () => {
      document.body.style.overflow = 'unset';
      onModalToggle?.(false);
    };
  }, [selectedProject, onModalToggle]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    
    // Get actual image dimensions (accounting for object-contain)
    const imgWidth = imageRef.current.naturalWidth;
    const imgHeight = imageRef.current.naturalHeight;
    const containerRatio = rect.width / rect.height;
    const imageRatio = imgWidth / imgHeight;
    
    let actualWidth, actualHeight, offsetX = 0, offsetY = 0;
    
    if (imageRatio > containerRatio) {
      actualWidth = rect.width;
      actualHeight = rect.width / imageRatio;
      offsetY = (rect.height - actualHeight) / 2;
    } else {
      actualHeight = rect.height;
      actualWidth = rect.height * imageRatio;
      offsetX = (rect.width - actualWidth) / 2;
    }

    // Mouse position relative to the actual image pixels
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    
    // Only show if mouse is within the actual image pixels
    if (x >= 0 && x <= actualWidth && y >= 0 && y <= actualHeight) {
      const xPercent = (x / actualWidth) * 100;
      const yPercent = (y / actualHeight) * 100;
      
      // Calculate position for the magnifier circle (relative to the container)
      const circleX = ((x + offsetX) / rect.width) * 100;
      const circleY = ((y + offsetY) / rect.height) * 100;
      
      setMagnifierPos({ 
        x, 
        y, 
        xPercent: circleX, 
        yPercent: circleY, 
        actualWidth,
        actualHeight,
        show: true 
      });
    } else {
      setMagnifierPos(prev => ({ ...prev, show: false }));
    }
  };

  const { desktopImages, mobileImages, hasBothViews } = useMemo(() => {
    if (!selectedProject) return { desktopImages: [], mobileImages: [], hasBothViews: false };
    const images = selectedProject.images || [selectedProject.image];
    const mob = images.filter((img: string) => img.toLowerCase().includes('mob'));
    const desk = images.filter((img: string) => !img.toLowerCase().includes('mob'));
    return { 
      desktopImages: desk.length > 0 ? desk : images, 
      mobileImages: mob,
      hasBothViews: desk.length > 0 && mob.length > 0
    };
  }, [selectedProject]);

  const projects = [
    { 
      name: 'Harbour Wellness', 
      category: 'Healthcare',
      url: 'https://ai.studio/apps/084ce6ea-6f9b-4c34-9140-be275afa4a88',
      image: '/images/portfolio/hw1.png', 
      color: 'rgba(249, 115, 22, 1)', // Sunset Orange
      images: [
        '/images/portfolio/hw1.png', 
        '/images/portfolio/hw2.png', 
        '/images/portfolio/hw3.png',
        '/images/portfolio/hw4.png',
        '/images/portfolio/hw5.png',
        '/images/portfolio/hw6.png',
        '/images/portfolio/hw7.png',
        '/images/portfolio/hw1mob.png',
        '/images/portfolio/hw2mob.png',
        '/images/portfolio/hw3mob.png',
        '/images/portfolio/hw4mob.png',
        '/images/portfolio/hw5mob.png',
        '/images/portfolio/hw6mob.png',
        '/images/portfolio/hw7mob.png',
        '/images/portfolio/hw8mob.png',
        '/images/portfolio/hw9mob.png'
      ]
    },
    { 
      name: 'Skill Forge Academy', 
      category: 'Education',
      image: '/images/portfolio/sf1.png', 
      color: 'rgba(249, 115, 22, 1)', // Sunset Orange
      images: [
        '/images/portfolio/sf1.png', 
        '/images/portfolio/sf2.png', 
        '/images/portfolio/sf3.png',
        '/images/portfolio/sf4.png',
        '/images/portfolio/sf5.png',
        '/images/portfolio/sf6.png',
        '/images/portfolio/sf7.png',
        '/images/portfolio/sf1mob.png',
        '/images/portfolio/sf2mob.png',
        '/images/portfolio/sf3mob.png',
        '/images/portfolio/sf4mob.png',
        '/images/portfolio/sf5mob.png',
        '/images/portfolio/sf6mob.png',
        '/images/portfolio/sf7mob.png',
        '/images/portfolio/sf8mob.png',
        '/images/portfolio/sf9mob.png',
        '/images/portfolio/sf10mob.png',
        '/images/portfolio/sf11mob.png',
        '/images/portfolio/sf12mob.png'
      ]
    },
    { 
      name: 'Solstice Spirits', 
      category: 'Lifestyle',
      image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=1200&h=1200',
      color: 'rgba(249, 115, 22, 1)', // Sunset Orange
      images: [
        'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=1200&h=1200',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=800&mob=true',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=801&mob=true'
      ]
    },
    { 
      name: 'Meridian Hotel', 
      category: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200&h=1200',
      color: 'rgba(249, 115, 22, 1)', // Sunset Orange
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200&h=1200',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=800&mob=true',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=801&mob=true'
      ]
    },
    { 
      name: 'Nomad & Co.', 
      category: 'Retail',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200&h=1200',
      color: 'rgba(249, 115, 22, 1)', // Sunset Orange
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200&h=1200',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=800&mob=true',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=801&mob=true'
      ]
    },
    { 
      name: 'The Pale Stag', 
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200&h=1200',
      color: 'rgba(249, 115, 22, 1)', // Sunset Orange
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200&h=1200',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=800&mob=true'
      ]
    },
  ];

  return (
    <section className="w-full bg-transparent relative">
      <div className="min-h-screen flex flex-col relative z-10">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-6 sm:grid-rows-3 md:grid-rows-2 gap-0 overflow-hidden bg-transparent">
          {projects.map((p, i) => (
            <ProjectCard 
              key={i} 
              project={p} 
              index={i} 
              setSelectedProject={setSelectedProject} 
              setSelectedView={setSelectedView} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-studio-black overflow-hidden"
          >
            {/* Background Waves - Subtle layering */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 z-0">
              <LiquidWaves color={selectedProject.color} />
            </div>
            <div className="absolute inset-0 bg-studio-black/40 backdrop-blur-[2px] z-0" />

            {/* Close Button - Minimalist */}
            <button 
              onClick={() => {
                setSelectedProject(null);
                setSelectedView(null);
              }}
              className="fixed top-12 right-12 text-studio-white/40 hover:text-studio-accent transition-all z-[600] group flex items-center gap-6"
            >
              <span className="text-[9px] tracking-[0.5em] uppercase font-light opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                Close Project
              </span>
              <X size={24} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>

            <div className="relative z-10 w-full h-full flex flex-col md:flex-row-reverse">
              {/* Right Side: Architectural Project Panel - Liquid Glass Theme */}
              <div className="w-full md:w-[32%] h-auto md:h-full p-12 md:p-16 flex flex-col justify-between bg-studio-white/[0.03] backdrop-blur-lg overflow-hidden relative border-l border-studio-white/10">
                {/* Background Liquid Waves - Themed */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                  <LiquidWaves color={selectedProject.color} />
                </div>

                {/* Liquid Glass Sheen Effect for the whole panel */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-studio-white/5 via-transparent to-transparent opacity-30 pointer-events-none"
                  animate={{
                    x: [0, 20, -20, 0],
                    y: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Left Vertical Index Label - Matching Portfolio Style */}
                <div className="absolute top-0 left-0 bottom-0 w-10 flex items-center justify-center bg-studio-white/[0.02] border-r border-studio-white/5">
                  <span className="text-[7px] font-syne text-studio-white/20 tracking-[0.6em] uppercase -rotate-90 whitespace-nowrap">
                    Project &mdash; {selectedProject.name}
                  </span>
                </div>

                <div className="relative z-10 flex flex-col gap-8 pl-6">
                  {/* Small Accent Label */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-[1px] bg-studio-accent" />
                    <span className="text-[9px] tracking-[0.4em] uppercase text-studio-accent font-medium">Case Study</span>
                  </motion.div>
 
                  {/* Project Title - Bigger and 2 Lines */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                  >
                    <h2 className="text-[24px] md:text-[28px] font-syne font-bold text-studio-white tracking-[0.2em] uppercase leading-[1.1] max-w-[280px]">
                      {selectedProject.name}
                    </h2>
                  </motion.div>
 
                  {/* Narrative Description - Liquid Glass Box */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative group"
                  >
                    <div className="bg-studio-white/5 border border-studio-white/10 p-6 flex flex-col gap-6 relative z-10 overflow-hidden">
                      {/* Liquid Glass Sheen */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-studio-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        animate={{
                          x: [0, 15, -15, 0],
                          y: [0, -8, 8, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      <p className="text-[13px] font-light text-studio-white/60 leading-[1.8] max-w-[360px] relative z-20">
                        A deep exploration into the intersection of {selectedProject.category.toLowerCase()} and digital craftsmanship. This project defines our commitment to high-performance aesthetics.
                      </p>
                      <div className="w-12 h-[1px] bg-studio-white/20 relative z-20" />
                    </div>
                  </motion.div>
 
                  {/* Metadata Grid - Technical Architectural Style */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 gap-2"
                  >
                    {[
                      { t: 'Client', d: selectedProject.name, icon: User },
                      { t: 'Sector', d: selectedProject.name === 'Harbour Wellness' ? 'Healthcare' : selectedProject.category, icon: Activity },
                      { t: 'Release', d: '2024_V1.0', icon: Calendar },
                      { t: selectedProject.name === 'Harbour Wellness' ? 'Delivery' : 'Tech', d: selectedProject.name === 'Harbour Wellness' ? '7 days' : 'React / Motion', icon: Truck },
                    ].map((v, i) => (
                      <div key={i} className="relative group overflow-hidden">
                        <div className="bg-studio-white/5 border border-studio-white/10 p-5 flex justify-between items-center transition-all duration-500 relative z-10">
                          {/* Liquid Glass Sheen */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-tr from-studio-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
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
                          
                          <div className="flex items-center gap-3 relative z-20">
                            <v.icon size={10} className="text-studio-accent/40" />
                            <div className="text-[8px] font-syne font-bold text-studio-white/20 tracking-[0.2em] uppercase">{v.t}</div>
                          </div>
                          <div className="text-[10px] font-syne text-studio-white/60 tracking-widest uppercase group-hover:text-studio-accent transition-colors relative z-20">{v.d}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* View Toggle - Liquid Glass Style (Moved inside the column) */}
                  {hasBothViews && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                      className="relative z-20"
                    >
                      <div className="flex items-center bg-studio-white/5 backdrop-blur-md border border-studio-white/10 p-1 rounded-sm shadow-2xl overflow-hidden relative group w-full">
                        {/* Liquid Movement Effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-tr from-studio-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          animate={{
                            x: [0, 5, -5, 0],
                            y: [0, -3, 3, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />

                        <button 
                          onClick={() => setSelectedView('web')}
                          className={`flex-1 relative z-10 py-2.5 rounded-sm text-[8px] tracking-[0.3em] uppercase transition-all duration-700 ${selectedView === 'web' ? 'bg-studio-white/10 text-studio-white font-medium' : 'text-studio-white/20 hover:text-studio-white hover:bg-studio-white/5'}`}
                        >
                          Desktop
                        </button>
                        <div className="w-px h-4 bg-studio-white/5 mx-1 relative z-10" />
                        <button 
                          onClick={() => setSelectedView('mobile')}
                          className={`flex-1 relative z-10 py-2.5 rounded-sm text-[8px] tracking-[0.3em] uppercase transition-all duration-700 ${selectedView === 'mobile' ? 'bg-studio-white/10 text-studio-white font-medium' : 'text-studio-white/20 hover:text-studio-white hover:bg-studio-white/5'}`}
                        >
                          Mobile
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer: Technical Specs */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative z-10 flex flex-col gap-6 pl-6"
                >
                  <div className="flex items-center justify-end">
                    <div className="text-4xl text-studio-white/[0.03] font-syne font-black select-none pointer-events-none">
                      {(selectedProject.id || '01').toString().padStart(2, '0')}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Visual Showcase Area */}
              <div className="flex-1 h-full overflow-hidden bg-studio-black flex items-center justify-center pointer-events-auto relative p-6 md:p-12 lg:p-16">
                {/* Technical Grid Overlay - Very subtle */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
                  style={{ 
                    backgroundImage: `linear-gradient(#c8b89a 1px, transparent 1px), linear-gradient(90deg, #c8b89a 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                  }} 
                />
                
                {(() => {
                  return (
                    <div className="w-full h-full flex flex-col items-center justify-center pointer-events-auto relative">
                      {/* Web View Showcase - Minimalist Monitor */}
                      {selectedView === 'web' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                          className="relative w-full max-w-4xl aspect-video mx-auto pointer-events-auto max-h-[60vh]"
                        >
                          {/* Floating Frame Effect */}
                          <div className="absolute -inset-4 bg-studio-accent/[0.02] blur-3xl rounded-full pointer-events-none" />
                          
                          {/* Monitor Body */}
                          <div className="relative h-full w-full bg-[#111] rounded-none p-1 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-studio-white/5">
                            <div className="w-full h-full bg-studio-black rounded-none overflow-hidden relative">
                              {/* Screen Content */}
                              {(selectedProject.name === 'Harbour Wellness' || selectedProject.name === 'Skill Forge Academy') && selectedView === 'web' ? (
                                <div className="absolute inset-0 z-10 pointer-events-auto">
                                  {selectedProject.name === 'Harbour Wellness' ? (
                                    <HarbourWellnessMockup view="web" />
                                  ) : (
                                    <SkillForgeMockup view="web" />
                                  )}
                                </div>
                              ) : (
                                <div className="absolute inset-0 overflow-y-scroll scroll-smooth z-10 pointer-events-auto touch-pan-y snap-y snap-mandatory no-scrollbar">
                                  {desktopImages.map((img, i) => (
                                    <div key={`desktop-${i}`} className="w-full h-full snap-start flex-shrink-0">
                                      <img 
                                        src={img} 
                                        alt={`${selectedProject.alt || selectedProject.name} - Desktop View ${i + 1}`}
                                        className="w-full h-full object-cover object-top"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Subtle Glass Reflection */}
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-studio-white/[0.02] to-transparent z-20" />
                            </div>
                          </div>

                          {/* Minimal Stand */}
                          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="w-[1px] h-10 bg-studio-white/10" />
                            <div className="w-24 h-[1px] bg-studio-white/10" />
                          </div>

                          {/* Dimension Labels */}
                          <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[6px] font-mono text-studio-white/10 tracking-[0.5em] whitespace-nowrap">
                            H_1080_PX
                          </div>
                          <div className="absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 text-[6px] font-mono text-studio-white/10 tracking-[0.5em] whitespace-nowrap">
                            W_1920_PX
                          </div>
                        </motion.div>
                      )}
 
                      {/* Mobile View Showcase - Minimalist Phone */}
                      {selectedView === 'mobile' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                          className="relative mx-auto h-full max-h-[62vh] aspect-[390/844] pointer-events-auto"
                        >
                          {/* Floating Frame Effect */}
                          <div className="absolute -inset-10 bg-studio-accent/[0.03] blur-3xl rounded-full pointer-events-none" />

                          {/* Phone Frame Overlay - Square */}
                          <div className="absolute -inset-[10px] bg-[#111] rounded-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-studio-white/10 pointer-events-none z-0">
                          </div>

                          {/* Screen Content Area - Square */}
                          <div className="relative w-full h-full bg-studio-black rounded-none overflow-hidden z-10 flex flex-col">
                            {selectedProject.name === 'Harbour Wellness' || selectedProject.name === 'Skill Forge Academy' ? (
                              <div className="absolute inset-0 z-10 pointer-events-auto">
                                {selectedProject.name === 'Harbour Wellness' ? (
                                  <HarbourWellnessMockup view="mobile" />
                                ) : (
                                  <SkillForgeMockup view="mobile" />
                                )}
                              </div>
                            ) : (
                              <>
                                {/* Screen Content */}
                                <div className="absolute inset-0 overflow-y-scroll scroll-smooth bg-studio-black z-10 pointer-events-auto touch-pan-y snap-y snap-mandatory no-scrollbar">
                                  {mobileImages.map((img, i) => (
                                    <div key={`mobile-${i}`} className="w-full h-full snap-start flex-shrink-0">
                                      <img 
                                        src={img} 
                                        alt={`${selectedProject.alt || selectedProject.name} - Mobile View ${i + 1}`}
                                        className="w-full h-full object-contain"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Dimension Labels */}
                          <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[6px] font-mono text-studio-white/10 tracking-[0.5em] whitespace-nowrap">
                            H_844_PX
                          </div>
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[6px] font-mono text-studio-white/10 tracking-[0.5em] whitespace-nowrap">
                            W_390_PX
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })()}

                {/* View Toggle - Liquid Glass Style (Removed from here) */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Projects Delivered', value: '25+' },
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Global Reach', value: '24/7' }
  ];

  return (
    <section className="w-full min-h-screen md:h-screen bg-transparent relative overflow-hidden flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-24 md:py-0">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] blur-[120px] rounded-full bg-red-500/10" 
        />
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] blur-[120px] rounded-full bg-red-500/05" 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-5xl w-full relative z-10"
      >
        {/* Header - Styled like ServicesHeader */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-red-500/40" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-red-500 font-bold">Our Story</span>
          </div>
          <h1 className="text-[clamp(32px,9vw,90px)] font-syne font-extrabold text-white leading-[0.85] tracking-tighter uppercase flex flex-col">
            <span>Yin &</span>
            <span className="text-red-500">Yang</span>
            <span>Studios</span>
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-16">
          {/* Left: Narrative */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="flex flex-col mb-6 relative">
              {/* Sidebar Icon */}
              <div 
                className="hidden lg:flex w-14 h-14 rounded-xl border border-red-500/30 items-center justify-center bg-white/[0.02] absolute -left-20 top-0"
              >
                <User size={24} className="text-red-500" />
              </div>

              <div className="flex items-center gap-6 lg:gap-0">
                <div className="lg:hidden w-12 h-12 rounded-xl border border-red-500/30 flex items-center justify-center bg-white/[0.02] shrink-0">
                  <User size={20} className="text-red-500" />
                </div>
                
                <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-syne font-normal text-white leading-[1.1] tracking-tight">
                  We blend <span className="font-light text-white">technical precision</span> with creative soul.
                </motion.h2>
              </div>
            </div>
            
            <motion.p variants={itemVariants} className="text-[10px] md:text-xs font-light text-white/40 leading-relaxed max-w-sm">
              We are a Hampshire-based digital boutique specializing in high-performance web experiences. 
              We believe that every pixel should serve a purpose, and every interaction should resonate with your audience.
            </motion.p>
          </div>

          {/* Right: Stats & Philosophy */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-2 group">
                    <div className="text-2xl md:text-3xl font-syne font-bold text-white group-hover:text-red-500 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-[8px] font-sans tracking-[0.3em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <span className="text-[8px] tracking-[0.4em] uppercase text-white">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </motion.div>

      {/* Vertical Label */}
      <div className="hidden md:flex absolute top-0 right-0 bottom-0 w-12 items-center justify-center bg-studio-white/[0.02] border-l border-studio-white/5">
        <span className="text-[8px] font-syne text-studio-white/20 tracking-[1em] uppercase -rotate-90 whitespace-nowrap">
          About &mdash; Studio
        </span>
      </div>
    </section>
  );
}

export function AboutTop() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const services = [
    { name: 'Web', icon: Globe, sub: 'Performance / Design', desc: 'High-performance web experiences built with modern tech stacks.', projects: ['Project Alpha', 'Project Beta'] },
    { name: 'Re-design', icon: RefreshCw, sub: 'UX / UI Refresh', desc: 'Modernizing legacy interfaces for better engagement and usability.', projects: ['Refresh Co', 'Legacy Pro'] },
    { name: 'App', icon: Smartphone, sub: 'iOS / Android', desc: 'Native and cross-platform mobile applications that feel right.', projects: ['App One', 'Mobile X'] },
    { name: 'Brand', icon: Palette, sub: 'Identity / Strategy', desc: 'Crafting unique visual identities that tell a compelling story.', projects: ['Brand New', 'Identity Plus'] },
    { name: 'Hosting', icon: Server, sub: 'Secure / Fast', desc: 'Reliable hosting solutions optimized for speed and security.', projects: ['Cloud Host', 'Secure Server'] },
  ];

  return (
    <section className="w-full h-screen bg-transparent relative overflow-hidden">
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* SERVICES DETAIL (Accordion) */}
        <div className="flex-1 flex flex-col border-t border-studio-white/10">
          {services.map((s, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                flex: openAccordion === i ? 3 : 1,
                backgroundColor: openAccordion === i ? 'rgba(255, 255, 255, 0.03)' : 'transparent'
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col border-b border-studio-white/10 relative group overflow-hidden"
              onMouseEnter={() => setOpenAccordion(i)}
              onMouseLeave={() => setOpenAccordion(null)}
            >
              <div className="flex-1 flex flex-col justify-center px-6 md:px-24">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-12">
                    <span className="text-sm font-syne font-bold text-studio-white/20">0{i + 1}</span>
                    <div className="flex items-center gap-6">
                      <s.icon className="w-6 h-6 text-red-500/40 group-hover:text-red-500 transition-colors stroke-[1.5]" />
                      <span className="text-2xl md:text-4xl font-syne font-bold text-studio-white group-hover:text-red-500 transition-colors tracking-tight uppercase">{s.name}</span>
                    </div>
                  </div>
                  <motion.div 
                    animate={{ rotate: openAccordion === i ? 180 : 0 }}
                    className="text-studio-white/30"
                  >
                    <ChevronDown className="w-10 h-10" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openAccordion === i && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="mt-6 pl-20 md:pl-32 max-w-3xl"
                    >
                      <p className="text-base font-sans font-light text-studio-white/60 mb-6 leading-relaxed">{s.desc}</p>
                      <div className="flex flex-wrap gap-3 pb-8">
                        {s.projects.map((p, pi) => (
                          <span key={pi} className="text-[10px] font-sans tracking-[0.2em] uppercase border border-studio-white/10 px-4 py-2 text-studio-white/40 bg-studio-white/5">{p}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutBottom() {
  const [lineWidth, setLineWidth] = useState(0);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (locationRef.current) {
        const rect = locationRef.current.getBoundingClientRect();
        const scrollPercent = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
        setLineWidth(scrollPercent * 100);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full bg-transparent relative">
      <div className="relative z-10">
        {/* LOCATION SECTION */}
        <div ref={locationRef} className="px-6 md:px-24 py-16 md:py-32 flex flex-col items-center text-center">
          <div className="flex items-center gap-8 mb-12 w-full max-w-2xl justify-between relative">
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-[10px] font-sans tracking-widest uppercase text-studio-white/40">Southampton</span>
            </div>
            
            <div className="flex-1 h-px bg-studio-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-red-500 origin-left"
                style={{ scaleX: lineWidth / 100 }}
              />
            </div>

            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-3 h-3 rounded-full bg-studio-white/20" />
              <span className="text-[10px] font-sans tracking-widest uppercase text-studio-white/40">UK Wide</span>
            </div>
          </div>
          <h3 className="text-4xl font-syne font-bold text-studio-white uppercase tracking-tight">Southampton &mdash; UK Wide</h3>
        </div>

        {/* CTA */}
        <div className="px-6 md:px-24 py-24 md:py-48 bg-red-600 text-white text-center relative overflow-hidden group">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"
            animate={{
              x: [0, 20, -20, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(42px,7vw,64px)] font-syne font-bold tracking-tight mb-12 relative z-10"
          >
            Ready to start?
          </motion.h2>
          <a 
            href="mailto:hello@yin-yang-studios.com" 
            className="text-xl font-syne font-bold border-b-2 border-white pb-2 hover:opacity-70 transition-opacity cursor-none relative z-10 tracking-widest"
          >
            Let's talk
          </a>
        </div>
      </div>
    </section>
  );
}

export function ContactInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="w-full h-screen bg-transparent relative flex items-center justify-center p-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full max-w-lg mx-auto h-full flex flex-col justify-center gap-12"
      >
        <div className="relative z-10">
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[1px] bg-red-500" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-red-500 font-bold">Connect</span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-syne font-bold text-studio-white leading-[1.1] tracking-tight mb-8"
          >
            Let's build <br />
            <span className="text-red-500">something</span> <br />
            <em className="italic font-light text-studio-white/40 text-3xl">remarkable.</em>
          </motion.h2>

          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            {[
              { label: 'Studio', value: 'Hampshire, England' },
              { label: 'Email', value: 'hello@yin-yang-studios.com' },
              { label: 'Working hours', value: 'Mon–Fri, 9am–6pm GMT' },
            ].map((item, i) => (
              <div key={i} className="border-l border-studio-white/10 pl-6">
                <div className="text-[8px] tracking-[0.3em] uppercase text-studio-white/30 mb-1">{item.label}</div>
                <div className="text-sm font-light text-studio-white/80">{item.value}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col gap-6"
        >
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/ying.yang.studio" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-studio-white/10 flex items-center justify-center text-studio-white/40 hover:text-red-500 hover:border-red-500/50 transition-all duration-300 bg-studio-white/5"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function ContactForm({ onNext }: { onNext?: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="w-full h-screen bg-transparent relative flex items-center justify-center p-6 mobile-landscape-h-auto mobile-landscape-p-sm">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full max-w-md md:max-w-lg mx-auto h-full flex flex-col justify-center"
      >
        <motion.div variants={itemVariants} className="mb-4 md:mb-8 landscape:mb-2">
          <h3 className="text-xl md:text-2xl font-syne font-bold text-studio-white tracking-tight mb-1 md:mb-2 uppercase landscape:text-lg">Start a conversation</h3>
          <p className="text-[8px] md:text-[10px] font-light text-studio-white/40 tracking-widest uppercase">Tell us about your vision.</p>
        </motion.div>

        <form className="space-y-3 md:space-y-5 landscape:space-y-2">
          <motion.div variants={itemVariants} className="space-y-1 md:space-y-1.5 landscape:space-y-0.5">
            <label className="block text-[7px] md:text-[8px] tracking-[0.3em] uppercase text-studio-white/30">Your name</label>
            <input 
              type="text" 
              placeholder="Jane Smith" 
              className="w-full bg-studio-white/5 border border-studio-white/10 rounded-sm px-3 md:px-4 py-2 md:py-3 landscape:py-1.5 text-[10px] md:text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all placeholder:text-studio-white/10" 
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1 md:space-y-1.5 landscape:space-y-0.5">
            <label className="block text-[7px] md:text-[8px] tracking-[0.3em] uppercase text-studio-white/30">Email address</label>
            <input 
              type="email" 
              placeholder="jane@company.com" 
              className="w-full bg-studio-white/5 border border-studio-white/10 rounded-sm px-3 md:px-4 py-2 md:py-3 landscape:py-1.5 text-[10px] md:text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all placeholder:text-studio-white/10" 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1 md:space-y-1.5 landscape:space-y-0.5 relative">
            <label className="block text-[7px] md:text-[8px] tracking-[0.3em] uppercase text-studio-white/30">Project type</label>
            <select className="w-full bg-studio-white/5 border border-studio-white/10 rounded-sm px-3 md:px-4 py-2 md:py-3 landscape:py-1.5 text-[10px] md:text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all appearance-none cursor-pointer">
              <option className="bg-studio-black">Web Design & Development</option>
              <option className="bg-studio-black">Brand Identity</option>
              <option className="bg-studio-black">Motion & Animation</option>
              <option className="bg-studio-black">Full Studio Partnership</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1 md:space-y-1.5 landscape:space-y-0.5">
            <label className="block text-[7px] md:text-[8px] tracking-[0.3em] uppercase text-studio-white/30">Your project</label>
            <textarea 
              placeholder="What are you looking to create?" 
              className="w-full bg-studio-white/5 border border-studio-white/10 rounded-sm px-3 md:px-4 py-2 md:py-3 landscape:py-1.5 text-[10px] md:text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all placeholder:text-studio-white/10 resize-none h-16 md:h-24 landscape:h-12"
            />
          </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="relative w-full py-3 md:py-4 landscape:py-2 group overflow-hidden rounded-sm mt-2 md:mt-4 landscape:mt-1"
            >
              <div className="absolute inset-0 bg-red-600 transition-all duration-500 group-hover:bg-red-500" />
              <span className="relative z-10 text-white font-syne text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-bold">
                Send Enquiry
              </span>
            </motion.button>

            {onNext && (
              <motion.button
                variants={itemVariants}
                onClick={onNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 md:py-4 landscape:py-2 bg-studio-white/5 border border-studio-white/10 rounded-sm text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-studio-white/60 font-bold hover:bg-studio-white/10 transition-all mt-2 md:mt-4 landscape:mt-1"
              >
                View Contact Info &rarr;
              </motion.button>
            )}
          </form>
      </motion.div>
    </section>
  );
}

export function Contact() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'form'>('info');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="w-full min-h-screen md:h-screen bg-transparent relative flex items-center justify-center p-4 md:p-10 lg:p-16 pb-24 md:pb-48">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full max-w-5xl mx-auto h-full max-h-none md:max-h-[65vh] flex items-center mb-8 md:mb-12"
      >
        {/* Liquid Glass Container */}
        <div className="relative w-full h-full bg-studio-white/5 backdrop-blur-sm border border-studio-white/10 rounded-[24px] overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden no-scrollbar">
          
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden border-b border-studio-white/10 p-1 bg-studio-white/5">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-3 text-[9px] tracking-[0.3em] uppercase font-syne transition-all ${activeTab === 'info' ? 'bg-studio-white/10 text-studio-white' : 'text-studio-white/30'}`}
            >
              Info
            </button>
            <button 
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-3 text-[9px] tracking-[0.3em] uppercase font-syne transition-all ${activeTab === 'form' ? 'bg-studio-white/10 text-studio-white' : 'text-studio-white/30'}`}
            >
              Form
            </button>
          </div>

          {/* Left Side: Contact Info */}
          <motion.div 
            variants={itemVariants}
            className={`w-full md:w-[35%] p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-studio-white/10 relative overflow-hidden flex-shrink-0 ${activeTab === 'info' ? 'flex' : 'hidden md:flex'}`}
          >
            {/* Subtle Background Glow */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-red-600/10 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <motion.div 
                variants={itemVariants}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-6 h-[1px] bg-red-500" />
                <span className="text-[8px] tracking-[0.4em] uppercase text-red-500 font-medium">Get in touch</span>
              </motion.div>
 
              <motion.h2 
                variants={itemVariants}
                transition={{ delay: 0.3 }}
                className="text-[clamp(24px,3vw,36px)] font-syne font-bold text-studio-white leading-[1.1] tracking-tight mb-6"
              >
                Let's build <br />
                <span className="text-red-500">something</span> <br />
                <em className="italic font-light text-studio-white/40">remarkable.</em>
              </motion.h2>
 
              <motion.div 
                variants={itemVariants}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {[
                  { label: 'Studio', value: 'Hampshire, England' },
                  { label: 'Email', value: 'hello@yin-yang-studios.com' },
                  { label: 'Working hours', value: 'Mon–Fri, 9am–6pm GMT' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-[7px] tracking-[0.2em] uppercase text-studio-white/30 mb-0.5">{item.label}</div>
                    <div className="text-xs font-light text-studio-white/70">{item.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>
 
            <motion.div 
              variants={itemVariants}
              transition={{ delay: 0.9 }}
              className="relative z-10 flex gap-4 mt-8"
            >
              {[
                { icon: Instagram, href: 'https://www.instagram.com/ying.yang.studio', label: 'Instagram' },
              ].map((s, i) => (
                <a 
                  key={i} 
                  href={s.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-studio-white/10 flex items-center justify-center text-studio-white/40 hover:text-red-500 hover:border-red-500/50 transition-all duration-300 bg-studio-white/5"
                  title={s.label}
                >
                  <s.icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </motion.div>
 
          {/* Right Side: Form */}
          <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.7 }}
            className={`w-full md:w-[65%] p-6 md:p-10 relative bg-white/[0.01] overflow-y-auto no-scrollbar ${activeTab === 'form' ? 'flex' : 'hidden md:flex'} flex-col justify-center`}
          >
            <motion.div 
              variants={itemVariants}
              className="mb-6"
            >
              <h3 className="text-xl font-syne font-bold text-studio-white tracking-tight mb-1">Start a conversation</h3>
              <p className="text-[10px] font-light text-studio-white/40">Tell us about your vision. We'll help you bring it to life.</p>
            </motion.div>
 
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[8px] tracking-[0.2em] uppercase text-studio-white/30">Your name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Smith" 
                    className="w-full bg-studio-white/5 border border-studio-white/10 rounded-md px-3 py-2 text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all placeholder:text-studio-white/10" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[8px] tracking-[0.2em] uppercase text-studio-white/30">Email address</label>
                  <input 
                    type="email" 
                    placeholder="jane@company.com" 
                    className="w-full bg-studio-white/5 border border-studio-white/10 rounded-md px-3 py-2 text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all placeholder:text-studio-white/10" 
                  />
                </div>
              </div>
 
              <div className="space-y-1 relative">
                <label className="block text-[8px] tracking-[0.2em] uppercase text-studio-white/30">Project type</label>
                <select className="w-full bg-studio-white/5 border border-studio-white/10 rounded-md px-3 py-2 text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all appearance-none cursor-pointer">
                  <option className="bg-studio-black">Web Design & Development</option>
                  <option className="bg-studio-black">Brand Identity</option>
                  <option className="bg-studio-black">Motion & Animation</option>
                  <option className="bg-studio-black">Full Studio Partnership</option>
                </select>
                <div className="absolute right-3 bottom-3 pointer-events-none text-studio-white/20">
                  <svg width="8" height="5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
 
              <div className="space-y-1">
                <label className="block text-[8px] tracking-[0.2em] uppercase text-studio-white/30">Your project</label>
                <textarea 
                  placeholder="What are you looking to create?" 
                  className="w-full bg-studio-white/5 border border-studio-white/10 rounded-md px-3 py-2 text-xs font-light text-studio-white outline-none focus:border-red-500/50 transition-all placeholder:text-studio-white/10 resize-none h-20"
                />
              </div>
 
              <motion.button 
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="relative w-full py-3 group overflow-hidden rounded-md mt-2"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-red-600 transition-all duration-500 group-hover:bg-red-500" />
                
                {/* Liquid Sheen */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    x: [0, 10, -10, 0],
                    y: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
 
                <span className="relative z-10 text-white font-syne text-[9px] tracking-[0.3em] uppercase font-bold">
                  Send Enquiry
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      <Footer onPrivacyClick={() => setIsPrivacyOpen(true)} />
      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </section>
  );
}

function Footer({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 md:px-20 md:pb-12 z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6 border-t border-studio-white/10 pt-2 md:pt-8">
        {/* Left: Instagram Only */}
        <div className="flex gap-8 order-2 md:order-1">
          <a 
            href="https://www.instagram.com/ying.yang.studio" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-studio-white/40 hover:text-red-500 transition-colors duration-300"
            title="Instagram"
          >
            <Instagram size={12} strokeWidth={1.5} />
          </a>
        </div>

        {/* Middle: Copyright & Privacy */}
        <div className="flex flex-col items-center gap-1 order-1 md:order-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={onPrivacyClick}
              className="text-[7px] md:text-[8px] font-sans font-light text-studio-white/30 hover:text-red-500 transition-colors uppercase tracking-[0.2em] cursor-none"
            >
              Privacy Policy
            </button>
            <div className="text-[7px] md:text-[8px] font-sans font-light text-studio-white/30 uppercase tracking-[0.2em]">
              © 2026 Hampshire, England.
            </div>
          </div>
        </div>

        {/* Right: Created by + Yin Yang Icon */}
        <div className="flex items-center gap-2 order-3">
          <span className="text-[7px] font-sans font-light text-studio-white/20 uppercase tracking-[0.2em]">
            Created by
          </span>
          <div className="text-[9px] font-syne font-bold text-studio-white">
            ☯
          </div>
        </div>
      </div>
    </footer>
  );
}
