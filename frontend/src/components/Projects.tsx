import InteractiveTerminal from "../components/minishell/InteractiveTerminal";

const projects = [
  {
    title: "Push_swap",
    category: "Algorithms",
    description:
      "An algorithmic project from the 42/Codam curriculum focused on sorting integers using two stacks and a restricted set of operations. The implementation uses a radix-based sorting strategy.",
    technologies: ["C", "Algorithms", "Linked Lists", "Radix Sort"],
    github: "https://github.com/Isly91/push_swap",
  },
  {
    title: "Philosophers",
    category: "Concurrency",
    description:
      "A concurrency project focused on threads, mutexes and synchronization, exploring the classic dining philosophers problem.",
    technologies: ["C", "Threads", "Mutexes", "Concurrency"],
    github: "https://github.com/Isly91/Philosophers",
  },
  {
    title: "Fract-ol",
    category: "Computer Graphics",
    description:
      "An interactive fractal visualization project built from scratch, combining mathematical concepts with real-time graphical rendering.",
    technologies: ["C", "Graphics", "Math"],
    github: "https://github.com/Isly91/fractol",
  },
  {
    title: "ft_printf",
    category: "C Programming",
    description:
      "A custom implementation of the printf function, designed to reproduce formatted output and handle variadic arguments.",
    technologies: ["C", "Variadic Functions"],
    github: "https://github.com/Isly91/ft_printf",
  },
  {
    title: "libasm",
    category: "Assembly",
    description:
      "A low-level programming project implementing standard C library functions using x86-64 assembly.",
    technologies: ["Assembly", "x86-64", "Linux"],
    github: "https://github.com/Isly91/libasm",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-8 py-32">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Projects
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Things I've built.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            From low-level systems programming and algorithms to full-stack
            applications.
          </p>
        </div>

        {/* Minishell */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 text-white shadow-2xl">
          <div className="grid lg:grid-cols-2">

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                Featured project · Systems Programming
              </p>

              <h3 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                Minishell
              </h3>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
                A Unix shell implemented from scratch as part of the 42/Codam
                curriculum. The project handles command parsing, built-ins,
                environment variables, pipes, redirections and signals.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "C",
                  "Unix",
                  "Processes",
                  "Pipes",
                  "Redirections",
                  "Signals",
                ].map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="https://github.com/Isly91/minishell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-700 px-6 py-3 text-sm font-medium transition hover:bg-gray-900 hover:text-green-400"
                >
                  View source ↗
                </a>
              </div>
            </div>

            {/* Terminal preview */}
            <div className="flex items-center bg-gray-900 p-6 md:p-10">
              <div className="w-full overflow-hidden rounded-2xl border border-gray-800 bg-black">

                {/* Terminal header */}
                <div className="flex items-center gap-2 border-b border-gray-800 px-5 py-4">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />

                  <span className="ml-3 text-xs text-gray-500">
                    <p className="mt-3 text-center text-xs text-gray-500">
                      Test my own shell commands →
                    </p>
                  </span>
                </div>

                {/* Terminal */}
                <div className="min-h-[320px] p-6 font-mono text-sm leading-7">
                  <InteractiveTerminal />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex min-h-[390px] flex-col rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-2xl md:p-10"
            >
              {/* Top */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    {project.category}
                  </p>
          
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                    {project.title}
                  </h3>
                </div>
          
              {/* Description */}
              <p className="mt-7 max-w-xl leading-7 text-gray-600">
                {project.description}
              </p>
          
              {/* Technologies */}
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors duration-300 group-hover:bg-gray-950 group-hover:text-white"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              
              {/* Footer */}
              <div className="mt-auto pt-10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors duration-300 hover:text-black"
                >
                  View on GitHub
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </article>
          ))}

          {/* Transcendence */}
          <article className="group flex min-h-[390px] flex-col rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-2xl md:p-10">
            {/* Top */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Full-stack application
                </p>
        
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                  Transcendence
                </h3>
              </div>
            </div>
        
            {/* Description */}
            <p className="mt-7 max-w-xl leading-7 text-gray-600">
              A real-time multiplayer web application combining frontend, backend,
              authentication, game logic and deployment.
            </p>
        
            {/* Technologies */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["TypeScript", "React", "Node.js", "WebSockets", "Docker"].map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors duration-300 group-hover:bg-gray-950 group-hover:text-white"
                  >
                    {technology}
                  </span>
                ),
              )}
            </div>
            
            {/* Footer */}
            <div className="mt-auto flex flex-wrap gap-3 pt-10">
              <a
                href="/projects/transcendence"
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800"
              >
                Play demo →
              </a>
            
              <a
                href="https://github.com/Isly91/Transcendence"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-all duration-300 hover:border-gray-950 hover:text-black"
              >
                GitHub ↗
              </a>
            </div>
          </article>
        </div>

      </div>
    </section>
  );
}
