"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import MediaBanner from "../../../components/MediaDetail/MediaBanner";
import Loading from "../../../components/Loading/Loading";
import MediaDetails from "../../../components/MediaDetail/MediaDetails";
import { fetchMediaDetails } from "../../../utils/api";
import styles from "./page.module.css";

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

  // * Update page title based on media
  useEffect(() => {
    if (media) {
      document.title = `Reelix | ${media.title || media.name}`;
    } else {
      document.title = "Reelix | Loading...";
    }
  }, [media]);

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

  return (
    <>
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
