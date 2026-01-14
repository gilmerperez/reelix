import "../styles/globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Bebas_Neue, Montserrat } from "next/font/google";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Reelix | Explore The Latest Movies & TV Shows",
  description:
    "Discover movies and TV shows with Reelix — your go-to platform for exploring the latest releases, trailers, ratings, and detailed metadata. Designed as a modern, fully responsive media discovery app.",
  keywords: [
    "movies",
    "TV shows",
    "entertainment",
    "movie database",
    "TV database",
    "trailers",
    "ratings",
    "IMDB",
    "film discovery",
    "streaming",
    "media",
  ],
  authors: [{ name: "Gilmer Perez" }],
  openGraph: {
    title: "Reelix | Explore The Latest Movies & TV Shows",
    description:
      "Discover movies and TV shows with Reelix — your go-to platform for exploring the latest releases, trailers, ratings, and detailed metadata.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${bebasNeue.variable} ${montserrat.variable}`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
