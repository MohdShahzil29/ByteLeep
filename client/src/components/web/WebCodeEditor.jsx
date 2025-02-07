import React, { useState, useEffect } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPlay,
  FaTerminal,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import * as esprima from "esprima";

const WebCodeEditor = () => {
  const [html, setHtml] = useState("<h1>Hello, World!</h1>");
  const [css, setCss] = useState("h1 { color: blue; }");
  const [js, setJs] = useState("console.log('Hello from JavaScript!');");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const handleRunClick = () => {
    let errorMessage = "";
    try {
      esprima.parseScript(js);
    } catch (e) {
      errorMessage = `Syntax Error: ${e.message}`;
    }

    const updatedSrcDoc = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>
            (function() {
              const oldLog = console.log;
              const oldError = console.error;
              const logs = [];

              console.log = function(...args) {
                logs.push(args.join(' '));
                oldLog.apply(console, args);
                window.parent.postMessage({ type: 'console', data: logs }, '*');
              };

              console.error = function(...args) {
                logs.push(args.join(' '));
                oldError.apply(console, args);
                window.parent.postMessage({ type: 'console', data: logs }, '*');
              };

              window.onerror = function(message, source, lineno, colno, error) {
                const errorMsg = \`Error: \${message} (at \${lineno}:\${colno})\`;
                logs.push(errorMsg);
                window.parent.postMessage({ type: 'console', data: logs }, '*');
                return false;
              };
            })();
            try {
              ${
                errorMessage
                  ? `throw new Error(${JSON.stringify(errorMessage)});`
                  : js
              }
            } catch (error) {
              console.error('JavaScript error:', error.message);
            }
          <\/script>
        </body>
      </html>
    `;
    setSrcDoc(updatedSrcDoc);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "console") {
        setConsoleOutput(event.data.data.join("\n"));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`flex flex-col min-h-screen p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold text-center">
        Byte Leep Web Code Editor
      </h1>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="mt-4 px-4 py-2 bg-blue-600 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-500 w-full md:w-auto mx-auto"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {/* Responsive Grid for Editors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Editor
          language="HTML"
          icon={<FaHtml5 />}
          value={html}
          onChange={setHtml}
          isDarkMode={isDarkMode}
        />
        <Editor
          language="CSS"
          icon={<FaCss3Alt />}
          value={css}
          onChange={setCss}
          isDarkMode={isDarkMode}
        />
        <Editor
          language="JavaScript"
          icon={<FaJs />}
          value={js}
          onChange={setJs}
          isDarkMode={isDarkMode}
        />
      </div>

      <button
        onClick={handleRunClick}
        className="mt-4 px-4 py-2 bg-green-600 rounded-lg flex items-center justify-center gap-2 hover:bg-green-500 w-full md:w-auto mx-auto"
      >
        <FaPlay /> Run
      </button>

      {/* Responsive Output Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <iframe
          title="output"
          srcDoc={srcDoc}
          className="w-full h-60 md:h-96 border border-gray-700 rounded-lg"
        ></iframe>

        <div
          className={`p-4 h-60 md:h-96 border rounded-lg overflow-auto ${
            isDarkMode
              ? "bg-black text-green-400 border-gray-700"
              : "bg-gray-100 text-black border-gray-300"
          }`}
        >
          <h2 className="text-lg flex items-center gap-2 mb-2">
            <FaTerminal /> Console Output
          </h2>
          <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
        </div>
      </div>
    </div>
  );
};

const Editor = ({ language, icon, value, onChange, isDarkMode }) => {
  return (
    <div
      className={`flex flex-col p-4 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      <h2 className="text-lg flex items-center gap-2 mb-2">
        {icon} {language}
      </h2>
      <textarea
        className={`w-full h-32 md:h-48 p-2 rounded-md focus:outline-none focus:ring-2 ${
          isDarkMode
            ? "bg-gray-900 text-white border-gray-700 focus:ring-blue-500"
            : "bg-white text-black border-gray-300 focus:ring-blue-300"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default WebCodeEditor;
