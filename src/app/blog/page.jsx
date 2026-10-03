import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, MessageCircle } from 'lucide-react';
import { getBlog, getSettings } from '@/lib/db';

export const metadata = {
  title: 'Artikel & Tips Bangun Renovasi - Mitra Bangun Mandiri',
  description: 'Kumpulan artikel edukatif mengenai tips renovasi rumah, perencanaan RAB, pemilihan material, dan panduan struktur bangunan.',
};

export default function BlogPage() {
  const articles = getBlog();
  const settings = getSettings();
  const featured = articles[0];
  const restArticles = articles.slice(1);

  const whatsapp = settings?.whatsapp || '6282141486171';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20Mitra%20Bangun%20Mandiri,%20saya%20membaca%20artikel%20dan%20ingin%20konsultasi%20renovasi.`;

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-navy py-16 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-brand-accent mb-2 block">
            Edukasi & Wawasan
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Artikel & Panduan Renovasi
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Tips praktis dan panduan teknis yang bermanfaat bagi Anda yang berencana membangun atau merenovasi rumah.
          </p>
        </div>
      </section>

      {/* Main Articles List */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="section-container">
          {/* Featured Article */}
          {featured && (
            <div className="mb-16 bg-brand-surface rounded-[4px] overflow-hidden border border-brand-border shadow-card card-hover">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-100">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-[2px]">
                    Artikel Pilihan
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-brand-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                        {featured.date}
                      </span>
                      <span>•</span>
                      <span className="text-brand-accent font-semibold uppercase">{featured.category}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark leading-snug hover:text-brand-accent transition-colors">
                      <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                    </h2>

                    <p className="text-sm text-brand-body leading-relaxed">
                      {featured.summary}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="btn-primary px-6 py-3 text-xs uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <span>Baca Artikel Lengkap</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Other Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {restArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-[4px] overflow-hidden shadow-card border border-brand-border card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/90 text-brand-dark text-[11px] font-semibold px-2.5 py-1 rounded-[2px] shadow-sm backdrop-blur-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs text-brand-muted flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{article.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-brand-dark leading-snug hover:text-brand-accent transition-colors">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-body leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-20 p-8 sm:p-12 bg-brand-surface-alt rounded-[4px] border border-brand-border text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold text-brand-dark">Punya Pertanyaan Teknis Seputar Bangunan?</h3>
            <p className="text-sm text-brand-body max-w-xl mx-auto leading-relaxed">
              Tim kontraktor kami siap berdiskusi langsung mengenai rencana denah, perkiraan kebutuhan semen/besi, maupun solusi perbaikan bangunan.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Diskusi Langsung via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
