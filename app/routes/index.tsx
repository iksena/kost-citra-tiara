// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star } from 'lucide-react';

import ChatWidget from '../components/ChatWidget';
import LeafletMap from '../components/LeafletMap';
import { KOST_DATA } from '../lib/kost.data';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[60vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000" 
          alt="Kost Interior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            {KOST_DATA.name}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 font-light"
          >
            {KOST_DATA.tagline}
          </motion.p>
        </div>
      </header>

      {/* Highlights */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {KOST_DATA.highlights.map((h, i) => (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              key={i} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <Star className="mx-auto text-pink-500 mb-3" />
              <p className="font-medium text-gray-700">{h}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Sanctuary</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {KOST_DATA.rooms.map((room) => (
              <motion.div 
                key={room.id}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{room.name}</h3>
                    <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded-full">
                      {room.available} Left
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {room.features.map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <p className="text-lg font-bold text-pink-600 mb-3">{room.price}</p>
                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Prime Location</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{KOST_DATA.description}</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-pink-100 rounded-full text-pink-600"><MapPin /></div>
              <div>
                <p className="font-bold">Address</p>
                <p className="text-sm text-gray-500">{KOST_DATA.location.address}</p>
              </div>
            </div>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <LeafletMap
              lat={KOST_DATA.location.lat}
              lng={KOST_DATA.location.lng}
              zoom={KOST_DATA.location.mapZoom}
              name={KOST_DATA.name}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">{KOST_DATA.name}</h2>
            <p className="text-gray-400 text-sm mt-2">© 2025 Kost Citra & Tiara. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href={`https://wa.me/${KOST_DATA.contact.whatsapp}`} className="hover:text-pink-500 transition-colors flex items-center gap-2">
              <Phone size={18} /> WhatsApp
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
