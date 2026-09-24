"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import InteractiveTerminal from "../components/minishell/InteractiveTerminal";
import WebserverDemo from "./webserver/WebserverDemo";
import TranscendenceGame from "../components/transcendence/TranscendenceGame";

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
  }
];

export default function Projects() {
  const [playTranscendence, setPlayTranscendence] = useState(false);
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="space-y-8">
        <h1 className="text-6xl md:text-8xl font-semibold leading-[0.92] tracking-tight">
          Building software
          <br />
          with precision.
        </h1>

        <p className="max-w-xl mb-16 text-xl leading-9 text-zinc-600">
          Full-stack software engineer focused on backend systems,
          networking, C++, Docker and modern web applications.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-32 border-y border-zinc-200">
        <div className="grid md:grid-cols-4">
          {[
            { value: "20+", label: "Projects built" },
            { value: "C / C++", label: "Systems programming" },
            { value: "TypeScript", label: "Backend & Frontend engineering" },
            { value: "Docker", label: "Interactive development environments" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`px-8 py-12 ${
                index !== 3 ? "md:border-r md:border-zinc-200" : ""
              }`}
            >
              <p className="text-3xl font-semibold tracking-tight text-zinc-900">
                {item.value}
              </p>
            
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

        {/* Minishell */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-500/10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-0">
            <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
              <div>
                <span className="inline-block rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  Featured · Systems Programming
                </span>

                <h3 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                  Minishell
                </h3>

                <p className="mt-4 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
                  A fully-functional Unix shell implemented from scratch in C.
                  Handles command parsing, built-ins, environment variables,
                  pipes, redirections, and signal management.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "C",
                    "Unix",
                    "Processes",
                    "Pipes",
                    "Redirections",
                    "Signals",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
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

            <div className="flex items-center border-l border-gray-800 bg-black/50 p-6 md:p-8 lg:p-10">
              <div className="w-full overflow-hidden rounded-xl border border-gray-800 bg-black/80">
                <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-gray-500">
                    minishell
                  </span>
                </div>

                <div className="min-h-[280px] p-4 font-mono text-xs text-green-400">
                  <InteractiveTerminal />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Webserver */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-500/10">
          <div className="p-8 md:p-10 lg:p-12">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-block rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  Featured · Networking & Systems
                </span>

                <h3 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                  Webserver
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
                  A custom HTTP/1.1 server written from scratch in C++17.
                  Implements sockets, non-blocking I/O with poll(), CGI,
                  routing, static files and HTTP methods.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "C++17",
                    "Sockets",
                    "poll()",
                    "CGI",
                    "HTTP/1.1",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="https://github.com/Isly91/PersonalWebServer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-blue-400 hover:text-white"
              >
                View on GitHub →
              </a>
            </div>

            {/* Interactive Webserver */}
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-black/50">
              <WebserverDemo />
            </div>
          </div>
        </div>

        {/* ---------------------- Transcendence ---------------------- */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-900 to-black text-white shadow-2xl transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-500/10">
          <div className="p-8 md:p-10 lg:p-12">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-block rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
                  Featured · Full-Stack Multiplayer
                </span>

                <h3 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                  Transcendence
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
                  A real-time multiplayer Pong game built during the 42/Codam curriculum.
                  Features authentication, structural database design, matchmaking, WebSockets, game physics,
                  SQLite, Docker and a complete frontend/backend architecture.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Fatify",
                    "TypeScript",
                    "SQLite",
                    "Prisma",
                    "React",
                    "TailwindCSS",
                    "WebSockets",
                    "Docker",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-1 text-xs font-medium text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
                
              <a
                href="https://github.com/Isly91/Transcendence"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-purple-400 hover:text-white"
              >
                View on GitHub →
              </a>
            </div>
                
            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-black">
              {!playTranscendence ? (
                <div className="relative aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <button
                      onClick={() => setPlayTranscendence(true)}
                      className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-purple-500/40"
                    >
                      ▶ Play Demo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-[700px] bg-black">
                  <button
                    onClick={() => setPlayTranscendence(false)}
                    className="absolute left-4 top-4 z-50 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white hover:text-black"
                  >
                    ← Back to Preview
                  </button>
              
                  <TranscendenceGame difficulty="easy" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* More Projects */}
        <div className="mt-32 border-t border-zinc-200 pt-24">
          {/* Header */}
          <div className="mb-20 max-w-3xl space-y-5">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              More Projects
            </p>

            <h3 className="text-5xl font-semibold leading-[0.95] tracking-[-0.02em] text-zinc-900">
              Systems programming
              <br />
              fundamentals.
            </h3>

            <p className="text-lg leading-8 text-zinc-600">
              Projects completed during Codam, focused on algorithms, operating systems,
              concurrency and graphics programming.
            </p>
          </div>

          {/* Projects */}
          <div className="space-y-6">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-zinc-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
              >
                <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                  {/* Left */}
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                      {project.category}
                    </p>
                  </div>
            
                  {/* Right */}
                  <div className="space-y-6">
                    {/* Title + Arrow */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-3xl font-semibold tracking-tight text-zinc-900">
                        {project.title}
                      </h4>
            
                      <ArrowUpRight className="h-6 w-6 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-900" />
                    </div>
            
                    <p className="max-w-2xl text-lg leading-8 text-zinc-600">
                      {project.description}
                    </p>
            
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-zinc-700 transition-all duration-300 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-300 group-hover:text-zinc-900">
                      <span>View source</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
<div className="mt-6">
  <a
    href="https://github.com/Isly91"
    target="_blank"
    rel="noopener noreferrer"
    className="group block rounded-3xl border border-zinc-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          More on GitHub
        </p>

        <h3 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Other Projects
        </h3>

        <p className="max-w-xl text-lg leading-8 text-zinc-600">
          Explore additional projects, experiments and coding challenges on my
          GitHub profile.
        </p>
      </div>

      <span className="text-3xl text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-900">
        ↗
      </span>
    </div>
  </a>
</div>
        </div>
      </div>
    </section>
  );
}
