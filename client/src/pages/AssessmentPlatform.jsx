import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const AssessmentPlatform = () => {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [enrolledTests, setEnrolledTests] = useState({});

  // Fetch all tests and enrolled tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        // Fetch all tests
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/mock-test/get-all-test`
        );
        setTests(response.data.tests);

        // Fetch enrolled tests
        fetchEnrolledTests();
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  // Fetch enrolled tests for the user
  const fetchEnrolledTests = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/mock-test/get-enrolled-tests`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Store enrolled tests in state as a lookup object
      const enrolledTestsMap = {};
      response.data.enrolledTests.forEach((test) => {
        enrolledTestsMap[test._id] = true;
      });
      setEnrolledTests(enrolledTestsMap);
    } catch (error) {
      console.error("Error fetching enrolled tests:", error);
    }
  };

  // Handle search functionality
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim()) {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_BASE_URL
            }/mock-test/search?query=${searchTerm}`
          );
          setTests(response.data.tests);
        } catch (error) {
          console.error("Search API error:", error);
        }
      } else {
        fetchEnrolledTests();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Enroll user in a test
  const enrollCourse = async (testId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/mock-test/enroll-test`,
        { testId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        await fetchEnrolledTests(); // Re-fetch enrolled tests
        return true;
      }
      return false;
    } catch (error) {
      console.error(
        "Enrollment failed:",
        error.response ? error.response.data : error.message
      );
      return false;
    }
  };

  // Handle test start
  const handleStartTest = async (slug, testId) => {
    if (!enrolledTests[testId]) {
      const enrollmentSuccess = await enrollCourse(testId);
      if (!enrollmentSuccess) {
        alert("Failed to enroll in the test. Please try again.");
        return;
      }
    }

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
  };

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
          placeholder="Search for tests..."
          className="w-full md:w-1/2 xl:w-1/3 p-3 rounded-lg border border-gray-300 mb-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-4">
        {tests.length > 0 ? (
          tests.map((test) => (
            <div
              key={test._id}
              className="w-full border-b border-gray-300 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="text-2xl font-bold text-gray-800">
                  {test.title}
                </h3>
                <p className="text-gray-600 mt-2">{test.description}</p>
              </div>
              <button
                onClick={() => handleStartTest(test.slug, test._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                {enrolledTests[test._id] ? "Continue Test" : "Enroll Test"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No tests found.</p>
        )}
      </div>
    </div>
  );
};

export default AssessmentPlatform;
