import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom"; // To access the language from the URL
import axios from "axios";

const welcomeCodes = {
  C: `#include <stdio.h>\nint main() {\n    printf("Welcome to ByteLeep!");\n    return 0;\n}`,
  "C++": `#include <iostream>\nint main() {\n    std::cout << "Welcome to ByteLeep!";\n    return 0;\n}`,
  Java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Welcome to ByteLeep!");\n    }\n}`,
  Python: `print("Welcome to ByteLeep!")`,
  PHP: `<?php\necho "Welcome to ByteLeep!";\n?>`,
  "Web Dev": `<!DOCTYPE html>\n<html>\n<body>\n<h1>Welcome to ByteLeep!</h1>\n</body>\n</html>`,
  "Go-lang": `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Welcome to ByteLeep!")\n}`,
  Swift: `print("Welcome to ByteLeep!")`,
  Rust: `fn main() {\n    println!("Welcome to ByteLeep!");\n}`,
};

const RightCodeEditor = ({ selectedLanguage }) => {
  const { language } = useParams();
  const [code, setCode] = useState(welcomeCodes[language] || "");
  const [output, setOutput] = useState("");

  const currentLanguage = selectedLanguage || language;

  useEffect(() => {
    setCode(welcomeCodes[currentLanguage]);
  }, [currentLanguage]);

  const handleRun = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/run-code`,
        {
          language: currentLanguage,
          code: code,
        }
      );
      setOutput(response.data.output);
    } catch (error) {
      setOutput(
        `Error: ${error.response?.data?.error || "Something went wrong"}`
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 mt-10 gap-4">
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">
            Main.
            {currentLanguage === "Java"
              ? "java"
              : currentLanguage.toLowerCase()}
          </span>
        </div>
        <div className="p-4 flex-1 min-h-[200px]">
          <textarea
            className="w-full h-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
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

      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden p-4 flex flex-col min-h-[200px]">
        <div className="mb-4">
          <span className="text-lg font-semibold">Output</span>
        </div>
        <div className="p-4 border rounded-lg h-full overflow-y-auto flex-1">
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default RightCodeEditor;
