"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { WildfireLocation } from "@/types/wildfire";
import { MapPin, Search } from "lucide-react";

type SearchBarProps = {
  locations: WildfireLocation[];
  onSelectLocation: (location: WildfireLocation) => void;
};

const MAX_RESULTS = 5;

function getMatchRank(name: string, normalizedQuery: string) {
  const normalizedName = name.trim().toLowerCase();

  if (normalizedName === normalizedQuery) {
    return 0;
  }

  if (normalizedName.startsWith(normalizedQuery)) {
    return 1;
  }

  const words = normalizedName.split(/[\s,]+/).filter(Boolean);
  if (words.some((word) => word.startsWith(normalizedQuery))) {
    return 2;
  }

  return 3;
}

export default function SearchBar({
  locations,
  onSelectLocation,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchAreaRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const matchingLocations = normalizedQuery
    ? locations
        .map((location, originalIndex) => ({
          location,
          originalIndex,
          normalizedName: location.name.trim().toLowerCase(),
        }))
        .filter(({ normalizedName }) =>
          normalizedName.includes(normalizedQuery),
        )
        .map(({ location, originalIndex }) => ({
          location,
          originalIndex,
          rank: getMatchRank(location.name, normalizedQuery),
        }))
        .sort(
          (first, second) =>
            first.rank - second.rank ||
            first.originalIndex - second.originalIndex,
        )
        .slice(0, MAX_RESULTS)
        .map(({ location }) => location)
    : [];
  const visibleActiveIndex = Math.min(
    activeIndex,
    Math.max(matchingLocations.length - 1, 0),
  );

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function selectLocation(location: WildfireLocation) {
    onSelectLocation(location);
    setQuery(location.name);
    setIsOpen(false);
    setActiveIndex(0);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && matchingLocations.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((currentIndex) =>
        isOpen ? (currentIndex + 1) % matchingLocations.length : 0,
      );
    }

    if (event.key === "ArrowUp" && matchingLocations.length > 0) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((currentIndex) =>
        isOpen
          ? (currentIndex - 1 + matchingLocations.length) %
            matchingLocations.length
          : matchingLocations.length - 1,
      );
    }

    if (
      event.key === "Enter" &&
      isOpen &&
      matchingLocations[visibleActiveIndex]
    ) {
      event.preventDefault();
      selectLocation(matchingLocations[visibleActiveIndex]);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(0);
    }
  }

  return (
    <div
      ref={searchAreaRef}
      className="relative order-3 mx-auto w-full max-w-[560px] px-0 md:order-none md:px-4 lg:px-8"
    >
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
        aria-activedescendant={
          isOpen && matchingLocations[visibleActiveIndex]
            ? `location-search-option-${matchingLocations[visibleActiveIndex].id}`
            : undefined
        }
        autoComplete="off"
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => {
          if (normalizedQuery) {
            setIsOpen(true);
            setActiveIndex(0);
          }
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search location, city, ZIP, or address"
        className="h-12 w-full rounded-lg border border-white/[0.12] bg-[#0b1015] pl-11 pr-4 text-sm text-white shadow-inner outline-none transition placeholder:text-white/40 hover:border-white/20 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/10"
      />

      {isOpen && normalizedQuery && (
        <div
          id="location-search-results"
          role="listbox"
          aria-label="Matching wildfire locations"
          className="absolute left-0 right-0 top-full z-[1000] mt-2 overflow-hidden rounded-lg border border-white/[0.12] bg-[#0b1015] p-1 shadow-2xl md:left-4 md:right-4 lg:left-8 lg:right-8"
        >
          {matchingLocations.length > 0 ? (
            matchingLocations.map((location, index) => (
              <button
                key={location.id}
                id={`location-search-option-${location.id}`}
                type="button"
                role="option"
                aria-selected={index === visibleActiveIndex}
                onClick={() => selectLocation(location)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition focus:outline-none ${
                  index === visibleActiveIndex
                    ? "bg-orange-500/10 text-white"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <MapPin aria-hidden="true" className="h-4 w-4 text-orange-500" />
                {location.name}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-white/50">
              No matching locations
            </p>
          )}
        </div>
      )}
    </div>
  );
}
