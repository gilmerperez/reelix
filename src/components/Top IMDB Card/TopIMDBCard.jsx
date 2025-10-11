import { Link } from "react-router-dom";
import styles from "./TopIMDBCard.module.css";

function TopIMDBCard({ movie }) {
  // * Destructure movie
  const { runtime, id, title, poster_path, release_date, certification, genre_names, overview } = movie;

  // * Calculate hours and minutes from runtime
  const minutes = runtime % 60;
  const hours = Math.floor(runtime / 60);

  return (
    <>
      <Link to={`/movie/${id}`}>
        <div className={styles.topIMDBCard}>
          {/* Top IMDB poster */}
          <img
            alt={`${title} Poster`}
            className={styles.topIMDBPoster}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          />
          <div className={styles.topIMDBCardContent}>
            {/* Top IMDB title */}
            <h2 className={styles.topIMDBTitle}>{title}</h2>
            {/* Top IMDB metadata: year, certification, runtime */}
            <div className={styles.topIMDBMeta}>
              <h3 className={styles.topIMDBYear}>{release_date?.split("-")[0]}</h3>
              <h3 className={styles.topIMDBRating}>{certification || "N/A"}</h3>
              <h3 className={styles.topIMDBLength}>
                {hours > 0 ? `${hours}h ` : ""}
                {minutes}m
              </h3>
            </div>
            {/* Top IMDB genres */}
            <h3 className={styles.topIMDBGenre}>
              {genre_names?.length ? genre_names.join(" / ") : "No genres available"}
            </h3>
            {/* Top IMDB description */}
            <p className={styles.topIMDBDescription}>{overview}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TopIMDBCard;
