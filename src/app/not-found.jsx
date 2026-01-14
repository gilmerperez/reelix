import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <main>
        <div className={styles.notFoundContainer}>
          <h1 className={styles.notFoundTitle}>404</h1>
          <p className={styles.notFoundDescription}>Page Not Found</p>
          <p className={styles.notFoundText}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className={styles.homeLink}>
            Return Home
          </Link>
        </div>
      </main>
    </>
  );
}
