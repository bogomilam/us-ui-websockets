import { Link, useLocation } from "react-router-dom";
import { Region, regions } from "@/components/pages/Regions";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link
            to={"/"}
          >{`${location.pathname.slice(1)} WebSocket Dashboard`}</Link>
        </div>

        <div className="space-x-4">
          {/* Dropdown for Regions */}
          <div className="relative group">
            <button className="bg-gray-700 px-4 py-2 min-w-[180px] rounded hover:bg-gray-600">
              {location.pathname === "/"
                ? "Select Region"
                : location.pathname.slice(1)}
            </button>
            <div className="absolute min-w-[260px]  z-40 right-0 w-40 bg-gray-700 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
              {regions.map(({ name, path }: Region) => (
                <Link
                  key={path}
                  to={path}
                  className="block px-4 py-2 hover:bg-gray-500 text-white hover:text-gray-100"
                >
                  <button className=" px-4 py-2 min-w-[180px] rounded ">
                    {name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
