"use client";

import { useState } from "react";
import DetailSection from "./DetailSection";

export default function OperationalNotesSection({ locationId }: { locationId: string }) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  return <DetailSection title="Operational Notes"><label htmlFor={`notes-${locationId}`} className="sr-only">Local prototype notes</label><textarea id={`notes-${locationId}`} value={notes[locationId] ?? ""} onChange={(event) => setNotes((current) => ({ ...current, [locationId]: event.target.value }))} placeholder="Add a local note for this area…" rows={4} className="w-full resize-y rounded-md border border-white/[0.09] bg-black/20 p-3 text-xs leading-5 text-white/75 outline-none placeholder:text-white/25 focus:border-orange-500/50" /><p className="mt-2 text-[10px] text-white/30">Local prototype notes only. Notes are not persisted or shared with agencies.</p></DetailSection>;
}
