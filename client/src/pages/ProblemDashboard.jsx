import React from "react";
import Details from "../components/problemDashboard/Details";
import CodeEditor from "../components/problemDashboard/CodeEditor";

const ProblemDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Details />
      <CodeEditor />
    </div>
  );
};

export default ProblemDashboard;
