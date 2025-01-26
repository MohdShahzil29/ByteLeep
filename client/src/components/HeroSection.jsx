import React from "react";
import mainObjectImage from "../assets/OBJECTS.png";
import {
  FaLightbulb,
  FaTv,
  FaGlobe,
  FaRulerCombined,
  FaBookReader,
  FaClock,
} from "react-icons/fa";
import { BsFillChatDotsFill, BsFillQuestionCircleFill } from "react-icons/bs";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 bg-[#FDF8EE] relative">
      {/* Left Section */}
      <div className="md:w-1/2 space-y-6 relative text-center md:text-left">
        {/* Icons Around the Title */}
        <FaLightbulb className="absolute text-purple-500 text-2xl sm:text-3xl top-2 left-4 md:top-0 md:left-0 md:-translate-x-8 md:-translate-y-8" />
        <FaTv className="absolute text-blue-500 text-2xl sm:text-3xl top-2 right-4 md:top-0 md:right-0 md:translate-x-8 md:-translate-y-8" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight relative">
          The <span className="text-orange-500">Smart</span> Choice For{" "}
          <span className="text-orange-500">Future</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Elearn is a global training provider based across the UK that
          specialises in accredited and bespoke training courses. We crush
          the...
        </p>

        {/* Icons Around Search Bar */}
        <div className="flex items-center w-full max-w-md relative mx-auto md:mx-0">
          <BsFillChatDotsFill className="absolute text-teal-500 text-xl sm:text-2xl -left-6 top-1/2 -translate-y-1/2 hidden md:block" />
          <BsFillQuestionCircleFill className="absolute text-indigo-500 text-xl sm:text-2xl -right-6 top-1/2 -translate-y-1/2 hidden md:block" />

          <input
            type="text"
            placeholder="Search for a location..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none text-sm sm:text-base"
          />
          <button className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-r-lg hover:bg-purple-700 text-sm sm:text-base">
            Search
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative flex items-center justify-center mt-8 md:mt-0">
        <img
          src={mainObjectImage}
          alt="Main Object"
          className="w-4/5 sm:w-3/4 md:w-full h-auto relative z-10"
        />

        {/* Icons Positioned Around the Image */}
        <FaGlobe className="absolute text-green-500 text-xl sm:text-2xl md:text-4xl top-4 left-4 md:top-8 md:left-0 md:-translate-x-10" />
        <FaRulerCombined className="absolute text-yellow-500 text-xl sm:text-2xl md:text-4xl top-4 right-4 md:top-8 md:right-0 md:translate-x-10" />
        <FaBookReader className="absolute text-orange-500 text-xl sm:text-2xl md:text-4xl bottom-4 left-4 md:bottom-8 md:left-0 md:-translate-x-10" />
        <FaClock className="absolute text-red-500 text-xl sm:text-2xl md:text-4xl bottom-4 right-4 md:bottom-8 md:right-0 md:translate-x-10" />
      </div>
    </div>
  );
};

export default HeroSection;
