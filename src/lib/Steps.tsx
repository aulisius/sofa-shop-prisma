import { CSSProperties } from "react";
import styles from "./Steps.module.css";

const Tick = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="15" cy="15" r="14" fill="#28bd82" />
    <path
      className={styles.stroke}
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.8856 10.1297C20.6795 9.94401 20.3616 9.96173 20.1773 10.1691L13.0802 18.1569L9.80915 15.6482C9.59419 15.4833 9.28702 15.5197 9.11654 15.7302C8.93956 15.9488 8.97765 16.2703 9.2008 16.4414L12.8473 19.2381C13.0623 19.4029 13.3694 19.3665 13.5399 19.156C13.554 19.1387 13.5666 19.1207 13.578 19.1023L20.9248 10.8333C21.1074 10.6278 21.0899 10.3136 20.8856 10.1297Z"
      fill="none"
    />
  </svg>
);

type Step = { title: string; name: string };

type Steps = {
  steps: Step[];
  activeStep: string;
  previousStep: string;
  onStepChange: (newStep: string) => void;
};

export function Steps({
  steps,
  activeStep,
  previousStep,
  onStepChange,
}: Steps) {
  let findStepMidpoint = (step: number) => (100 / steps.length) * (step + 0.5);
  let progressStops = steps.map((_, index) => index).map(findStepMidpoint);
  let activeStepIndex = steps.findIndex((step) => step.name === activeStep);
  let previouStepIndex = steps.findIndex((step) => step.name === previousStep);
  let progressStyle: CSSProperties = {
    ["--new-progress" as any]: `${progressStops[activeStepIndex]}%`,
    ["--old-progress" as any]: `${progressStops[previouStepIndex] ?? 1}%`,
  };
  return (
    <div className={styles.timeline}>
      <div
        className={styles.progress}
        key={activeStepIndex}
        style={progressStyle}
      />
      <div className={styles.container}>
        {steps.map(({ title, name }, index) => (
          <div className={styles.step} key={name}>
            <div
              className={styles.number}
              data-is-step-active={activeStep === name}
              data-is-step-completed={index < activeStepIndex}
              onClick={() => onStepChange(name)}
              data-current-step={activeStepIndex}
            >
              {index < activeStepIndex ? <Tick /> : index + 1}
            </div>
            <div
              className={styles.title}
              data-is-step-ahead={index > activeStepIndex}
            >
              {title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
