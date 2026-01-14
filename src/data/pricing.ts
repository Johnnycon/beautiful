export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: "starting" | "fixed";
  popular?: boolean;
  features: string[];
  idealFor: string;
}

export interface AddOn {
  name: string;
  price: number;
  description: string;
}

export const pricingPackages: PricingPackage[] = [
  {
    id: "bridal-complete",
    name: "Bridal Complete",
    description: "The ultimate bridal experience from consultation to your perfect day",
    price: 525,
    priceType: "starting",
    popular: true,
    features: [
      "In-depth style consultation",
      "Full trial session (hair + makeup)",
      "Day-of bridal hair styling",
      "Day-of bridal makeup",
      "Premium lashes included",
      "Touch-up kit for the day",
      "Timeline coordination"
    ],
    idealFor: "Brides who want the complete luxury experience"
  },
  {
    id: "quinceanera-package",
    name: "Quinceañera Package",
    description: "Make your milestone celebration absolutely unforgettable",
    price: 425,
    priceType: "starting",
    features: [
      "Style consultation",
      "Hair styling with accessories",
      "Full makeup application",
      "Premium lashes",
      "All-day setting products",
      "Quick touch-up guidance"
    ],
    idealFor: "Quinceañeras wanting camera-ready glam"
  },
  {
    id: "group-celebration",
    name: "Group Celebration",
    description: "Coordinated beauty services for bridal parties and groups",
    price: 400,
    priceType: "starting",
    features: [
      "Group consultation call",
      "Coordinated scheduling",
      "Hair styling per person",
      "Makeup per person",
      "Group discount applied",
      "On-site service for all"
    ],
    idealFor: "Bridal parties, prom groups, celebrations"
  },
  {
    id: "event-glam",
    name: "Event Glam",
    description: "Perfect for galas, proms, and special occasions",
    price: 175,
    priceType: "starting",
    features: [
      "Hair styling OR makeup",
      "Style consultation",
      "Lashes included with makeup",
      "Long-lasting products"
    ],
    idealFor: "Special events and formal occasions"
  }
];

export const addOns: AddOn[] = [
  {
    name: "Additional Person",
    price: 135,
    description: "Hair and makeup for additional party member"
  },
  {
    name: "Hair Only Add-On",
    price: 85,
    description: "Styling for additional person (hair only)"
  },
  {
    name: "Makeup Only Add-On",
    price: 85,
    description: "Makeup for additional person (makeup only)"
  },
  {
    name: "Airbrush Upgrade",
    price: 100,
    description: "Upgrade to airbrush foundation for flawless finish"
  },
  {
    name: "Premium Lash Upgrade",
    price: 25,
    description: "Upgrade to luxury individual lashes"
  },
  {
    name: "Touch-Up Kit",
    price: 45,
    description: "Custom touch-up kit to take with you"
  },
  {
    name: "Early Start (before 6am)",
    price: 50,
    description: "For services starting before 6:00 AM"
  }
];

export const travelPolicy = {
  freeRadius: 25,
  perMileAfter: 0.65,
  description: "Travel within 25 miles is complimentary. Beyond that, a travel fee of $0.65 per mile applies."
};

export const depositPolicy = {
  percentage: 30,
  description: "A 30% non-refundable deposit is required to secure your booking. The remaining balance is due the day of your appointment."
};

export const cancellationPolicy = {
  fullRefund: 14,
  partialRefund: 7,
  description: "Cancellations made 14+ days before your appointment receive a full refund of the deposit. Cancellations within 7-14 days receive a 50% refund. Cancellations within 7 days are non-refundable."
};
