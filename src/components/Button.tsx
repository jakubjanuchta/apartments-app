import styles from "@/styles/Button.module.scss";
import { ButtonProps } from "@/types/types";

export const Button = ({ text, href }: ButtonProps) => {
  return (
    <a className={styles.main} href={href}>
      {text}
    </a>
  );
};
