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
    <div className="p-4">
      <div className="rounded-lg w-full md:w-1/4 p-4">
        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid gap-4 bg-[#FDF8EE]">
          {icons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 bg-[#FDF8EE] text-black rounded-lg hover:bg-yellow-200 transition duration-300 cursor-pointer w-[90px] mt-3"
            >
              <item.icon className="text-2xl mb-1" />
              <span className="text-sm font-semibold">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Mobile View - Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto w-full scrollbar-hide">
          <div className="flex gap-4 w-max whitespace-nowrap">
            {icons.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-2 bg-[#FDF8EE] text-black rounded-lg hover:bg-yellow-200 transition duration-300 cursor-pointer w-[90px] min-w-[90px]"
              >
                <item.icon className="text-2xl mb-1" />
                <span className="text-sm font-semibold">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
