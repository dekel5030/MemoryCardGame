import styles from "./DifficultySelector.module.css";

export default function DifficultySelector({
  className,
  onEasyClick,
  onMediumClick,
  onHardClick,
}) {
  return (
    <div className={`${className} ${styles.difficultySelector}`}>
      <h1>Difficulty:</h1>
      <button className={styles.button} onClick={onEasyClick}>
        Easy
      </button>
      <button className={styles.button} onClick={onMediumClick}>
        Medium
      </button>
      <button className={styles.button} onClick={onHardClick}>
        Hard
      </button>
    </div>
  );
}
