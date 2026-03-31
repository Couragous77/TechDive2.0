"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const shortcuts = [
  { href: "/#resources-section", label: "Open Resources", key: "R" },
  { href: "/#motive-section", label: "Jump to Story", key: "S" },
  { href: "/#about-section", label: "View Purpose", key: "P" },
  { href: "/justin", label: "Open Justin Profile", key: "J" },
  { href: "/courage", label: "Open Courage Profile", key: "C" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const openCombo = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (openCombo) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-950/70 px-4 pt-24 backdrop-blur-sm">
      <div className="w-full max-w-xl cyber-panel p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Command Palette</p>
        <p className="mt-1 text-sm text-slate-300">Quick navigation. Press Esc to close.</p>
        <div className="mt-4 space-y-2">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-md border border-cyan-500/20 px-3 py-2 text-slate-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/10"
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <span className="rounded border border-cyan-500/30 px-2 py-0.5 text-xs text-cyan-300">{item.key}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
