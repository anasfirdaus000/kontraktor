'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const slides = [
  {
    image: '/images/desain/hero.jpg',
    tag: 'Arsitektur Hunian Tropis Modern',
    direction: 'in', // zoom in
  },
  {
    image: '/images/desain/p1.jpg',
    tag: 'Konstruksi Rumah Tinggal Presisi',
    direction: 'out', // zoom out
  },
  {
    image: '/images/desain/arch.jpg',
    tag: 'Struktur Bangunan & Rangka Kokoh',
    direction: 'in', // zoom in
  },
  {
    image: '/images/desain/p2.jpg',
    tag: 'Renovasi Fasad & Tata Ruang Hunian',
    direction: 'out', // zoom out
  },
];

export default function HeroSlideshow({ settings }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const whatsapp = settings?.whatsapp || '6282141486171';
  const headline = settings?.heroHeadline || 'Membangun dan Merenovasi dengan Perencanaan yang Tepat & Transparan';
  const description = settings?.heroDescription || 'Jasa kontraktor independen dan renovasi hunian terpercaya. Mengedepankan transparansi RAB, pengawasan langsung, dan kualitas finishing rapi.';

  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20ingin%20konsultasi%20mengenai%20proyek%20bangun/renovasi.`;

  // Autoplay slideshow with 6s duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-brand-navy text-white">
      {/* Background Slides with Ken Burns Zoom In & Out */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isZoomIn = slide.direction === 'in';

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center ${
                isActive
                  ? isZoomIn
                    ? 'animate-kenburns-in'
                    : 'animate-kenburns-out'
                  : 'scale-100'
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
          </div>
        );
      })}

      {/* Dark Navy Overlays matching reference styling */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#05052D]/90 via-[#05052D]/75 to-[#05052D]/85 pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,45,0.7)_100%)] pointer-events-none" />

      {/* Foreground Content */}
      <div className="section-container relative z-30 py-24 sm:py-32 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/25 border border-brand-accent/40 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-white">
              {businessName} • KONTRAKTOR & RENOVASI
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-md">
            {headline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow">
            {description}
          </p>

          {/* Action Buttons matching reference */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-9 py-4 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 w-full sm:w-auto shadow-2xl"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Konsultasi via WhatsApp</span>
            </a>
            <Link
              href="/portofolio"
              className="btn-outline-white px-9 py-4 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto backdrop-blur-sm bg-white/10 hover:bg-white hover:text-brand-navy"
            >
              <span>Lihat Portofolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span>RAB Transparan & Terinci</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded border border-white/10">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Supervisi Harian Langsung</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 rounded border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span>Material SNI Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls & Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between text-xs text-slate-300">
        {/* Current Slide Caption */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-mono font-bold text-brand-accent text-sm">
            0{currentSlide + 1} / 0{slides.length}
          </span>
          <span className="w-6 border-t border-white/30" />
          <span className="text-white/80 uppercase tracking-widest text-[11px] font-medium">
            {slides[currentSlide].tag}
          </span>
        </div>

        {/* Dots Indicators */}
        <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-brand-accent'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
