import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import WhyStats from "@/components/WhyStats";
import ExpertiseGrid from "@/components/ExpertiseGrid";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LogoMarquee />
        <WhyStats />
        <ExpertiseGrid />
        <Testimonials />
        <FAQ />
        <LeadForm />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
