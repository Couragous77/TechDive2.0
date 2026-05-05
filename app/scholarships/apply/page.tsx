"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaMoneyBillWave,
  FaUserGraduate,
} from "react-icons/fa";

type FormState = {
  fullName: string;
  email: string;
  school: string;
  stage: string;
  why: string;
  goals: string;
  portfolio: string;
  agreed: boolean;
};

const eligibility = [
  "Enrolled in school or a recognized program",
  "Pursuing programming, cybersecurity, or adjacent tech",
  "U.S. resident or in a U.S.-based program",
  "Minimum 2.5 GPA or equivalent",
];

const fitSignals = ["Clear direction", "Proof of effort", "Specific use for the funds"];

const requiredMaterials = [
  "Two short answers",
  "Portfolio link optional",
  "Accuracy confirmation",
];

const stageOptions = [
  "High school senior",
  "Undergraduate",
  "Graduate student",
  "Bootcamp / certificate program",
  "Career switcher",
  "Other",
];

const emptyForm: FormState = {
  fullName: "",
  email: "",
  school: "",
  stage: "",
  why: "",
  goals: "",
  portfolio: "",
  agreed: false,
};

export default function ScholarshipApplyPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-20 pt-14 md:px-8 md:pt-20">
      <section className="cyber-panel flex flex-col gap-8 p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
              TechDive Scholarship
            </p>
            <h1 className="text-3xl font-black text-blue-50 md:text-5xl">
              Scholarship application
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">Short form. Clear answers.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
            <FaInfoCircle size={11} aria-hidden /> Draft only
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-slate-700/60 bg-slate-950/50 p-4">
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
          <div className="flex items-center gap-3 rounded-lg border border-slate-700/60 bg-slate-950/50 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-500/10 text-cyan-200">
              <FaCalendarAlt size={16} aria-hidden />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Deadline
              </div>
              <div className="text-sm font-bold text-blue-50">TBD</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-slate-700/60 bg-slate-950/50 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-violet-400/40 bg-violet-500/10 text-violet-200">
              <FaUserGraduate size={16} aria-hidden />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Decision
              </div>
              <div className="text-sm font-bold text-blue-50">4 weeks</div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                Eligibility
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <FaCheckCircle
                      className="mt-0.5 shrink-0 text-emerald-400"
                      size={13}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                Fit
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
                {fitSignals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                Materials
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
                {requiredMaterials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-start gap-4 rounded-lg border border-emerald-400/40 bg-emerald-500/5 p-6">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-emerald-300" size={22} aria-hidden />
                <h3 className="text-lg font-bold text-emerald-100">Draft saved</h3>
              </div>
              <p className="text-sm text-slate-300">
                Thanks, {form.fullName || "applicant"}. This is local only. Nothing was submitted.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setSubmitted(false);
                }}
                className="cyber-button-secondary"
              >
                Reset form
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="fullName" required>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email" htmlFor="email" required>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="School" htmlFor="school" required>
                  <input
                    id="school"
                    type="text"
                    required
                    value={form.school}
                    onChange={(e) => update("school", e.target.value)}
                    className={inputClass}
                    placeholder="School or program"
                  />
                </Field>
                <Field label="Stage" htmlFor="stage" required>
                  <select
                    id="stage"
                    required
                    value={form.stage}
                    onChange={(e) => update("stage", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select...</option>
                    {stageOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Why apply?" htmlFor="why" hint="~150" required>
                <textarea
                  id="why"
                  required
                  rows={4}
                  maxLength={1500}
                  value={form.why}
                  onChange={(e) => update("why", e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Your current situation."
                />
              </Field>

              <Field
                label="What will it fund?"
                htmlFor="goals"
                hint="~150"
                required
              >
                <textarea
                  id="goals"
                  required
                  rows={4}
                  maxLength={1500}
                  value={form.goals}
                  onChange={(e) => update("goals", e.target.value)}
                  className={`${inputClass} resize-y`}
                  placeholder="Tuition, certs, gear, or time."
                />
              </Field>

              <Field label="Portfolio link" htmlFor="portfolio" hint="Optional">
                <input
                  id="portfolio"
                  type="url"
                  value={form.portfolio}
                  onChange={(e) => update("portfolio", e.target.value)}
                  className={inputClass}
                  placeholder="https://github.com/you"
                />
              </Field>

              <label className="flex items-start gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  required
                  checked={form.agreed}
                  onChange={(e) => update("agreed", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border border-slate-600 bg-slate-950 accent-blue-400"
                />
                <span>I confirm this is accurate.</span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-[11px] text-slate-500">
                  Draft only. Nothing leaves your browser.
                </p>
                <button type="submit" className="cyber-button-primary">
                  Submit application
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/scholarships"
          className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300 hover:text-blue-200"
        >
          Back to Scholarship Hub
        </Link>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-blue-50 placeholder:text-slate-500 transition focus:border-blue-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400/30";

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300"
      >
        <span>
          {label}
          {required && <span className="ml-1 text-blue-300">*</span>}
        </span>
        {hint && (
          <span className="text-[10px] font-normal normal-case tracking-normal text-slate-500">
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
