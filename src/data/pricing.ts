// Copy (names, descriptions, features, policies) lives in messages under `data.pricing`.
export interface PricingPackage {
  id: string;
  price: number;
  priceType: "starting" | "fixed";
  popular?: boolean;
}

export const pricingPackages: PricingPackage[] = [
  { id: "bridal-complete", price: 525, priceType: "starting", popular: true },
  { id: "quinceanera-package", price: 425, priceType: "starting" },
  { id: "group-celebration", price: 400, priceType: "starting" },
  { id: "event-glam", price: 175, priceType: "starting" },
];

// Index-aligned with `data.pricing.addOns` in messages.
export const addOnPrices = [135, 85, 85, 100, 25, 45, 50];
