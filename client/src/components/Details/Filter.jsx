import React, { useEffect, useState } from "react";
import { FaFilter, FaTimes, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";

// Reusable Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#FDF8EE] text-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-red-400 hover:text-red-600"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Search input */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 p-2 border rounded-l"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r">
            <FaSearch />
          </button>
        </div>

        {/* Filter options */}
        {children}
      </div>
    </div>
  );
};

// Mobile full-screen filter panel with plus icon at bottom left
const MobileFilterPanel = ({
  selectedFilters,
  filters,
  handleFilterChange,
  onClose,
  onViewAllClick,
}) => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50 bg-[#FDF8EE] text-black p-5 rounded-lg shadow-lg overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaFilter /> Filters
        </h2>
        <button className="text-red-400 hover:text-red-600" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="space-y-4">
        {Object.entries(filters).map(([category, options]) => (
          <div key={category}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{category}</h3>
              <button
                className="text-blue-400 hover:underline"
                onClick={() => onViewAllClick(category, options)}
              >
                View All
              </button>
            </div>
            <div className="mt-3">
              {options.slice(0, 5).map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer py-1"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedFilters[category]?.includes(option) || false
                    }
                    onChange={() => handleFilterChange(category, option)}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Plus icon at the bottom left */}
      <button className="absolute bottom-5 left-5 bg-blue-500 p-3 rounded-full shadow-lg text-white">
        <FaPlus size={20} />
      </button>
    </div>
  );
};

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const filters = {
    Companies: [
      "Amazon",
      "Microsoft",
      "Flipkart",
      "Adobe",
      "Google",
      "Samsung",
      "Paytm",
      "Morgan Stanley",
      "Wipro",
      "Uber",
      "Infosys",
      "Atlassian",
    ],
    Topics: ["Arrays", "Strings", "Linked List"],
    Difficulty: ["Basic", "Easy", "Medium", "Hard"],
    Status: ["Solved", "Unsolved"],
  };

  // State Managment
  const [topicTags, setTopicTags] = useState([]);
  const [componiesTags, setComponiesTags] = useState([]);
  const [difficultyTags, setDifficultyTags] = useState([]);

  console.log("Topic Tags: ", topicTags);
  console.log("Company Tags: ", componiesTags);
  
  // API calls
  const handleCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/category/get-all-categories`
      );
      setComponiesTags(response.data.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchTopicTags = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dsa/all-topic-tags`
      );
      setTopicTags(response.data.allTags);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiffculty = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dsa/get-defficulty`
      );
      setDifficultyTags(response.data.defficulty);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCategory();
    fetchTopicTags();
    fetchDiffculty();
  }, []);

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category]?.includes(value)) {
        newFilters[category] = newFilters[category].filter((v) => v !== value);
      } else {
        newFilters[category] = [...(newFilters[category] || []), value];
      }
      return newFilters;
    });
  };

  const handleViewAllClick = (category, options) => {
    setModalContent(
      <div className="space-y-4 ">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 cursor-pointer py-1"
          >
            <input
              type="checkbox"
              checked={selectedFilters[category]?.includes(option) || false}
              onChange={() => handleFilterChange(category, option)}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Mobile: Floating filter toggle button (visible only on mobile) */}
      <div className="sm:hidden fixed bottom-3 left-3 z-50">
        <button
          className="bg-[#FDF8EE] p-3 rounded-full shadow-lg"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <FaFilter className="text-black" size={20} />
        </button>
      </div>

      {/* Mobile Filter Panel */}
      {isMobileFilterOpen && (
        <div className="sm:hidden">
          <MobileFilterPanel
            selectedFilters={selectedFilters}
            filters={filters}
            handleFilterChange={handleFilterChange}
            onClose={() => setIsMobileFilterOpen(false)}
            onViewAllClick={handleViewAllClick}
          />
        </div>
      )}

      {/* Desktop Filter Panel (always visible on desktop) */}
      <div className="hidden sm:block">
        <div className="w-72 mt-1 bg-[#FDF8EE] text-black p-5 rounded-lg shadow-lg overflow-y-auto">
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaFilter /> Filters
            </h2>
            <button
              className="text-red-400 hover:text-red-600"
              onClick={() => setSelectedFilters({})}
            >
              Clear All
            </button>
          </div>
          {Object.entries(filters).map(([category, options]) => (
            <div key={category} className="mb-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{category}</h3>
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => handleViewAllClick(category, options)}
                >
                  View All
                </button>
              </div>
              <div className="mt-6">
                {options.slice(0, 5).map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer py-1"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedFilters[category]?.includes(option) || false
                      }
                      onChange={() => handleFilterChange(category, option)}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Filter;
