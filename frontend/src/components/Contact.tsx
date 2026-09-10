export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white px-6 py-32 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <span className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Get in touch
            </span>

            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              Let's build
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                something great.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              I'm currently looking for software engineering opportunities
              where I can learn, contribute, and build meaningful products.
              If you'd like to work together, I'd love to hear from you.
            </p>

            <a
              href="mailto:behlulistudio@gmail.com"
              className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Send me an email →
            </a>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <a
              href="mailto:behlulistudio@gmail.com"
              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 font-semibold text-black">
                  behlulistudio@gmail.com
                </p>
              </div>

              <span className="text-xl text-gray-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="https://github.com/Isly91"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">GitHub</p>
                <p className="mt-1 font-semibold text-black">
                  github.com/Isly91
                </p>
              </div>

              <span className="text-xl text-gray-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/islybeh/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-500">LinkedIn</p>
                <p className="mt-1 font-semibold text-black">
                  Connect with me
                </p>
              </div>

              <span className="text-xl text-gray-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}