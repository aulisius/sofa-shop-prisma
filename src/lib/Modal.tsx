import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import cx from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import styles from "./Modal.module.css";

function CloseModal() {
  return (
    <svg aria-hidden width={20} height={20}>
      <g fill="none" fillRule="evenodd">
        <circle stroke="rgb(197, 197, 197)" cx={10} cy={10} r={9.5} />
        <path
          d="M11.207 10.207l3.535-3.535a.503.503 0 000-.708.505.505 0 00-.707 0L10.5 9.5 6.965 5.965a.503.503 0 00-.708 0 .505.505 0 000 .707l3.536 3.535-3.535 3.535a.503.503 0 000 .708c.189.19.511.195.707 0l3.535-3.536 3.535 3.536a.503.503 0 00.708 0 .505.505 0 000-.708l-3.536-3.535z"
          fill="rgb(197, 197, 197)"
        />
      </g>
    </svg>
  );
}

export type ModalProps = {
  aside?: ReactNode;
  isOpen: boolean;
  onDismiss: any;
  secure?: boolean;
  subtitle: string;
  title: string;
  useBorder?: boolean;
  width?: number;
};

export const Modal = ({
  aside,
  children,
  isOpen,
  onDismiss,
  secure = false,
  subtitle,
  title,
  useBorder = false,
  width,
}: PropsWithChildren<ModalProps>) => (
  <DialogOverlay
    className={styles.dialogOverlay}
    onDismiss={onDismiss}
    isOpen={isOpen}
  >
    <DialogContent
      aria-label={`${title} for ${subtitle}`}
      className={styles.dialogContent}
      style={{ width: width ? `${width}px` : "auto" }}
    >
      <button
        aria-label="Close modal"
        className={styles.close}
        onClick={onDismiss}
        type="button"
      >
        <CloseModal />
      </button>
      <div className={styles.modalFlex}>
        <div
          data-secure={secure}
          className={cx(styles.modalContent, secure && styles.secure)}
        >
          <h4>{title}</h4>
          {subtitle !== null ? <p>For: {subtitle}</p> : null}
          <div
            className={styles.mainContent}
            data-expand-horizontal={subtitle === null}
            data-use-border={useBorder}
          >
            {children}
          </div>
        </div>
        {aside ? <aside className={styles.aside}>{aside}</aside> : null}
      </div>
    </DialogContent>
  </DialogOverlay>
);
