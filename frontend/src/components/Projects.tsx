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
    <section id="projects" className="relative px-6 py-24 md:px-8 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-200/20 to-transparent blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gradient-to-bl from-purple-200/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Featured Work
          </span>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Projects &
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>

            <p className="text-lg leading-8 text-gray-600">
              From low-level systems programming and algorithms to full-stack applications. Each project represents a learning opportunity and technical challenge.
            </p>
          </div>
        </div>

        {/* Minishell - Featured */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400/50">
          <div className="grid gap-8 lg:gap-0 lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-500/30">
                  Featured · Systems Programming
                </span>

                <h3 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
                  Minishell
                </h3>

                <p className="mt-4 max-w-xl text-base md:text-lg leading-8 text-gray-300">
                  A fully-functional Unix shell implemented from scratch in C. Handles command parsing, built-ins, environment variables, pipes, redirections, and signal management.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["C", "Unix", "Processes", "Pipes", "Redirections", "Signals"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <a
                  href="https://github.com/Isly91/minishell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  View source →
                </a>
              </div>
            </div>

            {/* Terminal Preview */}
            <div className="flex items-center bg-black/50 p-6 md:p-8 lg:p-10 border-l border-gray-800">
              <div className="w-full overflow-hidden rounded-xl border border-gray-800 bg-black/80">
                <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-gray-500">minishell</span>
                </div>
                <div className="min-h-[280px] p-4 font-mono text-xs text-green-400">
                  <InteractiveTerminal />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 md:p-10 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Category Badge */}
              <div className="inline-flex w-fit">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-4 flex-grow text-base leading-7 text-gray-600">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-xs font-semibold text-blue-700 transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer Link */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-blue-600 hover:gap-3"
                >
                  View on GitHub
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}

          {/* Transcendence */}
          <article className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 md:p-10 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
            {/* Category Badge */}
            <div className="inline-flex w-fit">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Full-Stack Web
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              Transcendence
            </h3>

            {/* Description */}
            <p className="mt-4 flex-grow text-base leading-7 text-gray-600">
              A real-time multiplayer web application combining frontend, backend, authentication, game logic and deployment.
            </p>

            {/* Technologies */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["TypeScript", "React", "Node.js", "WebSockets", "Docker"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-xs font-semibold text-blue-700 transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
              <a
                href="/projects/transcendence"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-blue-600 hover:gap-3"
              >
                Play demo
                <span>→</span>
              </a>
              <a
                href="https://github.com/Isly91/Transcendence"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-all duration-300 hover:text-blue-600 hover:gap-3"
              >
                View on GitHub
                <span>→</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
