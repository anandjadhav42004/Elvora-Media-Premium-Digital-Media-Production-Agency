import Link from "next/link";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-[#faf7f0] text-deep-black">
            <Header />
            <main className="flex flex-1 items-center justify-center py-20 sm:py-32">
                <Container className="flex flex-col items-center text-center">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-luxury-gold">
                        404 &middot; Page Not Found
                    </span>
                    <h1 className="mt-4 font-display text-6xl font-bold uppercase tracking-tight text-deep-black sm:text-8xl">
                        Lost In <span className="text-luxury-gold">Space?</span>
                    </h1>
                    <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-neutral-800 font-medium sm:text-lg">
                        The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track to elevate your brand.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="rounded-full bg-deep-black px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-ivory-cream transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold sm:text-sm"
                        >
                            &larr; Back to Home
                        </Link>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-luxury-gold/50 bg-white/80 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-deep-black transition-all duration-300 hover:border-luxury-gold hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-luxury-gold sm:text-sm"
                        >
                            Contact Us on WhatsApp &rarr;
                        </a>
                    </div>
                </Container>
            </main>
            <Footer />
        </div>
    );
}
