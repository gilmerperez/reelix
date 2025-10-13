import styles from "./Contact.module.css";
import { useEffect, useState } from "react";

function Contact() {
  // * Change page title
  useEffect(() => {
    document.title = "Reelix | Contact";
  }, []);

  // * Subject and message state
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // * Send email
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = "gilmer2002@outlook.com";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <main>
        <div className={styles.contactContainer}>
          {/* Title */}
          <h1 className={styles.contactTitle}>Contact Us</h1>
          {/* Description */}
          <p className={styles.contactDescription}>
            Have a question or feature request? We're here to help. Submit the form below and we'll get back to you as
            soon as possible.
          </p>

          {/* Contact form */}
          <section className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              {/* Subject field */}
              <div className={`${styles.formGroup} ${styles.formFloating}`}>
                <input
                  required
                  type="text"
                  id="subject"
                  value={subject}
                  placeholder="Subject"
                  className={styles.formControl}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <label htmlFor="subject">SUBJECT</label>
              </div>
              {/* Message field */}
              <div className={`${styles.formGroup} ${styles.formFloating}`}>
                <textarea
                  required
                  id="message"
                  value={message}
                  placeholder="Message"
                  className={styles.formControl}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label htmlFor="message">MESSAGE</label>
              </div>
              {/* Submit button */}
              <button type="submit" className={styles.submitBtn}>
                SEND MESSAGE
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default Contact;
