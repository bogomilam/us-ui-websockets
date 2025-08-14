import { Link, useLocation } from "react-router-dom";
import { pages, Page } from "@/pages/Regions";

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
            <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
              {location.pathname === "/" ? "Select Region" : location.pathname}
            </button>
            <div className="absolute right-0 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
              {pages.map(({ name, path }: Page) => (
                <>
                  {/* <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0"> */}
                  <button
                    // data-dropdown-toggle="dropdownHover"
                    data-dropdown-trigger="{hover|click}"
                    className="bg-gray-700 w-full  px-4 py-2 rounded hover:bg-gray-600"
                  >
                    <Link
                      key={path}
                      to={`/${path}`}
                      className=" block px-4 hover:bg-gray-100"
                    >
                      {name}
                    </Link>
                  </button>

                  {/* </div> */}
                  {/* <div
                    //           className="absolute right-0 mt-1 w-40
                    // bg-white text-black rounded shadow-md "
                    className="absolute right-0 mt-1 w-40 bg-white text-black rounded shadow-md"
                  >
                    <Link
                      to={`/${path}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {name}
                    </Link>
                  </div> */}
                </>
              ))}

              {/* <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Home
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  About
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Contact
                </a>
              </div> */}
            </div>
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              {location.pathname === "/" ? "Select Region" : location.pathname}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Regions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {pages.map(({ name, path }: Page) => (
                <Link
                  key={path}
                  to={`/${path}`}
                  className={`hover:text-yellow-300 ${
                    location.pathname === path ? "font-bold underline" : ""
                  }`}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    {name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </nav>
  );
}
