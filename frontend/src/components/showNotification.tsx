// toast.ts
import { toast } from "react-toastify";

type ToastType = "success" | "warning" | "error";

interface showNotificationProps {
  type: ToastType;
  message: string
}

export const showNotification: React.FC<showNotificationProps> = ({type, message}) => {
  const options = {
    position: "top-right" as const,
    theme: "colored" as const,
  };

  switch (type) {
    case "success":
      return toast.success(message, { ...options , toastId: "save-success"});
    case "warning":
      return toast.warn(message, { ...options , toastId: "warning"});
    case "error":
      return toast.error(message, { ...options , toastId: "error"});
    default:
      return toast(message, { ...options , toastId: "default"});
  }
};

