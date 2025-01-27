import React from "react";
import {
  FaInfoCircle,
  FaTags,
  FaBuilding,
  FaNewspaper,
  FaCompass,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const Details = () => {
  return (
    <ResizableBox
      width={700}
      height={Infinity}
      minWidth="300px"
      maxWidth="600px"
      axis="x"
      resizeHandles={["e"]}
      className="bg-white shadow-md flex-shrink-0 overflow-hidden"
    >
      <div className="p-4 h-full overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Longest Increasing Subsequence</h1>
          <FaInfoCircle className="text-gray-500" />
        </header>

        {/* Problem Details */}
        <div className="mb-4 flex gap-5">
          <p className="text-sm text-gray-600">Difficulty: Medium</p>
          <p className="text-sm text-gray-600">Accuracy: 32.8%</p>
          <p className="text-sm text-gray-600">Submissions: 321K+</p>
          <p className="text-sm text-gray-600">Points: 4</p>
        </div>
        <p className="mb-4">
          Given an array arr[] of integers, the task is to find the length of
          the Longest Strictly Increasing Subsequence (LIS).
        </p>
        <p className="mb-4">
          A subsequence is strictly increasing if each element in the
          subsequence is strictly less than the next element.
        </p>

        {/* Examples Section */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Examples:</h2>
          <div className="mb-4">
            <p className="font-semibold">Input: arr[] = [5, 8, 3, 7, 9, 1]</p>
            <p className="font-semibold">Output: 3</p>
            <p>
              Explanation: The longest strictly increasing subsequence could be
              [5, 7, 9], which has a length of 3.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">
              Input: arr[] = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7,
              15]
            </p>
            <p className="font-semibold">Output: 6</p>
            <p>
              Explanation: One of the possible longest strictly increasing
              subsequences is [0, 2, 6, 9, 13, 15], which has a length of 6.
            </p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Input: arr[] = [3, 10, 2, 1, 20]</p>
            <p className="font-semibold">Output: 3</p>
            <p>
              Explanation: The longest strictly increasing subsequence could be
              [3, 10, 20], which has a length of 3.
            </p>
          </div>
        </div>

        {/* Constraints Section */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Constraints:</h2>
          <p>
            1 ≤ arr.size() ≤ 10<sup>3</sup>
          </p>
          <p>
            0 ≤ arr[i] ≤ 10<sup>6</sup>
          </p>
        </div>

        {/* Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Try more examples
        </button>

        {/* Additional Sections */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Company Tags</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 px-2 py-1 rounded">Paytm</span>
            <span className="bg-gray-200 px-2 py-1 rounded">Amazon</span>
            <span className="bg-gray-200 px-2 py-1 rounded">Microsoft</span>
            <span className="bg-gray-200 px-2 py-1 rounded">OYO Rooms</span>
            <span className="bg-gray-200 px-2 py-1 rounded">Samsung</span>
            <span className="bg-gray-200 px-2 py-1 rounded">BankBazaar</span>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Topic Tags</h2>
          <FaTags className="text-gray-500" />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">
            Related Interview Experiences
          </h2>
          <FaBuilding className="text-gray-500" />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Related Articles</h2>
          <FaNewspaper className="text-gray-500" />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Expected Complexities</h2>
          <FaCompass className="text-gray-500" />
        </div>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center">
          <FaExclamationTriangle className="mr-2" />
          Report An Issue
        </button>
        <p className="text-sm text-gray-600 mt-4">
          If you are facing any issue on this page, Please let us know.
        </p>
      </div>
    </ResizableBox>
  );
};

export default Details;
