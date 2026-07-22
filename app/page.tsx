import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { ClientMarquee } from "@/components/ClientMarquee";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { CaseStudies } from "@/components/CaseStudies";
import { ScopeEstimator } from "@/components/ScopeEstimator";
import { TeamAccordion } from "@/components/TeamAccordion";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex-1">
                <Hero />
                <ClientMarquee />
                <ServicesShowcase />
                <CaseStudies />
                <ScopeEstimator />

                <section id="team">
                    <Container className="py-12 sm:py-16">
                        <TeamAccordion />
                    </Container>
                </section>
            </main>
            <Footer />
        </>
    );
}



