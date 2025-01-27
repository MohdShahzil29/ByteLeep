import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProblemDashboard from "./pages/ProblemDashboard";
// import WebDevelopment from "./components/WebDevelopment";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problem" element={<ProblemDashboard />} />
      </Routes>
      
      {/* <Footer /> */}
    </>
  );
}

export default App;
