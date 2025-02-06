let toastId: string | null = null;

export const resetToast = () => {
  toastId = null;
  console.log("Toast ID has been reset:", toastId);
};
