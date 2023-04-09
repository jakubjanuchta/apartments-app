import styles from "@/styles/StepIndication.module.scss";
import { StepIndicationProps } from "@/types/types";
import { Fragment } from "react";

export const StepIndication = ({
  activeElements = 1,
  stepsNames,
}: StepIndicationProps) => {
  const steps = stepsNames.map((step, index) => {
    return (
      <Fragment key={index}>
        <div
          className={`${styles.step} ${
            activeElements > index ? styles.stepActive : ""
          }`}
        >
          <div
            className={`${styles.stepIcon} ${
              activeElements === index + 1 ? styles.stepIconActive : ""
            }`}
          >
            <span>{index + 1}</span>
          </div>
          <p>{step}</p>
        </div>
        {index < 2 && (
          <span
            className={`${styles.indicatorLine} ${
              activeElements > index ? styles.indicatorActive : ""
            } ${activeElements === index + 1 ? styles.indicatorAnimate : ""}`}
          ></span>
        )}
      </Fragment>
    );
  });

  return (
    <div className={styles.stepContainer}>
      <section className={styles.stepIndicator}>{steps}</section>
    </div>
  );
};
