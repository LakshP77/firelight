import { ExternalLink, Megaphone } from "lucide-react";

export default function EmergencyFooter() {
  return (
    <footer className="mx-3 mb-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-white/[0.08] bg-[#090e13] px-5 py-3 text-xs text-white/60 shadow-[0_12px_35px_rgba(0,0,0,0.14)] sm:mx-4 sm:mb-4 sm:text-sm">
      <p className="flex items-center gap-2">
        <Megaphone aria-hidden="true" className="h-4 w-4 text-orange-500" />
        <span>
          If you see smoke or fire:{" "}
          <span className="font-semibold text-red-400">Call 911</span>
        </span>
      </p>

      <span aria-hidden="true" className="hidden h-5 w-px bg-white/10 md:inline" />

      <p>
        WA DNR Fire Info:{" "}
        <a
          href="https://dnr.wa.gov"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-orange-500 transition hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-orange-500"
        >
          dnr.wa.gov
          <ExternalLink aria-hidden="true" className="h-3 w-3" />
        </a>
      </p>

      <span aria-hidden="true" className="hidden h-5 w-px bg-white/10 md:inline" />

      <p>
        National Interagency Fire Center:{" "}
        <a
          href="https://www.nifc.gov"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-orange-500 transition hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-orange-500"
        >
          nifc.gov
          <ExternalLink aria-hidden="true" className="h-3 w-3" />
        </a>
      </p>
    </footer>
  );
}
