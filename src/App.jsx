import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
