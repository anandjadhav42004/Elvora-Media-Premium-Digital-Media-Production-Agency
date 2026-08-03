import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Elvora Media - Premium Digital Media & Branding Agency",
        short_name: "Elvora Media",
        description:
            "Elvora Media is a collective of specialists who help ambitious businesses grow with strategy, design, commercial video production, and performance marketing.",
        start_url: "/",
        display: "standalone",
        background_color: "#faf7f0",
        theme_color: "#0f0f0f",
        icons: [
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
