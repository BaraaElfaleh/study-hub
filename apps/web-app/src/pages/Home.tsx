// pages/Home.jsx
import {Navbar} from "../components/Navbar"; 
import HeroSection from "../components/HeroSection";
import CardsSection from "../components/CardsSection";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#050530]">
      <Navbar />
      <HeroSection />
      <CardsSection />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;