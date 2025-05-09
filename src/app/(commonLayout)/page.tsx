import Banner from "@/components/pages/home/BannerSection/Banner";
import BrandSection from "@/components/pages/home/BrandSection";
import ContactUs from "@/components/pages/home/ContactUs";
import FAQSection from "@/components/pages/home/FAQ";
import FeaturedSection from "@/components/pages/home/FeaturedSection";
import HealthInstrumentSection from "@/components/pages/home/HealthInstrument";
import ReviewSection from "@/components/pages/home/ReviewSection";
import React from "react";

const Home = () => {
    return (
        <div className=' text-center mb-5'>
            <Banner />
            <BrandSection />
            <FeaturedSection />
            <HealthInstrumentSection />
            <FAQSection/>
            <ReviewSection />
            <ContactUs />
        </div>
    );
};
export default Home;
