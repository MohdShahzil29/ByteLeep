import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProblem = () => {
  const [problem, setProblem] = useState({
    title: "",
    difficulty: "Easy",
    points: "",
    description: "",
    input: "",
    output: "",
    shortExplanation: "",
    constraints: "",
    companyTags: "",
    topicTags: "",
    category: "",
    testCases: [{ input: "", output: "" }],
    expectedTimeSpaceComplexity: { timeComplexity: "", spaceComplexity: "" },
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/category/get-all-categories`
        );
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem({ ...problem, [name]: value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...problem.testCases];
    updatedTestCases[index][field] = value;
    setProblem({ ...problem, testCases: updatedTestCases });
  };

  const addTestCase = () => {
    setProblem({
      ...problem,
      testCases: [...problem.testCases, { input: "", output: "" }],
    });
  };

  const removeTestCase = (index) => {
    if (problem.testCases.length > 1) {
      const updatedTestCases = problem.testCases.filter((_, i) => i !== index);
      setProblem({ ...problem, testCases: updatedTestCases });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/dsa/create`,
        problem
      );
      if (response.data.success) {
        alert("Problem created successfully!");
      } else {
        alert("Failed to create problem");
      }
    } catch (error) {
      console.error("Error creating problem:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create DSA Problem</h1>
      <div className="grid gap-4">
        <input
          className="border p-2 w-full"
          name="title"
          placeholder="Problem Title"
          onChange={handleChange}
        />

        {/* Difficulty Selection */}
        <select
          className="border p-2 w-full"
          name="difficulty"
          value={problem.difficulty}
          onChange={handleChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          className="border p-2 w-full"
          name="points"
          placeholder="Points"
          type="number"
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full"
          name="description"
          placeholder="Problem Description"
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full"
          name="input"
          placeholder="Input Format"
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full"
          name="output"
          placeholder="Output Format"
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full"
          name="shortExplanation"
          placeholder="Short Explanation"
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full"
          name="constraints"
          placeholder="Constraints"
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full"
          name="companyTags"
          placeholder="Company Tags (comma-separated)"
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full"
          name="topicTags"
          placeholder="Topic Tags (comma-separated)"
          onChange={handleChange}
        />

        {/* Category Selection */}
        <select
          className="border p-2 w-full"
          name="category"
          value={problem.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Test Cases</h2>
        {problem.testCases.map((testCase, index) => (
          <div key={index} className="border p-4 mb-2">
            <textarea
              className="border p-2 w-full"
              placeholder={`Test Case ${index + 1} Input`}
              value={testCase.input}
              onChange={(e) =>
                handleTestCaseChange(index, "input", e.target.value)
              }
            />
            <textarea
              className="border p-2 w-full mt-2"
              placeholder={`Test Case ${index + 1} Output`}
              value={testCase.output}
              onChange={(e) =>
                handleTestCaseChange(index, "output", e.target.value)
              }
            />
            <button
              className="bg-red-500 text-white p-2 mt-2 cursor-pointer"
              onClick={() => removeTestCase(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 text-white p-2 mt-2 cursor-pointer"
          onClick={addTestCase}
        >
          Add Test Case
        </button>
      </div>

      <button
        className="bg-green-500 text-white p-2 mt-6 w-full cursor-pointer"
        onClick={handleSubmit}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreateProblem;
