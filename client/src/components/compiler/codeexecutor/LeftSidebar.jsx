import React from "react";
import {
  FaPython,
  FaReact,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaNodeJs,
  FaPhp,
  FaSwift,
  FaAngular,
} from "react-icons/fa";

const LeftSidebar = () => {
  const icons = [
    { name: "Python", icon: FaPython },
    { name: "React", icon: FaReact },
    { name: "Database", icon: FaDatabase },
    { name: "HTML5", icon: FaHtml5 },
    { name: "CSS3", icon: FaCss3Alt },
    { name: "JavaScript", icon: FaJsSquare },
    { name: "Node.js", icon: FaNodeJs },
    { name: "PHP", icon: FaPhp },
    { name: "Swift", icon: FaSwift },
    { name: "Angular", icon: FaAngular },
  ];
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-[#FDF8EE] shadow-lg rounded-lg w-full md:w-1/4">
        {icons.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer w-1/3 sm:w-1/4 md:w-full"
          >
            <item.icon className="text-2xl mb-1" />
            <span className="text-sm font-semibold cursor-pointer">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
