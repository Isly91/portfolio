import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-zinc-200 bg-white px-6 py-32 md:px-12"
    >
      <div className="group mx-auto grid max-w-7xl items-center gap-24 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Portrait */}
        <div className="flex justify-center lg:justify-start">
          <div className="overflow-hidden rounded-[36px] bg-zinc-100">
            <Image
              src="/ibehluli.jpg"
              alt="Isly — Software Engineer"
              width={520}
              height={650}
              priority
              className="h-auto w-full object-cover grayscale brightness-95 contrast-110 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-[1.01]" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            About
          </p>

          <h2 className="text-5xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-6xl">
            I build software
            <br />
            from the operating system
            <br />
            to the user interface.
          </h2>

          <div className="space-y-7 text-lg leading-9 text-zinc-600">
            <p>
              I enjoy understanding how software works beneath the surface and
              building systems that are simple, reliable and efficient.
            </p>

            <p>
              I graduated from{" "}
              <span className="font-medium text-zinc-900">
                Codam (42 Network) in Amsterdam
              </span>
              , where I developed a strong foundation in C, C++, networking,
              algorithms and operating systems through project-based learning.
            </p>

            <p>
              Today I design and build full-stack applications using{" "}
              <span className="font-medium text-zinc-900">
                TypeScript, React, Node.js and Docker
              </span>
              , while continuing to deepen my knowledge of backend architecture
              and systems programming.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-200 pt-10">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-semibold text-zinc-900">42</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Codam Network
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold text-zinc-900">20+</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Engineering Projects
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold text-zinc-900">C / C++</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Systems Programming
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}