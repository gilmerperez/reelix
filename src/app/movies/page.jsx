"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import Filter from "../../components/Filter/Filter";
import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";
import Pagination from "../../components/Pagination/Pagination";
import { fetchFilteredContent, searchMovies } from "../../utils/api";
import styles from "./page.module.css";

export default function Movies() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // * State hooks
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  // * Change page title
  useEffect(() => {
    document.title = "Reelix | Movies";
  }, []);

  // * Extract filters from the URL parameters, using useMemo to prevent unnecessary effect triggers
  const filters = useMemo(
    () => ({
      year: searchParams.get("year") || "",
      genre: searchParams.get("genre") || "",
      country: searchParams.get("country") || "",
    }),
    [searchParams]
  );

  // * Calculates total pages based on TMDB results
  const RESULTS_PER_PAGE = 52;
  const MAX_PAGES_TO_SHOW = 10;
  const totalPages = Math.min(Math.ceil(totalResults / RESULTS_PER_PAGE), MAX_PAGES_TO_SHOW);

  // * Fetch filtered content on filter change, not search change. With abort controller for cleanup
  useEffect(() => {
    const controller = new AbortController();
    // Fetch filtered content
    async function getData() {
      setError("");
      setLoading(true);
      // Try to fetch filtered content
      try {
        const data = await fetchFilteredContent("movie", { ...filters, page }, RESULTS_PER_PAGE);
        setMovies(data.results || data);
        setTotalResults(data.totalResults || (data.results ? data.results.length : data.length));
        // If successful, set movies and total results
      } catch (error) {
        // If failed, set error
        if (error.name !== "AbortError") {
          console.error("Failed to fetch movies", error);
          setError("Sorry, something went wrong while fetching the latest movies");
        }
      } finally {
        setLoading(false);
      }
    }
    // Fetch filtered content
    getData();
    // Cleanup
    return () => {
      controller.abort();
    };
  }, [filters, page]);

  // * When user uses filters, wrapped in useCallback
  const handleFilterChange = useCallback(
    (updatedFilters) => {
      setPage(1); // Reset to first page on filter change
      setMovies([]); // Clear previous results to prevent mismatch
      setSearchTerm(""); // Clear search when user uses filters
      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      router.push(`/movies?${params.toString()}`);
    },
    [router]
  );

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
        <div className={styles.moviesContainer}>
          {/* Title */}
          <h1 className={styles.moviesTitle}>Movies</h1>

          {/* Error message */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Search bar */}
          <section className={styles.searchBar}>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search Movies"
              onChange={handleSearchInputChange}
              onKeyDown={(event) => {
                // If enter key is pressed, search movies
                if (event.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>
              <i className="fa-solid fa-film"></i>
            </button>
          </section>

          {/* Loading or results */}
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Filters */}
              <Filter type="movie" onFilterChange={handleFilterChange} initialFilters={filters} />

              {/* Movie cards */}
              <section className={styles.movieCards}>
                {movies.length > 0 ? (
                  movies.map((movie, index) => <MovieCard key={`${movie.id}-${index}`} movie={movie} />)
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
