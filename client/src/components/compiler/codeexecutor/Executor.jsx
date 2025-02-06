import React, { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightCodeEditor from "./RightCodeEditor";
import Footer from "../../Footer";

const Executor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  return (
    <div>
      <div className="flex justify-between">
        <LeftSidebar onLanguageSelect={setSelectedLanguage} />
        <RightCodeEditor selectedLanguage={selectedLanguage} />
      </div>
      <Footer />
    </div>
  );
};

export default Executor;
