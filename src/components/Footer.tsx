import Link from "next/link";
import { Instagram, Clock, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">
              Beautiful <span className="text-[#C9A962]">Inside Out</span>
            </h3>
            <p className="text-[#A09A94] text-sm leading-relaxed mb-6">
              Luxury mobile hair and makeup services for life&apos;s most beautiful moments.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A962] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A962] transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#C9A962] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-[#A09A94] hover:text-white transition-colors duration-300"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#C9A962] mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A962] mt-0.5 flex-shrink-0" />
                <span className="text-[#A09A94] text-sm">
                  Serving Los Angeles & surrounding areas within 50 miles
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#C9A962] flex-shrink-0" />
                <a
                  href="tel:+13105551234"
                  className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
                >
                  (310) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#C9A962] flex-shrink-0" />
                <a
                  href="mailto:hello@beautifulinsideout.com"
                  className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
                >
                  hello@beautifulinsideout.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[#C9A962] mb-6">
              Availability
            </h4>
            <div className="flex items-start gap-3 mb-4">
              <Clock size={18} className="text-[#C9A962] mt-0.5 flex-shrink-0" />
              <div className="text-[#A09A94] text-sm">
                <p className="mb-2">By Appointment Only</p>
                <p>Available 7 days a week</p>
                <p>including early mornings</p>
                <p>for wedding parties</p>
              </div>
            </div>
            <Link
              href="/book"
              className="inline-block mt-4 px-6 py-2.5 border border-[#C9A962] text-[#C9A962] text-sm rounded-full hover:bg-[#C9A962] hover:text-white transition-all duration-300"
            >
              Check Availability
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#A09A94] text-sm">
              &copy; {new Date().getFullYear()} Beautiful Inside Out. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/contact"
                className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                href="/pricing#policies"
                className="text-[#A09A94] text-sm hover:text-white transition-colors duration-300"
              >
                Policies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
