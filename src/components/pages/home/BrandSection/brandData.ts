import { DivideIcon as LucideIcon, ShoppingCart, Star, TrendingUp, Clock, Shield, HeartPulse } from "lucide-react";

export type IconType = typeof LucideIcon;

export interface BrandFeature {
  id: string;
  icon: IconType;
  title: string;
  description: string;
}

export const brandFeatures: BrandFeature[] = [
  {
    id: "wide-selection",
    icon: TrendingUp,
    title: "Extensive Selection",
    description: "Access thousands of medications from trusted global and local pharmaceutical manufacturers.",
  },
  {
    id: "fast-delivery",
    icon: Clock, 
    title: "Same-Day Delivery",
    description: "Get your essential medications delivered to your doorstep within hours when you need them most.",
  },
  {
    id: "quality-assured",
    icon: Shield,
    title: "Premium Quality",
    description: "Every medication undergoes rigorous quality checks and verification before reaching you.",
  },
  {
    id: "personal-care",
    icon: HeartPulse,
    title: "Personalized Care",
    description: "Our pharmacists provide customized guidance and support for your specific health needs.",
  },
  {
    id: "shopping-experience",
    icon: ShoppingCart,
    title: "Seamless Experience",
    description: "Enjoy a convenient shopping experience with easy ordering and automatic refill options.",
  },
  {
    id: "customer-satisfaction",
    icon: Star,
    title: "98% Satisfaction",
    description: "Join thousands of satisfied customers who trust us with their pharmaceutical needs.",
  }
];