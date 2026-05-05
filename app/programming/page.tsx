"use client";

/**
 * Programming career hub: static content (purpose, resources) plus a flow parallel to
 * `app/cybersecurity/page.tsx` — home → assessment → results → per-track roadmap.
 *
 * Assessment: each answer awards +1 to exactly one `TrackId` (see `questions`). Options are
 * shuffled per run (`assessmentDeck`) so A/B/C/D labels are not tied to tracks. Scores and
 * roadmap position persist in localStorage (`STORAGE_KEY`); answer history is not persisted.
 */
import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBrain,
  FaChartBar,
  FaCheck,
  FaLaptopCode,
  FaRedo,
  FaServer,
} from "react-icons/fa";

// --- Types & theme tokens ----------------------------------------------------

type TrackId = "backend" | "ml" | "fullstack" | "analyst";
type AccentKey = "cyan" | "violet" | "emerald" | "amber";

/** Role-specific practice content shown on the roadmap (not on the marketing home page). */
type PracticeBundle = {
  exercises: string[];
  miniProjects: string[];
  portfolioProjects: string[];
};

/** Everything the UI needs to render a track card and its full roadmap. */
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
  practice: PracticeBundle;
};

/** Tailwind class bundles keyed by `Track.accent` (cards, roadmap chips, practice panel). */
const accents: Record<
  AccentKey,
  {
    iconText: string;
    iconBg: string;
    iconBorder: string;
    chipBg: string;
    chipBorder: string;
    chipText: string;
    topBar: string;
    subtitle: string;
  }
