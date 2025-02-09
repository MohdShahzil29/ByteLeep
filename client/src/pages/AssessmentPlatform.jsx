import React from "react";
import { FaLaptopCode, FaDatabase, FaCode } from "react-icons/fa";

const AssessmentCard = ({
  icon,
  title,
  description,
  tags,
  buttonText,
  color,
}) => {
  return (
    <article className="bg-white rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 w-full max-w-xs">
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`bg-${color}-100 text-${color}-800 px-3 py-1 rounded-full text-sm`}
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        className={`w-full bg-${color}-500 hover:bg-${color}-600 text-white px-4 py-2 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105`}
      >
        {buttonText}
      </button>
    </article>
  );
};

const AssessmentPlatform = () => {
  const cardsData = [
    {
      icon: <FaLaptopCode className="text-4xl text-blue-500 mb-4" />,
      title: "Operating System for Placements",
      description:
        "A comprehensive mock test to master operating system concepts essential for technical interviews, covering processes, memory management, and concurrency.",
      tags: ["Operating System", "Placements", "Processes"],
      buttonText: "Start Test",
      color: "blue",
    },
    {
      icon: <FaDatabase className="text-4xl text-red-500 mb-4" />,
      title: "DBMS for Placements",
      description:
        "Prepare for database management system questions with this mock test, covering SQL queries, normalization, transactions, and indexing.",
      tags: ["Database Management System", "SQL", "Normalization"],
      buttonText: "Start Test",
      color: "red",
    },
    {
      icon: <FaCode className="text-4xl text-yellow-500 mb-4" />,
      title: "C Language for Interviews",
      description:
        "Prepare for database management system questions with this mock test, covering SQL queries, normalization, transactions, and indexing.",
      tags: ["C Programming", "Data Structures", "Pointers"],
      buttonText: "Start Test",
      color: "yellow",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-4xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
          Get Ready for your next Online Assessment
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in animation-delay-500">
          Practice with our mock tests and ace your interviews
        </p>
        <input
          type="text"
          placeholder="What would you want to learn? e.g. Python..."
          className="w-full md:w-1/2 xl:w-1/3 p-3 rounded-lg border border-gray-300 mb-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8">
        {cardsData.map((card, index) => (
          <AssessmentCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default AssessmentPlatform;
