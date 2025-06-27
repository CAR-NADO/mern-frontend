import React, { useEffect, useState, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import { toastManager, ToastData } from "./ToastManager";

interface ToasterProviderProps {
  children: ReactNode;
}

export const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    toastManager.setUpdateCallback(setToasts);

    return () => {
      toastManager.setUpdateCallback(() => {});
    };
  }, []);

  return (
    <Toast.Provider swipeDirection="right" >
      {children}
      {toasts.map(({ id, type, message, position }) => (
        <Toast.Root
          key={id}
          className={`border rounded-lg shadow-lg p-4 flex items-center gap-3 ${toastManager.getTypeStyles(type)} ${position}`}
          onOpenChange={() => toastManager.removeToast(id)}
        >
          {toastManager.getTypeIcon(type, "w-5 h-5")}
          <div className="flex-1">
            <Toast.Title className="font-semibold capitalize">{type}</Toast.Title>
            <Toast.Description>{message}</Toast.Description>
          </div>
        </Toast.Root>
      ))}

      <Toast.Viewport className="fixed top-4 right-4 w-96 flex flex-col gap-2 z-[51]" />
    </Toast.Provider>
  );
};
