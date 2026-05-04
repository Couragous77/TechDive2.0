"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { FaBolt, FaCode, FaCompass, FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

type Pillar = {
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  title: string;
  desc: string;
  accent: string;
};

const pillars: Pillar[] = [
  {
    icon: FaCode,
    title: "Build",
    desc: "Ship real projects, not just notes.",
    accent: "from-blue-500/30 to-cyan-500/10",
  },
  {
    icon: FaShieldAlt,
    title: "Defend",
    desc: "Hands-on security from day one.",
    accent: "from-emerald-500/30 to-cyan-500/10",
  },
  {
    icon: FaUsers,
    title: "Connect",
    desc: "Learn out loud with peers.",
    accent: "from-purple-500/30 to-blue-500/10",
  },
  {
    icon: FaRocket,
    title: "Launch",
    desc: "Internships and real outcomes.",
    accent: "from-amber-500/30 to-pink-500/10",
  },
];

const rotatingWords = ["Curious", "Capable", "Confident", "Unstoppable"];

function useCountUp(target: number, durationMs: number, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, trigger]);
  return val;
}

export default function PurposePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % rotatingWords.length), 2400);
    return () => clearInterval(id);
  }, []);

  const tracks = useCountUp(2, 1100, visible);
  const free = useCountUp(100, 1800, visible);

  return (
    <div
      ref={ref}
      className="purpose-glow cyber-panel relative overflow-hidden px-6 py-12 md:px-12 md:py-14"
    >
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-blue-300/60"
            style={{
              left: `${(i * 137) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: `floatParticle ${4 + (i % 4)}s ease-in-out ${i * 0.25}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Slow sheen sweep */}
      <div className="purpose-sheen pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
        {/* Left: headline + stats */}
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 ${visible ? "fade-in-up" : "opacity-0"}`}>
            <FaCompass className="text-blue-200" size={12} aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-200">Why TechDive</span>
          </div>

          <h3 className={`mt-5 text-4xl font-black leading-tight text-blue-50 md:text-5xl ${visible ? "fade-in-up delay-100" : "opacity-0"}`}>
            Turn{" "}
            <span
              key={wordIdx}
              className="purpose-word inline-block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
            >
              {rotatingWords[wordIdx]}
            </span>
          </h3>

          <p className={`mt-5 max-w-xl text-lg leading-relaxed text-slate-300 ${visible ? "fade-in-up delay-200" : "opacity-0"}`}>
            A student-built bridge through modern tech.{" "}
            <span className="text-blue-100">Focused pathways, hands-on practice, real career direction.</span>
          </p>

          <div className={`mt-8 grid grid-cols-3 gap-4 ${visible ? "fade-in-up delay-300" : "opacity-0"}`}>
            <Stat value={`${tracks}`} label="Tracks" />
            <Stat value={`${free}%`} label="Free" />
            <Stat value="∞" label="Possibilities" pulse />
          </div>
        </div>

        {/* Right: animated pillars */}
        <div className="grid grid-cols-2 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`pillar-card group relative overflow-hidden rounded-xl border border-blue-500/30 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300/70 ${
                  visible ? "fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.25 + i * 0.1}s` }}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 transition duration-500 group-hover:opacity-100`}
                  aria-hidden
                />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-blue-400/40 bg-blue-500/10 text-blue-200 transition duration-300 group-hover:scale-110 group-hover:border-blue-300 group-hover:bg-blue-500/20 group-hover:text-blue-100 group-hover:shadow-[0_0_22px_rgba(96,165,250,0.55)]">
                    <Icon size={18} aria-hidden />
                  </div>
                  <p className="mt-3 text-lg font-bold text-blue-100">{p.title}</p>
                  <p className="mt-1 text-sm text-slate-300">{p.desc}</p>
                </div>
                <FaBolt
                  className="absolute right-3 top-3 text-blue-300/0 transition duration-300 group-hover:text-blue-300/80"
                  size={12}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, pulse = false }: { value: string; label: string; pulse?: boolean }) {
  return (
    <div>
      <div
        className={`bg-gradient-to-br from-blue-100 to-blue-300 bg-clip-text text-3xl font-black text-transparent md:text-4xl ${
          pulse ? "pulse-icon inline-block" : ""
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </div>
    </div>
  );
}
