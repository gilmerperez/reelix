"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "/favicon.png";

function Header() {
  const pathname = usePathname();
  
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

  // * Check if link is active
  const isActive = (path) => pathname === path;

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
            <Link href="/" className={styles.logoLink}>
              <Image src={logo} alt="Reelix Logo" className={styles.logo} width={40} height={40} priority />
              <span className={styles.logoTitle}>Reelix</span>
            </Link>
            {/* Site navigation */}
            <nav className={styles.navContainer}>
              <Link href="/" className={isActive("/") ? styles.activeLink : undefined}>
                HOME
              </Link>
              <Link href="/movies" className={isActive("/movies") ? styles.activeLink : undefined}>
                MOVIES
              </Link>
              <Link href="/tv-shows" className={isActive("/tv-shows") ? styles.activeLink : undefined}>
                TV SHOWS
              </Link>
              <Link href="/top-imdb" className={isActive("/top-imdb") ? styles.activeLink : undefined}>
                TOP IMDB
              </Link>
            </nav>
          </div>

          {/* Mobile header */}
          <div className={styles.mobileHeader}>
            {/* Logo */}
            <Link href="/" className={styles.logoLink}>
              <Image src={logo} alt="Reelix Logo" className={styles.logo} width={40} height={40} priority />
              <span className={styles.logoTitle}>Reelix</span>
            </Link>
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
                <Link href="/" className={isActive("/") ? styles.activeLink : undefined} onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/movies" className={isActive("/movies") ? styles.activeLink : undefined} onClick={() => setMenuOpen(false)}>
                  Movies
                </Link>
                <Link href="/tv-shows" className={isActive("/tv-shows") ? styles.activeLink : undefined} onClick={() => setMenuOpen(false)}>
                  TV Shows
                </Link>
                <Link href="/top-imdb" className={isActive("/top-imdb") ? styles.activeLink : undefined} onClick={() => setMenuOpen(false)}>
                  Top IMDB
                </Link>
              </nav>
              {/* Sidebar footer */}
              <div className={styles.sidebarFooter}>
                {/* Sidebar legal pages */}
                <Link href="/contact" className={isActive("/contact") ? styles.activeLink : undefined} onClick={() => setMenuOpen(false)}>
                  <i className="fa-solid fa-paper-plane"></i>
                  Contact
                </Link>
                <Link href="/privacy-policy" className={isActive("/privacy-policy") ? styles.activeLink : undefined} onClick={() => setMenuOpen(false)}>
                  <i className="fa-solid fa-shield-halved"></i>
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className={isActive("/terms-of-service") ? styles.activeLink : undefined} onClick={() => setMenuOpen(false)}>
                  <i className="fa-solid fa-asterisk"></i>
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Header;
