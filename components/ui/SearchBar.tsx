"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { WildfireLocation } from "@/types/wildfire";
import { MapPin, Search } from "lucide-react";

type SearchBarProps = {
  locations: WildfireLocation[];
  onSelectLocation: (location: WildfireLocation) => void;
};

const MAX_RESULTS = 5;

export default function SearchBar({
  locations,
  onSelectLocation,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const matchingLocations = normalizedQuery
    ? locations
        .filter((location) =>
          location.name.toLowerCase().includes(normalizedQuery),
        )
        .slice(0, MAX_RESULTS)
    : [];

  function selectLocation(location: WildfireLocation) {
    onSelectLocation(location);
    setQuery(location.name);
    setIsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && matchingLocations[0]) {
      event.preventDefault();
      selectLocation(matchingLocations[0]);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="order-3 mx-auto w-full max-w-[560px] px-0 md:order-none md:px-4 lg:px-8">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white/45 md:left-8 lg:left-12"
      />
      <input
        type="text"
        value={query}
        role="combobox"
        aria-label="Search wildfire locations"
        aria-expanded={isOpen && normalizedQuery.length > 0}
        aria-controls="location-search-results"
        aria-autocomplete="list"
        autoComplete="off"
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (normalizedQuery) {
            setIsOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search location, city, ZIP, or address"
        className="h-12 w-full rounded-lg border border-white/[0.12] bg-[#0b1015] pl-11 pr-4 text-sm text-white shadow-inner outline-none transition placeholder:text-white/40 hover:border-white/20 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/10"
      />

      {isOpen && normalizedQuery && (
        <div
          id="location-search-results"
          className="absolute left-0 right-0 top-full z-[1000] mt-2 overflow-hidden rounded-lg border border-white/[0.12] bg-[#0b1015] p-1 shadow-2xl md:left-4 md:right-4 lg:left-8 lg:right-8"
        >
          {matchingLocations.length > 0 ? (
            matchingLocations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => selectLocation(location)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-white/75 transition hover:bg-white/[0.06] hover:text-white focus:bg-white/[0.08] focus:outline-none"
              >
                <MapPin aria-hidden="true" className="h-4 w-4 text-orange-500" />
                {location.name}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-white/50">
              No matching locations.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
