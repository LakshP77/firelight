export default function Legend() {
  return (
    <div className="absolute bottom-5 left-5 rounded-lg border border-white/10 bg-black/80 p-4">
      <h3 className="text-sm font-semibold">Risk Level Legend</h3>

      <div className="mt-3 space-y-2 text-sm text-white/70">
        <p>Low: 0–25</p>
        <p>Moderate: 26–50</p>
        <p>High: 51–75</p>
        <p>Extreme: 76–100</p>
      </div>
    </div>
  );
}
