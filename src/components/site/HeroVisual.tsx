import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { GraduationCap, Users, BookOpen, Bus, Building2, HeartHandshake, Briefcase, Landmark } from "lucide-react";

type Node = {
  x: number; y: number; z: number;
  baseX: number; baseY: number; baseZ: number;
  phase: number; speed: number;
  role?: { icon: any; label: string; tint: string };
};

const ROLES = [
  { icon: GraduationCap, label: "Student",   tint: "#3387d7" },
  { icon: Users,         label: "Parent",    tint: "#e5813e" },
  { icon: BookOpen,      label: "Teacher",   tint: "#0c539d" },
  { icon: Bus,           label: "Transport", tint: "#00b16a" },
  { icon: Building2,     label: "Director",  tint: "#3387d7" },
  { icon: HeartHandshake,label: "Counselor", tint: "#eba364" },
  { icon: Briefcase,     label: "Finance",   tint: "#0c539d" },
  { icon: Landmark,      label: "Bureau",    tint: "#e5813e" },
];

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Build sphere of nodes
    const nodes: Node[] = [];
    const N = 64;
    const R = () => Math.min(W, H) * 0.36;
    for (let i = 0; i < N; i++) {
      // Fibonacci sphere
      const k = i + 0.5;
      const phi = Math.acos(1 - 2 * k / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      nodes.push({
        x, y, z, baseX: x, baseY: y, baseZ: z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
      });
    }
    // Attach roles to 8 spread-out nodes
    const roleIdx = Array.from({ length: 8 }, (_, i) => Math.floor((i + 0.5) * N / 8));
    roleIdx.forEach((idx, i) => { nodes[idx].role = ROLES[i]; });

    let t = 0;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / r.width;
      mouse.current.y = (e.clientY - r.top) / r.height;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const radius = R();

      // Target rotation follows pointer (or auto)
      const tx = mouse.current.active ? (mouse.current.y - 0.5) * 0.8 : Math.sin(t * 0.5) * 0.25;
      const ty = mouse.current.active ? (mouse.current.x - 0.5) * 1.2 : t * 0.4;
      const cosX = Math.cos(tx), sinX = Math.sin(tx);
      const cosY = Math.cos(ty), sinY = Math.sin(ty);

      // Project nodes
      const proj = nodes.map((n) => {
        // Wave deformation
        const wave = 1 + Math.sin(t * 1.6 + n.phase) * 0.045;
        let x = n.baseX * wave, y = n.baseY * wave, z = n.baseZ * wave;
        // Rotate Y
        let X = x * cosY + z * sinY;
        let Z = -x * sinY + z * cosY;
        // Rotate X
        let Y = y * cosX - Z * sinX;
        Z = y * sinX + Z * cosX;
        const scale = 1 / (1.8 - Z); // perspective
        return {
          n,
          sx: cx + X * radius * scale,
          sy: cy + Y * radius * scale,
          z: Z,
          scale,
        };
      });

      // Glow halo
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.6);
      grad.addColorStop(0, "rgba(51,135,215,0.22)");
      grad.addColorStop(0.5, "rgba(229,129,62,0.10)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2); ctx.fill();

      // Connections — only near neighbors, flowing dashed
      const THRESH = radius * 0.55;
      ctx.lineWidth = 1;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i], b = proj[j];
          const dx = a.sx - b.sx, dy = a.sy - b.sy;
          const d = Math.hypot(dx, dy);
          if (d > THRESH) continue;
          const alpha = (1 - d / THRESH) * 0.45 * ((a.z + b.z) / 2 + 1) * 0.5;
          if (alpha < 0.02) continue;
          ctx.strokeStyle = `rgba(12,83,157,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();

          // Flowing packet
          const speed = 0.35;
          const p = ((t * speed + (i * 13 + j * 7) * 0.01) % 1);
          const px = a.sx + (b.sx - a.sx) * p;
          const py = a.sy + (b.sy - a.sy) * p;
          ctx.fillStyle = `rgba(229,129,62,${(alpha * 1.6).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nodes
      const sorted = [...proj].sort((a, b) => a.z - b.z);
      for (const p of sorted) {
        const depth = (p.z + 1) / 2; // 0..1
        const r = (p.n.role ? 4.5 : 2.2) * (0.6 + depth * 0.9);
        // soft glow
        const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 4);
        const color = p.n.role?.tint ?? "#3387d7";
        g.addColorStop(0, hexA(color, 0.55 * depth + 0.2));
        g.addColorStop(1, hexA(color, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, r * 4, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2); ctx.fill();

        if (p.n.role) {
          ctx.strokeStyle = "rgba(255,255,255,0.9)";
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(p.sx, p.sy, r + 2.5, 0, Math.PI * 2); ctx.stroke();
        }
      }

      // Update DOM role badges
      if (containerRef.current) {
        const badges = containerRef.current.querySelectorAll<HTMLElement>("[data-role-badge]");
        const roleProjections = proj.filter((p) => p.n.role);
        roleProjections.forEach((p, i) => {
          const el = badges[i];
          if (!el) return;
          el.style.transform = `translate(${p.sx}px, ${p.sy}px) translate(-50%, -50%) scale(${(0.7 + (p.z + 1) / 2 * 0.55).toFixed(2)})`;
          el.style.opacity = String(0.35 + ((p.z + 1) / 2) * 0.65);
          el.style.zIndex = String(Math.round(p.z * 100) + 100);
        });
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-square w-full">
      {/* Ambient backdrop */}
      <div className="absolute -inset-8 bg-gradient-to-br from-blue-200/40 via-transparent to-orange-200/40 blur-3xl rounded-full pointer-events-none" />

      {/* Concentric rings (depth cues) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#3387d7" stopOpacity="0.35" />
            <stop offset="1" stopColor="#e5813e" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke="url(#ringGrad)" strokeWidth="0.15" strokeDasharray="0.6 0.8" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ringGrad)" strokeWidth="0.15" strokeDasharray="0.4 1.2" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="url(#ringGrad)" strokeWidth="0.15" strokeDasharray="0.3 0.9" />
      </svg>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Role badges positioned by canvas loop */}
      {ROLES.map((r, i) => {
        const Icon = r.icon;
        return (
          <div
            key={i}
            data-role-badge
            className="absolute left-0 top-0 will-change-transform pointer-events-none"
            style={{ transform: "translate(-9999px,-9999px)" }}
          >
            <div className="glass rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1.5 shadow-card border border-border/60">
              <span
                className="h-5 w-5 rounded-full flex items-center justify-center text-white"
                style={{ background: r.tint }}
              >
                <Icon className="h-3 w-3" />
              </span>
              <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">{r.label}</span>
            </div>
          </div>
        );
      })}

      {/* Center core */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="relative h-16 w-16 rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-primary blur-xl opacity-60" />
          <span className="relative text-white font-bold text-xs tracking-widest">eSL</span>
        </div>
        <div className="absolute inset-0 rounded-2xl border border-white/40 animate-pulse-ring" />
      </motion.div>
    </div>
  );
}

function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
