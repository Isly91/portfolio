export default function Skills() {
  const skills = [
    {
      title: "Systems",
      icon: "⚙️",
      description:
        "Low-level programming, memory management and system-oriented development.",
      technologies: ["C", "C++", "Linux", "Unix", "Bash"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Backend",
      icon: "🔧",
      description:
        "Designing scalable APIs, databases and server-side applications.",
      technologies: ["Node.js", "TypeScript", "Fastify", "Prisma", "SQLite"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Frontend",
      icon: "✨",
      description:
        "Building modern, responsive and interactive web applications.",
      technologies: ["React", "Next.js", "Vite", "Tailwind CSS", "JavaScript"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Infrastructure",
      icon: "🚀",
      description:
        "Containerization, deployment and development environments.",
      technologies: ["Docker", "Docker Compose", "Nginx", "Git"],
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="skills" className="relative px-6 py-24 md:px-8 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-200/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 mb-12">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Technical Skills
          </span>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Tools & technologies
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              I use to build.
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-xl md:p-10"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${skill.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

              {/* Icon */}
              <div className="text-4xl mb-4">{skill.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900">
                {skill.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-base leading-6 text-gray-600">
                {skill.description}
              </p>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2">
                {skill.technologies.map((technology) => (
                  <span
                    key={technology}
                    className={`rounded-full bg-gradient-to-r ${skill.gradient} px-3 py-1 text-xs font-semibold text-white opacity-80 transition-opacity duration-200 group-hover:opacity-100`}
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