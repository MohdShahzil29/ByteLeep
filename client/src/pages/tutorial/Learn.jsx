import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Learn = () => {
  const [openSections, setOpenSections] = useState({});

  const sections = [
    {
      title: "JavaScript Basics",
      key: "basics",
      subtopics: [
        "Introduction to JavaScript",
        "JavaScript Syntax",
        "How to add JS in HTML",
        "JS Comments & Output",
      ],
    },
    {
      title: "JS Variables & Datatypes",
      key: "variables",
      subtopics: ["Variables in JS", "Data Types in JS", "Let vs Var vs Const"],
    },
    {
      title: "JS Operators",
      key: "operators",
      subtopics: [
        "Arithmetic Operators",
        "Logical Operators",
        "Comparison Operators",
      ],
    },
    {
      title: "JS Statements",
      key: "statements",
      subtopics: ["Conditional Statements", "Switch Case", "Try Catch"],
    },
    {
      title: "JS Loops",
      key: "loops",
      subtopics: ["For Loop", "While Loop", "Do-While Loop"],
    },
    {
      title: "JS Performance & Debugging",
      key: "performance",
      subtopics: ["Debugging in JS", "Performance Optimization"],
    },
    {
      title: "JS Functions",
      key: "functions",
      subtopics: [
        "Function Declaration",
        "Function Expression",
        "Arrow Functions",
        "Function Scope",
      ],
    },
    {
      title: "JS Arrays",
      key: "arrays",
      subtopics: [
        "Array Declaration",
        "Array Methods",
        "Array Iteration",
        "Multi-dimensional Arrays",
      ],
    },
    {
      title: "JS Objects",
      key: "objects",
      subtopics: [
        "Object Creation",
        "Object Properties",
        "Object Methods",
        "Object Prototypes",
      ],
    },
    {
      title: "JS Events",
      key: "events",
      subtopics: [
        "Event Handling",
        "Event Listeners",
        "Event Propagation",
        "Event Delegation",
      ],
    },
    {
      title: "JS DOM Manipulation",
      key: "dom",
      subtopics: [
        "Selecting Elements",
        "Modifying Elements",
        "Creating Elements",
        "Removing Elements",
      ],
    },
    {
      title: "JS Asynchronous Programming",
      key: "async",
      subtopics: ["Callbacks", "Promises", "Async/Await", "Event Loop"],
    },
    {
      title: "JS Error Handling",
      key: "error-handling",
      subtopics: [
        "Throwing Errors",
        "Try-Catch Blocks",
        "Error Objects",
        "Custom Errors",
      ],
    },
  ];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="p-4">
      {/* Desktop Layout with Vertical Scroll */}
      <div className="hidden sm:block max-h-[820px] overflow-y-auto p-[35px] rounded-lg">
        <h2 className="text-green-500 font-bold text-lg mb-4">
          JavaScript Tutorial
        </h2>
        {sections.map((section) => (
          <div key={section.key} className="mb-4">
            <button
              className="font-semibold text-gray-800 flex items-center justify-between w-full"
              onClick={() => toggleSection(section.key)}
            >
              {section.title}
              {openSections[section.key] ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
            {openSections[section.key] && (
              <ul className="pl-4 mt-2">
                {section.subtopics.map((sub, index) => (
                  <li key={index} className="text-gray-600 mb-1">
                    🔹 {sub}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Layout with Horizontal Scroll + Dropdown */}
      <div className="sm:hidden overflow-x-auto flex space-x-4 p-2 scrollbar-hide">
        {sections.map((section) => (
          <div
            key={section.key}
            className="min-w-[200px] bg-white  p-4"
          >
            <button
              className="font-semibold text-gray-800 flex items-center justify-between w-full"
              onClick={() => toggleSection(section.key)}
            >
              {section.title}
              {openSections[section.key] ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
            {openSections[section.key] && (
              <ul className="pl-4 mt-2">
                {section.subtopics.map((sub, index) => (
                  <li key={index} className="text-gray-600 mb-1">
                    🔹 {sub}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
