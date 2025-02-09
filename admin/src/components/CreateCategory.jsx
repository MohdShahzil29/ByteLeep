import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateCategory = () => {
  const [category, setCategory] = useState({ name: "" });
  const [categories, setCategories] = useState([]);

  // Fetch categories
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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/category/create-category`,
        category
      );
      if (response.data.success) {
        alert("Category created successfully");
        setCategory({ name: "" });
        fetchCategories(); // Fetch updated category list
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/category/delete-category/${id}`
      );
      if (response.data.success) {
        alert("Category deleted successfully");
        fetchCategories(); // Refresh category list
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          className="border p-2 w-full"
          name="name"
          placeholder="Category Name"
          value={category.name}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white p-2 cursor-pointer" type="submit">
          Create Category
        </button>
      </form>

      {/* Category List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Category List</h2>
        <ul className="mt-2 border p-4">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li
                key={cat._id}
                className="p-2 border-b flex justify-between items-center"
              >
                <span>{cat.name}</span>
                <button
                  className="bg-red-500 text-white px-3 py-1 cursor-pointer"
                  onClick={() => deleteCategory(cat._id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategory;
