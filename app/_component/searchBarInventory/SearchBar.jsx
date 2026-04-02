export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search items..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
