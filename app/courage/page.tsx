"use client";

import { AiFillFileText, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import OpsDashboard from "../components/OpsDashboard";
import ProjectRadar from "../components/ProjectRadar";

export default function CouragePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-20 pt-12 md:px-8">
      <section className="cyber-panel flex flex-col items-center px-6 py-10 text-center">
        <img
          src="/images/Courage2.jpg"
          alt="Courage Tikum"
          className="h-40 w-40 rounded-full border-4 border-blue-300/60 object-cover shadow-[0_0_40px_rgba(59,130,246,0.35)]"
        />
        <h1 className="mt-4 text-4xl font-black text-blue-100">Courage Tikum</h1>
        <p className="mt-1 text-lg font-semibold uppercase tracking-[0.14em] text-slate-300">Programmer</p>
        <div className="mt-5 flex items-center gap-5">
          <a href="https://www.linkedin.com/in/couragetikumfsu/" target="_blank" rel="noopener noreferrer">
            <AiFillLinkedin size={36} className="text-blue-200 transition hover:text-blue-400" />
          </a>
          <a href="mailto:mctikum0@frostburg.edu?cc=couragetikum@gmail.com" target="_blank" rel="noopener noreferrer">
            <AiFillMail size={36} className="text-blue-200 transition hover:text-blue-400" />
          </a>
          <a
            href="https://docs.google.com/document/d/1wSgEtoFXH6y1dLjL7pKwdqwOJ9X1JoZT7ysAdPUO8bo/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillFileText size={36} className="text-blue-200 transition hover:text-blue-400" />
          </a>
        </div>
      </section>

      <OpsDashboard />

      <ProjectRadar />

      <section className="cyber-panel p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Timeline</p>
        <h2 className="text-3xl font-black text-blue-100">Experience & Growth</h2>
        <div className="mt-8 flex justify-center">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <li>
              <div className="timeline-middle text-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <img src="/images/fsu.jpg" alt="Frostburg State University" className="h-20 w-20 rounded-full" />
                <time className="font-mono italic text-base text-slate-200">Aug 2020</time>
                <div className="text-base font-black text-blue-100">Frostburg State University</div>
                <p className="text-base text-slate-200">
                  Officially enrolled with a major in Computer Science and a minor in Mathematics.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle text-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <img src="/images/SPARKLabs.jpg" alt="Spark Labs" className="h-20 w-20 rounded-full" />
                <time className="font-mono italic text-base text-slate-200">Jan 2023</time>
                <div className="text-base font-black text-blue-100">Spark Innovation Lab</div>
                <p className="text-base text-slate-200">
                  Co-created an innovation space for practical projects across AI, app development, research, and robotics.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle text-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <img src="/images/twc.jpeg" alt="The Washington Center" className="h-20 w-20 rounded-full" />
                <time className="font-mono italic text-base text-slate-200">May 2024</time>
                <div className="text-base font-black text-blue-100">The Washington Center</div>
                <p className="text-base text-slate-200">
                  Developed professionally through networking, mentorship, and applied internship experience.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle text-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <img src="/images/Exelpn.jpg" alt="Exelon" className="h-20 w-20 rounded-full bg-white object-contain p-1" />
                <time className="font-mono italic text-base text-slate-200">Jan 2025 - Aug 2025</time>
                <div className="text-base font-black text-blue-100">Technical Data Venture Internship - Exelon</div>
                <p className="text-base text-slate-200">
                  Supported due diligence for four venture investments and automated data/reporting workflows across 37 portfolio companies.
                </p>
                <p className="text-base text-slate-200">
                  Built Python analysis and event-automation systems for 200+ investor participants.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle text-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <img src="/images/Exelpn.jpg" alt="Exelon" className="h-20 w-20 rounded-full bg-white object-contain p-1" />
                <time className="font-mono italic text-base text-slate-200">Aug 2025 - Dec 2025</time>
                <div className="text-base font-black text-blue-100">Graduate Assistant - Department of Computer Science</div>
                <p className="text-base text-slate-200">
                  Taught Python and Java labs to 40+ students, graded assignments, and supported semester projects.
                </p>
                <p className="text-base text-slate-200">
                  Conducted research and built student-assistant software prototypes for class scheduling/resources.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle text-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-end mb-10">
                <img src="/images/fsu.jpg" alt="Frostburg State University" className="h-20 w-20 rounded-full" />
                <time className="font-mono italic text-base text-slate-200">December 2025</time>
                <div className="text-base font-black text-blue-100">Graduated with a Master&apos;s Degree in Computer Science</div>
                <p className="text-base text-slate-200">
                  Completed graduate studies in Computer Science with a focus on practical software and systems development.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="cyber-panel p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">End Node</p>
        <p className="mt-2 text-2xl font-bold text-blue-100">Always Building. Always Learning.</p>
        <p className="mt-2 text-sm text-slate-300">TechDive LLC | Courage Tikum</p>
      </section>
    </div>
  );
}
