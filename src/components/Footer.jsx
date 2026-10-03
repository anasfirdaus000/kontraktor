import React from 'react';
import Link from 'next/link';
import { Hammer, Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from 'lucide-react';

export default function Footer({ settings }) {
  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const whatsapp = settings?.whatsapp || '6282141486171';
  const phone = settings?.phone || '0821-4148-6171';
  const email = settings?.email || 'konsultasi@mitrabangunmandiri.com';
  const address = settings?.address || 'Jl. Bougenville No. 18, Jakarta Selatan & Jabodetabek';
  const workingHours = settings?.workingHours || 'Senin - Sabtu: 08.00 - 17.00 WIB';

  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20ingin%20konsultasi%20mengenai%20proyek%20bangun/renovasi.`;

  return (
    <footer className="bg-brand-navy border-t-2 border-brand-accent text-[#C9C9C9]">
      {/* Main Footer Content */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Profile */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[4px] bg-brand-accent flex items-center justify-center text-white">
                <Hammer className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white block leading-none">
                  MITRA BANGUN
                </span>
                <span className="text-[10px] font-semibold tracking-[2px] text-brand-accent block uppercase mt-1">
                  KONTRAKTOR & RENOVASI
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              Jasa kontraktor independen dan renovasi hunian profesional. Berfokus pada pengerjaan presisi, transparansi anggaran (RAB), dan kepuasan pemilik rumah.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-brand-accent hover:bg-brand-accent-hover px-4 py-2 rounded-[4px] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Konsultasi Proyek</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Menu */}
          <div>
            <h5 className="text-white text-base font-bold tracking-wide uppercase mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
              Menu Navigasi
            </h5>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Halaman Utama', href: '/' },
                { name: 'Tentang Kontraktor', href: '/tentang' },
                { name: 'Layanan Pekerjaan', href: '/layanan' },
                { name: 'Galeri Portofolio', href: '/portofolio' },
                { name: 'Katalog & Spesifikasi', href: '/katalog' },
                { name: 'Artikel & Panduan', href: '/blog' },
                { name: 'Hubungi Kami', href: '/kontak' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-2 text-[#C9C9C9]"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Layanan Utama */}
          <div>
            <h5 className="text-white text-base font-bold tracking-wide uppercase mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
              Layanan Utama
            </h5>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Bangun Rumah Baru', href: '/layanan/jasa-bangun-rumah-baru' },
                { name: 'Renovasi Total & Parsial', href: '/layanan/renovasi-total-parsial' },
                { name: 'Peningkatan Dak Lantai 2', href: '/layanan/peningkatan-dak-lantai-2' },
                { name: 'Desain Arsitektur & RAB', href: '/layanan/desain-arsitektur-dan-rab' },
                { name: 'Perbaikan Atap & Waterproofing', href: '/layanan/pekerjaan-atap-dan-waterproofing' },
                { name: 'Finishing Interior & Plafon', href: '/layanan/finishing-interior-dan-plafon' },
              ].map((srv) => (
                <li key={srv.name}>
                  <Link
                    href={srv.href}
                    className="hover:text-white transition-colors flex items-center gap-2 text-[#C9C9C9]"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{srv.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontak Info */}
          <div>
            <h5 className="text-white text-base font-bold tracking-wide uppercase mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
              Kontak Langsung
            </h5>
            <div className="space-y-3.5 text-sm text-[#C9C9C9]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-1" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`tel:${whatsapp}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-accent shrink-0 mt-1" />
                <span>{workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-xs text-[#8A8A9E]">
        <div className="section-container flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {businessName}. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="/kontak" className="hover:text-white transition-colors">Konsultasi Gratis</Link>
            <span>•</span>
            <Link href="/portofolio" className="hover:text-white transition-colors">Portofolio Kami</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-brand-accent transition-colors">Area Pengelola</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
