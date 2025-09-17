import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedPlans from "@/components/FeaturedPlans";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <FeaturedPlans />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
