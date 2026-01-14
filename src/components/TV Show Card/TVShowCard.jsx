import Link from "next/link";
import Image from "next/image";
import styles from "./TVShowCard.module.css";

function TVShowCard({ show }) {
  // * Destructure show
  const { id, poster_path, name, first_air_date, number_of_seasons, genre_names, overview } = show;

  return (
    <>
      <Link href={`/tv-show/${id}`}>
        <div className={styles.tvCard}>
          {/* TV show poster */}
          <Image
            width={500}
            height={750}
            unoptimized
            alt={`${name} Poster`}
            className={styles.tvPoster}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          />
          <div className={styles.tvCardContent}>
            {/* TV show title */}
            <h2 className={styles.tvTitle}>{name}</h2>
            {/* TV show metadata: release year, season count */}
            <div className={styles.tvMeta}>
              <h3 className={styles.tvYear}>{first_air_date?.split("-")[0]}</h3>
              <h3 className={styles.tvSeasons}>
                {number_of_seasons} Season{number_of_seasons !== 1 ? "s" : ""}
              </h3>
            </div>
            {/* TV show genres */}
            <h3 className={styles.tvGenre}>{genre_names.join(" / ")}</h3>
            {/* TV show description */}
            <p className={styles.tvDescription}>{overview}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TVShowCard;
