import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import { FaPlay, FaCheck } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

const languages = [
  { name: "Java", mode: "java" },
  { name: "Python", mode: "python" },
  { name: "C++", mode: "c_cpp" },
];

const themes = [
  { name: "Github", value: "github" },
  { name: "Monokai", value: "monokai" },
  { name: "Tomorrow", value: "tomorrow" },
];

const fontSizes = [12, 14, 16, 18, 20, 22, 24];

const CodeEditor = () => {
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("github");
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);
  const [problemId, setProblemId] = useState(null);
  console.log("Problem slug", problemId);

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/dsa/get-problem/${slug}`
        );
        const data = response.data;
        setProblemId(data?.slug);
        const driveCode = data.driveCode[language.name.toLowerCase()];
        const userFunction = data.userFunction[language.name.toLowerCase()];
        setCode(`${driveCode}\n${userFunction}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug, language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = languages.find(
      (lang) => lang.name === e.target.value
    );
    setLanguage(selectedLanguage);
  };

  const handleCodeChange = (newCode) => setCode(newCode);

  const handleRunCode = async () => {
    try {
      // Fetch input data from API
      const inputResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dsa/get-input/${slug}`
      );
      let inputData = inputResponse.data.input || "";
      inputData = inputData.map((line) => line.replace(/,/g, " ")).join("\n");

      // Send code and input to backend for execution
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/execute`,
        {
          language: language.name.toLowerCase(),
          code,
          inputData,
        }
      );

      console.log("Received response:", response.data);
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error: " + (error.response?.data?.error || error.message));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/dsa/submit`,
        {
          slug, // Send the problem slug
          language: language.name.toLowerCase(),
          code,
        }
      );

      console.log("Submission Response:", response.data);
      const { passedCount, totalTestCases, results } = response.data;
      // Format the results into a user-friendly message.
      let resultMessage = `Submission Results:\n`;
      resultMessage += `Test Cases Passed: ${passedCount} out of ${totalTestCases}\n\n`;
      results.forEach((result, index) => {
        resultMessage += `Test Case ${index + 1}:\n`;
        resultMessage += `  Execution Time: ${result.executionTime}\n`;
        resultMessage += `  ${result.passed ? "Passed" : "Failed"}\n`;
        if (result.error) resultMessage += `  Error: ${result.error}\n`;
        resultMessage += "\n";
      });
      setOutput(resultMessage);
    } catch (error) {
      console.error("Error submitting solution:", error);
      setOutput(
        "Submission Failed: " + (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <header className="flex items-center p-4 bg-white text-black relative">
        <span className="font-bold text-lg">Byte Leepr</span>
        <select
          value={language.name}
          onChange={handleLanguageChange}
          className="bg-gray-700 text-white p-2 rounded ml-auto"
        >
          {languages.map((lang) => (
            <option key={lang.name} value={lang.name}>
              {lang.name}
            </option>
          ))}
        </select>
        <button
          className="ml-4 text-black cursor-pointer"
          onClick={() => setShowSettings(!showSettings)}
        >
          <IoSettingsOutline size={24} />
        </button>
      </header>
      {showSettings && (
        <div
          className="absolute top-16 right-4 bg-white shadow-md p-4 rounded z-50 mt-[79px]"
          style={{ width: "250px" }}
        >
          <h3 className="font-bold mb-2">Settings</h3>
          <label className="block text-sm font-medium">Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium">Font Size:</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full p-2 mb-2 border rounded"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowSettings(false)}
            className="w-full p-2 bg-white text-black rounded mt-2 cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
      <div className="flex-grow bg-gray-100 overflow-auto shadow-2xl">
        <AceEditor
          mode={language.mode}
          theme={theme}
          name="code-editor"
          value={code}
          onChange={handleCodeChange}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          width="100%"
          height="100%"
          fontSize={fontSize}
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="output p-4 bg-white text-black">
        <h2 className="font-bold text-lg">Output:</h2>
        <pre>{output}</pre>
      </div>
      <footer className="flex justify-end items-center p-4 bg-white text-black mr-12">
        <button
          className="mr-2 px-4 py-2 border border-blue-400 flex items-center cursor-pointer"
          onClick={handleRunCode}
        >
          <FaPlay className="mr-2" />
          Compile & Run
        </button>
        <button
          className="px-4 py-2 bg-blue-500 rounded flex items-center cursor-pointer"
          onClick={handleSubmit}
        >
          <FaCheck className="mr-2" />
          Submit
        </button>
      </footer>
    </div>
  );
};

export default CodeEditor;
