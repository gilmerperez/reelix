import logo from "/favicon.png";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {/* Logo */}
        <NavLink to="/" className={styles.logoLink}>
          <img src={logo} alt="Reelix Logo" className={styles.logo} />
          <span className={styles.logoTitle}>Reelix</span>
        </NavLink>
        {/* Site Navigation */}
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)} end>
            Home
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Movies
          </NavLink>
          <NavLink to="/tv-shows" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            TV Shows
          </NavLink>
          <NavLink to="/top-imdb" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Top IMDB
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
