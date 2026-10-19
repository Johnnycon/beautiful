// Answers offered in the booking request and contact forms. Labels live in messages:
// occasions under `common.occasions`, needs under `book.form.needs`.
export const occasions = ["wedding", "quinceanera", "sweet16", "prom", "photoshoot", "corporate", "other"] as const;
export type Occasion = (typeof occasions)[number];

export const needs = ["hairAndMakeup", "makeup", "hair"] as const;
export type Need = (typeof needs)[number];

export interface BookingPrefill {
  occasion?: Occasion;
  need?: Need;
}

// Link to /book that starts the request with these answers already chosen
export function bookingHref(prefill: BookingPrefill = {}) {
  const query = new URLSearchParams(
    Object.entries(prefill).filter((entry): entry is [string, string] => Boolean(entry[1]))
  ).toString();
  return query ? `/book?${query}` : "/book";
}
