// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "../custom/navbar/navbar";
// import ShareableNavbar from "../custom/s-navbar/s-navbar";
// import Signup from "../../pages/signup/signup";
// import Signin from "../../pages/signin/signin";
// import Signout from "../../pages/signout/signout";
// import Dashboard from "../../pages/dashboard/dashboard";
// import CreateContent from "../../pages/create-content/create-content";
// import UpdateContent from "../../pages/update-content/update-content";
// import DeleteContent from "../../pages/delete-content/delete-content";
// import CreateLink from "../../pages/create-link/create-link";
// import ShareableContents from "../../pages/s-contents/s-contents";
// import IsAuthenticated from "../../wrappers/is-authenticated";
// import "./app.css";

// function App() {
//   return (
//     <div
//       id="app"
//       className="min-h-screen grid grid-cols-1 md:grid-cols-[16rem_1fr]"
//     >
//       <BrowserRouter>
//         {/* page-structure */}
//         <Navbar />
//         <div className="right">
//           <Routes>
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/signin" element={<Signin />} />
//             <Route path="/signout" element={<Signout />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <IsAuthenticated>
//                   <Dashboard />
//                 </IsAuthenticated>
//               }
//             />
//             <Route
//               path="/create-content"
//               element={
//                 <IsAuthenticated>
//                   <CreateContent />
//                 </IsAuthenticated>
//               }
//             />
//             <Route
//               path="/contents/:contentId/update"
//               element={
//                 <IsAuthenticated>
//                   <UpdateContent />
//                 </IsAuthenticated>
//               }
//             />
//             <Route
//               path="/contents/:contentId/delete"
//               element={
//                 <IsAuthenticated>
//                   <DeleteContent />
//                 </IsAuthenticated>
//               }
//             />
//             <Route
//               path="/links"
//               element={
//                 <IsAuthenticated>
//                   <CreateLink />
//                 </IsAuthenticated>
//               }
//             />
//             <Route
//               path="/links/:linkId"
//               element={
//                 <IsAuthenticated>
//                   <Share />
//                 </IsAuthenticated>
//               }
//             />
//             <Route path="*" element={<Signin />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../custom/navbar/navbar";
import ShareableNavbar from "../custom/s-navbar/s-navbar";
import Signup from "../../pages/signup/signup";
import Signin from "../../pages/signin/signin";
import Signout from "../../pages/signout/signout";
import Dashboard from "../../pages/dashboard/dashboard";
import CreateContent from "../../pages/create-content/create-content";
import UpdateContent from "../../pages/update-content/update-content";
import DeleteContent from "../../pages/delete-content/delete-content";
import CreateLink from "../../pages/create-link/create-link";
import ShareableContents from "../../pages/s-contents/s-contents";
import IsAuthenticated from "../../wrappers/is-authenticated";
import "./app.css";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Match `/links/:linkId` using a simple regex
  const isShareableContents = /^\/links\/[^/]+$/.test(location.pathname);

  return (
    <div
      id="app"
      className="min-h-screen grid grid-cols-1 md:grid-cols-[16rem_1fr]"
    >
      {!isShareableContents ? (
        <>
          <Navbar />
          <div className="right">{children}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
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
          <Route
            path="/contents/:contentId/update"
            element={
              <IsAuthenticated>
                <UpdateContent />
              </IsAuthenticated>
            }
          />
          <Route
            path="/contents/:contentId/delete"
            element={
              <IsAuthenticated>
                <DeleteContent />
              </IsAuthenticated>
            }
          />
          <Route
            path="/links"
            element={
              <IsAuthenticated>
                <CreateLink />
              </IsAuthenticated>
            }
          />
          <Route
            path="/links/:linkId"
            element={
              <>
                <ShareableNavbar />
                <div className="right">
                  <ShareableContents />
                </div>
              </>
            }
          />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
