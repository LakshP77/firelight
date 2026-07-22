import Dashboard from "@/components/dashboard/Dashboard";
import EmergencyFooter from "@/components/layout/EmergencyFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05090d] text-white">
      <Dashboard />
      <EmergencyFooter />
    </main>
  );
}
