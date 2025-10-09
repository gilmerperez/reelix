import styles from "./TopIMDB.module.css";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import TopIMDBCard from "../../components/Top IMDB Card/TopIMDBCard";
import { useState, useEffect, useCallback } from "react";
import { fetchTopRatedMovies, searchMovies } from "../../utils/api";

function TopIMDB() {
  // State hooks
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  // Change page title
  useEffect(() => {
    document.title = "Reelix | Top IMDB";
  }, []);

  // Calculates total pages based on TMDB results
  const RESULTS_PER_PAGE = 20;
  const MAX_PAGES_TO_SHOW = 10;
  const totalPages = Math.min(Math.ceil(totalResults / RESULTS_PER_PAGE), MAX_PAGES_TO_SHOW);

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      setError("");
      setLoading(true);
      try {
        const data = await fetchTopRatedMovies(page, controller.signal);
        setMovies(data.results || data);
        setTotalResults(data.totalResults || (data.results ? data.results.length : data.length));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch top rated movies", error);
          setError("Sorry, something went wrong while fetching top rated movies");
        }
      } finally {
        setLoading(false);
      }
    }
    getData();
    return () => {
      controller.abort();
    };
  }, [page]);

  // Manual input update, wrapped in useCallback
  const handleSearchInputChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Keyword search, wrapped in useCallback
  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a keyword to search");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await searchMovies(searchTerm);
      setPage(1); // Reset to first page
      setMovies(data.results || data);
      setTotalResults(data.totalResults || (data.results ? data.results.length : data.length));
    } catch (error) {
      console.error("Search failed", error);
      setError("Sorry, something went wrong while searching");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  // On page change, wrapped in useCallback
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
        <div className={`container ${styles.container}`}>
          {/* Heading */}
          <h1 className={styles.heading}>Top Rated on IMDB</h1>
          {/* Error Message */}
          {error && <div className={styles.error}>{error}</div>}
          {/* Search Bar */}
          <section className={styles.searchBar}>
            <input
              type="text"
              placeholder="Enter Keywords..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>
              <i className="fa-solid fa-trophy"></i>
            </button>
          </section>
          {/* Loading or Results */}
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Top IMDB Cards */}
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

export default TopIMDB;
