import Script from "next/script";

export const metadata = {
  title: "TV Shows",
  description:
    "Browse and discover the latest TV shows with Reelix. Filter by genre, year, and country. Search for your favorite series and explore detailed information including trailers, cast, ratings, and more.",
  keywords: ["TV shows", "television", "TV series", "TV database", "TV search", "TV filters", "TV ratings"],
  alternates: {
    canonical: "https://reelix-2.vercel.app/tv-shows",
  },
  openGraph: {
    title: "TV Shows | Reelix",
    description:
      "Browse and discover the latest TV shows with Reelix. Filter by genre, year, and country. Search for your favorite series.",
    url: "https://reelix-2.vercel.app/tv-shows",
    type: "website",
  },
};

export default function TVShowsLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TV Shows",
    description:
      "Browse and discover the latest TV shows with Reelix. Filter by genre, year, and country.",
    url: "https://reelix-2.vercel.app/tv-shows",
    mainEntity: {
      "@type": "ItemList",
      name: "TV Shows Collection",
    },
  };

  return (
    <>
      <Script
        id="tv-shows-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
