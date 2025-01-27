import React from "react";
import { FaArrowRight } from "react-icons/fa";

const topics = [
  { name: "Analysis of Algorithms" },
  { name: "Array" },
  { name: "Linked List" },
  { name: "Searching Algorithms" },
  { name: "Stack" },
  { name: "Sorting Algorithms" },
  { name: "Hashing" },
  { name: "Graph" },
];

const DSAComponent = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Data Structures & Algorithms
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {topics.map((topic, index) => (
          <Card key={index} name={topic.name} />
        ))}
      </div>
      <button className="text-white bg-gray-800 px-6 py-3 rounded hover:bg-gray-700 transition duration-300">
        View All
      </button>
    </div>
  );
};

const Card = ({ name }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg flex justify-between items-center hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105">
      <span className="truncate font-medium text-lg">{name}</span>
      <FaArrowRight className="text-2xl" />
    </div>
  );
};

export default DSAComponent;
