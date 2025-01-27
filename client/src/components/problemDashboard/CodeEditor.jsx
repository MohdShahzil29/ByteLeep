import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { FaPlay, FaCog, FaCheck } from "react-icons/fa";

const CodeEditor = () => {
  const code = `class Solution {
  static ArrayList<Integer> subarraySum(int[] arr, int target) {
    // code here
  }
}`;

  return (
    <div className="flex flex-col flex-grow h-screen overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <span className="mr-2">// </span>
          <span className="font-bold">Driver Code Ends</span>
        </div>
        <div className="flex items-center">
          <FaCog className="mr-2 cursor-pointer" />
        </div>
      </header>

      <div className="flex-grow p-4 bg-gray-100 overflow-auto">
        <AceEditor
          mode="java"
          theme="github"
          name="code-editor"
          value={code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="100%"
          className="rounded shadow"
        />
      </div>

      <footer className="flex justify-end items-center p-4 bg-gray-800 text-white">
        <button className="mr-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
          Custom Input
        </button>
        <button className="mr-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 flex items-center">
          <FaPlay className="mr-2" />
          Compile & Run
        </button>
        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 flex items-center">
          <FaCheck className="mr-2" />
          Submit
        </button>
      </footer>
    </div>
  );
};

export default CodeEditor;
