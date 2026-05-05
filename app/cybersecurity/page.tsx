"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCloud,
  FaExternalLinkAlt,
  FaPlay,
  FaRedo,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa";

type TrackId = "soc" | "detection" | "cloud" | "threat";
type AccentKey = "cyan" | "violet" | "emerald" | "amber";

type Track = {
  id: TrackId;
  title: string;
  subtitle: string;
  icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  accent: AccentKey;
  signal: string;
  desc: string;
  skills: string[];
  salary: string;
  roles: string[];
  video: {
    title: string;
    duration: string;
    takeaway: string;
    chapters: string[];
  };
  phases: { title: string; focus: string; items: string[] }[];
};

const accents: Record<AccentKey, {
  iconText: string;
  iconBg: string;
  iconBorder: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  topBar: string;
  subtitle: string;
}> = {
  cyan: {
    iconText: "text-cyan-200",
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-400/40",
    chipBg: "bg-cyan-500/5",
    chipBorder: "border-cyan-400/30",
    chipText: "text-cyan-100",
    topBar: "via-cyan-400/70",
    subtitle: "text-cyan-300",
  },
  violet: {
    iconText: "text-violet-200",
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-400/40",
    chipBg: "bg-violet-500/5",
    chipBorder: "border-violet-400/30",
    chipText: "text-violet-100",
    topBar: "via-violet-400/70",
    subtitle: "text-violet-300",
  },
  emerald: {
    iconText: "text-emerald-200",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-400/40",
    chipBg: "bg-emerald-500/5",
    chipBorder: "border-emerald-400/30",
    chipText: "text-emerald-100",
    topBar: "via-emerald-400/70",
    subtitle: "text-emerald-300",
  },
  amber: {
    iconText: "text-amber-200",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-400/40",
    chipBg: "bg-amber-500/5",
    chipBorder: "border-amber-400/30",
    chipText: "text-amber-100",
    topBar: "via-amber-400/70",
    subtitle: "text-amber-300",
  },
};

const STORAGE_KEY = "techtrek-cyber-state";

type AssessmentOption = {
  text: string;
  tracks: Partial<Record<TrackId, number>>;
};

type AssessmentQuestion = {
  question: string;
  options: AssessmentOption[];
};

type View = "home" | "assessment" | "results" | "roadmap";

