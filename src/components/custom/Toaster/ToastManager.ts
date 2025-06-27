import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "warn" | "info";

export interface ToastOptions {
    autoClose?: number; 
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; 
  }
  export interface ToastData extends ToastOptions {
    id: number;
    type: ToastType;
    message: string;
  }

type UpdateCallback = (toasts: ToastData[]) => void;

class ToastManager {
  private toasts: ToastData[] = [];
  private updateCallback: UpdateCallback = () => {};

  private typeIcons: Record<ToastType, React.ElementType> = {
    success: CheckCircle,
    error: XCircle,
    warn: AlertTriangle,
    info: Info,
  };

  private typeStyles: Record<ToastType, string> = {
    success: "bg-green-100 border-green-500 text-green-800",
    error: "bg-red-100 border-red-500 text-red-800",
    warn: "bg-yellow-100 border-yellow-500 text-yellow-800",
    info: "bg-blue-100 border-blue-500 text-blue-800",
  };

  addToast(type: ToastType, message: string, options: ToastOptions = {}) {
    const id = Date.now();
    const toastData: ToastData = { id, type, message, ...options };
    this.toasts.push(toastData);

    if (this.updateCallback) {
      this.updateCallback([...this.toasts]);
    }

    const autoClose = options.autoClose ?? 6000;
    if (autoClose) {
      setTimeout(() => {
        this.removeToast(id);
      }, autoClose);
    }
  }

  public removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.triggerUpdate();
  }

  public setUpdateCallback(callback: UpdateCallback) {
    this.updateCallback = callback;
  }

  public getTypeIcon(type: ToastType, className: string): JSX.Element {
    const IconComponent = this.typeIcons[type];
    return React.createElement(IconComponent, { className });
  }

  public getTypeStyles(type: ToastType): string {
    return this.typeStyles[type];
  }

  private triggerUpdate() {
    this.updateCallback([...this.toasts]);
  }
}

export const toastManager = new ToastManager();
