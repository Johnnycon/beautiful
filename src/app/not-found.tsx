"use client";

import NextError from "next/error";

// Rendered for requests that never reach the [locale] segment
// (e.g. paths excluded by the proxy matcher). Localized 404s live in
// app/[locale]/not-found.tsx.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
