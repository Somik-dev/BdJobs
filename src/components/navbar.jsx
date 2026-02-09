"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ModeToggle } from "./toggolebutton";
import { LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Cookies from "js-cookie";
import { logoutSuccess } from "@/redux/reducer/userReducer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Jobs", href: "/jobs" },
  ];

  const { isAuth, user } = useSelector((state) => state.user);

  console.log("User from Redux:", user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    Cookies.remove("token")
    toggleMenu();
    dispatch(logoutSuccess());
  }

  return (
    <nav className="z-50 sticky top-0 backdrop-blur-lg bg-white/30 dark:bg-black/20 border-b border-white/20 dark:border-white/10 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold flex items-center space-x-1"
            >
              <span className="text-3xl">BD</span>
              <span className="text-3xl text-red-500">Jobs</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {isAuth ? (
              user && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="w-9 h-9 cursor-pointer">
                      {user.profilePic ? (
                        <AvatarImage
                          src={user.profilePic}
                          alt={user.name}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white font-semibold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="w-40 p-2 space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/account">Profile</Link>
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={logoutHandler}
                    >
                      <LogOut size={18} />
                      Logout
                    </Button>
                  </PopoverContent>
                </Popover>
              )
            ) : (
              <Link href="/login" className="hover:text-gray-600">
                Login
              </Link>
            )}

            <ModeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="bg-white/70 dark:bg-black/30 border-t px-4 py-4 space-y-2 text-center shadow-md">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggleMenu}
              className="block w-full py-2 px-3 rounded-md hover:bg-muted transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {isAuth ? (
            <div className="flex flex-col items-center space-y-2">
              {/* Profile Button */}
              <Link href="/account" onClick={toggleMenu} className="w-full">
                <Button
                  variant="outline"
                  className="w-full text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Button>
              </Link>

              {/* Logout Button */}
              <Button
                onClick={() => {
                  logoutHandler();
                  toggleMenu();
                }}
                variant="destructive"
                className="w-full flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={toggleMenu}
              className="block py-2 text-sm text-gray-700 hover:text-primary"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
