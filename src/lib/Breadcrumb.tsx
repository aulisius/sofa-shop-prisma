import styles from "./Breadcrumb.module.css";
export function Breadcrumb({ children }) {
  return <nav className={styles.breadcrumb}>{children}</nav>;
}
