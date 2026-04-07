import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../constants/services';

interface ServiceSectionProps {
  index: number;
  onInquire?: () => void;
}

export function StaticServicesHeader() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-px bg-red-500/40" />
        <span className="text-[10px] tracking-[0.6em] uppercase text-red-500 font-bold">Capabilities</span>
      </div>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-extrabold text-white leading-[0.9] tracking-tighter uppercase flex flex-col">
        <span>Digital</span>
        <span className="text-red-500">Excellence</span>
      </h1>
    </div>
  );
}

export function DynamicServiceWord({ phase = 0 }: { phase?: number }) {
  const words = ["Envisioned", "Refined", "Optimised", "Manifested"];
  const currentWord = words[phase] || words[0];

  return (
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-syne font-extrabold leading-[0.9] tracking-tighter uppercase text-white">
      <span>{currentWord}</span>
    </h1>
  );
}

export default function ServiceSection({ index, onInquire }: ServiceSectionProps) {
  const service = SERVICES[index];
  if (!service) return null;

  return (
    <div className="min-h-screen md:h-screen w-full bg-transparent flex flex-col justify-start items-center px-6 md:px-12 lg:px-24 pt-24 md:pt-20 lg:pt-24 md:max-lg:pt-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] blur-[120px] rounded-full" 
          style={{ background: `${service.color}10` }}
        />
        <div 
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] blur-[120px] rounded-full" 
          style={{ background: `${service.color}05` }}
        />
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
      <div className="max-w-5xl w-full relative z-10">
        <div className="mb-8 md:mb-16 relative">
          <div className="opacity-0 pointer-events-none">
            <StaticServicesHeader />
          </div>
          <div className="mt-2 md:mt-0 md:absolute md:top-full md:left-0">
            <DynamicServiceWord phase={index} />
          </div>
        </div>
        
        <div className="flex flex-col items-start gap-10 mt-12 md:mt-32 lg:mt-48">
          {/* Main Content Column */}
          <div className="w-full max-w-2xl flex flex-col relative">
            <div className="flex flex-col mb-6 relative">
              {/* Sidebar Icon */}
              <div 
                className="hidden lg:flex w-14 h-14 rounded-xl border border-white/10 items-center justify-center bg-white/[0.02] absolute -left-20 top-0"
                style={{ borderColor: `${service.color}30` }}
              >
                <service.icon 
                  size={24} 
                  style={{ color: service.color }} 
                  strokeWidth={1.5}
                />
              </div>

              <div className="flex flex-row items-center gap-4 md:gap-6 lg:gap-0">
                <div 
                  className="lg:hidden w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.02] shrink-0 md:mb-0"
                  style={{ borderColor: `${service.color}30` }}
                >
                  <service.icon 
                    size={20} 
                    style={{ color: service.color }} 
                    strokeWidth={1.5}
                  />
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-5xl md:max-lg:text-4xl font-syne font-bold text-white leading-[1.1] tracking-tight">
                  {index === 0 ? (
                    <>Web Design<br />& Redesign</>
                  ) : index === 1 ? (
                    <>Application<br />Design</>
                  ) : index === 2 ? (
                    <>SEO & Keyword<br />Optimisation</>
                  ) : index === 3 ? (
                    <>Branding<br />& Identity</>
                  ) : (
                    service.title
                  )}
                </h2>
              </div>
            </div>
            
            <p className="text-[10px] md:text-xs font-light text-white/40 leading-relaxed max-w-md mb-8">
              {service.desc}
            </p>

            {/* Bullets - Now underneath the description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-xl">
              {service.bullets.map((bullet, bi) => (
                <div 
                  key={bi}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-1 h-1 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors" />
                  <span className="text-[9px] md:text-[10px] font-light text-white/40 group-hover:text-white transition-colors">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 flex items-center gap-4">
          {SERVICES.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-1000 rounded-full ${
                index === i ? 'w-12 bg-red-500' : 'w-4 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <span className="text-[8px] tracking-[0.4em] uppercase text-white">
            {index === SERVICES.length - 1 ? 'Continue' : 'Scroll'}
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </div>
  );
}
