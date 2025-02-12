import React, { useEffect } from "react";
import { FaCode, FaLanguage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PracticeHome = () => {
    const naviegate = useNavigate();
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className=" flex flex-col items-center justify-center p-4 mt-10 mb-10">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-gray-900 text-5xl font-extrabold drop-shadow-lg">
          Practice Hub
        </h1>
        <p className="text-gray-800 text-lg mt-4">
          Choose your path and master your skills
        </p>
      </header>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        {/* Web Development Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center transform transition duration-500 hover:-translate-y-2 hover:scale-105">
          <FaCode className="text-8xl text-yellow-400 mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Practice Web Development
          </h2>
          <p className="text-gray-700 text-center">
            Dive into interactive projects and build state-of-the-art web
            applications with our hands-on labs.
          </p>
          <button className="mt-8 px-8 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition cursor-pointer" onClick={() => naviegate("/web-dev")}>
            Explore
          </button>
        </div>

        {/* Language Practice Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col items-center transform transition duration-500 hover:-translate-y-2 hover:scale-105">
          <FaLanguage className="text-8xl text-blue-400 mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Practice Any Language
          </h2>
          <p className="text-gray-700 text-center">
            Enhance your skills with immersive, hands-on learning experiences
            and real-world challenges.
          </p>
          <button className="mt-8 px-8 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition cursor-pointer" onClick={() => naviegate("/compiler")}>
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeHome;
