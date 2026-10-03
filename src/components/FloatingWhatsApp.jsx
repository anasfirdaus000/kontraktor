'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp({ settings }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const whatsapp = settings?.whatsapp || '6282141486171';
  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20ingin%20konsultasi%20mengenai%20proyek%20bangun/renovasi%20rumah.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2">
      {/* Tooltip Notification */}
      {showTooltip && (
        <div className="bg-white text-brand-dark px-4 py-2.5 rounded-lg shadow-xl border border-brand-border text-xs sm:text-sm font-medium flex items-center gap-3 animate-bounce">
          <span>Tanya Rencana Bangun / Renovasi?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Tutup"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-brand-whatsapp hover:bg-[#1eb956] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 relative group"
        aria-label="Chat WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-accent rounded-full border-2 border-white animate-pulse"></span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
