import styles from "../styles/Base.module.css";
import BirthdayGallery from "../components/birthdayGallery";


export default function Birthdays() {
  return (
    <div>
      <main className={styles.main}>
        <BirthdayGallery />
      </main>
    </div>
  );
}
