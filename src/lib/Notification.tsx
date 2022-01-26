import Alert from "@reach/alert";
import cx from "classnames";
import { MouseEventHandler } from "react";
import styles from "./Notification.module.css";

function Success(props) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14A7 7 0 107 0a7 7 0 000 14zM5.829 8.722l4.553-4.552a.579.579 0 11.818.818L6.238 9.95a.578.578 0 01-.819 0L3.17 7.702a.579.579 0 11.82-.819l1.84 1.84z"
        fill="#fff"
      />
    </svg>
  );
}

function Error(props) {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14A7 7 0 107 0a7 7 0 000 14zm.078-6.292h-.352c-.099 0-.198-.088-.209-.176l-.429-3.069V3.209c0-.11.099-.209.209-.209h1.21c.11 0 .209.099.209.209v1.232l-.429 3.091c-.011.088-.11.176-.209.176zm-.187 3.102A.904.904 0 016 9.908c0-.495.407-.913.891-.913.506 0 .913.418.913.913a.908.908 0 01-.913.902z"
        fill="#fff"
      />
    </svg>
  );
}

function Cancel(props) {
  return (
    <svg width={8} height={8} viewBox="0 0 8 8" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.532.46a.495.495 0 00-.7 0L4 3.294 1.168.46a.495.495 0 00-.7 0L.461.468a.495.495 0 000 .7L3.293 4 .46 6.832a.495.495 0 000 .7l.007.007a.495.495 0 00.7 0L4 4.707l2.832 2.832a.495.495 0 00.7 0l.007-.007a.495.495 0 000-.7L4.707 4 7.54 1.168a.495.495 0 000-.7L7.532.461z"
        fill="#fff"
      />
    </svg>
  );
}

type NotificationProps = {
  type: "success" | "error";
  message: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function Notification({ type, message, onClick }: NotificationProps) {
  let Icon = type === "success" ? Success : Error;
  return (
    <Alert
      className={cx(
        styles.notification,
        type === "success" ? styles.success : styles.error
      )}
      type="assertive"
    >
      <Icon /> <p>{message}</p>
      <button onClick={onClick}>
        <Cancel />
      </button>
    </Alert>
  );
}