const tracks: Track[] = [
  {
    id: "soc",
    title: "SOC Analyst",
    subtitle: "Detection and Response",
    icon: FaShieldAlt,
    accent: "cyan",
    signal: "Live alert triage",
    desc: "Monitor, detect, and respond to security threats in real time. A strong fit for investigative minds who like live alerts, timelines, and clear action.",
    skills: ["Log Analysis", "SIEM Tools", "Alert Triage", "Incident Response", "Threat Intel"],
    salary: "$55K - $85K",
    roles: ["SOC Analyst I/II", "Detection Analyst", "Security Ops Intern"],
    video: {
      title: "SOC Analyst overview",
      duration: "08:42",
      takeaway: "Alert triage, workflows, and daily SOC work.",
      chapters: ["SOC workflow", "Alert triage"],
    },
    phases: [
      { title: "Foundations", focus: "Build the mental model", items: ["Security fundamentals", "Networking basics", "OS concepts", "CIA triad deep dive"] },
      { title: "Core Skills", focus: "Learn the toolkit", items: ["SIEM platforms", "Log analysis and parsing", "Alert triage workflows", "IOC identification"] },
      { title: "Applied Labs", focus: "Investigate real scenarios", items: ["Live alert investigations", "Phishing analysis", "Malware triage", "Incident documentation"] },
      { title: "Portfolio Build", focus: "Prove the work", items: ["Investigation writeups", "Detection rule creation", "Incident report samples", "GitHub project docs"] },
      { title: "Career Launch", focus: "Land the first role", items: ["Resume and LinkedIn polish", "Mock interviews", "Elevator pitch", "Networking strategy"] },
    ],
  },
  {
    id: "detection",
    title: "Detection Engineering",
    subtitle: "Build the Defenses",
    icon: FaBolt,
    accent: "violet",
    signal: "Rule coverage",
    desc: "Design detection logic and systems that catch attacker behavior before it becomes a major incident. Ideal for analytical builders.",
    skills: ["SIGMA Rules", "KQL/SPL", "MITRE ATT&CK", "Data Engineering", "Automation"],
    salary: "$75K - $120K",
    roles: ["Detection Engineer", "Security Engineer", "Threat Detection Intern"],
    video: {
      title: "Detection Engineering overview",
      duration: "10:15",
      takeaway: "Rules, tuning, and detection design.",
      chapters: ["Rule writing", "False positives"],
    },
    phases: [
      { title: "Foundations", focus: "Understand the adversary", items: ["Threat landscape overview", "Attack frameworks", "Log source taxonomy", "Detection theory"] },
      { title: "Core Skills", focus: "Author detections", items: ["SIGMA rule authoring", "KQL and SPL queries", "Data pipeline basics", "False positive tuning"] },
      { title: "Applied Labs", focus: "Validate coverage", items: ["Build detection rules", "Emulate attack scenarios", "Tune and validate alerts", "Automation scripting"] },
      { title: "Portfolio Build", focus: "Ship a rule library", items: ["Detection rule library", "Coverage gap analysis", "Threat emulation reports", "Open-source contributions"] },
      { title: "Career Launch", focus: "Sell the portfolio", items: ["Technical interview prep", "Portfolio presentation", "Industry networking", "Job search strategy"] },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Security",
    subtitle: "Secure the Cloud",
    icon: FaCloud,
    accent: "emerald",
    signal: "Identity hardening",
    desc: "Protect cloud infrastructure and services. Great for learners who like architecture, automation, identity, and modern tech stacks.",
    skills: ["AWS/Azure/GCP", "IAM", "Cloud Misconfigs", "Terraform", "Container Security"],
    salary: "$80K - $130K",
    roles: ["Cloud Security Analyst", "Cloud Security Engineer", "DevSecOps Intern"],
    video: {
      title: "Cloud Security overview",
      duration: "09:06",
      takeaway: "IAM, guardrails, and cloud misconfigurations.",
      chapters: ["IAM basics", "Misconfigurations"],
    },
    phases: [
      { title: "Foundations", focus: "Map the cloud", items: ["Cloud computing basics", "Shared responsibility model", "Identity and access management", "Cloud networking"] },
      { title: "Core Skills", focus: "Harden the stack", items: ["AWS and Azure security services", "IAM policy design", "Cloud misconfig detection", "Infrastructure as Code"] },
      { title: "Applied Labs", focus: "Run live environments", items: ["Secure a cloud environment", "Audit IAM permissions", "Deploy security controls", "Incident response in cloud"] },
      { title: "Portfolio Build", focus: "Show the artifacts", items: ["Cloud security assessment", "Architecture diagrams", "Remediation playbooks", "Terraform security modules"] },
      { title: "Career Launch", focus: "Certify and interview", items: ["Cloud cert prep guidance", "Portfolio showcase", "Mock interviews", "Employer outreach"] },
    ],
  },
  {
    id: "threat",
    title: "Threat Hunting",
    subtitle: "Hunt the Unknown",
    icon: FaSearch,
    accent: "amber",
    signal: "Adversary traces",
    desc: "Proactively search for hidden threats that evade automated detection. Built for curious analysts who like deep investigation.",
    skills: ["Hypothesis-Driven Hunting", "Forensics", "Behavioral Analysis", "Threat Intel", "EDR Tools"],
    salary: "$85K - $130K",
    roles: ["Threat Hunter", "IR Analyst", "Adversary Emulation Intern"],
    video: {
      title: "Threat Hunting overview",
      duration: "11:03",
      takeaway: "Hunt strategy, evidence, and hidden activity.",
      chapters: ["Hunt process", "Telemetry clues"],
    },
    phases: [
      { title: "Foundations", focus: "Learn how attackers move", items: ["Threat intelligence basics", "Kill chain and diamond model", "Endpoint forensics intro", "Behavioral indicators"] },
      { title: "Core Skills", focus: "Master the tools", items: ["Hypothesis formation", "EDR tool proficiency", "Memory and disk forensics", "Network traffic analysis"] },
      { title: "Applied Labs", focus: "Run real hunts", items: ["Hunt exercises on datasets", "Adversary emulation", "Forensic artifact analysis", "Threat hunt reporting"] },
      { title: "Portfolio Build", focus: "Publish the evidence", items: ["Hunt case studies", "Threat intel reports", "Tool comparison writeups", "Adversary profile research"] },
      { title: "Career Launch", focus: "Join the community", items: ["Advanced interview prep", "Conference participation", "Community engagement", "Mentorship connections"] },
    ],
  },
];

const questions: AssessmentQuestion[] = [
  {
    question: "When a system breaks, your first instinct is to...",
    options: [
      { text: "Rebuild the event timeline from logs", tracks: { soc: 3, threat: 2 } },
      { text: "Design a control so it does not repeat", tracks: { detection: 3, cloud: 1 } },
      { text: "Study the architecture and tighten weak access paths", tracks: { cloud: 3, detection: 1 } },
      { text: "Look for traces everyone else missed", tracks: { threat: 3, soc: 1 } },
    ],
  },
  {
    question: "Which environment feels most natural?",
    options: [
      { text: "A live operations floor with alerts moving fast", tracks: { soc: 3, threat: 1 } },
      { text: "A lab where detection logic is built and tested", tracks: { detection: 3 } },
      { text: "A cloud console managing infrastructure at scale", tracks: { cloud: 3 } },
      { text: "A quiet data set full of anomalies", tracks: { threat: 3, detection: 1 } },
    ],
  },
  {
    question: "Which skill sounds most valuable to build?",
    options: [
      { text: "Reading security logs with speed and accuracy", tracks: { soc: 3, detection: 1 } },
      { text: "Writing durable rules and queries", tracks: { detection: 3, soc: 1 } },
      { text: "Hardening identity, cloud policy, and network paths", tracks: { cloud: 3 } },
      { text: "Performing forensic analysis after compromise", tracks: { threat: 3 } },
    ],
  },
  {
    question: "How do you prefer to prove you learned something?",
    options: [
      { text: "Hands-on simulations with real investigation notes", tracks: { soc: 2, threat: 2 } },
      { text: "A working tool, rule set, or automated workflow", tracks: { detection: 2, cloud: 2 } },
      { text: "A deep research brief with evidence", tracks: { threat: 3, detection: 1 } },
      { text: "A structured lab with clear hardening outcomes", tracks: { soc: 2, cloud: 2 } },
    ],
  },
  {
    question: "What part of cybersecurity feels most motivating?",
    options: [
      { text: "Protecting people during active incidents", tracks: { soc: 3, threat: 1 } },
      { text: "Outsmarting attackers with better detection", tracks: { detection: 3, threat: 1 } },
      { text: "Securing modern infrastructure at massive scale", tracks: { cloud: 3 } },
      { text: "Understanding how adversaries think and move", tracks: { threat: 3, soc: 1 } },
    ],
  },
  {
    question: "Pick the portfolio project you would actually finish:",
    options: [
      { text: "Triage 50 alerts and document real incidents", tracks: { soc: 3 } },
      { text: "Write SIGMA rules to detect a new technique", tracks: { detection: 3 } },
      { text: "Audit and harden an AWS environment", tracks: { cloud: 3 } },
      { text: "Hunt through endpoint data to find a hidden implant", tracks: { threat: 3 } },
    ],
  },
  {
    question: "Which title would make you proudest?",
    options: [
      { text: "Security Operations Analyst", tracks: { soc: 3 } },
      { text: "Detection Engineer", tracks: { detection: 3 } },
      { text: "Cloud Security Engineer", tracks: { cloud: 3 } },
      { text: "Threat Hunter", tracks: { threat: 3 } },
    ],
  },
];

const emptyScores: Record<TrackId, number> = {
  soc: 0,
  detection: 0,
  cloud: 0,
  threat: 0,
};

const maxPossibleScore = questions.reduce((total, question) => {
  const questionMax = Math.max(
    ...question.options.map((option) => Math.max(0, ...Object.values(option.tracks)))
  );
  return total + questionMax;
}, 0);

const stages: { key: View; label: string }[] = [
  { key: "home", label: "Overview" },
  { key: "assessment", label: "Assessment" },
  { key: "results", label: "Match" },
  { key: "roadmap", label: "Roadmap" },
];

type SkillResource = { label: string; href: string };
type FoundationalSkill = {
  name: string;
  blurb: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  accent: AccentKey;
  resources: SkillResource[];
};

const foundations: FoundationalSkill[] = [
  {
    name: "Networking",
    blurb: "The plumbing — IP, ports, packets, and protocols.",
    icon: FaCloud,
    accent: "cyan",
    resources: [
      { label: "Professor Messer", href: "https://www.professormesser.com/network-plus/" },
      { label: "Practical Networking", href: "https://www.practicalnetworking.net" },
      { label: "THM Network Fundamentals", href: "https://tryhackme.com/module/network-fundamentals" },
    ],
  },
  {
    name: "Linux",
    blurb: "Command line, files, permissions, and processes.",
    icon: FaBolt,
    accent: "emerald",
    resources: [
      { label: "Linux Journey", href: "https://linuxjourney.com" },
      { label: "OverTheWire Bandit", href: "https://overthewire.org/wargames/bandit/" },
      { label: "THM Linux Fundamentals", href: "https://tryhackme.com/module/linux-fundamentals" },
    ],
  },
  {
    name: "Python & Scripting",
    blurb: "Automate, parse, and build your own security tools.",
    icon: FaBolt,
    accent: "amber",
    resources: [
      { label: "Automate the Boring Stuff", href: "https://automatetheboringstuff.com" },
      { label: "Real Python", href: "https://realpython.com" },
      { label: "PicoCTF", href: "https://picoctf.org" },
    ],
  },
  {
    name: "Web Fundamentals",
    blurb: "HTTP, cookies, sessions — how browsers talk to servers.",
    icon: FaSearch,
    accent: "violet",
    resources: [
      { label: "MDN Web Docs", href: "https://developer.mozilla.org/en-US/docs/Learn" },
      { label: "PortSwigger Academy", href: "https://portswigger.net/web-security" },
      { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
    ],
  },
  {
    name: "Cryptography",
    blurb: "Hashes, symmetric and asymmetric crypto, and PKI.",
    icon: FaShieldAlt,
    accent: "violet",
    resources: [
      { label: "Khan Academy Crypto", href: "https://www.khanacademy.org/computing/computer-science/cryptography" },
      { label: "Cryptopals", href: "https://cryptopals.com" },
      { label: "PicoCTF Crypto", href: "https://picoctf.org" },
    ],
  },
  {
    name: "Security Concepts",
    blurb: "CIA triad, defense-in-depth, and the language of risk.",
    icon: FaShieldAlt,
    accent: "cyan",
    resources: [
      { label: "NIST Glossary", href: "https://csrc.nist.gov/glossary" },
      { label: "SANS Reading Room", href: "https://www.sans.org/white-papers/" },
      { label: "OWASP Cheat Sheets", href: "https://cheatsheetseries.owasp.org" },
    ],
  },
  {
    name: "Threats & Attacks",
    blurb: "Know the playbook adversaries actually use.",
    icon: FaSearch,
    accent: "amber",
    resources: [
      { label: "MITRE ATT&CK", href: "https://attack.mitre.org" },
      { label: "Krebs on Security", href: "https://krebsonsecurity.com" },
      { label: "The Hacker News", href: "https://thehackernews.com" },
    ],
  },
  {
    name: "Hands-On Labs",
    blurb: "Real practice — break things, defend things, repeat.",
    icon: FaBolt,
    accent: "emerald",
    resources: [
      { label: "TryHackMe", href: "https://tryhackme.com" },
      { label: "Hack The Box", href: "https://www.hackthebox.com" },
      { label: "LetsDefend", href: "https://letsdefend.io" },
    ],
  },
];

const foundationSplitIndex = Math.ceil(foundations.length / 2);
const leftFoundations = foundations.slice(0, foundationSplitIndex);
const rightFoundations = foundations.slice(foundationSplitIndex);
const rightFoundationNames = new Set(rightFoundations.map((foundation) => foundation.name));

const foundationToTracks: Record<string, TrackId[]> = {
  "Networking": ["soc", "cloud"],
  "Linux": ["soc", "cloud"],
  "Python & Scripting": ["detection", "threat"],
  "Web Fundamentals": ["soc", "detection"],
  "Cryptography": ["cloud", "detection"],
  "Security Concepts": ["soc", "threat"],
  "Threats & Attacks": ["detection", "threat"],
  "Hands-On Labs": ["soc", "detection", "cloud", "threat"],
};

const accentHex: Record<AccentKey, string> = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  emerald: "#34d399",
  amber: "#fbbf24",
};

export default function CybersecurityPage() {
  const [view, setView] = useState<View>("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentOption[]>([]);
  const [scores, setScores] = useState<Record<TrackId, number>>(emptyScores);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const saved = JSON.parse(raw) as {
        scores?: Record<TrackId, number>;
        selectedTrackId?: TrackId | null;
        activePhase?: number;
      };
      if (saved.scores) setScores(saved.scores);
      const savedTrack = saved.selectedTrackId
        ? tracks.find((t) => t.id === saved.selectedTrackId) ?? null
        : null;
      if (savedTrack) {
        setSelectedTrack(savedTrack);
        setActivePhase(saved.activePhase ?? 0);
        setView("roadmap");
      } else if (saved.scores && Object.values(saved.scores).some((v) => v > 0)) {
        setView("results");
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          scores,
          selectedTrackId: selectedTrack?.id ?? null,
          activePhase,
        })
      );
    } catch {
      // ignore quota errors
    }
  }, [hydrated, scores, selectedTrack, activePhase]);

  const rankedTracks = useMemo(() => {
    return tracks
      .map((track) => ({ ...track, score: scores[track.id] }))
      .sort((a, b) => b.score - a.score);
  }, [scores]);

  const hasScores = Object.values(scores).some((v) => v > 0);

  const transition = (next: () => void) => {
    setIsVisible(false);
    window.setTimeout(() => {
      next();
      setIsVisible(true);
    }, 220);
  };

  const startAssessment = () => {
    transition(() => {
      setView("assessment");
      setCurrentQuestion(0);
      setAnswers([]);
      setScores(emptyScores);
      setSelectedTrack(null);
      setActivePhase(0);
    });
  };

  const openRoadmap = (track?: Track) => {
    transition(() => {
      setView("roadmap");
      setSelectedTrack(track ?? null);
      setActivePhase(0);
    });
  };

  const resetAll = () => {
    transition(() => {
      setView("home");
      setCurrentQuestion(0);
      setAnswers([]);
      setScores(emptyScores);
      setSelectedTrack(null);
      setActivePhase(0);
    });
  };

  const previousQuestion = () => {
    if (currentQuestion === 0) return;
    transition(() => {
      setAnswers((a) => a.slice(0, -1));
      setCurrentQuestion((c) => c - 1);
    });
  };

  const startOver = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    resetAll();
  };

  const backFromRoadmap = () => {
    if (hasScores) {
      transition(() => {
        setView("results");
        setSelectedTrack(null);
        setActivePhase(0);
      });
    } else {
      resetAll();
    }
  };

  const answerQuestion = (option: AssessmentOption) => {
    const nextAnswers = [...answers, option];

    if (currentQuestion < questions.length - 1) {
      setAnswers(nextAnswers);
      transition(() => setCurrentQuestion((c) => c + 1));
      return;
    }

    const nextScores = { ...emptyScores };
    for (const answer of nextAnswers) {
      for (const [trackId, value] of Object.entries(answer.tracks) as [TrackId, number][]) {
        nextScores[trackId] += value;
      }
    }
    setAnswers(nextAnswers);
    setScores(nextScores);
    transition(() => setView("results"));
  };

  const question = questions[currentQuestion];
  const progressPct = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="cyber-bg relative min-h-screen overflow-hidden">
      <div className="cyber-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="cyber-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <StageNav view={view} onJump={(target) => {
          if (target === "home") resetAll();
          else if (target === "assessment") startAssessment();
          else if (target === "roadmap") openRoadmap();
        }} />

        <div
          className={`mt-8 transition-all duration-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {view === "home" && (
            <HomeView onStartAssessment={startAssessment} onOpenRoadmap={openRoadmap} />
          )}

          {view === "assessment" && (
            <AssessmentView
              question={question}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
              progressPct={progressPct}
              onAnswer={answerQuestion}
              onPrevious={currentQuestion > 0 ? previousQuestion : null}
              onBack={resetAll}
            />
          )}

          {view === "results" && (
            <ResultsView
              ranked={rankedTracks}
              maxPossibleScore={maxPossibleScore}
              onRetake={startAssessment}
              onOpenRoadmap={openRoadmap}
              onStartOver={startOver}
              onBack={resetAll}
            />
          )}

          {view === "roadmap" && (
            <RoadmapView
              selectedTrack={selectedTrack}
              activePhase={activePhase}
              setActivePhase={setActivePhase}
              setSelectedTrack={setSelectedTrack}
              onStartOver={startOver}
              onBack={backFromRoadmap}
              backLabel={hasScores ? "Back to results" : "Back to home"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function StageNav({ view, onJump }: { view: View; onJump: (target: View) => void }) {
  const activeIndex = stages.findIndex((s) => s.key === view);

  return (
    <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
      {stages.map((stage, index) => {
        const isActive = stage.key === view;
        const isCompleted = index < activeIndex;
        const clickable = stage.key === "home" || stage.key === "assessment" || stage.key === "roadmap";

        return (
          <div key={stage.key} className="flex items-center gap-2">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onJump(stage.key)}
              className={`rounded-full border px-4 py-1.5 transition ${
                isActive
                  ? "border-blue-400/70 bg-blue-500/15 text-blue-100 shadow-[0_0_24px_rgba(59,130,246,0.25)]"
                  : isCompleted
                  ? "border-blue-400/40 bg-blue-500/5 text-blue-300 hover:border-blue-300/70"
                  : "border-slate-700/70 bg-slate-900/40 text-slate-400"
              } ${!clickable ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="mr-2 text-[10px] text-blue-300/80">0{index + 1}</span>
              {stage.label}
            </button>
            {index < stages.length - 1 && (
              <span className="h-px w-6 bg-gradient-to-r from-blue-400/50 to-transparent" aria-hidden />
            )}
          </div>
        );
      })}
    </nav>
  );
}

