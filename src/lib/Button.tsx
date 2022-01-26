import { CSSProperties } from "react";
import styles from "./Button.module.css";

export type ButtonProps = Omit<JSX.IntrinsicElements["button"], "className"> & {
  loading?: boolean;
  containerStyle?: CSSProperties;
  variant: "standard" | "standard.danger" | "ghost" | "link";
};

const Button = ({
  variant,
  loading,
  containerStyle = {},
  ...props
}: ButtonProps) => (
  <span
    style={{ position: "relative", display: "inline-block", ...containerStyle }}
  >
    <button
      {...props}
      disabled={loading || props.disabled}
      data-loading={loading}
      data-variant={variant}
      className={styles.button}
    >
      {props.children}
      {loading ? <div aria-hidden className={styles.loader} /> : null}
    </button>
  </span>
);

export default Button;
