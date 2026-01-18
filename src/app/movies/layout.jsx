import Script from "next/script";

export const metadata = {
  title: "Movies",
  description:
    "Browse and discover the latest movies with Reelix. Filter by genre, year, and country. Search for your favorite films and explore detailed information including trailers, cast, ratings, and more.",
  keywords: ["movies", "film database", "movie search", "movie filters", "movie ratings", "movie trailers"],
  alternates: {
    canonical: "https://reelix-2.vercel.app/movies",
  },
  openGraph: {
    title: "Movies | Reelix",
    description:
      "Browse and discover the latest movies with Reelix. Filter by genre, year, and country. Search for your favorite films.",
    url: "https://reelix-2.vercel.app/movies",
    type: "website",
  },
};

export default function MoviesLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Movies",
    description:
      "Browse and discover the latest movies with Reelix. Filter by genre, year, and country.",
    url: "https://reelix-2.vercel.app/movies",
    mainEntity: {
      "@type": "ItemList",
      name: "Movies Collection",
    },
  };

  return (
    <>
      <Script
        id="movies-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
