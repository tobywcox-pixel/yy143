import { useEffect, useRef } from 'react';

interface LiquidWavesProps {
  color?: string;
  theme?: 'dark' | 'light';
  flipped?: boolean;
  horizontalFlip?: boolean;
  rotation?: number;
  scale?: number;
  yOffset?: number;
  showBackground?: boolean;
  showOverlay?: boolean;
  showGrain?: boolean;
  amplitudeScale?: number;
  baseHeight?: number;
  width?: number;
  height?: number;
  paused?: boolean;
  step?: number;
}

export default function LiquidWaves({ 
  color = 'rgba(239, 68, 68, 1)', // Default to Red
  theme = 'dark',
  flipped = true, // Default to top-down as requested
  horizontalFlip = false,
  rotation = 0,
  scale = 1,
  yOffset = 0,
  showBackground = true,
  showOverlay = true,
  showGrain = true,
  amplitudeScale = 1,
  baseHeight,
  width,
  height,
  paused = false,
  step = 10
}: LiquidWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const dpr = 0.5;
      const w = width !== undefined ? width : window.innerWidth;
      const h = height !== undefined ? height : window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused) {
          if (!animationFrameId) {
            draw();
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(canvas);
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      const w = width !== undefined ? width : window.innerWidth;
      const h = height !== undefined ? height : window.innerHeight;
      
      time += 0.006; // Even slower for better performance
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      
      // Scale transformations to match the lower resolution
      const dpr = 0.5;
      ctx.scale(dpr, dpr);
      
      // Apply global transformations
      ctx.translate(w / 2, h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.translate(-w / 2, -h / 2 + yOffset);

      if (horizontalFlip) {
        ctx.translate(w, 0);
        ctx.scale(-1, 1);
      }

      const bgColor = theme === 'dark' ? '#0A0A0A' : '#FFFFFF';
      const gradientColor = theme === 'dark' ? 'rgba(10, 10, 10, ' : 'rgba(255, 255, 255, ';

      // Background
      if (showBackground) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(-w, -h, w * 3, h * 3);
      }

      // Dynamic Color Cycling Logic - Red Palette
      const colorPalette = [
        { r: 239, g: 68, b: 68 },   // Red
        { r: 220, g: 38, b: 38 },   // Crimson
        { r: 185, g: 28, b: 28 },   // Dark Red
        { r: 225, g: 29, b: 72 },   // Rose
      ];

      const getDynamicColor = (alpha: number) => {
        if (color !== 'rgba(239, 68, 68, 1)') {
          if (color.startsWith('rgba')) {
            return color.replace(/[\d.]+(?=\))/, alpha.toString());
          }
          return color;
        }

        const cycleTime = time * 0.1;
        const index = Math.floor(cycleTime % colorPalette.length);
        const nextIndex = (index + 1) % colorPalette.length;
        const factor = cycleTime % 1;

        const r = Math.round(colorPalette[index].r + (colorPalette[nextIndex].r - colorPalette[index].r) * factor);
        const g = Math.round(colorPalette[index].g + (colorPalette[nextIndex].g - colorPalette[index].g) * factor);
        const b = Math.round(colorPalette[index].b + (colorPalette[nextIndex].b - colorPalette[index].b) * factor);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      // Reduced number of waves for better performance
      const waves = [
        { amplitude: 180 * amplitudeScale, frequency: 0.0008, speed: 0.5, color: getDynamicColor(0.35), offset: 0, streaks: true },
        { amplitude: 240 * amplitudeScale, frequency: 0.0006, speed: 0.3, color: getDynamicColor(0.25), offset: 2, streaks: false },
        { amplitude: 300 * amplitudeScale, frequency: 0.0004, speed: 0.2, color: getDynamicColor(0.15), offset: 6, streaks: false },
      ];

      waves.forEach((wave) => {
        // Main Wave Body
        ctx.beginPath();
        
        if (flipped) {
          ctx.moveTo(-w, -h);
        } else {
          ctx.moveTo(-w, h * 2);
        }

        const points: {x: number, y: number}[] = [];

        // Increased step size for better performance (from 50 to 80)
        for (let x = -w; x <= w * 2; x += step) {
          const yWave = 
            Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.2 + time * wave.speed * 0.7) * (wave.amplitude * 0.3);
          
          const defaultBase = flipped ? 0.35 : 0.85;
          const actualBase = baseHeight !== undefined ? baseHeight : defaultBase;
          
          const y = flipped 
            ? h * actualBase - yWave 
            : h * actualBase + yWave;
          
          points.push({x, y});
          ctx.lineTo(x, y);
        }

        if (flipped) {
          ctx.lineTo(w * 2, -h);
        } else {
          ctx.lineTo(w * 2, h * 2);
        }
        
        ctx.fillStyle = wave.color;
        ctx.fill();

        // Aurora "Curtain" Vertical Streaks - Simplified for performance
        if (wave.streaks) {
          ctx.save();
          ctx.globalAlpha = 0.4;
          for (let i = 0; i < points.length; i += 4) {
            const p = points[i];
            const streakHeight = wave.amplitude * (1.2 + Math.sin(time * 1.5 + i * 0.1) * 0.6);
            
            const rgbMatch = wave.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            const rgb = rgbMatch ? `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}` : '239, 68, 68';
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, flipped ? p.y + streakHeight : p.y - streakHeight);
            ctx.strokeStyle = `rgba(${rgb}, 0.2)`;
            ctx.lineWidth = 10;
            ctx.stroke();
          }
          ctx.restore();
        }
      });

      // Add a subtle gradient overlay to blend
      if (showOverlay) {
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        if (flipped) {
          gradient.addColorStop(0, gradientColor + '0.5)');
          gradient.addColorStop(0.3, gradientColor + '0)');
          gradient.addColorStop(0.7, gradientColor + '0.3)');
          gradient.addColorStop(1, gradientColor + '0.8)');
        } else {
          gradient.addColorStop(0, gradientColor + '0.8)');
          gradient.addColorStop(0.3, gradientColor + '0.3)');
          gradient.addColorStop(0.7, gradientColor + '0)');
          gradient.addColorStop(1, gradientColor + '0.5)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-w, -h, w * 3, h * 3);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme, color, flipped, horizontalFlip, rotation, scale, yOffset, showBackground, showOverlay, showGrain, amplitudeScale, baseHeight, width, height, paused, step]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(12px) contrast(1.15) saturate(1.2)' }}
      />
      
      {/* Grain Texture Overlay with Glass Frosting */}
      {showGrain && (
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay backdrop-blur-[2px]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      )}
    </div>
  );
}
