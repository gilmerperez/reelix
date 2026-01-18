import { fetchMediaDetails } from "../../../utils/api";

export async function generateMetadata({ params }) {
  const { id } = params;
  const BASE_URL = "https://reelix-2.vercel.app";

  try {
    const media = await fetchMediaDetails("tv", id);

    if (!media) {
      return {
        title: "TV Show Not Found",
        description: "The requested TV show could not be found.",
        alternates: {
          canonical: `${BASE_URL}/tv-show/${id}`,
        },
      };
    }

    const title = media.title || "TV Show";
    const description = media.overview || `Discover ${title} on Reelix. View details, trailers, cast, and ratings.`;
    const posterUrl = media.poster_path
      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
      : `${BASE_URL}/favicon.png`;

    return {
      title: title,
      description: description,
      keywords: [
        title,
        "TV show",
        "television",
        "series",
        ...(media.genres || []),
        media.country || "",
        "trailer",
        "cast",
        "ratings",
      ].filter(Boolean),
      alternates: {
        canonical: `${BASE_URL}/tv-show/${id}`,
      },
      openGraph: {
        title: `${title} | Reelix`,
        description: description,
        url: `${BASE_URL}/tv-show/${id}`,
        type: "video.tv_show",
        images: [
          {
            url: posterUrl,
            width: 500,
            height: 750,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Reelix`,
        description: description,
        images: [posterUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for TV show:", error);
    return {
      title: "TV Show",
      description: "Discover TV shows on Reelix.",
      alternates: {
        canonical: `${BASE_URL}/tv-show/${id}`,
      },
    };
  }
}

export default function TVShowDetailLayout({ children }) {
  return <>{children}</>;
}
