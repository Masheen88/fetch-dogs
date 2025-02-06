import { toast, Id } from "react-toastify";

let toastId: Id | null = null; // Track the current toast ID

export const showToast = (
  message: string,
  type: "info" | "success" | "error" = "info"
) => {
  if (toastId) {
    toast.update(toastId, { render: message, type, autoClose: 1000 });
  } else {
    toastId = toast(message, { type, autoClose: 2000 });
  }
};
