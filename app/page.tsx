import Dashboard from "@/components/dashboard/Dashboard";
import EmergencyFooter from "@/components/layout/EmergencyFooter";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05090d] text-white">
      <Navbar />
      <Dashboard />
      <EmergencyFooter />
    </main>
  );
}