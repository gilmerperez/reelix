"use client";
import styles from "./page.module.css";
import Filter from "../../components/Filter/Filter";
import Loading from "../../components/Loading/Loading";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "../../components/Pagination/Pagination";
import TVShowCard from "../../components/TV Show Card/TVShowCard";
import { useEffect, useState, useMemo, useCallback, Suspense } from "react";
import { fetchFilteredContent, searchTVShows } from "../../utils/api";

function TVShowsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // * Change page title
  useEffect(() => {
    document.title = "Reelix | TV Shows";
  }, []);

  // * State hooks
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);

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

  // * Fetch filtered content on filter change, not search change, with abort controller for cleanup
  useEffect(() => {
    const controller = new AbortController();
    // Fetch filtered content
    async function getData() {
      setError("");
      setLoading(true);
      // Try to fetch filtered content
      try {
        const data = await fetchFilteredContent("tv", { ...filters, page }, RESULTS_PER_PAGE);
        setTVShows(data.results || data);
        setTotalResults(data.totalResults || (data.results ? data.results.length : data.length));
        // If successful, set tv shows and total results
      } catch (error) {
        // If failed, set error
        if (error.name !== "AbortError") {
          console.error("Failed to fetch tv shows", error);
          setError("Sorry, something went wrong while fetching the latest tv shows");
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
      setTVShows([]); // Clear previous results to prevent mismatch
      setSearchTerm(""); // Clear search when user uses filters
      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      router.push(`/tv-shows?${params.toString()}`);
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
    // Try to search tv shows
    try {
      const data = await searchTVShows(searchTerm);
      setPage(1); // Reset to first page
      setTVShows(data.results || data);
      setTotalResults(data.totalResults || (data.results ? data.results.length : data.length));
      // If successful, set tv shows and total results
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
        <div className={styles.tvShowsContainer}>
          {/* Title */}
          <h1 className={styles.tvShowsTitle}>TV Shows</h1>

          {/* Error message */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Search bar */}
          <section className={styles.searchBar}>
            <input
              type="text"
              value={searchTerm}
              placeholder="Search TV Shows"
              onChange={handleSearchInputChange}
              onKeyDown={(event) => {
                // If enter key is pressed, search tv shows
                if (event.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>
              <i className="fa-solid fa-tv"></i>
            </button>
          </section>

          {/* Loading or results */}
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Filters */}
              <Filter type="tv" onFilterChange={handleFilterChange} initialFilters={filters} />

              {/* TV show cards */}
              <section className={styles.tvShowCards}>
                {tvShows.length > 0 ? (
                  tvShows.map((show, index) => <TVShowCard key={`${show.id}-${index}`} show={show} />)
                ) : (
                  <div className={styles.emptyState}>
                    <p>No tv shows found matching your criteria</p>
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

export default function TVShows() {
  return (
    <Suspense fallback={<Loading />}>
      <TVShowsContent />
    </Suspense>
  );
}
