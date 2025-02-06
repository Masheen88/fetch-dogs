import { toast, Id } from "react-toastify";

let toastId: Id | null = null; // Track the current toast ID

//display a toast notifiaction info, success, error
export const showToast = (
  message: string,
  type: "info" | "success" | "error" = "info"
) => {
  if (toastId) {
    toast.update(toastId, { render: message, type, autoClose: 1000 }); //closes after 1s
  } else {
    toastId = toast(message, { type, autoClose: 2000 }); //closes after 2s
  }
};
