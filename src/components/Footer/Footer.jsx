import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footerContainer}>
          {/* Legal disclaimer */}
          <p className={styles.legalDisclaimer}>
            Reelix is a Movie and TV Show database. It does not host, stream, or distribute any copyrighted content. All
            metadata and media previews are provided via public APIs. No user accounts, payments, or downloads are
            required.
          </p>
          {/* Copyright */}
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Reelix. All rights reserved.</p>
          {/* Seperator */}
          <hr className={styles.seperator} />
          {/* Navigation links */}
          <nav className={styles.siteNavigation}>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/tv-shows">TV Shows</Link>
            <Link to="/top-imdb">Top IMDB</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default Footer;
