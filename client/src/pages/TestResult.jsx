import React from "react";
import { useLocation } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaTrophy, FaLightbulb } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const TestResult = () => {
  const { state } = useLocation();
  const { results } = state || { results: [] };

  const correctOnFirstTry = results.filter(
    (result) => result && result.correct && result.attempts === 0
  ).length;
  const correctAfterMultipleAttempts = results.filter(
    (result) => result && result.correct && result.attempts > 0
  ).length;
  const totalQuestions = results.length;

  // Pie chart data – display as a donut chart.
  const data = {
    labels: ["First Try", "After Attempts"],
    datasets: [
      {
        data: [correctOnFirstTry, correctAfterMultipleAttempts],
        backgroundColor: ["#4ade80", "#facc15"],
        hoverBackgroundColor: ["#22c55e", "#eab308"],
        borderWidth: 2,
      },
    ],
  };

  const performanceMessage =
    correctOnFirstTry === totalQuestions
      ? "Outstanding! You answered all questions correctly on your first try. Keep shining!"
      : "Great effort! Every mistake is a step toward mastery. Keep practicing and you'll get there!";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-center text-white mb-8">
          Test Results
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <Pie
              data={data}
              options={{
                cutout: "60%",
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                      font: {
                        size: 16,
                      },
                    },
                  },
                },
              }}
            />
          </div>
          <div className="text-white text-xl space-y-4">
            <p>
              Total Questions:{" "}
              <span className="font-bold">{totalQuestions}</span>
            </p>
            <p>
              Correct on First Try:{" "}
              <span className="font-bold">{correctOnFirstTry}</span>
            </p>
            <p>
              Correct after Multiple Attempts:{" "}
              <span className="font-bold">{correctAfterMultipleAttempts}</span>
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <div className="flex items-center justify-center mb-4">
            {correctOnFirstTry === totalQuestions ? (
              <FaTrophy className="text-5xl text-yellow-400 mr-3" />
            ) : (
              <FaLightbulb className="text-5xl text-blue-400 mr-3" />
            )}
            <h2 className="text-3xl font-semibold text-white">
              {performanceMessage}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
