"use client"
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import React from 'react';

interface NavbarProps {
  title?: string; // Make title optional if it's not always required
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white py-2 px-4 shadow-md relative"> {/* Added relative positioning */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600">
          {title || ( // Use title prop if available, otherwise use the default logo
            <>
              Cö<span className="text-blue-600">Lab</span>
            </>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
            {isOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>

        {/* Navigation Links (Hidden on Mobile by Default) */}
        <div
          className={`md:flex items-center space-x-2 md:space-x-6 text-black ${
            isOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-white p-4 z-20"  // Adjusted z-index
              : "hidden"
          } md:relative`}
        >
          <ul className="md:flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-2 md:space-x-6 text-black"> {/* Modified ul for mobile */}
            {["Home", "Projects", "Services", "Blog", "About", "Contacts"].map(
              (item, index) => (
                <li key={index} className="relative group text-sm">
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block py-2 md:inline-block text-black hover:text-black transition-all duration-300"
                    onClick={() => setIsOpen(false)} // Close menu on click (mobile)
                  >
                    {item}
                  </Link>
                  {/* Underline Effect */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </li>
              )
            )}
          </ul>

          {/* Auth Buttons (Hidden on Mobile by Default) */}
          <div className="md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-2 md:space-x-4 mt-4 md:mt-0"> {/* Modified auth button div for mobile */}
            <Link href="/signin" className="text-gray-700 hover:underline text-sm">
              Sign In
            </Link>
            <Link
              href="/login"
              className="px-2 py-1 md:px-4 md:py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300 text-sm"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;