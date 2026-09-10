import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh+88px)] items-center overflow-hidden px-6 pt-24 md:px-8">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent blur-3xl" />
          <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-400/20 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
                👋 Software Engineer
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Isly
                </span>
                .
              </h1>
              <p className="text-2xl font-semibold text-gray-700 md:text-3xl">
                I build beautiful software.
              </p>
            </div>

            <p className="max-w-xl text-lg leading-8 text-gray-600">
              Full-stack software engineer focused on building modern web
              applications, backend systems, and scalable digital products.
              Passionate about clean code and solving complex problems.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
              >
                View my work →
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-gray-200 px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:border-blue-600 hover:bg-blue-50"
              >
                Let's talk
              </a>
            </div>
          </div>

          {/* Right - Code Editor */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="w-full max-w-md">
              <CodeEditor />
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-gray-600">Scroll to explore</p>
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
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