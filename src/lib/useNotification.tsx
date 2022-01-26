import { useEffect, useState } from "react";
import { Notification } from "./Notification";

export function useNotification(
  defaultMessage: string,
  type: "success" | "error"
): [(message?: string) => void, JSX.Element] {
  let [open, setOpen] = useState(false);
  let [message, setMessage] = useState(defaultMessage);
  useEffect(() => {
    let isRunning = true;
    if (open) {
      setTimeout(() => {
        if (isRunning) {
          setOpen(false);
          setMessage(defaultMessage);
        }
      }, 3000);
    }
    return () => {
      isRunning = false;
    };
  }, [open]);
  return [
    (message) => {
      if (message) {
        setMessage(message);
      }
      setOpen(true);
    },
    open ? (
      <Notification
        message={message}
        type={type}
        onClick={() => setOpen(false)}
      />
    ) : null,
  ];
}
