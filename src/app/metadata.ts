// file location: src/app/metadata.ts
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smart-attendance.vercel.app";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Smart Class Attendance & Participation Tracker",
      template: "%s | Smart Attendance",
    },
    description:
      "An intelligent class attendance and participation tracking system powered by facial recognition. Designed for modern classrooms, this platform automates attendance, analyzes engagement, and provides real-time insights.",
    keywords: [
      "smart attendance",
      "facial recognition attendance",
      "classroom AI",
      "education analytics",
      "student participation tracker",
      "Edge Impulse attendance",
      "school automation",
      "attendance export",
    ],
    authors: [{ name: "Smart Attendance Team" }],
    creator: "Smart Attendance Project",
    publisher: "TheHuye.com",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "Smart Attendance",
      title: "Smart Class Attendance & Participation Tracker",
      description:
        "An intelligent class attendance and participation tracking system powered by facial recognition. Automate roll calls, track student engagement, and export analytics in Excel format.",
      images: [
        {
          url: `${siteUrl}/images/site-preview.png`,
          width: 1200,
          height: 630,
          alt: "Smart Attendance - Track Class Attendance with AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Smart Class Attendance & Participation Tracker",
      description:
        "Track class attendance and participation using AI-powered facial recognition. Export real-time data and improve classroom efficiency.",
      images: [`${siteUrl}/images/site-preview.png`],
      creator: "@SmartAttendanceAI",
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
    icons: {
      icon: [
        { url: "/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/images/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      other: [{ rel: "mask-icon", url: "/images/favicons/safari-pinned-tab.svg", color: "#8b5cf6" }],
    },
    manifest: "/images/favicons/site.webmanifest",
  };
}
