import styles from "./Pagination.module.css";
import { useMemo, useCallback } from "react";

function Pagination({ page, onPageChange, totalPages = 5 }) {
  // * Generate page numbers based on totalPages, memoized for performance
  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  // * Navigate to previous page
  // Handlers wrapped in useCallback to optimize renders
  const handlePrevious = useCallback(() => {
    if (page > 1) onPageChange(page - 1);
  }, [page, onPageChange]);

  // * Navigate to specific page
  const handlePageClick = useCallback(
    (num) => {
      onPageChange(num);
    },
    [onPageChange]
  );

  // * Navigate to next page
  const handleNext = useCallback(() => {
    if (page < totalPages) onPageChange(page + 1);
  }, [page, totalPages, onPageChange]);

  return (
    <>
      <nav className={styles.paginationContainer}>
        <ul className={styles.paginationItems}>
          {/* Left arrow */}
          <li className={`${styles.pageItem} ${page === 1 ? styles.disabled : ""}`}>
            <button onClick={handlePrevious} className={styles.pageLink} disabled={page === 1}>
              <i className="fa-solid fa-left-long"></i>
            </button>
          </li>
          {/* Page numbers */}
          {pageNumbers.map((num) => (
            <li key={num} className={`${styles.pageItem} ${page === num ? styles.active : ""}`}>
              <button onClick={() => handlePageClick(num)} className={styles.pageLink}>
                {num}
              </button>
            </li>
          ))}
          {/* Right arrow */}
          <li className={`${styles.pageItem} ${page === totalPages ? styles.disabled : ""}`}>
            <button onClick={handleNext} className={styles.pageLink} disabled={page === totalPages}>
              <i className="fa-solid fa-right-long"></i>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
