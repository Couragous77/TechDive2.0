"use client";

import { useState } from "react";

const projects = [
  {
    id: "p1",
    name: "Cloud SOC Honeypot",
    angle: 35,
    ring: 35,
    link: "https://medium.com/@couragetikum/building-a-cloud-soc-honeypot-in-azure-observing-real-cyber-attacks-with-microsoft-sentinel-and-50cdb57bf3ae",
  },
  {
    id: "p2",
    name: "Cloud SOC Honeypot Part 2",
    angle: 125,
    ring: 58,
    link: "https://medium.com/@couragetikum/cloud-soc-honeypot-in-azure-part-2-investigation-and-attack-simulation-c1b953cbda6d",
  },
  {
    id: "p3",
    name: "Vulnerability Analysis Workflow",
    angle: 210,
    ring: 75,
    link: "https://medium.com/@couragetikum/vulnerability-analysis-workflow-hands-on-lab-with-nessus-5172c647a6e8",
  },
  {
    id: "p4",
    name: "Vulnerability Scanning Lab (Nessus)",
    angle: 300,
    ring: 50,
    link: "https://medium.com/@couragetikum/building-a-vulnerability-scanning-lab-with-nessus-kali-and-vmware-14a3caa0573a",
  },
];

export default function ProjectRadar() {
  const [activeId, setActiveId] = useState("p1");
  const active = projects.find((item) => item.id === activeId) ?? projects[0];

  return (
    <section className="cyber-panel p-5 md:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Project Radar</p>
        <h3 className="text-2xl font-bold text-blue-100">Interactive Map</h3>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative mx-auto h-72 w-72 rounded-full border border-blue-500/30 bg-slate-950/70">
          <div className="absolute inset-[14%] rounded-full border border-blue-500/30" />
          <div className="absolute inset-[30%] rounded-full border border-blue-500/30" />
          <div className="absolute inset-[45%] rounded-full border border-blue-500/30" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-blue-500/20" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-blue-500/20" />

          {projects.map((project) => {
            const rad = (project.angle * Math.PI) / 180;
            const x = 50 + Math.cos(rad) * (project.ring * 0.48);
            const y = 50 + Math.sin(rad) * (project.ring * 0.48);
            const activeDot = activeId === project.id;
            return (
              <button
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                onClick={() => setActiveId(project.id)}
                className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                  activeDot ? "bg-blue-300 shadow-[0_0_18px_rgba(147,197,253,0.9)]" : "bg-blue-500/70"
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
                aria-label={project.name}
              />
            );
          })}
        </div>

        <div className="rounded-md border border-blue-500/20 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Locked Target</p>
          <p className="mt-2 text-xl font-bold text-blue-100">{active.name}</p>
          <p className="mt-3 text-sm text-slate-300">Hover or click blips to inspect active projects and jump in.</p>
          <a
            href={active.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded border border-blue-400/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-200 transition hover:bg-blue-500/10"
          >
            Open Project
          </a>
        </div>
      </div>
    </section>
  );
}
