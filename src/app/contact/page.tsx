"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#C9A962] text-sm uppercase tracking-[0.2em] mb-4 block">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
              Contact Us
            </h1>
            <p className="text-[#6B6560] text-lg leading-relaxed">
              Have questions about our services or want to discuss your event?
              We&apos;d love to hear from you. Reach out and we&apos;ll respond
              within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-3xl text-[#1A1A1A] mb-8">
                Let&apos;s Connect
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      Phone / Text
                    </h3>
                    <a
                      href="tel:+13105551234"
                      className="text-[#6B6560] hover:text-[#C9A962] transition-colors"
                    >
                      (310) 555-1234
                    </a>
                    <p className="text-sm text-[#A09A94] mt-1">
                      Text is preferred for quick inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">Email</h3>
                    <a
                      href="mailto:hello@beautifulinsideout.com"
                      className="text-[#6B6560] hover:text-[#C9A962] transition-colors"
                    >
                      hello@beautifulinsideout.com
                    </a>
                    <p className="text-sm text-[#A09A94] mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <Instagram size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      Instagram
                    </h3>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B6560] hover:text-[#C9A962] transition-colors"
                    >
                      @beautifulinsideout
                    </a>
                    <p className="text-sm text-[#A09A94] mt-1">
                      DM us for quick questions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      Service Area
                    </h3>
                    <p className="text-[#6B6560]">
                      Los Angeles & surrounding areas
                    </p>
                    <p className="text-sm text-[#A09A94] mt-1">
                      We travel up to 50 miles from LA
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-[#C9A962]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1A1A1A] mb-1">
                      Availability
                    </h3>
                    <p className="text-[#6B6560]">By appointment only</p>
                    <p className="text-sm text-[#A09A94] mt-1">
                      7 days a week, including early mornings
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {isSubmitted ? (
                <div className="bg-[#FAF8F5] rounded-2xl p-8 md:p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C9A962] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-[#6B6560] mb-6">
                    Thank you for reaching out. We&apos;ll get back to you
                    within 24 hours.
                  </p>
                  <Button href="/" variant="outline">
                    Back to Home
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#FAF8F5] rounded-2xl p-8 md:p-12"
                >
                  <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6">
                    Send a Message
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="booking">Booking Question</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="bridal">Bridal Consultation</option>
                        <option value="group">Group Booking</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8D5A3] focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 outline-none transition-all bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A962] transition-colors duration-300"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <AnimatedSection className="py-20 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#C9A962] text-sm uppercase tracking-[0.2em] mb-4 block">
              Quick Answers
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How far in advance should I book?",
                a: "For weddings and quinceañeras, we recommend booking 3-6 months in advance, especially during peak season (May-October). For other events, 2-4 weeks is usually sufficient.",
              },
              {
                q: "Do you travel to my location?",
                a: "Yes! We provide on-site services throughout Los Angeles and surrounding areas within 50 miles. Travel within 25 miles is complimentary.",
              },
              {
                q: "What is your cancellation policy?",
                a: "Cancellations 14+ days before receive a full deposit refund. 7-14 days receives 50%. Less than 7 days is non-refundable. We understand emergencies happen and handle each case with care.",
              },
              {
                q: "Do you do trials for bridal makeup?",
                a: "Absolutely! All bridal packages include a trial session. This is a crucial step to ensure we perfect your look before your big day.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="font-medium text-[#1A1A1A] mb-2">{faq.q}</h3>
                <p className="text-[#6B6560] text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="py-20 md:py-32 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Ready to Book Your Beauty Experience?
          </h2>
          <p className="text-[#A09A94] text-lg mb-10 max-w-2xl mx-auto">
            Skip the inquiry and go straight to booking. We&apos;ll confirm your
            appointment within 24 hours.
          </p>
          <Button href="/book" variant="secondary" size="lg">
            Book Now
          </Button>
        </div>
      </AnimatedSection>
    </>
  );
}
