export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <div className="text-xl font-bold">
        ISLY
      </div>

      <div className="flex gap-8 text-sm">
        <a href="#about">About</a>
		<a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}