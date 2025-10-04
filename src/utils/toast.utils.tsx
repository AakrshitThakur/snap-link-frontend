import { toast } from "react-toastify";
import { CircleCheckBig, CircleAlert, Info } from "lucide-react";
import { TOAST_UI } from "../constants/toast.constants";

function successNotification(text: string) {
  toast(
    <div className="text-xs sm:text-xs md:text-sm leading-tight">
      <CircleCheckBig className="inline-block w-5 h-auto" />
      <p className="inline"> {text}</p>
    </div>,
    {
      className: "color-success color-success-content solid-border",
      ariaLabel: "Success notification",
      ...TOAST_UI,
    }
  );
}

function errorNotification(text: string) {
  toast(
    <div className="text-xs sm:text-xs md:text-sm leading-tight">
      <CircleAlert className="inline-block w-5 h-auto" />
      <p className="inline"> {text}</p>
    </div>,
    {
      className: "color-error color-error-content solid-border",
      ariaLabel: "Error notification",
      ...TOAST_UI,
    }
  );
}

function infoNotification(text: string) {
  toast(
    <div className="text-xs sm:text-xs md:text-sm leading-tight">
      <Info className="inline-block w-5 h-auto" />
      <p className="inline"> {text}</p>
    </div>,
    {
      className: "color-info color-info-content solid-border",
      ariaLabel: "Info notification",
      ...TOAST_UI,
    }
  );
}

export { successNotification, errorNotification, infoNotification };
