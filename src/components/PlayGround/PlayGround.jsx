import styles from "./PlayGround.module.css";
import Card from "../Card/Card";

export default function PlayGround({ ids, difficulty }) {
  return (
    <main className={styles.playGround}>
      <div className={`${styles.cardSelection} ${styles[difficulty]}`}>
        {ids.map((id) => (
          <Card id={id} key={id} className={difficulty} />
        ))}
      </div>
      <div className="cardRemain">0/9</div>
    </main>
  );
}
