export default function CodeEditor() {
  const code = [
    "const engineer = {",
    '  name: "Isly Behluli",',
    '  role: "Software Engineer",',
    "",
    "  languages: [",
    '    "C",',
    '    "C++",',
    '    "TypeScript",',
    "  ],",
    "",
    "  stack: [",
    '    "React",',
    '    "Node.js",',
    '    "Docker",',
    "  ],",
    "",
    '  philosophy: "Build simple. Build reliable."',
    "};",
  ];

  return (
    <div className="overflow-hidden rounded-[36px] border border-emerald-900/40 bg-[#050505] shadow-[0_25px_80px_rgba(16,185,129,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-900/30 bg-[#0A0A0A] px-6 py-5">
        <div className="flex items-center gap-3">
          {/* Mac dots */}
          <div className="flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-500">
            developer.ts
          </p>
        </div>

        <span className="rounded-full border border-emerald-700/40 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
          TypeScript
        </span>
      </div>

      {/* Code */}
      <div className="overflow-x-auto bg-gradient-to-br from-[#050505] to-[#0B1110] p-8">
        <div className="space-y-1 font-mono text-[13px] leading-8">
          {code.map((line, index) => (
            <div key={index} className="grid grid-cols-[36px_1fr] gap-5">
              {/* Line number */}
              <span className="select-none text-right text-emerald-900">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Code */}
              <span className="text-emerald-300">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}