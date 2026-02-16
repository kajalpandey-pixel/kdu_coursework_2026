import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Cleanly Home</div>
      <div className={styles.phone}>Call us: (123) 456-7890</div>
    </header>
  );
}
