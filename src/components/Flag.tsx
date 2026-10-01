import styles from "./Flag.module.css";

/** Country flag from the flag-icons package (SVG, so it renders on Windows too). */
export default function Flag({ code, size = "md" }: { code: string; size?: "md" | "lg" }) {
  return <span className={`fi fi-${code} ${styles.flag} ${styles[size]}`} aria-hidden />;
}