function HomeView({
  onStartAssessment,
  onOpenRoadmap,
}: {
  onStartAssessment: () => void;
  onOpenRoadmap: (track?: Track) => void;
}) {
  return (
    <div className="space-y-10">
      <section className="cyber-panel px-6 py-12 text-center md:px-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
          Cybersecurity Career Tracks
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight text-blue-50 md:text-6xl">
          Find your lane.
          <span className="block text-blue-300">Build the proof.</span>
        </h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={onStartAssessment} className="cyber-button inline-flex items-center gap-2">
            Start assessment <FaArrowRight aria-hidden />
          </button>
        </div>
      </section>

      <section>
        <SectionHeading
          kicker="Choose a specialization"
          title="Four tracks."
          right={
            <button type="button" onClick={onStartAssessment} className="cyber-button-secondary">
              Find my fit
            </button>
          }
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} onOpen={() => onOpenRoadmap(track)} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          kicker="Curated Library"
          title="Fundamentals & foundational skills"
        />
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          The core concepts every cybersecurity path is built on — hover a skill to see which tracks it feeds.
        </p>
        <FoundationsMap />
      </section>
    </div>
  );
}

type Hover = { kind: "f"; name: string } | { kind: "t"; id: TrackId } | null;

function FoundationsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fRefs = useRef<Record<string, HTMLElement | null>>({});
  const tRefs = useRef<Record<string, HTMLElement | null>>({});
  const [hover, setHover] = useState<Hover>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [paths, setPaths] = useState<
    Array<{ key: string; d: string; foundation: string; track: TrackId; color: string }>
  >([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const recompute = () => {
    const c = containerRef.current;
    if (!c) return;
    const cr = c.getBoundingClientRect();
    setSize({ w: cr.width, h: cr.height });
    const next: typeof paths = [];
    for (const f of foundations) {
      const fEl = fRefs.current[f.name];
      if (!fEl) continue;
      const fr = fEl.getBoundingClientRect();
      const foundationSide = rightFoundationNames.has(f.name) ? "right" : "left";
      const fX =
        foundationSide === "right" ? fr.left - cr.left : fr.right - cr.left;
      const fY = fr.top + fr.height / 2 - cr.top;
      const tracksOut = foundationToTracks[f.name] || [];
      for (const tId of tracksOut) {
        const tEl = tRefs.current[tId];
        if (!tEl) continue;
        const tr = tEl.getBoundingClientRect();
        const tX =
          foundationSide === "right" ? tr.right - cr.left : tr.left - cr.left;
        const tY = tr.top + tr.height / 2 - cr.top;
        const direction = foundationSide === "right" ? -1 : 1;
        const distance = Math.abs(tX - fX);
        const cp1x = fX + direction * distance * 0.55;
        const cp2x = tX - direction * distance * 0.45;
        const t = tracks.find((tr) => tr.id === tId);
        const color = t ? accentHex[t.accent] : "#94a3b8";
        next.push({
          key: `${f.name}->${tId}`,
          d: `M ${fX.toFixed(1)} ${fY.toFixed(1)} C ${cp1x.toFixed(1)} ${fY.toFixed(1)}, ${cp2x.toFixed(1)} ${tY.toFixed(1)}, ${tX.toFixed(1)} ${tY.toFixed(1)}`,
          foundation: f.name,
          track: tId,
          color,
        });
      }
    }
    setPaths(next);
  };

  useLayoutEffect(() => {
    recompute();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPathActive = (p: (typeof paths)[number]) => {
    if (!hover) return false;
    if (hover.kind === "f") return p.foundation === hover.name;
    return p.track === hover.id;
  };

  const isFoundationLit = (name: string) => {
    if (!hover) return false;
    if (hover.kind === "f") return hover.name === name;
    return (foundationToTracks[name] || []).includes(hover.id);
  };

  const isTrackLit = (id: TrackId) => {
    if (!hover) return false;
    if (hover.kind === "t") return hover.id === id;
    return (foundationToTracks[hover.name] || []).includes(id);
  };

  const renderFoundationColumn = (
    items: FoundationalSkill[],
    side: "left" | "right"
  ) => (
    <div className="flex flex-col justify-center gap-3">
      {items.map((f) => {
        const Icon = f.icon;
        const a = accents[f.accent];
        const lit = isFoundationLit(f.name);
        const dimmed = hover !== null && !lit;
        const isExpanded = expanded === f.name;
        return (
          <div key={f.name} className="flex flex-col gap-2">
            <button
              ref={(el) => {
                fRefs.current[f.name] = el;
              }}
              type="button"
              onMouseEnter={() => setHover({ kind: "f", name: f.name })}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover({ kind: "f", name: f.name })}
              onBlur={() => setHover(null)}
              onClick={() => setExpanded(isExpanded ? null : f.name)}
              aria-expanded={isExpanded}
              className={`group flex items-center gap-3 rounded-lg border bg-slate-950/50 px-4 py-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                lit
                  ? `${a.iconBorder} bg-slate-900/70 shadow-[0_0_24px_rgba(96,165,250,0.18)]`
                  : "border-slate-700/60"
              } ${dimmed ? "opacity-60" : "opacity-100"}`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${a.iconBorder} ${a.iconBg} ${a.iconText}`}
              >
                <Icon size={16} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-blue-50">{f.name}</div>
                <div className="truncate text-xs text-slate-400">{f.blurb}</div>
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider transition ${
                  isExpanded ? "text-blue-200" : "text-slate-500 group-hover:text-blue-200"
                }`}
                aria-hidden
              >
                {isExpanded ? "Hide" : "Learn"}
              </span>
            </button>
            {isExpanded && (
              <div
                className={`flex flex-wrap gap-2 ${
                  side === "right" ? "pr-12" : "pl-12"
                }`}
              >
                {f.resources.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-700/80 bg-slate-900/70 px-2.5 py-1 text-xs font-medium text-slate-200 transition hover:border-blue-400/60 hover:bg-blue-500/10 hover:text-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {r.label}
                    <FaExternalLinkAlt size={9} aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="mt-6">
      {/* Desktop: connected map */}
      <div ref={containerRef} className="relative hidden md:block">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)_minmax(0,1fr)] gap-x-8 lg:gap-x-12">
          {renderFoundationColumn(leftFoundations, "left")}

          <div className="grid content-center gap-6 self-stretch py-2">
            {tracks.map((t) => {
              const a = accents[t.accent];
              const TIcon = t.icon;
              const lit = isTrackLit(t.id);
              const dimmed = hover !== null && !lit;
              return (
                <div
                  key={t.id}
                  ref={(el) => {
                    tRefs.current[t.id] = el;
                  }}
                  onMouseEnter={() => setHover({ kind: "t", id: t.id })}
                  onMouseLeave={() => setHover(null)}
                  className={`mx-auto flex w-full max-w-[24rem] items-center gap-3 rounded-lg border px-4 py-4 transition-all duration-200 ${
                    lit
                      ? `${a.iconBorder} bg-slate-900/70 shadow-[0_0_30px_rgba(96,165,250,0.22)]`
                      : "border-slate-700/60 bg-slate-950/50"
                  } ${dimmed ? "opacity-60" : "opacity-100"}`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border ${a.iconBorder} ${a.iconBg} ${a.iconText}`}
                  >
                    <TIcon size={18} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-blue-50">{t.title}</div>
                    <div className={`text-xs ${a.subtitle}`}>{t.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {renderFoundationColumn(rightFoundations, "right")}
        </div>

        <svg
          className="pointer-events-none absolute inset-0 z-10"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${Math.max(1, size.w)} ${Math.max(1, size.h)}`}
          aria-hidden
        >
          {paths.map((p) => {
            const active = isPathActive(p);
            const dimmed = hover !== null && !active;
            return (
              <path
                key={p.key}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth={active ? 2 : 1}
                strokeLinecap="round"
                opacity={active ? 0.95 : dimmed ? 0.06 : 0.3}
                style={{ transition: "opacity 200ms, stroke-width 200ms" }}
              />
            );
          })}
        </svg>
      </div>

      {/* Mobile: stacked list with track chips */}
      <div className="flex flex-col gap-3 md:hidden">
        {foundations.map((f) => {
          const Icon = f.icon;
          const a = accents[f.accent];
          const tracksOut = foundationToTracks[f.name] || [];
          return (
            <div
              key={f.name}
              className="rounded-lg border border-slate-700/60 bg-slate-950/50 p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${a.iconBorder} ${a.iconBg} ${a.iconText}`}
                >
                  <Icon size={16} aria-hidden />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-bold text-blue-50">{f.name}</div>
                  <div className="mt-1 text-xs text-slate-400">{f.blurb}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-800 pt-3">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Feeds
                </span>
                {tracksOut.map((tId) => {
                  const t = tracks.find((tr) => tr.id === tId);
                  if (!t) return null;
                  const ta = accents[t.accent];
                  return (
                    <span
                      key={tId}
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${ta.chipBorder} ${ta.chipBg} ${ta.chipText}`}
                    >
                      {t.title}
                    </span>
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {f.resources.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-slate-700/80 bg-slate-900/70 px-2 py-1 text-xs text-slate-200 hover:border-blue-400/60 hover:text-blue-100"
                  >
                    {r.label}
                    <FaExternalLinkAlt size={9} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrackCard({ track, onOpen }: { track: Track; onOpen: () => void }) {
  const Icon = track.icon;
  const a = accents[track.accent];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group cyber-panel relative block overflow-hidden px-6 py-6 text-left transition hover:-translate-y-1"
    >
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${a.topBar} to-transparent`} aria-hidden />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className={`flex h-12 w-12 items-center justify-center rounded-lg border ${a.iconBorder} ${a.iconBg} ${a.iconText}`}>
            <Icon size={22} aria-hidden />
          </span>
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${a.subtitle}`}>{track.subtitle}</p>
            <h3 className="mt-1 text-xl font-bold text-blue-50">{track.title}</h3>
          </div>
        </div>
        <FaArrowRight
          className={`mt-2 shrink-0 ${a.iconText} transition group-hover:translate-x-1`}
          aria-hidden
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {track.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-slate-700/70 bg-slate-900/60 px-2 py-1 text-[11px] font-medium text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-blue-400/20 pt-4 text-xs text-slate-400">
        <span className="uppercase tracking-[0.18em]">{track.signal}</span>
        <span className="font-semibold text-blue-200">{track.salary}</span>
      </div>
    </button>
  );
}

function TrackVideoPlaceholder({
  track,
  compact = false,
}: {
  track: Track;
  compact?: boolean;
}) {
  const a = accents[track.accent];

  return (
    <div className={`mt-5 rounded-xl border ${a.iconBorder} bg-slate-950/70 ${compact ? "p-3" : "p-4"} ${compact ? "" : "shadow-[0_0_30px_rgba(15,23,42,0.35)]"}`}>
      <div className={`relative overflow-hidden rounded-lg border ${a.iconBorder} bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_rgba(2,6,23,0.96)_62%)] ${compact ? "aspect-[16/10]" : "aspect-[5/4]"}`}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(148,163,184,0.08)_0%,transparent_45%,rgba(148,163,184,0.03)_100%)]" aria-hidden />
        <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
          Video
        </div>
        <div className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] ${a.iconBorder} ${a.chipBg} ${a.chipText}`}>
          {track.video.duration}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`flex ${compact ? "h-14 w-14" : "h-16 w-16"} items-center justify-center rounded-full border ${a.iconBorder} bg-slate-950/80 ${a.iconText} shadow-[0_0_28px_rgba(59,130,246,0.2)]`}>
            <FaPlay className="ml-0.5" size={compact ? 18 : 20} aria-hidden />
          </span>
        </div>

        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent ${compact ? "p-4" : "p-5"}`}>
          <p className={`${compact ? "text-sm" : "text-base"} font-semibold text-blue-50`}>{track.video.title}</p>
          <p className={`mt-1 ${compact ? "text-xs" : "text-sm"} text-slate-300`}>
            {track.video.takeaway}
          </p>
        </div>
      </div>

      <div className={`mt-3 ${compact ? "space-y-1.5" : "space-y-2.5"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Chapters
        </p>
        <div className="flex flex-wrap gap-2">
          {track.video.chapters.map((chapter) => (
            <span
              key={chapter}
              className={`rounded-md border px-2 py-1 text-[11px] ${a.chipBorder} ${a.chipBg} ${a.chipText}`}
            >
              {chapter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AssessmentView({
  question,
  questionNumber,
  totalQuestions,
  progressPct,
  onAnswer,
  onPrevious,
  onBack,
}: {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  progressPct: number;
  onAnswer: (o: AssessmentOption) => void;
  onPrevious: (() => void) | null;
  onBack: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const digitIdx = "1234".indexOf(e.key);
      const letterIdx = "abcd".indexOf(e.key.toLowerCase());
      const idx = digitIdx >= 0 ? digitIdx : letterIdx;
      if (idx >= 0 && idx < question.options.length) {
        e.preventDefault();
        onAnswer(question.options[idx]);
        return;
      }
      if (e.key === "ArrowLeft" && onPrevious) {
        e.preventDefault();
        onPrevious();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, onAnswer, onPrevious]);

  return (
    <section className="cyber-panel px-6 py-10 md:px-12 md:py-14">
      <BackButton onClick={onBack} />
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Discovery Assessment</p>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {questionNumber} / {totalQuestions}
        </p>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800/80">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <h2 className="mt-8 text-2xl font-bold text-blue-50 md:text-3xl">{question.question}</h2>

      <div className="mt-6 grid gap-3">
        {question.options.map((option, index) => (
          <button
            key={option.text}
            type="button"
            onClick={() => onAnswer(option)}
            className="group flex items-center gap-4 rounded-xl border border-slate-700/70 bg-slate-950/50 px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-slate-900/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.16)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-blue-400/40 bg-blue-500/10 text-sm font-bold text-blue-200 group-hover:bg-blue-500/20">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-sm text-slate-200 md:text-base">{option.text}</span>
            <span className="ml-auto hidden shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:flex">
              <kbd className="rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                {index + 1}
              </kbd>
            </span>
            <FaArrowRight
              className="ml-2 shrink-0 text-blue-400 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 md:ml-0"
              aria-hidden
            />
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrevious ?? undefined}
          disabled={!onPrevious}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 transition hover:text-blue-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-400"
        >
          <FaArrowLeft aria-hidden /> Previous question
        </button>
        <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:inline">
          Tip: press 1-4 to answer
        </span>
      </div>
    </section>
  );
}

function ResultsView({
  ranked,
  maxPossibleScore,
  onRetake,
  onOpenRoadmap,
  onStartOver,
  onBack,
}: {
  ranked: (Track & { score: number })[];
  maxPossibleScore: number;
  onRetake: () => void;
  onOpenRoadmap: (t: Track) => void;
  onStartOver: () => void;
  onBack: () => void;
}) {
  const top = ranked[0];
  const TopIcon = top.icon;

  return (
    <section className="space-y-8">
      <BackButton onClick={onBack} />

      <div className="cyber-panel px-6 py-10 md:px-12 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Assessment Complete</p>
        <h2 className="mt-4 text-3xl font-black text-blue-50 md:text-4xl">
          Your strongest signal is <span className="text-blue-300">{top.title}</span>.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
          Match strength is measured against the highest possible score in the quiz, then ranked by your
          preferred work style, project interests, and motivation patterns.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-xl border border-blue-400/40 bg-blue-500/5 p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-blue-400/50 bg-blue-500/15 text-blue-200">
                <TopIcon size={26} aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">Best Match</p>
                <h3 className="text-2xl font-bold text-blue-50">{top.title}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {top.subtitle} · {top.salary}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{top.desc}</p>
            <button
              type="button"
              onClick={() => onOpenRoadmap(top)}
              className="cyber-button mt-6 inline-flex items-center gap-2"
            >
              Open roadmap <FaArrowRight aria-hidden />
            </button>
          </div>

          <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">Core skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {top.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-blue-400/30 bg-blue-500/5 px-2 py-1 text-xs text-blue-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cyber-panel px-6 py-8 md:px-10">
        <SectionHeading kicker="Full ranking" title="Match strength by track" />
        <div className="mt-5 space-y-3">
          {ranked.map((track, index) => {
            const percent = Math.min(100, Math.round((track.score / maxPossibleScore) * 100));
            const Icon = track.icon;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onOpenRoadmap(track)}
                className={`group flex w-full flex-col gap-3 rounded-xl border px-5 py-4 text-left transition hover:-translate-y-0.5 ${
                  index === 0
                    ? "border-blue-400/60 bg-blue-500/10 hover:border-blue-300"
                    : "border-slate-700/70 bg-slate-950/50 hover:border-blue-400/40 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Icon className="text-blue-300" size={20} aria-hidden />
                    <span className="font-semibold text-blue-50">{track.title}</span>
                    <span className="text-xs text-slate-400">{track.subtitle}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-200">{percent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800/80">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <button type="button" onClick={onRetake} className="cyber-button-secondary inline-flex items-center gap-2">
            <FaRedo aria-hidden /> Retake assessment
          </button>
          <button
            type="button"
            onClick={onStartOver}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 underline-offset-4 transition hover:text-rose-300 hover:underline"
          >
            Clear saved progress
          </button>
        </div>
      </div>
    </section>
  );
}

function RoadmapView({
  selectedTrack,
  activePhase,
  setActivePhase,
  setSelectedTrack,
  onStartOver,
  onBack,
  backLabel,
}: {
  selectedTrack: Track | null;
  activePhase: number;
  setActivePhase: (i: number) => void;
  setSelectedTrack: (t: Track | null) => void;
  onStartOver: () => void;
  onBack: () => void;
  backLabel: string;
}) {
  if (!selectedTrack) {
    return (
      <section className="space-y-8">
        <BackButton onClick={onBack} label={backLabel} />
        <div className="cyber-panel px-6 py-10 md:px-12 md:py-14">
          <SectionHeading kicker="Roadmap library" title="Pick the track you want to explore." />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {tracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onOpen={() => {
                  setSelectedTrack(track);
                  setActivePhase(0);
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const Icon = selectedTrack.icon;
  const phase = selectedTrack.phases[activePhase];
  const a = accents[selectedTrack.accent];

  return (
    <section className="space-y-8">
      <BackButton onClick={onBack} label={backLabel} />

      <div className="cyber-panel relative overflow-hidden px-6 py-10 md:px-12 md:py-12">
        <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${a.topBar} to-transparent`} aria-hidden />
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_28rem] xl:items-start">
          <div>
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-5">
                <span className={`flex h-14 w-14 items-center justify-center rounded-xl border ${a.iconBorder} ${a.iconBg} ${a.iconText}`}>
                  <Icon size={28} aria-hidden />
                </span>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${a.subtitle}`}>
                    {selectedTrack.subtitle}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-blue-50 md:text-4xl">{selectedTrack.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                    {selectedTrack.desc}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack(null);
                  setActivePhase(0);
                }}
                className="cyber-button-secondary self-start"
              >
                View all tracks
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedTrack.skills.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-md border px-2.5 py-1 text-xs ${a.chipBorder} ${a.chipBg} ${a.chipText}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <TrackVideoPlaceholder track={selectedTrack} />
        </div>
      </div>

      <VisualRoadmap
        phases={selectedTrack.phases}
        activePhase={activePhase}
        setActivePhase={setActivePhase}
      />

      <div className="cyber-panel px-6 py-8 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div key={`hdr-${activePhase}`} className="checkpoint-swap">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">
              Checkpoint {activePhase + 1} of {selectedTrack.phases.length}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-blue-50">{phase.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{phase.focus}</p>
          </div>
          <span
            key={`count-${activePhase}`}
            className="progress-pop rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200"
          >
            {phase.items.length} milestones
          </span>
        </div>

        <div key={`grid-${activePhase}`} className="mt-6 grid gap-3 md:grid-cols-2">
          {phase.items.map((item, idx) => (
            <div
              key={item}
              className="milestone-item flex items-start gap-3 rounded-lg border border-slate-700/70 bg-slate-950/50 px-4 py-3 text-sm text-slate-200 transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-slate-900/70"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <FaCheck className="mt-0.5 shrink-0 text-blue-400" aria-hidden />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
            disabled={activePhase === 0}
            className="cyber-button-secondary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaArrowLeft aria-hidden /> Previous
          </button>
          <button
            type="button"
            onClick={() =>
              setActivePhase(Math.min(selectedTrack.phases.length - 1, activePhase + 1))
            }
            disabled={activePhase === selectedTrack.phases.length - 1}
            className="cyber-button inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next phase <FaArrowRight aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onStartOver}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 underline-offset-4 transition hover:text-rose-300 hover:underline"
        >
          Clear saved progress
        </button>
      </div>
    </section>
  );
}

function VisualRoadmap({
  phases,
  activePhase,
  setActivePhase,
}: {
  phases: Track["phases"];
  activePhase: number;
  setActivePhase: (i: number) => void;
}) {
  const nodePositions = [
    { x: 8, y: 70 },
    { x: 29, y: 32 },
    { x: 50, y: 62 },
    { x: 71, y: 28 },
    { x: 92, y: 56 },
  ];

  const viewW = 1000;
  const viewH = 400;
  const toSvg = (p: { x: number; y: number }) => ({
    x: (p.x / 100) * viewW,
    y: (p.y / 100) * viewH,
  });

  const pathD = (() => {
    const pts = nodePositions.map(toSvg);
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cp1x = prev.x + (curr.x - prev.x) * 0.5;
      const cp1y = prev.y;
      const cp2x = prev.x + (curr.x - prev.x) * 0.5;
      const cp2y = curr.y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    return d;
  })();

  const totalSegments = phases.length - 1;
  const progressPct = totalSegments > 0 ? (activePhase / totalSegments) * 100 : 0;

  return (
    <div className="cyber-panel relative overflow-hidden px-4 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">
            Five-phase roadmap
          </p>
          <h3 className="mt-2 text-xl font-bold text-blue-50 md:text-2xl">
            Tap a stop to jump to that phase.
          </h3>
        </div>
        <span className="rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
          <span key={activePhase} className="progress-pop inline-block">
            {Math.round(progressPct)}%
          </span>{" "}
          journey
        </span>
      </div>

      <div className="relative mt-8 hidden aspect-[1000/400] w-full md:block">
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="roadmap-progress" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id="roadmap-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={pathD}
            fill="none"
            stroke="rgba(148, 163, 184, 0.22)"
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="4 10"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-14"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d={pathD}
            fill="none"
            stroke="url(#roadmap-progress)"
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${progressPct} 100`}
            filter="url(#roadmap-glow)"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {phases.map((p, index) => {
          const pos = nodePositions[index];
          const isActive = index === activePhase;
          const isCompleted = index < activePhase;
          const labelAbove = pos.y > 50;

          return (
            <button
              key={p.title}
              type="button"
              onClick={() => setActivePhase(index)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              aria-label={`Phase ${index + 1}: ${p.title}`}
            >
              <span
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-black transition duration-300 md:h-14 md:w-14 md:text-base ${
                  isActive
                    ? "border-blue-200 bg-blue-500 text-slate-950 shadow-[0_0_32px_rgba(96,165,250,0.75)] scale-110"
                    : isCompleted
                    ? "border-blue-400/80 bg-blue-500/30 text-blue-100 shadow-[0_0_16px_rgba(59,130,246,0.4)]"
                    : "border-slate-600 bg-slate-950 text-slate-400 hover:scale-105 hover:border-blue-400/60 hover:text-blue-200"
                }`}
              >
                {isActive && (
                  <>
                    <span className="roadmap-pulse-ring" aria-hidden />
                    <span className="roadmap-pulse-ring delay-1" aria-hidden />
                  </>
                )}
                {isCompleted ? <FaCheck aria-hidden /> : index + 1}
              </span>
              <span
                className={`pointer-events-none absolute left-1/2 hidden w-36 -translate-x-1/2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] md:block ${
                  labelAbove ? "bottom-full mb-3" : "top-full mt-3"
                } ${isActive ? "text-blue-100" : "text-slate-400"}`}
              >
                <span className="block text-blue-300">0{index + 1}</span>
                <span
                  className={`mt-0.5 block normal-case tracking-normal ${
                    isActive ? "text-base text-blue-50" : "text-sm text-slate-300"
                  }`}
                >
                  {p.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <ol className="mt-6 space-y-3 md:hidden">
        {phases.map((p, index) => {
          const isActive = index === activePhase;
          const isCompleted = index < activePhase;
          const isLast = index === phases.length - 1;
          return (
            <li key={p.title} className="relative">
              {!isLast && (
                <span
                  className={`absolute left-[18px] top-10 h-[calc(100%-8px)] w-px ${
                    isCompleted ? "bg-blue-400/60" : "bg-slate-700/70"
                  }`}
                  aria-hidden
                />
              )}
              <button
                type="button"
                onClick={() => setActivePhase(index)}
                className={`relative flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                  isActive
                    ? "border-blue-300 bg-blue-500/15 shadow-[0_0_20px_rgba(96,165,250,0.3)]"
                    : isCompleted
                    ? "border-blue-400/40 bg-blue-500/5"
                    : "border-slate-700 bg-slate-950/60"
                }`}
              >
                <span
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                    isActive
                      ? "border-blue-200 bg-blue-500 text-slate-950"
                      : isCompleted
                      ? "border-blue-400/70 bg-blue-500/25 text-blue-100"
                      : "border-slate-600 bg-slate-900 text-slate-400"
                  }`}
                >
                  {isCompleted ? <FaCheck aria-hidden /> : index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-bold ${isActive ? "text-blue-50" : "text-slate-200"}`}>
                    {p.title}
                  </span>
                  <span className="block text-xs text-slate-400">{p.focus}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  right,
}: {
  kicker: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">{kicker}</p>
        <h2 className="mt-2 text-2xl font-black text-blue-50 md:text-3xl">{title}</h2>
      </div>
      {right}
    </div>
  );
}

function BackButton({ onClick, label = "Back to home" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 transition hover:text-blue-200"
    >
      <FaArrowLeft aria-hidden /> {label}
    </button>
  );
}
