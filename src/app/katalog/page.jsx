'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, MessageCircle, Layers, CheckCircle2 } from 'lucide-react';

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Static/Hydrated items matching database
  const catalogItems = [
    {
      id: "cat-1",
      title: "Pekerjaan Dak Lantai Beton SNI",
      category: "Struktur & Pondasi",
      image: "/images/desain/detail.jpg",
      description: "Pengecoran dak lantai 2 menggunakan wiremesh M8/M10, bondek galvanis tebal 0.75mm, dan beton ready mix K-250 / K-300 teruji kuat tekan.",
      specification: "Wiremesh M8 SNI, Bondek 0.75mm, Beton Ready Mix K-250, Balok Struktur Besi Ulir",
    },
    {
      id: "cat-2",
      title: "Rangka Atap Baja Ringan & Genteng Metal",
      category: "Atap & Plafon",
      image: "/images/desain/arch.jpg",
      description: "Pemasangan rangka atap baja ringan canal C75 dengan baut anti karat dan penutup genteng metal berpasir kedap suara hujan.",
      specification: "Truss C75.75 SNI, Reng 0.45mm, Genteng Metal Pasir / Morando, Dynabolt Penahan",
    },
    {
      id: "cat-3",
      title: "Pemasangan Granit Tile 60x60 Presisi",
      category: "Finishing Lantai",
      image: "/images/desain/interior.jpg",
      description: "Pemasangan lantai granit glazed polished atau unpolished dengan sistem perataan tile leveling clips untuk nat super rapi dan rata.",
      specification: "Granit Tile 60x60 / 80x80, Perekat Semen MU-400 / Sika, Pengisi Nat Anti Jamur",
    },
    {
      id: "cat-4",
      title: "Plafon Gypsum Drop Ceiling Modern",
      category: "Atap & Plafon",
      image: "/images/desain/detail2.jpg",
      description: "Pembuatan plafon bertingkat (drop ceiling) menggunakan papan gypsum 9mm rangka hollow galvanis anti karat, siap pasang lampu LED strip.",
      specification: "Gypsum Board 9mm Jayaboard/Elephant, Rangka Hollow 2x4 & 4x4 Galvanis, Compound Rapi",
    },
    {
      id: "cat-5",
      title: "Renovasi Fasad Minimalis & Kanopi Kaca",
      category: "Eksterior",
      image: "/images/desain/p2.jpg",
      description: "Paket renovasi tampak depan rumah dengan aksen kisi-kisi wood-plastic composite (WPC), dinding batu alam, dan kanopi tempered glass 8mm/10mm.",
      specification: "Besi Hollow Tebal 1.6mm Cat Duco, Kaca Tempered 8mm / Solarflat, WPC Wall Cladding",
    },
    {
      id: "cat-6",
      title: "Waterproofing Dak Beton Membran",
      category: "Proteksi Bangunan",
      image: "/images/desain/intro.jpg",
      description: "Lapisan anti bocor untuk dak beton atap dan talang air menggunakan sistem membran bakar elastisitas tinggi dan tahan cuaca ekstrem.",
      specification: "Membran Bitumen Bakar 3mm, Primer Aspal Emulsi, Screed Pelindung Permukaan",
    },
  ];

  const categories = ['Semua', 'Struktur & Pondasi', 'Atap & Plafon', 'Finishing Lantai', 'Eksterior', 'Proteksi Bangunan'];

  const filteredItems = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const whatsapp = '6282141486171';

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-navy py-16 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-brand-accent mb-2 block">
            Katalog Pekerjaan & Material
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Katalog Spesifikasi Pengerjaan
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Daftar paket pekerjaan spesifik, standar material konstruksi, dan acuan pengerjaan yang dapat disesuaikan dengan kebutuhan rumah Anda.
          </p>
        </div>
      </section>

      {/* Filters and Search Bar */}
      <section className="py-8 bg-brand-surface border-b border-brand-border sticky top-20 z-30 shadow-sm">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-[3px] transition-all uppercase tracking-wider ${
                    activeCategory === cat
                      ? 'bg-brand-accent text-white shadow-sm'
                      : 'bg-white text-brand-dark hover:bg-slate-100 border border-brand-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari jenis pengerjaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-16 bg-white">
        <div className="section-container">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base text-brand-muted">Tidak ada katalog yang sesuai dengan filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => {
                const waItemUrl = `https://wa.me/${whatsapp}?text=Halo%20Mitra%20Bangun%20Mandiri,%20saya%20tertarik%20dengan%20katalog%20${encodeURIComponent(item.title)}%20dan%20ingin%20tanya%20estimasi%20biayanya.`;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-[4px] overflow-hidden shadow-card border border-brand-border card-hover flex flex-col justify-between"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-brand-navy/90 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded-[2px] backdrop-blur-sm">
                          {item.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-brand-dark leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
                          {item.description}
                        </p>

                        {/* Specification Box */}
                        {item.specification && (
                          <div className="p-3 bg-brand-surface-alt rounded border border-brand-border text-xs text-brand-dark space-y-1">
                            <span className="font-bold text-[11px] uppercase tracking-wider text-brand-accent block">
                              Spesifikasi Acuan:
                            </span>
                            <span className="text-brand-body">{item.specification}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="p-6 pt-0">
                      <a
                        href={waItemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Tanya Estimasi Biaya</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
