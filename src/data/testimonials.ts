export interface Testimonial {
  id: number;
  name: string;
  eventType: "Bride" | "Quinceañera" | "Sweet 16" | "Prom" | "Guest" | "Mother of Bride";
  quote: string;
  rating: number;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria G.",
    eventType: "Bride",
    quote: "I felt like the most beautiful version of myself on my wedding day. The attention to detail was impeccable, and my makeup lasted through every happy tear. I couldn't have asked for a better experience.",
    rating: 5,
    date: "October 2024"
  },
  {
    id: 2,
    name: "Sofia R.",
    eventType: "Quinceañera",
    quote: "My quinceañera was absolutely magical! The makeup was age-appropriate but still glamorous, and my hair stayed perfect all night. Every photo turned out amazing.",
    rating: 5,
    date: "September 2024"
  },
  {
    id: 3,
    name: "Jennifer L.",
    eventType: "Mother of Bride",
    quote: "Professional, punctual, and incredibly talented. She made both me and my daughter feel beautiful and calm during such an emotional morning. Highly recommend!",
    rating: 5,
    date: "August 2024"
  },
  {
    id: 4,
    name: "Isabella M.",
    eventType: "Sweet 16",
    quote: "I was nervous about getting my makeup done professionally for the first time, but she made me feel so comfortable. I loved my look and felt so confident at my party!",
    rating: 5,
    date: "July 2024"
  },
  {
    id: 5,
    name: "Carmen D.",
    eventType: "Bride",
    quote: "From the trial to the wedding day, everything was perfect. She listened to exactly what I wanted and delivered beyond my expectations. My bridal party all looked stunning too!",
    rating: 5,
    date: "June 2024"
  },
  {
    id: 6,
    name: "Ashley T.",
    eventType: "Guest",
    quote: "I booked for a black-tie gala and received so many compliments. The glam was sophisticated and stayed flawless the entire evening. Will definitely book again!",
    rating: 5,
    date: "May 2024"
  },
  {
    id: 7,
    name: "Daniela V.",
    eventType: "Quinceañera",
    quote: "She understood exactly what I wanted for my quinceañera. The hair was absolutely stunning and the makeup made me feel like a princess. Best day ever!",
    rating: 5,
    date: "April 2024"
  },
  {
    id: 8,
    name: "Michelle K.",
    eventType: "Bride",
    quote: "The luxury experience from start to finish was worth every penny. She arrived on time, kept me calm, and made me look absolutely radiant. My husband cried when he saw me!",
    rating: 5,
    date: "March 2024"
  },
  {
    id: 9,
    name: "Olivia S.",
    eventType: "Prom",
    quote: "I felt like a celebrity on prom night! The soft glam look was exactly what I wanted—elegant but still youthful. All my friends asked who did my makeup!",
    rating: 5,
    date: "May 2024"
  },
  {
    id: 10,
    name: "Rosa H.",
    eventType: "Mother of Bride",
    quote: "She has a gift for making you feel beautiful at any age. My makeup was sophisticated and timeless, and I felt confident standing next to my daughter on her big day.",
    rating: 5,
    date: "February 2024"
  },
  {
    id: 11,
    name: "Victoria P.",
    eventType: "Bride",
    quote: "The trial run put all my worries to rest. On the wedding day, she recreated the look perfectly and even made some improvements. Absolutely flawless execution!",
    rating: 5,
    date: "January 2024"
  },
  {
    id: 12,
    name: "Alejandra M.",
    eventType: "Quinceañera",
    quote: "My daughter's quinceañera look was beyond beautiful. Professional, patient, and so talented. We've already booked for my other daughter's quinceañera next year!",
    rating: 5,
    date: "December 2023"
  }
];
