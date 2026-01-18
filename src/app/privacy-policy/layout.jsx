export const metadata = {
  title: "Privacy Policy",
  description:
    "Reelix Privacy Policy - Your privacy is important to us. This privacy policy outlines what information we do and do not collect when you use this website.",
  keywords: ["privacy policy", "privacy", "data protection", "user privacy"],
  alternates: {
    canonical: "https://reelix-2.vercel.app/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Reelix",
    description: "Reelix Privacy Policy - Your privacy is important to us.",
    url: "https://reelix-2.vercel.app/privacy-policy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({ children }) {
  return <>{children}</>;
}
