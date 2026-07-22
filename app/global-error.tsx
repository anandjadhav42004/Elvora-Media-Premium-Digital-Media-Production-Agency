"use client";

import { useState } from "react";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

// Replaces Next.js's bare default "This page couldn't load" screen when an
// uncaught error bubbles to the root. It must render its own <html>/<body>.
// TEMPORARY: also prints the real error so it can be screenshotted on the
// affected iPhone (Next hides the message in production, so the useful text
// comes from window.__ELVORA_DIAG__, captured by the script in layout.tsx).
export default function GlobalError({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry?: () => void;
}) {
    const [diag] = useState(() => {
        if (typeof window === "undefined") return "";
        const parts: string[] = [];
        if (error?.message) parts.push("message: " + error.message);
        if (error?.digest) parts.push("digest: " + error.digest);
        if (error?.stack) parts.push("stack: " + error.stack);
        const w = window as unknown as { __ELVORA_DIAG__?: string[] };
        if (w.__ELVORA_DIAG__?.length) {
            parts.push("captured:\n" + w.__ELVORA_DIAG__.join("\n"));
        }
        parts.push("ua: " + navigator.userAgent);
        return parts.join("\n\n");
    });

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    background: "#faf7f0",
                    color: "#000000",
                    fontFamily:
                        "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
                }}
            >
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                        textAlign: "center",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            fontSize: "12px",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#b58c56",
                            fontWeight: 600,
                        }}
                    >
                        Elvora Media
                    </div>
                    <h1 style={{ margin: "16px 0 10px", fontSize: "24px" }}>
                        Something went wrong
                    </h1>
                    <p
                        style={{
                            margin: 0,
                            maxWidth: "28rem",
                            color: "#655d62",
                            lineHeight: 1.6,
                        }}
                    >
                        Please reload the page, or reach us directly and
                        we&rsquo;ll take care of you.
                    </p>
                    <div
                        style={{
                            marginTop: "24px",
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                unstable_retry
                                    ? unstable_retry()
                                    : window.location.reload()
                            }
                            style={{
                                background: "#000000",
                                color: "#faeee0",
                                border: "none",
                                borderRadius: "100px",
                                padding: "12px 30px",
                                fontSize: "15px",
                                cursor: "pointer",
                            }}
                        >
                            Reload
                        </button>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                border: "1px solid #00000022",
                                borderRadius: "100px",
                                padding: "12px 30px",
                                fontSize: "15px",
                                color: "#000000",
                                textDecoration: "none",
                            }}
                        >
                            Contact us
                        </a>
                    </div>

                    {process.env.NODE_ENV !== "production" && diag && (
                        <pre
                            style={{
                                marginTop: "28px",
                                maxWidth: "92vw",
                                overflow: "auto",
                                textAlign: "left",
                                background: "#111111",
                                color: "#88ff88",
                                borderRadius: "12px",
                                padding: "12px",
                                fontSize: "11px",
                                lineHeight: 1.5,
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            {"DIAGNOSTIC — screenshot this and send it:\n\n" +
                                diag}
                        </pre>
                    )}
                </div>
            </body>
        </html>
    );
}
