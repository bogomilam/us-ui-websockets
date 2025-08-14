import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar";

export default function Layout() {
  // const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}

      <Navbar />

      {/* Page Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
