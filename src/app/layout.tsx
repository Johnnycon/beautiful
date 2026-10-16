import type { ReactNode } from "react";

// The <html> and <body> tags are rendered by app/[locale]/layout.tsx so that
// `lang` matches the active locale. This root layout only exists so that
// app/not-found.tsx can handle requests outside of the locale segment.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
