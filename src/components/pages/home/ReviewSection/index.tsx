"use client";
import { Star } from "lucide-react";
import Image from "next/image";
const ReviewSection = () => {
    return    <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((review) => (
          <div key={review} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                <Image
                  src={`https://i.pravatar.cc/150?img=${review}`}
                  alt="Customer"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Great service and fast delivery. The medicines were well
              packaged and arrived on time. Will definitely order again!"
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>;
};

export default ReviewSection;
