import Link from "next/link";
import styles from "./Button.module.css";

const Button = ({ children, link, onClick }) => {
  return link ? (
    <Link href={link} className={styles.btn}>
      {children}
    </Link>
  ) : (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
