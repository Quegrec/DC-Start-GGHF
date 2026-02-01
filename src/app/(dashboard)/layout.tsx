import { TopNavigation } from "@/components/layout/TopNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212]">
      <TopNavigation />
      {children}
    </div>
  );
}
