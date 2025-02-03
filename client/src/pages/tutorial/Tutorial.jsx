import React from "react";
import Learn from "./Learn";
import Article from "./Article";

const Tutorial = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Learn />
      <Article />
    </div>
  );
};

export default Tutorial;
