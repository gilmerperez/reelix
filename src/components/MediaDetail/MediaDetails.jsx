import styles from "./MediaDetails.module.css";

function MediaDetails({ media }) {
  const {
    name,
    title,
    genres,
    runtime,
    country,
    overview,
    directors,
    producers,
    vote_count,
    poster_path,
    release_date,
    vote_average,
    trailer_link,
    first_air_date,
    number_of_seasons,
  } = media;

  return (
    <>
      <div className={styles.detailsContainer}>
        {/* Poster image */}
        <img
          className={styles.poster}
          alt={`${title || name} Poster`}
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
        />
        <div className={styles.info}>
          {/* Title */}
          <h1 className={styles.title}>{title || name}</h1>
          {/* Trailer */}
          {trailer_link && (
            <a href={trailer_link} className={styles.trailerLink} target="_blank" rel="noopener noreferrer">
              <span className={styles.watchTrailerText}>Watch Trailer</span>
              <i className="fa-solid fa-play"></i>
            </a>
          )}
          {/* Rating */}
          <p className={styles.rating}>
            {vote_average?.toFixed(1)} / 10 ({vote_count.toLocaleString()} Votes)
          </p>
          {/* Description */}
          <p className={styles.description}>{overview}</p>
          <div className={styles.meta}>
            {/* Genres */}
            {genres?.length > 0 && (
              <p>
                <strong>Genres:</strong> {genres.join(", ")}
              </p>
            )}
            {/* Country */}
            {country && (
              <p>
                <strong>Country:</strong> {country}
              </p>
            )}
            {/* Season Count */}
            {number_of_seasons && (
              <p>
                <strong>Seasons:</strong> {number_of_seasons}
              </p>
            )}
            {/* Duration */}
            {runtime && (
              <p>
                <strong>Duration:</strong> {Math.floor(runtime / 60) > 0 ? `${Math.floor(runtime / 60)}h ` : ""}
                {runtime % 60}m
              </p>
            )}
            {/* Directors */}
            {directors?.length > 0 && (
              <p>
                <strong>Directors:</strong> {directors.join(", ")}
              </p>
            )}
            {/* Producers */}
            {producers?.length > 0 && (
              <p>
                <strong>Producers:</strong> {producers.join(", ")}
              </p>
            )}
            {/* Release date or first air date */}
            {release_date || first_air_date ? (
              <p>
                <strong>Release Date:</strong> {release_date}
                <strong>First Air Date:</strong> {first_air_date}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default MediaDetails;
