import "../styles/globals.css";
import Script from "next/script";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://reelix-2.vercel.app"),
  title: {
    default: "Reelix | Explore The Latest Movies & TV Shows",
    template: "%s | Reelix",
  },
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
  creator: "Gilmer Perez",
  publisher: "Reelix",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Reelix | Explore The Latest Movies & TV Shows",
    description:
      "Discover movies and TV shows with Reelix — your go-to platform for exploring the latest releases, trailers, ratings, and detailed metadata.",
    type: "website",
    url: "https://reelix-2.vercel.app",
    siteName: "Reelix",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Reelix Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reelix | Explore The Latest Movies & TV Shows",
    description:
      "Discover movies and TV shows with Reelix — your go-to platform for exploring the latest releases, trailers, ratings, and detailed metadata.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification code if available
    google: "3FTfHaZrjPjKogJbOTyhOila5U11Fj2l512M51iBOH0",
  },
  alternates: {
    canonical: "https://reelix-2.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${bebasNeue.variable} ${montserrat.variable}`}>
          <Script src="https://kit.fontawesome.com/ffb8948ab7.js" crossOrigin="anonymous" strategy="afterInteractive" />
          <Header />
          {children}
          <Footer />
          <Analytics />
        </body>
      </html>
    </>
  );
}
