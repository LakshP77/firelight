export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-8">
      <div>
        <h1 className="text-xl font-bold">Firelight Public Safety</h1>
        <p className="text-sm text-white/60">
          Wildfire Risk Visualization
        </p>
      </div>

      <div className="w-full max-w-xl px-10">
        <input
          type="text"
          placeholder="Search location, city, ZIP, or address"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-orange-500"
        />
      </div>

      <nav className="flex items-center gap-6 text-sm">
        <button className="text-white/70 transition hover:text-white">
          About
        </button>

        <button className="rounded-lg border border-orange-500 px-4 py-2 transition hover:bg-orange-500/10">
          Contact Us
        </button>
      </nav>
    </header>
  );
}