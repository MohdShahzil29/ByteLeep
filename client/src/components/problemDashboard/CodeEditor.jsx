import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import { FaPlay, FaCheck } from "react-icons/fa";
import axios from "axios";

const languages = [
  {
    name: "Java",
    mode: "java",
    template: `class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  {
    name: "Python",
    mode: "python",
    template: `def solution():\n    print("Hello, World!")\n\nsolution()`,
  },
  {
    name: "C++",
    mode: "c_cpp",
    template: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  },
];

const CodeEditor = () => {
  const [language, setLanguage] = useState(languages[0]); // Default to Java
  const [code, setCode] = useState(language.template);
  const [output, setOutput] = useState("");

  const handleLanguageChange = (e) => {
    const selectedLanguage = languages.find(
      (lang) => lang.name === e.target.value
    );
    setLanguage(selectedLanguage);
    setCode(selectedLanguage.template);
  };

  const handleCodeChange = (newCode) => setCode(newCode);

  const handleCompileAndRun = async () => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "802022361bmsh861a628816a7f2ap1076a4jsn185315102af7",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        source_code: code,
        language_id:
          language.name.toLowerCase() === "c++"
            ? 52
            : language.name.toLowerCase() === "python"
            ? 71
            : 62,
        wait: true,
      },
    };

    try {
      const response = await axios.request(options);
      const token = response.data.token;

      // Poll for the result
      const pollOptions = {
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        headers: {
          "x-rapidapi-key":
            "802022361bmsh861a628816a7f2ap1076a4jsn185315102af7",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
      };

      let pollResponse;
      let status = "Processing";

      while (status === "Processing" || status === "In Queue") {
        pollResponse = await axios.request(pollOptions);
        status = pollResponse.data.status.description;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
      }

      setOutput(
        pollResponse.data.stdout ||
          pollResponse.data.compile_output ||
          pollResponse.data.message
      );
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col flex-grow h-screen overflow-hidden">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <span className="font-bold text-lg">Online Compiler</span>
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
        <button
          className="mr-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 flex items-center"
          onClick={handleCompileAndRun}
        >
          <FaPlay className="mr-2" />
          Compile & Run
        </button>
        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 flex items-center">
          <FaCheck className="mr-2" />
          Submit
        </button>
      </footer>

      <div className="output p-4 bg-gray-200">
        <h2 className="font-bold text-lg">Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
