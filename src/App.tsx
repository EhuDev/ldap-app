import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { OutputPage } from "./pages/output-page";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </>
  );
}

export default App;
