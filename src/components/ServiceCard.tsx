"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  Heart,
  Wind,
  Sun,
  Star,
  Users,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  crown: Crown,
  sparkles: Sparkles,
  heart: Heart,
  wind: Wind,
  sun: Sun,
  star: Star,
  users: Users,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  index = 0,
}: ServiceCardProps) {
  const Icon = iconMap[icon] || Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 h-full"
        >
          <div className="w-14 h-14 rounded-full bg-[#FAF8F5] flex items-center justify-center mb-6 group-hover:bg-[#C9A962] transition-colors duration-500">
            <Icon
              size={24}
              className="text-[#C9A962] group-hover:text-white transition-colors duration-500"
            />
          </div>
          <h3 className="font-serif text-xl mb-3 text-[#1A1A1A]">{title}</h3>
          <p className="text-[#6B6560] text-sm leading-relaxed">{description}</p>
          <div className="mt-6 flex items-center gap-2 text-[#C9A962] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Learn more</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
