import { useEffect, useRef } from "react";

export default function HeaderScene() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ mouse: { x: -9999, y: -9999 }, particles: [], width: 0, height: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    const resize = () => {
      state.width = canvas.offsetWidth;
      state.height = canvas.offsetHeight;
      canvas.width = state.width;
      canvas.height = state.height;
    };
    resize();

    const PARTICLE_COUNT = 100;
    const MAX_DIST = 140;
    const MOUSE_RADIUS = 130;
    const R = 21, G = 204, B = 246; // #15ccf6

    state.particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * state.width,
      y: Math.random() * state.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.5,
    }));

    const tick = () => {
      const { width, height, mouse, particles } = state;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const f = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.8;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Dampen velocity
        p.vx *= 0.97;
        p.vy *= 0.97;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        if (p.y > height) p.y -= height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},0.85)`;
        ctx.fill();
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < MAX_DIST) {
            const alpha = ((1 - d / MAX_DIST) * 0.35).toFixed(3);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${R},${G},${B},${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { state.mouse = { x: -9999, y: -9999 }; };

    // Click creates a burst effect
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const p of state.particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.hypot(dx, dy);
        if (d < 100 && d > 0) {
          const f = ((100 - d) / 100) * 6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", resize);
    tick();

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "220px",
      background: "var(--surface)",
      overflow: "hidden",
      borderBottom: "1px solid var(--bordercolor)",
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
      {/* Subtle label */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        textAlign: "center",
        userSelect: "none",
      }}>
        <p style={{
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(21,204,246,0.45)",
          fontFamily: "var(--font-main)",
        }}>
          Move cursor · Click to burst
        </p>
      </div>
      {/* Bottom gradient fade into bg */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "70px",
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        pointerEvents: "none",
      }} />
    </div>
  );
}
