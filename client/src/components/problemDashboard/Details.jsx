import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaInfoCircle,
  FaTags,
  FaBuilding,
  FaNewspaper,
  FaCompass,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useParams } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState(null);
  const {slug} = useParams();

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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ResizableBox
      width={700}
      height={Infinity}
      minWidth="300px"
      maxWidth="600px"
      axis="x"
      resizeHandles={["e"]}
      className="bg-white shadow-md flex-shrink-0 overflow-hidden"
    >
      <div className="p-4 h-full overflow-auto">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {data.title}
          </h1>
          <FaInfoCircle className="text-gray-500 dark:text-gray-400" />
        </header>

        <div className="mb-4 flex gap-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Difficulty: {data.difficulty}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Accuracy: {data.accuracy}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Points: {data.points}
          </p>
        </div>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          {data.description}
        </p>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
            Examples:
          </h2>
          {data.input.map((inp, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Input: {inp}
              </p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Output: {data.output[index]}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {data.shortExplanation}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
            Constraints:
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{data.constraints}</p>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-300">
          Try more examples
        </button>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
            Company Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.companyTags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">
            Topic Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.topicTags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center hover:bg-yellow-600 transition duration-300">
          <FaExclamationTriangle className="mr-2" />
          Report An Issue
        </button>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          If you are facing any issue on this page, please let us know.
        </p>
      </div>
    </ResizableBox>
  );
};

export default Details;
