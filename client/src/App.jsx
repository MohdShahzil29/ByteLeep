import DSAComponent from "./components/DSA";
import FeatureSection from "./components/FeatureSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LearningExperience from "./components/LearningExperience";
import Navbar from "./components/Navbar";
import NewsLetter from "./components/NewsLetter";
import Sheet from "./components/sheet/sheet";
import RoadmapSection from "./components/WebDevelopment";
// import WebDevelopment from "./components/WebDevelopment";

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

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Sheet />
      <LearningExperience />
      <RoadmapSection
        title="Web Development"
        items={webTechnologies}
        buttonLabel="View All"
      />
      <RoadmapSection
        title="Roadmap"
        items={roadmapItems}
        buttonLabel="View All"
      />
      <DSAComponent />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default App;
