import { toast } from "react-toastify";
import { TOAST_UI } from "../constants/toast.constants";

function successNotification(message: string) {
  toast.success(message, {
    className: `color-success color-success-content 
          p-0 w-[400px] text-sm solid-border`,
    ariaLabel: "Success notification",
    ...TOAST_UI,
  });
}
function errorNotification(message: string) {
  toast.success(message, {
    className: `color-error color-error-content 
          p-0 w-[400px] text-sm solid-border`,
    ariaLabel: "Error notification",
    ...TOAST_UI,
  });
}
function infoNotification(message: string) {
  toast.success(message, {
    className: `color-info color-info-content 
          p-0 w-[400px] text-sm solid-border`,
    ariaLabel: "Info notification",
    ...TOAST_UI,
  });
}

export { successNotification, errorNotification, infoNotification };
