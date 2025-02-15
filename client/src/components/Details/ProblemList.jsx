import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import SeoLayout from "../SeoLayout";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { slug } = useParams();
  const navigate = useNavigate();
  console.log("Problem", problems)

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/category/problems/${slug}`
      );
      setCategory(response.data.category);
      setProblems(response.data.problems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const renderCompanies = (companyTags) => {
    if (!companyTags || companyTags.length === 0) return "";
    const displayed = companyTags.slice(0, 2);
    const extra = companyTags.length - displayed.length;
    return extra > 0
      ? `${displayed.join(", ")} +${extra}`
      : displayed.join(", ");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full p-4 h-[calc(100vh-100px)] overflow-y-auto">
      <SeoLayout
        title={`Problems in ${category?.name || "Loading..."}`}
        description={`Explore ${category?.name} problems and enhance your coding skills.`}
        keywords="coding problems, DSA, algorithms, problem-solving"
      />
      <h2 className="text-2xl font-semibold mb-4">Problem List</h2>
      <div className="space-y-4">
        {problems.map((problem, index) => (
          <div
            key={index}
            className="flex justify-between items-start p-4 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition w-full"
          >
            <div className="flex items-start space-x-2">
              <IoBookmarkOutline className="text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
              <div>
                <h3
                  className="text-lg font-medium cursor-pointer"
                  onClick={() => navigate(`/problem/${problem.slug}`)}
                >
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {renderCompanies(problem.companyTags)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              {problem.solved ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 cursor-pointer"
                  onClick={() => navigate(`/problem/${problem.slug}`)}
                >
                  Solve
                </button>
              )}
              <span className="text-sm text-gray-500">
                {problem.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
