import styles from "../styles/Base.module.css";
import MVPGallery from "../components/mvpGallery";

export default function MVP() {
  return (
    <div>
      <main className={styles.main}>
        <MVPGallery />
      </main>
    </div>
  );
}