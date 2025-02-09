import React, { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router
import { FaBars, FaTimes } from "react-icons/fa"; // Import menu icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">MyWebsite</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/create-problem" className="hover:text-gray-200">
              Create Problem
            </Link>
            <Link to="/create-category" className="hover:text-gray-200">
              Create Category
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <Link to="/" className="block px-4 py-2 hover:bg-blue-800">
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-blue-800">
            About
          </Link>
          <Link to="/contact" className="block px-4 py-2 hover:bg-blue-800">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
