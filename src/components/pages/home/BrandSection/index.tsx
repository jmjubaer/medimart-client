/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import BrandFeatureCard from "./BrandFeatureCard";
import { brandFeatures } from "./brandData";

const BrandSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-3 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Why Customers Choose Us
          </h2>
          <p className="text-muted-foreground sm:text-lg max-w-2xl mx-auto">
            We're committed to providing the best pharmaceutical experience with premium service and uncompromising quality.
          </p>
        </div>

        <div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        >
          {brandFeatures.map((feature, index) => (
            <BrandFeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;