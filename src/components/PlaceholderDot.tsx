// Marks stock (Unsplash) images that still need to be replaced with real client
// work. Visible in development, or anywhere NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS=true
// (e.g. a preview deployment). Never rendered for real photos.
const showMarkers =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS === "true";

export function isPlaceholderImage(src: string) {
  return src.startsWith("https://images.unsplash.com/");
}

export default function PlaceholderDot({ src }: { src: string }) {
  if (!showMarkers || !isPlaceholderImage(src)) return null;

  return (
    <span
      title="Placeholder image (Unsplash) – replace with real work"
      className="pointer-events-none absolute top-3 right-3 z-10 size-3.5 rounded-full bg-amber-400 ring-2 ring-white shadow"
    />
  );
}
