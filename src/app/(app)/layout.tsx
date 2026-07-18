import { Navbar } from "@/components/layout/Navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navbar variant="app" />
      {children}
    </div>
  );
}
