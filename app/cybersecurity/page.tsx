"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCloud,
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">Target roles</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {top.roles.map((role) => (
                <li key={role} className="flex items-center gap-2">
                  <FaCheck className="text-blue-400" aria-hidden />
                  {role}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">Core skills</p>
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

      <VisualRoadmap
        phases={selectedTrack.phases}
        activePhase={activePhase}
        setActivePhase={setActivePhase}
      />

      <div className="cyber-panel px-6 py-8 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">
              Checkpoint {activePhase + 1} of {selectedTrack.phases.length}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-blue-50">{phase.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{phase.focus}</p>
          </div>
          <span className="rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
            {phase.items.length} milestones
          </span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {phase.items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-slate-700/70 bg-slate-950/50 px-4 py-3 text-sm text-slate-200"
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

      <div className="grid gap-5 md:grid-cols-2">
        <InfoBlock kicker="Target roles" items={selectedTrack.roles} />
        <InfoBlock
          kicker="Program shape"
          items={[
            `Salary band ${selectedTrack.salary}`,
            "8-12 week focused path",
            "Portfolio artifacts each phase",
            "Interview story bank at launch",
          ]}
        />
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
          {Math.round(progressPct)}% journey
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
          />
          <path
            d={pathD}
            fill="none"
            stroke="url(#roadmap-progress)"
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${progressPct} 100`}
            filter="url(#roadmap-glow)"
            className="transition-all duration-500"
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
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-black transition md:h-14 md:w-14 md:text-base ${
                  isActive
                    ? "border-blue-200 bg-blue-500 text-slate-950 shadow-[0_0_32px_rgba(96,165,250,0.75)] scale-110"
                    : isCompleted
                    ? "border-blue-400/80 bg-blue-500/30 text-blue-100 shadow-[0_0_16px_rgba(59,130,246,0.4)]"
                    : "border-slate-600 bg-slate-950 text-slate-400 hover:border-blue-400/60 hover:text-blue-200"
                }`}
              >
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

function InfoBlock({ kicker, items }: { kicker: string; items: string[] }) {
  return (
    <div className="cyber-panel px-6 py-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">{kicker}</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <FaCheck className="mt-1 shrink-0 text-blue-400" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
