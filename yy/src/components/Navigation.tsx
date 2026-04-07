import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown, Menu as MenuIcon, X, Instagram, Globe, Smartphone, Server, Palette, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import LiquidWaves from './LiquidWaves';

interface NavigationProps {
  currentPage: number;
  setPage: (page: number) => void;
  isHidden?: boolean;
}

export function DropdownMenu({ currentPage, setPage, isHidden }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isHidden) return null;

  const mainLinks = [
    { name: 'Home', index: 0 },
    { name: 'About', index: 1 },
    { name: 'Portfolio', index: 2 },
    { name: 'Services', index: 3 },
    { name: 'Contact', index: 7 }
  ];

  const capabilities = [
    { name: 'Web Design', index: 3, icon: Globe },
    { name: 'App Design', index: 4, icon: Smartphone },
    { name: 'SEO', index: 5, icon: Search },
    { name: 'Branding', index: 6, icon: Palette }
  ];

  const socials = [
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram }
  ];

  return (
    <>
      <div className="fixed top-6 left-6 md:top-12 md:left-12 z-[260] mix-blend-difference">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center text-studio-white hover:text-studio-accent transition-all duration-500 cursor-none group"
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <X size={28} strokeWidth={1} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 items-start"
              >
                <div className="w-8 h-px bg-current transition-all duration-500 group-hover:w-10" />
                <div className="w-5 h-px bg-current transition-all duration-500 group-hover:w-10" />
                <div className="w-10 h-px bg-current" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-screen h-screen bg-studio-black z-[250] flex flex-col p-8 md:p-24 overflow-hidden"
          >
            {/* Background Waves */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
              <LiquidWaves theme="dark" amplitudeScale={0.5} />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col">
              {/* Mobile View: Full Screen Mega Menu */}
              <div className="flex flex-col md:hidden w-full h-full pt-24 pb-12 gap-16 overflow-y-auto no-scrollbar">
                {/* Section 1: Navigation */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    {mainLinks.map((link, i) => (
                      <motion.button
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                        onClick={() => {
                          setPage(link.index);
                          setIsOpen(false);
                        }}
                        className="group flex items-baseline gap-4 text-left"
                      >
                        <span className="text-[10px] font-mono text-studio-accent/40">0{i + 1}</span>
                        <span className={`text-3xl font-syne font-extrabold uppercase tracking-tighter transition-all duration-500 ${
                          (link.name === 'Services' ? (currentPage >= 3 && currentPage <= 6) : currentPage === link.index)
                            ? 'text-studio-accent'
                            : 'text-studio-white/20'
                        }`}>
                          {link.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Capabilities */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] tracking-[0.5em] uppercase text-studio-white/30 font-medium">Capabilities</span>
                    <div className="w-10 h-px bg-studio-accent/30" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {capabilities.map((cap, i) => (
                      <motion.button
                        key={cap.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 + 0.3 }}
                        onClick={() => {
                          setPage(cap.index);
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between text-left border-b border-white/5 pb-3"
                      >
                        <div className="flex items-center gap-3">
                          <cap.icon size={14} strokeWidth={1.5} className="text-studio-accent/40" />
                          <span className="text-[11px] font-light tracking-widest uppercase text-studio-white/40">
                            {cap.name}
                          </span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-studio-accent" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Section 3: Connect & Info */}
                <div className="flex flex-col gap-12">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                      <span className="text-[9px] tracking-[0.5em] uppercase text-studio-white/30 font-medium">Connect</span>
                      {socials.map((social, i) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] tracking-[0.3em] uppercase text-studio-white/50 flex items-center gap-3"
                        >
                          <social.icon size={14} strokeWidth={1.5} className="text-studio-accent/60" />
                          {social.name}
                        </motion.a>
                      ))}
                    </div>
                    <div className="flex flex-col gap-4">
                      <span className="text-[9px] tracking-[0.5em] uppercase text-studio-white/30 font-medium">Location</span>
                      <div className="text-[10px] leading-relaxed text-studio-white/40 uppercase tracking-[0.3em] font-light">
                        Southampton, UK<br />
                        51.0632° N
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] tracking-[0.4em] uppercase text-studio-white/60 font-medium">Status: Active</span>
                      </div>
                    </div>
                    <div className="text-[9px] font-mono text-studio-accent/50">2026 ©</div>
                  </div>
                </div>
              </div>

              {/* Desktop View: Redesigned Mega Menu */}
              <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 h-full items-center max-w-screen-2xl mx-auto w-full">
                {/* Left Side: Main Navigation (Span 8) */}
                <div className="col-span-8 flex flex-col gap-12">
                  <div className="flex flex-col gap-4 lg:gap-6">
                    {mainLinks.map((link, i) => (
                      <motion.button
                        key={link.name}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => {
                          setPage(link.index);
                          setIsOpen(false);
                        }}
                        className="group flex items-center gap-8 text-left relative"
                      >
                        <span className="text-sm font-mono text-studio-accent/30 group-hover:text-studio-accent transition-colors duration-500">0{i + 1}</span>
                        <span className={`text-4xl md:text-6xl lg:text-8xl font-syne font-extrabold uppercase tracking-tighter transition-all duration-700 group-hover:translate-x-8 group-hover:text-studio-accent ${
                          (link.name === 'Services' ? (currentPage >= 3 && currentPage <= 6) : currentPage === link.index)
                            ? 'text-studio-white'
                            : 'text-studio-white/10 group-hover:text-studio-accent'
                        }`}>
                          {link.name}
                        </span>
                        {/* Hover underline effect */}
                        <div className="absolute left-16 bottom-0 w-0 h-1 bg-studio-accent transition-all duration-700 group-hover:w-[calc(100%-4rem)] opacity-50" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Right Side: Info & Capabilities (Span 4) */}
                <div className="col-span-4 h-full flex flex-col justify-center gap-12 lg:gap-16 border-l border-white/5 pl-8 lg:pl-16">
                  {/* Capabilities Section */}
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] tracking-[0.5em] uppercase text-studio-white/30 font-medium">Core Capabilities</span>
                      <div className="w-10 h-px bg-studio-accent/30" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {capabilities.map((cap, i) => (
                        <motion.button
                          key={cap.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 + 0.4, duration: 0.6 }}
                          onClick={() => {
                            setPage(cap.index);
                            setIsOpen(false);
                          }}
                          className="group flex items-center justify-between text-left border-b border-white/5 pb-2 hover:border-studio-accent/30 transition-all duration-500"
                        >
                          <div className="flex items-center gap-3">
                            <cap.icon size={14} strokeWidth={1.5} className="text-studio-accent/40 group-hover:text-studio-accent transition-colors" />
                            <span className="text-[11px] lg:text-[13px] font-light tracking-widest uppercase text-studio-white/40 group-hover:text-studio-white transition-all duration-500">
                              {cap.name}
                            </span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-studio-accent scale-0 group-hover:scale-100 transition-transform duration-500" />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Connect & Status Section */}
                  <div className="flex flex-col gap-10">
                    <div className="grid grid-cols-1 gap-10">
                      <div className="flex flex-col gap-4">
                        <span className="text-[9px] tracking-[0.5em] uppercase text-studio-white/30 font-medium">Connect</span>
                        {socials.map((social, i) => (
                          <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-xs tracking-[0.3em] uppercase text-studio-white/50 hover:text-studio-accent transition-all duration-500 flex items-center gap-3 group"
                          >
                            <social.icon size={16} strokeWidth={1.5} className="text-studio-accent/60 group-hover:text-studio-accent transition-colors" />
                            {social.name}
                          </motion.a>
                        ))}
                      </div>
                      <div className="flex flex-col gap-4">
                        <span className="text-[9px] tracking-[0.5em] uppercase text-studio-white/30 font-medium">Location</span>
                        <div className="text-[10px] leading-relaxed text-studio-white/40 uppercase tracking-[0.3em] font-light">
                          Southampton, UK<br />
                          51.0632° N, 1.3080° W
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-6 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[8px] tracking-[0.4em] uppercase text-studio-white/60 font-medium">Status: Active</span>
                        </div>
                        <p className="text-[7px] tracking-[0.2em] uppercase text-studio-white/30">Accepting projects</p>
                      </div>
                      <div className="text-[9px] font-mono text-studio-accent/50">2026 ©</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Ambient Glow */}
            <div className="absolute -bottom-1/4 -left-1/4 w-[60vw] h-[60vw] bg-studio-accent/[0.03] blur-[150px] rounded-full pointer-events-none z-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Navbar({ currentPage, setPage }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const links = [
    { name: 'Home', index: 0 },
    { name: 'About', index: 1 },
    { name: 'Portfolio', index: 2 },
    { name: 'Capabilities', index: 3 },
    { name: 'Contact', index: 7 }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] px-6 md:px-12 py-4 md:py-6.5 flex justify-between items-center mix-blend-difference">
      <div 
        className="text-sm md:text-base font-light tracking-[0.18em] uppercase leading-relaxed cursor-none"
        onClick={() => setPage(0)}
      >
        Yin <span className="text-studio-accent font-light">&amp;</span> Yang<br />Studios
      </div>
      <div className="flex items-center gap-3 md:gap-8">
        <div className="hidden sm:flex items-center gap-2 mr-2 md:mr-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[7px] md:text-[9px] tracking-[0.3em] uppercase text-studio-white/40 font-light">Available for projects</span>
        </div>
        <div className="flex items-center gap-3 md:gap-8">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => setPage(link.index)}
              className={`text-[9px] md:text-[12px] font-light tracking-[0.22em] uppercase cursor-none transition-all duration-700 pb-0.5 border-b ${
                (link.name === 'Capabilities' ? (currentPage >= 3 && currentPage <= 6) : currentPage === link.index) 
                  ? 'border-studio-white opacity-100' 
                  : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function Dots({ currentPage, setPage, isHidden }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isHidden) return null;
  const dotCount = isMobile ? 9 : 8;
  const dots = Array.from({ length: dotCount }, (_, i) => i);

  return (
    <div className="fixed right-4 md:right-5.5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2.5 z-[200] mix-blend-difference">
      {dots.map((i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`w-1.25 rounded-full transition-all duration-800 cursor-none ${
            currentPage === i ? 'bg-studio-white h-5.5' : 'bg-studio-white/25 h-1.25 hover:bg-studio-white hover:h-5.5'
          }`}
        />
      ))}
    </div>
  );
}

export function Arrows({ currentPage, setPage, isHidden }: NavigationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isHidden) return null;
  const maxPage = isMobile ? 8 : 7;

  return (
    <div className="hidden md:block">
      <button
        onClick={() => setPage(currentPage - 1)}
        className={`fixed z-[200] top-[90px] left-1/2 -translate-x-1/2 flex items-center justify-center cursor-none transition-all duration-700 bg-studio-white/8 border border-studio-white/15 rounded-full w-12 h-12 group ${
          currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-studio-white'
        }`}
      >
        <ArrowUp className="w-5 h-5 text-studio-white stroke-[1.5] transition-all duration-600 group-hover:scale-120 group-hover:text-studio-black" />
      </button>
      <button
        onClick={() => setPage(currentPage + 1)}
        className={`fixed z-[200] bottom-[60px] left-1/2 -translate-x-1/2 flex items-center justify-center cursor-none transition-all duration-700 bg-studio-white/8 border border-studio-white/15 rounded-full w-12 h-12 group ${
          currentPage === maxPage ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-studio-white'
        }`}
      >
        <ArrowDown className="w-5 h-5 text-studio-white stroke-[1.5] transition-all duration-600 group-hover:scale-120 group-hover:text-studio-black" />
      </button>
    </div>
  );
}
