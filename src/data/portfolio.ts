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
  // Bridal - 2 real images + 2 placeholders
  {
    id: 1,
    category: "bridal",
    title: "Crystal Elegance",
    description: "Elegant low bun with stunning crystal headpiece",
    imageUrl: "/images/gallery/gallery_12.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 2,
    category: "bridal",
    title: "Garden Romance",
    description: "Romantic braided updo with delicate floral accents",
    imageUrl: "/images/gallery/gallery_13.JPG",
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
    id: 18,
    category: "bridal",
    title: "Bohemian Bride",
    description: "Effortless waves with natural makeup",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
    aspectRatio: "portrait"
  },
  // Quinceañera - 5 real images
  {
    id: 4,
    category: "quinceanera",
    title: "Royal Blue Dream",
    description: "Sparkling blue ball gown with elegant tiara",
    imageUrl: "/images/gallery/gallery_2.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 5,
    category: "quinceanera",
    title: "Golden Elegance",
    description: "Stunning blue and gold gown with dramatic glam makeup",
    imageUrl: "/images/gallery/gallery_3.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 6,
    category: "quinceanera",
    title: "Lavender Princess",
    description: "Dreamy lavender tulle gown with soft glam",
    imageUrl: "/images/gallery/gallery_4.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 7,
    category: "quinceanera",
    title: "Cascading Curls",
    description: "Beautiful half-up curls with golden tiara",
    imageUrl: "/images/gallery/gallery_6.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 20,
    category: "quinceanera",
    title: "Princess Curls",
    description: "Voluminous curls cascading with crown detail",
    imageUrl: "/images/gallery/gallery_7.JPG",
    aspectRatio: "portrait"
  },
  // Sweet 16 - placeholders (no real images yet)
  {
    id: 8,
    category: "sweet16",
    title: "Sweet & Sophisticated",
    description: "Fresh-faced beauty with soft waves",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 9,
    category: "sweet16",
    title: "Youthful Glam",
    description: "Age-appropriate sparkle and shine",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    aspectRatio: "portrait"
  },
  // Glam - 1 real image + 3 placeholders
  {
    id: 10,
    category: "glam",
    title: "Soft Glam Perfection",
    description: "Flawless dewy skin with soft smoky eyes",
    imageUrl: "/images/gallery/gallery_10.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 11,
    category: "glam",
    title: "Evening Elegance",
    description: "Smoky eyes with sculpted features",
    imageUrl: "https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=800&q=80",
    aspectRatio: "square"
  },
  {
    id: 12,
    category: "glam",
    title: "Bold & Beautiful",
    description: "Statement makeup with sleek hair",
    imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80",
    aspectRatio: "landscape"
  },
  {
    id: 19,
    category: "glam",
    title: "Gala Night",
    description: "Old Hollywood glamour reimagined",
    imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&q=80",
    aspectRatio: "portrait"
  },
  // Natural - 1 real image + 2 placeholders
  {
    id: 13,
    category: "natural",
    title: "Fresh & Radiant",
    description: "Beautiful natural glam with flawless skin",
    imageUrl: "/images/gallery/gallery_5.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 14,
    category: "natural",
    title: "Effortless Beauty",
    description: "Glowing skin with soft enhancement",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    aspectRatio: "portrait"
  },
  {
    id: 15,
    category: "natural",
    title: "Soft & Simple",
    description: "Natural waves with barely-there makeup",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
    aspectRatio: "square"
  },
  // Updos - 4 real images
  {
    id: 16,
    category: "updos",
    title: "Textured High Bun",
    description: "Elegant high updo with beautiful texture and soft tendrils",
    imageUrl: "/images/gallery/gallery_1.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 17,
    category: "updos",
    title: "Romantic Low Bun",
    description: "Soft romantic updo with delicate curls",
    imageUrl: "/images/gallery/gallery_8.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 21,
    category: "updos",
    title: "Braided Elegance",
    description: "Intricate braided updo with crystal flower pins",
    imageUrl: "/images/gallery/gallery_9.JPG",
    aspectRatio: "portrait"
  },
  {
    id: 22,
    category: "updos",
    title: "Classic Chignon",
    description: "Timeless low chignon with smooth finish",
    imageUrl: "/images/gallery/gallery_11.JPG",
    aspectRatio: "portrait"
  }
];

export const getPortfolioByCategory = (category: PortfolioCategory): PortfolioItem[] => {
  return portfolioItems.filter(item => item.category === category);
};
