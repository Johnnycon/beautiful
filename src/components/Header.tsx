"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/reviews", label: "Reviews" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Use dark header style when scrolled OR when not on homepage
  const showDarkHeader = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showDarkHeader
          ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-500 ${
                showDarkHeader ? "text-[#1A1A1A]" : "text-white"
              }`}
            >
              Beautiful{" "}
              <span className="text-[#C9A962]">Inside Out</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors duration-300 ${
                showDarkHeader
                  ? "text-[#6B6560] hover:text-[#C9A962]"
                  : "text-white/90 hover:text-[#C9A962]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className={`ml-4 px-6 py-2.5 text-sm tracking-wide rounded-full transition-all duration-300 transform hover:scale-105 ${
              showDarkHeader
                ? "bg-[#1A1A1A] text-white hover:bg-[#C9A962]"
                : "bg-[#C9A962] text-white hover:bg-[#A68B4B]"
            }`}
          >
            Book Now
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden relative z-10 p-2 transition-colors duration-300 ${
            showDarkHeader || isMobileMenuOpen ? "text-[#1A1A1A]" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 right-0 bg-white shadow-lg md:hidden pt-20 pb-8"
            >
              <div className="flex flex-col items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg tracking-wide text-[#6B6560] hover:text-[#C9A962] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 px-8 py-3 bg-[#1A1A1A] text-white text-sm tracking-wide rounded-full hover:bg-[#C9A962] transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
