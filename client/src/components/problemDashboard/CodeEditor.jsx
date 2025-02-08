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
  const [submissionQueue, setSubmissionQueue] = useState([]);
  const [passedCount, setPassedCount] = useState(0);
  const [totalTestCases, setTotalTestCases] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [testCaseResults, setTestCaseResults] = useState([]);

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
      const inputResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dsa/get-input/${slug}`
      );
      let inputData = inputResponse.data.input || "";

      if (Array.isArray(inputData)) {
        inputData = inputData
          .map((line) =>
            typeof line === "string" ? line.replace(/,/g, " ") : line
          )
          .join("\n");
      } else {
        throw new Error("Input data is not an array");
      }

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
    const submissionId = Date.now(); // Unique identifier for the submission
    setSubmissionQueue((prevQueue) => [
      ...prevQueue,
      { id: submissionId, status: "pending" },
    ]);

    setSubmissionMessage("Submission is in queue");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/dsa/submit`,
        {
          slug,
          language: language.name.toLowerCase(),
          code,
        }
      );

      console.log("Submission Response:", response.data);
      const { passedCount, totalTestCases, results } = response.data;

      // Check if there is a failure in the results
      const failedResult = results.find((result) => !result.passed);
      if (failedResult) {
        // If a failure is found, display the error and stop further evaluation
        setOutput(`Test Case ${results.indexOf(failedResult) + 1}: Failed\n`);
        setOutput(
          (prevOutput) =>
            prevOutput + `Error: ${failedResult.error || "Unknown error"}\n`
        );
        setOutput(
          (prevOutput) =>
            prevOutput + `Expected Output:\n${failedResult.expectedOutput}\n`
        );
        setOutput(
          (prevOutput) => prevOutput + `Actual Output:\n${failedResult.output}`
        );

        setSubmissionQueue((prevQueue) =>
          prevQueue.map((submission) =>
            submission.id === submissionId
              ? { ...submission, status: "failed" }
              : submission
          )
        );

        setSubmissionMessage(""); // Clear the message after processing
        return;
      }

      const totalExecutionTime = results.reduce((sum, result) => {
        const time = parseInt(result.executionTime);
        return sum + (isNaN(time) ? 0 : time);
      }, 0);
      const averageExecutionTime = totalExecutionTime / results.length;

      let resultMessage = `Submission Results:\n`;
      resultMessage += `Test Cases Passed: ${passedCount} out of ${totalTestCases}\n`;
      resultMessage += `Average Execution Time: ${averageExecutionTime.toFixed(
        2
      )}ms\n\n`;
      setOutput(resultMessage);

      setSubmissionQueue((prevQueue) =>
        prevQueue.map((submission) =>
          submission.id === submissionId
            ? { ...submission, status: "completed" }
            : submission
        )
      );

      setPassedCount(passedCount);
      setTotalTestCases(totalTestCases);
      setTestCaseResults(results); // Store detailed test case results
      setSubmissionMessage(""); // Clear the message after processing
    } catch (error) {
      console.error("Error submitting solution:", error);
      setOutput(
        "Submission Failed: " + (error.response?.data?.error || error.message)
      );

      setSubmissionQueue((prevQueue) =>
        prevQueue.map((submission) =>
          submission.id === submissionId
            ? { ...submission, status: "failed" }
            : submission
        )
      );

      setSubmissionMessage(""); // Clear the message after processing
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
      <div className="submission-queue p-4 bg-white text-black">
        <h2 className="font-bold text-lg">Submission Queue:</h2>
        <ul>
          {submissionQueue.map((submission) => (
            <li key={submission.id}>
              Submission {submission.id}: {submission.status}
            </li>
          ))}
        </ul>
        <p>
          Test Cases Passed: {passedCount} / {totalTestCases}
        </p>
        {submissionMessage && <p>{submissionMessage}</p>}
        {testCaseResults.length > 0 &&
          !testCaseResults.some((result) => !result.passed) && (
            <div>
              <h3 className="font-bold text-lg">Test Case Results:</h3>
              <ul>
                {testCaseResults.map((result, index) => (
                  <li
                    key={index}
                    className={
                      result.passed ? "text-green-600" : "text-red-600"
                    }
                  >
                    Test Case {index + 1}: {result.passed ? "Passed" : "Failed"}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default CodeEditor;
