"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 12;

export default function CursorTrail() {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const trailRef = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })));
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId = 0;

    const handleMove = (event: MouseEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
    };

    const animate = () => {
      const trail = trailRef.current;
      trail[0].x += (pointerRef.current.x - trail[0].x) * 0.35;
      trail[0].y += (pointerRef.current.y - trail[0].y) * 0.35;

      for (let i = 1; i < trail.length; i += 1) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
      }

      trail.forEach((point, index) => {
        const dot = dotsRef.current[index];
        if (!dot) return;

        const scale = 1 - index / trail.length;
        dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${Math.max(scale, 0.15)})`;
        dot.style.opacity = `${Math.max(0.08, scale)}`;
      });

      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="cursor-trail-wrap" aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH }).map((_, index) => (
        <span
          key={index}
          ref={(el) => {
            dotsRef.current[index] = el;
          }}
          className="cursor-trail-dot"
        />
      ))}
    </div>
  );
}
