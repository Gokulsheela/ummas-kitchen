import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggelMenu = ()=> setMenuOpen(!menuOpen);
  const handelItemClicked = ()=> setMenuOpen(false);
  const cartCount = 2;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="text-xl font-semibold tracking-wide">
            Umma's Kitchen
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6 text-sm">
            <Link to="/new" className="hover:text-black">NewListing</Link>
            <a className="hover:text-black">Women</a>
            <a className="hover:text-black">Men</a>
            <a className="hover:text-black">Sale</a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">

            {/* Search */}
            <input
              type="text"
              placeholder="Search"
              className="hidden md:block w-40 border rounded-md px-2 py-1 text-sm focus:outline-none"
            />

            {/* Cart */}
            <div className="relative cursor-pointer">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6H19" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile menu */}
            <button className="md:hidden" onClick={toggelMenu}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4 space-y-3 text-sm">
            <input
              type="text"
              placeholder="Search products"
              className="w-full border rounded-md px-3 py-2"
            />
            <a className="block">Login</a>
            <a className="block">Signup</a>
            <Link to="/new" className="block" onClick={handelItemClicked}>NewListing</Link>
            <a className="block">Women</a>
          </div>
        )}

      </div>
    </nav>
  );
}