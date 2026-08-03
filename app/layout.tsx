import type { Metadata } from "next";
import {
    Inter,
    Geist_Mono,
    Anton,
    Playfair_Display,
    Great_Vibes,
} from "next/font/google";
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
    "Elvora Media is a collective of specialists who help ambitious businesses grow with strategy, design, and performance under one roof.";

export const metadata: Metadata = {
    metadataBase: new URL("https://elvoramedia.org"),
    title: "Elvora Media",
    description: siteDescription,
    openGraph: {
        title: "Elvora Media",
        description: siteDescription,
        siteName: "Elvora Media",
        images: [
            {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt: "Elvora Media",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Elvora Media",
        description: siteDescription,
        images: ["/og.png"],
    },
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
            <body className="min-h-full flex flex-col font-sans">
                {children}
                <ElvoraCursor />
            </body>
        </html>
    );
}
