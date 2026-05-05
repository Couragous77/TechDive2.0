import Link from "next/link";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaInfoCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

type Scholarship = {
  name: string;
  blurb: string;
  href: string;
  tag: string;
};

const scholarships: Scholarship[] = [
  {
    name: "Fastweb",
    blurb: "Personalized matches from a database of 1.5M+ scholarships.",
    href: "https://www.fastweb.com",
    tag: "General",
  },
  {
    name: "Scholarships.com",
    blurb: "Free search tool with 3.7M+ awards and a profile-based match.",
    href: "https://www.scholarships.com",
    tag: "General",
  },
  {
    name: "BigFuture",
    blurb: "College Board's free scholarship search with $300M+ in awards.",
    href: "https://bigfuture.collegeboard.org/pay-for-college/scholarship-search",
    tag: "General",
  },
  {
    name: "Bold.org",
    blurb: "Exclusive scholarships you can apply to with one profile.",
    href: "https://bold.org/scholarships/",
    tag: "General",
  },
  {
    name: "UNCF",
    blurb: "Scholarships and fellowships for students of color.",
    href: "https://uncf.org/scholarships",
    tag: "Diversity",
  },
  {
    name: "SHPE",
    blurb: "Awards for Hispanic students in STEM fields.",
    href: "https://shpe.org/students/scholarships/",
    tag: "STEM",
  },
  {
    name: "Google Scholarships",
    blurb: "Generation Google, Lime, and tech-focused funding.",
    href: "https://buildyourfuture.withgoogle.com/scholarships",
    tag: "Tech",
  },
  {
    name: "Microsoft Scholarships",
    blurb: "Tuition awards for students pursuing tech careers.",
    href: "https://careers.microsoft.com/v2/global/en/scholarships",
    tag: "Tech",
  },
  {
    name: "SWE",
    blurb: "Society of Women Engineers scholarships for women in STEM.",
    href: "https://swe.org/scholarships/",
    tag: "STEM",
  },
];

export default function ScholarshipsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-20 pt-14 md:px-8 md:pt-20">
      <section className="cyber-panel flex flex-col items-center gap-4 px-6 py-12 text-center md:py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/10">
          <FaGraduationCap className="text-blue-200" size={36} aria-hidden />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
          Funding Your Path
        </p>
        <h1 className="text-4xl font-black text-blue-50 md:text-6xl">Scholarship Hub</h1>
        <p className="max-w-xl text-slate-300">Apply or browse more funding sources.</p>
      </section>

      <section>
        <Link href="/scholarships/apply" className="cyber-panel group block p-6 transition hover:-translate-y-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                TechDive Scholarship
              </p>
              <h2 className="mt-2 text-3xl font-black text-blue-50">Apply</h2>
              <p className="mt-2 max-w-lg text-sm text-slate-300">
                Separate application page. Short form.
              </p>
            </div>
            <FaArrowRight
              className="mt-1 shrink-0 text-blue-300 transition group-hover:translate-x-1"
              size={18}
              aria-hidden
            />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-700/60 bg-slate-950/50 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-500/10 text-emerald-200">
                  <FaMoneyBillWave size={16} aria-hidden />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Award
                  </div>
                  <div className="text-sm font-bold text-blue-50">$1,000 - $5,000</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-slate-700/60 bg-slate-950/50 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-amber-400/40 bg-amber-500/10 text-amber-200">
                  <FaInfoCircle size={14} aria-hidden />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </div>
                  <div className="text-sm font-bold text-blue-50">Draft only</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
            More options
          </p>
          <h2 className="mt-2 text-2xl font-black text-blue-50 md:text-3xl">
            External resources
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-panel group flex flex-col gap-3 p-6 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  {s.tag}
                </span>
                <FaExternalLinkAlt
                  className="text-slate-400 transition group-hover:text-blue-300"
                  size={12}
                  aria-hidden
                />
              </div>
              <h2 className="text-xl font-bold text-blue-100">{s.name}</h2>
              <p className="text-sm text-slate-300">{s.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/#resources-section"
          className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300 hover:text-blue-200"
        >
          Back to Resources
        </Link>
      </div>
    </div>
  );
}
