"use client";

import { useState } from "react";
import { IconType } from "./brandData";
import { motion } from "framer-motion";

interface BrandFeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  index: number;
}

const BrandFeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
}: BrandFeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * index,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={
        "group relative p-4 sm:p-8 rounded-2xl transition-all duration-300 border-gray-300" +
        "bg-card border border-border/40 shadow-sm hover:shadow-md border-gray-300 " +
        "hover:border-primary/20 overflow-hidden"
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 " +
          "from-primary/5 to-transparent " +
          (isHovered ? "opacity-100" : "opacity-0")
        }
      />

      <div className="relative z-10">
        <div
          className={
            "h-14 w-14 rounded-2xl flex items-center  mx-auto  justify-center mb-3 sm:mb-6 border-gray-300" +
            "bg-primary/10 text-primary transition-all duration-300 " +
            "group-hover:bg-primary/15 group-hover:scale-105"
          }
        >
          <Icon className="w-7 h-7 " />
        </div>

        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default BrandFeatureCard;
