import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightCodeEditor from "./RightCodeEditor";

const Executor = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <LeftSidebar />
      <RightCodeEditor />
    </div>
  );
};

export default Executor;
