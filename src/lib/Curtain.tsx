import styles from "./Curtain.module.css";

type CurtainProps = Omit<JSX.IntrinsicElements["div"], "className">;

export function Curtain({ children, ...props }: CurtainProps) {
  return (
    <div className={styles.wrapper} {...props}>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
}
