import styles from "./Footer.module.css";
import { NavLink, Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.topContainer}>
            {/* Legal disclaimer */}
            <p className={styles.legalDisclaimer}>
              Reelix is a Movie and TV Show database. It does not host, stream, or distribute any copyrighted content.
              All metadata and media previews are provided via public APIs. No user accounts, payments, or downloads are
              required.
            </p>
            {/* Copyright */}
            <p className={styles.copyright}>&copy; {new Date().getFullYear()} Reelix. All rights reserved.</p>
          </div>

          {/* Seperator */}
          <hr className={styles.seperator} />

          <div className={styles.bottomContainer}>
            {/* Site navigation */}
            <section className={styles.siteNavigation}>
              <h6 className={styles.navHeader}>PAGES</h6>
              <nav className={styles.navItems}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/movies">Movies</NavLink>
                <NavLink to="/tv-shows">TV Shows</NavLink>
                <NavLink to="/top-imdb">Top IMDB</NavLink>
              </nav>
            </section>
            {/* Social links */}
            <section className={styles.socialLinks}>
              <h6 className={styles.navHeader}>CONNECT</h6>
              <nav className={styles.navItems}>
                {/* Facebook */}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  to="https://www.facebook.com/"
                >
                  Facebook
                </Link>
                {/* Instagram */}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  to="https://www.instagram.com/"
                >
                  Instagram
                </Link>
                {/* Google page */}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  to="https://www.google.com/"
                  className={styles.socialLink}
                >
                  Google Page
                </Link>
              </nav>
            </section>
            {/* Legal pages */}
            <section className={styles.legalPages}>
              <h6 className={styles.navHeader}>LEGAL</h6>
              <nav className={styles.navItems}>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                <NavLink to="/terms-of-service">Terms of Service</NavLink>
              </nav>
            </section>
            {/* Contact info */}
            <section className={styles.contactInfo}>
              <h6 className={styles.navHeader}>CONTACT</h6>
              <nav className={styles.navItems}>
                {/* Phone number */}
                <Link className={styles.contactLink} to="tel:+14073501805">
                  (408) 540-3700
                </Link>
                {/* Email */}
                <Link className={styles.contactLink} to="mailto:gilmer2002@outlook.com">
                  reelix@info.com
                </Link>
                {/* Address */}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  to="https://www.google.com/maps/place/Netflix+-+Building+E+-+Main+Lobby/@37.2570665,-121.9666096,778m/data=!3m1!1e3!4m6!3m5!1s0x808e35a0d3457091:0xdebdf28350f4befc!8m2!3d37.2570306!4d-121.9639833!16s%2Fg%2F11b8zb4lq9?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
                >
                  121 Albright Wy, Los Gatos, CA 95032
                </Link>
              </nav>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
