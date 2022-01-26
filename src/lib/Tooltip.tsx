import Portal from "@reach/portal";
import { TooltipPopup, useTooltip } from "@reach/tooltip";
import React, { ReactElement } from "react";
import styles from "./Tooltip.module.css";

const centered = (triggerRect, tooltipRect) => {
  const triggerCenter = triggerRect ? triggerRect.left + triggerRect?.width / 2 : 0;
  const left = triggerCenter - tooltipRect.width / 2;
  const maxLeft = window.innerWidth - tooltipRect.width - 2;
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: (triggerRect?.bottom ?? 0) + 8 + window.scrollY,
  };
};

type TriangleProps = {
  "aria-label"?: string;
  children: ReactElement;
  label: string;
};

function TriangleTooltip({
  children,
  label,
  "aria-label": ariaLabel,
}: TriangleProps) {
  const [trigger, tooltip] = useTooltip();
  const { isVisible, triggerRect } = tooltip;

  return (
    <>
      {React.cloneElement(children, trigger)}

      {isVisible && (
        <Portal>
          <div
            style={{
              position: "absolute",
              left: triggerRect && triggerRect.left - 7 + triggerRect.width / 2,
              top: triggerRect && triggerRect.bottom + window.scrollY,
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderBottom: "7px solid rgb(59, 62, 71)",
              zIndex: 100,
            }}
          />
        </Portal>
      )}
      <TooltipPopup
        {...tooltip}
        label={label}
        aria-label={ariaLabel}
        className={styles.tooltip}
        position={centered}
      />
    </>
  );
}

export function Tooltip({ children, label, ariaLabel }) {
  return (
    <TriangleTooltip label={label} aria-label={ariaLabel}>
      {children}
    </TriangleTooltip>
  );
}
