import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  // * Destructure movie
  const { runtime, id, title, poster_path, release_date, certification, genre_names, overview } = movie;

  // * Calculate hours and minutes from runtime
  const minutes = runtime % 60;
  const hours = Math.floor(runtime / 60);

  return (
    <>
      <Link to={`/movie/${id}`}>
        <div className={styles.movieCard}>
          {/* Movie poster */}
          <img
            alt={`${title} Poster`}
            className={styles.moviePoster}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          />
          <div className={styles.movieCardContent}>
            {/* Movie title */}
            <h2 className={styles.movieTitle}>{title}</h2>
            {/* Movie metadata: release year, certification, runtime */}
            <div className={styles.movieMeta}>
              <h3 className={styles.movieYear}>{release_date?.split("-")[0]}</h3>
              <h3 className={styles.movieRating}>{certification}</h3>
              <h3 className={styles.movieLength}>
                {hours > 0 ? `${hours}h ` : ""}
                {minutes}m
              </h3>
            </div>
            {/* Movie genres */}
            <h3 className={styles.movieGenre}>{genre_names.join(" / ")}</h3>
            {/* Movie description */}
            <p className={styles.movieDescription}>{overview}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
