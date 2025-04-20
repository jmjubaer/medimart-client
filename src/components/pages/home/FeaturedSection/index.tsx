"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Tag } from "lucide-react";
import { featuredMedicines } from "./featuredMedicines";

const FeaturedSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Featured Medicines
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover our carefully selected range of premium medicines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={
                "group relative bg-card rounded-2xl p-4 cursor-pointer border-gray-300 " +
                "border border-border/50 hover:border-primary/50 " +
                "transition-all duration-300 hover:shadow-lg"
              }
              onMouseEnter={() => setHoveredId(medicine.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {medicine.discount && (
                <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {medicine.discount}% OFF
                </div>
              )}
              
              <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-tight">
                  {medicine.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {medicine.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {medicine.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">•</span>
                  <span className="text-sm text-muted-foreground">In Stock</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold">${medicine.price}</span>
                  {medicine.discount && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${(medicine.price * (1 + medicine.discount / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={
                  "absolute inset-0 bg-primary/5 rounded-2xl opacity-0 transition-opacity duration-300 " +
                  (hoveredId === medicine.id ? "opacity-100" : "")
                }
              />
            </motion.div>
          ))}
        </div>

        <button className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors">
          View All Products
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedSection;
