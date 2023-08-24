import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./screens/welcome/Welcome";
import { ToastContainer } from "react-toastify";
import Weather from "./screens/weather/Weather";
import NotFound from "./screens/NotFound/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  useEffect(() => {
    document.querySelector("#root").style.display = "block";
    document.querySelector(".welcomeLoadingScreen").style.display = "none";
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/settings" element={<Welcome />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
