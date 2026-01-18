export const metadata = {
  title: "Contact",
  description:
    "Have a question or feature request? Contact Reelix. We're here to help. Submit the form below and we'll get back to you as soon as possible.",
  keywords: ["contact", "support", "help", "feedback", "feature request"],
  alternates: {
    canonical: "https://reelix-2.vercel.app/contact",
  },
  openGraph: {
    title: "Contact | Reelix",
    description: "Have a question or feature request? Contact Reelix. We're here to help.",
    url: "https://reelix-2.vercel.app/contact",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
