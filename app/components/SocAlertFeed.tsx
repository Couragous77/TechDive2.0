"use client";

import Link from "next/link";

const alerts = [
  { id: "a1", severity: "High", text: "Brute-force simulation detected in SIEM lab", href: "/justin" },
  { id: "a2", severity: "Medium", text: "New phishing analysis write-up published", href: "/cybersecurity" },
  { id: "a3", severity: "Low", text: "Resource path updated for coding track", href: "/programming" },
  { id: "a4", severity: "High", text: "Threat detection workflow improved with automation", href: "/justin" },
];

export default function SocAlertFeed() {
  return (
    <section className="cyber-panel overflow-hidden p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">SOC Alert Feed</p>
      <h3 className="text-2xl font-bold text-blue-100">Live Security Ticker</h3>
      <div className="mt-4 overflow-hidden rounded-md border border-blue-500/20 bg-slate-950/70">
        <div className="soc-ticker">
          {[...alerts, ...alerts].map((alert, idx) => (
            <Link
              key={`${alert.id}-${idx}`}
              href={alert.href}
              className="mx-3 inline-flex items-center gap-2 rounded border border-blue-500/25 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 transition hover:border-blue-400/70"
            >
              <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-200">{alert.severity}</span>
              <span>{alert.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
