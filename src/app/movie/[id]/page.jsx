"use client";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { fetchMediaDetails } from "../../../utils/api";
import Loading from "../../../components/Loading/Loading";
import MediaBanner from "../../../components/MediaDetail/MediaBanner";
import MediaDetails from "../../../components/MediaDetail/MediaDetails";
import Script from "next/script";

export default function MovieDetail() {
  // * State Hooks
  const isMounted = useRef(true);
  const [media, setMedia] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // * Track mount status to avoid setting state on unmounted component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // * Fetch media details
  useEffect(() => {
    async function getDetails() {
      setError("");
      setLoading(true);
      try {
        const data = await fetchMediaDetails("movie", id);
        if (isMounted.current) {
          setMedia(data);
        }
      } catch (error) {
        console.error("Failed to fetch details", error);
        if (isMounted.current) {
          setError("Sorry, something went wrong while fetching details.");
          setMedia(null);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }
    getDetails();
  }, [id]);

  // Generate structured data when media is loaded
  const structuredData = media
    ? {
        "@context": "https://schema.org",
        "@type": "Movie",
        name: media.title || media.name,
        description: media.overview || "",
        image: media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : undefined,
        datePublished: media.release_date || undefined,
        aggregateRating: media.vote_average
          ? {
              "@type": "AggregateRating",
              ratingValue: media.vote_average,
              ratingCount: media.vote_count || 0,
              bestRating: 10,
              worstRating: 0,
            }
          : undefined,
        duration: media.runtime ? `PT${media.runtime}M` : undefined,
        genre: media.genres || [],
        director: media.directors && media.directors.length > 0 ? { "@type": "Person", name: media.directors[0] } : undefined,
        actor: media.cast
          ? media.cast.slice(0, 6).map((name) => ({
              "@type": "Person",
              name: name,
            }))
          : undefined,
        trailer: media.trailer_link
          ? {
              "@type": "VideoObject",
              name: `${media.title || media.name} Trailer`,
              description: `Official trailer for ${media.title || media.name}`,
              thumbnailUrl: media.backdrop_path ? `https://image.tmdb.org/t/p/w1280${media.backdrop_path}` : undefined,
              uploadDate: media.release_date || undefined,
              contentUrl: media.trailer_link,
            }
          : undefined,
      }
    : null;

  return (
    <>
      {structuredData && (
        <Script
          id="movie-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <main>
        {/* Error */}
        {error && (
          <div className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}
        {/* Loading */}
        {loading ? (
          <Loading />
        ) : (
          media && (
            <>
              {/* Media banner */}
              <MediaBanner backdropPath={media.backdrop_path} title={media.title || media.name} />
              {/* Media details */}
              <MediaDetails media={media} mediaType="movie" />
            </>
          )
        )}
      </main>
    </>
  );
}
