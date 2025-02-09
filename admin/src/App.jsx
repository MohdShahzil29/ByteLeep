import { Route, Routes } from "react-router-dom";
import CreateCategory from "./components/CreateCategory";
import CreateProblem from "./components/CreateProblem";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/create-problem" element={<CreateProblem />} />
        <Route path="/create-category" element={<CreateCategory />} />
      </Routes>
    </>
  );
}

export default App;
