"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { ClientMarquee } from "@/components/ClientMarquee";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { CustomPlanBuilder } from "@/components/CustomPlanBuilder";
import { TeamAccordion } from "@/components/TeamAccordion";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { InquiryModal } from "@/components/InquiryModal";

export default function Home() {
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    const handleOpenInquiry = () => setIsInquiryOpen(true);
    const handleCloseInquiry = () => setIsInquiryOpen(false);

    return (
        <>
            <Header onOpenInquiry={handleOpenInquiry} />
            <main className="flex-1">
                <Hero onOpenInquiry={handleOpenInquiry} />
                <ClientMarquee />
                <ServicesShowcase />
                <CaseStudies />
                <Testimonials />
                <Pricing />
                <CustomPlanBuilder />

                <section id="team">
                    <Container className="py-12 sm:py-16">
                        <TeamAccordion />
                    </Container>
                </section>
            </main>
            <Footer />
            <FloatingCTA />
            <InquiryModal isOpen={isInquiryOpen} onClose={handleCloseInquiry} />
        </>
    );
}




