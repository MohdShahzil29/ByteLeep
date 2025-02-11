import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mainLogo from "../assets/orignallogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // Retrieve authentication state (adjust the selector based on your store structure)
  const { token } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#FDF8EE] text-black">
      <div className="max-w-[90rem] mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={mainLogo} alt="Logo" className="h-14 mr-4" />
          {/* <h1 className="text-2xl font-bold">Study Platform</h1> */}
        </div>
        <div className="hidden md:flex items-center">
          <a href="/" className="px-4 py-2 hover:text-purple-500">
            Home
          </a>
          <a href="#" className="px-4 py-2 hover:text-purple-500">
            About us
          </a>
          <a href="#" className="px-4 py-2 hover:text-purple-500">
            Courses
          </a>
          <a href="#" className="px-4 py-2 hover:text-purple-500">
            Our Service
          </a>
          <a href="#" className="px-4 py-2 hover:text-purple-500">
            Contact us
          </a>
          {token ? (
            <button
              className="bg-[#4D2C5E] text-white px-6 py-2 rounded-full hover:bg-purple-600 ml-4 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          ) : (
            <button
              className="bg-[#4D2C5E] text-white px-6 py-2 rounded-full hover:bg-purple-600 ml-4 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="#" className="block px-4 py-2 hover:text-purple-500">
            Home
          </a>
          <a href="#" className="block px-4 py-2 hover:text-purple-500">
            About us
          </a>
          <a href="#" className="block px-4 py-2 hover:text-purple-500">
            Courses
          </a>
          <a href="#" className="block px-4 py-2 hover:text-purple-500">
            Our Service
          </a>
          <a href="#" className="block px-4 py-2 hover:text-purple-500">
            Contact us
          </a>
          <button
            className="bg-[#4D2C5E] text-white px-6 py-2 rounded-full hover:bg-purple-600 mt-2 w-full"
            onClick={() => navigate(token ? "/dashboard" : "/login")}
          >
            {token ? "Dashboard" : "Sign in"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
