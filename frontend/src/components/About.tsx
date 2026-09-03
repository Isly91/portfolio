import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="px-8 py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* Photo */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/ibehluli.jpg"
              alt="Isly — Software Engineer"
              width={500}
              height={600}
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            About me
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            I like turning ideas into software.
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">
            <p>
              I'm a software engineer who enjoys understanding how things
              work and building them from the ground up.
            </p>

            <p>
              I completed my software engineering education at Codam in
              Amsterdam, where I worked extensively with C and C++ and
              developed a strong foundation in algorithms, systems and
              problem solving.
            </p>

            <p>
              Today, I also work with modern web technologies such as
              TypeScript, React, Node.js and Docker to build full-stack
              applications and digital products.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}