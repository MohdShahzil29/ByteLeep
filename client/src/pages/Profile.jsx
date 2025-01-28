import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const user = {
    photoUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    description: "Software Engineer and Problem Solver.",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    stats: {
      easySolved: 75,
      mediumSolved: 50,
      hardSolved: 30,
    },
    problemsSolved: ["Two Sum", "Reverse Linked List", "Binary Search"],
    points: 1200,
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 py-10 px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/3 bg-gray-100 rounded-xl shadow-lg p-8 flex flex-col items-start mb-6 md:mb-0">
          <img
            src={user.photoUrl}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-6 shadow-lg mx-auto md:mx-0"
          />
          <h1 className="text-3xl font-bold mb-2 text-center md:text-left">
            {user.name}
          </h1>
          <p className="text-gray-600 mb-4 text-center md:text-left">
            {user.description}
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href={user.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin
                size={28}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              />
            </a>
            <a href={user.github} target="_blank" rel="noreferrer">
              <FaGithub
                size={28}
                className="text-gray-800 hover:text-black transition-colors"
              />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/3 flex flex-col space-y-6 md:ml-6">
          {/* Stats Section */}
          <div className="bg-gray-100 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Problem Solving Stats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(user.stats).map(([level, solved], index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-200 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-bold capitalize mb-2">{level}</h3>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${solved}%` }}
                    transition={{ duration: 1 }}
                    className="h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    style={{ width: `${solved}%` }}
                  ></motion.div>
                  <p className="mt-2 text-sm font-medium">{solved}% Solved</p>
                </div>
              ))}
            </div>
          </div>

          {/* Problems Solved Section */}
          <div className="bg-gray-100 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Problems Solved</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.problemsSolved.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-4 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <AiOutlineStar className="text-yellow-500" />
                    <span className="text-gray-800 font-medium">{problem}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Points Section */}
          <div className="bg-gray-100 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold">Points Collected</h2>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-blue-500 mt-4"
            >
              {user.points}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
