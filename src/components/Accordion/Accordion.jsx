import { useState } from "react";
import styles from "./Accordion.module.css";

const accordionData = [
  {
    title: "Media Quality",
    content: `Where available, official trailers and media previews are embedded in HD from trusted sources like
              YouTube. Poster art, backdrops, and images are delivered through TMDB&apos;s high-resolution image endpoints.`,
  },
  {
    title: "Privacy & Safety",
    content: `Reelix does not collect user data or serve third-party ads. All requests are read-only, and the app runs
              entirely in your browser. You are free to explore safely without tracking or popups.`,
  },
  {
    title: "No Ads or Popups",
    content: `Reelix is completely ad-free and will remain so. It is built for learning, portfolio showcasing, and media
              discovery only — not monetization.`,
  },
  {
    title: "No Account Required",
    content: `You can browse all content without creating an account or logging in. The focus is on open access to
              public movie and TV show data without unnecessary barriers.`,
  },
  {
    title: "Device Compatibility",
    content: `Reelix is optimized for desktops, tablets, smartphones, and even smart TVs with modern browsers. Whether
              you&apos;re at home or on the go, you&apos;ll enjoy a consistent and responsive experience.`,
  },

  {
    title: "Rich Media Database",
    content: `Browse a wide range of movie and TV show data including release dates, genres, trailers, ratings, cast and
              crew, and user reviews. Multi-language support is included for international content where available.`,
  },
  {
    title: "User-Friendly Browsing Experience",
    content: `Reelix offers an intuitive, distraction-free interface with powerful search, categorized filtering, and a clean layout. 
            Whether you&apos;re looking for a blockbuster, hidden gem, or upcoming release, the platform ensures seamless access 
            to trailers, summaries, genres, cast info, and more — all without popups or intrusive ads.`,
  },
];

export default function Accordion() {
  // * State hooks
  const [activeIndex, setActiveIndex] = useState(0);

  // * Toggle accordion
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className={styles.accordionComponent}>
        {accordionData.map((item, index) => (
          // * Accordion item
          <div key={index} className={styles.accordionItem}>
            {/* Accordion header */}
            <button
              onClick={() => toggleAccordion(index)}
              className={`${styles.accordionHeader} ${activeIndex === index ? styles.active : ""}`}
            >
              {item.title}
              <span className={styles.icon}>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {/* Accordion body */}
            <div className={`${styles.accordionBody} ${activeIndex === index ? styles.open : ""}`}>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
