import React, { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightCodeEditor from "./RightCodeEditor";
import Footer from "../../Footer";

const Executor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-1">
        <LeftSidebar onLanguageSelect={setSelectedLanguage} />
        <RightCodeEditor selectedLanguage={selectedLanguage} />
      </div>
      <Footer />
    </div>
  );
};

export default Executor;
