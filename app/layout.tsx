import type { Metadata, Viewport } from "next";
import {
    Inter,
    Geist_Mono,
    Anton,
    Playfair_Display,
    Great_Vibes,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ElvoraCursor } from "@/components/ElvoraCursor";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const anton = Anton({
    variable: "--font-anton",
    subsets: ["latin"],
    weight: "400",
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
    variable: "--font-great-vibes",
    subsets: ["latin"],
    weight: "400",
});

const siteDescription =
    "Elvora Media is a collective of specialists who help ambitious businesses grow with strategy, design, commercial video production, and performance marketing under one roof.";

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#faf7f0" },
        { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
    ],
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://elvoramedia.org"),
    title: {
        default: "Elvora Media - Premium Digital Media & Production Agency",
        template: "%s | Elvora Media",
    },
    description: siteDescription,
    keywords: [
        "Digital Media Agency",
        "Commercial Video Production",
        "Brand Strategy",
        "Performance Marketing",
        "Instagram Reels Production",
        "Luxury Branding",
        "Creative Production Agency",
        "Elvora Media",
    ],
    authors: [{ name: "Elvora Media Team" }, { name: "Anand Jadhav" }],
    creator: "Elvora Media",
    publisher: "Elvora Media",
    icons: {
        icon: [
            { url: "/icon.png", type: "image/png" },
            { url: "/favicon.ico", sizes: "any" },
        ],
        apple: [{ url: "/icon.png" }],
    },
    openGraph: {
        title: "Elvora Media - Premium Digital Media & Production Agency",
        description: siteDescription,
        siteName: "Elvora Media",
        url: "https://elvoramedia.org",
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "Elvora Media Digital Production Agency",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Elvora Media - Premium Digital Media & Production Agency",
        description: siteDescription,
        images: ["/og.png"],
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
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://elvoramedia.org/#organization",
            name: "Elvora Media",
            url: "https://elvoramedia.org",
            logo: "https://elvoramedia.org/logo.png",
            sameAs: [
                "https://www.instagram.com/elvoramediaofficial",
                "https://www.linkedin.com/company/elvora-media-pvt-ltd/",
                "https://www.facebook.com/share/17sZckUKMU/",
            ],
            description: siteDescription,
        },
        {
            "@type": "ProfessionalService",
            "@id": "https://elvoramedia.org/#service",
            name: "Elvora Media - Digital Production & Media Agency",
            url: "https://elvoramedia.org",
            priceRange: "$$$",
            image: "https://elvoramedia.org/og.png",
            address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
            },
            knowsAbout: [
                "Brand Strategy",
                "Commercial Video Production",
                "Social Media Management",
                "Performance Ads",
                "Content Creation",
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${geistMono.variable} ${anton.variable} ${playfair.variable} ${greatVibes.variable} h-full antialiased`}
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="min-h-full flex flex-col font-sans">
                {children}
                <ElvoraCursor />
                <Analytics />
            </body>
        </html>
    );
}

