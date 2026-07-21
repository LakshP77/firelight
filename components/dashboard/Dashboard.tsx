import MapContainer from "../map/MapContainer";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <section className="grid min-h-[calc(100vh-80px)] grid-cols-[1fr_380px] gap-4 p-4">
      <MapContainer />
      <Sidebar />
    </section>
  );
}