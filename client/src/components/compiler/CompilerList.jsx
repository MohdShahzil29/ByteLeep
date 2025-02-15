import React from "react";
import { Link } from "react-router-dom";
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
import { FaGolang } from "react-icons/fa6";

const CompilerList = () => {
  const icons = [
    { name: "C", icon: SiC, color: "text-blue-500" },
    { name: "C++", icon: SiCplusplus, color: "text-blue-700" },
    { name: "Java", icon: FaJava, color: "text-orange-500" },
    { name: "Python", icon: FaPython, color: "text-blue-500" },
    { name: "PHP", icon: FaPhp, color: "text-purple-600" },
    { name: "Web Development", icon: FaHtml5, color: "text-orange-600" },
    { name: "Go-lang", icon: FaGolang, color: "text-blue-500" },
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
          <Link to={`/online-compiler/${item.name}`}>
            {" "}
            {/* Add the Link to navigate */}
            <item.icon className={`text-4xl ${item.color}`} />
            <p className="mt-2 text-gray-700">{item.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CompilerList;
