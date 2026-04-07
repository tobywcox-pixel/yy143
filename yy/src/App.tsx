import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Cursor from './components/Cursor';
import { Dots, Arrows, DropdownMenu } from './components/Navigation';
import { Home, About, Contact, ContactInfo, ContactForm } from './components/Sections';
import LoadingScreen from './components/LoadingScreen';
import LiquidWaves from './components/LiquidWaves';
import Portfolio from './components/Portfolio';
import ServiceSection, { StaticServicesHeader } from './components/Services';
import ProjectDetail from './components/ProjectDetail';
import CookieConsent from './components/CookieConsent';
import NotFound from './components/NotFound';
import { PROJECTS } from './constants/projects';
import { SERVICES } from './constants/services';

const GlobalBackground = ({ containerRef, isProjectDetailOpen }: { containerRef: React.RefObject<HTMLDivElement>, isProjectDetailOpen: boolean }) => {
  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  // Map the entire scroll journey to a 2D canvas movement for the background
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["0%", "-10%", "-10%", "0%", "0%"]
  );
  
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["0%", "0%", "-10%", "-10%", "-20%"]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 5, -5, 10, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.2, 1.5, 1.2]
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div 
        style={{ 
          x, 
          y, 
          rotate,
          scale,
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%',
          willChange: 'transform',
          opacity: isProjectDetailOpen ? 0.3 : 1
        }}
        className="absolute inset-0 transition-opacity duration-2000"
      >
        <LiquidWaves 
          theme="dark" 
          flipped={true} 
          showOverlay={true} 
          showGrain={false} // Disable grain for background to save performance
          amplitudeScale={0.8} // Reduce amplitude for background
          paused={isProjectDetailOpen}
          step={120} // Large step for background performance
        />
      </motion.div>
    </div>
  );
};

