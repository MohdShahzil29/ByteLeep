import React, { useState } from "react";
import Details from "../components/problemDashboard/Details";
import CodeEditor from "../components/problemDashboard/CodeEditor";

const ProblemDashboard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  return (
    <div className="flex flex-col lg:flex-row">
      <Details />
      <CodeEditor />
    </div>
  );
};

export default ProblemDashboard;
