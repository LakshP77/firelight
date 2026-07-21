export default function SearchBar() {
  return (
    <div className="w-full max-w-xl px-10">
      <input
        type="text"
        placeholder="Search location, city, ZIP, or address"
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-orange-500"
      />
    </div>
  );
}
