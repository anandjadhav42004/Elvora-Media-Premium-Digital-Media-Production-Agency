import type { Metadata } from "next";
import {
    Inter,
    Geist_Mono,
    Anton,
    Playfair_Display,
    Great_Vibes,
} from "next/font/google";
import Script from "next/script";
import { ElvoraCursor } from "@/components/ElvoraCursor";
import "./globals.css";

// TEMPORARY on-device diagnostic. The site errors only on real iOS WebKit
// (every iPhone, Safari + Chrome) and cannot be reproduced off-device, so this
// captures the real error/failed-resource/rejection and prints it on-screen so
// it can be screenshotted. Remove once the cause is identified.
const DIAG_SCRIPT = `
(function () {
  var D = (window.__ELVORA_DIAG__ = window.__ELVORA_DIAG__ || []);
  function box() {
    var id = "__elvora_diag_box__";
    var el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      el.setAttribute("style", "position:fixed;left:0;right:0;top:0;z-index:2147483647;background:#111;color:#8f8;font:11px/1.45 -apple-system,ui-monospace,monospace;padding:12px;white-space:pre-wrap;word-break:break-word;max-height:75vh;overflow:auto;border-bottom:3px solid #8f8");
      var add = function () { (document.body || document.documentElement).appendChild(el); };
      if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
    }
    return el;
  }
  function rec(label, msg) {
    if (!msg) return;
    if (String(msg).indexOf("_vercel/insights") > -1) return;
    D.push("[" + label + "] " + msg);
    try { box().textContent = "DIAGNOSTIC — screenshot this and send it:\\n\\n" + D.join("\\n\\n"); } catch (e) {}
  }
  window.addEventListener("error", function (e) {
    if (e && e.target && (e.target.tagName === "SCRIPT" || e.target.tagName === "LINK")) {
      rec("resource-failed", (e.target.src || e.target.href || "") + " (failed to load)");
      return;
    }
    var m = e && (e.message || (e.error && (e.error.stack || e.error.message)));
    rec("error", (m || "unknown") + (e && e.filename ? "  @ " + e.filename + ":" + e.lineno + ":" + e.colno : ""));
  }, true);
  window.addEventListener("unhandledrejection", function (e) {
    var r = e && e.reason; rec("promise", (r && (r.stack || r.message || r)) || "unknown");
  });
  var _ce = console.error;
  console.error = function () {
    try {
      var p = [];
      for (var i = 0; i < arguments.length; i++) { var a = arguments[i]; p.push(a && a.stack ? a.stack : (a && a.message ? a.message : String(a))); }
      rec("console", p.join(" "));
    } catch (_) {}
    return _ce.apply(console, arguments);
  };
})();
`;

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
    "Elvora Media is a collective of specialists who help ambitious businesses grow and strategy, design, and performance under one roof.";

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
                {process.env.NODE_ENV !== "production" && (
                    <Script
                        id="elvora-diag"
                        strategy="beforeInteractive"
                        dangerouslySetInnerHTML={{ __html: DIAG_SCRIPT }}
                    />
                )}
                {children}
                <ElvoraCursor />
            </body>
        </html>
    );
}
