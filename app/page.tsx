import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import WhyStats from "@/components/WhyStats";
import Services from "@/components/Services";
import FeaturePairs from "@/components/FeaturePairs";
import Process from "@/components/Process";
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
        <Services />
        <FeaturePairs />
        <Process />
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
