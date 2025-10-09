import { useEffect } from "react";
import styles from "./TermsOfService.module.css";

function TermsOfService() {
  // Change page title
  useEffect(() => {
    document.title = "Reelix | Terms of Service";
  }, []);

  return (
    <main>
      <div className={`container ${styles.container}`}>
        {/* Heading */}
        <h1 className={styles.heading}>Terms of Service</h1>
        <section className={styles.section}>
          {/* Description */}
          <p className={styles.description}>
            These Terms of Service govern your use of this website. By accessing or using this site, you agree to these
            terms. If you do not agree, please do not use the site.
          </p>
          {/* User Accounts */}
          <p className={styles.subHeading}>User Accounts</p>
          <p className={styles.paragraph}>
            No user accounts, registrations, or logins are required to use this site. We do not collect personal
            information or track users.
          </p>
          {/* Acceptable Use */}
          <p className={styles.subHeading}>Acceptable Use</p>
          <p className={styles.paragraph}>
            You agree to use this site for lawful, non-commercial purposes only. You may not misuse the content or
            attempt to gain unauthorized access to the site or its services.
          </p>
          {/* Cahnges To These Terms */}
          <p className={styles.subHeading}>Changes To These Terms</p>
          <p className={styles.paragraph}>
            These terms may be updated periodically. Continued use of the site after changes are made implies acceptance
            of the updated terms. Last updated: {new Date().getFullYear()}.
          </p>
          {/* Intellectual Property */}
          <p className={styles.subHeading}>Intellectual Property</p>
          <p className={styles.paragraph}>
            All movie and TV show metadata, trailers, and images are provided by The Movie Database (TMDB) via public
            APIs and remain the property of their respective owners. This site does not host or stream any video content
            directly.
          </p>
          {/* Purpose of The Site */}
          <p className={styles.subHeading}>Purpose of The Site</p>
          <p className={styles.paragraph}>
            This site is a personal portfolio project intended for educational and demonstrative purposes only. It
            allows users to browse public information about movies and TV shows, including trailers, descriptions, cast
            details, and ratings, sourced from third-party APIs such as TMDB.
          </p>
        </section>
      </div>
    </main>
  );
}

export default TermsOfService;
