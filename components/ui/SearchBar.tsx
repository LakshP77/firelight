"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { WildfireLocation } from "@/types/wildfire";

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
    <div className="relative w-full max-w-xl px-10">
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
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-orange-500"
      />

      {isOpen && normalizedQuery && (
        <div
          id="location-search-results"
          className="absolute left-10 right-10 top-full z-[1000] mt-2 overflow-hidden rounded-lg border border-white/15 bg-[#0b1015] shadow-xl"
        >
          {matchingLocations.length > 0 ? (
            matchingLocations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => selectLocation(location)}
                className="block w-full px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10 focus:bg-white/10 focus:outline-none"
              >
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
