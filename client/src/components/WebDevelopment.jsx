import React from "react";
import {
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { SiDjango } from "react-icons/si";

const iconMap = {
  FaJava: FaJava,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  FaPython: FaPython,
  SiDjango: SiDjango,
};

const RoadmapSection = ({ title, items, buttonLabel }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-black">
        {title}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];
          return <TechnologyCard key={index} name={item.name} Icon={Icon} />;
        })}
      </div>
      <div className="text-center mt-6">
        <button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-500 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

const TechnologyCard = ({ name, Icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center space-y-3 hover:bg-purple-100 transition duration-300 mt-10">
      <Icon className="text-purple-600 text-4xl" />
      <span className="text-purple-700 font-bold text-lg">{name}</span>
    </div>
  );
};

export default RoadmapSection;
