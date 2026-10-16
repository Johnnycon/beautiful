// Copy (name, event type, quote, date) lives in messages under `data.testimonials.<id>`.
export interface Testimonial {
  id: number;
  rating: number;
}

export const testimonials: Testimonial[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  rating: 5,
}));
