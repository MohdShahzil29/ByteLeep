import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
// import Loader from "../Loader";
import Spinner from "../Spinner";
import SeoLayout from "../SeoLayout";

const Details = () => {
  const [data, setData] = useState(null);
  const [relatedProblem, setRelatedProblem] = useState(null);
  const { slug } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/dsa/get-problem/${slug}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [slug]);

  const getRelatedProblem = async (pid, cid) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dsa/related-problem/${pid}/${cid}`
      );
      setRelatedProblem(res.data.relatedProblem);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      data &&
      data._id &&
      Array.isArray(data.category) &&
      data.category.length > 0
    ) {
      getRelatedProblem(data._id, data.category[0]);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="text-center py-10 text-gray-700 text-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4">
        <SeoLayout 
        title={data.title ? `${data.title} | Byte Leep` : "Problem Details | Byte Leep"}
        description={data.description || "Check out this problem on Byte Leep"}
        keywords="DSA, Problem Solving, Byte Leep"
      />
      <ResizableBox
        width={800}
        height={Infinity}
        minWidth={400}
        maxWidth={1200}
        axis="x"
        resizeHandles={["e"]}
        className="bg-white shadow-lg flex-shrink-0 overflow-hidden w-full max-w-full h-screen"
      >
        <div className="p-6 h-full overflow-auto">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {data.title || "No Title"}
            </h1>
            <FaInfoCircle className="text-gray-500 text-xl" />
          </header>

          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            <span className="bg-gray-200 px-3 py-1 rounded">
              Difficulty: {data.difficulty || "N/A"}
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded">
              Accuracy: {data.accuracy ? `${data.accuracy}%` : "N/A"}
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded">
              Points: {data.points || "N/A"}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            {data.description || "No description available."}
          </p>

          {Array.isArray(data.input) && Array.isArray(data.output) && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Examples
              </h2>
              {data.input.map((inp, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
                  <p className="text-gray-800 font-medium">
                    Input: {JSON.stringify(inp)}
                  </p>
                  <p className="text-gray-800 font-medium">
                    Output: {JSON.stringify(data.output[index])}
                  </p>
                  {data.shortExplanation && (
                    <p className="text-gray-600">{data.shortExplanation}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.constraints && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Constraints
              </h2>
              <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">
                {data.constraints}
              </p>
            </div>
          )}

          <div className="mb-6 flex flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Company Tags:
            </h2>
            {Array.isArray(data.companyTags) ? (
              data.companyTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No company tags available.</p>
            )}
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Topic Tags:</h2>
            {Array.isArray(data.topicTags) ? (
              data.topicTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No topic tags available.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto">
              Try more examples
            </button>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600 transition w-full sm:w-auto"
              onClick={() => navigation("/contact-us")}
            >
              <FaExclamationTriangle /> Report An Issue
            </button>
          </div>

          <p
            className="text-sm text-gray-500 mt-6"
            onClick={() => navigation("/contact-us")}
          >
            If you are facing any issues on this page, please let us know.
          </p>

            {/* Related Problems Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Related Problems
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProblem && relatedProblem.length > 0 ? (
                  relatedProblem.map((problem, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-gray-200"
                      onClick={() => navigation(`/problem/${problem.slug}`)}
                    >
                      <h3 className="text-lg font-medium text-gray-800">
                        {problem.title}
                      </h3>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No related problems found.</p>
                )}
              </div>
            </div>
        </div>
      </ResizableBox>
    </div>
  );
};

export default Details;
