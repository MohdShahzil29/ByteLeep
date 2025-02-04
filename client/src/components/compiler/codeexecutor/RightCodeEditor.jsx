import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const RightCodeEditor = () => {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
    }
}`);
  const [output, setOutput] = useState("");

  const handleRun = () => {
    // Handle the run logic here
    // For demonstration, we'll just set the output to the code
    setOutput(code);
  };

  return (
    <div className="flex flex-col md:flex-row items-center min-h-screen bg-gray-100 p-4 space-y-4 md:space-y-0 md:space-x-4 w-full">
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Main.java</span>
          <div className="flex items-center space-x-2">
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4">
          <textarea
            className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your Java code here..."
          ></textarea>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleRun}
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <FaPlay className="mr-2" />
            Run
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden p-4">
        <div className="mb-4">
          <span className="text-lg font-semibold">Output</span>
        </div>
        <div className="p-4 border rounded-lg h-64 overflow-y-auto">
          {output}
        </div>
      </div>
    </div>
  );
};

export default RightCodeEditor;
