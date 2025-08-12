import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropDownMenu";
import { regions } from "@/lib/utils";

export default function Navbar() {
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
          {/* <a href="/data" className="text-gray-300 hover:text-white">
            Data
          </a> */}
          <DropdownMenu>
            <DropdownMenuTrigger>Server Locations</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Regions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {regions.map((region) => (
                <a
                  href={`/${region}`}
                  className="text-gray-300 hover:text-white"
                >
                  <DropdownMenuItem key={region} className="cursor-pointer">
                    {region}
                  </DropdownMenuItem>
                </a>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
