import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
