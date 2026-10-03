import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { getPortfolio, getSettings } from '@/lib/db';

export const metadata = {
  title: 'Portofolio Proyek - Mitra Bangun Mandiri',
  description: 'Dokumentasi proyek bangun rumah baru dan renovasi bangunan yang telah kami selesaikan dengan hasil rapi dan berkualitas.',
};

export default function PortfolioPage() {
  const portfolio = getPortfolio();
  const settings = getSettings();
  const whatsapp = settings?.whatsapp || '6282141486171';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20Mitra%20Bangun%20Mandiri,%20saya%20tertarik%20melihat%20portofolio%20dan%20ingin%20konsultasi%20proyek.`;

  return (
    <div className="w-full">
      {/* Page Header Banner */}
      <section className="bg-brand-navy py-16 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-brand-accent mb-2 block">
            Dokumentasi Pengerjaan
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Portofolio Proyek
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Kumpulan bukti pengerjaan bangun baru, renovasi hunian, peningkatan dak lantai 2, dan peremajaan fasad yang telah kami kerjakan.
          </p>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[4px] overflow-hidden shadow-card border border-brand-border card-hover flex flex-col"
              >
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-brand-navy/85 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded-[2px] backdrop-blur-sm">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-brand-muted mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-dark hover:text-brand-accent transition-colors leading-snug">
                      <Link href={`/portofolio/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-sm text-brand-body leading-relaxed line-clamp-3 mt-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-border/60">
                    <Link
                      href={`/portofolio/${item.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Lihat Rincian & Galeri</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation Box */}
          <div className="mt-16 p-8 bg-brand-surface-alt rounded-[4px] border border-brand-border text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-brand-dark">Ingin Mewujudkan Hunian Serupa?</h3>
            <p className="text-sm text-brand-body leading-relaxed">
              Diskusikan gambaran denah atau kebutuhan renovasi rumah Anda bersama kami untuk mendapatkan estimasi rancangan anggaran biaya (RAB).
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Konsultasi Rencana Proyek</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
