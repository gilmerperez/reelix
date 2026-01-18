"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function PrivacyPolicy() {

  return (
    <>
      <main>
        <div className={styles.privacyPolicyContainer}>
          {/* Title */}
          <h1 className={styles.privacyPolicyTitle}>Privacy Policy</h1>
          {/* Description */}
          <p className={styles.privacyPolicyDescription}>
            Your privacy is important to us. This privacy policy outlines what information we do and do not collect when
            you use this website.
          </p>

          {/* Privacy policy */}
          <section className={styles.policy}>
            {/* Cookies and tracking */}
            <p className={styles.policyHeading}>Cookies and tracking</p>
            <p className={styles.policyText}>
              This site does not use cookies, analytics, or any tracking mechanisms. Your activity on the site is not
              monitored, saved, or analyzed.
            </p>
            {/* Changes to this policy */}
            <p className={styles.policyHeading}>Changes to this policy</p>
            <p className={styles.policyText}>
              We may update this Privacy Policy occasionally. Any changes will be reflected on this page. Last updated:{" "}
              {new Date().getFullYear()}.
            </p>
            {/* No personal data collection */}
            <p className={styles.policyHeading}>No personal data collection</p>
            <p className={styles.policyText}>
              We do not collect, store, or share any personal information. No accounts, logins, or signups are required
              to access or use this website.
            </p>
            {/* Purpose of the site */}
            <p className={styles.policyHeading}>Purpose of the site</p>
            <p className={styles.policyText}>
              This website is a personal portfolio project intended for educational demonstration. It does not offer
              commercial services, collect user data, or serve advertisements.
            </p>
            {/* Third-party APIs */}
            <p className={styles.policyHeading}>Third-party APIs</p>
            <p className={styles.policyText}>
              Movie and TV show data is retrieved using public APIs from The Movie Database (TMDB). While we display
              metadata such as titles, descriptions, and trailers, we do not store or modify this information.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
