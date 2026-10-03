import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, ArrowRight, MessageCircle, Share2 } from 'lucide-react';
import { getBlog, getSettings } from '@/lib/db';

export async function generateMetadata({ params }) {
  const blog = getBlog();
  const article = blog.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: `${article.title} - Artikel Mitra Bangun Mandiri`,
    description: article.summary,
  };
}

export default function BlogDetailPage({ params }) {
  const blog = getBlog();
  const settings = getSettings();
  const article = blog.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const related = blog.filter((a) => a.slug !== article.slug).slice(0, 3);
  const whatsapp = settings?.whatsapp || '6282141486171';
  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20membaca%20artikel%20"${encodeURIComponent(article.title)}"%20dan%20ingin%20konsultasi.`;

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-navy py-14 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Artikel</span>
          </Link>

          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[2px] text-brand-accent mb-3 bg-brand-accent/20 px-3 py-1 rounded-[2px]">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-accent" />
                <span>Ditulis oleh: <strong className="text-white">{article.author || 'Ir. Hendra Pratama'}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Article Body */}
            <div className="lg:col-span-8 space-y-8">
              {/* Featured Image */}
              <div className="rounded-[4px] overflow-hidden shadow-lg border border-brand-border bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>

              {/* Text Body */}
              <div className="prose max-w-none text-brand-body leading-relaxed space-y-5 text-base sm:text-lg">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share and Tags */}
              <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-dark">Kategori:</span>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-brand-surface border border-brand-border rounded text-brand-accent">
                    {article.category}
                  </span>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-5 py-2.5 text-xs uppercase tracking-wider inline-flex items-center gap-2 self-start sm:self-auto"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Tanya Terkait Artikel Ini</span>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Author Box */}
              <div className="p-6 bg-brand-surface rounded-[4px] border border-brand-border space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-dark pb-2 border-b border-brand-border">
                  Penulis & Penanggung Jawab
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-sm">
                    HP
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-brand-dark">{article.author || 'Ir. Hendra Pratama'}</h5>
                    <p className="text-xs text-brand-muted">Kontraktor & Praktisi Lapangan</p>
                  </div>
                </div>
                <p className="text-xs text-brand-body leading-relaxed pt-2">
                  Berbagi panduan praktis dan pengalaman lapangan seputar konstruksi rumah yang aman, transparan, dan tahan lama.
                </p>
              </div>

              {/* Consultation Card */}
              <div className="p-6 bg-brand-surface-alt rounded-[4px] border border-brand-border space-y-4">
                <h4 className="text-base font-bold text-brand-dark">
                  Konsultasi Gratis via WhatsApp
                </h4>
                <p className="text-xs text-brand-body leading-relaxed">
                  Punya kendala kebocoran, retak dinding, atau rencana menambah lantai rumah? Diskusikan langsung bersama kami.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>

              {/* Related Articles */}
              {related.length > 0 && (
                <div className="p-6 bg-white rounded-[4px] border border-brand-border space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-dark pb-2 border-b border-brand-border">
                    Artikel Terkait Lainnya
                  </h4>
                  <div className="space-y-4">
                    {related.map((rel) => (
                      <div key={rel.id} className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-brand-accent">
                          {rel.category}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-accent transition-colors leading-snug">
                          <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
