export type PortfolioCategory = "bridal" | "quinceanera" | "sweet16" | "glam" | "natural" | "updos";

export interface PortfolioItem {
  id: number;
  category: PortfolioCategory;
  title: string;
  description: string;
  imageUrl: string;
  aspectRatio: "portrait" | "landscape" | "square";
}

export const portfolioCategories: { id: PortfolioCategory; label: string }[] = [
  { id: "bridal", label: "Bridal" },
  { id: "quinceanera", label: "Quinceañera" },
  { id: "sweet16", label: "Sweet 16" },
  { id: "glam", label: "Glam" },
  { id: "natural", label: "Natural" },
  { id: "updos", label: "Updos" },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: "bridal",
    title: "Classic Bridal Elegance",
    description: "Soft romantic waves with natural glam makeup",
    imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 2,
    category: "bridal",
    title: "Modern Bride",
    description: "Sleek updo with sophisticated makeup",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 3,
    category: "bridal",
    title: "Garden Wedding Look",
    description: "Soft curls with dewy skin finish",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: 4,
    category: "quinceanera",
    title: "Princess Moment",
    description: "Glamorous waves with dramatic eyes",
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 5,
    category: "quinceanera",
    title: "Elegant Quinceañera",
    description: "Sophisticated updo with soft glam",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: 6,
    category: "quinceanera",
    title: "Royal Celebration",
    description: "Half-up style with full glam makeup",
    imageUrl: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 7,
    category: "sweet16",
    title: "Sweet & Sophisticated",
    description: "Fresh-faced beauty with soft waves",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 8,
    category: "sweet16",
    title: "Youthful Glam",
    description: "Age-appropriate sparkle and shine",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 9,
    category: "glam",
    title: "Red Carpet Ready",
    description: "Full glam with dramatic lashes",
    imageUrl: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 10,
    category: "glam",
    title: "Evening Elegance",
    description: "Smoky eyes with sculpted features",
    imageUrl: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: 11,
    category: "glam",
    title: "Bold & Beautiful",
    description: "Statement makeup with sleek hair",
    imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80",
    aspectRatio: "landscape"
  },
  {
    id: 12,
    category: "natural",
    title: "Effortless Beauty",
    description: "Glowing skin with soft enhancement",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 13,
    category: "natural",
    title: "Fresh & Radiant",
    description: "Minimal makeup, maximum glow",
    imageUrl: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 14,
    category: "natural",
    title: "Soft & Simple",
    description: "Natural waves with barely-there makeup",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: 15,
    category: "updos",
    title: "Classic Chignon",
    description: "Timeless elegance in every strand",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 16,
    category: "updos",
    title: "Romantic Updo",
    description: "Soft, romantic styling with loose tendrils",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 17,
    category: "updos",
    title: "Modern Twist",
    description: "Contemporary updo with clean lines",
    imageUrl: "https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?w=800&q=80",
    aspectRatio: "landscape"
  },
  {
    id: 18,
    category: "bridal",
    title: "Bohemian Bride",
    description: "Effortless waves with natural makeup",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 19,
    category: "glam",
    title: "Gala Night",
    description: "Old Hollywood glamour reimagined",
    imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 20,
    category: "quinceanera",
    title: "Dream Come True",
    description: "Fairytale styling for your special day",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    aspectRatio: "square"
  }
];

export const getPortfolioByCategory = (category: PortfolioCategory): PortfolioItem[] => {
  return portfolioItems.filter(item => item.category === category);
};
