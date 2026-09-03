export default function CodeEditor() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 shadow-2xl">
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-gray-800 px-5 py-4">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />

        <span className="ml-4 text-xs text-gray-500">
          developer.ts
        </span>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-6 font-mono text-sm leading-7">
        <div>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-300">developer</span> = {"{"}
        </div>

        <div className="pl-6">
          <span className="text-blue-300">name</span>:{" "}
          <span className="text-green-300">"Isly"</span>,
        </div>

        <div className="pl-6">
          <span className="text-blue-300">role</span>:{" "}
          <span className="text-green-300">"Software Engineer"</span>,
        </div>

        <div className="pl-6">
          <span className="text-blue-300">stack</span>: [
        </div>

        <div className="pl-12">
          <span className="text-green-300">"C++"</span>,
        </div>

        <div className="pl-12">
          <span className="text-green-300">"TypeScript"</span>,
        </div>

        <div className="pl-12">
          <span className="text-green-300">"React"</span>,
        </div>

        <div className="pl-12">
          <span className="text-green-300">"Node.js"</span>,
        </div>

        <div className="pl-6">],</div>

        <div className="pl-6">
          <span className="text-blue-300">passion</span>:{" "}
          <span className="text-green-300">"building things"</span>,
        </div>

        <div>{"};"}</div>
      </div>
    </div>
  );
}