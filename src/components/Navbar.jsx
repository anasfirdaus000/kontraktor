'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MessageCircle, Menu, X, Hammer } from 'lucide-react';

export default function Navbar({ settings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const whatsapp = settings?.whatsapp || '6282141486171';
  const phone = settings?.phone || '0821-4148-6171';
  const email = settings?.email || 'konsultasi@mitrabangunmandiri.com';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Portofolio', href: '/portofolio' },
    { name: 'Katalog', href: '/katalog' },
    { name: 'Blog', href: '/blog' },
    { name: 'Kontak', href: '/kontak' },
  ];

  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20ingin%20konsultasi%20mengenai%20proyek%20bangun/renovasi.`;

  return (
    <header className="w-full bg-white border-b border-brand-border sticky top-0 z-50 shadow-sm">
      {/* Top Bar matching reference */}
      <div className="bg-[#FFFFFF] border-b border-brand-border/60 text-xs sm:text-sm text-brand-body hidden md:block py-2">
        <div className="section-container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${whatsapp}`}
              className="flex items-center gap-2 hover:text-brand-accent transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-brand-accent" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-brand-accent transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-brand-accent" />
              <span>{email}</span>
            </a>
          </div>
          <div className="text-xs text-brand-muted font-medium">
            Jasa Kontraktor & Renovasi Terpercaya Jabodetabek
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-[4px] bg-brand-accent flex items-center justify-center text-white shadow-sm group-hover:bg-brand-accent-hover transition-colors">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-brand-dark block leading-none">
                MITRA BANGUN
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[2px] text-brand-accent block uppercase mt-1">
                KONTRAKTOR & RENOVASI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-[3px] ${
                    isActive
                      ? 'text-brand-accent bg-brand-accent-light/50'
                      : 'text-brand-dark hover:text-brand-accent hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button (Chat Sekarang - WhatsApp) */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat Sekarang</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary p-2 text-xs sm:hidden"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-dark hover:text-brand-accent focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-[4px] text-base font-semibold ${
                  isActive
                    ? 'text-brand-accent bg-brand-accent-light'
                    : 'text-brand-dark hover:text-brand-accent hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-brand-border">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3 text-sm uppercase flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
