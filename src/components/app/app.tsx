import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../custom/navbar/navbar";
import Signup from "../../pages/signup/signup";
import Signin from "../../pages/signin/signin";
import Signout from "../../pages/signout/signout";
import Dashboard from "../../pages/dashboard/dashboard";
import CreateContent from "../../pages/create-content/create-content";
import IsAuthenticated from "../../wrappers/is-authenticated";
import "./app.css";

function App() {
  return (
    <div
      id="app"
      className="min-h-screen grid grid-cols-1 md:grid-cols-[16rem_1fr]"
    >
      <BrowserRouter>
        {/* page-structure */}
        <Navbar />
        <div className="right">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
            <Route
              path="/dashboard"
              element={
                <IsAuthenticated>
                  <Dashboard />
                </IsAuthenticated>
              }
            />
            <Route
              path="/create-content"
              element={
                <IsAuthenticated>
                  <CreateContent />
                </IsAuthenticated>
              }
            />
            <Route path="*" element={<Signin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
