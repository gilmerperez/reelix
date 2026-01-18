export const metadata = {
  title: "Terms of Service",
  description:
    "Reelix Terms of Service - These terms of service govern your use of this website. By accessing or using this site, you agree to these terms.",
  keywords: ["terms of service", "terms", "legal", "user agreement"],
  alternates: {
    canonical: "https://reelix-2.vercel.app/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Reelix",
    description: "Reelix Terms of Service - These terms of service govern your use of this website.",
    url: "https://reelix-2.vercel.app/terms-of-service",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServiceLayout({ children }) {
  return <>{children}</>;
}
