import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const AssessmentPlatform = () => {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [enrolled, setEnrolled] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  console.log("Details", details);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/mock-test/get-all-test`
        );
        setDetails(response.data.tests);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const enrollCourse = async (testId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/mock-test/enroll-test`,
        { testId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Use response.data.success to determine if enrollment succeeded.
      if (response.data.success) {
        setEnrolled(true);
        return true;
      } else {
        setEnrolled(false);
        return false;
      }
    } catch (error) {
      console.error(
        "Enrollment failed:",
        error.response ? error.response.data : error.message
      );
      return false;
    }
  };

  // Updated to receive both slug and courseId
  const handleStartTest = async (slug, testId) => {
    const enrollmentSuccess = await enrollCourse(testId);
    if (enrollmentSuccess) {
      setIsLoading(true);
      setCountdown(5);
      const timerInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timerInterval);
            setIsLoading(false);
            navigate(`/test/${slug}`);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      alert("Failed to enroll in the course. Please try again.");
    }
  };

  const filteredTests = details.filter((test) =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
        <p className="mt-4 text-lg">Redirecting in {countdown} seconds</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-4xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Get Ready for Your Next Online Assessment
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Practice with our mock tests and ace your interviews
        </p>
        <input
          type="text"
          placeholder="What would you want to learn? e.g. JavaScript..."
          className="w-full md:w-1/2 xl:w-1/3 p-3 rounded-lg border border-gray-300 mb-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full max-w-5xl flex flex-wrap justify-center gap-8">
        {filteredTests.length > 0 ? (
          filteredTests.map((test, index) => (
            <article
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 w-full max-w-xs"
            >
              <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
              <p className="text-gray-600 mb-2">{test.description}</p>
              <button
                onClick={() => handleStartTest(test?.slug, test?._id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105"
              >
                {enrolled ? "Continue Test" : "Enroll Test"}
              </button>
            </article>
          ))
        ) : (
          <p className="text-gray-600">No tests found.</p>
        )}
      </div>
    </div>
  );
};

export default AssessmentPlatform;
