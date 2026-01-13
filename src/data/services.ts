export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  includes: string[];
  duration: string;
  startingPrice: number;
  icon: string;
  addOns?: { name: string; price: number }[];
}

export const services: Service[] = [
  {
    id: "bridal-hair-makeup",
    title: "Bridal Hair + Makeup",
    shortDescription: "Your perfect bridal look, flawlessly executed on your special day.",
    description: "Our signature bridal service includes a personalized consultation, trial session, and day-of styling to ensure you look absolutely radiant walking down the aisle. We use only premium, long-lasting products that photograph beautifully and stay perfect through every tear of joy.",
    includes: [
      "Pre-wedding consultation",
      "Trial session",
      "Day-of hair styling",
      "Day-of makeup application",
      "Touch-up kit",
      "False lashes included"
    ],
    duration: "2-3 hours",
    startingPrice: 450,
    icon: "crown",
    addOns: [
      { name: "Additional bridesmaid", price: 150 },
      { name: "Mother of bride/groom", price: 175 },
      { name: "Flower girl styling", price: 75 }
    ]
  },
  {
    id: "quinceanera-glam",
    title: "Quinceañera Glam",
    shortDescription: "Age-appropriate elegance for your momentous celebration.",
    description: "Celebrate this beautiful milestone with a look that captures the magic of the moment. Our quinceañera package delivers camera-ready glamour that's both age-appropriate and absolutely stunning, ensuring you shine in every photo.",
    includes: [
      "Style consultation",
      "Hair styling with accessories",
      "Full makeup application",
      "False lashes",
      "Setting spray for all-day wear"
    ],
    duration: "2 hours",
    startingPrice: 275,
    icon: "sparkles",
    addOns: [
      { name: "Damas (each)", price: 125 },
      { name: "Mother styling", price: 150 },
      { name: "Hair accessory placement", price: 25 }
    ]
  },
  {
    id: "sweet-16",
    title: "Sweet 16 Styling",
    shortDescription: "Chic and youthful glam for your sixteenth celebration.",
    description: "Turn sixteen in style with a fresh, youthful look that's perfect for your celebration. We create age-appropriate glamour that makes you feel confident and beautiful while still being true to your personal style.",
    includes: [
      "Consultation",
      "Hair styling",
      "Makeup application",
      "Lashes included"
    ],
    duration: "1.5 hours",
    startingPrice: 225,
    icon: "heart",
    addOns: [
      { name: "Friend styling (each)", price: 100 },
      { name: "Mother styling", price: 150 }
    ]
  },
  {
    id: "event-hair",
    title: "Event Hair Styling",
    shortDescription: "Elegant updos and styling for any special occasion.",
    description: "Whether it's a gala, formal dinner, or special celebration, our event hair styling service delivers sophisticated, lasting styles. From romantic waves to elegant updos, we create the perfect hair look for your occasion.",
    includes: [
      "Consultation",
      "Heat styling",
      "Updo or down styling",
      "Finishing products"
    ],
    duration: "45-60 minutes",
    startingPrice: 125,
    icon: "wind"
  },
  {
    id: "soft-glam",
    title: "Soft Glam Makeup",
    shortDescription: "Effortless, natural-looking beauty enhancement.",
    description: "Our soft glam look enhances your natural beauty with a polished, radiant finish. Perfect for those who want to look like the best version of themselves—fresh, dewy, and naturally beautiful.",
    includes: [
      "Skin prep",
      "Natural makeup application",
      "Soft contouring",
      "Natural lashes"
    ],
    duration: "45 minutes",
    startingPrice: 95,
    icon: "sun"
  },
  {
    id: "full-glam",
    title: "Full Glam Makeup",
    shortDescription: "Bold, camera-ready makeup for maximum impact.",
    description: "When you want to make a statement, our full glam service delivers. Think dramatic eyes, flawless skin, sculpted features, and a look that commands attention and photographs like a dream.",
    includes: [
      "Full skin prep",
      "Complete makeup application",
      "Full contouring & highlighting",
      "Dramatic lashes"
    ],
    duration: "1 hour",
    startingPrice: 125,
    icon: "star"
  },
  {
    id: "group-booking",
    title: "Group Bookings",
    shortDescription: "Coordinated beauty services for your entire party.",
    description: "Planning a bridal party, prom group, or special celebration with friends? Our group booking package ensures everyone is styled to perfection with seamless coordination and timing.",
    includes: [
      "Group consultation",
      "Coordinated scheduling",
      "On-site styling for all",
      "Group discount applied"
    ],
    duration: "Varies by group size",
    startingPrice: 400,
    icon: "users"
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};
