import classnames from "classnames";
import styles from "./Checkbox.module.css";

export const Checkbox = ({ children, ...props }) => (
  <div className={classnames(styles.checkbox)}>
    <label>
      <input {...props} type="checkbox" />
      <span>{children}</span>
    </label>
  </div>
);
