import Banner from "@/components/pages/home/BannerSection/Banner";
import BrandSection from "@/components/pages/home/BrandSection";
import FeaturedSection from "@/components/pages/home/FeaturedSection";
import ReviewSection from "@/components/pages/home/ReviewSection";
import React from "react";

const Home = () => {

    return (
        <div className=' text-center mb-5'>
       
            <Banner/>
            <BrandSection/>
            <FeaturedSection/>
            <ReviewSection/>
        </div>
    );
};
export default Home;
