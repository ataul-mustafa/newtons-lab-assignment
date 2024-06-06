import styles from "./page.module.css";
import Review from "@/Components/Review"; 

export default function Home() {
  return (
    <main className={styles.main}>
      <Review />
    </main>
  );
}
