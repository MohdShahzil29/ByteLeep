// SheetCard.js
import React from "react";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineBook,
} from "react-icons/ai";
import { MdOutlineReportProblem } from "react-icons/md";
import { FaWpbeginner } from "react-icons/fa";


const SheetCard = ({ title, problem, Level, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mx-auto my-4">
      <img
        className="w-full h-48 object-cover rounded-lg"
        src={image}
        alt="Course"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {/* <p className="text-gray-600 mt-1">{price}</p> */}
        <div className="flex items-center mt-2">
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
          <AiFillStar className="text-yellow-500" />
        </div>
        <div className="flex items-center mt-2 space-x-4">
          <div className="flex items-center">
            <MdOutlineReportProblem className="text-gray-600" />
            <span className="text-gray-600 ml-1">{problem} Problem</span>
          </div>
          <div className="flex items-center">
            <FaWpbeginner className="text-gray-600" />
            <span className="text-gray-600 ml-1">{Level} Level</span>
          </div>
        </div>
        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
          Enrolled Sheet
        </button>
      </div>
    </div>
  );
};

export default SheetCard;
