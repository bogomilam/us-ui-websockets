import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropDownMenu";
import { pages, Page } from "@/pages/page";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className=" navBar bg-gray-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          WebSocket Dashboard
        </div>
        <div className="space-x-4">
          <a href="/" className="text-gray-300 hover:text-white">
            Home
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger>{location.pathname}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Regions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {pages.map(({ name, path }: Page) => (
                <Link
                  key={path}
                  to={path}
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
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