> = {
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

/** localStorage payload key; value shape is `{ scores, selectedTrackId, activePhase }` (see persist effect). */
const STORAGE_KEY = "techtrek-programming-state";

/** One MCQ option: label shown to user + which track gets +1 when selected. */
type AssessmentOption = {
  text: string;
  track: TrackId;
};

/** One quiz step: prompt + exactly four options (each maps to one track for scoring). */
type AssessmentQuestion = {
  question: string;
  options: AssessmentOption[];
};

/** Primary UI states; `roadmap` covers both track picker (`selectedTrack === null`) and detail. */
type View = "home" | "assessment" | "results" | "roadmap";

/** Short result blurbs for the post-quiz hero (distinct from long `Track.desc` on roadmaps). */
const RESULT_BLURBS: Record<TrackId, string> = {
  backend:
    "You enjoy building the engine behind applications. You focus on performance, scalability, and system design.",
  fullstack:
    "You like building complete products. You enjoy working on both the user interface and the logic behind it.",
  ml: "You're drawn to AI and intelligent systems. You enjoy building models that learn and improve over time.",
  analyst:
    "You love working with data to uncover insights. You focus on storytelling, trends, and decision-making.",
};

/** In-place Fisher–Yates on a *copy* of `items` — never mutates the source array. */
function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Clone each question with a new random option order (scoring still uses `option.track`). */
function buildShuffledDeck(source: AssessmentQuestion[]): AssessmentQuestion[] {
  return source.map((q) => ({
    question: q.question,
    options: shuffleArray(q.options),
  }));
}

// --- Static hub content (home view) -----------------------------------------

const curatedResources = [
  { title: "Python for Beginners", type: "Course", level: "Beginner" },
  { title: "Java Fundamentals", type: "Interactive Track", level: "Beginner" },
  { title: "Modern JavaScript", type: "Documentation + Labs", level: "Intermediate" },
  { title: "React Fundamentals", type: "Project Course", level: "Intermediate" },
  { title: "Next.js Fullstack Path", type: "Guided Learning Path", level: "Intermediate" },
  { title: "API Design and Integration", type: "Workshop", level: "Advanced" },
];

const careerPaths = [
  "Software Engineer",
  "Web Developer",
  "Data Analyst",
  "ML Engineer",
  "Mobile Developer",
];

/** Single source of truth for track metadata, phased roadmap, and per-track practice ideas. */
const tracks: Track[] = [
  {
    id: "backend",
    title: "Backend Developer",
    subtitle: "APIs & Systems",
    icon: FaServer,
    accent: "cyan",
    signal: "Reliable services",
    desc: "Design APIs, data layers, and services that scale. Ideal if you like clear contracts, performance tuning, and thinking in systems.",
    skills: ["REST / GraphQL", "SQL & ORMs", "Auth & sessions", "Caching & queues", "Testing"],
    salary: "$70K - $130K",
    roles: ["Backend Engineer", "API Developer", "Software Engineer"],
    phases: [
      {
        title: "Foundations",
        focus: "Language and runtime",
        items: ["Core language deep dive", "HTTP and web servers", "CLI and tooling", "Git workflows"],
      },
      {
        title: "Core Skills",
        focus: "Build real services",
        items: ["REST design and versioning", "Relational modeling", "Migrations and transactions", "Error handling patterns"],
      },
      {
        title: "Applied Labs",
        focus: "Harden the stack",
        items: ["JWT or session auth", "Rate limiting and validation", "Background jobs", "Structured logging"],
      },
      {
        title: "Portfolio Build",
        focus: "Ship proof",
        items: ["Documented API with OpenAPI", "Postman or integration tests", "README architecture notes", "Deploy to a cloud runtime"],
      },
      {
        title: "Career Launch",
        focus: "Interview ready",
        items: ["System design basics for backend", "Debugging stories", "Resume bullets tied to metrics", "Referral networking"],
      },
    ],
    practice: {
      exercises: [
        "Implement CRUD with proper status codes and pagination",
        "Add idempotency keys to a payment-style endpoint",
        "Optimize a slow query using EXPLAIN and indexes",
      ],
      miniProjects: [
        "URL shortener with analytics counters",
        "Webhook receiver with signature verification",
        "File metadata service with signed uploads",
      ],
      portfolioProjects: [
        "Multi-tenant SaaS API with roles and audit log",
        "Realtime notification service using WebSockets or SSE",
        "Event-sourced inventory microservice with replay tests",
      ],
    },
  },
  {
    id: "ml",
    title: "ML Engineer",
    subtitle: "Models & Pipelines",
    icon: FaBrain,
    accent: "violet",
    signal: "Training to production",
    desc: "Turn data into models and ship them safely. Strong fit for builders who enjoy experimentation, metrics, and reproducible pipelines.",
    skills: ["Python", "PyTorch or TensorFlow", "Feature pipelines", "Eval & monitoring", "MLOps basics"],
    salary: "$100K - $170K",
    roles: ["ML Engineer", "Applied ML Intern", "ML Platform adjacent roles"],
    phases: [
      {
        title: "Foundations",
        focus: "Math and tooling",
        items: ["Linear algebra refresh", "Probability for ML", "NumPy and pandas fluency", "Notebooks vs scripts"],
      },
      {
        title: "Core Skills",
        focus: "Train and evaluate",
        items: ["Supervised learning workflows", "Cross-validation discipline", "Metrics beyond accuracy", "Model debugging"],
      },
      {
        title: "Applied Labs",
        focus: "End-to-end builds",
        items: ["Baseline then iterate", "Hyperparameter experiments", "Leakage checks", "Serialization and inference API"],
      },
      {
        title: "Portfolio Build",
        focus: "Show rigor",
        items: ["Reproducible training repo", "Experiment tracking screenshots", "Latency and cost notes", "Ethical data handling writeup"],
      },
      {
        title: "Career Launch",
        focus: "Tell the story",
        items: ["ML system design talking points", "Failure case studies", "Pairing ML with product goals", "Interview notebook hygiene"],
      },
    ],
    practice: {
      exercises: [
        "Train a classifier on a public tabular dataset with a clean validation split",
        "Build a simple feature store sketch with offline vs online features",
        "Write unit tests for preprocessing and inference code paths",
      ],
      miniProjects: [
        "Image classifier with Grad-CAM or saliency explanations",
        "Forecasting pipeline with backtesting harness",
        "RAG demo over your own markdown corpus",
      ],
      portfolioProjects: [
        "Model registry + CI that blocks regressions on a holdout set",
        "Streaming inference service with autoscaling notes",
        "Federated or privacy-aware experiment (concept + prototype)",
      ],
    },
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    subtitle: "End-to-End Products",
    icon: FaLaptopCode,
    accent: "emerald",
    signal: "Shipping features",
    desc: "Own UI, API, and deployment together. Great if you like fast feedback loops, product polish, and full ownership of a slice.",
    skills: ["React / Next.js", "Node or edge runtimes", "Auth patterns", "Databases", "CI/CD"],
    salary: "$75K - $125K",
    roles: ["Full-Stack Engineer", "Product Engineer", "Web Developer"],
    phases: [
      {
        title: "Foundations",
        focus: "Web essentials",
        items: ["Semantic HTML and accessibility", "CSS layout systems", "JavaScript modules", "TypeScript basics"],
      },
      {
        title: "Core Skills",
        focus: "Product-grade apps",
        items: ["Component architecture", "Data fetching patterns", "Forms and validation", "State management choices"],
      },
      {
        title: "Applied Labs",
        focus: "Integration depth",
        items: ["Auth with OAuth or magic links", "File uploads and storage", "Background tasks or cron", "Observability in the UI"],
      },
      {
        title: "Portfolio Build",
        focus: "Polish and proof",
        items: ["Deployed app with analytics", "Lighthouse or performance notes", "Design system or tokens", "User-facing changelog"],
      },
      {
        title: "Career Launch",
        focus: "Stand out",
        items: ["Walkthrough video or Loom", "Case study on a tricky bug", "Open-source PR or issue triage", "Interview app rebuild prompt"],
      },
    ],
    practice: {
      exercises: [
        "Convert a page to server components with clear data boundaries",
        "Add optimistic UI for a mutation with rollback",
        "Instrument Web Vitals and fix the largest issue",
      ],
      miniProjects: [
        "Dashboard with role-based navigation and empty states",
        "Collaborative list with presence or comments",
        "Markdown blog with ISR or static generation",
      ],
      portfolioProjects: [
        "SaaS starter: billing webhooks, teams, and audit trail",
        "Marketplace with search, filters, and saved views",
        "Support inbox with assignment rules and SLA timers",
      ],
    },
  },
  {
    id: "analyst",
    title: "Data Analyst",
    subtitle: "Insight from Data",
    icon: FaChartBar,
    accent: "amber",
    signal: "Clear metrics",
    desc: "Translate messy data into decisions stakeholders trust. Perfect for curious storytellers who like SQL, charts, and asking better questions.",
    skills: ["SQL", "Spreadsheets", "BI tools", "Statistics basics", "Narrative dashboards"],
    salary: "$55K - $95K",
    roles: ["Data Analyst", "BI Analyst", "Analytics Specialist"],
    phases: [
      {
        title: "Foundations",
        focus: "Data literacy",
        items: ["Types of data and grain", "Joins and aggregations", "Data quality checks", "Ethics and privacy awareness"],
      },
      {
        title: "Core Skills",
        focus: "Analysis toolkit",
        items: ["Advanced SQL patterns", "Window functions", "Cohorts and funnels", "Spreadsheet modeling"],
      },
      {
        title: "Applied Labs",
        focus: "Tell the story",
        items: ["Metric definitions with stakeholders", "Dashboards with guardrails", "Anomaly investigation writeups", "A/B test readouts"],
      },
      {
        title: "Portfolio Build",
        focus: "Publish work",
        items: ["Narrated analysis deck", "Reusable SQL views documented", "KPI tree diagram", "Sample executive summary"],
      },
      {
        title: "Career Launch",
        focus: "Get hired",
        items: ["Take-home presentation practice", "STAR stories with numbers", "Tooling opinions with tradeoffs", "Community datasets portfolio"],
      },
    ],
    practice: {
      exercises: [
        "Write SQL for retention by weekly cohort",
        "Reconcile two sources and document assumptions",
        "Rebuild a chart so the axis cannot be misread",
      ],
      miniProjects: [
        "Marketing funnel dashboard with definitions sheet",
        "Customer health scorecard with thresholds",
        "Operational SLA report with variance commentary",
      ],
      portfolioProjects: [
        "End-to-end revenue diagnostic with recommendations",
        "Self-serve metrics layer for a fake SaaS dataset",
        "Experiment results pack with power and guardrails",
      ],
    },
  },
];

/**
 * Canonical quiz questions. Option order on screen comes from `buildShuffledDeck` — do not
 * assume “first option = backend” etc.; always rely on `AssessmentOption.track`.
 */
const questions: AssessmentQuestion[] = [
  {
    question: "What kind of problem sounds most interesting to you?",
    options: [
      {
        text: "Designing a system that can handle thousands of users at once without crashing",
        track: "backend",
      },
      {
        text: "Building a complete app where users can interact with both the interface and the system behind it",
        track: "fullstack",
      },
      {
        text: "Teaching a system to recognize patterns and make predictions",
        track: "ml",
      },
      {
        text: "Finding insights and trends hidden inside large datasets",
        track: "analyst",
      },
    ],
  },
  {
    question: "What would your ideal daily task look like?",
    options: [
      {
        text: "Writing and optimizing APIs, handling databases, and improving performance",
        track: "backend",
      },
      {
        text: "Switching between front-end design and back-end logic to build features",
        track: "fullstack",
      },
      {
        text: "Training models, tuning algorithms, and experimenting with data",
        track: "ml",
      },
      {
        text: "Cleaning data, creating dashboards, and explaining results",
        track: "analyst",
      },
    ],
  },
  {
    question: "Which mindset best describes how you approach problems?",
    options: [
      {
        text: "“How can I make this system faster, scalable, and reliable?”",
        track: "backend",
      },
      {
        text: "“How can I make this feature work end-to-end for users?”",
        track: "fullstack",
      },
      {
        text: "“How can I improve accuracy and make better predictions?”",
        track: "ml",
      },
      {
        text: "“What story is this data telling?”",
        track: "analyst",
      },
    ],
  },
  {
    question: "Which tool or technology excites you the most?",
    options: [
      {
        text: "Databases, APIs, and server-side frameworks",
        track: "backend",
      },
      {
        text: "JavaScript frameworks, UI design, and APIs",
        track: "fullstack",
      },
      {
        text: "Python, TensorFlow, neural networks, and algorithms",
        track: "ml",
      },
      {
        text: "Excel, SQL, Tableau, and data visualization tools",
        track: "analyst",
      },
    ],
  },
  {
    question: "What kind of project would you rather work on?",
    options: [
      {
        text: "Building the backend for a large-scale application (like a social media platform)",
        track: "backend",
      },
      {
        text: "Creating a full web app from scratch (front-end + back-end)",
        track: "fullstack",
      },
      {
        text: "Developing a recommendation system (like Netflix or Spotify)",
        track: "ml",
      },
      {
        text: "Analyzing customer data to help a company make decisions",
        track: "analyst",
      },
    ],
  },
  {
    question: "What part of a product do you care about most?",
    options: [
      {
        text: "Performance, security, and system architecture",
        track: "backend",
      },
      {
        text: "User experience and functionality working together",
        track: "fullstack",
      },
      {
        text: "Intelligence and automation (making systems “smart”)",
        track: "ml",
      },
      {
        text: "Insights that help people make better decisions",
        track: "analyst",
      },
    ],
  },
  {
    question: "Which statement sounds most like you?",
    options: [
      {
        text: "I enjoy working behind the scenes to make systems run smoothly",
        track: "backend",
      },
      {
        text: "I like seeing the full picture and building complete applications",
        track: "fullstack",
      },
      {
        text: "I'm fascinated by AI and how machines can learn",
        track: "ml",
      },
      {
        text: "I enjoy working with data to uncover patterns and insights",
        track: "analyst",
      },
    ],
  },
];

/** Fresh score object; recomputed from `answers` when the user finishes the last question. */
const emptyScores: Record<TrackId, number> = {
  backend: 0,
  ml: 0,
  fullstack: 0,
  analyst: 0,
};

/** Denominator for result % bars (one point max per question per track). */
const maxPossibleScore = questions.length;

/** Stage nav pills; “Match” is not directly jumpable (must complete quiz or restore from storage). */
const stages: { key: View; label: string }[] = [
  { key: "home", label: "Overview" },
  { key: "assessment", label: "Assessment" },
  { key: "results", label: "Match" },
  { key: "roadmap", label: "Roadmap" },
];

// --- Page component ----------------------------------------------------------

export default function ProgrammingPage() {
  const [view, setView] = useState<View>("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  /** Ordered picks for the current attempt; used to re-score on submit and for Q7 tie-break ordering. */
  const [answers, setAnswers] = useState<AssessmentOption[]>([]);
  /** Populated when the quiz finishes; also reloaded from localStorage so result bars survive refresh. */
  const [scores, setScores] = useState<Record<TrackId, number>>(emptyScores);
  /** `null` in roadmap “library” mode; set when user opens a specific track. */
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  /** Index into `selectedTrack.phases` (synced with VisualRoadmap + milestone panel). */
  const [activePhase, setActivePhase] = useState(0);
  /** Fades main content on view changes (`transition` helper). */
  const [isVisible, setIsVisible] = useState(true);
  /** Gate: skip writing default `{}` to localStorage before we’ve read existing state. */
  const [hydrated, setHydrated] = useState(false);
  /** Per-attempt shuffled questions; cleared on home reset. Falls back to `questions` only if needed. */
  const [assessmentDeck, setAssessmentDeck] = useState<AssessmentQuestion[] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Restore scores / roadmap from last visit (answers are not persisted).
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

  // Persist progress after hydration so we don’t overwrite with zeros on first paint.
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

  /**
   * Tracks sorted by quiz score (desc). When two tracks tie, the last question’s pick (`answers`)
   * wins sort order only — UI still treats all top-score rows as “top tier” (see `ResultsView`).
   */
  const rankedTracks = useMemo(() => {
    const tieBreak =
      answers.length === questions.length && answers.length > 0
        ? answers[answers.length - 1]!.track
        : undefined;

    return tracks
      .map((track) => ({ ...track, score: scores[track.id] }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (tieBreak) {
          const aIs = a.id === tieBreak;
          const bIs = b.id === tieBreak;
          if (aIs !== bIs) return aIs ? -1 : 1;
        }
        return a.id.localeCompare(b.id);
      });
  }, [scores, answers]);

  /** True after user completes at least one quiz (used for roadmap back target). */
  const hasScores = Object.values(scores).some((v) => v > 0);

  /** Brief opacity slide between major views / steps. */
  const transition = (next: () => void) => {
    setIsVisible(false);
    window.setTimeout(() => {
      next();
      setIsVisible(true);
    }, 220);
  };

  /** New shuffled deck + reset assessment-related state; does not clear localStorage until submit flow. */
  const startAssessment = () => {
    const deck = buildShuffledDeck(questions);
    transition(() => {
      setAssessmentDeck(deck);
      setView("assessment");
      setCurrentQuestion(0);
      setAnswers([]);
      setScores(emptyScores);
      setSelectedTrack(null);
      setActivePhase(0);
    });
  };

  /** `track` omitted → roadmap “library”; with track → detail view for that roadmap. */
  const openRoadmap = (track?: Track) => {
    transition(() => {
      setView("roadmap");
      setSelectedTrack(track ?? null);
      setActivePhase(0);
    });
  };

  /** Home + wipe quiz/roadmap UI state (storage cleared separately via `startOver`). */
  const resetAll = () => {
    transition(() => {
      setAssessmentDeck(null);
      setView("home");
      setCurrentQuestion(0);
      setAnswers([]);
      setScores(emptyScores);
      setSelectedTrack(null);
      setActivePhase(0);
    });
  };

  /** Pop last answer and step back (deck order stays the same for this attempt). */
  const previousQuestion = () => {
    if (currentQuestion === 0) return;
    transition(() => {
      setAnswers((a) => a.slice(0, -1));
      setCurrentQuestion((c) => c - 1);
    });
  };

  /** Full reset: drop persisted scores/roadmap and return to home. */
  const startOver = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    resetAll();
  };

  /** From an open roadmap: return to match results if we have quiz data, otherwise home. */
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

  /**
   * Record one answer. Mid-quiz: append and advance. On last question: tally +1 per chosen `track`,
   * commit `scores`, then show results.
   */
  const answerQuestion = (option: AssessmentOption) => {
    const deck = assessmentDeck ?? questions;
    const nextAnswers = [...answers, option];

    if (currentQuestion < deck.length - 1) {
      setAnswers(nextAnswers);
      transition(() => setCurrentQuestion((c) => c + 1));
      return;
    }

    const nextScores = { ...emptyScores };
    for (const answer of nextAnswers) {
      nextScores[answer.track] += 1;
    }
    setAnswers(nextAnswers);
    setScores(nextScores);
    transition(() => setView("results"));
  };

  // While assessing, prefer the shuffled deck; fallback to canonical `questions` only if state is missing.
  const activeAssessmentQuestions = assessmentDeck ?? questions;
  const question = activeAssessmentQuestions[currentQuestion];
  const progressPct = ((currentQuestion + 1) / activeAssessmentQuestions.length) * 100;

  return (
    <div className="cyber-bg relative min-h-screen overflow-hidden">
      <div className="cyber-aurora pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div className="cyber-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <StageNav
          view={view}
          onJump={(target) => {
            // Centralized jumps from the pill nav (each target resets or starts the right flow).
            if (target === "home") resetAll();
            else if (target === "assessment") startAssessment();
            else if (target === "roadmap") openRoadmap();
          }}
        />

        {/* Main pane: exactly one branch matches `view` (mutually exclusive screens). */}
        <div
          className={`mt-8 transition-all duration-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {view === "home" && (
            <div className="space-y-12">
              {/* Hero + static panels + track grid; assessment lives in separate `view` below. */}
              <ProgrammingHomeHero onStartAssessment={startAssessment} />

              <section className="grid gap-4 md:grid-cols-2">
                <div className="cyber-panel p-5">
                  <h2 className="text-lg font-semibold text-cyan-200">Purpose</h2>
                  <p className="mt-2 text-sm text-slate-200">
                    Serve as a centralized space where students can discover what to learn, practice effectively,
                    and build confidence in software development.
                  </p>
                </div>
                <div className="cyber-panel p-5">
                  <h2 className="text-lg font-semibold text-indigo-200">Core Objectives</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                    <li>Understand what to learn and in what order</li>
                    <li>Access high-quality learning resources</li>
                    <li>Practice with hands-on coding and projects</li>
                    <li>Prepare for real career paths in tech</li>
                  </ul>
                </div>
              </section>

              <ProgrammingTrackGrid onStartAssessment={startAssessment} onOpenRoadmap={openRoadmap} />

              <section>
                <SectionHeading
                  kicker="Library"
                  title="Curated resources"
                  right={
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Interactive links coming soon
                    </span>
                  }
                />
                <p className="mt-2 text-sm text-slate-400">
                  Recommended learning content across languages and modern web development tools.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {curatedResources.map((resource) => (
                    <article key={resource.title} className="cyber-panel p-5">
                      <h3 className="text-lg font-medium text-blue-50">{resource.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">
                        Type: <span className="text-slate-100">{resource.type}</span>
                      </p>
                      <p className="text-sm text-slate-300">
                        Level: <span className="text-slate-100">{resource.level}</span>
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-5 md:grid-cols-2">
                <article className="cyber-panel border-emerald-400/30 p-5">
                  <h2 className="text-2xl font-semibold text-emerald-200">Career Paths</h2>
                  <p className="mt-2 text-sm text-slate-200">
                    Explore roles that align with your interests and build your learning plan around them.
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-100">
                    {careerPaths.map((career) => (
                      <li key={career}>{career}</li>
                    ))}
                  </ul>
                </article>

                <article className="cyber-panel border-fuchsia-400/30 p-5">
                  <h2 className="text-2xl font-semibold text-fuchsia-200">Optional AI Assistant</h2>
                  <p className="mt-2 text-sm text-slate-200">
                    Add an AI programming assistant to get instant explanations, debugging tips, and personalized
                    practice ideas while learning.
                  </p>
                  <button
                    type="button"
                    className="mt-5 rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-fuchsia-500"
                  >
                    Coming Soon
                  </button>
                </article>
              </section>
            </div>
          )}

          {view === "assessment" && question && (
            /* `question` comes from shuffled `assessmentDeck` when present. */
            <AssessmentView
              question={question}
              questionNumber={currentQuestion + 1}
              totalQuestions={activeAssessmentQuestions.length}
              progressPct={progressPct}
              onAnswer={answerQuestion}
              onPrevious={currentQuestion > 0 ? previousQuestion : null}
              onBack={resetAll}
            />
          )}

          {view === "results" && (
            /* `rankedTracks` already applies tie-break sort; UI highlights every row at `topScore`. */
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
            /* `selectedTrack === null` → track picker; otherwise detailed roadmap + practice for that track. */
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

      <footer className="flex items-center justify-center border-t border-white/10 py-6 text-sm text-slate-400">
        <p>&copy; 2026 TechTreck</p>
      </footer>
    </div>
  );
}

// --- Subviews (mostly stateless; driven by `ProgrammingPage` props / closures) ---

/**
 * Breadcrumb-style nav for the four logical steps. Only some pills are clickable jumps:
 * - “Match” is disabled until scores exist (user must finish quiz or reload with saved scores).
 * - Clicking “Roadmap” without a selected track opens the track library inside roadmap view.
 */
function StageNav({ view, onJump }: { view: View; onJump: (target: View) => void }) {
  const activeIndex = stages.findIndex((s) => s.key === view);

  return (
    <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
      {stages.map((stage, index) => {
        const isActive = stage.key === view;
        const isCompleted = index < activeIndex;
        // “results” is never a direct jump target — avoids landing on empty results before a quiz run.
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

/** Top-of-home hero + primary CTA into the assessment (deck shuffle happens in `startAssessment`). */
function ProgrammingHomeHero({ onStartAssessment }: { onStartAssessment: () => void }) {
  return (
    <section className="cyber-panel px-6 py-12 text-center md:px-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Programming Career Tracks</p>
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight text-blue-50 md:text-6xl">
        Learn smarter.
        <span className="block text-blue-300">Build the proof.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-sm text-slate-300 md:text-base">
        Pick a track or take the discovery assessment. Each roadmap includes role-matched practice and project ideas.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onStartAssessment} className="cyber-button inline-flex items-center gap-2">
          Start assessment <FaArrowRight aria-hidden />
        </button>
      </div>
    </section>
  );
}

/** “Four tracks” grid; each card calls `onOpenRoadmap(track)` to skip the quiz and open that roadmap. */
function ProgrammingTrackGrid({
  onStartAssessment,
  onOpenRoadmap,
}: {
  onStartAssessment: () => void;
  onOpenRoadmap: (track?: Track) => void;
}) {
  return (
    <section className="space-y-6">
      <SectionHeading
        kicker="Choose a specialization"
        title="Four tracks."
        right={
          <button type="button" onClick={onStartAssessment} className="cyber-button-secondary">
            Find my fit
          </button>
        }
      />
      <div className="grid gap-5 md:grid-cols-2">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} onOpen={() => onOpenRoadmap(track)} />
        ))}
      </div>
    </section>
  );
}

/** Large clickable panel summarizing a track (used on home + roadmap library). */
function TrackCard({ track, onOpen }: { track: Track; onOpen: () => void }) {
  const Icon = track.icon;
  const a = accents[track.accent];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group cyber-panel relative block overflow-hidden px-6 py-6 text-left transition hover:-translate-y-1"
    >
      <div
        className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${a.topBar} to-transparent`}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-lg border ${a.iconBorder} ${a.iconBg} ${a.iconText}`}
          >
            <Icon size={22} aria-hidden />
          </span>
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${a.subtitle}`}>{track.subtitle}</p>
            <h3 className="mt-1 text-xl font-bold text-blue-50">{track.title}</h3>
          </div>
        </div>
        <FaArrowRight className={`mt-2 shrink-0 ${a.iconText} transition group-hover:translate-x-1`} aria-hidden />
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

/**
 * Single MCQ step. Letters A–D are display-only (order comes from parent’s shuffled deck).
 * Keyboard: 1–4 / a–d pick by index; Left arrow goes to previous question when allowed.
 */
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
  // Global shortcuts while this view is mounted (re-bind when `question` changes).
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
            key={`${option.track}-${index}`}
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
            <FaArrowRight className="ml-2 shrink-0 text-blue-400 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 md:ml-0" aria-hidden />
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

/**
 * Post-quiz summary: hero (single or tie), sidebar roles/skills, then full ranked list as buttons.
 * `ranked` is pre-sorted; `tiedAtTop` = all tracks whose `score === ranked[0].score`.
 */
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
  const topScore = ranked[0]?.score ?? 0;
  const tiedAtTop = ranked.filter((t) => t.score === topScore);
  const isTie = tiedAtTop.length > 1;
  const top = ranked[0];
  const TopIcon = top.icon;
  // Among equal scores, `ranked` order prefers the track picked on the last quiz question (see `rankedTracks`); UI still treats every max-score row as top tier below.

  return (
    <section className="space-y-8">
      <BackButton onClick={onBack} />

      <div className="cyber-panel px-6 py-10 md:px-12 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Assessment Complete</p>

        {isTie ? (
          <>
            <h2 className="mt-4 text-3xl font-black text-blue-50 md:text-4xl">
              You have a <span className="text-blue-300">{tiedAtTop.length}-way tie</span> for your top match.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              {tiedAtTop.map((t) => t.title).join(" · ")} — each earned the same score. Option order was randomized, so
              letters A–D did not map to a fixed track. If you need a nudge, your answer to the last question is used
              only to order ties — every track listed here still fits. Open any roadmap below, or compare in the full
              ranking.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-4 text-3xl font-black text-blue-50 md:text-4xl">
              Your strongest signal is <span className="text-blue-300">{top.title}</span>.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              Each answer added one point to a career track. Bars show how many of {maxPossibleScore} questions lined
              up with that track. Answers were shuffled so screen position does not reveal which track is which.
            </p>
          </>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-xl border border-blue-400/40 bg-blue-500/5 p-6">
            {isTie ? (
              <div className="space-y-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">Top matches</p>
                {tiedAtTop.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.id} className="border-b border-blue-400/20 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-400/50 bg-blue-500/15 text-blue-200">
                          <Icon size={22} aria-hidden />
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-blue-50">{t.title}</h3>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                            {t.subtitle} · {t.salary}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{RESULT_BLURBS[t.id]}</p>
                      <button
                        type="button"
                        onClick={() => onOpenRoadmap(t)}
                        className="cyber-button mt-4 inline-flex items-center gap-2"
                      >
                        Open {t.title} roadmap <FaArrowRight aria-hidden />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
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
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{RESULT_BLURBS[top.id]}</p>
                <button type="button" onClick={() => onOpenRoadmap(top)} className="cyber-button mt-6 inline-flex items-center gap-2">
                  Open roadmap <FaArrowRight aria-hidden />
                </button>
              </>
            )}
          </div>

          <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-6">
            {isTie ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">What to do next</p>
                <p className="mt-3 text-sm text-slate-300">
                  Skim each tied roadmap’s phases and practice ideas. If one track still feels more energizing, start
                  there—you can switch any time.
                </p>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Target roles (first tie)
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {tiedAtTop[0].roles.map((role) => (
                    <li key={role} className="flex items-center gap-2">
                      <FaCheck className="text-blue-400" aria-hidden />
                      {role}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500">See other tied tracks’ roles in the full ranking below.</p>
              </>
            ) : (
              <>
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
                    <span key={s} className="rounded-md border border-blue-400/30 bg-blue-500/5 px-2 py-1 text-xs text-blue-100">
                      {s}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="cyber-panel px-6 py-8 md:px-10">
        <SectionHeading kicker="Full ranking" title="Match strength by track" />
        <div className="mt-5 space-y-3">
          {ranked.map((track) => {
            const percent = Math.min(100, Math.round((track.score / maxPossibleScore) * 100));
            const Icon = track.icon;
            // Highlight every track tied for first — not only `ranked[0]`.
            const isTopTier = track.score === topScore;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onOpenRoadmap(track)}
                className={`group flex w-full flex-col gap-3 rounded-xl border px-5 py-4 text-left transition hover:-translate-y-0.5 ${
                  isTopTier
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
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-300" style={{ width: `${percent}%` }} />
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

/** Role-aligned exercises / projects under the phased roadmap on the detail screen. */
function TrackPracticePanel({ track }: { track: Track }) {
  const a = accents[track.accent];
  const { practice } = track;

  return (
    <div className="cyber-panel px-6 py-8 md:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">Practice for this track</p>
      <h3 className="mt-2 text-xl font-bold text-blue-50 md:text-2xl">Exercises, mini projects, and portfolio ideas</h3>
      <p className="mt-2 text-sm text-slate-400">Tuned to {track.title}. Swap items in or out as your goals sharpen.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className={`rounded-xl border ${a.chipBorder} ${a.chipBg} p-4`}>
          <h4 className={`text-sm font-bold uppercase tracking-[0.14em] ${a.subtitle}`}>Coding exercises</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {practice.exercises.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <FaCheck className={`mt-0.5 shrink-0 ${a.iconText}`} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-xl border ${a.chipBorder} ${a.chipBg} p-4`}>
          <h4 className={`text-sm font-bold uppercase tracking-[0.14em] ${a.subtitle}`}>Mini projects</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {practice.miniProjects.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <FaCheck className={`mt-0.5 shrink-0 ${a.iconText}`} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-xl border ${a.chipBorder} ${a.chipBg} p-4`}>
          <h4 className={`text-sm font-bold uppercase tracking-[0.14em] ${a.subtitle}`}>Portfolio projects</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {practice.portfolioProjects.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <FaCheck className={`mt-0.5 shrink-0 ${a.iconText}`} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Roadmap experience: either a track picker (`selectedTrack === null`) or full detail for one track.
 * Phase index is controlled here and mirrored in `VisualRoadmap` + milestone checklist.
 */
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
          {/* Same cards as home: user landed here from nav without a pre-selected track. */}
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

  // Detail mode: `activePhase` indexes into `selectedTrack.phases` for the checklist + SVG nodes.
  const Icon = selectedTrack.icon;
  const phase = selectedTrack.phases[activePhase];
  const a = accents[selectedTrack.accent];

  return (
    <section className="space-y-8">
      <BackButton onClick={onBack} label={backLabel} />

      <div className="cyber-panel relative overflow-hidden px-6 py-10 md:px-12 md:py-12">
        <div
          className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${a.topBar} to-transparent`}
          aria-hidden
        />
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-5">
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-xl border ${a.iconBorder} ${a.iconBg} ${a.iconText}`}
            >
              <Icon size={28} aria-hidden />
            </span>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${a.subtitle}`}>{selectedTrack.subtitle}</p>
              <h2 className="mt-2 text-3xl font-black text-blue-50 md:text-4xl">{selectedTrack.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">{selectedTrack.desc}</p>
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
            <span key={skill} className={`rounded-md border px-2.5 py-1 text-xs ${a.chipBorder} ${a.chipBg} ${a.chipText}`}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <VisualRoadmap phases={selectedTrack.phases} activePhase={activePhase} setActivePhase={setActivePhase} />

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
            onClick={() => setActivePhase(Math.min(selectedTrack.phases.length - 1, activePhase + 1))}
            disabled={activePhase === selectedTrack.phases.length - 1}
            className="cyber-button inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next phase <FaArrowRight aria-hidden />
          </button>
        </div>
      </div>

      <TrackPracticePanel track={selectedTrack} />

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

/**
 * Decorative journey strip: fixed five node positions, Bezier path, stroke-dash “progress” by `activePhase`.
 * Desktop: overlaid buttons on SVG; mobile: vertical timeline (same `setActivePhase` handler).
 */
function VisualRoadmap({
  phases,
  activePhase,
  setActivePhase,
}: {
  phases: Track["phases"];
  activePhase: number;
  setActivePhase: (i: number) => void;
}) {
  // Percent coords for five stops; must stay aligned with `Track.phases.length` (5 phases).
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

  // Single cubic segments between consecutive nodes (control points share horizontal midpoint).
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

  // Map phase index → partial stroke length on the progress path (`pathLength={100}` on the overlay path).
  const totalSegments = phases.length - 1;
  const progressPct = totalSegments > 0 ? (activePhase / totalSegments) * 100 : 0;

  return (
    <div className="cyber-panel relative overflow-hidden px-4 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">Five-phase roadmap</p>
          <h3 className="mt-2 text-xl font-bold text-blue-50 md:text-2xl">Tap a stop to jump to that phase.</h3>
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
            <linearGradient id="prog-roadmap-progress" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id="prog-roadmap-glow" x="-20%" y="-20%" width="140%" height="140%">
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
            stroke="url(#prog-roadmap-progress)"
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${progressPct} 100`}
            filter="url(#prog-roadmap-glow)"
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
                    ? "scale-110 border-blue-200 bg-blue-500 text-slate-950 shadow-[0_0_32px_rgba(96,165,250,0.75)]"
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
                  <span className={`block text-sm font-bold ${isActive ? "text-blue-50" : "text-slate-200"}`}>{p.title}</span>
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

/** Small checklist panel reused for roles / generic bullets on the roadmap. */
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

/** Two-column section title row; optional `right` slot for CTAs (e.g. “Find my fit”). */
function SectionHeading({ kicker, title, right }: { kicker: string; title: string; right?: ReactNode }) {
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

/** Uppercase text control used from assessment/results/roadmap subviews. */
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
