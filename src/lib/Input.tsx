import { FieldInputProps, FormikProps } from "formik";
import React, { ReactNode } from "react";
import styles from "./Input.module.css";
import { Question } from "./Question";
import { Tooltip } from "./Tooltip";
type InputProps = JSX.IntrinsicElements["input"] & {
  iconAccessibility?: JSX.IntrinsicElements["button"];
  iconSlot?: ReactNode;
  iconType?: "external" | "internal";
  field?: Partial<FieldInputProps<string>>;
  form?: FormikProps<unknown>;
  label?: string;
  sublabel?: string;
  sublabelVariant?: "standard" | "tooltip";
  unit?: "s" | "xl";
  variant: "standard" | "plain";
};

function SubLabel({ variant, inputVariant, children }) {
  if (variant === "standard") {
    return (
      <>
        <div style={{ height: "9px" }} />
        <p className={styles.sublabel} data-variant={inputVariant}>
          {children}
        </p>
      </>
    );
  }
  return (
    <Tooltip label={children} ariaLabel={children}>
      <button type="button" style={{ marginLeft: "7px" }}>
        <Question />
      </button>
    </Tooltip>
  );
}

export function Input({
  variant,
  iconAccessibility = {},
  iconSlot,
  iconType = "internal",
  label,
  sublabel,
  sublabelVariant = "standard",
  field = {},
  form,
  unit = "s",
  ...props
}: InputProps) {
  let inputProps = { ...field, ...props };
  let touched = form?.touched[inputProps.name] ?? false;
  let error = form?.errors[inputProps.name];
  return (
    <div className={styles.container} data-unit={unit}>
      <label
        htmlFor={inputProps.name}
        className={styles.label}
        data-variant={variant}
        data-has-sublabel={!!sublabel}
        data-sublabel-variant={sublabelVariant}
      >
        <span>{label}</span>
        {sublabel ? (
          <SubLabel inputVariant={variant} variant={sublabelVariant}>
            {sublabel}
          </SubLabel>
        ) : null}
      </label>
      {!sublabel ? (
        <div
          style={{
            height: variant === "plain" ? "5px" : "11px",
            gridColumn: "1 / 10",
          }}
        />
      ) : null}
      <input
        {...inputProps}
        className={styles.input}
        data-invalid={touched && !!error}
        data-touched={touched}
        data-variant={variant}
      />
      <span className={styles.error}>{error ?? "No errors"}</span>
      {iconSlot ? (
        <button
          className={styles[iconType]}
          type="button"
          {...iconAccessibility}
        >
          {iconSlot}
        </button>
      ) : null}
    </div>
  );
}
