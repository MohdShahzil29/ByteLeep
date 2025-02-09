import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const DSAComponent = () => {
  const [problemCategory, setProblemCategory] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(6);
  const [loading, setLoading] = useState(false);

  const handleCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/category/get-all-categories`
      );
      setProblemCategory(response.data.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleCategory();
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCategories((prev) => prev + 6);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 text-center mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Data Structures & Algorithms
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {problemCategory.slice(0, visibleCategories).map((topic, index) => (
          <Card key={index} name={topic.name} />
        ))}
      </div>
      {visibleCategories < problemCategory.length && (
        <button
          onClick={handleLoadMore}
          className="text-white bg-gray-800 px-6 py-3 rounded hover:bg-gray-700 transition duration-300 cursor-pointer flex items-center justify-center"
        >
          {loading ? (
            <ImSpinner9 className="animate-spin text-xl mx-auto" />
          ) : (
            "Load More"
          )}
        </button>
      )}
    </div>
  );
};

const Card = ({ name }) => {
  const navigate = useNavigate();
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg flex justify-between items-center hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105">
      <span
        className="truncate font-medium text-lg cursor-pointer"
        onClick={() => navigate(`/problem-list/${slug}`)}
      >
        {name}
      </span>
      <FaArrowRight
        className="text-2xl cursor-pointer"
        onClick={() => navigate(`/problem-list/${slug}`)}
      />
    </div>
  );
};

export default DSAComponent;
