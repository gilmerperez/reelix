import logo from "/favicon.png";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Accordion from "../../components/Accordion/Accordion";
import { searchMovies, searchTVShows } from "../../utils/api";

function Home() {
  // * Set page title
  useEffect(() => {
    document.title = "Reelix | Explore The Latest Movies & TV Shows";
  }, []);

  // * State hooks
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // * Handle search
  const handleSearch = async () => {
    // Check if query is empty
    if (!query.trim()) return;
    // Try to search for movies and TV shows
    try {
      const [movies, tvShows] = await Promise.all([searchMovies(query), searchTVShows(query)]);
      // Get the top movie and TV show
      const topMovie = movies?.[0];
      const topTV = tvShows?.[0];

      let result;
      // If both movie and TV show are found, prefer the movie with higher vote count
      if (topMovie && topTV) {
        result = topMovie.vote_count >= topTV.vote_count ? { ...topMovie, type: "movie" } : { ...topTV, type: "tv" };
      } else if (topMovie) {
        // If only one is found, prefer the movie
        result = { ...topMovie, type: "movie" };
      } else if (topTV) {
        // If only one is found, prefer the TV show
        result = { ...topTV, type: "tv" };
      }
      // If a result is found, navigate to the result page
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
        <div className={styles.homeContainer}>
          {/* Logo */}
          <img src={logo} alt="Reelix Logo" className={styles.reelixLogo} />

          {/* Title */}
          <h1 className={styles.homeTitle}>Reelix</h1>

          {/* Search bar */}
          <section className={styles.searchBar}>
            <input
              type="text"
              value={query}
              placeholder="Enter Keywords..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </section>

          {/* Social links */}
          <section className={styles.socialLinks}>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.instagram.com/"
              className={`${styles.socialLink} ${styles.instagramSocialLink}`}
            >
              <i className="fa-brands fa-instagram"></i>
              <p>2B</p>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.facebook.com/"
              className={`${styles.socialLink} ${styles.facebookSocialLink}`}
            >
              <i className="fa-brands fa-facebook-f"></i>
              <p>3.07B</p>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.whatsapp.com/"
              className={`${styles.socialLink} ${styles.whatsappSocialLink}`}
            >
              <i className="fa-brands fa-whatsapp"></i>
              <p>3B</p>
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.youtube.com/"
              className={`${styles.socialLink} ${styles.youtubeSocialLink}`}
            >
              <i className="fa-brands fa-youtube"></i>
              <p>2.7B</p>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.reddit.com/"
              className={`${styles.socialLink} ${styles.redditSocialLink}`}
            >
              <i className="fa-brands fa-reddit-alien"></i>
              <p>712M</p>
            </Link>
            <Link
              target="_blank"
              to="https://www.x.com/"
              rel="noopener noreferrer"
              className={`${styles.socialLink} ${styles.xSocialLink}`}
            >
              <i className="fa-brands fa-x-twitter"></i>
              <p>563M</p>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.tiktok.com/"
              className={`${styles.socialLink} ${styles.tiktokSocialLink}`}
            >
              <i className="fa-brands fa-tiktok"></i>
              <p>1.84B</p>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.snapchat.com/"
              className={`${styles.socialLink} ${styles.snapchatSocialLink}`}
            >
              <i className="fa-brands fa-snapchat"></i>
              <p>850M</p>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.telegram.com/"
              className={`${styles.socialLink} ${styles.telegramSocialLink}`}
            >
              <i className="fa-brands fa-telegram"></i>
              <p>923M</p>
            </Link>
          </section>

          {/* Informational text */}
          <section className={styles.informationalText}>
            <p className={styles.homeDescription}>
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

          {/* Accordion */}
          <Accordion />
        </div>
      </main>
    </>
  );
}

export default Home;
