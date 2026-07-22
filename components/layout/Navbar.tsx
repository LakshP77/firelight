import type { WildfireLocation } from "@/types/wildfire";
import SearchBar from "@/components/ui/SearchBar";

type NavbarProps = {
  locations: WildfireLocation[];
  onSelectLocation: (location: WildfireLocation) => void;
};

export default function Navbar({
  locations,
  onSelectLocation,
}: NavbarProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 px-8">
      <div>
        <h1 className="text-xl font-bold">Firelight Public Safety</h1>
        <p className="text-sm text-white/60">
          Wildfire Risk Visualization
        </p>
      </div>

      <SearchBar
        locations={locations}
        onSelectLocation={onSelectLocation}
      />

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
