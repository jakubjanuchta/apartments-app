import styles from "@/styles/ProgressBar.module.scss";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const ProgressBar = ({
  shouldSpeedUp,
  setReadyToDisplay,
}: {
  shouldSpeedUp: boolean;
  setReadyToDisplay: Dispatch<SetStateAction<boolean>>;
}) => {
  const [progressValue, setProgressValue] = useState<number>(0);
  const [progressStep, setProgressStep] = useState<number>(0.1);

  const barRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (progressValue < 105) {
      if (progressValue >= 90) {
        setProgressStep(0.01);
      }

      setTimeout(() => {
        if (barRef.current !== null)
          barRef.current.style.right = 100 - progressValue + "%";

        !shouldSpeedUp &&
          progressValue < 90 &&
          setProgressStep(Math.random() / 30 + 0.8);

        setProgressValue((prev) => prev + (shouldSpeedUp ? 1 : progressStep));
      }, 20);
    } else {
      setTimeout(() => {
        setReadyToDisplay(true);
      }, 1000);
    }
  }, [progressStep, progressValue, shouldSpeedUp, setReadyToDisplay]);

  return (
    <div className={styles.progress}>
      <div className={styles.bar} ref={barRef}></div>
    </div>
  );
};
