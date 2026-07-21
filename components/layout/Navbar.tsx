import SearchBar from "@/components/ui/SearchBar";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-8">
      <div>
        <h1 className="text-xl font-bold">Firelight Public Safety</h1>
        <p className="text-sm text-white/60">Wildfire Risk Visualization</p>
      </div>

      <SearchBar />

      <nav className="flex items-center gap-6 text-sm">
        <button className="text-white/70 hover:text-white">About</button>

        <button className="rounded-lg border border-orange-500 px-4 py-2 hover:bg-orange-500/10">
          Contact Us
        </button>
      </nav>
    </header>
  );
}
