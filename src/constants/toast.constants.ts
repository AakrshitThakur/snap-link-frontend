import { Zoom } from "react-toastify";
import type { ToastUi } from "../custom-types/toast.type";

const TOAST_UI: ToastUi = {
  position: "top-center",
  closeButton: false,
  autoClose: 2500,
  transition: Zoom,
  hideProgressBar: true,
  icon: false,
};

export { TOAST_UI };
