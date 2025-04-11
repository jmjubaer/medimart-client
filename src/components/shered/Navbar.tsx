import React from "react";
import { Pill, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <nav className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Pill className="w-7 h-7 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                MediMart
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors font-medium text-sm"
            >
              Contact
            </Link>
            
            <div className="flex items-center space-x-6 ml-4">
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              
              <div className="flex space-x-4 ">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary transition-colors font-medium pt-[5px] text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-full transition-colors font-medium text-sm pt-[5px]"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      
    </header>
  );
};

export default Navbar;
