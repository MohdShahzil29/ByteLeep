import React from "react";
import {
  FaLaptopCode,
  FaCheckCircle,
  FaBookReader,
  FaClock,
} from "react-icons/fa";

const CoursePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Operating System Mock Test
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Prepare for your technical interviews with our comprehensive mock
          test.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105">
          Start Mock Test
        </button>
      </header>

      {/* Description Section */}
      <section className="max-w-4xl text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">About the Mock Test</h2>
        <div className="flex flex-col md:flex-row justify-around items-stretch gap-8">
          {/* Key Feature: Comprehensive Coverage */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaLaptopCode className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Comprehensive Coverage
            </h3>
            <p className="text-gray-600">
              Covers all essential operating system concepts, including
              processes, memory management, and concurrency.
            </p>
          </div>

          {/* Key Feature: Realistic Questions */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaCheckCircle className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Realistic Questions</h3>
            <p className="text-gray-600">
              Experience questions similar to those found in real technical
              interviews.
            </p>
          </div>

          {/* Key Feature: Immediate Feedback */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaBookReader className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Immediate Feedback</h3>
            <p className="text-gray-600">
              Receive instant feedback on your answers to help you improve.
            </p>
          </div>

          {/* Key Feature: Timed Testing */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaClock className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Timed Testing</h3>
            <p className="text-gray-600">
              Practice under timed conditions to simulate real exam scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6">Why Take This Mock Test?</h2>
        <p className="text-lg text-gray-600 mb-4">
          This mock test is designed to help you build confidence and improve
          your performance in technical interviews. By practicing with realistic
          questions and receiving immediate feedback, you can identify areas for
          improvement and enhance your understanding of operating system
          concepts.
        </p>
        <p className="text-lg text-gray-600">
          Whether you're preparing for a job interview, an exam, or simply want
          to test your knowledge, this mock test provides a valuable learning
          experience.
        </p>
      </section>
    </div>
  );
};

export default CoursePage;
