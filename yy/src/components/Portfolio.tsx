import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants/projects';

export default function Portfolio({ onProjectClick = (project: any) => {}, setPage = (page: number) => {} }) {
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
    <div className="bg-transparent p-6 md:p-12 relative overflow-hidden h-screen flex flex-col justify-start md:justify-center font-sans pt-24 md:pt-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@200;300;400;500&display=swap');

        .portfolio-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          height: auto;
          overflow-y: auto;
          padding-bottom: 2rem;
        }

        @media (min-width: 640px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .project-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(239, 68, 68, 0.15);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          height: 180px;
        }

        @media (min-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            overflow-y: auto;
            padding-bottom: 4rem;
          }
          
          .project-card {
            border-radius: 24px;
            height: 280px;
          }
        }

        @media (min-width: 1025px) {
          .portfolio-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 1rem;
            overflow: hidden;
            padding-bottom: 0;
          }
          
          .grid-item-large {
            grid-column: span 2;
            grid-row: span 1;
          }

          .project-card {
            height: 240px;
          }
        }

        .project-card:hover {
          transform: translateY(-8px);
          border-color: rgba(239, 68, 68, 0.5);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(239, 68, 68, 0.1);
        }

        .project-card .image-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .project-card .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.2;
          filter: grayscale(1) brightness(0.5);
          transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(1.1);
        }

        .project-card:hover .project-image {
          opacity: 0.4;
          filter: grayscale(0) brightness(0.7);
          transform: scale(1);
        }

        .project-card .content-overlay {
          position: relative;
          z-index: 10;
          height: 100%;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 768px) {
          .project-card .content-overlay {
            padding: 2rem;
          }
        }

        .project-card:hover .content-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
        }

        .project-card .category-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.5rem;
          transition: color 0.8s;
        }

        .project-card:hover .category-tag {
          color: #ef4444;
        }

        .project-card .project-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          transform: translateY(0);
          opacity: 1;
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: pre-line;
          text-transform: uppercase;
        }

        .project-card .view-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          opacity: 1;
          transform: translateX(0);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 768px) {
          .project-card .project-title {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            transform: translateY(10px);
            opacity: 0.8;
          }

          .project-card .view-button {
            opacity: 0;
            transform: translateX(-10px);
          }
        }

        .project-card:hover .project-title {
          transform: translateY(0);
          opacity: 1;
        }

        .project-card:hover .view-button {
          opacity: 1;
          transform: translateX(0);
        }

        .portfolio-grid::-webkit-scrollbar {
          width: 4px;
        }
        .portfolio-grid::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .portfolio-grid::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="w-full max-w-6xl mx-auto z-10"
      >
        <div className="portfolio-grid no-scrollbar max-h-[70vh] md:max-h-none">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              className={`project-card ${idx === 0 || idx === 3 ? 'grid-item-large' : ''}`}
              onClick={() => onProjectClick(project)}
            >
              <div className="image-container">
                <img 
                  src={project.image} 
                  alt={project.alt || project.title}
                  className="project-image"
                  referrerPolicy="no-referrer"
                />
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `radial-gradient(circle at 70% 30%, ${project.orb}, transparent 70%)`,
                    opacity: 0.3
                  }}
                />
              </div>

              <div className="content-overlay">
                <span className="category-tag">{project.service}</span>
                <h3 className="project-title">{project.title}</h3>
                <div className="view-button">
                  <span>View Project</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA Tile inside the grid */}
          <motion.div 
            variants={itemVariants}
            className="project-card flex flex-col justify-end items-start p-6 md:p-10 bg-studio-white/[0.02] border-studio-white/10 hover:bg-studio-white/[0.05] hover:border-red-500/30 group"
            onClick={() => setPage(7)}
          >
            <div className="relative z-10 flex flex-col items-start text-left gap-4 w-full">
              <div className="w-8 h-8 rounded-full border border-red-500/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                {/* Icon removed */}
              </div>
              <span className="text-[7px] font-bold tracking-[0.4em] uppercase text-studio-white/30 group-hover:text-red-500/60 transition-colors duration-500">Collaboration</span>
              <h2 className="font-syne font-bold text-lg md:text-2xl text-white tracking-tight leading-tight">
                Have a vision? <br/> <span className="text-white/40 group-hover:text-white/60 transition-colors duration-500">Let's build it.</span>
              </h2>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="mt-4 px-6 py-2 bg-transparent border border-studio-white/20 text-white font-bold text-[8px] tracking-[0.2em] uppercase rounded-sm group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-all duration-500"
              >
                Start Project
              </motion.div>
            </div>
            
            {/* Subtle Liquid Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            {/* Technical Lines */}
            <div className="absolute top-4 left-4 w-4 h-[1px] bg-white/10" />
            <div className="absolute top-4 left-4 w-[1px] h-4 bg-white/10" />
            <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-white/10" />
            <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-white/10" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
