"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import CursorTrail from "./components/CursorTrail";
import CommandPalette from "./components/CommandPalette";
import LiveNetworkBackground from "./components/LiveNetworkBackground";

const inter = Inter({ subsets: ["latin"] });
const navItems = [
  { href: "/", label: "Home" },
  { href: "/#motive-section", label: "Story" },
  { href: "/#resources-section", label: "Resources" },
  { href: "/#about-section", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<"network" | "globe">("network");

  return (
    <html lang="en">
      <body className={`${inter.className} cyber-bg text-slate-100`}>
        <div className="pointer-events-none fixed inset-0 z-[-12] cyber-aurora" />
        <LiveNetworkBackground mode={backgroundMode} />
        <div className="pointer-events-none fixed inset-0 z-[-10] cyber-grid opacity-60" />
        <div className="pointer-events-none fixed inset-0 z-[-9] cyber-scanlines" />
        <CursorTrail />
        <CommandPalette />

        <div className="border-b border-blue-500/20 bg-slate-950/60 px-4 py-1 text-center text-[11px] uppercase tracking-[0.16em] text-blue-300">
          Uptime: 99.99% | Mode: Learning + Building | Background: {backgroundMode} | Press Ctrl+K for quick commands
        </div>

        <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/images/TechTrek.jpeg"
                width={48}
                height={48}
                alt="Tech Trek Logo"
                className="rounded-md border border-blue-300/40 transition group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              />
              <span className="text-2xl font-black tracking-wide text-blue-100 md:text-3xl">TechTrek</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-200/90 transition hover:text-blue-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex">
              <button
                onClick={() => setBackgroundMode((prev) => (prev === "network" ? "globe" : "network"))}
                className="rounded-md border border-blue-400/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200 transition hover:border-blue-300 hover:text-blue-100"
              >
                {backgroundMode === "network" ? "Globe Mode" : "Network Mode"}
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center rounded-md border border-blue-400/40 px-3 py-2 text-sm font-semibold text-blue-200 md:hidden"
              aria-label="Toggle navigation"
            >
              Menu
            </button>
          </div>

          {isMenuOpen && (
            <nav className="border-t border-blue-500/20 bg-slate-950/95 px-4 py-4 md:hidden">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded border border-transparent px-2 py-1 text-sm font-semibold uppercase tracking-[0.12em] text-slate-100 transition hover:border-blue-500/40 hover:text-blue-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </header>

        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
