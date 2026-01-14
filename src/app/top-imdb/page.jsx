"use client";

import { useEffect, useState, useCallback } from "react";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import TopIMDBCard from "../../components/Top IMDB Card/TopIMDBCard";
import { fetchTopRatedMovies, searchMovies } from "../../utils/api";
import styles from "./page.module.css";

export default function TopIMDB() {
  // * Change page title
  useEffect(() => {
    document.title = "Reelix | Top IMDB";
  }, []);

  // * State hooks
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  // * Calculates total pages based on TMDB results
  const RESULTS_PER_PAGE = 20;
  const MAX_PAGES_TO_SHOW = 10;
  const totalPages = Math.min(Math.ceil(totalResults / RESULTS_PER_PAGE), MAX_PAGES_TO_SHOW);

  // * Fetch top rated movies on page change, with abort controller for cleanup
  useEffect(() => {
    const controller = new AbortController();
    // Fetch top rated movies
    async function getData() {
      setError("");
      setLoading(true);
      // Try to fetch top rated movies
      try {
        const data = await fetchTopRatedMovies(page, controller.signal);
        setMovies(data.results || data);
        setTotalResults(data.totalResults || (data.results ? data.results.length : data.length));
        // If successful, set movies and total results
      } catch (error) {
        // If failed, set error
        if (error.name !== "AbortError") {
          console.error("Failed to fetch top rated movies", error);
          setError("Sorry, something went wrong while fetching top rated movies");
        }
      } finally {
        setLoading(false);
      }
    }
    // Fetch top rated movies
    getData();
    // Cleanup
    return () => {
      controller.abort();
    };
  }, [page]);

  // * Manual input update, wrapped in useCallback
  const handleSearchInputChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // * Keyword search, wrapped in useCallback
  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a keyword to search");
      return;
    }

    // Set error to empty string
    setError("");
    // Set loading to true
    setLoading(true);
    // Try to search movies
    try {
      const data = await searchMovies(searchTerm);
      setPage(1); // Reset to first page
      setMovies(data.results || data);
      setTotalResults(data.totalResults || (data.results ? data.results.length : data.length));
      // If successful, set movies and total results
    } catch (error) {
      console.error("Search failed", error);
      setError("Sorry, something went wrong while searching");
      // If failed, set error
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  // * On page change, wrapped in useCallback
  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage < 1 || newPage > totalPages) return;
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalPages]
  );

  return (
    <>
      <main>
        <div className={styles.topIMDBContainer}>
          {/* Title */}
          <h1 className={styles.topIMDBTitle}>Top Rated on IMDB</h1>

          {/* Error message */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Search bar */}
          <section className={styles.searchBar}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search Top Rated on IMDB"
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>
              <i className="fa-solid fa-trophy"></i>
            </button>
          </section>

          {/* Loading or results */}
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Top IMDB cards */}
              <section className={styles.topIMDBCards}>
                {movies.length > 0 ? (
                  movies.map((movie, index) => <TopIMDBCard key={`${movie.id}-${index}`} movie={movie} />)
                ) : (
                  <div className={styles.emptyState}>
                    <p>No movies found matching your criteria</p>
                  </div>
                )}
              </section>

              {/* Pagination */}
              {totalPages > 1 && <Pagination page={page} onPageChange={handlePageChange} totalPages={totalPages} />}
            </>
          )}
        </div>
      </main>
    </>
  );
}
