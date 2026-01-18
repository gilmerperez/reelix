import Script from "next/script";

export const metadata = {
  title: "Top IMDB",
  description:
    "Explore the highest-rated movies on IMDB with Reelix. Discover top-rated films with detailed information including ratings, trailers, cast, and more.",
  keywords: ["top movies", "IMDB ratings", "highest rated movies", "best movies", "top rated films", "IMDB top"],
  alternates: {
    canonical: "https://reelix-2.vercel.app/top-imdb",
  },
  openGraph: {
    title: "Top IMDB | Reelix",
    description: "Explore the highest-rated movies on IMDB with Reelix. Discover top-rated films.",
    url: "https://reelix-2.vercel.app/top-imdb",
    type: "website",
  },
};

export default function TopIMDBLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Top IMDB Movies",
    description: "Explore the highest-rated movies on IMDB with Reelix.",
    url: "https://reelix-2.vercel.app/top-imdb",
    mainEntity: {
      "@type": "ItemList",
      name: "Top Rated Movies",
    },
  };

  return (
    <>
      <Script
        id="top-imdb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
