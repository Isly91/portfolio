export default function Skills() {
  const skills = [
    {
      title: "Systems",
      description:
        "Low-level programming, memory management and system-oriented development.",
      technologies: ["C", "C++", "Linux", "Unix", "Bash"],
    },
    {
      title: "Backend",
      description:
        "Designing APIs, databases and server-side applications.",
      technologies: ["Node.js", "TypeScript", "Fastify", "Prisma", "SQLite"],
    },
    {
      title: "Frontend",
      description:
        "Building modern, responsive and interactive web applications.",
      technologies: ["React", "Next.js", "Vite", "Tailwind CSS", "JavaScript"],
    },
    {
      title: "Infrastructure",
      description:
        "Containerization, deployment and development environments.",
      technologies: ["Docker", "Docker Compose", "Nginx", "Git"],
    },
  ];

  return (
    <section id="skills" className="px-8 py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
          Skills
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Tools I use to build.
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="rounded-3xl border border-gray-200 p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold">{skill.title}</h3>

              <p className="mt-4 leading-7 text-gray-600">
                {skill.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {skill.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}