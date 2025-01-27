import React from "react";
import { FaLaptopCode, FaBriefcase, FaGraduationCap } from "react-icons/fa";

const FeatureSection = () => {
  return (
    <div className="flex justify-center items-center mx-auto bg-[#4D2C5E] p-4 w-full max-w-6xl rounded-lg mt-10">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Feature 1 */}
        <div className="flex-1 p-4 rounded-lg text-white flex flex-col items-center">
          <FaLaptopCode className="w-12 h-12 mb-2" />
          <h2 className="text-xl font-bold mb-2">Learn The Latest Skills</h2>
          <p className="text-center">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a BC, making it over 2000 years old.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex-1 p-4 rounded-lg text-white flex flex-col items-center">
          <FaBriefcase className="w-12 h-12 mb-2" />
          <h2 className="text-xl font-bold mb-2">Get Ready For a Career</h2>
          <p className="text-center">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a BC, making it over 2000 years old.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex-1 p-4 rounded-lg text-white flex flex-col items-center">
          <FaGraduationCap className="w-12 h-12 mb-2" />
          <h2 className="text-xl font-bold mb-2">Earn a Certificate</h2>
          <p className="text-center">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a BC, making it over 2000 years old.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
