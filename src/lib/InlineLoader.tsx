import React, { CSSProperties, PropsWithChildren } from "react";
import { Curtain } from "./Curtain";
import styles from "./InlineLoader.module.css";

export function InlineLoader({
  style = {},
  children,
}: PropsWithChildren<{ style: CSSProperties }>) {
  return (
    <Curtain style={style} data-opaque>
      <div className="dots" />
      <p className={styles.title}>{children}</p>
    </Curtain>
  );
}
