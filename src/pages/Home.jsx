import logo from "/favicon.png";
import styles from "./Home.module.css";
import Accordion from "../components/Accordion/Accordion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies, searchTVShows } from "../utils/api";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const [movies, tvShows] = await Promise.all([searchMovies(query), searchTVShows(query)]);

      const topMovie = movies?.[0];
      const topTV = tvShows?.[0];

      // Prefer the result with higher vote count
      let result;
      if (topMovie && topTV) {
        result = topMovie.vote_count >= topTV.vote_count ? { ...topMovie, type: "movie" } : { ...topTV, type: "tv" };
      } else if (topMovie) {
        result = { ...topMovie, type: "movie" };
      } else if (topTV) {
        result = { ...topTV, type: "tv" };
      }

      if (result) {
        navigate(`/${result.type}/${result.id}`);
      } else {
        alert("No results found.");
      }
    } catch (err) {
      console.error("Search failed:", err);
      alert("An error occurred while searching.");
    }
  };

  return (
    <>
      <main>
        <div className={`container ${styles.container}`}>
          {/* Logo */}
          <img src={logo} alt="Reelix Logo" className={styles.logo} />
          {/* Heading */}
          <h1 className={styles.heading}>Reelix</h1>
          {/* Search Bar */}
          <section className={styles.searchBar}>
            <input
              type="text"
              placeholder="Enter Keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </section>
          {/* Social Links */}
          <section className={styles.socialLinks}>
            <a href="https://www.instagram.com/" target="_blank">
              <div className={`${styles.socialLink} ${styles.instagramSocialLink}`}>
                <i className="fa-brands fa-instagram"></i>
                <p>2B</p>
              </div>
            </a>
            <a href="https://www.whatsapp.com/" target="_blank">
              <div className={`${styles.socialLink} ${styles.whatsappSocialLink}`}>
                <i className="fa-brands fa-whatsapp"></i>
                <p>3B</p>
              </div>
            </a>
            <a href="https://www.facebook.com/" target="_blank">
              <div className={`${styles.socialLink} ${styles.facebookSocialLink}`}>
                <i className="fa-brands fa-facebook-f"></i>
                <p>3.07B</p>
              </div>
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <div className={`${styles.socialLink} ${styles.youtubeSocialLink}`}>
                <i className="fa-brands fa-youtube"></i>
                <p>2.7B</p>
              </div>
            </a>
            <a href="https://www.reddit.com/" target="_blank">
              <div className={`${styles.socialLink} ${styles.redditSocialLink}`}>
                <i className="fa-brands fa-reddit-alien"></i>
                <p>712M</p>
              </div>
            </a>
            <a href="https://www.x.com/">
              <div className={`${styles.socialLink} ${styles.xSocialLink}`} target="_blank">
                <i className="fa-brands fa-x-twitter"></i>
                <p>563M</p>
              </div>
            </a>
            <a href="https://www.tiktok.com/" target="_blank">
              <div className={`${styles.socialLink} ${styles.tiktokSocialLink}`}>
                <i className="fa-brands fa-tiktok"></i>
                <p>1.84B</p>
              </div>
            </a>
            <a href="https://www.snapchat.com/" target="_blank">
              <div className={`${styles.socialLink} ${styles.snapchatSocialLink}`}>
                <i className="fa-brands fa-snapchat"></i>
                <p>850M</p>
              </div>
            </a>
          </section>

          {/* Informational Text */}
          <section className={styles.informationalText}>
            <p className={styles.description}>
              Discover movies and TV shows with Reelix — your go-to platform for exploring the latest releases,
              trailers, ratings, and detailed metadata. Designed as a modern, fully responsive media discovery app,
              Reelix helps film fans stay updated on what's new, what's trending, and what's worth watching — all in one
              clean, ad-free interface.
            </p>
            <p className={styles.subheading}>Is Reelix Safe?</p>
            <p className={styles.text}>
              Yes. Reelix is completely ad-free, does not require logins, and does not track or store personal user
              data. Reelix is hosted securely and intended purely for browsing and learning about movies and TV shows.
            </p>
            <p className={styles.subheading}>What is Reelix?</p>
            <p className={styles.text}>
              Reelix is a modern movie and TV show discovery platform. Launched as a personal project, it allows users
              to browse the latest releases, view trailers, explore cast and crew details, and keep track of trending
              titles — all in a clean, responsive interface.
            </p>
            <p className={styles.subheading}>Is There a Mobile or TV App?</p>
            <p className={styles.text}>
              While there is no dedicated mobile or TV app at the moment, this site is fully responsive and optimized
              for all devices — including phones, tablets, and smart TVs via web browsers.
            </p>
            <p className={styles.subheading}>Looking For Streaming Options?</p>
            <p className={styles.text}>
              This site does not offer direct streaming. However, trailers and official content may be embedded from
              platforms like YouTube. If you're interested in watching a film or show, we recommend checking licensed
              providers like Netflix, Hulu, Prime Video, or Disney+.
            </p>
          </section>
          {/* Review Text Accordion */}
          <Accordion />
          {/* CTA Button */}
          <Link to="/movies" className={styles.viewMovies}>
            Explore Movies and TV Shows
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
