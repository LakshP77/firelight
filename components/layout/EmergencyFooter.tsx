export default function EmergencyFooter() {
  return (
    <footer className="mx-4 mb-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-xl border border-white/10 bg-[#0b1015] px-5 py-3 text-sm text-white/70">
      <p>
        If you see smoke or fire:{" "}
        <span className="font-semibold text-red-400">Call 911</span>
      </p>

      <span className="hidden text-white/20 md:inline">|</span>

      <p>
        WA DNR Fire Info:{" "}
        <span className="text-orange-500">dnr.wa.gov</span>
      </p>

      <span className="hidden text-white/20 md:inline">|</span>

      <p>
        National Interagency Fire Center:{" "}
        <span className="text-orange-500">nifc.gov</span>
      </p>
    </footer>
  );
}