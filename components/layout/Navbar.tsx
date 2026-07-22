import type { WildfireLocation } from "@/types/wildfire";
import SearchBar from "@/components/ui/SearchBar";
import { Flame, Info } from "lucide-react";

type NavbarProps = {
  locations: WildfireLocation[];
  onSelectLocation: (location: WildfireLocation) => void;
};

export default function Navbar({
  locations,
  onSelectLocation,
}: NavbarProps) {
  return (
    <header className="flex min-h-20 flex-wrap items-center gap-4 border-b border-white/[0.08] bg-[#06090c] px-5 py-3 shadow-[0_1px_0_rgba(255,255,255,0.02)] sm:px-7 md:flex-nowrap md:gap-5">
      <div className="flex min-w-fit items-center gap-3">
        <div className="flex h-11 w-10 items-center justify-center rounded-xl bg-orange-600 text-white shadow-[0_8px_24px_rgba(234,88,12,0.18)]">
          <Flame aria-hidden="true" className="h-6 w-6" fill="currentColor" />
        </div>
        <div>
        <h1 className="text-lg font-bold tracking-tight sm:text-xl">Firelight Public Safety</h1>
        <p className="mt-0.5 text-xs tracking-wide text-white/45 sm:text-sm">
          Wildfire Risk Visualization
        </p>
        </div>
      </div>

      <SearchBar
        locations={locations}
        onSelectLocation={onSelectLocation}
      />

      <nav className="ml-auto flex min-w-fit items-center gap-2 text-sm sm:gap-4">
        <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/65 transition hover:bg-white/[0.04] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
          <Info aria-hidden="true" className="h-4 w-4" />
          About
        </button>

        <button className="rounded-lg border border-orange-500/80 px-4 py-2.5 font-medium transition hover:border-orange-400 hover:bg-orange-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
          Contact Us
        </button>
      </nav>
    </header>
  );
}
