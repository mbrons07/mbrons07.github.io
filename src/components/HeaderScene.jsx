import { useEffect, useRef } from "react";

// Palette: deep navy → violet → cyan accent (#15ccf6)
const PALETTE = [
  { r: 21,  g: 204, b: 246 }, // cyan
  { r: 120, g: 80,  b: 255 }, // violet
  { r: 60,  g: 180, b: 255 }, // sky blue
  { r: 200, g: 100, b: 255 }, // purple
];

function randPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function lerp(a, b, t) { return a + (b - a) * t; }

export default function HeaderScene() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    mouse: { x: -9999, y: -9999 },
    particles: [],
    orbs: [],
    stars: [],
    shootingStars: [],
    width: 0,
    height: 0,
    t: 0,
  });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    const resize = () => {
      state.width  = canvas.offsetWidth;
      state.height = canvas.offsetHeight;
      canvas.width  = state.width;
      canvas.height = state.height;
      buildStars();
    };

    // ── Static star field ──────────────────────────────────────────────────
    function buildStars() {
      state.stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        r: Math.random() * 0.9 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    }

    // ── Particle network ───────────────────────────────────────────────────
    const PARTICLE_COUNT = 80;
    const MAX_DIST = 130;
    const MOUSE_RADIUS = 140;

    state.particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const c = randPick(PALETTE);
      return {
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.5,
        r_: c.r, g_: c.g, b_: c.b,
      };
    });

    // ── Ambient glow orbs (slow drift) ────────────────────────────────────
    state.orbs = [
      { cx: 0.18, cy: 0.55, r: 0.38, col: "21,204,246",  speed: 0.00012, phase: 0.0 },
      { cx: 0.75, cy: 0.35, r: 0.30, col: "120,80,255",  speed: 0.00009, phase: 1.2 },
      { cx: 0.50, cy: 0.80, r: 0.25, col: "200,100,255", speed: 0.00015, phase: 2.4 },
    ];

    // ── Shooting stars ────────────────────────────────────────────────────
    function spawnShootingStar() {
      const c = randPick(PALETTE);
      return {
        x: Math.random() * state.width,
        y: Math.random() * state.height * 0.6,
        len: Math.random() * 80 + 60,
        speed: Math.random() * 4 + 3,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
        alpha: 1,
        fade: Math.random() * 0.02 + 0.015,
        ...c,
        active: true,
      };
    }
    state.shootingStars = [];
    // Spawn one immediately then at intervals
    setTimeout(() => { state.shootingStars.push(spawnShootingStar()); }, 800);
    const ssInterval = setInterval(() => {
      if (state.shootingStars.filter(s => s.active).length < 2) {
        state.shootingStars.push(spawnShootingStar());
      }
    }, 2800);

    resize();
    window.addEventListener("resize", resize);

    // ── Main render loop ──────────────────────────────────────────────────
    const tick = () => {
      state.t++;
      const { width, height, mouse, particles, orbs, stars, shootingStars, t } = state;

      // Background: deep dark gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0,   "#060818");
      bgGrad.addColorStop(0.5, "#0a0a18");
      bgGrad.addColorStop(1,   "#090612");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Ambient orbs (aurora blobs) ──
      for (const orb of orbs) {
        const drift = Math.sin(t * orb.speed * 1000 + orb.phase) * 0.08;
        const ox = (orb.cx + drift) * width;
        const oy = orb.cy * height;
        const rad = orb.r * Math.min(width, height);
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, rad);
        g.addColorStop(0,   `rgba(${orb.col},0.13)`);
        g.addColorStop(0.45,`rgba(${orb.col},0.05)`);
        g.addColorStop(1,   `rgba(${orb.col},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      // ── Twinkling stars ──
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.a * twinkle})`;
        ctx.fill();
      }

      // ── Shooting stars ──
      for (const ss of shootingStars) {
        if (!ss.active) continue;
        const tx = ss.x + Math.cos(ss.angle) * ss.len;
        const ty = ss.y + Math.sin(ss.angle) * ss.len;
        const g = ctx.createLinearGradient(ss.x, ss.y, tx, ty);
        g.addColorStop(0,   `rgba(${ss.r},${ss.g},${ss.b},0)`);
        g.addColorStop(0.3, `rgba(${ss.r},${ss.g},${ss.b},${ss.alpha * 0.6})`);
        g.addColorStop(1,   `rgba(255,255,255,${ss.alpha})`);
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= ss.fade;
        if (ss.alpha <= 0) ss.active = false;
      }
      // Prune dead ones
      if (shootingStars.length > 10) {
        state.shootingStars = shootingStars.filter(s => s.active);
      }

      // ── Particle network ──
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const f = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.9;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        if (p.y > height) p.y -= height;

        // Glowing dot
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        glow.addColorStop(0,   `rgba(${p.r_},${p.g_},${p.b_},0.9)`);
        glow.addColorStop(0.4, `rgba(${p.r_},${p.g_},${p.b_},0.3)`);
        glow.addColorStop(1,   `rgba(${p.r_},${p.g_},${p.b_},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r_},${p.g_},${p.b_},1)`;
        ctx.fill();
      }

      // ── Connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < MAX_DIST) {
            const alpha = ((1 - d / MAX_DIST) * 0.3).toFixed(3);
            // Blend the two particle colors for the line
            const ri = Math.round(lerp(particles[i].r_, particles[j].r_, 0.5));
            const gi = Math.round(lerp(particles[i].g_, particles[j].g_, 0.5));
            const bi = Math.round(lerp(particles[i].b_, particles[j].b_, 0.5));
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${ri},${gi},${bi},${alpha})`;
            ctx.lineWidth = 0.8;
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

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const p of state.particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) {
          const f = ((120 - d) / 120) * 7;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      // Spawn a shooting star on click
      state.shootingStars.push({ ...spawnShootingStar(), x: cx, y: cy });
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);
    tick();

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      clearInterval(ssInterval);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "220px",
      overflow: "hidden",
      borderBottom: "1px solid rgba(21,204,246,0.12)",
    }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
      {/* Hint label */}
      <div style={{
        position: "absolute",
        bottom: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        textAlign: "center",
        userSelect: "none",
      }}>
        <p style={{
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(21,204,246,0.35)",
          fontFamily: "var(--font-main)",
          margin: 0,
        }}>
          Move cursor · Click to burst
        </p>
      </div>
      {/* Bottom fade into page bg */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
        background: "linear-gradient(to bottom, transparent, var(--bg))",
        pointerEvents: "none",
      }} />
    </div>
  );
}
