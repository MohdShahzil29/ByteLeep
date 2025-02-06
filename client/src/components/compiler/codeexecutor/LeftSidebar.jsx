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
import { FaGolang } from "react-icons/fa6";

const LeftSidebar = ({ onLanguageSelect }) => {
  const icons = [
    { name: "C", icon: SiC },
    { name: "C++", icon: SiCplusplus },
    { name: "Java", icon: FaJava },
    { name: "Python", icon: FaPython },
    { name: "PHP", icon: FaPhp },
    { name: "Web Dev", icon: FaHtml5 },
    { name: "Go-lang", icon: FaGolang },
    { name: "Swift", icon: FaSwift },
    { name: "Rust", icon: FaRust },
  ];

  return (
    <div className="p-4">
      <div className="rounded-lg w-full md:w-1/4 p-4">
        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid gap-4 bg-[#FDF8EE]">
          {icons.map((item, index) => (
            <div
              key={index}
              onClick={() => onLanguageSelect(item.name)}
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
                onClick={() => onLanguageSelect(item.name)}
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
