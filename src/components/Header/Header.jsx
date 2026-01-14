import logo from "/favicon.png";
import styles from "./Header.module.css";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  // * Sticky header logic
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // * Custom styles for active page
  const navLinkClass = ({ isActive }) => (isActive ? styles.activeLink : undefined);

  // * Mobile sidebar toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Handle hamburger click with spin animation
  const handleHamburgerClick = () => {
    setMenuOpen(true);
    setIsSpinning(true);
    // Reset spinning state after animation completes
    setTimeout(() => {
      setIsSpinning(false);
    }, 300);
  };

  return (
    <>
      <header className={`${isScrollingUp ? styles.visible : styles.hidden}`}>
        <div className={styles.headerContainer}>
          {/* Desktop header */}
          <div className={styles.desktopHeader}>
            {/* Logo */}
            <NavLink to="/" className={styles.logoLink}>
              <img src={logo} alt="Reelix Logo" className={styles.logo} />
              <span className={styles.logoTitle}>Reelix</span>
            </NavLink>
            {/* Site navigation */}
            <nav className={styles.navContainer}>
              <NavLink to="/" className={navLinkClass} end>
                HOME
              </NavLink>
              <NavLink to="/movies" className={navLinkClass}>
                MOVIES
              </NavLink>
              <NavLink to="/tv-shows" className={navLinkClass}>
                TV SHOWS
              </NavLink>
              <NavLink to="/top-imdb" className={navLinkClass}>
                TOP IMDB
              </NavLink>
            </nav>
          </div>

          {/* Mobile header */}
          <div className={styles.mobileHeader}>
            {/* Logo */}
            <NavLink to="/" className={styles.logoLink}>
              <img src={logo} alt="Reelix Logo" className={styles.logo} />
              <span className={styles.logoTitle}>Reelix</span>
            </NavLink>
            {/* Hamburger button */}
            <button className={styles.hamburger} onClick={handleHamburgerClick}>
              <i className={`fa-solid fa-bars ${isSpinning ? styles.spin : ""}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {menuOpen &&
        createPortal(
          <div className={styles.sidebarOverlay} onClick={() => setMenuOpen(false)}>
            <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
              {/* Sidebar close button */}
              <button className={styles.sidebarClose} onClick={() => setMenuOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              {/* Sidebar site navigation */}
              <nav className={styles.sidebarNavItems}>
                <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/movies" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Movies
                </NavLink>
                <NavLink to="/tv-shows" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  TV Shows
                </NavLink>
                <NavLink to="/top-imdb" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  Top IMDB
                </NavLink>
              </nav>
              {/* Sidebar footer */}
              <div className={styles.sidebarFooter}>
                {/* Sidebar legal pages */}
                <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  <i className="fa-solid fa-paper-plane"></i>
                  Contact
                </NavLink>
                <NavLink to="/privacy-policy" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  <i className="fa-solid fa-shield-halved"></i>
                  Privacy Policy
                </NavLink>
                <NavLink to="/terms-of-service" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                  <i className="fa-solid fa-asterisk"></i>
                  Terms of Service
                </NavLink>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Header;
