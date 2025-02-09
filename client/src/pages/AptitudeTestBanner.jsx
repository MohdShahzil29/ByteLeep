import React from "react";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AptitudeTestBanner = () => {
  const navigete = useNavigate();
  return (
    <div className="bg-gradient-to-br from-[#FFFBEC] via-[#E9F8F9] to-[#F0F0F0] flex items-center justify-center p-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-black text-gray-800 drop-shadow-lg animate-fade-in">
          Practice Aptitude Tests
        </h1>
        {/* <p className="text-xl md:text-2xl text-gray-600 mt-4 animate-fade-in animation-delay-500">
          #1 Aptitude Testing Platform
        </p> */}
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          {/* <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold transition-transform transform hover:scale-105">
            Buy Tests
          </button> */}
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold transition-transform transform hover:scale-105 cursor-pointer" onClick={() => navigete('/mock-test')}>
            Start Free Tests
          </button>
        </div>

        <div className="relative mt-12 flex justify-center gap-8 flex-wrap">
          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 w-72 border border-gray-200 hover:shadow-xl hover:scale-105">
            <div className="flex items-center justify-between text-gray-700 mb-4">
              <FaRegClock className="text-2xl text-blue-500" />
              <span className="text-lg font-semibold">14:09</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Question 7</h3>
            <p className="text-gray-600 mt-2 text-base">
              If a train travels 360 miles on 15 gallons of fuel, how many
              gallons are needed to travel 720 miles?
            </p>
            <p className="mt-4 text-2xl font-extrabold text-blue-600">
              30 gallons
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 w-72 border border-gray-200 hover:shadow-xl hover:scale-105">
            <h3 className="text-2xl font-bold text-gray-800">Question 6</h3>
            <p className="text-gray-600 mt-2 text-base">
              What will be the output of the following code snippet?
              <br />
              <code className="block mt-2 bg-gray-100 p-2 rounded text-sm">
                console.log(typeof typeof 1);
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTestBanner;
