import { useEffect, useRef } from "react";
import { useWeather } from "./WeatherContext";

export default function WeatherBackground() {
  const canvasRef = useRef(null);
  const { season } = useWeather();
  const leafImageRef = useRef(null);

  // Pre-load leaf image or create programmatic leaf shape
  useEffect(() => {
    // We will draw leaves programmatically to avoid external asset dependencies
  }, []);

  useEffect(() => {
    if (season === 'none') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    // More particles for snow, fewer for leaves
    const maxParticles = season === 'winter' ? 100 : 40; 
    
    // Autumn colors
    const leafColors = ['#d95a2b', '#b0411b', '#e28d32', '#9c6622', '#c13917'];

    for (let i = 0; i < maxParticles; i++) {
        
      if (season === 'winter') {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 3 + 1,
          d: Math.random() * maxParticles,
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 + 1,
        });
      } else if (season === 'autumn') {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 4 + 4, // size parameter
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
          vx: Math.random() * 2 - 1, // leaf drift
          vy: Math.random() * 1.5 + 0.5, // leaf fall speed
          angle: Math.random() * Math.PI * 2, // rotation
          spin: Math.random() * 0.05 - 0.025, // rotation speed
        });
      }
    }

    let animationFrameId;

    const drawSnow = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
    };

    const drawLeaves = () => {
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        ctx.fillStyle = p.color;
        
        // Draw a simple leaf shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.5, p.r, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    };

    let angle = 0;
    const updateSnow = () => {
      angle += 0.01;
      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += Math.sin(angle) * 2 + p.vx;

        if (p.x > width + 5 || p.x < -5 || p.y > height) {
          if (i % 3 > 0) {
            particles[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d, vx: p.vx, vy: p.vy };
          } else {
            if (Math.sin(angle) > 0) {
              particles[i] = { x: -5, y: Math.random() * height, r: p.r, d: p.d, vx: p.vx, vy: p.vy };
            } else {
              particles[i] = { x: width + 5, y: Math.random() * height, r: p.r, d: p.d, vx: p.vx, vy: p.vy };
            }
          }
        }
      }
    };

    let time = 0;
    const updateLeaves = () => {
        time += 0.02;
        for (let i = 0; i < maxParticles; i++) {
          const p = particles[i];
          p.angle += p.spin;
          // Swaying motion for leaves
          p.x += Math.sin(time + i) * 1 + p.vx;
          p.y += p.vy;
  
          if (p.x > width + 20 || p.x < -20 || p.y > height + 20) {
            particles[i] = { 
                x: Math.random() * width, 
                y: -20, 
                r: p.r, 
                color: p.color, 
                vx: p.vx, 
                vy: p.vy,
                angle: p.angle,
                spin: p.spin
            };
          }
        }
      };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (season === 'winter') {
          drawSnow();
          updateSnow();
      } else if (season === 'autumn') {
          drawLeaves();
          updateLeaves();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [season]);

  if (season === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${season === 'winter' ? 'mix-blend-screen' : ''}`}
    />
  );
}
