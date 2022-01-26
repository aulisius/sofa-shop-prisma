import styles from "./FullScreenLoader.module.css";
export function FullScreenLoader() {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}>
        <div className="ball-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
