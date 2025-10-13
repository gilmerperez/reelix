import styles from "./MediaDetails.module.css";

function MediaDetails({ media }) {
  // * Destructure media object
  const {
    genres,
    runtime,
    country,
    overview,
    directors,
    producers,
    vote_count,
    release_date,
    vote_average,
    trailer_link,
    first_air_date,
    number_of_seasons,
  } = media;

  return (
    <>
      <div className={styles.detailsContainer}>
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
        {/* Media data */}
        <div className={styles.mediaData}>
          {/* Genres */}
          {genres?.length > 0 && (
            <p>
              <strong>Genres:</strong> {genres.join(", ")}
            </p>
          )}
          {/* Duration */}
          {runtime && (
            <p>
              <strong>Duration:</strong> {Math.floor(runtime / 60) > 0 ? `${Math.floor(runtime / 60)}h ` : ""}
              {runtime % 60}m
            </p>
          )}
          {/* Country */}
          {country && (
            <p>
              <strong>Country:</strong> {country}
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
          {/* Season count */}
          {number_of_seasons && (
            <p>
              <strong>Seasons:</strong> {number_of_seasons}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MediaDetails;
