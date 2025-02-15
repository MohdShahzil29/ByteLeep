import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import Sheet from "../components/sheet/sheet";
import LearningExperience from "../components/LearningExperience";
import RoadmapSection from "../components/WebDevelopment";
import DSAComponent from "../components/DSA";
import NewsLetter from '../components/NewsLetter'
import Footer from "../components/Footer";
import AptitudeTestBanner from "./AptitudeTestBanner";
import AssessmentPlatform from "./AssessmentPlatform";
import Warning from "../components/model/Warning";
import PracticeHome from "../components/PracticeHome";
import Spinner from "../components/Spinner";

const webTechnologies = [
  { name: "JavaScript", icon: "FaJava" },
  { name: "HTML", icon: "FaHtml5" },
  { name: "CSS", icon: "FaCss3Alt" },
  { name: "React.JS", icon: "FaReact" },
  { name: "Node.js", icon: "FaNodeJs" },
  { name: "Django", icon: "SiDjango" },
];

const roadmapItems = [
  { name: "Frontend Basics", icon: "FaHtml5" },
  { name: "Styling with CSS", icon: "FaCss3Alt" },
  { name: "Advanced JavaScript", icon: "FaJava" },
  { name: "Frameworks (React, Angular)", icon: "FaReact" },
  { name: "Backend Basics", icon: "FaNodeJs" },
  { name: "Server-side Frameworks", icon: "SiDjango" },
];

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      {/* <FeatureSection /> */}
      <PracticeHome />
      <Sheet />
      <LearningExperience />
      {/* <RoadmapSection
        title="Web Development"
        items={webTechnologies}
        buttonLabel="View All"
      />
      <RoadmapSection
        title="Roadmap"
        items={roadmapItems}
        buttonLabel="View All"
      /> */}
      <DSAComponent />
      <AptitudeTestBanner />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default HomePage;
