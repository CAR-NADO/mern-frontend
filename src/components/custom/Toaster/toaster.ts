import { toastManager, ToastOptions } from "./ToastManager";

export const toaster = {
  success: (message: string, options?: ToastOptions) => {
    toastManager.addToast("success", message, options);
  },
  error: (message: string, options?: ToastOptions) => {
    toastManager.addToast("error", message, options);
  },
  warn: (message: string, options?: ToastOptions) => {
    toastManager.addToast("warn", message, options);
  },
  info: (message: string, options?: ToastOptions) => {
    toastManager.addToast("info", message, options);
  },
};
