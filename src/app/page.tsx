import BrandSection from "@/components/pages/home/BrandSection";
import FeaturedSection from "@/components/pages/home/FeaturedSection";
import ReviewSection from "@/components/pages/home/ReviewSection";
import React from "react";

const Home = () => {
    return (
        <div className='container text-center my-5'>
            This is home page

            <BrandSection/>
            <FeaturedSection/>
            <ReviewSection/>
        </div>
    );
};
export default Home;
