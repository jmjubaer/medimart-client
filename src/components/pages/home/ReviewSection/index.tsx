"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { reviews } from "./reviews";
import Marquee from "react-fast-marquee";

const ReviewSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our Customers Say
        </h2>
      </div>

      {/* Full width marquee outside the container */}
      <Marquee pauseOnHover gradient={false} speed={50}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-md w-80 mx-4"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                <Image
                  src={`https://i.pravatar.cc/150?img=${review.image}`}
                  alt="Customer"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold">{review.name}</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.description}</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ReviewSection;
