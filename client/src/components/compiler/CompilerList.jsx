import React from "react";
import {
  FaPython,
  FaJava,
  FaJsSquare,
  FaHtml5,
  FaCss3,
  FaPhp,
  FaSwift,
  FaRust,
} from "react-icons/fa";
import { SiC, SiCplusplus } from "react-icons/si";
// Removed: import { SiCsharp } from "react-icons/si";

const CompilerList = () => {
  const icons = [
    { name: "C", icon: SiC, color: "text-blue-500" },
    { name: "C++", icon: SiCplusplus, color: "text-blue-700" },
    // Removed the C# icon as it is not available
    { name: "Java", icon: FaJava, color: "text-orange-500" },
    { name: "Python", icon: FaPython, color: "text-blue-500" },
    { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400" },
    { name: "PHP", icon: FaPhp, color: "text-purple-600" },
    { name: "HTML", icon: FaHtml5, color: "text-orange-600" },
    { name: "CSS", icon: FaCss3, color: "text-blue-500" },
    { name: "Swift", icon: FaSwift, color: "text-orange-500" },
    { name: "Rust", icon: FaRust, color: "text-orange-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {icons.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <item.icon className={`text-4xl ${item.color}`} />
          <p className="mt-2 text-gray-700">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CompilerList;
