export type PortfolioCategory = "bridal" | "quinceanera" | "sweet16" | "glam" | "natural" | "updos";

// Copy (title, description) lives in messages under `data.portfolio.items.<id>`.
export interface PortfolioItem {
  id: number;
  category: PortfolioCategory;
  imageUrl: string;
}

export const portfolioCategories: PortfolioCategory[] = [
  "bridal",
  "quinceanera",
  "sweet16",
  "glam",
  "natural",
  "updos",
];

export const portfolioItems: PortfolioItem[] = [
  { id: 1, category: "bridal", imageUrl: "/images/gallery/gallery_12.JPG" },
  { id: 2, category: "bridal", imageUrl: "/images/gallery/gallery_13.JPG" },
  { id: 3, category: "bridal", imageUrl: "https://images.unsplash.com/photo-1549236177-77e8271c34b6?w=1200&q=80" },
  { id: 18, category: "bridal", imageUrl: "https://images.unsplash.com/photo-1643216583837-f6d664d48eac?w=1200&q=80" },
  { id: 4, category: "quinceanera", imageUrl: "/images/gallery/gallery_2.JPG" },
  { id: 5, category: "quinceanera", imageUrl: "/images/gallery/gallery_3.JPG" },
  { id: 6, category: "quinceanera", imageUrl: "/images/gallery/gallery_4.JPG" },
  { id: 7, category: "quinceanera", imageUrl: "/images/gallery/gallery_6.JPG" },
  { id: 20, category: "quinceanera", imageUrl: "/images/gallery/gallery_7.JPG" },
  { id: 8, category: "sweet16", imageUrl: "https://images.unsplash.com/photo-1763959949900-f02238028b2d?w=1200&q=80" },
  { id: 9, category: "sweet16", imageUrl: "https://images.unsplash.com/photo-1763625645366-b12410f63f6a?w=1200&q=80" },
  { id: 10, category: "glam", imageUrl: "/images/gallery/gallery_10.JPG" },
  { id: 11, category: "glam", imageUrl: "https://images.unsplash.com/photo-1605813807548-0f9bd3cf043a?w=1200&q=80" },
  { id: 12, category: "glam", imageUrl: "https://images.unsplash.com/photo-1606158562001-5b5a8729a80b?w=1200&q=80" },
  { id: 19, category: "glam", imageUrl: "https://images.unsplash.com/photo-1672788725446-c303ec2b318e?w=1200&q=80" },
  { id: 13, category: "natural", imageUrl: "/images/gallery/gallery_5.JPG" },
  { id: 14, category: "natural", imageUrl: "https://images.unsplash.com/photo-1709477542149-f4e0e21d590b?w=1200&q=80" },
  { id: 15, category: "natural", imageUrl: "https://images.unsplash.com/photo-1523264114838-feca761983c4?w=1200&q=80" },
  { id: 16, category: "updos", imageUrl: "/images/gallery/gallery_1.JPG" },
  { id: 17, category: "updos", imageUrl: "/images/gallery/gallery_8.JPG" },
  { id: 21, category: "updos", imageUrl: "/images/gallery/gallery_9.JPG" },
  { id: 22, category: "updos", imageUrl: "/images/gallery/gallery_11.JPG" },
];
