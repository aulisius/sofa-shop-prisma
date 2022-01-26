import { useEffect, useState } from "react";
import styles from "./Slider.module.css";

type SliderProps = JSX.IntrinsicElements["input"] & {
  label?: string;
  loading?: boolean;
  variant: "green";
  evaluation: "eager" | "wait";
};

export let Slider = ({
  label = "",
  loading,
  variant,
  ...props
}: SliderProps) => {
  let [eagerChecked, setEagerChecked] = useState(props.checked);
  useEffect(() => {
    if (loading === false) {
      setEagerChecked(props.checked);
    }
  }, [loading]);
  if (label === null || label.trim().length === 0) {
    throw new Error("Use the label to describe the action on the toggle!");
  }
  let checked = props.evaluation === "eager" ? eagerChecked : props.checked;
  let additionalInputProps: JSX.IntrinsicElements["input"] = {};
  if (props.evaluation === "eager") {
    additionalInputProps = {
      checked,
      onChange: (e) => {
        setEagerChecked(!eagerChecked);
        props.onChange?.(e);
      },
    };
  }
  return (
    <div className={styles.container}>
      <button
        aria-label={label}
        className={styles.button}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.code === "Space") {
            setEagerChecked(!eagerChecked);
            props.onChange?.(e as any);
          }
        }}
        type="button"
      >
        <input
          {...props}
          {...additionalInputProps}
          className={styles.slider}
          {...(loading &&
            props.evaluation === "wait" && {
              "data-loading": checked ? "right" : "left",
            })}
          data-variant={variant}
          disabled={loading || props.disabled}
          tabIndex={-1}
          type="checkbox"
        />
        <label htmlFor={props.name} className={styles.label}>
          <span className="visually-hidden">{label}</span>
        </label>
      </button>
    </div>
  );
};
