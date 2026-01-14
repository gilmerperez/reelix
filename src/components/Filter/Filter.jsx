import styles from "./Filter.module.css";
import { fetchMovieGenres, fetchTVGenres } from "../../utils/api";
import { useState, useEffect, useMemo, startTransition } from "react";

// * Filter component for year, genre, and country
function Filter({ type = "movie", initialFilters, onFilterChange }) {
  // * State hooks
  const [genres, setGenres] = useState([]);

  // * Normalize initial filters (memoized to prevent unnecessary effect triggers)
  const normalizedFilters = useMemo(() => initialFilters || { year: "", genre: "", country: "" }, [initialFilters]);

  const [filters, setFilters] = useState(normalizedFilters);

  // * Load genres based on content type (movie or TV)
  useEffect(() => {
    async function loadGenres() {
      const genreMap = type === "tv" ? await fetchTVGenres() : await fetchMovieGenres();
      const genreList = Object.entries(genreMap).map(([id, name]) => ({ id, name }));
      setGenres(genreList);
    }
    loadGenres();
  }, [type]);

  // * Sync filters when initialFilters change (using startTransition to avoid cascading renders)
  useEffect(() => {
    if (
      filters.year !== normalizedFilters.year ||
      filters.genre !== normalizedFilters.genre ||
      filters.country !== normalizedFilters.country
    ) {
      startTransition(() => {
        setFilters(normalizedFilters);
      });
    }
  }, [normalizedFilters, filters.year, filters.genre, filters.country]);

  // * Handle change in any filter
  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange(updated);
  }

  return (
    <>
      <div className={styles.filterContainer}>
        {/* Year filter */}
        <select name="year" value={filters.year} onChange={handleChange} className={styles.select}>
          <option value="" className={styles.option}>
            All Years
          </option>
          {Array.from({ length: 30 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y.toString()} className={styles.option}>
                {y}
              </option>
            );
          })}
        </select>

        {/* Genre filter */}
        <select name="genre" value={filters.genre} onChange={handleChange} className={styles.select}>
          <option value="" className={styles.option}>
            All Genres
          </option>
          {genres.map(({ id, name }) => (
            <option key={id} value={id} className={styles.option}>
              {name}
            </option>
          ))}
        </select>

        {/* Country filter */}
        <select name="country" value={filters.country} onChange={handleChange} className={styles.select}>
          <option value="" className={styles.option}>
            All Countries
          </option>
          <option value="GB" className={styles.option}>
            United Kingdom
          </option>
          <option value="US" className={styles.option}>
            United States
          </option>
          <option value="FR" className={styles.option}>
            France
          </option>
          <option value="JP" className={styles.option}>
            Japan
          </option>
          <option value="IN" className={styles.option}>
            India
          </option>
        </select>
      </div>
    </>
  );
}

export default Filter;
