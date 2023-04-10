import styles from "../styles/Base.module.css";
import NFTGallery from "../components/nftGallery";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <NFTGallery />
      </main>
    </div>
  );
}
