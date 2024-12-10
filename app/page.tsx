import { FeaturesSectionDemo } from "@/components/Features";
import HeroScroll from "@/components/HeroScroll";
import { StickyScrollReveal } from "@/components/ScrollableSticky";
import AppbarLanding from "@/components/AppbarLanding";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <div>
       <AppbarLanding/>
        {/* HEro */}
        <Hero/>
        <HeroScroll/>
        {/* Features Sectionm */}
        <div className="p-1 px-3">
            {/* Headinggg */}
        </div>
        <StickyScrollReveal/>
        <FeaturesSectionDemo/>
        <Footer/>
    </div>
  );
}
