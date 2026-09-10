import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-8 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-gradient-to-bl from-blue-200/30 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:gap-16 lg:grid-cols-2">
        {/* Photo */}
        <div className="flex justify-center lg:justify-start">
          <div className="group relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/ibehluli.jpg"
                alt="Isly — Software Engineer"
                width={500}
                height={600}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              About me
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              I turn ideas into
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                elegant software
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-gray-600 md:text-lg">
            <p>
              I'm a software engineer passionate about understanding how things work at the deepest level and building them from scratch with purpose.
            </p>

            <p>
              I completed my software engineering education at <span className="font-semibold text-gray-900">Codam in Amsterdam</span>, where I worked extensively with C and C++ and developed a strong foundation in algorithms, systems programming, and problem-solving.
            </p>

            <p>
              Today, I leverage modern technologies like <span className="font-semibold text-gray-900">TypeScript, React, Node.js, and Docker</span> to architect full-stack applications and digital products that scale.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 pt-8 md:grid-cols-3">
            <div>
              <div className="text-2xl font-bold text-blue-600 md:text-3xl">42</div>
              <div className="text-sm text-gray-600">Projects completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 md:text-3xl">5+</div>
              <div className="text-sm text-gray-600">Years learning</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 md:text-3xl">∞</div>
              <div className="text-sm text-gray-600">Always growing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}