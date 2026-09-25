import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  const links = [
    {
      label: "Email",
      value: "behlulistudio@gmail.com",
      href: "mailto:behlulistudio@gmail.com?subject=Software%20Engineering%20Opportunity",
    },
    {
      label: "GitHub",
      value: "github.com/Isly91",
      href: "https://github.com/Isly91",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/islybeh",
      href: "https://www.linkedin.com/in/islybeh/",
    },
  ];

  return (
    <section
      id="contact"
      className="border-t border-zinc-200 bg-[#F7F7F5] px-6 py-32 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-20 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left */}
          <div className="space-y-8">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Contact
            </p>

            <h2 className="text-5xl font-semibold leading-[0.95] tracking-tight text-zinc-900 md:text-7xl">
              Let's build
              <br />
              something exceptional.
            </h2>

            <p className="max-w-xl text-lg leading-9 text-zinc-600">
              I'm looking for software engineering opportunities where I can work
              with talented teams, build meaningful products and continue growing
              as an engineer.
            </p>
          </div>
          {/* Right */}
          <div className="border-t border-zinc-200 lg:border-t-0 lg:border-l lg:pl-12">
            <div className="space-y-4">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-zinc-200 hover:bg-zinc-50 hover:-translate-y-0.5"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                      {item.label}
                    </p>
              
                    <p className="mt-2 text-lg text-zinc-900 transition-colors duration-300 group-hover:text-black">
                      {item.value}
                    </p>
                  </div>
              
                  <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-900" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 flex flex-col gap-6 border-t border-zinc-200 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-zinc-500">© 2026 Islam Behluli</p>
            <p className="mt-1 text-sm text-zinc-500">
              Designed and engineered in Amsterdam.
            </p>
          </div>

          <p className="text-sm text-zinc-500">
            Next.js · React · TypeScript · Tailwind CSS · Docker · Git · GitHub · Responsive Design
          </p>
        </div>
      </div>
    </section>
  );
}