import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProblemDashboard from "./pages/ProblemDashboard";
import RegisterForm from "./pages/auth/RegisterForm";
import LoginForm from "./pages/auth/LoginForm";
import ProfilePage from "./pages/Profile";
import FloatingButton from "./components/FloatingButton";
import Tutorial from "./pages/tutorial/Tutorial";
import Compiler from "./pages/Compiler";
import Executor from "./components/compiler/codeexecutor/Executor";
import Web from "./components/web/Web";
import Details from "./pages/Details";
import Assessment from "./pages/Assessment";
import CoursePage from "./pages/CoursePage";
import DetailMockTest from "./pages/DetailMockTest";
import TestResult from "./pages/TestResult";
import About from "./components/navbarpage/About";
import Contact from "./components/navbarpage/Contact";
import Dashbord from "./components/dashbord/Dashbord";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problem/:slug" element={<ProblemDashboard />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/online-compiler/:language" element={<Executor />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/web-dev" element={<Web />} />
        <Route path="/problem-list/:slug" element={<Details />} />
        <Route path="/mock-test" element={ <Assessment />} />
        <Route path="/course/:slug" element={<CoursePage />} />
        <Route path="/test/:slug" element={<DetailMockTest />} />
        <Route path="/test-result" element={<TestResult />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/dashboard" element={<Dashbord />} />
      </Routes>
      <FloatingButton />
      {/* <Footer /> */}
    </>
  );
}

export default App;
