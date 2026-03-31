const timeline = [
  "Mon: Shipped live terminal assistant interaction updates",
  "Tue: Added network topology and globe-mode background engine",
  "Wed: Built SOC alert ticker + radar project explorer",
  "Thu: Preparing AI terminal backend integration",
];

export default function OpsDashboard() {
  return (
    <section className="cyber-panel p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Personal Ops Dashboard</p>
      <h3 className="text-2xl font-bold text-blue-100">Mission Control</h3>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <article className="rounded-md border border-blue-500/20 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Current Track</p>
          <p className="mt-2 text-sm text-slate-200">Vulnerability Analyist & Vulnerability Management</p>
        </article>
        <article className="rounded-md border border-blue-500/20 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Current Milestones
          </p>

          <ul className="mt-2 list-disc pl-5 text-sm text-slate-200 space-y-1">
            <li>Security+ Earned</li>
            <li>Nessus Scanner Labs Completed</li>
            <li>Microsoft Azure and Sentinel Labs Completed</li>
          </ul>

        </article>
        <article className="rounded-md border border-blue-500/20 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Now Building</p>
          <p className="mt-2 text-sm text-slate-200">AI-ready terminal assistant and interactive project intelligence dashboard.</p>
        </article>
      </div>

      <div className="mt-5 rounded-md border border-blue-500/20 bg-slate-950/70 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Timeline Updates</p>
        <ul className="mt-3 space-y-2">
          {timeline.map((item) => (
            <li key={item} className="text-sm text-slate-200">
              - {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
