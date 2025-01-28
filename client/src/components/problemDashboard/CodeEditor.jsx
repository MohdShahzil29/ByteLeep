import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import { FaPlay, FaCog, FaCheck } from "react-icons/fa";

// Language configuration
const languages = [
  {
    name: "Java",
    mode: "java",
    template: `class Solution {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}`,
  },
  {
    name: "Python",
    mode: "python",
    template: `def solution():\n    # Your code here\n    pass\n`,
  },
  {
    name: "C++",
    mode: "c_cpp",
    template: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`,
  },
];

const CodeEditor = () => {
  const [language, setLanguage] = useState(languages[0]); // Default to Java
  const [code, setCode] = useState(language.template);

  const handleLanguageChange = (e) => {
    const selectedLanguage = languages.find(
      (lang) => lang.name === e.target.value
    );
    setLanguage(selectedLanguage);
    setCode(selectedLanguage.template); // Reset editor with template code
  };

  const handleCodeChange = (newCode) => setCode(newCode);

  return (
    <div className="flex flex-col flex-grow h-screen overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <span className="font-bold text-lg">Online Compiler</span>
        </div>
        <div className="flex items-center">
          <select
            value={language.name}
            onChange={handleLanguageChange}
            className="bg-gray-700 text-white p-2 rounded"
          >
            {languages.map((lang) => (
              <option key={lang.name} value={lang.name}>
                {lang.name}
              </option>
            ))}
          </select>
          <FaCog className="ml-4 cursor-pointer" />
        </div>
      </header>

      <div className="flex-grow p-4 bg-gray-100 overflow-auto">
        <AceEditor
          mode={language.mode}
          theme="github"
          name="code-editor"
          value={code}
          onChange={handleCodeChange}
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
