import BrandSection from "@/components/pages/home/BrandSection";
import FeaturedSection from "@/components/pages/home/FeaturedSection";
import ReviewSection from "@/components/pages/home/ReviewSection";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const Home = () => {
    return (
        <div className=' text-center my-5'>
        <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2000&auto=format&fit=crop"
            alt="Medical Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Your Health, Our Priority</h1>
            <p className="text-xl mb-8">
              Get your medicines delivered to your doorstep with just a few clicks.
              Safe, reliable, and convenient.
            </p>
            <div className="relative bg-white rounded-full shadow-lg">
              <input
                type="text"
                placeholder="Search for medicines..."
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute  right-2 top-1/2 -translate-y-1/2 bg-black text-white p-3 rounded-full hover:bg-primary/90 transition-colors">
                <Search className="w-5 h-5 bg-black size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

            <BrandSection/>
            <FeaturedSection/>
            <ReviewSection/>
        </div>
    );
};
export default Home;
