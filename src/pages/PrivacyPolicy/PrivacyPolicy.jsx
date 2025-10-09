import { useEffect } from "react";
import styles from "./PrivacyPolicy.module.css";

function PrivacyPolicy() {
  // Change page title
  useEffect(() => {
    document.title = "Reelix | Privacy Policy";
  }, []);

  return (
    <>
      <main>
        <div className={`container ${styles.container}`}>
          {/* Heading */}
          <h1 className={styles.heading}>Privacy Policy</h1>
          <section className={styles.policy}>
            {/* Description */}
            <p className={styles.description}>
              Your privacy is important to us. This Privacy Policy outlines what information we do and do not collect
              when you use this website.
            </p>
            {/* No Personal Data */}
            <p className={styles.policyHeading}>No Personal Data Collection</p>
            <p className={styles.policyText}>
              We do not collect, store, or share any personal information. No accounts, logins, or signups are required
              to access or use this website.
            </p>
            {/* Cookies */}
            <p className={styles.policyHeading}>Cookies and Tracking</p>
            <p className={styles.policyText}>
              This site does not use cookies, analytics, or any tracking mechanisms. Your activity on the site is not
              monitored, saved, or analyzed.
            </p>
            {/* Third-Party APIs */}
            <p className={styles.policyHeading}>Third-Party APIs</p>
            <p className={styles.policyText}>
              Movie and TV show data is retrieved using public APIs from The Movie Database (TMDB). While we display
              metadata such as titles, descriptions, and trailers, we do not store or modify this information.
            </p>
            {/* Educational Purpose */}
            <p className={styles.policyHeading}>Purpose of the Site</p>
            <p className={styles.policyText}>
              This website is a personal portfolio project intended for educational demonstration. It does not offer
              commercial services, collect user data, or serve advertisements.
            </p>
            {/* Updates */}
            <p className={styles.policyHeading}>Changes to This Policy</p>
            <p className={styles.policyText}>
              We may update this Privacy Policy occasionally. Any changes will be reflected on this page. Last updated:{" "}
              {new Date().getFullYear()}.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default PrivacyPolicy;
