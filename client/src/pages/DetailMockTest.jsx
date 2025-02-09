import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const DetailMockTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions] = useState([
    {
      id: 1,
      text: 'Which statement is not correct about "init" process in Unix?',
      options: [
        "It is generally the parent of the login shell",
        "It has PID 1",
        "It is the first process in the system",
        'Init forks and execs a "getty" process at every port connected to a terminal',
      ],
    },
    // Add more questions as needed
  ]);

  const progress = (currentQuestion / questions.length) * 100;

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    alert("Test submitted!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FDF8EE] text-gray-800">
      <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Course Discussions</h2>
        <ul>
          {[...Array(5)].map((_, i) => (
            <li key={i} className="mb-3">
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Mock Test (Set-{i + 1})
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-6 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">Mock Test (Set-1)</h1>
          <div className="text-lg font-medium">Remaining Time: 00:24:47</div>
        </div>
        <div className="w-full mb-6">
          <div className="text-lg font-semibold text-center mb-2">Progress</div>
          <div className="relative w-full bg-gray-200 rounded-full h-3 flex items-center">
            <span className="absolute left-0 text-xs font-semibold text-gray-800">
              0%
            </span>
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="absolute right-0 text-xs font-semibold text-gray-800">
              100%
            </span>
          </div>
        </div>
        <div className="mb-6">
          <div className="text-lg font-semibold mb-4">
            Question {currentQuestion}
          </div>
          <p className="mb-4 text-gray-700 text-lg">
            {questions[currentQuestion - 1].text}
          </p>
          <div>
            {questions[currentQuestion - 1].options.map((option, index) => (
              <div key={index} className="mb-3">
                <label className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all">
                  <input
                    type="radio"
                    name="option"
                    checked={selectedOption === index}
                    onChange={() => handleOptionChange(index)}
                    className="mr-3"
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevious}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center disabled:opacity-50"
            disabled={currentQuestion === 1}
          >
            <FaChevronLeft className="mr-2" /> Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center disabled:opacity-50"
            disabled={currentQuestion === questions.length}
          >
            Next <FaChevronRight className="ml-2" />
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailMockTest;
