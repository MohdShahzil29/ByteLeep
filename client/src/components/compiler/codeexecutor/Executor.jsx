import React from "react";
import LeftSidebar from "./LeftSidebar";
import RightCodeEditor from "./RightCodeEditor";
import Footer from '../../Footer'

const Executor = () => {
  return (
    <div>
    <div className="flex justify-between">
      <LeftSidebar />
      <RightCodeEditor />
    </div>
    <Footer />
    </div>
  );
};

export default Executor;
