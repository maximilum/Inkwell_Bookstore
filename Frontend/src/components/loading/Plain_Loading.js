import styles from "./Plain_Loading_CSS.module.css";

export default function PlainLoading({ IsDoneLoading, Theme = "light" }) {
  return (
    <div
      className={`
            ${styles.box}
            ${Theme && styles[Theme]}
            ${IsDoneLoading ? styles.hidden : ""}
        `}
    >
      <div
        className={Theme == "light" ? styles.spinner_black : styles.spinner}
      ></div>
    </div>
  );
}
