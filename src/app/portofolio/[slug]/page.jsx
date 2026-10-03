import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, CheckCircle2, MessageCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { getPortfolio, getSettings } from '@/lib/db';

export async function generateMetadata({ params }) {
  const portfolio = getPortfolio();
  const item = portfolio.find((p) => p.slug === params.slug);
  if (!item) return { title: 'Proyek Tidak Ditemukan' };

  return {
    title: `${item.title} - Portofolio Mitra Bangun Mandiri`,
    description: item.summary,
  };
}

export default function PortfolioDetailPage({ params }) {
  const portfolio = getPortfolio();
  const settings = getSettings();
  const item = portfolio.find((p) => p.slug === params.slug);

  if (!item) {
    notFound();
  }

  const related = portfolio.filter((p) => p.slug !== item.slug).slice(0, 3);
  const whatsapp = settings?.whatsapp || '6282141486171';
  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20tertarik%20dengan%20proyek%20${encodeURIComponent(item.title)}%20dan%20ingin%20konsultasi%20serupa.`;

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="bg-brand-navy py-14 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10">
          <Link
            href="/portofolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio</span>
          </Link>

          <div className="max-w-4xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[2px] text-brand-accent mb-3 bg-brand-accent/20 px-3 py-1 rounded-[2px]">
              {item.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-accent" />
                <span className="font-medium text-white">{item.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent" />
                <span>Tahun Selesai: <strong className="text-white">{item.year}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                <span className="text-emerald-400 font-medium">Selesai Siap Huni</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Main Details */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Main Image */}
              <div className="rounded-[4px] overflow-hidden shadow-lg border border-brand-border bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-h-[500px] object-cover"
                />
              </div>

              {/* Ringkasan & Deskripsi */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">Ringkasan Proyek</h2>
                  <p className="text-base text-brand-body leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border">
                  <h3 className="text-xl font-bold text-brand-dark mb-4">Ulasan Pengerjaan & Pendekatan</h3>
                  <p className="text-sm sm:text-base text-brand-body leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>

                {/* Scope of Work */}
                {item.scope && (
                  <div className="p-6 bg-brand-surface-alt rounded-[4px] border border-brand-border space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
                      Cakupan Pekerjaan Lapangan:
                    </h4>
                    <p className="text-sm text-brand-body leading-relaxed">
                      {item.scope}
                    </p>
                  </div>
                )}
              </div>

              {/* Gallery Grid */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-brand-border">
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark">Dokumentasi Foto Proyek</h3>
                    <p className="text-xs sm:text-sm text-brand-body mt-1">
                      Foto dokumentasi pengerjaan struktur, finishing, dan hasil akhir.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {item.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-[4px] overflow-hidden shadow-sm border border-brand-border bg-slate-100 h-48 group"
                      >
                        <img
                          src={img}
                          alt={`${item.title} foto ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* WhatsApp Consultation Box */}
              <div className="bg-brand-surface-alt p-6 sm:p-8 rounded-[4px] border border-brand-border space-y-5 sticky top-28">
                <div className="w-12 h-12 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark">
                    Punya Rencana Proyek Seperti Ini?
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-body mt-2 leading-relaxed">
                    Konsultasikan ide tata ruang atau rencana renovasi Anda langsung bersama kontraktor untuk estimasi RAB yang transparan.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Konsultasi via WhatsApp</span>
                  </a>
                </div>

                <div className="text-[11px] text-brand-muted text-center">
                  Respon cepat • Tanpa biaya komitmen awal
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-16 bg-brand-surface-alt border-t border-brand-border">
          <div className="section-container">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-8">
              Proyek Lainnya yang Selesai Dikerjakan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-[4px] overflow-hidden shadow-card border border-brand-border card-hover flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[11px] font-semibold text-brand-accent uppercase tracking-wider block">
                        {rel.category}
                      </span>
                      <h4 className="text-base font-bold text-brand-dark hover:text-brand-accent transition-colors mt-1">
                        <Link href={`/portofolio/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-brand-border/60">
                      <Link
                        href={`/portofolio/${rel.slug}`}
                        className="text-xs font-bold uppercase tracking-wider text-brand-accent inline-flex items-center gap-1"
                      >
                        <span>Lihat Rincian</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
