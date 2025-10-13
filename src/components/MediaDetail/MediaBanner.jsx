import styles from "./MediaBanner.module.css";

function MediaBanner({ backdropPath, title }) {
  // * Build backdrop URL
  const backdropURL = backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : "";

  return (
    <>
      <div className={styles.bannerContainer} style={{ backgroundImage: `url(${backdropURL})` }}>
        <div className={styles.bannerOverlay}>
          <h1 className={styles.bannerTitle}>{title}</h1>
        </div>
      </div>
    </>
  );
}

export default MediaBanner;
