import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../custom/navbar/navbar";
import Signup from "../../pages/signup/signup";
import Signin from "../../pages/signin/signin";
import Signout from "../../pages/signout/signout";
import Dashboard from "../../pages/dashboard/dashboard";
import "./app.css";

function App() {
  return (
    <div
      id="app"
      className="min-h-screen grid grid-cols-1 md:grid-cols-[16rem_1fr]"
    >
      {/* page-structure */}
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