const ZoomSection = React.forwardRef<HTMLElement, { 
  children: React.ReactNode, 
  containerRef: React.RefObject<HTMLDivElement>,
  path: { inX: number, inY: number, outX: number, outY: number },
  key?: string | number
}>(({ 
  children, 
  containerRef, 
  path 
}, ref) => {
  const localRef = useRef<HTMLElement>(null);
  const combinedRef = (node: HTMLElement | null) => {
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
    (localRef as any).current = node;
  };

  const { scrollYProgress } = useScroll({
    target: localRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  // More dramatic zoom for a "lens" feel, but removed blur for performance
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0, 1, 1, 1, 0]);
  
  // Canvas movement (Panning)
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [`${path.inX}%`, "0%", `${path.outX}%`]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [`${path.inY}%`, "0%", `${path.outY}%`]);
  
  // Dynamic rotation based on movement direction
  const rotate = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [path.inX !== 0 ? (path.inX > 0 ? 10 : -10) : (path.inY > 0 ? 10 : -10), 0, path.outX !== 0 ? (path.outX > 0 ? 10 : -10) : (path.outY > 0 ? 10 : -10)]
  );

  return (
    <section 
      ref={combinedRef} 
      className="h-screen w-full relative snap-start snap-always overflow-hidden"
    >
      <motion.div 
        style={{ 
          scale, 
          opacity, 
          x,
          y,
          rotate,
          willChange: 'transform, opacity'
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
});

const ScrollSyncedHeader = ({ 
  containerRef, 
  firstSectionRef, 
  lastSectionRef, 
  currentPage 
}: { 
  containerRef: React.RefObject<HTMLDivElement>,
  firstSectionRef: React.RefObject<HTMLElement>,
  lastSectionRef: React.RefObject<HTMLElement>,
  currentPage: number
}) => {
  const { scrollYProgress: firstProgress } = useScroll({
    target: firstSectionRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: lastProgress } = useScroll({
    target: lastSectionRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });

  // Entrance transforms (based on first section scroll)
  const entranceOpacity = useTransform(firstProgress, [0, 0.5], [0, 1]);
  const entranceScale = useTransform(firstProgress, [0, 0.5], [0.6, 1]);
  const entranceX = useTransform(firstProgress, [0, 0.5], ["-100%", "0%"]);
  const entranceRotate = useTransform(firstProgress, [0, 0.5], [-10, 0]);

  // Exit transforms (based on last section scroll)
  const exitOpacity = useTransform(lastProgress, [0.5, 1], [1, 0]);
  const exitScale = useTransform(lastProgress, [0.5, 1], [1, 1.6]);
  const exitX = useTransform(lastProgress, [0.5, 1], ["0%", "100%"]);
  const exitRotate = useTransform(lastProgress, [0.5, 1], [0, 10]);

  // Combine transforms based on current page
  const opacity = useTransform([firstProgress, lastProgress], ([f, l]) => {
    if (currentPage === 3) return entranceOpacity.get();
    if (currentPage === 6) return exitOpacity.get();
    if (currentPage > 3 && currentPage < 6) return 1;
    return 0;
  });

  const scale = useTransform([firstProgress, lastProgress], ([f, l]) => {
    if (currentPage === 3) return entranceScale.get();
    if (currentPage === 6) return exitScale.get();
    if (currentPage > 3 && currentPage < 6) return 1;
    return 1;
  });

  const x = useTransform([firstProgress, lastProgress], ([f, l]) => {
    if (currentPage === 3) return entranceX.get();
    if (currentPage === 6) return exitX.get();
    if (currentPage > 3 && currentPage < 6) return "0%";
    return "0%";
  });

  const rotate = useTransform([firstProgress, lastProgress], ([f, l]) => {
    if (currentPage === 3) return entranceRotate.get();
    if (currentPage === 6) return exitRotate.get();
    if (currentPage > 3 && currentPage < 6) return 0;
    return 0;
  });

  return (
    <motion.div 
      style={{ opacity, scale, x, rotate, willChange: 'transform, opacity' }}
      className="fixed top-0 left-0 right-0 z-[150] pointer-events-none flex flex-col items-center px-6 md:px-12 lg:px-24 pt-24 md:pt-20 lg:pt-24"
    >
      <div className="max-w-5xl w-full relative z-10">
        <StaticServicesHeader />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== '/' && path !== '') {
      setIsNotFound(true);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 0: Home, 1: About, 2: Portfolio, 3: S1, 4: S2, 5: S3, 6: S4, 7: Contact (Desktop) / ContactInfo (Mobile), 8: ContactForm (Mobile)
  const paths = useMemo(() => {
    const base = [
      { inX: 0, inY: 0, outX: -100, outY: 0 },      // 0. Home
      { inX: 100, inY: 0, outX: 0, outY: -100 },    // 1. About
      { inX: 0, inY: 100, outX: 100, outY: 0 },     // 2. Portfolio
      { inX: -100, inY: 0, outX: 0, outY: -100 },   // 3. Service 1
      { inX: 0, inY: 100, outX: 100, outY: 0 },     // 4. Service 2
      { inX: -100, inY: 0, outX: 0, outY: -100 },   // 5. Service 3
      { inX: 0, inY: 100, outX: 100, outY: 0 },     // 6. Service 4
      { inX: -100, inY: 0, outX: 0, outY: -100 },   // 7. Contact / ContactInfo
    ];
    if (isMobile) {
      base.push({ inX: 0, inY: 100, outX: 100, outY: 0 }); // 8. ContactForm
    }
    return base;
  }, [isMobile]);

  const navigateTo = useCallback((to: number) => {
    const maxPage = isMobile ? 8 : 7;
    if (to < 0 || to > maxPage) return;
    
    const container = scrollContainerRef.current;
    const target = sectionRefs.current[to];
    
    if (container && target) {
      const start = container.scrollTop;
      const end = target.offsetTop;
      const distance = end - start;
      const duration = 1800; // Slower, more deliberate scroll
      let startTime: number | null = null;

      // Temporarily disable snap to allow custom smooth scroll
      container.style.scrollSnapType = 'none';

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function: easeInOutCubic
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        container.scrollTop = start + distance * ease;

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Re-enable snap after animation
          container.style.scrollSnapType = 'y mandatory';
        }
      };

      requestAnimationFrame(animation);
    }
  }, []);

  const handleProjectClick = useCallback((project: any) => {
    setSelectedProject(project);
    // No longer scrolling to index 8
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      threshold: 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setCurrentPage(index);
            
            // If we've scrolled away from the project detail manually, clear it
            if (index < 5 && selectedProject) {
              // We don't clear it immediately to avoid jarring jumps during scroll
              // But we can clear it once the user is settled
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isLoading, selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigateTo(currentPage + 1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') navigateTo(currentPage - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, navigateTo]);

  useEffect(() => {
    const pageTitles: { [key: number]: string } = {
      0: "Home | Yin & Yang Studios | Web Design South of England",
      1: "About | Hampshire Web Design Studio",
      2: "Portfolio | Our Work | Yin & Yang Studios",
      3: "Web Design | Services | Yin & Yang Studios",
      4: "App Design | Services | Yin & Yang Studios",
      5: "SEO & Optimisation | Services | Yin & Yang Studios",
      6: "Branding | Services | Yin & Yang Studios",
      7: isMobile ? "Start a Project | Contact Form" : "Contact | Start a Project | South of England",
      8: "Contact Info | Yin & Yang Studios"
    };
    
    document.title = pageTitles[currentPage] || "Yin & Yang Studios | Web Design South of England";
  }, [currentPage]);

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      <AnimatePresence>
        {isNotFound && <NotFound />}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && !isNotFound && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Cursor />
      
      <CookieConsent />

      <GlobalBackground containerRef={scrollContainerRef} isProjectDetailOpen={!!selectedProject} />

      {/* Home Icon */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          scale: isLoading ? 0.5 : 1,
          rotate: isLoading ? -180 : 0
        }}
        transition={{ 
          delay: isLoading ? 0.3 : 0, 
          duration: 1.5, 
          ease: [0.76, 0, 0.24, 1] 
        }}
        onClick={() => navigateTo(0)}
        className="fixed top-6 right-6 md:top-12 md:right-12 z-[300] w-10 h-10 flex items-center justify-center text-studio-white hover:text-studio-accent transition-all duration-1000 cursor-none mix-blend-difference hover:rotate-180"
        aria-label="Go to Home"
      >
        <span className="text-2xl select-none">☯</span>
      </motion.button>

      <DropdownMenu currentPage={currentPage} setPage={navigateTo} isHidden={!!selectedProject} />
      <Dots currentPage={currentPage} setPage={navigateTo} isHidden={!!selectedProject} />
      <Arrows currentPage={currentPage} setPage={navigateTo} isHidden={!!selectedProject} />

      {currentPage >= 3 && currentPage <= 6 && (
        <ScrollSyncedHeader 
          containerRef={scrollContainerRef}
          firstSectionRef={{ current: sectionRefs.current[3] } as any}
          lastSectionRef={{ current: sectionRefs.current[6] } as any}
          currentPage={currentPage}
        />
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          scale: isLoading ? 0.8 : 1,
        }}
        transition={{ 
          duration: 2.5, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2
        }}
        className="absolute inset-0"
      >
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 overflow-y-auto no-scrollbar snap-y snap-mandatory"
        >
          <ZoomSection ref={el => sectionRefs.current[0] = el} containerRef={scrollContainerRef} path={paths[0]}>
            <div className="h-full w-full">
              <Home setPage={navigateTo} />
            </div>
          </ZoomSection>
          
          <ZoomSection ref={el => sectionRefs.current[1] = el} containerRef={scrollContainerRef} path={paths[1]}>
            <div className="h-full w-full">
              <About />
            </div>
          </ZoomSection>
  
          <ZoomSection ref={el => sectionRefs.current[2] = el} containerRef={scrollContainerRef} path={paths[2]}>
            <div className="h-full w-full">
              <Portfolio onProjectClick={handleProjectClick} setPage={navigateTo} />
            </div>
          </ZoomSection>
  
          {SERVICES.map((_, i) => (
            <ZoomSection key={`service-${i}`} ref={el => sectionRefs.current[3 + i] = el} containerRef={scrollContainerRef} path={paths[3 + i]}>
              <div className="h-full w-full">
                <ServiceSection 
                  index={i}
                  onInquire={() => navigateTo(7)} 
                />
              </div>
            </ZoomSection>
          ))}
  
          <ZoomSection ref={el => sectionRefs.current[7] = el} containerRef={scrollContainerRef} path={paths[7]}>
            <div className="h-full w-full">
              {isMobile ? <ContactForm onNext={() => navigateTo(8)} /> : <Contact />}
            </div>
          </ZoomSection>

          {isMobile && (
            <ZoomSection ref={el => sectionRefs.current[8] = el} containerRef={scrollContainerRef} path={paths[8]}>
              <div className="h-full w-full">
                <ContactInfo />
              </div>
            </ZoomSection>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[150] bg-studio-black"
          >
            <ProjectDetail 
              project={selectedProject} 
              onBack={() => setSelectedProject(null)} 
              allProjects={PROJECTS}
              onProjectClick={handleProjectClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
