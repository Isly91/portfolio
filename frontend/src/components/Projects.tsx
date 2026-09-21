"use client";

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
  const [playTranscendence, setPlayTranscendence] = useState(false);
  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:px-8 md:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-200/20 to-transparent blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gradient-to-bl from-purple-200/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Featured Work
          </span>

          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Projects &
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>

            <p className="text-lg leading-8 text-gray-600">
              From low-level systems programming and algorithms to full-stack
              applications. Each project represents a learning opportunity and
              technical challenge.
            </p>
          </div>
          {/* intro projects */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
                { value: "23+", label: "Projects built" },
                { value: "42", label: "Codam projects completed" },
                { value: "3", label: "Interactive demos" },
                { value: "C -> React", label: "Systems to Full-Stack" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-800 bg-gray-900/60 p-5 text-center transition hover:border-cyan-500/40 hover:bg-gray-900"
              >
                <p className="text-3xl font-bold text-cyan-400">{item.value}</p>
                <p className="mt-2 text-sm text-gray-400">{item.label}</p>
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
                    "Docker",
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
                  Features authentication, matchmaking, WebSockets, game physics,
                  PostgreSQL, Docker and a complete frontend/backend architecture.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "React",
                    "NestJS",
                    "WebSockets",
                    "PostgreSQL",
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

        {/* Other Projects */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 md:p-10"
            >
              <div className="inline-flex w-fit">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  {project.category}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {project.title}
              </h3>

              <p className="mt-4 flex-grow text-base leading-7 text-gray-600">
                {project.description}
              </p>

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

              <div className="mt-8 border-t border-gray-200 pt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-all duration-300 hover:gap-3 hover:text-blue-600"
                >
                  View on GitHub
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}

          
        </div>
      </div>
    </section>
  );
}
