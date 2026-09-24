import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] text-zinc-900">
      <Navbar />

      {/* Hero */}
      <section className="flex min-h-screen items-center px-6 pt-28 pb-20 md:px-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div className="space-y-10">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Software Engineer · Amsterdam
            </p>

            <h1 className="text-6xl font-semibold leading-[0.9] tracking-tight md:text-8xl">
              Building software
              <br />
              with precision.
            </h1>

            <p className="max-w-xl text-lg leading-9 text-zinc-600">
              Full-stack software engineer focused on systems programming, backend
              architecture, networking and modern web applications built with C++,
              TypeScript and Docker.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition hover:border-zinc-900"
              >
                Contact
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-10 border-t border-zinc-200 pt-8">
              <div>
                <p className="text-3xl font-semibold">20+</p>
                <p className="mt-2 text-sm text-zinc-500">Projects built</p>
              </div>

              <div>
                <p className="text-3xl font-semibold">C / C++</p>
                <p className="mt-2 text-sm text-zinc-500">
                  Systems programming
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold">Docker</p>
                <p className="mt-2 text-sm text-zinc-500">
                  Interactive sandboxes
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:block">
            <CodeEditor />
          </div>
        </div>
      </section>

      {/* Sections */}
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}