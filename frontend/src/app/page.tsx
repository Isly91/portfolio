import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="flex min-h-[calc(100vh-88px)] items-center px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
              Software Engineer
            </p>

            <h1 className="text-6xl font-bold leading-tight tracking-tight md:text-8xl">
              Hi, I'm Isly.
              <br />
              I build software.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
              Full-stack software engineer focused on building modern web
              applications, backend systems and digital products.
            </p>

            <div className="mt-10 flex gap-4">
              <a
                href="#projects"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View my work
              </a>

              <a
                href="#contact"
                className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
              >
                Contact me
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <CodeEditor />
          </div>

        </div>
      </section>
      <About />
      <Skills />
      <Projects />
    </main>
  );
}