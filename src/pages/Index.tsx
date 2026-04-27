import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Services from "@/components/landing/Services";
import SocialProof from "@/components/landing/SocialProof";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Urgency from "@/components/landing/Urgency";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <Problem />
    <Solution />
    <Services />
    <SocialProof />
    <HowItWorks />
    <Pricing />
    <Urgency />
    <FAQ />
    <CTASection />
    <Footer />
  </main>
);

export default Index;
