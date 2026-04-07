import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LiquidWaves from './LiquidWaves';

const defaultProject = {
  id: "00",
  title: "Lunar Skin Co.",
  category: "Web Design",
  description: "A complete digital presence for a Seoul luxury skincare brand — built on the tension between Eastern minimalism and Western desire.",
  client: "Lunar Skin Co.",
  year: "2024",
  services: "Web Design, Branding",
  duration: "8 Weeks",
  liveUrl: "lunarskin.co",
  tags: ["Figma", "Webflow", "GSAP", "E-commerce"],
  stats: [
    { value: "+240%", label: "Organic Traffic" },
    { value: "8 Weeks", label: "Delivered" },
    { value: "4.9/5", label: "Rating" }
  ],
  relatedProjects: [
    { title: "Mirror Archive", category: "App Design", accent: "radial-gradient(circle, rgba(60,220,140,0.14) 0%, transparent 65%)" },
    { title: "Obsidian Identity", category: "Branding", accent: "radial-gradient(circle, rgba(140,60,220,0.13) 0%, transparent 65%)" },
    { title: "Threshold Studio", category: "Web Design", accent: "radial-gradient(circle, rgba(220,140,60,0.12) 0%, transparent 65%)" }
  ]
};

const MockupLoadingOverlay = ({ 
  showIframe, 
  isIframeLoaded, 
  isMobile = false, 
  borderRadius = '20px' 
}: { 
  showIframe: boolean; 
  isIframeLoaded: boolean; 
  isMobile?: boolean; 
  borderRadius?: string; 
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    if (!overlayRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDims({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    obs.observe(overlayRef.current);
    return () => obs.disconnect();
  }, []);

  // Simulate progress for the mockup loader
  useEffect(() => {
    if (showIframe) return;
    
    // Total estimated build time is around 15-20 seconds for StackBlitz
    const duration = isIframeLoaded ? 12000 : 25000; 
    const start = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const rawProgress = (elapsed / duration) * 100;
      
      // If iframe loaded, we can go up to 99% faster but still wait for "build"
      const maxProgress = isIframeLoaded ? 99 : 85;
      const nextProgress = Math.min(maxProgress, Math.floor(rawProgress));
      
      setProgress(nextProgress);

      // Update status messages based on progress
      if (nextProgress < 20) setStatus('Initializing container...');
      else if (nextProgress < 40) setStatus('Installing dependencies...');
      else if (nextProgress < 70) setStatus('Starting dev server...');
      else if (nextProgress < 90) setStatus('Building project...');
      else setStatus('Finalizing build...');
    }, 100);

    return () => clearInterval(timer);
  }, [showIframe, isIframeLoaded]);

  return (
    <AnimatePresence mode="wait">
      {!showIframe && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: borderRadius
          }}
        >
          {/* Dark Liquid Waves Background */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}>
            <LiquidWaves 
              theme="dark"
              flipped={true} 
              showOverlay={true}
              showGrain={false}
              amplitudeScale={0.8}
              width={dims.width}
              height={dims.height}
              step={120}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            {/* Percentage Display */}
            <div style={{ 
              fontFamily: '"Syne", sans-serif', 
              fontSize: isMobile ? '24px' : '48px', 
              fontWeight: 800, 
              color: '#fff',
              letterSpacing: '-0.02em',
              marginBottom: '-8px'
            }}>
              {isIframeLoaded && progress > 95 ? '100' : progress}%
            </div>

            {/* Status Text */}
            <div style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: isMobile ? '7px' : '9px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              {status}
            </div>

            {/* Progress Bar */}
            <div style={{ 
              width: isMobile ? '100px' : '160px', 
              height: '2px', 
              background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div
                animate={{ width: `${isIframeLoaded && progress > 95 ? 100 : progress}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  background: '#fff',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ProjectDetail({ 
  project = defaultProject, 
  onBack = () => {},
  allProjects = [],
  onProjectClick = (p: any) => {}
}) {
  const [activeView, setActiveView] = useState('desktop');
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isPortrait, setIsPortrait] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const sidebarScrollRef = useRef<HTMLDivElement>(null);
  const iframeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 768);
      setIsTabletView(width >= 768 && width < 1024);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const currentIndex = allProjects.findIndex((p: any) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  useEffect(() => {
    const updateScale = () => {
      if (!frameRef.current) return;
      const containerWidth = frameRef.current.offsetWidth;
      const bezelPadding = activeView === 'desktop' ? 24 : 20;
      const baseWidth = activeView === 'desktop' ? 1920 : 390;
      setScale((containerWidth - bezelPadding) / baseWidth);
    };

    const observer = new ResizeObserver(updateScale);
    if (frameRef.current) observer.observe(frameRef.current);
    
    updateScale();

    return () => observer.disconnect();
  }, [activeView, isMobileView]);

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
    // Clear any existing timeout
    if (iframeTimeoutRef.current) clearTimeout(iframeTimeoutRef.current);
    
    // Give it 15 seconds to actually "build" the site inside the StackBlitz embed
    // This ensures the user sees the finished product, not the booting screen
    iframeTimeoutRef.current = setTimeout(() => {
      setShowIframe(true);
    }, 15000); 
  };

  // Reset scroll position when project changes
  useEffect(() => {
    if (mainScrollRef.current) mainScrollRef.current.scrollTop = 0;
    if (sidebarScrollRef.current) sidebarScrollRef.current.scrollTop = 0;
    
    setIsIframeLoaded(false);
    setShowIframe(false);
    if (iframeTimeoutRef.current) clearTimeout(iframeTimeoutRef.current);
  }, [project.id]);

  // Pick 3 random projects excluding the current one
  const relatedProjects = React.useMemo(() => {
    if (!allProjects.length) return project.relatedProjects || [];
    const others = allProjects.filter(p => p.id !== project.id);
    return others.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [allProjects, project.id, project.relatedProjects]);

  const getIframeSrc = () => {
    const title = project.title.replace('\n', ' ');
    if (title === 'Harbour Wellness') return "https://stackblitz.com/github/tobywcox-pixel/Harbour-Wellness?embed=1&view=preview&hideExplorer=1&hideNavigation=1&theme=dark&hidedevtools=1";
    if (title === 'Saffron Kitchen') return "https://stackblitz.com/github/tobywcox-pixel/Saffron-Kitchen?embed=1&view=preview&hideExplorer=1&hideNavigation=1&theme=dark&hidedevtools=1";
    if (title === 'PrimeNest Real Estate') return "https://stackblitz.com/github/tobywcox-pixel/PrimeNest?embed=1&view=preview&hideExplorer=1&hideNavigation=1&theme=dark&hidedevtools=1";
    if (title === 'Alfred Tripp Accountancy Services') return "https://stackblitz.com/github/tobywcox-pixel/Alfred-Tripp?embed=1&view=preview&hideExplorer=1&hideNavigation=1&theme=dark&hidedevtools=1";
    if (title === 'Akribai') return "https://stackblitz.com/github/tobywcox-pixel/akrib.ai?embed=1&view=preview&hideExplorer=1&hideNavigation=1&theme=dark&hidedevtools=1";
    return "https://stackblitz.com/github/tobywcox-pixel/SkillForge?embed=1&view=preview&hideExplorer=1&hideNavigation=1&theme=dark&hidedevtools=1";
  };

  const hasPreview = ['Harbour Wellness', 'Skill Forge Academy', 'Saffron Kitchen', 'PrimeNest Real Estate', 'Alfred Tripp Accountancy Services', 'Akribai'].includes(project.title.replace('\n', ' '));

  const renderMockups = () => (
    <div className="flex-1 relative min-h-[400px] md:min-h-0 flex flex-col items-center justify-center gap-6 md:gap-6 pb-12 md:pb-0 w-full">
      {/* View Toggle - Just above mockups */}
      <div style={{
        display: 'flex',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '4px',
        padding: '2px',
        gap: '2px',
        width: '180px',
        zIndex: 10
      }}>
        {['desktop', 'mobile'].map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            style={{
              flex: 1,
              fontFamily: '"Syne", sans-serif',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '8px 0',
              borderRadius: '2px',
              cursor: 'pointer',
              border: '1px solid transparent',
              background: activeView === view ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
              borderColor: activeView === view ? 'rgba(239, 68, 68, 0.4)' : 'transparent',
              color: activeView === view ? '#fff' : 'rgba(255,255,255,0.3)',
              boxShadow: activeView === view ? '0 0 15px rgba(239, 68, 68, 0.1)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              outline: 'none',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {activeView === view && (
              <motion.div
                layoutId="active-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.1), transparent)',
                  zIndex: -1
                }}
              />
            )}
            {view}
          </button>
        ))}
      </div>

      {/* Unified Mockup Frame */}
      <div 
        ref={frameRef}
        style={{
          width: activeView === 'desktop' ? (isMobileView ? '100%' : '85%') : '200px',
          maxWidth: activeView === 'desktop' ? '900px' : 'none',
          aspectRatio: activeView === 'desktop' ? '16/9' : '390/844',
          maxHeight: activeView === 'desktop' ? 'none' : '85vh',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: activeView === 'desktop' ? '20px' : '36px',
          padding: activeView === 'desktop' ? '12px' : '10px',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: activeView === 'desktop' 
            ? '0 50px 100px -20px rgba(0,0,0,0.7), inset 0 0 30px rgba(255,255,255,0.05)'
            : '0 40px 80px -15px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.05)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}
      >
        <MockupLoadingOverlay 
          showIframe={showIframe} 
          isIframeLoaded={isIframeLoaded} 
          isMobile={activeView === 'mobile'}
          borderRadius={activeView === 'desktop' ? '20px' : '36px'} 
        />
        
        {/* Screen Area */}
        <div style={{
          width: '100%',
          height: '100%',
          aspectRatio: activeView === 'desktop' ? '16/9' : '390/844',
          background: '#000',
          borderRadius: activeView === 'desktop' ? '4px' : '28px',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid #000',
          transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {hasPreview ? (
            <div style={{ 
              width: activeView === 'desktop' ? '1920px' : '390px', 
              height: activeView === 'desktop' ? '1080px' : '844px', 
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: showIframe ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              pointerEvents: showIframe ? 'auto' : 'none',
              zIndex: 1
            }}>
              <iframe 
                key={project.id} // Only remount when project changes
                src={getIframeSrc()}
                style={{
                  width: '100%',
                  height: 'calc(100% + 42px)', // Aggressive crop for footer
                  border: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
                onLoad={handleIframeLoad}
                title={`${project.title} Mockup`}
              />
            </div>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: '"Syne", sans-serif',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}>
              Preview Unavailable
            </div>
          )}
        </div>

        {/* Decorations */}
        {activeView === 'desktop' ? (
          <div style={{
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0
          }}>
            <div style={{
              fontFamily: '"Syne", sans-serif',
              fontSize: '6px',
              fontWeight: 700,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.15)'
            }}>
              PIXEL ARCHITECT SERIES
            </div>
            <div style={{
              position: 'absolute',
              right: '12px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: showIframe ? '#10b981' : '#f59e0b',
              boxShadow: showIframe ? '0 0 8px #10b981' : '0 0 8px #f59e0b',
              transition: 'all 0.5s ease'
            }} />
          </div>
        ) : (
          <div style={{ 
            width: '60px', 
            height: '3px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '3px', 
            margin: '12px auto 0', 
            flexShrink: 0 
          }} />
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-studio-black p-6 md:p-10 relative font-sans text-white h-screen w-full box-border flex flex-col overflow-hidden">
      {/* Background Waves - Subtle for detail view */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <LiquidWaves 
          theme="dark" 
          flipped={true} 
          showOverlay={true} 
          showGrain={false} 
          amplitudeScale={0.6} 
          step={150} 
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@200;300;400;500;600;700&display=swap');

        .sidebar::before { 
          content: ''; 
          position: absolute; 
          top: 0; 
          left: 0; 
          right: 0; 
          height: 1px; 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); 
        }

        .back-link:hover span {
          color: #fff !important;
        }

        .rel-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.08) !important;
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          ref={mainScrollRef}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
          transition={{ 
            duration: 1.6, 
            ease: [0.76, 0, 0.24, 1] 
          }}
          className={`grid flex-1 min-h-0 no-scrollbar ${
            (isMobileView || isTabletView) && !isPortrait 
              ? 'grid-cols-[280px_1fr] gap-4 overflow-hidden' 
              : 'grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr] gap-8 md:gap-10 overflow-y-auto md:overflow-hidden'
          }`}
        >
          
          {/* LEFT COLUMN — Sidebar & Navigation */}
          <div className={`flex flex-col gap-4 h-auto md:h-full flex-shrink-0 ${
            (isMobileView || isTabletView) && !isPortrait ? 'w-[280px]' : 'w-full md:w-[320px] lg:w-[400px]'
          }`}>
          {/* Back Button Above Tile */}
          <div 
            className="back-link group"
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: '4px 0',
              width: 'fit-content'
            }}
          >
            <span style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.2)',
              transition: 'transform 0.3s'
            }} className="group-hover:-translate-x-1">←</span>
            <span style={{
              fontFamily: '"Syne", sans-serif',
              fontSize: '7px',
              fontWeight: 700,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              transition: 'color 0.3s'
            }}>Back to portfolio</span>
          </div>

          <div className="sidebar relative z-10" ref={sidebarScrollRef} style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '0px', // More architectural/sharp
            padding: '40px 30px',
            position: 'relative',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            scrollbarWidth: 'none'
          }}>
            <h2 style={{
              fontFamily: '"Syne", sans-serif',
              fontSize: '8px',
              fontWeight: 800,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(239, 68, 68, 0.8)',
              display: 'block',
              marginBottom: '12px'
            }}>
            {project.category}
          </h2>

          <h1 style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: (isMobileView && isPortrait) 
              ? (project.title.length > 25 ? '22px' : '26px')
              : (isTabletView && isPortrait)
                ? (project.title.length > 25 ? '32px' : '40px')
                : (project.title.length > 25 ? '28px' : '34px'),
            lineHeight: 0.9,
            marginBottom: '24px',
            color: '#fff',
            letterSpacing: '-0.05em',
            textTransform: 'uppercase'
          }}>
            {project.title}
          </h1>

          {/* Mobile Mockups - Inserted between Title and Description (Portrait only) */}
          {(isMobileView || isTabletView) && isPortrait && (
            <div className="mb-8">
              {renderMockups()}
            </div>
          )}

          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.6,
            marginBottom: '32px'
          }}>
            {project.description || (project as any).desc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
            {[
              { label: 'Client', value: project.client },
              { label: 'Year', value: project.year },
              { label: 'Services', value: project.services },
              { label: 'Delivered', value: project.stats?.find(s => s.label === 'Delivered')?.value || project.duration },
              { 
                label: 'Brief', 
                value: project.title.replace('\n', ' ') === 'Harbour Wellness' 
                  ? "A comprehensive digital transformation for a high-end wellness clinic, focusing on seamless patient onboarding and a serene visual identity."
                  : project.title.replace('\n', ' ') === 'Skill Forge Academy'
                  ? "An advanced e-learning platform designed to empower students through interactive courses and real-time progress tracking."
                  : "A bespoke digital solution tailored to the client's unique needs, combining cutting-edge technology with thoughtful design."
              }
            ].map((item, idx, arr) => (
              <div key={item.label} style={{
                padding: '16px 0',
                borderBottom: idx === arr.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{
                  fontFamily: '"Syne", sans-serif',
                  fontSize: '7px',
                  fontWeight: 800,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '6px'
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: item.label === 'Brief' ? 400 : 600,
                  fontSize: item.label === 'Brief' ? '11px' : '12px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: item.label === 'Brief' ? '1.5' : '1.2'
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Project Navigation in Sidebar */}
          <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              width: '100%',
              zIndex: 10
            }}>
              {[
                { label: 'Previous', project: prevProject, align: 'flex-start' as const },
                { label: 'Next', project: nextProject, align: 'flex-end' as const }
              ].map((btn, i) => (
                <motion.button
                  key={i}
                  onClick={() => onProjectClick(btn.project)}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-4 py-6 group overflow-hidden rounded-sm"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: btn.align,
                    justifyContent: 'center',
                    gap: '6px',
                    textAlign: btn.align === 'flex-start' ? 'left' : 'right'
                  }}
                >
                  {/* Liquid Glass Base */}
                  <div className="absolute inset-0 bg-red-600/10 backdrop-blur-xl border border-red-500/20 rounded-sm transition-all duration-500 group-hover:bg-red-600/20 group-hover:border-red-500/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]" />
                  
                  {/* Liquid Movement Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
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

                  {/* Labels */}
                  <span className="relative z-10 text-white/30 font-sans text-[7px] tracking-[0.3em] uppercase font-bold transition-colors duration-500 group-hover:text-red-500/50">
                    {btn.label}
                  </span>
                  <span className={`relative z-10 text-white font-syne tracking-[0.05em] uppercase transition-colors duration-500 group-hover:text-red-500 ${
                    (isMobileView && isPortrait) 
                      ? 'text-[8px] font-normal' 
                      : 'text-[10px] font-extrabold'
                  }`}>
                    {btn.project.title}
                  </span>

                  {/* Subtle Shine */}
                  <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

          {/* RIGHT COLUMN — Main Content */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '24px',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 10
          }}>
            
            {/* Top Bar: Stats */}
            <div className="hidden md:flex justify-between items-center flex-shrink-0 w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="text-[8px] font-syne font-bold tracking-[0.5em] text-white/20 uppercase">
                  Project Analysis
                </span>
              </div>
              {/* Compact Stats */}
              <div style={{ display: 'flex', gap: '48px' }}>
                {project.stats?.filter(s => s.label !== 'Delivered' && s.value !== '50+').map(stat => (
                  <div key={stat.label} style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: '"Syne", sans-serif',
                      fontWeight: 800,
                      fontSize: '24px',
                      color: '#fff',
                      lineHeight: 1,
                      letterSpacing: '-0.05em'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontFamily: '"Syne", sans-serif',
                      fontSize: '8px',
                      fontWeight: 800,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.3)',
                      marginTop: '4px'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Mockup Area */}
            {(!(isMobileView || isTabletView) || !isPortrait) && (
              <div className="flex-1 relative min-h-[400px] md:min-h-0 flex flex-col items-center justify-center gap-6 md:gap-6 pb-12 md:pb-0">
                {renderMockups()}
              </div>
            )}
          </div>
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 hidden md:block opacity-20">
            <span className="text-[8px] font-sans font-bold tracking-[0.5em] text-white uppercase vertical-text">
              Case Study / {project.id}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 hidden md:block opacity-20">
            <span className="text-[8px] font-sans font-bold tracking-[0.5em] text-white uppercase vertical-text">
              Pixel Architect
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
