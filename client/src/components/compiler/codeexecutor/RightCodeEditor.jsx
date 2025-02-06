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
    setOutput(code);
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 mt-10 gap-4">
      {/* Code Editor Section */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Main.java</span>
        </div>
        <div className="p-4 flex-1 min-h-[200px]">
          <textarea
            className="w-full h-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Output Section */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col min-h-[200px]">
        <div className="mb-4">
          <span className="text-lg font-semibold">Output</span>
        </div>
        <div className="p-4 border rounded-lg h-full overflow-y-auto flex-1">
          {output}
        </div>
      </div>
    </div>
  );
};

export default RightCodeEditor;
