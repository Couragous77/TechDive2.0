"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Line = { type: "cmd" | "out" | "sys"; text: string };

const commandOutputs: Record<string, string> = {
  help: "Commands: help, projects, skills, contact, clear",
  projects: "Recent: TechTrek, SIEM Labs, Vulnerability Management, Cybersecurity Learning Hub",
  skills: "Cybersecurity | SIEM | React | Next.js | Automation | Cloud",
  contact: "Email: jduru213@gmail.com | LinkedIn: /in/justin-duru-97159a250",
};

export default function TerminalPanel() {
  const [value, setValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [lines, setLines] = useState<Line[]>([]);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const beforeHistoryValueRef = useRef("");

  const visibleLines = useMemo(() => lines.slice(-12), [lines]);

  useEffect(() => {
    const box = outputRef.current;
    if (!box) return;
    box.scrollTop = box.scrollHeight;
  }, [visibleLines, isProcessing]);

  useEffect(() => {
    const bootSteps = [
      "booting techtrek-terminal...",
      "loading modules: chat-core, project-index, skill-map",
      "establishing secure shell...",
      "TechTrek Terminal v0.3 online.",
      "Type `help` to list available commands.",
    ];

    let index = 0;
    const runStep = () => {
      if (index >= bootSteps.length) {
        setIsBooting(false);
        return;
      }
      const text = bootSteps[index];
      setLines((prev) => [...prev, { type: index < 3 ? "sys" : "out", text }]);
      index += 1;
      window.setTimeout(runStep, 240);
    };

    runStep();
  }, []);

  const applyAutocomplete = () => {
    const current = value.trim().toLowerCase();
    if (!current) return;
    const options = Object.keys(commandOutputs).concat("clear");
    const match = options.find((option) => option.startsWith(current));
    if (match) {
      setValue(match);
    }
  };

  const navigateHistory = (direction: "up" | "down") => {
    const history = historyRef.current;
    if (history.length === 0) return;

    if (direction === "up") {
      if (historyIndexRef.current === -1) {
        beforeHistoryValueRef.current = value;
        historyIndexRef.current = history.length - 1;
      } else if (historyIndexRef.current > 0) {
        historyIndexRef.current -= 1;
      }
      setValue(history[historyIndexRef.current] ?? "");
      return;
    }

    if (historyIndexRef.current === -1) return;
    if (historyIndexRef.current < history.length - 1) {
      historyIndexRef.current += 1;
      setValue(history[historyIndexRef.current] ?? "");
    } else {
      historyIndexRef.current = -1;
      setValue(beforeHistoryValueRef.current);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isProcessing || isBooting) return;
    const cmd = value.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { type: "cmd", text: `visitor@techtrek:~$ ${cmd}` }]);
    historyRef.current.push(cmd);
    historyIndexRef.current = -1;
    beforeHistoryValueRef.current = "";
    setValue("");

    if (cmd === "clear") {
      setLines([{ type: "sys", text: "screen cleared." }]);
      return;
    }

    setIsProcessing(true);
    window.setTimeout(() => {
      const response = commandOutputs[cmd] ?? "Unknown command. Type `help`.";
      setLines((prev) => [...prev, { type: "out", text: response }]);
      setIsProcessing(false);
    }, 450);
  };

  return (
    <aside className="cyber-panel h-full min-h-[360px] p-4">
      <div className="mb-3 flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Terminal Assistant</p>
        <span className="text-xs text-slate-400">AI-ready shell</span>
      </div>

      <div
        ref={outputRef}
        className="h-[260px] space-y-1 overflow-auto rounded-md border border-blue-500/20 bg-slate-950/80 p-3 font-mono text-sm"
      >
        {visibleLines.map((line, idx) => (
          <p
            key={`${line.text}-${idx}`}
            className={
              line.type === "cmd"
                ? "text-red-400"
                : line.type === "sys"
                  ? "text-blue-300"
                  : "text-emerald-400"
            }
          >
            {line.text}
          </p>
        ))}
        {(isProcessing || isBooting) && (
          <p className="text-blue-300 terminal-caret">
            {isBooting ? "techtrek@assistant: initializing" : "techtrek@assistant: processing"}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-3">
        <label htmlFor="terminal-input" className="sr-only">
          Terminal command
        </label>
        <div className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-slate-900/70 px-3 py-2">
          <span className="font-mono text-sm text-red-400">visitor@techtrek:~$</span>
          <input
            id="terminal-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                navigateHistory("up");
              } else if (event.key === "ArrowDown") {
                event.preventDefault();
                navigateHistory("down");
              } else if (event.key === "Tab") {
                event.preventDefault();
                applyAutocomplete();
              }
            }}
            placeholder="type a command..."
            className="terminal-input w-full bg-transparent font-mono text-sm text-red-300 outline-none"
            autoComplete="off"
            spellCheck={false}
            disabled={isBooting}
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Tips: <span className="text-blue-300">Tab</span> autocomplete,{" "}
          <span className="text-blue-300">Arrow Up/Down</span> history
        </p>
      </form>
    </aside>
  );
}
