import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import { FaPlay, FaCheck, FaCog, FaSun, FaMoon } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [problemId, setProblemId] = useState(null);
  const [submissionQueue, setSubmissionQueue] = useState([]);
  const [passedCount, setPassedCount] = useState(0);
  const [totalTestCases, setTotalTestCases] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const helloWorldCode = {
          java: `public class Main {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`,
          python: `print("Hello, World!")`,
          c_cpp: `#include <iostream>
  using namespace std;

  int main() {
      cout << "Hello, World!" << endl;
      return 0;
  }`,
        };

        const languageKey =
          language.name.toLowerCase() === "c++"
            ? "c_cpp"
            : language.name.toLowerCase();
        setCode(helloWorldCode[languageKey] || "");

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/dsa/get-problem/${slug}`
        );
        const data = response.data;
        setProblemId(data?.slug);
      } catch (error) {
        console.error("Error fetching problem data:", error);
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
    setLoading(true);
    try {
      const inputResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dsa/get-input/${slug}`
      );
      let inputData = inputResponse.data.input || "";

      let pricesArray = [];
      if (
        Array.isArray(inputData) &&
        inputData.length > 0 &&
        inputData[0].prices
      ) {
        pricesArray = inputData[0].prices;
      } else if (inputData.prices) {
        pricesArray = inputData.prices;
      }

      const formattedInputData = pricesArray.join(" ");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/execute`,
        {
          language: language.name.toLowerCase(),
          code,
          inputData: formattedInputData,
        }
      );

      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const submissionId = Date.now();
    setSubmissionQueue((prevQueue) => [
      ...prevQueue,
      { id: submissionId, status: "pending" },
    ]);

    setSubmissionMessage("Submission is in queue");

    try {
      // Remove input and output from the body
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/dsa/submit`,
        {
          slug,
          language: language.name.toLowerCase(),
          code,
        }
      );

      const { passedCount, totalTestCases, results } = response.data;

      const failedResult = results.find((result) => !result.passed);
      if (failedResult) {
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

        setSubmissionMessage("");
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
      setTestCaseResults(results);
      setSubmissionMessage("");
    } catch (error) {
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

      setSubmissionMessage("");
    }
  };

  return (
    <div
      className={`flex flex-col flex-grow overflow-hidden ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } transition-colors duration-300`}
    >
      <header
        className={`flex items-center p-4 ${
          isDarkMode ? "bg-gray-800 shadow-md" : "bg-gray-200 shadow-sm"
        } relative`}
      >
        <span
          className={`font-bold text-lg ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Byte Leepr
        </span>
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
          className="ml-4 text-white cursor-pointer"
          onClick={() => setShowSettings(!showSettings)}
        >
          <FaCog size={24} />
        </button>
        <button
          className="ml-4 cursor-pointer"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </header>
      {showSettings && (
        <div
          className={`absolute top-16 right-4 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          } shadow-md p-4 rounded z-50 mt-[79px]`}
        >
          <h3
            className={`font-bold mb-2 ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Settings
          </h3>
          <label className="block text-sm font-medium text-gray-300">
            Theme:
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-300">
            Font Size:
          </label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowSettings(false)}
            className="w-full p-2 bg-gray-700 text-white rounded mt-2 cursor-pointer"
          >
            Close
          </button>
        </div>
      )}
      <div
        className={`flex-grow ${
          isDarkMode ? "bg-gray-800" : "bg-gray-200"
        } overflow-auto shadow-2xl p-4 rounded-lg flex flex-col md:flex-row`}
      >
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
          className="rounded-lg shadow-md flex-grow"
        />
      </div>
      <div
        className={`output p-4 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } shadow-md rounded-lg`}
      >
        <h2
          className={`font-bold text-lg ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Output:
        </h2>
        <pre
          className={`${
            isDarkMode ? "bg-gray-900" : "bg-gray-100"
          } p-4 rounded-lg shadow-inner`}
        >
          {output}
        </pre>
      </div>
      <footer
        className={`flex justify-end items-center p-4 ${
          isDarkMode ? "bg-gray-800 shadow-md" : "bg-gray-200 shadow-sm"
        } rounded-lg`}
      >
        <button
          className="mr-2 px-4 py-2 border border-blue-400 text-blue-400 flex items-center cursor-pointer"
          onClick={handleRunCode}
          disabled={loading}
        >
          <FaPlay className="mr-2" />
          {loading ? "Running..." : "Compile & Run"}
        </button>
        <button
          className="px-4 py-2 bg-blue-500 rounded text-white flex items-center cursor-pointer"
          onClick={handleSubmit}
          disabled={loading}
        >
          <FaCheck className="mr-2" />
          Submit
        </button>
      </footer>
      <div
        className={`submission-queue p-4 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } shadow-md rounded-lg`}
      >
        <h2
          className={`font-bold text-lg ${
            isDarkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Test Case Result:
        </h2>
        <ul>
          {submissionQueue.map((submission) => (
            <li key={submission.id} className="mb-2">
              Submission {submission.id}:{" "}
              <span
                className={
                  submission.status === "pending"
                    ? "text-yellow-400"
                    : submission.status === "completed"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {submission.status}
              </span>
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
              <h3
                className={`font-bold text-lg ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Test Case Results:
              </h3>
              <ul>
                {testCaseResults.map((result, index) => (
                  <li
                    key={index}
                    className={
                      result.passed ? "text-green-400" : "text-red-400"
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
