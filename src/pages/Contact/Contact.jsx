import { useEffect } from "react";
import styles from "./Contact.module.css";

function Contact() {
  // Change page title
  useEffect(() => {
    document.title = "Reelix | Contact";
  }, []);

  return (
    <main>
      <div className={`container ${styles.container}`}>
        {/* Heading */}
        <h1 className={styles.heading}>Contact Us</h1>
        {/* Description */}
        <p className={styles.subheading}>
          Have a question or feature request? We're here to help. Submit the form below and we'll get back to you as
          soon as possible.
        </p>
        {/* Form */}
        <section className={styles.formSection}>
          <form action="mailto:gilmer2002@outlook.com" method="post" encType="text/plain">
            {/* Name Field */}
            <div className={`${styles.formGroup} ${styles.formFloating}`}>
              <input type="text" id="name" placeholder="Name" required className={styles.formControl} />
              <label htmlFor="name">Name</label>
            </div>
            {/* Subject Field */}
            <div className={`${styles.formGroup} ${styles.formFloating}`}>
              <input type="text" id="subject" placeholder="Subject" required className={styles.formControl} />
              <label htmlFor="subject">Subject</label>
            </div>
            {/* Email Address Field */}
            <div className={`${styles.formGroup} ${styles.formFloating}`}>
              <input type="email" id="email" placeholder="Email Address" required className={styles.formControl} />
              <label htmlFor="email">Email Address</label>
            </div>
            {/* Message Field */}
            <div className={`${styles.formGroup} ${styles.formFloating}`}>
              <textarea id="message" placeholder="Message" required className={styles.formControl}></textarea>
              <label htmlFor="message">Message</label>
            </div>
            {/* Send Message Button */}
            <button type="submit" className={styles.submitBtn}>
              Send Message <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Contact;
