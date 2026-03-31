"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type LiveNetworkBackgroundProps = {
  mode: "network" | "globe";
};

export default function LiveNetworkBackground({ mode }: LiveNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const nodeCount = 40;
    const nodes: NodePoint[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 2.5,
    }));
    const globeDots = Array.from({ length: 180 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    });

    const pointer = { x: -1000, y: -1000 };
    let raf = 0;
    let rotation = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const onLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const tick = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      if (mode === "network") {
        for (let i = 0; i < nodes.length; i += 1) {
          const a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;

          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;

          for (let j = i + 1; j < nodes.length; j += 1) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 160) {
              const alpha = 1 - dist / 160;
              ctx.strokeStyle = `rgba(96, 165, 250, ${alpha * 0.33})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }

          const pdx = a.x - pointer.x;
          const pdy = a.y - pointer.y;
          const pDist = Math.hypot(pdx, pdy);
          const glow = pDist < 140 ? 1 - pDist / 140 : 0;

          ctx.fillStyle = `rgba(147, 197, 253, ${0.45 + glow * 0.45})`;
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r + glow * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        const cx = width * 0.5;
        const cy = height * 0.45;
        const radius = Math.min(width, height) * 0.23;
        rotation += 0.006;

        ctx.strokeStyle = "rgba(96, 165, 250, 0.25)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = 0; i < globeDots.length; i += 1) {
          const dot = globeDots[i];
          const x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
          const z = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);
          const y = dot.y;
          const depth = (z + 1) / 2;
          const px = cx + x * radius;
          const py = cy + y * radius;

          if (depth > 0.08) {
            ctx.fillStyle = `rgba(147, 197, 253, ${0.25 + depth * 0.7})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.2 + depth * 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      raf = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[-11] opacity-70" aria-hidden="true" />;
}
