import React, { useState, useEffect } from "react";
import Filter from "../components/Details/Filter";
import ProblemList from "../components/Details/ProblemList";
import axios from "axios";

const Details = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [problems, setProblems] = useState([]);

  // Fetch problems based on the currently selected filters
  const fetchFilteredProblems = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (selectedFilters.Companies && selectedFilters.Companies.length > 0) {
        queryParams.append("companies", selectedFilters.Companies.join(","));
      }
      if (selectedFilters.Topics && selectedFilters.Topics.length > 0) {
        queryParams.append("topics", selectedFilters.Topics.join(","));
      }
      if (selectedFilters.Difficulty && selectedFilters.Difficulty.length > 0) {
        queryParams.append("difficulty", selectedFilters.Difficulty.join(","));
      }
      console.log("Query Parameters:", queryParams.toString());
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/dsa?${queryParams.toString()}`
      );
      setProblems(response.data.problems);
    } catch (error) {
      console.error("Error fetching filtered problems:", error);
    }
  };

  // Re-fetch whenever filters change
  useEffect(() => {
    fetchFilteredProblems();
  }, [selectedFilters]);

  return (
    <div className="flex justify-between">
      <Filter
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <ProblemList
        problems={problems}
        setSelectedFilters={setSelectedFilters}
      />
    </div>
  );
};

export default Details;
