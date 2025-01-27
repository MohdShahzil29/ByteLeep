import React from "react";
import bulb from "../../assets/casual-life-3d-idea-lamp 1.png";
import vectorImage from "../../assets/Vector.png";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-11 p-4">
      <img
        className="w-[6rem] h-[5rem] mr-2 md:mr-4"
        src={bulb}
        alt="Lightbulb"
      />
      <div className="flex flex-col items-center text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-800">Popular DSA Sheet</h1>
        <p className="text-gray-600 mt-2 mx-auto">
          This DSA sheet covers essential topics and problems
          <br /> to help you prepare for coding interviews.
        </p>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <img className="w-[5rem] h-[5rem] mr-2" src={vectorImage} alt="Arrow" />
      </div>
    </div>
  );
};

export default Header;
