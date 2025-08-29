import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import "./index.css";
import App from "../app/app";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* enabling toasts */}
    <ToastContainer />

    <App />
  </Provider>
);
