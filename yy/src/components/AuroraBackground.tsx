import { useEffect, useRef } from 'react';

interface AuroraBackgroundProps {
  color?: string;
  theme?: 'dark' | 'light';
}

export default function AuroraBackground({ 
  color = 'rgba(34, 197, 94, 1)', // Default to Aurora Green
  theme = 'dark' 
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bgColor = theme === 'dark' ? '#0A0A0A' : '#FFFFFF';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Aurora colors - leaning into greens, teals, and purples
      const auroraColors = [
        { r: 34, g: 197, b: 94, a: 0.18 },  // Aurora Green
        { r: 20, g: 184, b: 166, a: 0.14 }, // Teal
        { r: 139, g: 92, b: 246, a: 0.1 },  // Purple
        { r: 14, g: 165, b: 233, a: 0.12 }, // Sky Blue
      ];

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Create multiple aurora "curtains"
      for (let i = 0; i < 4; i++) {
        const c = auroraColors[i % auroraColors.length];
        const speed = 0.5 + i * 0.2;
        const frequency = 0.001 + i * 0.0005;
        const amplitude = 150 + i * 50;
        const yBase = canvas.height * (0.3 + i * 0.15);

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 5) {
          // Vertical "streaks" logic
          const noise = Math.sin(x * frequency + time * speed) * amplitude;
          const noise2 = Math.sin(x * frequency * 2.5 - time * speed * 0.5) * (amplitude * 0.4);
          const noise3 = Math.sin(x * frequency * 0.5 + time * speed * 1.2) * (amplitude * 0.2);
          
          const y = yBase + noise + noise2 + noise3;
          
          // Draw vertical lines to simulate curtains
          const gradient = ctx.createLinearGradient(x, y - 300, x, y + 300);
          gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
          gradient.addColorStop(0.5, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);
          gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(x, y - 400);
          ctx.lineTo(x, y + 400);
          ctx.stroke();
        }
      }

      ctx.restore();

      // Add a soft glow overlay
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      radialGradient.addColorStop(0, 'rgba(34, 197, 94, 0.05)');
      radialGradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, color]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(60px) saturate(1.5) contrast(1.1)' }}
      />
      
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilterAurora">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterAurora)" />
        </svg>
      </div>
    </div>
  );
}
