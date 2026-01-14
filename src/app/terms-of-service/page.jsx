"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function TermsOfService() {
  // * Change page title
  useEffect(() => {
    document.title = "Reelix | Terms of Service";
  }, []);

  return (
    <>
      <main>
        <div className={styles.termsOfServiceContainer}>
          {/* Title */}
          <h1 className={styles.termsOfServiceTitle}>Terms of Service</h1>
          {/* Description */}
          <p className={styles.termsOfServiceDescription}>
            These terms of service govern your use of this website. By accessing or using this site, you agree to these
            terms. If you do not agree, please do not use the site.
          </p>

          {/* Terms of service */}
          <section className={styles.terms}>
            {/* User accounts */}
            <p className={styles.termsHeading}>User accounts</p>
            <p className={styles.termsText}>
              No user accounts, registrations, or logins are required to use this site. We do not collect personal
              information or track users.
            </p>
            {/* Acceptable use */}
            <p className={styles.termsHeading}>Acceptable use</p>
            <p className={styles.termsText}>
              You agree to use this site for lawful, non-commercial purposes only. You may not misuse the content or
              attempt to gain unauthorized access to the site or its services.
            </p>
            {/* Changes to these terms */}
            <p className={styles.termsHeading}>Changes to these terms</p>
            <p className={styles.termsText}>
              These terms may be updated periodically. Continued use of the site after changes are made implies acceptance
              of the updated terms. Last updated: {new Date().getFullYear()}.
            </p>
            {/* Intellectual property */}
            <p className={styles.termsHeading}>Intellectual property</p>
            <p className={styles.termsText}>
              All movie and TV show metadata, trailers, and images are provided by The Movie Database (TMDB) via public
              APIs and remain the property of their respective owners. This site does not host or stream any video content
              directly.
            </p>
            {/* Purpose of the site */}
            <p className={styles.termsHeading}>Purpose of the site</p>
            <p className={styles.termsText}>
              This site is a personal portfolio project intended for educational and demonstrative purposes only. It
              allows users to browse public information about movies and TV shows, including trailers, descriptions, cast
              details, and ratings, sourced from third-party APIs such as TMDB.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
