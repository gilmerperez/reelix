import { fetchMediaDetails } from "../../../utils/api";

export async function generateMetadata({ params }) {
  const { id } = params;
  const BASE_URL = "https://reelix-2.vercel.app";

  try {
    const media = await fetchMediaDetails("movie", id);

    if (!media) {
      return {
        title: "Movie Not Found",
        description: "The requested movie could not be found.",
        alternates: {
          canonical: `${BASE_URL}/movie/${id}`,
        },
      };
    }

    const title = media.title || "Movie";
    const description = media.overview || `Discover ${title} on Reelix. View details, trailers, cast, and ratings.`;
    const posterUrl = media.poster_path
      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
      : `${BASE_URL}/favicon.png`;

    return {
      title: title,
      description: description,
      keywords: [
        title,
        "movie",
        "film",
        ...(media.genres || []),
        media.country || "",
        "trailer",
        "cast",
        "ratings",
      ].filter(Boolean),
      alternates: {
        canonical: `${BASE_URL}/movie/${id}`,
      },
      openGraph: {
        title: `${title} | Reelix`,
        description: description,
        url: `${BASE_URL}/movie/${id}`,
        type: "video.movie",
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
    console.error("Error generating metadata for movie:", error);
    return {
      title: "Movie",
      description: "Discover movies on Reelix.",
      alternates: {
        canonical: `${BASE_URL}/movie/${id}`,
      },
    };
  }
}

export default function MovieDetailLayout({ children }) {
  return <>{children}</>;
}
