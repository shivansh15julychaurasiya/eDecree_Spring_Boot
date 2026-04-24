import { useState } from "react";
import { Link } from "react-router-dom"; // react-router for navigation

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img
              className="h-10 w-10"
              src="/images/ahc-logo.png" // add Allahabad HC logo
              alt="Allahabad High Court"
            />
            <span className="font-bold text-xl">eDecree</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/cases" className="hover:text-gray-300">
              Cases
            </Link>
            <Link to="/judgments" className="hover:text-gray-300">
              Judgments
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-800 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            className="block text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Home
          </Link>
          <Link
            to="/cases"
            className="block text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Cases
          </Link>
          <Link
            to="/judgments"
            className="block text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Judgments
          </Link>
          <Link
            to="/about"
            className="block text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            About
          </Link>
          <Link
            to="/login"
            className="block text-blue-800 bg-white px-4 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;