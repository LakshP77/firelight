import type { ReactNode } from "react";

export default function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}
