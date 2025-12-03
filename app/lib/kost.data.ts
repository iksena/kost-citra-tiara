// app/lib/data.ts

export const KOST_DATA = {
  name: "Kost Citra & Tiara",
  tagline: "Comfortable & Secure Living for Undip Female Students",
  description: "Located just 5 minutes from Universitas Diponegoro, Kost Citra & Tiara offers a premium, female-only environment designed for academic success. Clean, modern, and fully managed.",
  location: {
    address: "Jl. Tembalang Selatan No. 12, Semarang, Jawa Tengah",
    lat: -7.0530, // Approx Tembalang coordinates
    lng: 110.4375,
    mapZoom: 14
  },
  contact: {
    whatsapp: "+6281234567890",
    email: "info@kostcitratiara.com",
    instagram: "@kostcitratiara_undip"
  },
  highlights: [
    "5 Min to Undip Campus",
    "24/7 CCTV Security",
    "Free High-Speed WiFi",
    "Cleaning Service Included"
  ],
  rooms: [
    {
      id: "standard",
      name: "Citra Standard",
      price: "Rp 1.200.000 / month",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600", // Placeholder
      features: ["Single Bed", "Shared Bathroom", "Study Desk", "Wardrobe", "Fan"],
      available: 3
    },
    {
      id: "deluxe",
      name: "Tiara Deluxe",
      price: "Rp 1.800.000 / month",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=600",
      features: ["Queen Bed", "Ensuite Bathroom", "AC", "Smart TV", "Water Heater"],
      available: 2
    },
    {
      id: "vip",
      name: "Sultan VIP",
      price: "Rp 2.500.000 / month",
      image: "https://images.unsplash.com/photo-1522771753033-6a586b911b18?auto=format&fit=crop&q=80&w=600",
      features: ["King Bed", "Ensuite + Bathtub", "Private Balcony", "Fridge", "Netflix Included"],
      available: 1
    }
  ]
};

// System prompt for the AI Customer Service
export const AI_SYSTEM_PROMPT = `
You are "Mbak Citra", the helpful virtual assistant for ${KOST_DATA.name}, a female-only student housing near Undip.
Use a friendly, polite, and slightly casual Indonesian-English mix typical of students (e.g., "Kak", "Sis").
Only answer questions based on the following data: ${JSON.stringify(KOST_DATA)}.
If asked about availability, mention the specific numbers.
If asked for location, guide them to the map section.
Prices are fixed.
Keep answers short (under 3 sentences).
`;
