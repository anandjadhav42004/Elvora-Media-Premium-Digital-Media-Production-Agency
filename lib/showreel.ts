/**
 * EDIT YOUR SHOWREEL VIDEO URL HERE
 * 
 * Supports:
 * - YouTube watch links: https://www.youtube.com/watch?v=VIDEO_ID
 * - YouTube shorts / shortened links: https://youtu.be/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
 * - YouTube embed links: https://www.youtube.com/embed/VIDEO_ID
 * - Vimeo links: https://vimeo.com/VIDEO_ID
 * - Instagram reel links: https://www.instagram.com/reel/REEL_ID/
 */
export const SHOWREEL_VIDEO_URL = "https://www.instagram.com/reel/DahfOSDoMzq/";

/**
 * Converts any standard video URL (YouTube, Vimeo, Instagram Reel) into a proper embeddable iframe URL.
 */
export function getEmbedUrl(rawUrl: string): string {
    if (!rawUrl) return "";

    try {
        const url = new URL(rawUrl.trim());

        // Instagram Reels
        if (url.hostname.includes("instagram.com")) {
            const pathParts = url.pathname.split("/").filter(Boolean);
            if (pathParts[0] === "reel" || pathParts[0] === "p") {
                const mediaId = pathParts[1];
                return `https://www.instagram.com/${pathParts[0]}/${mediaId}/embed/`;
            }
        }

        // YouTube: youtu.be/VIDEO_ID
        if (url.hostname.includes("youtu.be")) {
            const videoId = url.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
        }

        // YouTube: youtube.com/watch?v=VIDEO_ID or /shorts/VIDEO_ID or /embed/VIDEO_ID
        if (url.hostname.includes("youtube.com") || url.hostname.includes("youtube-nocookie.com")) {
            if (url.pathname.includes("/shorts/")) {
                const videoId = url.pathname.split("/shorts/")[1]?.split("/")[0];
                return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
            }
            if (url.pathname.includes("/embed/")) {
                return rawUrl.includes("autoplay=") ? rawUrl : `${rawUrl}?autoplay=1&mute=0`;
            }
            const videoId = url.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
            }
        }

        // Vimeo: vimeo.com/VIDEO_ID
        if (url.hostname.includes("vimeo.com")) {
            const videoId = url.pathname.split("/").filter(Boolean)[0];
            return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }

        return rawUrl;
    } catch {
        return rawUrl;
    }
}
