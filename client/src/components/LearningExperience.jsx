import React from "react";
import { FaHeart, FaCogs } from "react-icons/fa";
import objectImage from "../assets/object2.png";

const LearningExperience = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 mt-10 gap-6 bg-[#FDF8EE]">
      {/* Image Section */}
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <img
          src={objectImage}
          alt="Learning"
          className="w-[80%] sm:w-[75%] md:w-[69%] h-[22rem] sm:h-[24rem] md:h-[26rem] ml-0 sm:ml-[20px] md:ml-[63px]"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 p-4 flex flex-col items-start md:items-start justify-center text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Premium Learning Experience
        </h1>
        <div className="flex items-center mb-4">
          <div className="bg-white rounded-full p-2 mr-4">
            <FaHeart className="text-orange-500" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Easily Accessible
            </h2>
            <p className="text-sm sm:text-base">
              Learning Will feel Very Comfortable With Courslab.
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 mr-4">
            <FaCogs className="text-purple-500" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Fun Learning Experience
            </h2>
            <p className="text-sm sm:text-base">
              Learning Will feel Very Comfortable With Courslab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningExperience;
