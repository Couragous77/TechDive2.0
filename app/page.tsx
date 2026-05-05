import Image from "next/image";
import Link from "next/link";
import TerminalPanel from "./components/TerminalPanel";
import SocAlertFeed from "./components/SocAlertFeed";
import PurposePanel from "./components/PurposePanel";
import Reveal from "./components/Reveal";

const resourceCards = [
  {
    title: "Programming",
    description: "Build projects, sharpen fundamentals, and level up with hands-on guides.",
    image: "/images/programming.jpg",
    href: "/programming",
  },
  {
    title: "Cybersecurity",
    description: "Train in blue-team workflows, threat detection, and security labs.",
    image: "/images/cyber.jpg",
    href: "/cybersecurity",
  },
];

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pb-16 pt-14 md:px-8 md:pt-20">
      <section className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <div className="cyber-panel px-6 py-12 md:px-12 md:py-16">
          <p className="fade-in-up text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
            TechTrek Network
          </p>
          <h1 className="fade-in-up delay-100 mt-4 max-w-4xl text-4xl font-black leading-tight text-blue-50 md:text-6xl">
            Discover the Future of Tech
            <span className="block text-blue-300">Unlock New Possibilities</span>
          </h1>
          <p className="fade-in-up delay-200 mt-5 max-w-3xl text-base text-slate-300 md:text-lg">
            A student-built hub for learning, experimentation, and career direction in modern tech.
            Explore focused pathways, interactive activities, and practical resources designed to help
            you move from curious to confident.
          </p>
          <div className="fade-in-up delay-300 mt-8 flex flex-wrap gap-3">
            <Link href="#resources-section" className="cyber-button">
              Explore Resources
            </Link>
            <Link href="#motive-section" className="cyber-button-secondary">
              View Our Story
            </Link>
          </div>
        </div>
        <TerminalPanel />
      </section>

      <Reveal>
        <SocAlertFeed />
      </Reveal>

      <section id="about-section" className="space-y-8">
        <Reveal className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Mission</p>
          <h2 className="text-3xl font-extrabold text-blue-50 md:text-5xl">Purpose</h2>
          <p className="mx-auto max-w-2xl text-slate-300">Learn what drives TechTrek and why it matters.</p>
        </Reveal>
        <PurposePanel />
      </section>

      <section id="motive-section" className="space-y-8">
        <Reveal className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Origin Story</p>
          <h2 className="text-3xl font-extrabold text-blue-50 md:text-5xl">The Motive</h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={0}>
            <Link href="/justin" className="cyber-panel block p-6 text-center transition hover:-translate-y-1">
              <Image
                src="/images/Justin.jpg"
                alt="Justin Duru"
                width={180}
                height={180}
                className="mx-auto h-36 w-36 rounded-full border-2 border-blue-300/70 object-cover md:h-44 md:w-44"
              />
              <p className="mt-4 text-xl font-bold text-blue-100">Justin Duru</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">View Profile</p>
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <Link href="/courage" className="cyber-panel block p-6 text-center transition hover:-translate-y-1">
              <Image
                src="/images/headShot.jpg"
                alt="Courage Tikum"
                width={180}
                height={180}
                className="mx-auto h-36 w-36 rounded-full border-2 border-blue-300/70 object-cover md:h-44 md:w-44"
              />
              <p className="mt-4 text-xl font-bold text-blue-100">Courage Tikum</p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">View Profile</p>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={250}>
          <p className="mx-auto max-w-4xl text-center text-slate-300">
            TechDive started during our internship in D.C. with a simple mission: make technology more
            accessible by combining practical learning resources, real projects, and up-to-date insights
            in one place.
          </p>
        </Reveal>
      </section>

      <section id="resources-section" className="space-y-8">
        <Reveal className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">Skill Paths</p>
          <h2 className="text-3xl font-extrabold text-blue-50 md:text-5xl">Resources</h2>
          <p className="mx-auto max-w-2xl text-slate-300">
            Explore curated tracks to build technical depth in programming and cybersecurity.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {resourceCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 120}>
              <Link href={card.href} className="cyber-panel group block p-5">
                <div className="overflow-hidden rounded-lg border border-blue-500/30">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={700}
                    height={380}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-blue-100">{card.title}</h3>
                <p className="mt-2 text-slate-300">{card.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                  Explore Track
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={resourceCards.length * 120}>
            <Link href="/scholarships" className="cyber-panel group block p-5">
              <div className="relative h-52 overflow-hidden rounded-lg border border-blue-500/30">
                <Image
                  src="/images/Graduation-Cap-Clipart-edit-online.png"
                  alt="Graduation cap illustration"
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-blue-100">Scholarship Hub</h3>
              <p className="mt-2 text-slate-300">Curated scholarships to help fund your tech journey.</p>
              <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                Browse Scholarships
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-blue-500/20 pt-6 text-center text-sm text-slate-400">
        <p>&copy; 2026 TechTrek</p>
      </footer>
    </div>
  );
}
