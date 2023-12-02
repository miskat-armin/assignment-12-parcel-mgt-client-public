import { useState } from "react";
import { GoSignIn } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import NavLinkItem from "./NavBarLinkItem";

import { IoLogOutOutline } from "react-icons/io5";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosNotificationsOutline } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log(user);

  return (
    <header className="shadow-lg sticky top-0 w-full bg-white lg:bg-opacity-60 z-50">
      <div className="mx-auto flex lg:justify-between items-center px-4 md:px-10">
        <h1 className="text-2xl font-semibold lg:block hidden">Your Logo</h1>
        {/* Hamburger menu button for mobile */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden focus:outline-none ml-0"
        >
          <svg
            className={`w-6 h-6 ${
              isMobileMenuOpen ? "text-gray-500" : "text-gray-800"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Logo in the middle (visible on mobile only) */}
        <h1 className="text-2xl font-semibold mx-auto lg:hidden">Your Logo</h1>

        {/* Desktop and tablet navigation */}
        <nav
          className={`hidden lg:flex space-x-4 items-center ${
            isMobileMenuOpen ? "hidden" : "block"
          }`}
        >
          <ul className="flex space-x-4">
            <li>
              <NavLinkItem to="/" label="Home" />
            </li>
            <li>
              <NavLinkItem to="/dashboard" label="Dashboard" />
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          {user ? (
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.photoURL} alt={user?.displayName} />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    {user?.displayName && (
                      <span className="block text-sm">{user?.displayName}</span>
                    )}
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={Logout}>
                    <IoLogOutOutline className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/signin" className="hidden lg:block">
              <button className="btn w-32 bg-[#7373E3] hover:bg-[#4D4DDB]  hover:scale-105 transform transition duration-500">
                <p className="text-white font-semibold text-lg">Login</p>
              </button>
            </Link>
          )}
          <IoIosNotificationsOutline size={24}/>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <ul className="p-4 space-y-2">
            <li>
              <NavLinkItem to="/" label="Home" />
            </li>
            <li>
              <NavLinkItem to="/all-items" label="All items" />
            </li>
            <li>
              <NavLinkItem to="/blog" label="Blog" />
            </li>
            {user && (
              <li>
                <NavLinkItem
                  to="/signin"
                  label={
                    <span className="flex items-center text-green-500 font-semibold">
                      Log in <GoSignIn className="ml-2" />
                    </span>
                  }
                />
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
