import React, { useEffect, useState, useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailMockTest = () => {
  const { slug } = useParams();
  const [details, setDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);

  // This ref flags when the saved progress has been fetched so that
  // auto-save won’t fire with the default state.
  const progressFetched = useRef(false);
  // progressRef holds the latest progress values for use in beforeunload.
  const progressRef = useRef({
    currentQuestionIndex: 0,
    selectedOption: null,
    isSubmitted: false,
    isCorrect: null,
    attempts: 0,
  });
  const { token } = useSelector((state) => state.auth);

  // Keep progressRef up to date with the latest state.
  useEffect(() => {
    progressRef.current = {
      currentQuestionIndex,
      selectedOption,
      isSubmitted,
      isCorrect,
      attempts,
    };
  }, [currentQuestionIndex, selectedOption, isSubmitted, isCorrect, attempts]);

  // Fetch test details and saved progress
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/mock-test/get-test/${slug}`
        );
        setDetails(response.data.test);
        setTimer(response.data.test.timer);

        if (!progressFetched.current) {
          // Fetch saved progress only once
          const progressResponse = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/mock-test/get-progress/${slug}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (progressResponse.data.progress) {
            const progress = progressResponse.data.progress;
            setCurrentQuestionIndex(progress.currentQuestionIndex);
            setSelectedOption(progress.selectedOption);
            setIsSubmitted(progress.isSubmitted);
            setIsCorrect(progress.isCorrect);
            setAttempts(progress.attempts);
          }
          progressFetched.current = true;
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };
    fetchDetails();
  }, [slug, token]);

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Auto-save effect with debounce
  useEffect(() => {
    // Only run auto-save if progress has been fetched.
    if (!progressFetched.current) return;

    const saveProgress = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/mock-test/save-progress/${slug}`,
          {
            currentQuestionIndex,
            selectedOption,
            isSubmitted,
            isCorrect,
            attempts,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    };

    const debounceSave = setTimeout(saveProgress, 300);
    return () => clearTimeout(debounceSave);
  }, [
    currentQuestionIndex,
    selectedOption,
    isSubmitted,
    isCorrect,
    attempts,
    slug,
    token,
  ]);

  // Beforeunload effect: attach only once and use latest progress from progressRef
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!progressFetched.current) return;
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/mock-test/save-progress/${slug}`,
          progressRef.current,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((error) => {
          console.error("Error saving progress on unload:", error);
        });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [slug, token]);

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const questions = details.questions;
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionChange = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      alert("Please select an option before submitting!");
      return;
    }
    const correctAnswer = questions[currentQuestionIndex].correctOption;
    setIsCorrect(selectedOption === correctAnswer);
    setIsSubmitted(true);

    if (selectedOption !== correctAnswer) {
      setAttempts((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (attempts >= 2 && !isCorrect) {
      alert(
        "You must select the correct answer before moving to the next question!"
      );
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setIsCorrect(null);
      setAttempts(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setIsCorrect(null);
      setAttempts(0);
    }
  };

  const handleTestSubmit = () => {
    alert("Test submitted!");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDF8EE] text-gray-800">
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{details.title}</h1>
        <div className="text-lg font-semibold text-red-500">
          Timer: {formatTime(timer)}
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="hidden md:block w-1/3 bg-gray-100 p-6 border-b md:border-r border-gray-200">
          <p className="text-xl font-semibold mb-2">Your Progress</p>
          <div className="relative w-full h-4 bg-gray-300 rounded-full">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-lg font-bold mt-2">
            {Math.round(progressPercent)}%
          </p>
          <div className="grid grid-cols-6 gap-2 mt-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center font-bold text-lg rounded-full border-2 cursor-pointer transition-all ${
                  index === currentQuestionIndex
                    ? "border-red-500 bg-red-100"
                    : index < currentQuestionIndex
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </aside>

        <main className="w-full md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Question {currentQuestionIndex + 1}
            </h2>
            <p className="mb-6 text-gray-700 text-xl">
              {questions[currentQuestionIndex].text}
            </p>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label
                key={index}
                className={`block cursor-pointer p-4 rounded-lg border-2 mb-4 ${
                  isSubmitted && attempts >= 2 && !isCorrect
                    ? index === questions[currentQuestionIndex].correctOption
                      ? "border-green-500 bg-green-100"
                      : "border-gray-300"
                    : isSubmitted
                    ? index === questions[currentQuestionIndex].correctOption
                      ? "border-green-500 bg-green-100"
                      : index === selectedOption
                      ? "border-red-500 bg-red-100"
                      : "border-gray-300"
                    : selectedOption === index
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="option"
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(index)}
                  className="hidden"
                  disabled={isSubmitted && attempts >= 2 && !isCorrect}
                />
                {option}
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevious}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:opacity-50"
              disabled={currentQuestionIndex === 0}
            >
              <FaChevronLeft className="mr-2" /> Previous
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                className="bg-purple-500 mr-[78px] hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg"
                disabled={attempts >= 2 && !isCorrect}
              >
                Next <FaChevronRight className="ml-2" />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailMockTest;
