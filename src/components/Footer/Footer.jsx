"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

function Footer() {
  const pathname = usePathname();
  
  return (
    <>
      <footer className={styles.footer}>
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
                <Link href="/">Home</Link>
                <Link href="/movies">Movies</Link>
                <Link href="/tv-shows">TV Shows</Link>
                <Link href="/top-imdb">Top IMDB</Link>
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
                  href="https://www.facebook.com/"
                >
                  Facebook
                </Link>
                {/* Instagram */}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  href="https://www.instagram.com/"
                >
                  Instagram
                </Link>
                {/* Google page */}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/"
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
                <Link href="/contact">Contact</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-of-service">Terms of Service</Link>
              </nav>
            </section>
            {/* Contact info */}
            <section className={styles.contactInfo}>
              <h6 className={styles.navHeader}>CONTACT</h6>
              <nav className={styles.navItems}>
                {/* Phone number */}
                <Link className={styles.contactLink} href="tel:+14073501805">
                  (408) 540-3700
                </Link>
                {/* Email */}
                <Link className={styles.contactLink} href="mailto:gilmer2002@outlook.com">
                  reelix@info.com
                </Link>
                {/* Address */}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  href="https://www.google.com/maps/place/Netflix+-+Building+E+-+Main+Lobby/@37.2570665,-121.9666096,778m/data=!3m1!1e3!4m6!3m5!1s0x808e35a0d3457091:0xdebdf28350f4befc!8m2!3d37.2570306!4d-121.9639833!16s%2Fg%2F11b8zb4lq9?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
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
