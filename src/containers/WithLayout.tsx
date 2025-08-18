import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
