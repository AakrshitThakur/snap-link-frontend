import { Zoom } from "react-toastify";
import type { ToastUi } from "../custom-types/toast.type";

const TOAST_UI: ToastUi = {
  position: "top-right",
  closeButton: false,
  autoClose: 300000,
  transition: Zoom,
  hideProgressBar: true,
  icon: false,
};

export { TOAST_UI };
