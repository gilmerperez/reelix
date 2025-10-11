import styles from "./Filter.module.css";
import { useState, useEffect } from "react";
import { fetchMovieGenres, fetchTVGenres } from "../../utils/api";

// * Filter component for year, genre, and country
function Filter({ type = "movie", initialFilters, onFilterChange }) {
  // * State hooks
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState(initialFilters || { year: "", genre: "", country: "" });

  // * Load genres based on content type (movie or TV)
  useEffect(() => {
    async function loadGenres() {
      const genreMap = type === "tv" ? await fetchTVGenres() : await fetchMovieGenres();
      const genreList = Object.entries(genreMap).map(([id, name]) => ({ id, name }));
      setGenres(genreList);
    }
    loadGenres();
  }, [type]);

  // * Sync filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters || { year: "", genre: "", country: "" });
  }, [initialFilters]);

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
        <select name="year" value={filters.year} onChange={handleChange}>
          <option value="">All Years</option>
          {Array.from({ length: 30 }, (_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            );
          })}
        </select>

        {/* Genre filter */}
        <select name="genre" value={filters.genre} onChange={handleChange}>
          <option value="">All Genres</option>
          {genres.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {/* Country filter */}
        <select name="country" value={filters.country} onChange={handleChange}>
          <option value="">All Countries</option>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="FR">France</option>
          <option value="JP">Japan</option>
          <option value="IN">India</option>
        </select>
      </div>
    </>
  );
}

export default Filter;
