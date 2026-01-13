import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Beautiful Inside Out | Luxury Mobile Hair & Makeup",
  description: "Premium on-site hair and makeup services for weddings, quinceañeras, sweet 16s, and special events. Book your luxury beauty experience today.",
  keywords: "luxury hair makeup, wedding makeup, quinceañera glam, mobile beauty, bridal hair, sweet 16 makeup",
  openGraph: {
    title: "Beautiful Inside Out | Luxury Mobile Hair & Makeup",
    description: "Premium on-site hair and makeup services for weddings, quinceañeras, sweet 16s, and special events.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
