import { ArrowUpRight } from "lucide-react";

export default function Skills() {
  const skills = [
    {
      title: "Systems Programming",
      description:
        "Building software close to the operating system with a focus on memory management, networking, concurrency and low-level performance.",
      technologies: ["C", "C++", "Linux", "Unix", "Bash"],
    },
    {
      title: "Backend Engineering",
      description:
        "Designing APIs, databases and scalable server-side applications using TypeScript, Fastify and Prisma.",
      technologies: ["Node.js", "TypeScript", "Fastify", "Prisma", "SQLite"],
    },
    {
      title: "Frontend Development",
      description:
        "Crafting responsive interfaces with React, Next.js and performance-first architecture.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Vite"],
    },
    {
      title: "Infrastructure",
      description:
        "Containerized development environments, networking, reverse proxies and reproducible deployment workflows.",
      technologies: ["Docker", "Docker Compose", "Nginx", "Git"],
    },
  ];

  return (
    <section
      id="skills"
      className="border-t border-zinc-200 bg-[#FAFAF9] px-6 py-40 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-32 max-w-4xl space-y-8">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Skills
          </p>

          <h2 className="text-6xl font-semibold leading-[0.95] tracking-[-0.03em] text-zinc-900 md:text-7xl">
            Technologies behind
            <br />
            every project.
          </h2>

          <p className="max-w-2xl text-xl leading-9 text-zinc-600">
            I enjoy working across the entire software stack — from systems
            programming in C and C++ to scalable backend services, modern React
            applications and Docker-based infrastructure.
          </p>
        </div>

        {/* Skills List */}
        <div className="space-y-5">
  {skills.map((skill) => (
    <article
      key={skill.title}
      className="group rounded-3xl border border-zinc-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
    >
      <div className="grid gap-8 md:grid-cols-[240px_1fr] md:items-start">
        {/* Left */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
            {skill.title}
          </h3>

          <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-900" />
        </div>

        {/* Right */}
        <div className="space-y-8">
          <p className="max-w-2xl text-lg leading-9 text-zinc-600">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {skill.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-zinc-700 transition-colors duration-300 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  ))}
</div>

        {/* Bottom Summary */}
        <div className="mt-32 grid gap-12 border-t border-zinc-200 pt-12 md:grid-cols-3">
          {[
            {
              label: "Languages",
              value: "C · C++ · TypeScript · JavaScript · SQL",
            },
            {
              label: "Frameworks",
              value: "React · Next.js · Fastify · Prisma",
            },
            {
              label: "Infrastructure",
              value: "Docker · Nginx · Linux · Git",
            },
          ].map((item) => (
            <div key={item.label} className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                {item.label}
              </p>

              <p className="text-lg leading-8 text-zinc-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}