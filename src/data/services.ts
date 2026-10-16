import { Crown, Heart, Sparkles, Star, Sun, Users, Wind, type LucideIcon } from "lucide-react";

// Copy (title, descriptions, includes, add-on names) lives in messages under `data.services.<id>`.
export interface Service {
  id: string;
  icon: LucideIcon;
  image: string;
  startingPrice: number;
  // Index-aligned with `data.services.<id>.addOns` in messages.
  addOnPrices?: number[];
}

export const services: Service[] = [
  {
    id: "bridal-hair-makeup",
    icon: Crown,
    image: "/images/gallery/gallery_12.JPG",
    startingPrice: 525,
    addOnPrices: [150, 175, 75],
  },
  {
    id: "quinceanera-glam",
    icon: Sparkles,
    image: "/images/gallery/gallery_2.JPG",
    startingPrice: 425,
    addOnPrices: [145, 125, 150, 25],
  },
  {
    id: "sweet-16",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1763959952707-7f4b2c3c2219?w=1200&q=80",
    startingPrice: 385,
    addOnPrices: [145, 100, 150],
  },
  {
    id: "event-hair",
    icon: Wind,
    image: "/images/gallery/gallery_1.JPG",
    startingPrice: 125,
  },
  {
    id: "soft-glam",
    icon: Sun,
    image: "/images/gallery/gallery_5.JPG",
    startingPrice: 95,
  },
  {
    id: "full-glam",
    icon: Star,
    image: "/images/gallery/gallery_10.JPG",
    startingPrice: 165,
  },
  {
    id: "group-booking",
    icon: Users,
    image: "https://images.unsplash.com/photo-1638959882708-9503b1cd595f?w=1200&q=80",
    startingPrice: 400,
  },
];
