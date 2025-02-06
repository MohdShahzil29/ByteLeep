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
      </Routes>
      <FloatingButton />
      {/* <Footer /> */}
    </>
  );
}

export default App;
